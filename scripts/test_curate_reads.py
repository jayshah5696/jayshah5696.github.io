"""Focused tests for the pure helpers in curate_reads.py. Run: uv run --with pydantic --with pytest pytest scripts/"""
import importlib.util
import pathlib

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
