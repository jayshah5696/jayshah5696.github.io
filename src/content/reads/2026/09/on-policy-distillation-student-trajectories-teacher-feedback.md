---
title: "On-Policy Distillation: Student Trajectories, Teacher Feedback"
url: "https://x.com/neural_avb/status/2096121273285828673"
date: 2026-09-05
tags: ["distillation", "llm", "machine-learning"]
draft: false
---

I recommend this explanation because it makes OPD concrete: the student generates a full attempt, the teacher scores the log-probability of every token on that student trajectory, and the student moves toward the teacher's distribution along that exact path. That gives a clear implementation mental model for combining on-policy rollouts with dense token-level feedback, unlike SFT's teacher path or RLVR's sparse outcome reward. The supplied material explains the mechanism but gives no benchmark, so its practical advantage over those alternatives cannot be judged here.
