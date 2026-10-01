---
title: "GRPO++: Tricks for Making RL Actually Work"
url: "https://cameronrwolfe.substack.com/p/grpo-tricks"
date: 2026-08-27
tags: ["rl", "llm", "machine-learning"]
draft: false
---

I'd start with the RLVR framing: it separates where the reward comes from, a verifier rather than a preference model, from which optimizer produces the policy update. I like the focus on vanilla GRPO's subtle problems at scale, though the portion available here is still laying foundations, so I can't assess whether the promised training tricks are convincing.
