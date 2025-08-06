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
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav__link');
    if (!navToggle || !body) return;

    navToggle.addEventListener('click', () => {
      body.classList.toggle('mobile-nav-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('mobile-nav-open');
      });
    });
  }
  
  // ===================================================================
  // LÓGICA DEL CAMBIADOR DE TEMA
  // ===================================================================
  function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    if (!themeToggle || !htmlEl) return;

    const applyTheme = (theme) => {
      htmlEl.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // ===================================================================
  // INICIALIZACIÓN DE EFECTOS SOLO PARA DISPOSITIVOS NO TÁCTILES
  // ===================================================================
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

  // ===================================================================
  // BOTÓN VOLVER ARRIBA
  // ===================================================================
  function initBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
      // Si el usuario ha bajado más de 500px...
      if (window.scrollY > 500) {
        backToTopButton.classList.add('is-visible');
      } else {
        backToTopButton.classList.remove('is-visible');
      }
    });
  }


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

  // ===================================================================
  // LÓGICA DE SONIDOS DE INTERFAZ
  // ===================================================================
  function initSoundEffects() {
    const soundToggle = document.getElementById('sound-toggle');
    const body = document.body;

    // Cargamos los sonidos
    const hoverSound = new Audio('audio/hover.mp3');
    const clickSound = new Audio('audio/click.mp3');
    const toggleSound = new Audio('audio/toggle.mp3');

    // Ajustamos el volumen para que sean sutiles
    hoverSound.volume = 0.3;
    clickSound.volume = 0.5;
    toggleSound.volume = 0.4;
    
    let isMuted = localStorage.getItem('soundMuted') !== 'false';

    const updateMuteStatus = () => {
      isMuted = !isMuted;
      localStorage.setItem('soundMuted', isMuted);
      body.classList.toggle('sound-muted', isMuted);
    };

    const playSound = (sound) => {
      if (!isMuted) {
        sound.currentTime = 0; // Permite que el sonido se repita rápidamente
        sound.play();
      }
    };
    
    // Aplicar estado inicial
    body.classList.toggle('sound-muted', isMuted);

    // Evento para el botón de silencio
    soundToggle.addEventListener('click', () => {
      updateMuteStatus();
    });

    // Asignar sonidos a los elementos
    const hoverElements = document.querySelectorAll('a, button');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => playSound(hoverSound));
    });

    const clickElements = document.querySelectorAll('a, button');
    clickElements.forEach(el => {
      el.addEventListener('click', () => playSound(clickSound));
    });

    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => playSound(toggleSound));
    }
  }

 // ===================================================================
  // LÓGICA DEL MODAL DE PROYECTOS (VERSIÓN FINAL A PRUEBA DE ERRORES)
  // ===================================================================
  function initProjectModal() {
      const openModalBtn = document.querySelector('.js-open-modal');
      const modal = document.getElementById('project-modal');
      if (!openModalBtn || !modal) return;
      
      const body = document.body;
      let projectSwiper = null;

      const openModal = () => {
          modal.showModal();
          body.classList.add('no-scroll');

          // Función que inicializa o actualiza Swiper
          const initializeSwiper = () => {
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
          };

          // Escuchamos a que la animación de entrada del modal termine
          // y SÓLO ENTONCES inicializamos Swiper.
          modal.addEventListener('animationend', initializeSwiper, { once: true });
      };

      // La función para cerrar no cambia
      const closeModal = () => {
          modal.close();
      };
      
      // Añadimos el listener para el evento 'close' del dialog
      modal.addEventListener('close', () => {
          body.classList.remove('no-scroll');
      });

      openModalBtn.addEventListener('click', openModal);
      // El botón de cerrar <form method="dialog"> ya funciona nativamente
      // pero añadimos este por si lo necesitamos en el futuro.
      const closeModalBtn = modal.querySelector('.modal__close');
      if (closeModalBtn) {
          closeModalBtn.addEventListener('click', closeModal);
      }
  }

  // ===================================================================
  // LLAMADAS A TODAS LAS FUNCIONES DE INICIALIZACIÓN
  // ===================================================================
  initMobileNav();
  initThemeSwitcher();
  initProgressBar();
  initNavObserver();
  initTypingEffect();
  initFadeInObserver();
  initBackToTopButton();
  initSoundEffects();
  initProjectModal();
});