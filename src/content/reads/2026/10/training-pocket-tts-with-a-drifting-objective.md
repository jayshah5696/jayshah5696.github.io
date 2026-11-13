---
title: "Training Pocket TTS with a Drifting Objective"
url: "https://kyutai.org/blog/2026-09-28-pocket-tts-drifting/"
date: 2026-10-01
tags: ["gen-ai", "machine-learning", "research"]
draft: false
---

Most one-step flow objectives here rely on Jacobian-vector products; drifting moves the iteration into training and keeps inference to one forward pass. I like the explanation in terms of generated samples being attracted to real latents and repelled by their siblings, with a plain squared-error loss teaching the sampler to follow that field. The 1,127-item LibriSpeech test-clean result is nearly tied with LSD, but that alone doesn't establish a broader quality win.
