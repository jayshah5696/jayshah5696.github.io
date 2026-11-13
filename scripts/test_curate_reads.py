"""Focused tests for the pure helpers in curate_reads.py. Run: uv run --with pydantic --with pytest pytest scripts/"""
import importlib.util
import pathlib
import io
import json

spec = importlib.util.spec_from_file_location("curate_reads", pathlib.Path(__file__).with_name("curate_reads.py"))
cr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cr)


def test_canonical_url_strips_tracking_but_keeps_meaning():
    assert cr.canonical_url("https://a.com/p?utm_source=x&utm_medium=email") == "https://a.com/p"
    assert cr.canonical_url("https://a.com/p?r=4pkows&utm_medium=ios") == "https://a.com/p"
    assert cr.canonical_url("https://a.com/p?triedRedirect=true&utm_campaign=c") == "https://a.com/p"
    assert cr.canonical_url("https://a.com/p/?v=3") == "https://a.com/p/?v=3"
    assert cr.canonical_url("https://a.com/p#section") == "https://a.com/p#section"


def test_dedupe_key_treats_arxiv_variants_as_one_paper():
    keys = {cr.dedupe_key(u) for u in (
        "https://arxiv.org/abs/2510.21890",
        "https://arxiv.org/pdf/2510.21890",
        "https://arxiv.org/html/2510.21890v2",
    )}
    assert len(keys) == 1
    assert cr.dedupe_key("https://www.a.com/p/#x") == cr.dedupe_key("https://a.com/p")


def test_tags_are_normalized_and_filtered_to_canonical():
    assert cr.normalize_tag("Machine Learning") == "machine-learning"
    assert cr.normalize_tag("ml") == "machine-learning"
    parsed = cr.ArticleAnalysis(clean_title="t", tags=["machine learning", "ml", "spiritual", "RL"], notes="x" * 30)
    assert parsed.tags == ["machine-learning", "rl"]


def test_thin_sources_may_have_empty_notes_but_others_may_not():
    assert cr.ArticleAnalysis(clean_title="t", tags=[], thin=True).notes == ""
    try:
        cr.ArticleAnalysis(clean_title="t", tags=[], thin=False, notes="")
    except ValueError:
        return
    raise AssertionError("empty notes accepted for a non-thin item")


def test_note_guards_catch_repeated_openers_banned_phrases_and_summary_voice():
    tracker = cr.OpenerTracker(batch_size=8)
    for _ in range(2):
        tracker.add("I like the routing table.")
    problems = cr.check_note("I like the cache layout. It is a useful mental model.", tracker)
    assert any("already used" in p for p in problems)
    assert any("mental model" in p and "useful" in p for p in problems)
    assert any("first person" in p for p in cr.check_note("The paper reports a 12% gain over the baseline.", tracker))
    assert any("ran, built" in p for p in cr.check_note("I built this at work and it held up.", tracker))
    assert cr.check_note("I'd read the eviction section first.", tracker) == []


def test_straighten_replaces_curly_quotes_and_dashes():
    assert cr.straighten("It\u2019s \u201cfast\u201d \u2014 mostly") == "It's \"fast\", mostly"


def test_notes_may_not_talk_about_jays_own_work():
    tracker = cr.OpenerTracker(batch_size=8)
    for bad in (
        "I like this. It connects to my eval work at 6sense.",
        "I like this. My RAG post covers retrieval.",
        "I work on agent systems, so I like this.",
        "I like this. My wind-energy research made me wary.",
    ):
        assert any("own work" in p for p in cr.check_note(bad, tracker)), bad
    assert cr.check_note("I like this because the failed run stays in the plot.", tracker) == []


