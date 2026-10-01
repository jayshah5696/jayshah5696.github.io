---
title: "A Practical Recipe for Training Neural Networks"
url: "https://karpathy.github.io/2019/04/25/recipe/"
date: 2026-08-30
tags: ["machine-learning", "evals"]
draft: false
---

A clean training loop can still be wrong, and I like that this recipe treats silent failure as the central problem rather than a tooling nuisance. It builds trust in stages, from inspecting examples to a tiny end-to-end model, with checks like loss at initialization and an input-independent baseline; the insistence on explicit hypotheses is a good counterweight to piling on augmentation and model complexity.
