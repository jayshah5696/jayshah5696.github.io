---
title: "On-Policy Distillation: Promise, Pitfalls, and Prospects"
url: "https://louieworth.github.io/blog/opd_reflection/"
date: 2026-08-27
tags: ["distillation", "llm", "rl"]
draft: false
---

On-policy distillation trains a student using contexts sampled from its own evolving policy while learning from a stronger teacher, addressing the distribution mismatch that limits conventional offline supervised fine-tuning. The approach offers a compelling bridge between imitation learning and reinforcement learning, but its benefits depend heavily on objective design, teacher quality, and stable optimization.

- Student-generated states expose the teacher to the errors and failure modes the student actually encounters, reducing the train–inference mismatch of teacher-forced data.
- Distillation objectives must carefully manage token-level probability matching, sequence-level quality, and exploration; naïve KL optimization can over-constrain the student or propagate teacher biases.
- Because the student’s sampling distribution changes during training, evaluation, rollout quality, and optimization stability become central engineering concerns rather than implementation details.
