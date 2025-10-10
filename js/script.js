// ========== INICIALIZAÇÃO GERAL ==========
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initAnimations();
    initFlashMessages();
    initFormValidation();
    initImageLoading();
    initLightbox();
});

// ========== MENU MOBILE ==========
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== HEADER SCROLL EFFECT ==========
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--white)';
                header.style.backdropFilter = 'none';
            }
        }
    });
}

// ========== ANIMAÇÕES ==========
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.servico-card, .feature, .portfolio-item, .depoimento-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== FLASH MESSAGES ==========
function initFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease';
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    });
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '#4CAF50';
                }
            });
            
            if (!valid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
}

// ========== IMAGE LOADING ==========
function initImageLoading() {
    // Preload images
    function preloadImages() {
        const images = [
            'images/hero.jpg',
            'images/projeto1.jpg',
            'images/projeto2.jpg',
            'images/projeto3.jpg',
            'images/projeto4.jpg',
            'images/projeto5.jpg',
            'images/projeto6.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Lazy loading for portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const portfolioItem = entry.target;
                portfolioItem.style.opacity = '1';
                portfolioItem.style.transform = 'translateY(0)';
                observer.unobserve(portfolioItem);
            }
        });
    });
    
    portfolioImages.forEach(image => imageObserver.observe(image));
    
    // Image hover effects
    portfolioImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Initialize image loading
    preloadImages();
}

// ========== LIGHTBOX ==========
function initLightbox() {
    const images = [
        "images/projeto1.jpg",
        "images/projeto2.jpg",
        "images/projeto3.jpg",
        "images/projeto4.jpg",
        "images/projeto5.jpg",
        "images/projeto6.jpg"
    ];

    const descriptions = [
        "Projeto residencial elegante",
        "Paisagismo para empresa moderna",
        "Condomínio com jardim planejado",
        "Reforma de área interna",
        "Projeto de quintal sustentável",
        "Espaço verde comercial"
    ];

    let currentIndex = 0;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxDesc = document.getElementById("lightbox-desc");

    if (!lightbox || !lightboxImg) return;

    // Abrir lightbox ao clicar na imagem do portfólio
    document.querySelectorAll(".portfolio-image").forEach((el, index) => {
        el.addEventListener("click", () => openLightbox(index));
    });

    function openLightbox(index) {
        currentIndex = index;
        lightbox.style.display = "flex";
        
        // Forçar reflow para reiniciar animação
        void lightbox.offsetWidth;
        
        lightbox.classList.add("show");
        lightboxImg.src = images[currentIndex];
        if (lightboxDesc) {
            lightboxDesc.textContent = descriptions[currentIndex];
        }
    }

    function closeLightbox() {
        lightbox.classList.remove("show");
        setTimeout(() => {
            lightbox.style.display = "none";
        }, 300);
    }

    function changeSlide(n) {
        currentIndex += n;
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;
        lightboxImg.src = images[currentIndex];
        if (lightboxDesc) {
            lightboxDesc.textContent = descriptions[currentIndex];
        }
    }

    // Event Listeners do Lightbox
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => changeSlide(-1));
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => changeSlide(1));
    }

    // Fechar lightbox ao clicar fora da imagem
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Suporte a teclado
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") changeSlide(-1);
            if (e.key === "ArrowRight") changeSlide(1);
        }
    });

    // Função global para navegação (caso precise)
    window.changeSlide = changeSlide;
}