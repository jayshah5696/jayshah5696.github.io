---
title: "Inside vLLM's High-Throughput Inference System"
url: "https://www.aleksagordic.com/blog/vllm"
date: 2026-09-11
tags: ["llm", "systems", "infrastructure"]
draft: false
---

The `free_block_queue` caught my attention: it makes the KV-cache blocks behind paged attention visible as something the scheduler allocates and returns. I'd take the post's inverse-pyramid route from a single-GPU engine toward distributed serving as a systems map before digging into individual kernels.
