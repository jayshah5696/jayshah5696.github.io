---
title: "Policy Gradients for RLHF and LLM Post-Training"
url: "https://rlhfbook.com/c/06-policy-gradients#score-centering"
date: 2026-11-05
tags: ["fine-tuning", "llm", "rl"]
draft: false
---

The chapter derives the policy gradient from trajectory probabilities before connecting it to prompt-and-completion training, which makes the log-derivative trick feel like a working tool rather than a formula to memorize. I also like the clarification that many RLHF implementations treat a whole completion as one action; it helps explain why the chapter sets the discount factor to 1.
