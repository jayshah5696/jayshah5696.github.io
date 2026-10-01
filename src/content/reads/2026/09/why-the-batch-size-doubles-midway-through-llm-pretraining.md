---
title: "Why the Batch Size Doubles Midway Through LLM Pretraining"
url: "https://jiaxuanzou0714.github.io/en/blog/2026/why-double-batch-size-llm-pretraining/"
date: 2026-09-07
tags: ["llm", "machine-learning", "systems"]
draft: false
---

As pretraining loss falls, gradient noise matters more, so a larger batch can lower the noise floor; under a fixed token budget, using it too early sacrifices optimizer steps. Zou derives a clipped power-law batch schedule that hardware’s discrete choices approximate as a few doublings, and verifies the result on a noisy quadratic model; the analysis assumes vanilla SGD and leaves joint AdamW scheduling open.
