---
title: "DeepSeek-V4.1-Flash: KV Cache Compression for Long-Horizon Agents"
url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/resolve/main/DeepSeek_V41_Tech_Report.pdf"
date: 2026-09-10
tags: ["ai-agents", "infrastructure", "llm"]
draft: false
---

The report's 890-byte global KV footprint per token, alongside its roughly 1/8 persistent-cache footprint with SWA Bounded Replay, caught my attention. I work on agent systems, so I'd take the cache-management angle seriously: at million-token context lengths, storage and transfer can constrain serving alongside attention compute. I'd want the hardware and benchmark setup before assuming those ratios carry over.
