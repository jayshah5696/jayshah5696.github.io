---
title: "Bloom Filters"
url: "https://samwho.dev/bloom-filters"
date: 2026-09-04
tags: ["systems", "search"]
draft: false
---

The sharpest line is that a Bloom filter's "yes" means "maybe," while "no" is certain. The interactive bit-setting walkthrough makes that asymmetry easy to follow, then the malicious-link example puts a cost on it: a compact filter can screen requests before a full-list lookup, with false positives as the tradeoff. I'd read it for the mechanism and intuition, not as a sizing reference; the numbers depend on the assumed set and error rate.
