---
title: "Post-Training Open-Weight Models for Large-Scale Code Search"
url: "https://turbopuffer.com/blog/large-scale-code-search"
date: 2026-09-04
tags: ["coding-tools", "search", "rl"]
draft: false
---

This treats large-scale code search as a tool-use policy to post-train, pairing a small model with precomputed BM25 and dense indexes. I like that the open-ended task scores precision and efficiency while requiring code citations; the LLM judge and constructed tasks leave transfer to real queries uncertain.
