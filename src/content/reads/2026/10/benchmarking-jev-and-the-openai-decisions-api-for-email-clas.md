---
title: "Benchmarking Jev and the OpenAI Decisions API for Email Classification"
url: "https://builders.abnormal.ai/p/classifying-emails-with-jev-and-the"
date: 2026-10-09
tags: ["evals", "llm", "production"]
draft: false
---

I'd read this for the scoring setup: verdict macro-F1, attack-type macro-F1, and attack recall at 95% precision make the tradeoff between catching attacks and keeping false alarms rare visible in one number. Jev and the OpenAI Decisions API sit on the cost-versus-score Pareto frontier, but the 1,985-email set is synthetic and 40% attacks, so its high-precision results are easier to reach than in a real inbox.
