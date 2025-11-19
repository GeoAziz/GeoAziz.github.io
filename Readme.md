# GeoAziz GitHub Pages Tech Blog

![GitHub repo size](https://img.shields.io/github/repo-size/GeoAziz/GeoAziz.github.io)
![GitHub stars](https://img.shields.io/github/stars/GeoAziz/GeoAziz.github.io?style=social)
![GitHub forks](https://img.shields.io/github/forks/GeoAziz/GeoAziz.github.io?style=social)
![GitHub issues](https://img.shields.io/github/issues/GeoAziz/GeoAziz.github.io)
![GitHub license](https://img.shields.io/github/license/GeoAziz/GeoAziz.github.io)

A personal **tech blog** to document my learning journey, projects, tutorials, and experiments as a developer. Built with **Jekyll** and hosted on **GitHub Pages**.

---

## 📝 Pages
- Home
- About Me
- Projects
- Blog Posts

---

## 🚀 30-Day Tech Blog Roadmap (Beginner → Pro)

### 🌍 Phase 1 — Setup & Foundation (Days 1–4)
**Goal:** Launch your blog, structure ready, publish first post.  
- **Day 1:** Create blog repo & enable GitHub Pages (✅ done)  
- **Day 2:** Customize layout: `index.md`, banner, bio, navbar (Blog | Projects | About Me)  
- **Day 3:** Create `_posts/` folder + first post: “My Journey Starting a GitHub Tech Blog”  
- **Day 4:** SEO & performance: sitemap, Google indexing, optional custom domain  

### ⚡ Phase 2 — Tech Blogs (Days 5–14)
**Goal:** Build consistency, publish short tutorials.  
- Day 5 — Cloudflare outage report  
- Day 6 — DNS & CDNs  
- Day 7 — Intro to DevOps  
- Day 8 — Docker  
- Day 9 — Networking Fundamentals  
- Day 10 — Git & GitHub  
- Day 11 — Mini Cloudflare Engine Part 1  
- Day 12 — Mini Cloudflare Engine CLI design  
- Day 13 — Proxies, tunnels, Tor, routing  
- Day 14 — Beginner roadmap to cybersecurity  

### 🧠 Phase 3 — Deep Technical (Days 15–21)
- Explainable AI, deadlocks, API security, Python networking, load balancers, app hosting, CLI tools  

### 🧨 Phase 4 — Personal Branding & Career (Days 22–26)
- Developer story, portfolio projects, study methods, 2025 goals, career vision  

### 🏁 Phase 5 — Final Pro Mode (Days 27–30)
- Add Projects page, comments system, dark mode, launch & share  

---

## ✅ Outcomes
By Day 30, you’ll have:  
- A **live public GitHub Pages website**  
- 30 blog posts documenting your journey  
- Your name indexed on Google  
- Personal branding & portfolio material  
- Massive visibility in dev communities  

---

## 📌 Tech Stack


## 📫 Contact
---

## Local preview (what I added)

I added a simple home page (`index.md`), a navigation include (`_includes/nav.html`), a minimal
layout (`_layouts/default.html`), a small stylesheet (`assets/main.css`) and a placeholder
`projects.md` page. To preview locally:

```zsh
cd /mnt/devmandrive/projects/Blog/GeoAziz.github.io/GeoAziz.github.io
bundle exec jekyll serve
```

Open http://127.0.0.1:4000/ in your browser.

---

## Day 4 — SEO & GitHub Pages maximization (what I added)

I updated the site to improve SEO, add a sitemap, and provide a social preview image. Changes:

- Added gems to `Gemfile`: `jekyll-seo-tag`, `jekyll-sitemap` (in addition to `jekyll-feed`).
- Updated `_config.yml` with site `title`, `description`, `url`, `twitter_username`, `github_username`, added `plugins` and `social.image`.
- Added `{% seo %}` to the main layout (`_layouts/default.html`) so meta tags are injected.
- Added a placeholder social preview image: `assets/images/og-image.svg` (1200x630).

To install and preview locally:

```zsh
bundle install
bundle exec jekyll serve
```

This will generate `sitemap.xml` at your site root automatically and make pages share-friendly.

