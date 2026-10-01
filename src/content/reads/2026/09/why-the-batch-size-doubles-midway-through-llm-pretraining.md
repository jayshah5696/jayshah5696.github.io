---
title: "Why the Batch Size Doubles Midway Through LLM Pretraining"
url: "https://jiaxuanzou0714.github.io/en/blog/2026/why-double-batch-size-llm-pretraining/"
date: 2026-09-07
tags: ["llm", "machine-learning", "research"]
draft: false
---

The move I like here is tying the mid-training jump to a clipped power-law schedule, then checking that shape exactly in the noisy quadratic model. I'd keep the scope caveat close: the derivation assumes vanilla SGD with a constant learning rate, and the author says the joint AdamW schedule still needs analysis.
