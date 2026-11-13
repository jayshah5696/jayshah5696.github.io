---
title: "From Activity to Intent: Generating User Journeys with LLMs"
url: "https://medium.com/pinterest-engineering/from-activity-to-intent-generating-user-journeys-with-llms-9652b9417626"
date: 2026-10-13
tags: ["llm", "machine-learning", "production"]
draft: false
---

I'd start with the prompt design: collapsing actions into an explicit strength order and including dislikes gives the model evidence to separate sustained intent from incidental clicks, without the old pipeline's separate clustering and naming stages. The 88% email click-rate lift was from that earlier system, so it doesn't establish that the 4B generator improves outcomes; I'd want a direct comparison before buying the case for replacing the pipeline.
