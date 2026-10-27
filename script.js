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
  { title: "Podcast", category: "REELS", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 02", category: "CINEMATIC REEL", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 03", category: "VELOCITY EDIT", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 04", category: "MONTAGE", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 05", category: "TRANSITIONS", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 06", category: "COLOR GRADE", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Portrait Edit 07", category: "SHORT-FORM", orientation: "portrait", src: "", description: "Add your edit and update this description." },
  { title: "Documentary Style", category: "YOUTUBE", orientation: "landscape", src: "", description: "Add your edit and update this description." },
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
