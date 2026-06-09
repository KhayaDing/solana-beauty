document.addEventListener('DOMContentLoaded', () => {
  // 1. CUSTOM CURSOR
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  
  if (cursor && cursorRing) {
    // Only apply custom cursor on devices that support hover (non-touch devices)
    const isHoverable = window.matchMedia('(hover: hover)').matches;
    
    if (isHoverable) {
      document.body.classList.add('has-custom-cursor');
      
      let mouseX = 0;
      let mouseY = 0;
      let cursorX = 0;
      let cursorY = 0;
      let ringX = 0;
      let ringY = 0;
      
      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      
      // Follow mouse cursor with animation ticks
      const updateCursor = () => {
        // Linear interpolation: current + (target - current) * speed
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        document.documentElement.style.setProperty('--mouse-x', `${cursorX}px`);
        
        // If we want a separate lag for the ring, we can update ring styles independently
        // By using a separate style transform on the ring, it floats beautifully.
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        
        requestAnimationFrame(updateCursor);
      };
      
      requestAnimationFrame(updateCursor);
      
      // Bind hover state triggers
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .hamburger');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hovered');
          cursorRing.classList.add('hovered');
        });
        
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hovered');
          cursorRing.classList.remove('hovered');
        });
      });
    }
  }

  // 2. MOBILE NAVIGATION HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      // Prevent body scrolling when menu is active
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-links a, .mobile-menu-cta');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. SCROLL REVEAL (INTERSECTION OBSERVER)
  const reveals = document.querySelectorAll('.reveal');
  
  if (reveals.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px' // Trigger slightly before element enters viewport
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger slightly when multiple items reveal at once
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 100);
          
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, observerOptions);
    
    reveals.forEach(el => revealObserver.observe(el));
  }

  // 4. NAV BACKGROUND SHADOW ON SCROLL
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.boxShadow = '0 10px 30px rgba(113, 83, 68, 0.08)';
        nav.style.padding = '14px 60px'; // Slightly shrink height on scroll
      } else {
        nav.style.boxShadow = 'none';
        nav.style.padding = '18px 60px';
      }
    });
  }

  // 5. BOOKING FORM LOGIC WITH SUCCESS MODAL
  const submitButton = document.getElementById('submitBooking');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalDetails = document.getElementById('modalDetails');
  
  if (submitButton && modalOverlay) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Fetch inputs
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      if (!firstName || !lastName || !email || !phone || !service) {
        alert('Please fill in all required fields (Name, Surname, Email, Phone, and Service).');
        return;
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Render details in the modal
      if (modalDetails) {
        modalDetails.innerHTML = `
          <strong>Client Name:</strong> ${firstName} ${lastName}<br>
          <strong>Email:</strong> ${email}<br>
          <strong>Phone:</strong> ${phone}<br>
          <strong>Service Selected:</strong> ${service}
        `;
      }
      
      // Show success modal
      modalOverlay.classList.add('active');
      
      // Reset form
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('service').value = '';
      document.getElementById('message').value = '';
    });
    
    // Close Modal Event Listeners
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
    }
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
});
