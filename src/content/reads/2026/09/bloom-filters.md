---
title: "Bloom Filters"
url: "https://samwho.dev/bloom-filters"
date: 2026-09-04
tags: ["systems"]
draft: false
---

I liked how this explains bloom filters through their hard guarantee: they can return definite "no" answers, but "yes" means "maybe." The concrete tradeoff is compelling: accepting a 1-in-a-million false-positive rate reduces a list of 1,000,000 malicious links from 20MB to 3.59MB, with a full database check available when the filter says "maybe." Open it for a practical mental model of using a compact bit array as a cheap pre-filter, while keeping correctness in a second lookup.
