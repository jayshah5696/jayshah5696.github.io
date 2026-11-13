---
title: "To Classify, Try a Trie Tree"
url: "https://fsdatalab.github.io/blog/ai-classification/"
date: 2026-10-13
tags: ["analytics", "llm", "systems"]
draft: false
---

Most classification systems let the model generate a label and parse it afterward; I like that Quail instead constrains decoding to the supplied labels. In its ten-label example, trie decoding needs choices at only three branching points, and later rounds skip documents whose labels are already decided, making shared prefixes part of the execution-cost story.
