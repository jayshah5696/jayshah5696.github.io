---
title: "Why the Batch Size Doubles Midway Through LLM Pretraining"
url: "https://jiaxuanzou0714.github.io/en/blog/2026/why-double-batch-size-llm-pretraining/"
date: 2026-09-07
tags: ["llm", "machine-learning", "research"]
draft: false
---

I liked the concrete explanation of mid-training Double GBS: doubling the batch size halves gradient variance, so the late-training noise floor drops while early training still benefits from more optimizer steps. I recommend opening it for the clipped power-law mental model: keep the batch small to accumulate steps, then increase it rapidly, with hardware-limited powers of two appearing as doublings.

- The noisy quadratic experiment reports relative final-loss figures of 1.0× for constant batch size, 9.9× for a doubling schedule, and 10.2× for the analytic optimum under the same token budget. That makes the engineering approximation concrete, though the analysis uses vanilla SGD with a constant learning rate, so its conclusions for AdamW remain unresolved.
