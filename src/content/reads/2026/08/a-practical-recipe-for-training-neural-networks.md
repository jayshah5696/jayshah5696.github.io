---
title: "A Practical Recipe for Training Neural Networks"
url: "https://karpathy.github.io/2019/04/25/recipe/"
date: 2026-08-30
tags: ["machine-learning", "evals"]
draft: false
---

Neural-net training can fail silently: code may run while a label-flipping bug or an off-by-one error quietly degrades results. Karpathy's recipe starts with data inspection, then checks a tiny end-to-end baseline using tests such as the expected loss at initialization and an input-independent baseline before adding complexity.
