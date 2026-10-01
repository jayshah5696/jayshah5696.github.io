---
title: "On-Policy Distillation for Large Language Models"
url: "https://arxiv.org/pdf/2604.00626"
date: 2026-09-05
tags: ["llm", "rl", "distillation"]
draft: false
---

I like this because it makes the mismatch between training on "flawless teacher prefixes" and generating from the student's own outputs the organizing idea, then sorts methods by objectives, signal sources, and training dynamics. The DAgger-style reduction from quadratic to linear compounding error is a good motivation, but I wouldn't take it as proof that every white-box, black-box, and self-distillation setup gets that benefit; the survey's account of conditions and failures like diversity collapse is what makes the comparison worth reading.
