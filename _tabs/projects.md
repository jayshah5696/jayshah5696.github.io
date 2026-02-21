---
layout: page
title: Projects
icon: fas fa-project-diagram
order: 5
permalink: /projects/
---

{% for post in site.posts %}
{% if post.projects %}
<h3>
  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
</h3>
<p>{{ post.description }}</p>
<p class="text-muted small">
  <i class="far fa-calendar fa-fw"></i> {{ post.date | date: "%B %d, %Y" }}
</p>
<hr>
{% endif %}
{% endfor %}
