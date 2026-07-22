/**
 * ==========================================================================
 * DEVELOPER PORTFOLIO JAVASCRIPT
 * Full-Stack Web & App Developer Portfolio
 * Deployable directly to GitHub Pages
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. CONFIGURATION & CONSTANTS
   * Replace placeholder values below or via inline HTML attributes.
   * ------------------------------------------------------------------------ */
  // REPLACE: Update your WhatsApp phone number (with country code, no + or spaces)
  const WHATSAPP_PHONE_NUMBER = '923000000000'; // Example: 923001234567 for Pakistan
  const DEFAULT_WA_MESSAGE = 'Hi, I saw your portfolio and want to discuss a project';

  /* ------------------------------------------------------------------------
   * 2. THEME SWITCHER (DARK / LIGHT MODE)
   * ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-moon';
      } else {
        themeIcon.className = 'fa-solid fa-sun';
      }
    }
  }

  /* ------------------------------------------------------------------------
   * 3. STICKY NAVBAR & SCROLL EFFECTS
   * ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  /* ------------------------------------------------------------------------
   * 4. MOBILE NAVIGATION MENU TOGGLE
   * ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.innerHTML = isExpanded ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* ------------------------------------------------------------------------
   * 5. ACTIVE NAVIGATION SPY (INTERSECTION OBSERVER)
   * ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ------------------------------------------------------------------------
   * 6. WHATSAPP FLOATING BUTTON DYNAMIC LINK
   * ------------------------------------------------------------------------ */
  const whatsappBtn = document.getElementById('whatsapp-link');
  if (whatsappBtn) {
    // If user has set a phone number in data attribute, use it, else default
    const phone = whatsappBtn.getAttribute('data-phone') || WHATSAPP_PHONE_NUMBER;
    const msg = encodeURIComponent(DEFAULT_WA_MESSAGE);
    whatsappBtn.href = `https://wa.me/${phone}?text=${msg}`;
  }

  // Contact section now uses direct email & WhatsApp buttons
});
