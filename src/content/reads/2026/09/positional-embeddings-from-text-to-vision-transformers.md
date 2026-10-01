---
title: "Positional Embeddings from Text to Vision Transformers"
url: "https://iclr-blogposts.github.io/2025/blog/positional-embedding/"
date: 2026-09-13
tags: ["machine-learning", "research"]
draft: false
---

The interesting step beyond a standard positional-encoding survey is carrying ALiBi and RoPE's sequence-length extrapolation story into 2D Vision Transformers, with a direct empirical comparison to standard ViT methods. The RoPE explanation is especially clear about the mechanism: rotating queries and keys makes relative position affect their dot product; I'd want the experimental setup before putting much weight on the performance comparison.
