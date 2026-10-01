---
title: "Policy Gradients Part 1: The REINFORCE Estimator"
url: "https://fa.bianp.net/blog/2026/policy-gradient/"
date: 2026-09-01
tags: ["rl", "machine-learning", "research"]
draft: false
---

I prefer this to an estimator-first explanation because it starts with the obstacle: the environment's transition dynamics are a black box. The step where "the world drops out" shows why REINFORCE can avoid differentiating through those dynamics: their terms have zero gradient with respect to the policy parameters.
