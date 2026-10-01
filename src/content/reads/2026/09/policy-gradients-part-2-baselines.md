---
title: "Policy Gradients Part 2: Baselines"
url: "https://fa.bianp.net/blog/2026/policy-gradient-baselines/"
date: 2026-09-01
tags: ["machine-learning", "rl", "statistics"]
draft: false
---

I liked the derivation that a baseline can subtract any state-only function from the return without bias because the policy score has zero conditional mean. I recommend opening this for the implementation rule it gives you: use the estimator \(\nabla_\theta \log \pi(a_t \mid s_t)(G_t-b(s_t))\), while keeping \(b\) independent of the action and future rewards; the stated variance bound drops from \(O(T^3)\) to \(O(T^2)\) when the return is centered.
