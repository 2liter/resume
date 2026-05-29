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

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', '開啟選單');
}

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? '關閉選單' : '開啟選單');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ── Active nav highlight on scroll ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

// Threshold: section must occupy at least 35% of the viewport to be
// considered "active", which prevents rapid flicker between sections.
const ACTIVE_SECTION_THRESHOLD = 0.35;

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
}, { threshold: ACTIVE_SECTION_THRESHOLD });

sections.forEach(section => observer.observe(section));

// ── Contact form client-side validation ───────────────────────
const form   = document.getElementById('contactForm');
const notice = document.getElementById('formNotice');

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

  // Email validation using the browser's built-in constraint API
  const emailField = form.querySelector('[type="email"]');
  if (emailField && emailField.value.trim() && !emailField.validity.valid) {
    emailField.classList.add('error');
    valid = false;
  }

  if (!valid) {
    // Use role="alert" text so screen readers announce this immediately
    notice.textContent = '請填寫所有必填欄位，並確認電子郵件格式正確。';
    notice.className   = 'form-notice error';
    return;
  }

  // Simulate successful submission (no real back-end)
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled    = true;
    submitBtn.textContent = '傳送中…';
  }

  setTimeout(() => {
    form.reset();
    if (submitBtn) {
      submitBtn.disabled    = false;
      submitBtn.textContent = '送出訊息';
    }
    notice.textContent = '✅ 訊息已送出！感謝您的聯繫，我會盡快回覆。';
    notice.className   = 'form-notice success';
  }, 1000);
});
