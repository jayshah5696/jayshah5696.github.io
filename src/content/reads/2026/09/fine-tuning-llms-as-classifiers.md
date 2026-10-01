---
title: "Fine-Tuning LLMs as Classifiers"
url: "https://fireworks.ai/blog/Finetuning-LLMs-as-Classifiers"
date: 2026-09-20
tags: ["fine-tuning", "evals"]
draft: false
---

If you're adapting an LLM for classification and need probabilities for thresholding or ranking, I'd point you here because it maps labels to tokens without changing the model architecture. I like that it treats calibration as part of the work, with a simple predicted-mass-to-observed-frequency check and caveats about whitespace, casing, and multi-token labels.
