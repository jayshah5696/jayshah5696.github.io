---
title: "Tinker Loss Functions Documentation"
url: "https://tinker-docs.thinkingmachines.ai/tinker/losses/"
date: 2026-10-15
tags: ["fine-tuning", "llm", "rl"]
draft: false
---

I'm not sure this helps choose between objectives, since it explains data layout rather than comparing losses. I like the shift-by-one walkthrough because it makes the masking distinction explicit: SFT zeros prompt weights, while the RL example zero-pads advantages to exclude prompt positions.
