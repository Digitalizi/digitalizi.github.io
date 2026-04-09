/* ===================================================
   DIGITALIZI — main.js
   Phase 1 : interactions de base
   =================================================== */

// ---------- 1. Navbar mobile toggle ----------
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fermer le menu mobile au clic sur un lien
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---------- 2. Navbar : bordure au scroll ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = '#374151';
  } else {
    navbar.style.borderBottomColor = '#1F2937';
  }
});

// ---------- 3. Smooth scroll sur les ancres ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---------- 4. Animations fade-in au scroll ----------
// Ajoute la classe .fade-in aux éléments à animer
const elementsToAnimate = document.querySelectorAll(
  '.about-card, .project-card, .section-title, .section-sub, .hero-content'
);
elementsToAnimate.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Délai progressif pour un effet cascade
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

elementsToAnimate.forEach(el => observer.observe(el));

// ---------- 5. Lien actif dans la navbar au scroll ----------
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? '#FFFFFF'
          : '#6B7280';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
