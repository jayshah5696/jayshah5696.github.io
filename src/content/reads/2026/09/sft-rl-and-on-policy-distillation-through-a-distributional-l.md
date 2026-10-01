---
title: "SFT, RL, and On-Policy Distillation Through a Distributional Lens"
url: "https://x.com/nrehiew_/status/2053482349300797526"
date: 2026-09-05
tags: ["distillation", "fine-tuning", "rl"]
draft: false
---

I liked the concrete OPD result: students distilled from both an SFT teacher that degraded general code generation and an RL teacher that did not ended up looking similar, slightly outperforming the RL teacher and significantly outperforming the SFT teacher. That makes the distributional lens worth opening because it suggests on-policy sampling may matter more than the teacher distribution itself, giving a practical recipe to overtrain a specialized model and recover the capability with less forgetting. The evidence comes from one Minimal Code Editing experiment, so the broader retention claim remains unresolved.
