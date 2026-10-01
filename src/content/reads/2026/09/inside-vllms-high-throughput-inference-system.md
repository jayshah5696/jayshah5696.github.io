---
title: "Inside vLLM's High-Throughput Inference System"
url: "https://www.aleksagordic.com/blog/vllm"
date: 2026-09-11
tags: ["llm", "systems", "infrastructure"]
draft: false
---

The unusual choice is to start with an offline, synchronous, single-GPU engine, then build toward distributed serving. I like that progression because it makes the scheduler, KV-cache block pool, and schedule/forward-pass/postprocess loop easier to place before continuous batching and multi-GPU execution enter the picture. The analysis is pinned to commit 42172ad, and the author notes that class names may shift, so I'd use this for a picture of the system rather than exact API guidance.
