---
title: "Post-Training Open-Weight Models for Large-Scale Code Search"
url: "https://turbopuffer.com/blog/large-scale-code-search"
date: 2026-09-04
tags: ["search", "bm25", "ai-agents"]
draft: false
---

The design trains a small open-weight model to search large code corpora through precomputed indexes instead of relying on slow grep. Repositories are chunked with tree-sitter, searched with BM25 and dense embeddings, then reranked with file and line metadata retained for citations. The reward makes answer length and agent turns part of the search problem too.
