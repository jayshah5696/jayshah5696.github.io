---
title: "A Practical Recipe for Training Neural Networks"
url: "https://karpathy.github.io/2019/04/25/recipe/"
date: 2026-08-30
tags: ["evals", "machine-learning", "software-engineering"]
draft: false
---

I like the rule to inspect thousands of examples before writing neural-net code, then start with a fixed-seed tiny model and verify its loss at initialization. I recommend this for the concrete debugging sequence: an input-independent baseline should perform worse than the real model, and overfitting a single small batch can expose broken training code before expensive experiments hide it.
