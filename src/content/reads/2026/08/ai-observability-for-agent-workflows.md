---
title: "AI Observability for Agent Workflows"
url: "https://www.comet.com/site/blog/what-is-ai-observability/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=what-is-ai-observability%2F"
date: 2026-08-27
tags: ["ai-agents", "llm", "rag"]
draft: false
---

I liked this guide's insistence that one request should produce a single trace connecting the application, agent, model, and retrieval layers. I recommend opening it if you're debugging agent failures: stable trace, span, run, and step IDs can connect tool calls, retrieval queries, prompts, token costs, and evaluations, making it possible to ask whether a bad answer came from retrieval, orchestration, or the model instead of trusting a green 200 OK.
