document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================
  // FUNCIÓN PARA DETECTAR DISPOSITIVOS TÁCTILES
  // ===================================================================
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // ===================================================================
  // INICIALIZACIÓN DEL MENÚ MÓVIL
  // ===================================================================
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
      });
    });
  }
  initMobileNav();

  // ===================================================================
  // INICIALIZACIÓN DE EFECTOS SOLO PARA DISPOSITIVOS NO TÁCTILES
  // ===================================================================
  if (!isTouchDevice) {
    
    // --- EFECTO "SCRAMBLE" EN EL LOGO ---
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

    // --- EFECTOS DE CURSOR (SPOTLIGHT Y CURSOR PERSONALIZADO) ---
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

    // --- LÓGICA DE BOTONES MAGNÉTICOS ---
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

  // ===================================================================
  // BARRA DE PROGRESO DE SCROLL
  // ===================================================================
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
  initProgressBar();

  // ===================================================================
  // NAVEGACIÓN ACTIVA AL SCROLL
  // ===================================================================
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
  initNavObserver();

  // ===================================================================
  // EFECTO MÁQUINA DE ESCRIBIR
  // ===================================================================
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
  initTypingEffect();

  // ===================================================================
  // ANIMACIONES DE SCROLL (FADE-IN Y CASCADA DE LETRAS)
  // ===================================================================
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
  initFadeInObserver();

});