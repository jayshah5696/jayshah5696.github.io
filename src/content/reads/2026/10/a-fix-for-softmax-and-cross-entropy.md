---
title: "A Fix for Softmax and Cross-Entropy"
url: "https://arxiv.org/html/2610.31642v1"
date: 2026-10-25
tags: ["machine-learning", "research"]
draft: false
---

The paper earns a read by separating two ways a max-shifted softmax can still give the wrong gradient: collapse at high margins and a nonzero floor as student logits approach the teacher's.
