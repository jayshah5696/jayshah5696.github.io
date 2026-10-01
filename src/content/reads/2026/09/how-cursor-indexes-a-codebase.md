---
title: "How Cursor Indexes a Codebase"
url: "https://manthanguptaa.in/posts/how_cursor_index_your_codebase/"
date: 2026-09-02
tags: ["coding-tools", "search", "embedding-models"]
draft: false
---

I can't judge the reported 12.5% accuracy lift without the evaluation details, but the two-index explanation is worth reading: semantic search handles intent, while sparse n-grams handle exact patterns, and each covers a gap in the other. The more unusual detail is training embeddings from agent-session traces, with an LLM ranking what should have surfaced earlier; the author's suggested contrastive objective is clearly marked as inference, not a confirmed implementation detail.
