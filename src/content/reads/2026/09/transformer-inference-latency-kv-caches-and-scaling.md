---
title: "Transformer Inference: Latency, KV Caches, and Scaling"
url: "https://jax-ml.github.io/scaling-book/inference/"
date: 2026-09-12
tags: ["llm", "systems", "infrastructure"]
draft: false
---

Read “What do we actually want to optimize?” for a clear split between throughput, time to first token, and per-token latency, and why offline batch inference and streaming chat value them differently. It also explains why maximizing hardware utilization can lower cost without necessarily improving an individual user’s experience.
