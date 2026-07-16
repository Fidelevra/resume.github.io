// ---- Theme toggle (persisted) ----
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'fidel-site-theme';

function applyTheme(theme){
  root.classList.toggle('dark', theme === 'dark');
  themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

const stored = localStorage.getItem(THEME_KEY);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(stored || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const next = root.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// ---- Mobile nav ----
const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('.topbar__nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Scroll reveal ----
const revealTargets = document.querySelectorAll('.section, .hero__card');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();
