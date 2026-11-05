document.addEventListener('DOMContentLoaded', function() {

    // Баннер о cookie
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    let cookieAccepted = false;

    try {
        cookieAccepted = localStorage.getItem('cookieAccepted') === '1';
    } catch (e) {}

    if (!cookieAccepted) {
        cookieBanner.hidden = false;
    }

    cookieAccept.addEventListener('click', function() {
        cookieBanner.hidden = true;
        try {
            localStorage.setItem('cookieAccepted', '1');
        } catch (e) {}
    });

    // Отправка формы
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        statusEl.className = 'form-status';
        statusEl.textContent = 'Отправка...';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(Object.fromEntries(new FormData(form)))
            });
            const data = await response.json();

            if (response.ok && data.success) {
                statusEl.textContent = 'Спасибо! Сообщение отправлено.';
                statusEl.classList.add('success');
                form.reset();
            } else {
                throw new Error(data.message || 'Ошибка отправки');
            }
        } catch (err) {
            statusEl.textContent = 'Не удалось отправить. Попробуйте позже или напишите мне на почту.';
            statusEl.classList.add('error');
        } finally {
            btn.disabled = false;
        }
    });

    document.getElementById('year').textContent = new Date().getFullYear();
    // Плавное исчезновение прелоадера
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    // Плавная прокрутка для навигации
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Подсветка активного пункта меню
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Анимация при загрузке страницы
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.card');
        const skillsSection = document.getElementById('skills');
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        // Анимация прогресс-баров навыков
        if (skillsPosition < screenPosition) {
            document.querySelectorAll('.skill-progress').forEach(progress => {
                progress.style.width = progress.style.width;
            });
        }
    };
    
    // Инициализация анимации
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ${index * 0.1}s ease, transform 0.5s ${index * 0.1}s ease`;
    });
    
    // Анимация при скролле
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Анимация временной шкалы
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ${index * 0.2}s ease`;
    });
    
    const animateTimeline = function() {
        const timelineSection = document.getElementById('experience');
        const timelinePosition = timelineSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (timelinePosition < screenPosition) {
            timelineItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
        }
    };
    
    window.addEventListener('scroll', animateTimeline);
    animateTimeline();
    
    // Подсветка активного раздела при скролле
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Анимация при наведении на элементы портфолио
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            overlay.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            overlay.style.opacity = '0';
        });
    });
    
    // Эффект волны при клике
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('portfolio-link')) {
            return;
        }
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});