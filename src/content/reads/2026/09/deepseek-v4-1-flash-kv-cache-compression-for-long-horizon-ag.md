---
title: "DeepSeek-V4.1-Flash: KV Cache Compression for Long-Horizon Agents"
url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/resolve/main/DeepSeek_V41_Tech_Report.pdf"
date: 2026-09-10
tags: ["llm", "systems", "ai-agents"]
draft: false
---

The unusual angle is treating runtime KV in HBM and persistent KV on SSD or host memory as separate deployment constraints. The report says CSA2 plus FP4 brings global KV to 890 bytes per token, while SWA Bounded Replay cuts persistent cache to roughly an eighth of V4-Flash; I'd want the benchmark and serving conditions beside its claim of better performance before judging the tradeoff.
