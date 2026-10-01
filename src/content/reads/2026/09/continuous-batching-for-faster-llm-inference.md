---
title: "Continuous Batching for Faster LLM Inference"
url: "https://www.anyscale.com/blog/continuous-batching-llm-inference"
date: 2026-09-11
tags: ["llm", "infrastructure", "systems"]
draft: false
---

I like this because it connects an inference bottleneck to a hard memory constraint: the post estimates a 13B model can fit about 28 sequences at 512 tokens, but only 7 at 2,048. That makes the case for continuous batching feel like a systems problem, not another model-weight tweak.
