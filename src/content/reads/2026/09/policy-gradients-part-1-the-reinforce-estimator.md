---
title: "Policy Gradients Part 1: The REINFORCE Estimator"
url: "https://fa.bianp.net/blog/2026/policy-gradient/"
date: 2026-09-01
tags: ["rl", "machine-learning", "statistics"]
draft: false
---

Taking the log of the trajectory probability turns the product into a sum, and the environment-transition terms vanish when differentiated with respect to policy parameters. I like this clear account of how REINFORCE learns from sampled trajectories without differentiating through the environment; the connection to variance and trajectory length keeps the cost of that choice in view.
