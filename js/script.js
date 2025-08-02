document.addEventListener('DOMContentLoaded', () => {

  const cursor = document.querySelector('.cursor');
  const spotlight = document.querySelector('.spotlight');
  let isSpotlightVisible = false;

  // --- FUNCIÓN UNIFICADA PARA MOVIMIENTO DEL MOUSE ---
  window.addEventListener('mousemove', (e) => {
    // 1. Mover el cursor personalizado
    const cursorX = e.clientX - cursor.offsetWidth / 2;
    const cursorY = e.clientY - cursor.offsetHeight / 2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // 2. Mover el spotlight
    const spotlightX = e.clientX - spotlight.offsetWidth / 2;
    const spotlightY = e.clientY - spotlight.offsetHeight / 2;
    spotlight.style.transform = `translate(${spotlightX}px, ${spotlightY}px)`;

    // 3. Hacer visible el spotlight en el primer movimiento
    if (!isSpotlightVisible) {
      spotlight.style.opacity = '1';
      isSpotlightVisible = true;
    }
  });


  // --- LÓGICA DEL CURSOR PERSONALIZADO (HOVER) ---
  const interactiveElements = document.querySelectorAll('a, button, .magnetic');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
    });
  });


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


  // --- LÓGICA DE NAVEGACIÓN ACTIVA AL SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach(link => {
                  link.classList.remove('active');
              });
              const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
              if (activeLink) {
                  activeLink.classList.add('active');
              }
          }
      });
  }, {
      rootMargin: '-50% 0px -50% 0px'
  });
  sections.forEach(section => navObserver.observe(section));


  // --- EFECTO MÁQUINA DE ESCRIBIR ---
  const typingText = document.querySelector('.typing-text');
  const heroElements = document.querySelectorAll('.hero-element-hidden');
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


  // --- ANIMACIONES DE SCROLL (Fade-in) ---
  const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              fadeInObserver.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1
  });
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(element => fadeInObserver.observe(element));

});