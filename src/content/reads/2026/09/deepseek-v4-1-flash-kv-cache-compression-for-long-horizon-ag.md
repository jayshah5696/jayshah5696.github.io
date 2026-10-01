---
title: "DeepSeek-V4.1-Flash: KV Cache Compression for Long-Horizon Agents"
url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/resolve/main/DeepSeek_V41_Tech_Report.pdf"
date: 2026-09-10
tags: ["infrastructure", "llm", "systems"]
draft: false
---

I like this report because it treats long-context inference as a storage and data-movement problem, not only an attention-compute problem: CSA2 with FP4 KV caching brings the global KV footprint to 890 bytes per token, while SWA Bounded Replay cuts persistent KV storage to roughly one-eighth of the previous model. It is worth opening for the deployment mental model: reducing HBM, SSD, and cache-transfer pressure can matter as much as reducing FLOPs when agents reuse million-token contexts.
