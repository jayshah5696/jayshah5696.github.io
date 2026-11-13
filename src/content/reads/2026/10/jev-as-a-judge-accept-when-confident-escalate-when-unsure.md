---
title: "JEV-as-a-Judge: Accept When Confident, Escalate When Unsure"
url: "https://arxiv.org/html/2609.26550v5"
date: 2026-10-21
tags: ["evals", "llm", "systems"]
draft: false
---

The unusual move is using a decision-only judge's label probabilities as an escalation gate, with the threshold frozen before held-out evaluation. I find the test persuasive: on 1,610 pairs, the cascade escalates 31%, beats GPT-6 alone by 0.9 points, and costs 41% as much. Confidence weakens on style-adversarial pairs and reference-free prose, so I wouldn't carry a threshold to a new workload without local labels.
