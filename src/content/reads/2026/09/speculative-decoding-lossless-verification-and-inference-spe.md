---
title: "Speculative Decoding: Lossless Verification and Inference Speed"
url: "https://neurips2026-speculative-decoding.vercel.app/"
date: 2026-09-06
tags: ["llm", "systems", "evals"]
draft: false
---

For engineers tuning LLM inference, this tutorial explains how speculative decoding preserves the target model’s output distribution: draft tokens are accepted with probability min(1, p/q), and a rejection triggers resampling from the residual distribution. It separates drafting time, verification time, and acceptance length as inputs to per-token latency; the visible text cuts off during its explanation of how to interpret acceptance length.
