---
title: "Token Pooling-Aware Training for Multi-Vector Embedding Models"
url: "https://huggingface.co/blog/token-pooling"
date: 2026-11-11
tags: ["embedding-models", "research", "search"]
draft: false
---

Pooling-aware training builds on the idea of teaching embeddings to stay useful under compression. I like how this example applies it directly to multi‑vector retrieval by averaging losses on unpooled and quarter‑sized document representations. It is a Matryoshka applied to pooling.
