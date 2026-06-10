document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  
  if (cursor && cursorRing) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
      }, 80);
    });

    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  }

  // Nav scroll effect
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(113,83,68,0.1)' : 'none';
    });
  }

  // Mobile navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (nav && navToggle && navLinks) {
    const closeMenu = () => {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }
});
