---
title: "Transformer Inference: Latency, KV Caches, and Scaling"
url: "https://jax-ml.github.io/scaling-book/inference/"
date: 2026-09-12
tags: ["infrastructure", "llm", "systems"]
draft: false
---

I liked the concrete split between prefill and generation: a KV cache stores past key/value projections so generation does not re-process the whole prompt, while TTFT and per-token latency become first-class constraints. I recommend opening it if you need a systems mental model for inference, because it connects that cache design to the fact that offline batch inference, chat streaming, and edge inference optimize for different things.
