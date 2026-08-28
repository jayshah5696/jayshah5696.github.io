---
title: "How Speculative Decoding Accelerates Large Language Model Inference"
url: "https://leoniemonigatti.com/blog/speculative-decoding.html"
date: 2026-08-24
tags: ["infrastructure", "llm", "machine-learning"]
draft: false
---

Speculative decoding speeds up autoregressive LLM inference without changing the target model’s output distribution by using a faster draft model to propose tokens that the larger model verifies in parallel. The article explains the core draft-and-verify algorithm and surveys newer approaches that replace or improve the draft model, including Medusa, EAGLE, DFlash, and DSpark.

- A small draft model generates a candidate block, while the target model evaluates all proposed tokens in a batched forward pass; accepted tokens preserve exact sampling behavior through an adjusted rejection-sampling step.
- Speedups depend on draft quality, target-model latency, proposal length, and acceptance rate—the draft must be substantially cheaper while producing sufficiently likely continuations.
- Medusa adds multiple prediction heads to the target model, while EAGLE, DFlash, and DSpark explore feature-level or more specialized predictors to improve proposals without maintaining a separate full language model.
