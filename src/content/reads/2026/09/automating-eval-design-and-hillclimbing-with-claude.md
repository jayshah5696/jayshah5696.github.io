---
title: "Automating Eval Design and Hillclimbing with Claude"
url: "https://claude.dev/blog/automating-eval-design-and-hillclimbing/"
date: 2026-09-29
tags: ["ai-agents", "evals", "prompt"]
draft: false
---

I LOVED the insistence on validating the grader before optimizing anything: the workflow runs the grader twice on the same output, checks plumbing failures, and keeps a held-out set for hillclimbing. I recommend opening this for the concrete mental model that evaluation work is partly experimental hygiene, not just picking a score; the warning about overfitting is especially practical when changing prompts or skills one edit at a time.
