---
title: "A Practical Recipe for Training Neural Networks"
url: "https://karpathy.github.io/2019/04/25/recipe/"
date: 2026-08-30
tags: ["machine-learning", "research", "evals"]
draft: false
---

The advice I'd steal is to check that the loss starts where it should: for a softmax classifier, the post gives -log(1/n_classes) as the expected value at initialization. I like that kind of sanity check because it can catch a broken training setup before a long run makes the mistake harder to see.
