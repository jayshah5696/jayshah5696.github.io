---
title: "Training a 4B Model to Produce Faster Query Plans Than Postgres"
url: "https://rohanbansal.com/qorl"
date: 2026-09-17
tags: ["systems", "rl", "machine-learning"]
draft: false
---

Postgres's default plan is usually the starting point; this experiment instead trains a 4B model with supervised fine-tuning and agentic reinforcement learning to produce faster plans. Across 113 join-heavy queries, it reports 44.7% lower latency, even though the model initially could not produce plans for 99 of them.
