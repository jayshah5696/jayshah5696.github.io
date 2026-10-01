---
title: "ToolGrad: Efficient Tool-Use Dataset Generation with Textual Gradients"
url: "https://arxiv.org/html/2508.04086v3"
date: 2026-09-30
tags: ["ai-agents", "llm", "machine-learning"]
draft: false
---

I liked ToolGrad's answer-first inversion: it constructs valid tool-use chains with iterative textual gradients, then synthesizes the user queries that lead to them. That is worth opening if you build synthetic agent data, because it replaces failure-prone DFS annotation with a workflow whose validity is established before query generation; ToolGrad-500 reports more complex tool use, lower cost, and an almost 100% pass rate. The supplied material does not establish how those gains hold across other tool distributions or larger datasets.
