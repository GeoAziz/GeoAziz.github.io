(function(){
  'use strict';
  // Accessible client-side filtering for projects
  function initFilters(){
    const container = document.querySelector('.filter-bar');
    if(!container) return;
    const buttons = Array.from(container.querySelectorAll('.filter-btn'));
    const cards = Array.from(document.querySelectorAll('.project-card'));

    function applyFilter(cat){
      cards.forEach(c=>{
        const cats = (c.dataset.cats||'').split(/\s+/).filter(Boolean);
        if(cat==='*' || cats.indexOf(cat)!==-1){ c.style.display='flex'; } else { c.style.display='none'; }
      });
    }

    function activateButton(btn){
      buttons.forEach(b=>{ b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
      applyFilter(btn.dataset.filter);
    }

    // Click handlers
    buttons.forEach((b,i)=>{
      b.setAttribute('role','button');
      b.setAttribute('tabindex','0');
      if(b.classList.contains('active')) b.setAttribute('aria-pressed','true'); else b.setAttribute('aria-pressed','false');
      b.addEventListener('click', function(){ activateButton(b); });

      // keyboard support: Left/Right to move, Enter/Space to activate
      b.addEventListener('keydown', function(e){
        if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
          e.preventDefault(); const next = (e.key === 'ArrowRight') ? buttons[(i+1)%buttons.length] : buttons[(i-1+buttons.length)%buttons.length]; next.focus();
        } else if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault(); activateButton(b);
        }
      });
    });
  }

  // Projects hero particles (lighter than homepage)
  function initHeroParticles(){
    const canvas = document.getElementById('projects-hero-canvas'); if(!canvas) return;
    const ctx = canvas.getContext('2d'); let w,h;
    function resize(){ w=canvas.width=canvas.clientWidth; h=canvas.height=canvas.clientHeight; }
    window.addEventListener('resize', resize); resize();
    let t=0;
    function draw(){ ctx.clearRect(0,0,w,h);
      const g = ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,'rgba(0,120,255,0.03)'); g.addColorStop(1,'rgba(120,0,255,0.03)'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      // subtle moving bands
      for(let i=0;i<6;i++){ ctx.fillStyle = `rgba(255,255,255,${0.01 + (i%2?0.0:0.01)})`; const y = (Math.sin((t+i)/50)*20) + (h*(i/6)); ctx.fillRect(0,Math.round(y),w,6); }
      t+=1; requestAnimationFrame(draw);
    }
    draw();
  }

  document.addEventListener('DOMContentLoaded', function(){ initFilters(); initHeroParticles(); });
})();
