---
title: "SFT, RL, and On-Policy Distillation Through a Distributional Lens"
url: "https://x.com/nrehiew_/status/2053482349300797526"
date: 2026-09-05
tags: ["rl", "fine-tuning", "distillation"]
draft: false
---

If you're comparing post-training methods, this framing is worth a read: SFT pulls toward a fixed dataset, while on-policy distillation matches a teacher on the student's own samples. The surprising result is that students distilled from SFT and RL teachers performed similarly on minimal code editing and forgot less than the SFT teacher; I'd keep the implication that on-policy sampling matters more than teacher choice tentative, since it comes from one coding-task setup.
