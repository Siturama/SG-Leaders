const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
document.querySelector('#year').textContent = new Date().getFullYear();


// VIDEO PORTFOLIO: 10 editable slots.
// Add MP4 files inside the videos/ folder and put the filename in src.
// First 7 slots are PORTRAIT (9:16); last 3 are LANDSCAPE (16:9).
const portfolioVideos = [
  { title: "Portrait Edit 01", category: "REELS", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 02", category: "CINEMATIC REEL", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 03", category: "VELOCITY EDIT", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 04", category: "MONTAGE", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 05", category: "TRANSITIONS", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 06", category: "COLOR GRADE", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 07", category: "SHORT-FORM", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Landscape Edit 01", category: "YOUTUBE", orientation: "landscape", src: "", description: "Add your edit and update this description." },
  { title: "Landscape Edit 02", category: "CINEMATIC FILM", orientation: "landscape", src: "", description: "Add your edit and update this description." },
  { title: "Landscape Edit 03", category: "SHOWREEL", orientation: "landscape", src: "", description: "Add your edit and update this description." }
];

const videoGallery = document.querySelector('#video-gallery');
if (videoGallery) {
  videoGallery.innerHTML = portfolioVideos.map((v, i) => {
    const orientation = v.orientation === 'landscape' ? 'landscape' : 'portrait';
    const media = v.src
      ? `<video controls preload="metadata" playsinline aria-label="${safeText(v.title)}"><source src="${safeText(v.src)}" type="video/mp4">Your browser does not support video playback.</video>`
      : `<div class="video-placeholder"><span class="placeholder-play">▶</span><span class="placeholder-label">ADD YOUR VIDEO HERE</span><span class="placeholder-ratio">${orientation === 'portrait' ? '9:16 PORTRAIT' : '16:9 LANDSCAPE'}</span></div>`;
    return `<article class="video-card ${orientation} reveal"><div class="video-player-wrap">${media}<span class="video-number">VIDEO / ${String(i+1).padStart(2,'0')}</span></div><div class="video-card-info"><span class="video-category">${safeText(v.category || 'VIDEO EDIT')}</span><h3>${safeText(v.title)}</h3><p>${safeText(v.description || '')}</p></div></article>`;
  }).join('');
  videoGallery.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
function safeText(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }


// Smooth mouse-follow glow accent (desktop only; respects reduced-motion settings).
const cursorGlow = document.querySelector('.cursor-glow');
const cursorCore = document.querySelector('.cursor-core');
if (cursorGlow && cursorCore && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let glowX = mouseX, glowY = mouseY;
  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX; mouseY = event.clientY;
    document.body.classList.add('pointer-active');
    cursorCore.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });
  window.addEventListener('pointerleave', () => document.body.classList.remove('pointer-active'));
  const animateGlow = () => {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();
}


// Premium interactions: reading progress, gallery filters, and subtle card tilt.
const progressFill = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressFill) progressFill.style.width = `${progress}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const galleryFilters = document.querySelector('.gallery-filters');
if (galleryFilters && videoGallery) {
  galleryFilters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    galleryFilters.querySelectorAll('button').forEach((item) => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    videoGallery.querySelectorAll('.video-card').forEach((card) => {
      const matches = filter === 'all' || card.classList.contains(filter);
      card.hidden = !matches;
    });
    const count = videoGallery.querySelectorAll('.video-card:not([hidden])').length;
    const countLabel = document.querySelector('#video-count');
    if (countLabel) countLabel.textContent = `${String(count).padStart(2, '0')} PROJECT${count === 1 ? '' : 'S'}`;
  });
}

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.project, .video-card, .service').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--pointer-x', `${x * 100}%`);
      card.style.setProperty('--pointer-y', `${y * 100}%`);
    }, { passive: true });
  });
}

// CINEMATIC MOTION PACK — optional effects, no libraries required.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  // Brief cinematic intro; never blocks the page or navigation.
  if (!sessionStorage.getItem('cinematicIntroSeen')) {
    const intro = document.createElement('div');
    intro.className = 'motion-intro';
    intro.setAttribute('aria-hidden', 'true');
    intro.innerHTML = '<div class="motion-intro-inner"><span class="motion-intro-mark">Y.</span><span>Every frame has a feeling.</span></div>';
    document.body.appendChild(intro);
    sessionStorage.setItem('cinematicIntroSeen', '1');
    window.setTimeout(() => intro.remove(), 2200);
  }

  // Fine-grain floating particles on a lightweight canvas.
  const canvas = document.createElement('canvas');
  canvas.id = 'motion-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    let w = 0, h = 0, particles = [];
    const pointer = { x: -1000, y: -1000 };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(54, Math.max(18, Math.floor((w * h) / 26000)));
      particles = Array.from({ length: count }, () => ({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.3+.3, vx: (Math.random()-.5)*.18, vy: (Math.random()-.5)*.18, a: Math.random()*.4+.12 }));
    };
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      for (let i=0;i<particles.length;i++) {
        const p=particles[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
        const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);
        if(dist<125){p.x+=dx/(dist||1)*.15;p.y+=dy/(dist||1)*.15;}
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(197,242,119,${p.a})`;ctx.fill();
        for(let j=i+1;j<particles.length;j++){
          const q=particles[j],d=Math.hypot(p.x-q.x,p.y-q.y);
          if(d<95){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(197,242,119,${.055*(1-d/95)})`;ctx.lineWidth=.6;ctx.stroke();}
        }
      }
      requestAnimationFrame(draw);
    };
    resize(); window.addEventListener('resize', resize, { passive:true });
    window.addEventListener('pointermove', e=>{pointer.x=e.clientX;pointer.y=e.clientY;},{passive:true});
    draw();
  }

  // Custom cursor ring that expands over clickable elements.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const ring=document.createElement('div');ring.className='cursor-ring';ring.setAttribute('aria-hidden','true');document.body.appendChild(ring);
    let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
    window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;ring.style.left=x+'px';ring.style.top=y+'px';document.body.classList.add('pointer-active');},{passive:true});
    document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,.video-card,.project,.service'))ring.classList.add('is-hover');});
    document.addEventListener('pointerout',e=>{if(e.target.closest('a,button,.video-card,.project,.service'))ring.classList.remove('is-hover');});
    const follow=()=>{rx+=(x-rx)*.22;ry+=(y-ry)*.22;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(follow);};follow();
  }

  // Gentle 3D tilt, only for devices with a real mouse.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.project, .video-card').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
        card.style.transform=`perspective(900px) rotateX(${(0.5-py)*4}deg) rotateY(${(px-0.5)*5}deg) translateY(-3px)`;
      },{passive:true});
      card.addEventListener('pointerleave',()=>{card.style.transform='';});
    });
    document.querySelectorAll('.button-primary,.nav-cta').forEach(btn=>{
      btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.045}px,${(e.clientY-r.top-r.height/2)*.08}px)`;},{passive:true});
      btn.addEventListener('pointerleave',()=>{btn.style.transform='';});
    });
  }

  // Tiny click ripple on buttons (no effect on touch-only devices).
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('click',e=>{
      if(!e.target.closest('a,button'))return;
      const ripple=document.createElement('span');ripple.className='click-ripple';ripple.style.left=e.clientX+'px';ripple.style.top=e.clientY+'px';document.body.appendChild(ripple);
      window.setTimeout(()=>ripple.remove(),700);
    });
  }
})();
