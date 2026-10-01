---
title: "Positional Embeddings from Text to Vision Transformers"
url: "https://iclr-blogposts.github.io/2025/blog/positional-embedding/"
date: 2026-09-13
tags: ["embedding-models", "machine-learning", "research"]
draft: false
---

I liked the concrete explanation of RoPE as rotating query and key vectors by their sequence positions, so their dot product directly carries relative distance instead of adding position only to the context embeddings. That gives a useful implementation mental model for why positional information can influence the attention calculation itself. The supplied excerpt does not include enough of the promised ALiBi-versus-RoPE Vision Transformer results to judge which method performs better.
