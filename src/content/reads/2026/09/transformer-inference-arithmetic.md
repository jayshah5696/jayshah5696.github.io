---
title: "Transformer Inference Arithmetic"
url: "https://kipply.github.io/blog/transformer-inference-arithmetic/"
date: 2026-09-12
tags: ["infrastructure", "llm", "machine-learning"]
draft: false
---

I recommend this for anyone reasoning about transformer serving: the post derives a 208 ratio for KV-weight work on an A100, meaning computing KV for one token can take the same time as computing it for up to 208 tokens. That gives me a concrete mental model for how batch size and memory bandwidth shape inference latency, while the KV-cache arithmetic ties the speedup to an explicit storage cost.
