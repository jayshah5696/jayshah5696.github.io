---
title: "On SFT, RL, and On-Policy Distillation"
url: "https://x.com/willcb/status/2050038277454143918"
date: 2026-09-05
tags: ["distillation", "fine-tuning", "rl"]
draft: false
---

The strongest part is the ceiling argument: fixed teacher data can only carry SFT so far, while OPD samples from the student's own states and still uses teacher token-level feedback. That makes the comparison more precise than "OPD beats RL": OPD can reach teacher quality efficiently, while verifier-based RL can aim past it; the reported 9-30× compute gap is intriguing, though I'd want benchmark and teacher-call details before generalizing it.
