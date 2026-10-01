---
title: "Speculative Decoding: Lossless Verification and Inference Speed"
url: "https://neurips2026-speculative-decoding.vercel.app/"
date: 2026-09-06
tags: ["llm", "machine-learning", "systems"]
draft: false
---

I liked that it turns speculative decoding's losslessness into an implementation rule: accept each draft token with `min(1, p(x)/q(x))`, then discard the remaining draft and resample from `norm(max(0, p − q))` after the first rejection. That makes this worth opening for anyone building inference systems, since a weak draft model can still preserve the target distribution when verification follows that rule.

- The evaluation section ties speed to drafting time, verification time, and acceptance length, so a reported throughput gain can be inspected instead of treated as a single benchmark number.

The supplied material ends mid-sentence, so I cannot judge the hands-on lab or the later directions.
