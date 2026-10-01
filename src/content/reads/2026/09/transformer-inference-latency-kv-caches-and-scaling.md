---
title: "Transformer Inference: Latency, KV Caches, and Scaling"
url: "https://jax-ml.github.io/scaling-book/inference/"
date: 2026-09-12
tags: ["llm", "infrastructure", "systems"]
draft: false
---

I'd read "What do we actually want to optimize?" first and skip the basic sampling walkthrough. The distinction between offline batch inference, chat streaming, and edge inference makes the latency tradeoffs tangible: TTFT and per-token latency matter alongside throughput.
