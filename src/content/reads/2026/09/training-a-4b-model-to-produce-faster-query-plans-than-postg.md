---
title: "Training a 4B Model to Produce Faster Query Plans Than Postgres"
url: "https://rohanbansal.com/qorl"
date: 2026-09-17
tags: ["llm", "rl", "systems"]
draft: false
---

I liked that the experiment reduces query planning to a measurable feedback loop: a 4B model produced a 44.7% latency reduction across 113 join-heavy queries, despite initially failing to produce plans for 99 of them. I recommend opening it for the engineering details around the Postgres measurement rig and custom GRPO variant, since query execution is noisy enough that the evaluation setup matters as much as the model. The supplied excerpt does not explain the difference between the title's 81% figure and the reported 44.7% reduction, so that headline result cannot be judged from this material alone.
