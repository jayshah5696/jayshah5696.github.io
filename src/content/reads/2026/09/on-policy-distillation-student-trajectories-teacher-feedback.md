---
title: "On-Policy Distillation: Student Trajectories, Teacher Feedback"
url: "https://x.com/neural_avb/status/2096121273285828673"
date: 2026-09-05
tags: ["distillation", "llm", "machine-learning"]
draft: false
---

I'm not convinced by OPD's promise as a training shortcut without outcome numbers, but the training signal is worth understanding. The student generates the trajectory, then the teacher scores each token; comparing their log-probabilities gives token-level feedback on the student's own path, unlike SFT's teacher-written path or RLVR's sparse reward.
