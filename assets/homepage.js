// Lightweight homepage interactions: particles, typewriter, reveal, tilt, carousel
(function(){
  'use strict';
  // Particles background
  function initParticles(){
    const canvas = document.getElementById('hero-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles;
    function resize(){ w = canvas.width = canvas.clientWidth; h = canvas.height = canvas.clientHeight; }
    window.addEventListener('resize', resize);
    resize();
    function rand(min,max){ return Math.random()*(max-min)+min; }
    particles = new Array(60).fill().map(()=>({x:rand(0,w), y:rand(0,h), r:rand(0.6,2.6), vx:rand(-0.2,0.2), vy:rand(-0.05,0.05), hue:rand(200,290)}));
    function draw(){
      ctx.clearRect(0,0,w,h);
      // animated gradient overlay
      const g = ctx.createLinearGradient(0,0,w,h);
      g.addColorStop(0,'rgba(20,70,200,0.08)'); g.addColorStop(0.5,'rgba(130,20,215,0.05)'); g.addColorStop(1,'rgba(0,200,180,0.04)');
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
      particles.forEach(p=>{
        p.x += p.vx; p.y += p.vy;
        if(p.x< -10) p.x = w+10; if(p.x> w+10) p.x = -10; if(p.y< -10) p.y = h+10; if(p.y>h+10) p.y = -10;
        ctx.beginPath(); ctx.fillStyle = `hsla(${p.hue},80%,65%,0.12)`; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  // Typewriter
  function initTypewriter(){
    const el = document.getElementById('typewriter');
    if(!el) return;
    const lines = ['Hassan AbdulAziz — 10-Year-Old Developer & Future Engineer'];
    let i=0, j=0, direction=1;
    function tick(){
      const text = lines[i];
      el.textContent = text.slice(0,j);
      j += direction;
      if(j>text.length){ setTimeout(()=>{ direction=-1; }, 800); }
      if(j<=0 && direction===-1){ direction=1; j=0; i=(i+1)%lines.length; }
      setTimeout(tick, 40 + Math.random()*40);
    }
    tick();
  }

  // Reveal on scroll
  function initReveal(){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    },{rootMargin:'-10% 0px',threshold:0.08});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  }

  // Tilt cards
  function initTilt(){
    document.querySelectorAll('.featured-card, .proj-card, .about-inner').forEach(card=>{
      card.addEventListener('mousemove', function(e){
        const r = card.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
        const rx = (y-0.5)*6; const ry = (x-0.5)*-6;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
      card.addEventListener('mouseleave', ()=>{ card.style.transform='none'; });
    });
  }

  // Simple projects carousel
  function initCarousel(){
    const root = document.getElementById('projects-carousel'); if(!root) return;
    const track = root.querySelector('.carousel-track'); const prev = root.querySelector('.carousel-prev'); const next = root.querySelector('.carousel-next');
    let idx=0; const cards = track.children; const total = cards.length;
    function update(){ track.style.transform = `translateX(${-idx*(cards[0].offsetWidth+16)}px)`; }
    window.addEventListener('resize', update);
    prev.addEventListener('click', ()=>{ idx = (idx-1+total)%total; update(); });
    next.addEventListener('click', ()=>{ idx = (idx+1)%total; update(); });
    // auto-slide
    let auto = setInterval(()=>{ idx=(idx+1)%total; update(); }, 3500);
    root.addEventListener('mouseenter', ()=>clearInterval(auto)); root.addEventListener('mouseleave', ()=>{ auto=setInterval(()=>{ idx=(idx+1)%total; update(); },3500); });
  }

  // Smooth anchor scrolling
  function initAnchors(){ document.querySelectorAll('a[href^="#"]').forEach(a=>{ a.addEventListener('click', function(e){ const t=document.querySelector(this.getAttribute('href')); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); } }); }); }

  // Boot
  document.addEventListener('DOMContentLoaded', function(){ initParticles(); initTypewriter(); initReveal(); initTilt(); initCarousel(); initAnchors(); });
})();
