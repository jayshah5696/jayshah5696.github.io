---
title: "Continuous Batching for Faster LLM Inference"
url: "https://www.anyscale.com/blog/continuous-batching-llm-inference"
date: 2026-09-11
tags: ["llm", "systems", "infrastructure"]
draft: false
---

The interesting move is scheduling at each decode iteration: when one request finishes, its slot can go to another instead of leaving GPU capacity idle until a whole batch completes. The post reports 8x throughput over naive batching and up to 23x with vLLM and memory optimizations; I'd want the workload and latency conditions beside those numbers before treating them as a serving baseline.
