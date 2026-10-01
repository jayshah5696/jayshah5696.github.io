---
title: "Inside vLLM's High-Throughput Inference System"
url: "https://www.aleksagordic.com/blog/vllm"
date: 2026-09-11
tags: ["infrastructure", "llm", "systems"]
draft: false
---

I liked the concrete KV-cache model: vLLM's scheduler allocates token mappings from a `free_block_queue`, then returns those blocks when a request finishes. That makes this worth opening for anyone building inference infrastructure, because it frames paged attention as a block allocator and indexing problem rather than one large cache tensor, with block size determined by KV heads, head size, dtype, and the 16-token default.
