document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================
  // LÓGICA DEL MODAL DE PROYECTOS
  // ===================================================================
  function initProjectModal() {
    const openModalBtn = document.querySelector('.js-open-modal');
    const modal = document.getElementById('project-modal');
    if (!openModalBtn || !modal) return;
    
    const closeModalBtn = modal.querySelector('.modal__close');
    const body = document.body;
    let projectSwiper = null;

    const openModal = () => {
      modal.classList.add('is-open');
      body.classList.add('no-scroll');
      setTimeout(() => {
        if (!projectSwiper) {
          try {
            projectSwiper = new Swiper('.swiper', {
              loop: true,
              navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
              pagination: { el: '.swiper-pagination', clickable: true },
            });
          } catch (error) { console.error("ERROR al inicializar Swiper:", error); }
        } else {
          projectSwiper.update();
        }
      }, 50); // Reducimos un poco el tiempo
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      body.classList.remove('no-scroll');
    };

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
  }

  // ===================================================================
  // TODAS LAS DEMÁS FUNCIONES
  // ===================================================================
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav__link');
    if (!navToggle || !body) return;
    navToggle.addEventListener('click', () => { body.classList.toggle('mobile-nav-open'); });
    navLinks.forEach(link => { link.addEventListener('click', () => { body.classList.remove('mobile-nav-open'); }); });
  }
  function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    if (!themeToggle || !htmlEl) return;
    const applyTheme = (theme) => {
      htmlEl.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { applyTheme(savedTheme); }
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }
  if (!isTouchDevice) {
    function initLogoScramble() {
      const logo = document.querySelector('.header__logo');
      if (!logo) return;
      const originalText = logo.dataset.value;
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let interval = null;
      logo.addEventListener('mouseenter', () => {
        let iteration = 0;
        clearInterval(interval);
        interval = setInterval(() => {
          logo.textContent = originalText.split("").map((letter, index) => {
            if (index < iteration) return originalText[index];
            return letters[Math.floor(Math.random() * letters.length)];
          }).join("");
          if (iteration >= originalText.length) { clearInterval(interval); }
          iteration += 1 / 3;
        }, 30);
      });
    }
    initLogoScramble();
    function initCursorEffects() {
      const cursor = document.querySelector('.cursor');
      const spotlight = document.querySelector('.spotlight');
      if (!cursor || !spotlight) return;
      let cursorsInitialized = false;
      window.addEventListener('mousemove', (e) => {
        if (!cursorsInitialized) {
          cursor.style.opacity = '1';
          spotlight.style.opacity = '1';
          cursorsInitialized = true;
        }
        const cursorX = e.clientX - cursor.offsetWidth / 2;
        const cursorY = e.clientY - cursor.offsetHeight / 2;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        const spotlightX = e.clientX - spotlight.offsetWidth / 2;
        const spotlightY = e.clientY - spotlight.offsetHeight / 2;
        spotlight.style.transform = `translate(${spotlightX}px, ${spotlightY}px)`;
      });
      const interactiveElements = document.querySelectorAll('a, button, .magnetic');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
      });
    }
    initCursorEffects();
    function initMagneticEffect() {
      const magneticElements = document.querySelectorAll('.magnetic');
      const strength = 0.2;
      magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;
          el.style.transform = `translate(${deltaX * strength}px, ${deltaY * strength}px)`;
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0px, 0px)';
        });
      });
    }
    initMagneticEffect();
  }
  function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    let animationCompleted = false;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
      if (scrollPercent >= 99.9 && !animationCompleted) {
        progressBar.classList.add('progress-bar--completed');
        animationCompleted = true;
      } else if (scrollPercent < 99.9 && animationCompleted) {
        progressBar.classList.remove('progress-bar--completed');
        animationCompleted = false;
      }
    });
  }
  function initNavObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }
  function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const heroElements = document.querySelectorAll('.hero-element-hidden');
    if (!typingText || heroElements.length === 0) return;
    const textToType = "Desarrollador Web Frontend";
    let charIndex = 0;
    function type() {
      if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        heroElements.forEach(el => {
          el.classList.add('hero-element-visible');
          el.classList.remove('hero-element-hidden');
        });
      }
    }
    setTimeout(type, 500);
  }
  function initFadeInObserver() {
    const hiddenElements = document.querySelectorAll('.hidden');
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const titleSpan = entry.target.querySelector('.section-title span');
          if (titleSpan && !titleSpan.classList.contains('letters-animated')) {
            const text = titleSpan.textContent;
            titleSpan.textContent = '';
            titleSpan.classList.add('letters-animated');
            text.split('').forEach((letter, index) => {
              const letterSpan = document.createElement('span');
              letterSpan.className = 'letter';
              letterSpan.textContent = letter === ' ' ? '\u00A0' : letter;
              letterSpan.style.transitionDelay = `${index * 40}ms`;
              titleSpan.appendChild(letterSpan);
              setTimeout(() => {
                letterSpan.style.opacity = '1';
                letterSpan.style.transform = 'translateY(0)';
              }, 20);
            });
          }
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    hiddenElements.forEach(element => fadeInObserver.observe(element));
  }

  // LLAMADAS A TODAS LAS FUNCIONES
  initMobileNav();
  initThemeSwitcher();
  initProgressBar();
  initNavObserver();
  initTypingEffect();
  initFadeInObserver();
  initProjectModal();
});