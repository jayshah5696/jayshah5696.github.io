---
title: "Inside vLLM's High-Throughput Inference System"
url: "https://www.aleksagordic.com/blog/vllm"
date: 2026-09-11
tags: ["llm", "systems", "infrastructure"]
draft: false
---

With vLLM's default block size of 16, the KV-cache manager maps tokens to cache blocks and returns them to a free-block queue when requests finish. I like how the breakdown connects paged attention to scheduler bookkeeping, then builds from a single-GPU engine toward online, multi-GPU serving.
