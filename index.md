---
layout: default
title: Home
---

<div class="hero">
  <pre class="ascii">  ____  _____  _   _    _    ___  ___  
 / ___||__  / | | | |  / \  / _ \/ _ \ 
 \___ \  / /  | |_| | / _ \| | | | | | |
  ___) |/ /_  |  _  |/ ___ \ |_| | |_| |
 |____/____| |_| |_/_/   \_\\___/ \___/ 
  </pre>
  <h1>Hi — I'm GeoAziz</h1>
  <p class="tagline">Developer • Learner • Builder</p>
</div>

<section class="intro">
  <h2>Welcome</h2>
  <p>
    I'm building here to document projects, experiments, and lessons learned while learning web
    development, DevOps, and systems design. Expect short tutorials, notes, and project write-ups.
  </p>

  <p class="contacts">
    Contact: <a href="mailto:{{ site.email }}">Email</a> •
    <a href="https://github.com/{{ site.github_username }}">GitHub</a> •
    <a href="#">LinkedIn</a> •
    <a href="#">Discord</a>
  </p>
</section>

<section class="quick-links">
  <h3>Explore</h3>
  <ul>
    <li><a href="/blog/">Blog</a></li>
    <li><a href="/projects/">Projects</a></li>
    <li><a href="/about/">About Me</a></li>
  </ul>
</section>

<section class="subscribe">
  <h3>Subscribe</h3>
  <p>Get short updates when I publish new posts.</p>
  <form action="https://example.com/subscribe" method="post">
    <input type="email" name="email" placeholder="you@example.com" required>
    <button type="submit">Subscribe</button>
  </form>
</section>

<section class="home-magazine">
  <h2>Latest Posts</h2>
  {% for post in site.posts %}
  <div class="post-preview">
    {% if post.image %}
      <a href="{{ post.url }}"><img src="{{ post.image }}" alt="{{ post.title }}" /></a>
    {% endif %}
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="muted small">{{ post.date | date: "%Y-%m-%d" }} • {{ post.categories | join: ", " }}</p>
    <p>{{ post.excerpt }}</p>
    <p><a href="{{ post.url }}" class="nav-cta">Read more</a></p>
  </div>
  {% endfor %}
</section>
