---
title: "Policy Gradients Part 2: Baselines"
url: "https://fa.bianp.net/blog/2026/policy-gradient-baselines/"
date: 2026-09-01
tags: ["rl", "machine-learning"]
draft: false
---

I trust the variance argument as far as it goes: the score has zero conditional mean, so a baseline can depend on state without biasing the gradient, as long as it doesn't depend on the action or future rewards. The claimed drop in the variance bound from O(T^3) to O(T^2) explains why baselines matter, though it doesn't tell us how much variance falls in a particular training setup.
