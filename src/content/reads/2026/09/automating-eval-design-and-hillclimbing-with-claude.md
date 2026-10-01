---
title: "Automating Eval Design and Hillclimbing with Claude"
url: "https://claude.dev/blog/automating-eval-design-and-hillclimbing/"
date: 2026-09-29
tags: ["evals", "llm", "coding-tools"]
draft: false
---

I'm not sure a guided workflow can keep evals from drifting toward what the current model is bad at, but the warning about measuring a model's "failure fingerprint" is exactly the trap to watch for. I like the safeguards: choose hard cases because people can explain why they're hard, validate the grader on sample outputs, and use held-out examples while changing one thing at a time; the post lays out the process but doesn't show how much it improves applications.
