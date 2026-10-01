---
title: "10x More Efficient Pretraining"
url: "https://magic.dev/blog/pretraining"
date: 2026-09-12
tags: ["llm", "machine-learning", "research"]
draft: false
---

I liked that this grounds the efficiency claim in a concrete curve: V5 e24 reaches 0.194 bits per byte on private code repos, below DeepSeek V4 Pro's 0.202, while using far less training compute. I recommend opening it for the mental model of comparing model quality against FLOPs rather than treating parameter count as the main constraint. The supplied material does not expose the pretraining recipe or evaluation protocol, so reproducibility and generalization cannot be judged here.
