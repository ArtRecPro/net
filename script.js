/* ========================================
   PITCH SITE TEMPLATE - JAVASCRIPT
   ======================================== */

// ========================================
// МОБИЛЬНОЕ МЕНЮ
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// ПЛАВНАЯ ПРОКРУТКА
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Высота навбара
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// АКТИВНОЕ СОСТОЯНИЕ НАВИГАЦИИ
// ========================================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Изменение фона навбара при прокрутке
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// ========================================
// МОДАЛЬНОЕ ОКНО ДЛЯ ИЗОБРАЖЕНИЙ
// ========================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.modal-close');

// Открытие модального окна при клике на изображение
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        const caption = this.nextElementSibling;
        if (caption && caption.classList.contains('gallery-caption')) {
            modalCaption.textContent = caption.textContent;
        }
    });
});

// Закрытие модального окна
closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// ========================================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ
// ========================================
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

// Применение анимации к элементам
const animateElements = document.querySelectorAll(
    '.character-card, .emotion-card, .production-card, .location-card, .accent-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO
// ========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.backgroundPositionY = parallax + 'px';
    }
});

// ========================================
// ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// СЛАЙДЕР ЛОКАЦИЙ
// ========================================

/*
 * НАСТРОЙКА СЛАЙДЕРОВ
 * Добавьте свои локации по примеру ниже:
 */
const locationSliders = {
    gorbushka: {
        title: 'Горбушка',
        images: [
            'images/Горбушка/1.png',
            'images/Горбушка/2.png',
            'images/Горбушка/3.png',
            'images/Горбушка/4.png',
            'images/Горбушка/5.png',
            'images/Горбушка/7.png'
        ]
    },
    magazin: {
        title: 'Магазин «Царь-сеть»',
        images: [
            'images/Магазин/Снимок экрана 2025-12-11 в 18.23.51.png',
            'images/Магазин/Снимок экрана 2025-12-11 в 18.24.04.png',
            'images/Магазин/Снимок экрана 2025-12-11 в 18.26.26.png'
        ]
    },
    kvartira: {
        title: 'Квартира Макса',
        images: [
            'images/Квартира/0ee2262d0b0c35a1fad7073883edbc0b.jpg',
            'images/Квартира/44f64b67cf8859de4bea633d847bcaf9.jpg',
            'images/Квартира/92c8e5891cd9d11b42c849a05263d576.jpg',
            'images/Квартира/c99c38a85b2a5159e155920344929d79.jpg'
        ]
    },
    kabinet: {
        title: 'Кабинет Олега Михайловича',
        images: [
            'images/Кабинет/449f80ad4b001b30c76fd27d57d6f5c4.jpg',
            'images/Кабинет/592f2536f21718324d8c8ce2221e21f4.jpg',
            'images/Кабинет/ace9738741fcb191eabcddb5926e0afa.jpg'
        ]
    },
    moskva: {
        title: 'Москва',
        images: [
            'images/Москва/1.png',
            'images/Москва/2.png',
            'images/Москва/3.png',
            'images/Москва/4.png',
            'images/Москва/5.png'
        ]
    },
    kostyumy: {
        title: 'Костюмы',
        images: [
            'images/Костюмы/10e57f41f533ca9d00a93d016403f301.jpg',
            'images/Костюмы/2738fc0f11af0b66338d04b44137de5f.jpg',
            'images/Костюмы/32175a75971fbe7005d0a3157136ac45.jpg',
            'images/Костюмы/35cecd193b8cd9e9f09fd37d91ade2ea.jpg',
            'images/Костюмы/3fc4c446caa5d986e4abdef2d77c6643.jpg',
            'images/Костюмы/4e865aec512cab325e731c0a2d73c431.jpg',
            'images/Костюмы/5cd4950a74214a715c709f732c312f98.jpg',
            'images/Костюмы/76a836cb1aae598ee5f55ae32c80f357.jpg',
            'images/Костюмы/79644c84b54fbe03685837869f5f64b5.jpg',
            'images/Костюмы/7da745c02bb58e3c5fc77f57ecab0628.jpg',
            'images/Костюмы/91896abee4b6773b73b9ccbfbe8fab82.jpg',
            'images/Костюмы/933fa8cdc8f62c327f5c1128588623e0.jpg',
            'images/Костюмы/9bb6d570eb25e2075ee9513e8c8bdf30.jpg',
            'images/Костюмы/9c12aa5425d49767d0de7f1ded7e9c19.jpg',
            'images/Костюмы/a5d8490b6bfca94fd6d66c811cba0fce.jpg',
            'images/Костюмы/b13e66f98776e096ed0f997f528ac649.jpg',
            'images/Костюмы/b246b0c9dfebf1a485c171feb9f01d8f.jpg',
            'images/Костюмы/c21899cf7098d77503adf461fafaad0a.jpg',
            'images/Костюмы/c43c324afd78d465af78f7ab0c9eaaec.jpg',
            'images/Костюмы/ce712ae0a89cd94a802d6fe876848be6.jpg',
            'images/Костюмы/f761ca98593ecc46d7e5a0515ca78e38.jpg',
            'images/Костюмы/загружено.png'
        ]
    }
};

