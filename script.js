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
                formData.set('email', email);

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

    // Обработчики для модулей архитектуры
    function activateModule(moduleElement) {
        // Удаляем активный класс у всех модулей
        document.querySelectorAll('.module').forEach(m => {
            m.classList.remove('active');
        });

        // Добавляем активный класс к выбранному модулю
        moduleElement.classList.add('active');

        // Получаем тип модуля
        const moduleType = moduleElement.getAttribute('data-module');

        // Показываем блок с деталями модуля
        document.getElementById('module-details').classList.add('active');

        // Обновляем содержимое в зависимости от модуля
        updateModuleDetails(moduleType);
    }

    // Функция обновления деталей модуля
    function updateModuleDetails(moduleType) {
        const details = {
            economy: {
                title: "Экономика",
                icon: "fas fa-coins",
                description: "Управляет ресурсами, ценами, инфляцией и торговлей. Влияет на доступность товаров и уровень жизни",
                effects: [
                    "Повышение налогов → Рост цен +20%",
                    "Снижение пошлин → Импорт товаров +30%",
                    "Инвестиции в производство → Безработица -15%"
                ]
            },
            politics: {
                title: "Политика",
                icon: "fas fa-landmark",
                description: "Обрабатывает законы, репутацию, дипломатические отношения и военные действия. Определяет политический климат в Оставе",
                effects: [
                    "Принятие нового закона → Поддержка +25%",
                    "Арест оппозиционера → Недовольство +40%",
                    "Военный союз → Безопасность +30%"
                ]
            },
            society: {
                title: "Социум",
                icon: "fas fa-users",
                description: "Отслеживает настроения жителей, бунты, эпидемии и уровень преступности. Влияет на социальную стабильность",
                effects: [
                    "Повышение зарплат → Удовлетворенность +35%",
                    "Сокращение медицины → Здоровье населения -20%",
                    "Подавление протестов → Риск бунтов +45%"
                ]
            },
            information: {
                title: "Информация",
                icon: "fas fa-newspaper",
                description: "Управляет потоками информации, пропагандой, цензурой и слухами. Влияет на информированность жителей",
                effects: [
                    "Цензура СМИ → Контроль информации +50%",
                    "Распространение слухов → Паника +30%",
                    "Образовательная программа → Грамотность +25%"
                ]
            },
            core: {
                title: "Центральное Ядро",
                icon: "fas fa-brain",
                description: "Координирует работу всех систем, анализирует решения игрока и отслеживает глобальное состояние мира",
                effects: [
                    "Обработка 100+ параметров в реальном времени",
                    "Динамическая адаптация сюжетных линий",
                    "Прогнозирование долгосрочных последствий"
                ]
            }
        };

        const moduleData = details[moduleType];

        // Обновляем элементы
        document.getElementById('detail-title').textContent = moduleData.title;
        document.getElementById('detail-icon').innerHTML = `<i class="${moduleData.icon}"></i>`;
        document.getElementById('detail-description').textContent = moduleData.description;


        // Обновляем список эффектов
        const effectList = document.getElementById('effect-list');
        effectList.innerHTML = '';

        moduleData.effects.forEach(effect => {
            const li = document.createElement('li');
            li.textContent = effect;
            effectList.appendChild(li);
        });
    }

    // Обработчики кликов для модулей
    document.querySelectorAll('.module').forEach(module => {
        module.addEventListener('click', () => {
            activateModule(module);
        });
    });

    // Обработчик для центрального ядра
    document.getElementById('core-node').addEventListener('click', () => {
        activateModule(document.querySelector('.module[data-module="economy"]'));
        updateModuleDetails('core');
    });

    // Активируем первый модуль по умолчанию
    activateModule(document.querySelector('.module[data-module="economy"]'));

    // Показать/скрыть меню на мобильных устройствах
    document.querySelector('.hamburger').addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('nav ul').classList.toggle('active');
    });

    // Анимация для шагов процесса
    document.querySelectorAll('.process-step').forEach(step => {
        step.addEventListener('click', function() {
            this.classList.toggle('active');
            const info = this.querySelector('.step-info');
            info.style.maxHeight = info.style.maxHeight === '0px' ? '100px' : '0';
        });
    });
});


