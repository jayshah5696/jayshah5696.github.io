---
title: "On-Policy Distillation: Student Trajectories, Teacher Feedback"
url: "https://x.com/neural_avb/status/2096121273285828673"
date: 2026-09-05
tags: ["distillation", "machine-learning", "llm"]
draft: false
---

For engineers weighing SFT, RLVR, and post-training options for a smaller LLM, this is a short primer on what on-policy distillation changes. The student generates its own trajectory, then the teacher scores each sampled token so updates move the student's distribution toward the teacher's along that path; the walkthrough stops at this update step.
