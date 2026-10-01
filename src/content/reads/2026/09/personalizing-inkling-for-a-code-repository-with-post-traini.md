---
title: "Personalizing Inkling for a Code Repository with Post-Training"
url: "https://bespokelabs.ai/blog/personalizing-inkling-for-your-code-repository-with-post-training"
date: 2026-09-04
tags: ["fine-tuning", "rl", "software-engineering"]
draft: false
---

I liked that this measures repository specialization with held-out tasks rather than training-task success: each fontTools task pins a repository state, injects two bugs, and uses the test suite as its grader, taking Inkling from 0/100 attempts to 52/100 after SFT and 57/100 after RL. That makes the piece worth opening for its practical training loop: curate repository environments, use SFT for the large capability jump, then use rubric-guided GRPO to improve performance and token efficiency. The SQLGlot and benchmark results suggest some transfer, but the supplied evaluation uses only 10 tasks per repository, so robustness is still unresolved.
