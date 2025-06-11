document.addEventListener('DOMContentLoaded', () => {
    // Инициализация hero-слайдера
    new Swiper('.hero-swiper', {
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
        loop: true,
    });

    // Инициализация mechanics-слайдера
    new Swiper('.mechanics-swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Плавная прокрутка к якорям
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = 100;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));

    // Форма подписки
    const form = document.querySelector('.subscribe-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = form.querySelector('input[name="email"]')?.value.trim();
            const isValid = /\S+@\S+\.\S+/.test(email);

            if (!isValid) {
                alert('Пожалуйста, введите корректный email');
                return;
            }

            try {
                const formData = new FormData(form);
                // JotForm expects the email field name to match the form's field ID (e.g., q1_email)
                // Adjust the field name if necessary based on JotForm configuration
                formData.set('email', email); // Ensure the field name matches JotForm's expectation

                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Спасибо за подписку! Ваша почта успешно отправлена.');
                    form.reset();
                } else {
                    const errorText = await response.text();
                    console.error('JotForm error:', errorText);
                    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
            }
        });
    }

    // Скролл-оптимизация
    window.addEventListener('scroll', () => {
        // сюда можно добавить lazy-load и прочее
    }, { passive: true });
});