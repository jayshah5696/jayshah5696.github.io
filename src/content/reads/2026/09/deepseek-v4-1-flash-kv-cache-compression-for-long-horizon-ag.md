---
title: "DeepSeek-V4.1-Flash: KV Cache Compression for Long-Horizon Agents"
url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/resolve/main/DeepSeek_V41_Tech_Report.pdf"
date: 2026-09-10
tags: ["systems", "infrastructure", "llm"]
draft: false
---

At 890 bytes per token, DeepSeek-V4.1-Flash reports a global KV footprint roughly one-quarter of DeepSeek-V4-Flash's. I like that the report names the mechanisms behind the reductions: cross-layer KV reuse in CSA2 and FP4 KV caching, with SWA Bounded Replay reducing persistent cache to roughly one-eighth.
