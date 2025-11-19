---
---
layout: default
title: Home
---

<header class="hero hero-futuristic">
  <canvas id="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero-inner container">
    <div class="hero-content">
      <h1 class="hero-title"><span id="typewriter"></span></h1>
      <p class="hero-sub">I build, break, debug and create. Welcome to my world.</p>
      <p class="hero-ctas">
        <a class="nav-cta" href="/blog/">🚀 Read My Blog</a>
        <a class="nav-cta ghost" href="/projects/">🛠 Projects</a>
      </p>
    </div>

    <div class="hero-side">
      <div class="glow-box">
        <p class="stat">10y</p>
        <p class="label">Developer</p>
      </div>
    </div>
  </div>
</header>

<!-- Featured posts (latest 3) -->
<section class="container featured" id="featured">
  <h2>Featured</h2>
  <div class="featured-grid">
    {% for post in site.posts limit:3 %}
    <article class="featured-card reveal">
      {% if post.image %}
      <a href="{{ post.url }}"><img src="{{ post.image }}" alt="{{ post.title }}" loading="lazy"/></a>
      {% endif %}
      <div class="card-body">
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p class="excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
        <p><a class="link-more" href="{{ post.url }}">Read more →</a></p>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<!-- Knowledge panels -->
<section class="container panels">
  <h2>Areas I write about</h2>
  <div class="panel-row">
    <div class="panel reveal">
      <div class="icon">⚡</div>
      <h4>Networking Fundamentals</h4>
      <hr/>
      <ul>
        <li>OSI, TCP/IP</li>
        <li>Switching & Routing</li>
      </ul>
    </div>
    <div class="panel reveal">
      <div class="icon">🧩</div>
      <h4>DevOps & Cloud</h4>
      <hr/>
      <ul>
        <li>CI/CD, Containers</li>
        <li>Monitoring & Infra</li>
      </ul>
    </div>
    <div class="panel reveal">
      <div class="icon">🔥</div>
      <h4>AI & Explainability</h4>
      <hr/>
      <ul>
        <li>EthixAI & model introspection</li>
      </ul>
    </div>
  </div>
</section>

<!-- Latest feed -->
<section class="container latest">
  <h2>Latest from the blog</h2>
  <ul class="latest-list">
    {% for post in site.posts offset:0 limit:8 %}
    <li class="latest-item reveal">
      <a href="{{ post.url }}">{{ post.title }}</a>
      <p class="two-line">{{ post.excerpt | strip_html | truncate: 140 }}</p>
      <span class="tag">{{ post.categories | first }}</span>
    </li>
    {% endfor %}
  </ul>
</section>

<!-- About mini profile -->
<section class="container about-card reveal" id="about-mini">
  <div class="about-inner">
    <img class="avatar" src="/assets/images/avatar.jpg" alt="Hassan" loading="lazy"/>
    <div class="about-body">
      <h3>Hassan AbdulAziz — 10-Year-Old Developer</h3>
      <p>I learn fast. I build daily. This is my journey.</p>
      <p class="socials">
        <a href="https://github.com/{{ site.github_username }}">GitHub</a>
        <a href="#">Discord</a>
        <a href="#">LinkedIn</a>
      </p>
    </div>
  </div>
</section>

<!-- Subscribe CTA -->
<section class="container subscribe-cta reveal" id="subscribe">
  <div class="subscribe-inner">
    <div>
      <h3>📬 Join 120+ readers — get new posts weekly</h3>
      <p>Short, practical notes on networking, cloud, and AI.</p>
    </div>
    <form class="subscribe-form" action="https://buttondown.email/api/emails/embed-subscribe/{{ site.buttondown_username }}" method="post" target="popupwindow" onsubmit="window.open('https://buttondown.email/{{ site.buttondown_username }}', 'popupwindow')">
      <input type="email" name="email" placeholder="you@example.com" required />
      <button class="nav-cta" type="submit">Subscribe</button>
    </form>
  </div>
</section>

<!-- Projects carousel (simple) -->
<section class="container projects-carousel reveal">
  <h2>Projects</h2>
  <div id="projects-carousel" class="carousel">
    <div class="carousel-track">
      <div class="proj-card">Mini-Cloudflare Engine</div>
      <div class="proj-card">EthixAI</div>
      <div class="proj-card">Android + React</div>
      <div class="proj-card">Networking Labs</div>
    </div>
    <button class="carousel-prev" aria-label="Previous">‹</button>
    <button class="carousel-next" aria-label="Next">›</button>
  </div>
</section>

<script src="/assets/homepage.js" defer></script>
