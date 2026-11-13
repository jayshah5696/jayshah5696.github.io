---
title: "Signal Propagation in Deep Networks"
url: "https://deep-learning-alchemy.github.io/assets/slides/lecture_07.pdf"
date: 2026-10-29
tags: ["machine-learning", "research"]
draft: false
---

I'd start with the Pre-LN and Post-LN comparison: repeated attenuation of early signals gives a useful account of how norm placement affects which layers contribute. The 10,000-layer non-residual result is striking, but it starts nearly linear and gains nothing beyond 1,200 layers, so I'd read it as a trainability test rather than a depth recipe.
