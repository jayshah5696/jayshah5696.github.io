---
title: "How Cursor Indexes a Codebase"
url: "https://manthanguptaa.in/posts/how_cursor_index_your_codebase/"
date: 2026-09-02
tags: ["embedding-models", "infrastructure", "search"]
draft: false
---

I liked the concrete split between Cursor's semantic vector index and its trigram-style inverted index: embeddings answer "where do we handle payment retries?", while structured search finds exact patterns such as raw `db.execute` calls. That makes this worth opening for anyone building code retrieval, since the reported combination improves agent accuracy by 12.5% on average instead of asking one index to do two incompatible jobs.

- The custom embedding model learns from agent traces, with an LLM ranking which code would have helped earlier. I would take that as a practical retrieval idea: train for task usefulness rather than generic code similarity.
