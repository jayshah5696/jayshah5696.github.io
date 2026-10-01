---
title: "LLM Inference Optimization"
url: "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization"
date: 2026-09-11
tags: ["llm", "infrastructure", "systems"]
draft: false
---

If you're trying to improve LLM serving without treating every slowdown as a compute problem, this is the one I'd point you to. I like the distinction between prefill and decode: the post explains that decode is often memory-bound, and that static batches make short requests wait for the longest one.
