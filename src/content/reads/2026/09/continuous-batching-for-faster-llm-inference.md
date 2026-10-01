---
title: "Continuous Batching for Faster LLM Inference"
url: "https://www.anyscale.com/blog/continuous-batching-llm-inference"
date: 2026-09-11
tags: ["llm", "systems", "infrastructure"]
draft: false
---

Continuous batching uses iteration-level scheduling to improve LLM inference throughput, with the post reporting 8x over naive batching on Ray Serve and Hugging Face TGI, and up to 23x with vLLM and batching-specific memory optimizations. The explanation connects the gains to inference being memory-I/O-bound, where GPU memory limits how many sequences fit in a batch.
