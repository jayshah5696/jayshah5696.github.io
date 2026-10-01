---
title: "Transformer Inference Arithmetic"
url: "https://kipply.github.io/blog/transformer-inference-arithmetic/"
date: 2026-09-12
tags: ["systems", "llm", "machine-learning"]
draft: false
---

Rather than starting with experiments or difficult math, the post builds a simple inference-latency model from FLOP counts and memory bandwidth. For its A100 example, the compute-to-memory ratio is 208, so computing K/V values for one token takes about as long as doing so for up to 208 tokens, under the stated assumptions.
