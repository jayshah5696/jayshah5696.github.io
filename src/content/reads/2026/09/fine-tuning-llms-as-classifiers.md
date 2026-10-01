---
title: "Fine-Tuning LLMs as Classifiers"
url: "https://fireworks.ai/blog/Finetuning-LLMs-as-Classifiers"
date: 2026-09-20
tags: ["fine-tuning", "llm", "machine-learning"]
draft: false
---

I like the case for using class tokens instead of adding a classification head: it keeps the model on the standard fine-tuning and inference path. The interesting claim is that fine-tuning can make renormalizing over just the class tokens unnecessary, even though the softmax covers the full vocabulary; tokenization can still distort the mapping, so I'd keep calibration separate from simply predicting the right label.
