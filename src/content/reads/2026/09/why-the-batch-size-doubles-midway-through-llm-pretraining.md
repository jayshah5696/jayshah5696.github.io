---
title: "Why the Batch Size Doubles Midway Through LLM Pretraining"
url: "https://jiaxuanzou0714.github.io/en/blog/2026/why-double-batch-size-llm-pretraining/"
date: 2026-09-07
tags: ["llm", "machine-learning", "research"]
draft: false
---

I like this because it turns a mid-training batch jump from a seeming recipe into a hardware-constrained approximation of an accelerating, clipped power-law schedule. The noisy quadratic model gives that schedule an exact test without Monte Carlo, but the derivation assumes vanilla SGD with a constant learning rate, so its fit to AdamW and other objectives is still open.
