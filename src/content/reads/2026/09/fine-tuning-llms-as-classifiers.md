---
title: "Fine-Tuning LLMs as Classifiers"
url: "https://fireworks.ai/blog/Finetuning-LLMs-as-Classifiers"
date: 2026-09-20
tags: ["llm", "fine-tuning", "evals"]
draft: false
---

I like the specific way this turns a generative model into a classifier: map labels to tokens and use the next-token distribution, with the post arguing that fine-tuning makes vocabulary-wide renormalization unnecessary. It also offers a simple class-level calibration ratio to monitor, though the explanation cuts off as it begins supporting that claim.
