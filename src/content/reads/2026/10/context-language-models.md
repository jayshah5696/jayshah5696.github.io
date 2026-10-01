---
title: "Context Language Models"
url: "https://arxiv.org/html/2609.37725v1"
date: 2026-10-01
tags: ["llm", "rl", "ai-agents"]
draft: false
---

The unusual move is giving the model unrestricted edits to a context file, rather than adding another fixed compaction or retrieval action to the harness. I like that this lets context strategies emerge while making the serving cost visible: on BrowseComp-Plus, the paper reports 11.4% higher accuracy with 21.5% fewer prefix-reuse FLOPs than its strongest baseline. Arbitrary edits can force re-prefilling, so Suffix Cache Reuse is an important part of the story; I'd want to see how well that cache result holds beyond the reported setup.
