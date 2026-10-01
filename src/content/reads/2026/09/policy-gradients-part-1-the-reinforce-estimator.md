---
title: "Policy Gradients Part 1: The REINFORCE Estimator"
url: "https://fa.bianp.net/blog/2026/policy-gradient/?utm_source=substack&utm_medium=email"
date: 2026-09-01
tags: ["machine learning", "research", "rl"]
draft: false
---

I recommend opening this for the derivation that makes the environment disappear: after applying the log-derivative trick, the gradient of the trajectory log-probability contains only terms from the policy, while the environment transition terms have zero derivative with respect to the policy parameters. That gives a useful implementation model for REINFORCE: sample trajectories, weight policy log-probability gradients by return, and avoid differentiating through a black-box environment. The supplied material does not yet provide enough detail to judge the estimator's practical variance beyond flagging its scaling with trajectory length.
