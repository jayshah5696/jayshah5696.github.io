---
title: "How to Train a State-of-the-Art Frontier Decision Model"
url: "https://fastino.ai/blog/training-glide-sota-decision-model"
date: 2026-10-24
tags: ["distillation", "evals", "llm"]
draft: false
---

I'm not sure these benchmark gains transfer beyond the tested protocols, but the ACOS result makes the training-evaluation mismatch hard to ignore: matching the evaluator's hundreds of category-sentiment questions and 0.56% positive rate took the score from 27.2 to 61.6, while oversampling only reached 30.1. I also like the distillation result: the one-pass student scored 62.47 against 64.81 for the reasoning model, then v1.1 passed it at more than 100 times lower mean latency. Their attempts with pause tokens and layer reuse didn't beat the plain approach, which makes the case for soft targets from teachers that reason more interesting.
