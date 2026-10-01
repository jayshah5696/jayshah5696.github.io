---
title: "Transformer Inference: Latency, KV Caches, and Scaling"
url: "https://jax-ml.github.io/scaling-book/inference/"
date: 2026-09-12
tags: ["llm", "machine-learning", "systems"]
draft: false
---

If you're still treating inference as a smaller version of training, I like this read's framing of prefill and generation as "two tasks in disguise." The contrast between prefill's large token batches and generation's repeated, latency-sensitive steps makes the KV cache feel like a central systems constraint, not an implementation detail; the 240-token TPU v5e and roughly 280-token H100 thresholds are good anchors, though they're specific to the hardware and precision assumptions.
