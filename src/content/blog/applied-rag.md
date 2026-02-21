---
title: "Beyond the Hype- Practical Strategies for Implementing Superior RAG"
date: 2024-09-03
image: /assets/images/rag-llm.jpeg
tags:
  - gen-ai
  - llm
  - rag
description: Practical strategies for implementing and optimizing Retrieval Augmented Generation (RAG) in LLM systems.
---

<img src="/assets/images/rag-llm.jpeg" alt="applied-rag" width="450" height="450" style="display: block; margin-left: auto; margin-right: auto;"/>

Hello everyone,

If you've been working with <span style="color: magenta;">*Large Language Models (LLMs)*</span> for a while, you've likely encountered the limitations of relying solely on these models without any external knowledge. That's where <span style="color: magenta;">*Retrieval Augmented Generation (RAG)*</span> comes in, providing a powerful way to enhance LLMs by bringing in relevant information from external sources.
![diagram](/assets/images/2024-09-03-applied_rag-1.svg)
As I worked more with RAG, I realized that the basic setups, while a good foundation, only <span style="color: magenta;">*scratch the surface*</span> of what's possible. To build systems capable of handling complex queries and providing accurate, reliable answers, I had to move beyond the basics and focus on more <span style="color: magenta;">*practical, applied techniques*</span>. In this post, I'm excited to share these practical RAG strategies with you, drawing from my own experiences, to help you <span style="color: magenta;">*elevate*</span> your RAG systems to the next level.

Here's what we'll cover:

- **Evaluating RAG Systems**: How to measure and improve the effectiveness of your RAG implementation.
- **From Simple to Sophisticated RAG**: A step-by-step guide to building and refining your RAG systems.
- **Common RAG Failures and Solutions**: Identifying and addressing the most common issues that can derail your RAG system.

## Evaluating RAG Systems

