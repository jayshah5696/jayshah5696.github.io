---
title: "Self-Distillation: Methods, Uses, and Open Questions"
url: "https://www.alphaxiv.org/wiki/self-distillation"
date: 2026-10-01
tags: ["distillation", "llm", "rl"]
draft: false
---

What stands out to me is that the teacher can guide the student along its own attempt with dense token-level predictions, without writing a replacement answer; that turns feedback into a richer training signal than a pass-or-fail reward. The reported OPSD comparison is worth a closer look because it gives both the 8-12× token-efficiency result and the setup behind it, including 1,024-token student responses versus 16,384 for GRPO; the broader case for preserving capabilities in continual learning still seems unsettled.
