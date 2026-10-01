---
title: "On SFT, RL, and On-Policy Distillation"
url: "https://x.com/willcb/status/2050038277454143918"
date: 2026-09-05
tags: ["distillation", "rl", "machine-learning"]
draft: false
---

On-policy distillation can reach a same-family teacher's level faster than RL, but its target also caps its ceiling. The post reports 9 to 30 times less compute on AIME-style benchmarks, using student rollouts with per-token reverse KL feedback. A clean way to see the trade: faster, but capped by the teacher.
