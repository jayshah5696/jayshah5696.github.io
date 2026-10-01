---
title: "LLM Inference Optimization"
url: "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization"
date: 2026-09-11
tags: ["llm", "systems", "infrastructure"]
draft: false
---

I keep coming back to the prefill/decode split. Prefill is a highly parallel matrix-matrix operation, while decode generates tokens one at a time and is memory-bound because moving weights, keys, values, and activations dominates the latency.
