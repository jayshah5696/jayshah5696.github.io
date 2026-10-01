---
title: "On-Policy Distillation for Large Language Models"
url: "https://arxiv.org/pdf/2604.00626"
date: 2026-09-05
tags: ["distillation", "llm", "machine-learning"]
draft: false
---

I recommend this survey because it makes one implementation detail central: the student generates its own trajectories and the teacher gives feedback on those states, instead of training only on flawless teacher prefixes. That gives a useful mental model for reducing exposure bias, with the survey framing the expected error as moving from O(εT²) toward O(εT) and organizing the trade-offs by objective, signal source, and training dynamics.

- I also like that it names the failure modes rather than treating on-policy distillation as automatically better: the flawed prefix trap, self-play saturation, diversity collapse, and the calibration-capability gap are concrete checks for anyone designing the loop.
