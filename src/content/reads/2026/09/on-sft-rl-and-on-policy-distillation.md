---
title: "On SFT, RL, and On-Policy Distillation"
url: "https://x.com/willcb/status/2050038277454143918"
date: 2026-09-05
tags: ["distillation", "fine-tuning", "rl"]
draft: false
---

I liked the distinction between OPD reaching the teacher's level quickly and RL having the higher potential ceiling: OPD trains on student rollouts while using the teacher's per-token reverse-KL signal, and the post reports roughly 9–30× less compute than RL on AIME-style benchmarks. That gives a practical decision rule: use same-family OPD when you want efficient convergence, but do not mistake its teacher-bounded target for RL's verifier-bounded ceiling. The supplied excerpt ends during the gradient-geometry section, so I cannot judge the promised analysis of how self-distillation goes wrong.
