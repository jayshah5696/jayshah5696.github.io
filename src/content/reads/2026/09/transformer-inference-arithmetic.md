---
title: "Transformer Inference Arithmetic"
url: "https://kipply.github.io/blog/transformer-inference-arithmetic/"
date: 2026-09-12
tags: ["llm", "machine-learning", "systems"]
draft: false
---

The number to remember is 208: under the A100 bandwidth and FLOP assumptions, the post says K/V work for one token takes about as long as computing it for up to 208 tokens. I like how it derives that limit from KV-cache and matmul costs instead of treating inference speed as a black-box benchmark, though the ratio is hardware-specific, not a general latency guarantee.
