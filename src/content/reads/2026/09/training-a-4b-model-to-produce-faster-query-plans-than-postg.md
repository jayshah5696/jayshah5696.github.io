---
title: "Training a 4B Model to Produce Faster Query Plans Than Postgres"
url: "https://rohanbansal.com/qorl"
date: 2026-09-17
tags: ["rl", "evals", "systems"]
draft: false
---

My RAG post is about retrieval choices; this brings the same measurement instinct to query planning, with a custom GRPO variant for scoring rollouts in a noisy environment. I like the care around measurement, and the reported 44.7% latency reduction across 113 join-heavy queries is interesting without settling how broadly it transfers.
