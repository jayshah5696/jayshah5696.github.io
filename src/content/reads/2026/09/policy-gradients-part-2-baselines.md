---
title: "Policy Gradients Part 2: Baselines"
url: "https://fa.bianp.net/blog/2026/policy-gradient-baselines/"
date: 2026-09-01
tags: ["rl", "machine-learning"]
draft: false
---

I'd read this for the control-variate derivation: the policy score has zero conditional mean given the state, so subtracting a state-only baseline keeps the gradient unbiased while the stated variance bound drops from O(T^3) to O(T^2). That constraint is easy to inspect: the baseline can depend on the state, but not the action or future rewards.
