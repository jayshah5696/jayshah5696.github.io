---
title: "Positional Embeddings from Text to Vision Transformers"
url: "https://iclr-blogposts.github.io/2025/blog/positional-embedding/"
date: 2026-09-13
tags: ["machine-learning", "embedding-models"]
draft: false
---

RoPE encodes position by rotating query and key vectors before attention. Their dot product then carries the relative distance between tokens, while the rotation preserves vector magnitude. Position enters the similarity calculation itself, a neat design choice.
