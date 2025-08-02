document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE NAVEGACIÓN ACTIVA AL SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Quitar la clase 'active' de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Añadir la clase 'active' al enlace correspondiente
                const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px' // Se activa cuando la sección está en el centro vertical
    });

    sections.forEach(section => navObserver.observe(section));


    // --- EFECTO SPOTLIGHT DEL CURSOR ---
    const spotlight = document.querySelector('.spotlight');
    let isSpotlightVisible = false;

    window.addEventListener('mousemove', (e) => {
        if (!isSpotlightVisible) {
            spotlight.style.opacity = '1';
            isSpotlightVisible = true;
        }
        const x = e.clientX - spotlight.offsetWidth / 2;
        const y = e.clientY - spotlight.offsetHeight / 2;
        spotlight.style.transform = `translate(${x}px, ${y}px)`;
    });


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