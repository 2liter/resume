/* jshint esversion: 6 */
'use strict';

// ── Footer year ──────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Navbar scroll shadow ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Active nav highlight on scroll ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => observer.observe(section));

// ── Contact form client-side validation ───────────────────────
const form      = document.getElementById('contactForm');
const notice    = document.getElementById('formNotice');

form.addEventListener('submit', e => {
  e.preventDefault();
  notice.textContent = '';
  notice.className   = 'form-notice';

  let valid = true;

  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('error');
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }
  });

  // Basic email validation
  const emailField = form.querySelector('[type="email"]');
  if (emailField && emailField.value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
    emailField.classList.add('error');
    valid = false;
  }

  if (!valid) {
    notice.textContent = '請填寫所有必填欄位，並確認電子郵件格式正確。';
    notice.className   = 'form-notice error';
    return;
  }

  // Simulate successful submission (no real back-end)
  const submitBtn   = form.querySelector('[type="submit"]');
  submitBtn.disabled  = true;
  submitBtn.textContent = '傳送中…';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled    = false;
    submitBtn.textContent = '送出訊息';
    notice.textContent    = '✅ 訊息已送出！感謝您的聯繫，我會盡快回覆。';
    notice.className      = 'form-notice success';
  }, 1000);
});
