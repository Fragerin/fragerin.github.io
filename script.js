document.addEventListener('DOMContentLoaded', () => {
    // Инициализация каруселей
    const heroSwiper = new Swiper('.hero-swiper', {
        effect: 'fade',
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function() {
                document.querySelector('.current-slide').textContent =
                    this.realIndex + 1;
            }
        }
    });

    const mechanicsSwiper = new Swiper('.mechanics-swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            768: { slidesPerView: 2, centeredSlides: true },
            1200: { slidesPerView: 3, centeredSlides: true }
        },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // система скролла
   let animationFrameId = null;
    let isScrolling = false;

    function scrollToSection(target) {
        if (isScrolling || !target) return;

        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        const targetTop = Math.floor(target.getBoundingClientRect().top + window.scrollY - headerHeight);
        const startPosition = window.scrollY;
        const distance = targetTop - startPosition;
        const duration = 100;
        const startTime = performance.now();

        isScrolling = true;

        function step(currentTime) {
            if (!isScrolling) return;

            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startPosition + distance * ease(progress));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            } else {
                isScrolling = false;
                cancelAnimationFrame(animationFrameId);
            }
        }

        const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(step);
    }

    // Обработчик кликов
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            if (!target) return;

            // Обновляем высоту хедера перед скроллом
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;

            // Мгновенный скролл для мобильных устройств
            if (window.innerWidth <= 768) {
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                return;
            }

            scrollToSection(target);
        });
    });

    // Система анимаций через Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));

    // Обработка формы
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        alert('Спасибо за подписку!');
        form.reset();
    });

    // Оптимизация производительности
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const delta = Math.abs(currentScroll - lastScroll);
        lastScroll = currentScroll;

        if (delta > 50) {
            scrollRequest++;
        }
    }, { passive: true });
});
