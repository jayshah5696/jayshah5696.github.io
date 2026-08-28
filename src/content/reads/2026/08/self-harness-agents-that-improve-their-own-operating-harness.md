---
title: "Self-Harness: Agents That Improve Their Own Operating Harnesses"
url: "https://arxiv.org/pdf/2606.09498"
date: 2026-08-16
tags: ["ai-agents", "evals", "systems"]
draft: false
---

Self-Harness presents a model-specific, self-improvement loop in which an LLM agent mines its own execution failures, proposes minimal harness changes, and validates them through regression testing. Across nine model–benchmark combinations, the approach improved both held-in and held-out performance, with relative gains of up to 132%.

- **Weakness Mining:** extracts recurring failure patterns from execution traces rather than relying on hand-authored diagnoses.
- **Harness Proposal:** generates diverse, minimal modifications targeted at bottlenecks such as artifact handling, runtime control, patch verification, and application-state retrieval.
- **Proposal Validation:** retains edits only when they pass regression tests, enabling iterative improvement without stronger external agents or human engineers.
