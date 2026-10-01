---
title: "Speculative Decoding: Lossless Verification and Inference Speed"
url: "https://neurips2026-speculative-decoding.vercel.app/"
date: 2026-09-06
tags: ["llm", "systems", "research"]
draft: false
---

I'd start with the metrics table, which separates draft time, verification time, and acceptance length; it makes clear why acceptance rate alone doesn't establish a speedup. The rejection-sampling walkthrough is the strongest part for me: accepting with min(1, p/q) and resampling from the residual shows how the output keeps the target distribution, while the performance discussion here is a framework for interpreting speed numbers rather than a demonstrated comparison.
