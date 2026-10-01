---
title: "Speculative Decoding: Lossless Verification and Inference Speed"
url: "https://neurips2026-speculative-decoding.vercel.app/"
date: 2026-09-06
tags: ["llm", "machine-learning", "evals"]
draft: false
---

I'm not convinced by the claim that speculative decoding runs under nearly every hosted LLM; the examples here don't establish that breadth. I still recommend the tutorial because it makes the losslessness condition inspectable: accepted mass plus residual resampling adds back to the target probability, so the speedup doesn't depend on changing the target model's output distribution.
