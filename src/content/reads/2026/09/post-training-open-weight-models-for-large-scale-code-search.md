---
title: "Post-Training Open-Weight Models for Large-Scale Code Search"
url: "https://turbopuffer.com/blog/large-scale-code-search"
date: 2026-09-04
tags: ["coding-tools", "llm", "search"]
draft: false
---

I like this because it connects the model to a concrete retrieval system: repositories are chunked with tree-sitter, searched through BM25 and dense embeddings, reranked, and returned with file and line metadata for direct citation. I recommend opening it for that implementation pattern, especially if you are deciding where a small specialized model ends and a dedicated index begins.

- The training reward combines answer correctness, citation accuracy, and penalties for answer length and agent turns, which is a useful way to make search quality compete with inference cost instead of measuring them separately. The supplied excerpt does not include the reported benchmark numbers, so the claimed quality, latency, and cost improvements cannot be judged from this material alone.