Before we jump into the specific techniques, it's important to know how to measure the performance of your RAG system. Just running a few vibe checks isn't enough—you need to <span style="color: magenta;">*evaluate*</span> your system based on how it will perform in <span style="color: magenta;">*real-world scenarios*</span>. This means moving beyond simple vibe checks and adopting a [structured approach](https://hamel.dev/blog/posts/evals/) that reflects the diversity and complexity of user queries. By focusing on the <span style="color: magenta;">*80/20 principle*</span> – identifying the most frequent and impactful query patterns – you can tailor your evaluation to optimize for the most critical use cases.

### Retrieval Evaluation Metrics

![diagram](/assets/images/2024-09-03-applied_rag-2.svg)
Effective retrieval is the <span style="color: magenta;">*foundation*</span> of a successful RAG system. You need to ensure your system can efficiently and accurately find the relevant information within your knowledge base. Here are some common metrics to track:

- **MRR (Mean Reciprocal Rank):** This metric focuses on the ranking of the first relevant result. A higher MRR indicates that your system is good at quickly surfacing the most important document. It's especially relevant when users primarily care about the top result.
- **NDCG (Normalized Discounted Cumulative Gain):** NDCG considers both the relevance and position of multiple retrieved documents. It's a more comprehensive metric when users need several relevant documents to answer their query.
- **Precision and Recall:** These classic metrics provide insights into the accuracy of your retrieval system. Precision measures the proportion of retrieved documents that are relevant, while recall measures the proportion of relevant documents that are retrieved.

### Practical Strategies for Retrieval Evaluation

1. **Query Categorization:** Group your queries by characteristics like complexity, length, topic, and user intent. This helps you identify strengths and weaknesses of your retrieval system for different query types.
![diagram](/assets/images/2024-09-03-applied_rag-3.svg)
    - **Example:**  Categorize queries into "factual", "analytical", "opinion-based" etc. This allows you to analyze retrieval performance for each category.
2. **Diverse Test Set:**  Your test set should include a wide range of queries:
    - **Common Queries:** Reflect the most frequent user queries.
        - **Example 1:** If your system is designed for a customer support chatbot, a common query might be "How do I reset my password?"
        - **Example 2:** For an e-commerce site, a common query could be "What is the return policy?"
        - **Example 3:** In a healthcare application, a frequent query might be "How do I book an appointment with a doctor?"
    - **Edge Cases:** Include unusual or complex queries to test the system's limits.
        - **Example 1:** A complex query could be "Can I transfer my account to another user if I am located in a different country and using a VPN?"
        - **Example 2:** An unusual query might be "What happens if I try to return an item after the return window has closed?"
        - **Example 3:** A rare query could be "How do I access my account if I've forgotten both my password and security questions?"
    - **Queries with Different Intents:** Ensure your test set covers various ways users might ask for the same information.
        - **Example 1:** For a query about store hours, users might ask "What time does the store open?" or "When can I visit the store?" or even "Is the store open now?"
        - **Example 2:** For a query about product availability, users might ask "Is this item in stock?" or "Can I buy this product now?" or "When will this product be available?"
        - **Example 3:** For a query about pricing, users might ask "How much does this cost?" or "What is the price of this item?" or "Is there a discount on this product?"
3. **Human-in-the-Loop Evaluation:**  For complex or subjective queries, human judgment is invaluable. Have human evaluators assess the relevance of retrieved documents. This can be done using platforms like Amazon Mechanical Turk or Prolific.

### Prepare Relevance Dataset

Creating your own relevance dataset has become more accessible than ever, thanks to the capabilities of [**LLMs**](https://eugeneyan.com/writing/llm-evaluators/). Below is a straightforward approach to building a relevance dataset tailored for your **RAG** system:

First, break down your text corpus into manageable chunks, ensuring each chunk is tagged with a source identifier. For instance, use **page numbers** for PDFs, **URLs** for web pages, or **chapter numbers** for books. Next, for each chunk—or a randomly selected subset of chunks—generate a query using the **LLM** that accurately reflects the content of the chunk. Then, use this generated query to retrieve the corresponding relevant chunk of text. By doing so, you can compile a dataset consisting of queries, relevant text chunks, and irrelevant text chunks. This dataset will be invaluable for evaluating and fine-tuning your **RAG** system.

- **sample query generation prompt**

```xml
<instructions>
  Given a text sample or chunk, you must generate a query that accurately represents the main topic or information contained within the text. The query should be concise and relevant to the content of the text.
</instructions>

<important_instruction>
  Ensure the query is specific and captures the essence of the text. Avoid overly broad or vague queries.
</important_instruction>

<text_sample>{text_sample}</text_sample>

<steps>
  <step>Read the text sample carefully to understand its main topic or information.</step>
  <step>Identify the key points or themes in the text.</step>
  <step>Formulate a query that encapsulates the main topic or key points of the text.</step>
  <step>Ensure the query is concise and relevant to the text.</step>
</steps>

<output_format>
  ##query: {generated_query}
</output_format>
```

above is a simple prompt to generate simple queries, now you can also use multiple chunks or combination of chunks to generate more complex queries.

- **sample complex query generation prompt**

```xml
<prompt>
  <instructions>
    Given multiple text samples or chunks, you must generate a complex query that accurately represents the combined information or main topics contained within the text samples. The query should be comprehensive and relevant to the content of all the text samples.
  </instructions>
  <important_instruction>
    Ensure the query is specific and captures the essence of the combined text samples. Avoid overly broad or vague queries.
  </important_instruction>
  <text_samples>
    {% for text_sample in text_samples %}
    <text_sample>{{ text_sample }}</text_sample>
    {% endfor %}
  </text_samples>
  <steps>
    <step>Read each text sample carefully to understand its main topic or information.</step>
    <step>Identify the key points or themes in each text sample.</step>
    <step>Synthesize the information from all text samples to form a comprehensive understanding.</step>
    <step>Formulate a complex query that encapsulates the main topics or key points of all the text samples.</step>
    <step>Ensure the query is comprehensive and relevant to the combined text samples.</step>
  </steps>
  <output_format>##complex_query: {generated_complex_query}</output_format>
</prompt>
```

This will enable you to generate data in the following format:
- query
- doc_source (e.g., URL, page number, etc.)
this is one of the standard format mentioned in [ir-measures](https://ir-measur.es/en/latest/).


**sample passage relevance evaluation prompt**
```xml
<instructions>
    Given a query and a passage, you must provide a score on an integer scale of 0 to 3 with the following meanings:
    <scale>
        <score value="0">
            Represents that the passage has nothing to do with the query.
        </score>
        <score value="1">
            Represents that the passage seems related to the query but does not answer it.
        </score>
        <score value="2">
            Represents that the passage has some answer for the query, but the answer may be a bit unclear, or hidden amongst extraneous information.
        </score>
        <score value="3">
            Represents that the passage is dedicated to the query and contains the exact answer.
        </score>
    </scale>
</instructions>
<important_instruction>
    Assign category 1 if the passage is somewhat related to the topic but not completely, category 2 if the passage presents something very important related to the entire topic but also has some extra information and category 3 if the passage only and entirely refers to the topic. If none of the above satisfies give it category 0.
</important_instruction>
<query>{query}</query>
<passage>{passage}</passage>
<steps>
    <step>
        Consider the underlying intent of the search.
    </step>
    <step>
        Measure how well the content matches a likely intent of the query (M).
    </step>
    <step>
        Measure how trustworthy the passage is (T).
    </step>
    <step>
        Consider the aspects above and the relative importance of each, and decide on a final score (O). Final score must be an integer value only.
    </step>
</steps>
<output_format>
    ##final score: score without providing any reasoning.
</output_format>
```

Utilize the provided prompt to evaluate the <span style="color: magenta;">*relevance*</span> of the passage in relation to the query. The final dataset should be structured as follows:
- **query**
- **doc_source**
- **relevance_score**

![diagram](/assets/images/2024-09-03-applied_rag-4.svg)

In summary, building a robust relevance dataset is crucial for evaluating your RAG system. By breaking down your text corpus into manageable chunks and generating queries that accurately reflect the content, you can create a dataset that includes both relevant and irrelevant text chunks. This dataset will serve as a foundation for evaluating the retrieval component of your RAG system. Additionally, using structured prompts for query generation and relevance testing ensures that your dataset is comprehensive and tailored to your specific use case. Remember, the quality of your retrieval system directly impacts the overall performance of your RAG system, making this step essential for success.

### Generation Evaluation Metrics

Evaluating the generation component of a RAG system is inherently more challenging than evaluating retrieval. While retrieval evaluation can rely on well-established metrics like *precision*, *recall*, and *MRR*, generation evaluation must account for the nuances of natural language, which are often *subjective* and *context-dependent*.

#### Why Generation Evaluation is More Difficult

1. **Subjectivity:** Unlike retrieval, where the relevance of a document can be objectively measured, generation involves assessing the *quality* of text, which can vary based on individual interpretation.
2. **Diversity of Outputs:** A single query can have multiple valid generated responses, making it difficult to establish a "correct" answer.
3. **Context Sensitivity:** The generated text must not only be *accurate* but also *contextually appropriate*, which adds another layer of complexity.

#### Key Strategies for Generation Evaluation

1. **Prompt Engineering:** 
   - Experiment with different prompt structures to optimize the *quality* of generated responses.
   - **Example:** Adjusting the prompt to include more *context* or specific instructions can lead to more *accurate* and *relevant* outputs.

2. **Contextual Relevance:** 
   - Evaluate how well the generated text incorporates the retrieved information.
   - **Example:** The generated response should seamlessly integrate the retrieved facts, ensuring that the output is both *informative* and *contextually appropriate*.

3. **Consistency Checks:** 
   - Implement checks to ensure the generated text does not contradict itself or the source material.
   - **Example:** A response that introduces *conflicting information* or deviates from the retrieved data should be flagged for review.

#### Key Aspects to Evaluate

1. **Faithfulness:** 
   - Is the generated text *accurate* and consistent with the retrieved information?
   - **Example:** The response should not introduce any *factual errors* or misrepresent the retrieved data.

2. **Coherence:** 
   - Does the text flow *logically* and make sense to the reader?
   - **Example:** The generated text should be *well-structured*, with clear and logical progression of ideas.

3. **Relevance:** 
   - Does the generated response actually answer the query?
   - **Example:** The response should directly address the user's question, without unnecessary digressions.

#### Summary
![[RagChecker](https://github.com/amazon-science/RAGChecker)](/assets/images/ragchecker.png)
In summary, while retrieval evaluation is more straightforward due to its reliance on objective metrics, generation evaluation requires a more nuanced approach. By focusing on prompt engineering, contextual relevance, and consistency checks, and by evaluating faithfulness, coherence, and relevance, you can ensure that your RAG system produces high-quality, reliable outputs. Continuous iteration and refinement of these strategies are essential for optimizing the performance of the generation component.

### Best Practices for Evaluation

1. **Continuous Monitoring and Iteration:** Establish a robust system for ongoing evaluation that adapts as your data and model evolve. This ensures that your system remains effective over time and can quickly respond to new challenges.

2. **Holistic Evaluation:** Avoid relying solely on a single metric. Instead, employ a multi-faceted approach that combines automated metrics with human evaluation. This provides a more comprehensive understanding of your system's performance.

3. **In-depth Error Analysis:** Regularly conduct detailed analyses of failure cases to uncover patterns and identify specific areas for improvement. This proactive approach helps in refining both the retrieval and generation components of your RAG system.

4. **A/B Testing for Validation:** When implementing significant changes, use A/B testing to compare the performance of different versions of your system in real-world scenarios. This method allows you to validate improvements and ensure that changes lead to tangible benefits.

5. **Incorporate User Feedback:** Integrate mechanisms for collecting and analyzing user feedback directly into your system. Real-world user insights are invaluable for understanding how your system performs in practice and for guiding future enhancements.

In essence, effective evaluation is not just about obtaining a score—it's about gaining a deep understanding of your system's strengths and weaknesses. By continuously refining your evaluation strategies, you can ensure that your RAG system consistently delivers high-quality, reliable outputs.


## From Simple to Sophisticated RAG

Building a successful RAG system is an iterative process. Start with a simple implementation and progressively incorporate advanced techniques to refine performance.

### Key Components of a RAG System

#### Indexing Stage
![diagram](/assets/images/2024-09-03-applied_rag-5.svg)

- **Data Cleaning:** Ensure that your data is error-free, well-structured, and properly formatted. This is the foundation of any successful RAG system, as clean and consistently formatted data leads to more accurate retrieval and generation. Additionally, converting your data into a standardized markdown format can significantly enhance the downstream generation task. Markdown's structured nature makes it easier for models to parse and understand the content, leading to more coherent and contextually relevant outputs. [Here](https://github.com/jayshah5696/til/blob/main/unstructored/demo.ipynb) I something implement after extracting the text from unstructured to convert it in markdown format.

- **Chunking:** To optimize retrieval, it's essential to experiment with different chunk [sizes](https://huggingface.co/spaces/m-ric/chunk_visualizer) and strategies. I recommend using chunk sizes of 700-800 tokens with overlaps to ensure better context availability. This approach helps capture sufficient context, which is crucial for generating coherent and relevant responses. For simplicity, I prefer focusing on sentence-level or token-level chunking. You can explore more on this topic through research done by chromadb on [chunking strategies](https://research.trychroma.com/evaluating-chunking).

- **Embedding Models:** Select appropriate embedding models and consider fine-tuning them for your specific needs. Start with off-the-shelf models, but as you gather more data (at least 2000-2500 queries), [fine-tuning](https://towardsdatascience.com/task-aware-rag-strategies-for-when-sentence-similarity-fails-54c44690fee3) an open-source model can significantly outperform proprietary options. This allows you to tailor the embeddings to your specific domain, improving retrieval accuracy.

- **Metadata:** Leverage metadata to enhance the retrieval process. Incorporating metadata is essential—use [Named Entity Recognition](https://www.altexsoft.com/blog/named-entity-recognition/) (NER) to extract key information from each chunk or PDF. Even if you're not utilizing all the metadata right away, it's advantageous to include as much information as possible. This approach provides flexibility for future enhancements and improves the precision of your retrieval system.

- **Multi-Indexing:** Consider using multiple indices to handle varied query types effectively. This approach allows your system to be more versatile, catering to different types of queries with specialized indices, thereby improving overall retrieval performance.

#### Augmentation/Generation Stage

- **Baseline Retrieval with BM25 (Best Match 25):** Start with a simple yet effective baseline retrieval method like **BM25 (Best Match 25)**. [BM25](https://bm25s.github.io/) is a tf-idf on steroids that ranks documents based on the frequency of query terms in each document, adjusted by the document length. It's a great starting point for retrieval tasks because of its simplicity and effectiveness in many scenarios.

- **Query Transformation and Expansion:** Once you have a baseline with BM25, consider implementing techniques such as query rephrasing, sub-query generation, or query [expansion](https://python.useinstructor.com/examples/search/) to further improve retrieval accuracy. While query rephrasing and sub-query generation can help in better aligning the query with the indexed documents, query expansion can increase recall by including synonyms or related terms. However, note that while query expansion can retrieve a broader set of relevant documents, it may not necessarily increase precision.

- **Retrieval Parameters:** Adjust parameters like the number of documents retrieved and the search method (e.g., BM25, vector-based retrieval) to optimize results. Start with BM25 and then experiment with more advanced methods as needed.

- **Reranking Models:** After retrieving documents with BM25, use reranking models to prioritize the most relevant results. Reranking can be particularly useful when the initial retrieval set is large, allowing you to refine the results based on more sophisticated criteria like semantic relevance or user intent. Cohere [reranking](https://github.com/AnswerDotAI/rerankers) model is game changer.

- **Monitor each metric:**  To ensure my RAG system is performing optimally, monitor the BM25 score, semantic cosine distance, and the reranking model score for each query. This allows you to debug and fine-tune my system. By tracking these metrics, you can identify any issues with the retrieval process, such as whether the model is accurately capturing the user's intent or if the reranking model is effectively prioritizing relevant documents. This data helps in understanding the system's strengths and weaknesses, allowing us to make informed decisions about how to improve its performance.

- **Query Clustering** I've found that query clustering can be an invaluable technique for identifying performance gaps in a RAG system. By grouping similar user queries into clusters, you can gain insights into how well your system handles different types of queries and identify areas where it may be underperforming. This approach allows you to focus your optimization efforts on specific clusters of queries that are not performing as well as others, thereby improving the overall effectiveness of your system. It's also important to continuously monitor these clusters at regular intervals to ensure that any emerging issues are promptly addressed and that the system remains optimized over time.


## Common RAG Failures and How to Address Them

Building a robust RAG system requires not only focusing on what works but also understanding the common pitfalls that can undermine your system's performance. By recognizing and addressing these failures early on, you can create a more resilient and reliable system. Below, we explore the most frequent issues encountered in RAG systems and provide strategies to mitigate them. This proactive approach will help you anticipate challenges and implement solutions that enhance the overall effectiveness of your RAG pipeline.

### Pre-Retrieval Failures

- **Poor Data Preparation or Embedding Selection:**  
  - **Example:** Imagine your dataset contains a lot of noise or irrelevant information. In such cases, the retrieval system might return documents that are not useful or even incorrect. Similarly, if you choose an embedding model that hasn't been fine-tuned for your specific domain, the system might fail to understand the semantic nuances, leading to missed relevant content. For instance, using a general-purpose embedding model in a specialized field like legal or medical domains could result in suboptimal retrieval performance.

  - **My Take:** In my experience, robust data preprocessing and careful selection of embedding models are non-negotiable steps in building an effective RAG system. [Fine-tuning your embedding model](https://sbert.net/docs/sentence_transformer/training_overview.html) to your specific domain can make a significant difference in retrieval accuracy. I recommend investing time in these areas to avoid common pitfalls and ensure your system performs at its best.

### Retrieval Failures

- **Inadequate Retrieval Techniques or Query Representation:**  
  I've found that inadequate retrieval techniques or poor query representation can really hinder the effectiveness of any RAG system, leading to missed relevant content and suboptimal results. To tackle these issues, I make it a point to explore and implement a combination of hybrid and advanced retrieval strategies that can enhance the accuracy and relevance of the information I retrieve.

  - **Hybrid Retrieval Approaches:**  
    I've found that hybrid retrieval, which combines the strengths of different retrieval methods, can significantly enhance the performance of a RAG system. By blending semantic search with traditional keyword-based search, I can capture both the nuanced meaning of queries and the exact matches. For example, I might use a dense vector search to grasp semantic similarities while also employing a sparse vector search to ensure specific keywords are considered. This dual approach has proven particularly effective when dealing with complex or ambiguous queries.

![diagram](/assets/images/2024-09-03-applied_rag-6.svg)

    - **Example:** Imagine a scenario where a user is querying a legal document database with the phrase "intellectual property rights." A purely keyword-based search might return documents that mention these exact terms but miss out on relevant documents that discuss "patent law" or "copyright issues" without using the exact phrase. By using a hybrid approach, I can ensure the system retrieves documents that are semantically related to the query, providing a more comprehensive set of results.

    - **My Take:** In my experience, hybrid retrieval is especially effective in domains where the language is highly specialized or where users might not know the exact terminology to use. Implementing a hybrid approach has significantly reduced the chances of missing out on critical information, particularly in fields like law, medicine, or technical support.

  - **Advanced Query Representation:**  
    I've learned that the way queries are represented plays a crucial role in the retrieval process. Simple keyword-based queries often fail to capture the full intent of the user, leading to incomplete or irrelevant results. To address this, I've started employing advanced query representation techniques like [query expansion](https://github.com/jayshah5696/pravah), where additional terms related to the original query are added to improve retrieval accuracy. Another technique I use is query rephrasing, where the query is reformulated to better align with the structure of the indexed data. Additionally, leveraging pre-trained language models to generate embeddings for queries has helped me capture the semantic meaning more effectively, leading to more accurate retrieval.

    - **Example:** Suppose a user queries an e-commerce site with "affordable smartphones." A basic keyword search might return results that include the word "affordable" but miss out on synonyms like "budget" or "cheap." By using query expansion, I can ensure the system automatically includes these synonyms, thereby retrieving a broader range of relevant products.

    - **My Take:** In my view, query expansion is particularly useful in consumer-facing applications where users might use a variety of terms to describe the same concept. Implementing these techniques has made my systems more robust and user-friendly.

  - **Contextual Query Understanding:**  
    I've also found that incorporating context into query understanding can significantly enhance retrieval performance. This involves analyzing the user's query in the context of previous interactions or related queries to better understand the user's intent. For example, if a user has previously asked about a specific topic, the system can use this context to refine the retrieval process for subsequent queries. This approach not only improves the relevance of the retrieved documents but also enhances the overall user experience by providing more personalized and contextually appropriate results.

    - **Example:** Consider a user who first queries "best practices for data security" and later asks "how to implement these practices in a cloud environment." A system that understands the context of the previous query can better tailor the results of the second query to focus on cloud-specific data security practices.

    - **My Take:** Contextual query understanding is a game-changer for systems that handle complex, multi-turn interactions. In my opinion, this is particularly valuable in customer support or educational platforms, where understanding the user's journey can lead to more accurate and helpful responses. Implementing this strategy has significantly improved user satisfaction and system effectiveness.

  By integrating these hybrid and advanced retrieval strategies, along with contextual query understanding, I've been able to mitigate the risks associated with inadequate retrieval techniques and poor query representation. This ensures that my RAG system consistently surfaces the most relevant and accurate information, ultimately leading to a more effective and user-friendly system.

### Post-Retrieval Failures

- **Ineffective Processing of Results:**  
  Ineffective processing of results can hurt LLM performance. Employing techniques like <span style="color: magenta;">context enrichment</span> or summarization can significantly improve the quality of the output.

  - **Example:** Suppose your system retrieves a lengthy document on "climate change policies." If you pass the entire document to the LLM, it might generate a broad or unfocused response. However, by summarizing the document or <span style="color: magenta;">extracting key points</span>, you can guide the LLM to produce a more precise and relevant answer.

  - **My Take:** These techniques—<span style="color: magenta;">context enrichment</span> and summarization—are simple yet powerful. They help ensure that the LLM zeroes in on the most important information, leading to clearer and more accurate responses. However, this can be challenging and may increase latency.

### Generation Failures

- **Weak Context or Poorly Designed Prompts:**  
  Weak context or poorly designed prompts can result in <span style="color: magenta;">*irrelevant*</span> or even <span style="color: magenta;">*misleading*</span> responses from the LLM. To mitigate this, it's crucial to enhance your prompts by providing comprehensive context and employing <span style="color: magenta;">*advanced prompt engineering techniques*</span>. 

  - **Example:** Suppose you're working on a customer support chatbot, and the user asks, "*How do I fix my account?*" A weak prompt might simply pass this question to the LLM without any additional context, leading to a <span style="color: magenta;">*generic*</span> or <span style="color: magenta;">*irrelevant*</span> response. However, by enhancing the prompt with more context—such as including details about the user's account type, recent activities, or common issues related to their account—you can guide the LLM to generate a more <span style="color: magenta;">*accurate*</span> and helpful response. For instance, a more effective prompt could be: "*The user has a premium account and recently reported issues with password recovery. How should they proceed to fix their account?*"

  - **My Take:** In my experience, the quality of the prompt is directly proportional to the <span style="color: magenta;">*quality*</span> of the LLM's output. I've found that using a structured approach, like <span style="color: magenta;">*chain-of-thought prompting*</span>, can significantly improve the relevance and <span style="color: magenta;">*accuracy*</span> of the generated responses. For example, I often use a <span style="color: magenta;">*\<scratchpad\>*</span> within the prompt to break down complex queries into smaller, manageable steps, allowing the LLM to "*think*" through the problem before generating a response. This method not only enhances the LLM's performance but also makes the system more robust against ambiguous or poorly defined queries. 

  Additionally, I always evaluate the effectiveness of my prompts against a set of predefined metrics, such as relevance, coherence, and <span style="color: magenta;">*user satisfaction*</span>. This rigorous evaluation process helps me identify weak points in the prompt design and make necessary adjustments. In my view, <span style="color: magenta;">*prompt engineering*</span> is an iterative process that requires continuous refinement to achieve optimal results. By packing the prompt with relevant information and context, and by rigorously evaluating the output, I've been able to significantly reduce the occurrence of <span style="color: magenta;">*irrelevant*</span> or <span style="color: magenta;">*misleading*</span> responses, thereby improving the overall effectiveness of my RAG system.

## Final Thoughts

Mastering advanced RAG techniques isn't just about fine-tuning your system to get slightly better results—it's about transforming your RAG pipeline into a tool that can handle the complexities and demands of real-world applications. The techniques we've covered here, from better evaluation metrics to optimizing each stage of your pipeline, are all part of that journey.

But remember, this is an ongoing process. The world of AI and LLMs is constantly evolving, and so should your RAG systems. By continuously experimenting, evaluating, and refining, you'll be able to stay ahead of the curve and build systems that don't just meet today's challenges, but anticipate tomorrow's.

References:
- [1] [Evaluations in AI](https://hamel.dev/blog/posts/evals/)
- [2] [Chunk Visualizer on Hugging Face](https://huggingface.co/spaces/m-ric/chunk_visualizer)
- [3] [Evaluating Chunking](https://research.trychroma.com/evaluating-chunking)
- [4] [Task-Aware RAG Strategies](https://towardsdatascience.com/task-aware-rag-strategies-for-when-sentence-similarity-fails-54c44690fee3)
- [5] [Named Entity Recognition](https://www.altexsoft.com/blog/named-entity-recognition/)
- [6] [BM25s Documentation](https://bm25s.github.io/)
- [7] [Python Search Examples](https://python.useinstructor.com/examples/search/)
- [8] [Rerankers on GitHub](https://github.com/AnswerDotAI/rerankers)
- [9] [Sentence Transformer Training Overview](https://sbert.net/docs/sentence_transformer/training_overview.html)
- [10] [Unstructured Data Demo](https://github.com/jayshah5696/til/blob/main/unstructored/demo.ipynb)
- [11] [Pravah Project](https://github.com/jayshah5696/pravah)
- [12] [LLM Evaluators](https://eugeneyan.com/writing/llm-evaluators/)
- [13] [IR Measures Documentation](https://ir-measur.es/en/latest)
