---
title: "GRPO++: Tricks for Making RL Actually Work"
url: "https://cameronrwolfe.substack.com/p/grpo-tricks?utm_campaign=posts-open-in-app&triedRedirect=true"
date: 2026-08-27
tags: ["llm", "machine-learning", "rl"]
draft: false
---

I liked the concrete separation between RLHF and RLVR: RLHF gets rewards from a reward model, while RLVR can run generated code in a sandbox against test cases. I recommend opening this for the practical mental model that reasoning-model RL depends on the verifier as much as the optimizer. The supplied material explains why vanilla GRPO can fail at scale, but it does not provide enough detail to judge which proposed tricks work or how large the gains are.
