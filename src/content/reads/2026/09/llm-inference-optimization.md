---
title: "LLM Inference Optimization"
url: "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization"
date: 2026-09-11
tags: ["llm", "infrastructure", "systems"]
draft: false
---

The split between prefill and decode is the idea I'd keep: prefill is parallel and compute-heavy, while decode is autoregressive and memory-bound, so the bottleneck shifts rather than staying fixed. I'd recommend this for its clear connection between that distinction, static batching's longest-request wait, and per-request KV-cache costs; the explanations build good systems intuition, though they don't establish how much a given optimization helps on a particular workload.
