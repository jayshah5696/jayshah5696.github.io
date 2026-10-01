---
title: "On-Policy Distillation: Student Trajectories, Teacher Feedback"
url: "https://x.com/neural_avb/status/2096121273285828673"
date: 2026-09-05
tags: ["distillation", "llm", "machine-learning"]
draft: false
---

I'd start with the contrast between SFT and OPD: the student generates the trajectory, then the teacher gives token-level feedback on that same path. The walkthrough makes the idea of the "teacher's distribution over the student's trajectory" easier to follow, including a sampled-token, reverse-KL variant; I like that it distinguishes OPD from both imitation and sparse-reward RL, though it doesn't show whether this approach works better in practice.
