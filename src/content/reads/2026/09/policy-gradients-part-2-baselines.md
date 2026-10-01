---
title: "Policy Gradients Part 2: Baselines"
url: "https://fa.bianp.net/blog/2026/policy-gradient-baselines/"
date: 2026-09-01
tags: ["rl", "machine-learning"]
draft: false
---

A clean variance-reduction derivation: subtracting a state-only baseline preserves the expected policy gradient and lowers the stated variance bound from O(T^3) to O(T^2), though the discussion cuts off as it begins choosing the baseline.
