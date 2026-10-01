---
title: "Policy Gradients Part 1: The REINFORCE Estimator"
url: "https://fa.bianp.net/blog/2026/policy-gradient/"
date: 2026-09-01
tags: ["rl", "machine-learning"]
draft: false
---

Directly differentiating a trajectory's probability seems to require differentiating the environment's transition dynamics, which may be a black box. REINFORCE uses the log-derivative trick: taking the log turns the trajectory product into a sum, and the fixed environment terms have zero gradient, leaving gradients of the policy's log probabilities.
