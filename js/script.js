document.addEventListener('DOMContentLoaded', () => {

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
        logo.textContent = originalText.split("")
          .map((letter, index) => {
            if(index < iteration) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");
        
        if(iteration >= originalText.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    });
  }
  initLogoScramble();

    // --- LÓGICA DE LA BARRA DE PROGRESO DE SCROLL ---
  const progressBar = document.querySelector('.progress-bar');
  let animationCompleted = false; // Bandera para controlar la animación

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + "%";

    // Si llega al 100% y la animación no se ha ejecutado...
    if (scrollPercent >= 99.9 && !animationCompleted) {
      progressBar.classList.add('progress-bar--completed');
      animationCompleted = true;
    } 
    // Si el usuario vuelve a subir, reseteamos la animación
    else if (scrollPercent < 99.9 && animationCompleted) {
      progressBar.classList.remove('progress-bar--completed');
      animationCompleted = false;
    }
  });

  const cursor = document.querySelector('.cursor');
  const spotlight = document.querySelector('.spotlight');
  let cursorsInitialized = false; // Una sola bandera para ambos

  // --- FUNCIÓN UNIFICADA PARA MOVIMIENTO DEL MOUSE ---
  window.addEventListener('mousemove', (e) => {
    // Hacemos visibles ambos cursores en el primer movimiento
    if (!cursorsInitialized) {
      cursor.style.opacity = '1';
      spotlight.style.opacity = '1';
      cursorsInitialized = true;
    }

    // Mover el cursor personalizado
    const cursorX = e.clientX - cursor.offsetWidth / 2;
    const cursorY = e.clientY - cursor.offsetHeight / 2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Mover el spotlight
    const spotlightX = e.clientX - spotlight.offsetWidth / 2;
    const spotlightY = e.clientY - spotlight.offsetHeight / 2;
    spotlight.style.transform = `translate(${spotlightX}px, ${spotlightY}px)`;
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


  // --- ANIMACIONES DE SCROLL (Fade-in) Y BARRIDO DE TÍTULOS ---
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añade la clase para el fade-in de la sección
        entry.target.classList.add('visible');

        // Busca el título dentro de la sección y le añade la clase para el barrido
        const title = entry.target.querySelector('.section-title');
        if (title) {
          title.classList.add('title-sweep-animation');
        }
        
        // Deja de observar el elemento para que no se repita
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
      threshold: 0.1
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(element => fadeInObserver.observe(element));
});