def test_generations_survive_reruns_and_only_new_bookmarks_call_llm(monkeypatch, tmp_path):
    monkeypatch.setattr(cr, 'GENERATION_CACHE_DIR', str(tmp_path))
    monkeypatch.setattr(cr, 'get_credentials', lambda: ('key', 'https://example.com', 'llm-key'))
    monkeypatch.setattr(cr, 'get_published_urls', set)
    monkeypatch.setattr(cr, 'resolve_arxiv_papers', lambda items: {})
    bookmarks = [{'id': 'one', 'createdAt': '2026-11-01T00:00:00+00:00',
                  'title': 'Original title', 'content': {'url': 'https://example.com/one'}}]
    monkeypatch.setattr(cr.urllib.request, 'urlopen', lambda *a, **kw: io.BytesIO(json.dumps({'bookmarks': bookmarks}).encode()))
    calls = []

    def analyze(item, model, *args):
        calls.append(item['id'])
        return {'clean_title': 'Generated title', 'tags': ['llm'], 'notes': 'I like the concrete example.',
                'thin': False, 'warning': '', 'used_model': model}

    monkeypatch.setattr(cr, 'analyze_item_with_llm', analyze)
    args = ('2026-10-01', '2026-12-01', '2026-10-01', '2026-12-01', 'test-model')
    first = cr.fetch_and_prepare_bookmarks(*args)
    assert calls == ['one']
    assert len(list(tmp_path.glob('*.json'))) == 1
    second = cr.fetch_and_prepare_bookmarks(*args)
    assert second == first
    assert calls == ['one']
    bookmarks.append({**bookmarks[0], 'id': 'two', 'content': {'url': 'https://example.com/two'}})
    third = cr.fetch_and_prepare_bookmarks(*args)
    assert len(third) == 2
    assert calls == ['one', 'two']
    # Choosing another model gets separate generations without overwriting the first model's cache.
    cr.fetch_and_prepare_bookmarks(*args[:-1], 'other-model')
    assert len(calls) == 4
    assert len(list(tmp_path.glob('*.json'))) == 4


def test_failed_generation_is_retried_and_completed_ones_are_checkpointed(monkeypatch, tmp_path):
    monkeypatch.setattr(cr, 'GENERATION_CACHE_DIR', str(tmp_path))
    monkeypatch.setattr(cr, 'get_credentials', lambda: ('key', 'https://example.com', 'llm-key'))
    monkeypatch.setattr(cr, 'get_published_urls', set)
    monkeypatch.setattr(cr, 'resolve_arxiv_papers', lambda items: {})
    bookmarks = [{'id': identity, 'createdAt': '2026-11-01T00:00:00+00:00',
                  'title': identity, 'content': {'url': f'https://example.com/{identity}'}}
                 for identity in ('success', 'failure')]
    monkeypatch.setattr(cr.urllib.request, 'urlopen', lambda *a, **kw: io.BytesIO(json.dumps({'bookmarks': bookmarks}).encode()))
    calls = []

    def analyze(item, model, *args):
        calls.append(item['id'])
        if item['id'] == 'failure':
            raise RuntimeError('network failure')
        return {'clean_title': item['title'], 'tags': [], 'notes': '', 'thin': True,
                'warning': 'source too thin to judge', 'used_model': model}

    monkeypatch.setattr(cr, 'analyze_item_with_llm', analyze)
    args = ('2026-10-01', '2026-12-01', '2026-10-01', '2026-12-01', 'test-model')
    cr.fetch_and_prepare_bookmarks(*args)
    assert len(list(tmp_path.glob('*.json'))) == 1
    cr.fetch_and_prepare_bookmarks(*args)
    assert calls.count('success') == 1
    assert calls.count('failure') == 2


def test_corrupt_generation_fails_without_silently_regenerating(monkeypatch, tmp_path):
    import pytest

    monkeypatch.setattr(cr, 'GENERATION_CACHE_DIR', str(tmp_path))
    item = {'id': 'one', 'url': 'https://example.com/one'}
    pathlib.Path(cr.generation_cache_path(item, 'test-model')).write_text('{broken')
    with pytest.raises(SystemExit, match='Cannot read saved generation'):
        cr.load_generation(item, 'test-model')
