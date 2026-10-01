---
title: "How Discord Indexes Trillions of Messages"
url: "https://discord.com/blog/how-discord-indexes-trillions-of-messages"
date: 2026-09-12
tags: ["systems", "infrastructure", "search"]
draft: false
---

With 100 Elasticsearch nodes and batches of 50 messages, a single node failure gave a batch about a 40% chance of failing; I like how Discord connects that figure to bulk operations fanning out across nodes. The redesign batches messages by cluster and index so each bulk operation targets a single Elasticsearch index and node, containing the blast radius when one fails.
