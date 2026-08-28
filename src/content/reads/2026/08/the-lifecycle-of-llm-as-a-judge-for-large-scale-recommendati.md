---
title: "The Lifecycle of LLM-as-a-Judge for Large-Scale Recommendation Explanations"
url: "https://arxiv.org/pdf/2608.18300"
date: 2026-08-24
tags: ["evals", "llm", "production"]
draft: false
---

Netflix frames an LLM judge as a continuously managed production system rather than a static benchmark artifact. The lifecycle spans benchmark creation, rubric-oriented training, deployment, and human-supervised monitoring as recommendation data and model behavior evolve.

- Curated human-labeled datasets define multiple evaluation criteria; Reasoning-Aligned Rubric Tuning (RART) uses a meta-judge over reasoning traces to refine judge rubrics.
- A single judge supports both quality gating and reflective explanation generation, evaluating hundreds of thousands of show-level explanations weekly.
- Human-in-the-loop drift monitoring triggers re-tuning behind a review gate; a five-week A/B test across tens of millions of members increased novel-content viewing and successful browse-to-play sessions without quality-related takedowns.
