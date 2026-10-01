---
title: "Training a 4B Model to Produce Faster Query Plans Than Postgres"
url: "https://rohanbansal.com/qorl"
date: 2026-09-17
tags: ["rl", "llm", "systems"]
draft: false
---

I like that the experiment treats query-plan scoring as noisy in practice: it builds a measurement rig to reduce Linux page-cache contention and uses a custom GRPO variant for noisy rollouts. The reported 44.7% latency reduction across 113 join-heavy queries is interesting, but I'd want the 81%-faster title result reconciled with that aggregate before reading it as a general win over Postgres.
