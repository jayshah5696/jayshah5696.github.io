---
title: "Fine-Tuning LLMs as Classifiers"
url: "https://fireworks.ai/blog/Finetuning-LLMs-as-Classifiers"
date: 2026-09-20
tags: ["fine-tuning", "llm", "machine-learning"]
draft: false
---

CLASSFIERS RENAMED AS JEVS. I recommend this for its concrete use of output tokens as classes, which preserves the LLM architecture while exposing next-token probabilities as class probabilities. That gives a practical path to classification through existing fine-tuning and inference APIs, without adding a classification head or custom serving code.

- The tokenization caveat matters: leading spaces, casing, and multi-token labels can distort the mapping, so class-token design and probability aggregation belong in the implementation plan.
- The excerpt says fine-tuning makes full-vocabulary renormalization unnecessary, but it does not include the supporting derivation or empirical results, so I cannot judge how reliably that holds across tasks.