let currentLocationSlideIndex = 1;
let currentLocationKey = null;
const locationModal = document.getElementById('locationModal');
const locationImage = document.getElementById('locationImage');
const locationTitle = document.getElementById('locationTitle');
const currentLocationSlideEl = document.getElementById('currentLocationSlide');
const totalLocationSlidesEl = document.getElementById('totalLocationSlides');

function openLocationSlider(key) {
    if (!locationSliders[key]) {
        console.warn(`Слайдер "${key}" не найден. Добавьте его в locationSliders.`);
        return;
    }
    currentLocationKey = key;
    currentLocationSlideIndex = 1;
    locationTitle.textContent = locationSliders[key].title;
    totalLocationSlidesEl.textContent = locationSliders[key].images.length;
    updateLocationSlide();
    locationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLocationSlider() {
    locationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLocationSlide(direction) {
    if (!currentLocationKey) return;
    const total = locationSliders[currentLocationKey].images.length;
    currentLocationSlideIndex += direction;
    if (currentLocationSlideIndex > total) currentLocationSlideIndex = 1;
    if (currentLocationSlideIndex < 1) currentLocationSlideIndex = total;
    updateLocationSlide();
}

function updateLocationSlide() {
    if (!currentLocationKey) return;
    locationImage.src = locationSliders[currentLocationKey].images[currentLocationSlideIndex - 1];
    currentLocationSlideEl.textContent = currentLocationSlideIndex;
}

// Закрытие по клику вне слайдера
locationModal?.addEventListener('click', (e) => {
    if (e.target === locationModal) {
        closeLocationSlider();
    }
});

// Навигация клавишами
document.addEventListener('keydown', (e) => {
    if (locationModal?.style.display === 'block') {
        if (e.key === 'ArrowRight') changeLocationSlide(1);
        if (e.key === 'ArrowLeft') changeLocationSlide(-1);
        if (e.key === 'Escape') closeLocationSlider();
    }
});

// ========================================
// МОДАЛЬНОЕ ОКНО ДЛЯ ВИДЕО (YouTube)
// ========================================

/*
 * НАСТРОЙКА ВИДЕО
 * Добавьте свои видео по примеру ниже:
 */
const videos = {
    // Пример:
    // video1: {
    //     title: 'Название видео',
    //     url: 'https://www.youtube.com/embed/VIDEO_ID'
    // },
    // audition_actor1: {
    //     title: 'Пробы — Актёр 1',
    //     url: 'https://www.youtube.com/embed/VIDEO_ID'
    // }
};

// Для модального окна видео добавьте в HTML:
// <div id="videoModal" class="audition-modal">
//     <div class="audition-modal-content">
//         <span class="audition-close" onclick="closeVideo()">&times;</span>
//         <h3 id="videoTitle" class="audition-title">Видео</h3>
//         <div class="audition-video-container">
//             <iframe id="videoFrame" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//         </div>
//     </div>
// </div>

const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoTitle = document.getElementById('videoTitle');

function openVideo(key) {
    if (!videos[key]) {
        console.warn(`Видео "${key}" не найдено. Добавьте его в videos.`);
        return;
    }
    if (!videoModal) {
        console.warn('Модальное окно видео не найдено в HTML.');
        return;
    }

    videoTitle.textContent = videos[key].title;
    videoFrame.src = videos[key].url + '?autoplay=1';
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    if (!videoModal) return;
    videoModal.style.display = 'none';
    videoFrame.src = ''; // Останавливаем видео
    document.body.style.overflow = 'auto';
}

// Закрытие по клику вне видео
videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideo();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (videoModal?.style.display === 'block' && e.key === 'Escape') {
        closeVideo();
    }
});

// ========================================
// ЗВУК NOKIA ПРИ НАВЕДЕНИИ НА ЗАГОЛОВОК
// ========================================
const heroTitle = document.querySelector('.hero-title');
const nokiaSound = new Audio('sounds/nokia.mp3');
nokiaSound.volume = 0.3;

if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        nokiaSound.currentTime = 0;
        nokiaSound.play().catch(() => {});
    });

    // Останавливаем звук при уходе мыши
    heroTitle.addEventListener('mouseleave', () => {
        nokiaSound.pause();
        nokiaSound.currentTime = 0;
    });
}

// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================
console.log('Pitch site loaded successfully!');
