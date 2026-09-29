// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    const status = document.getElementById('formStatus');

    // Validate
    if (!name.trim() || !contact.trim() || !message.trim()) {
        status.className = 'form-status error';
        status.textContent = 'Пожалуйста, заполни все обязательные поля';
        return;
    }

    // Prepare message for Telegram
    const serviceNames = {
        'site': 'Сайт',
        'bot': 'Telegram-бот',
        'parser': 'Парсер',
        'automation': 'Автоматизация',
        'other': 'Другое'
    };

    const telegramMessage = `
📬 Новое сообщение с сайта!

👤 Имя: ${name}
📱 Контакт: ${contact}
🎯 Услуга: ${serviceNames[service]}
💬 Сообщение:
${message}
    `.trim();

    // Send to Telegram bot
    const BOT_TOKEN = '8989730960:AAF4md0dI7-PpAE3Fd609bM_NtGzGgLd79c';
    const CHAT_ID = '39075776';

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            status.className = 'form-status success';
            status.textContent = 'Сообщение отправлено! Я отвечу в течение 24 часов.';
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Telegram API error');
        }
    })
    .catch(error => {
        // Fallback: open Telegram app
        status.className = 'form-status success';
        status.textContent = 'Спасибо! Напиши мне в Telegram: @secret_legend1';
        document.getElementById('contactForm').reset();

        // Open Telegram after 2 seconds
        setTimeout(() => {
            window.open('https://t.me/secret_legend1', '_blank');
        }, 2000);
    });
});

// Smooth scroll
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 8, 0.95)';
    } else {
        navbar.style.background = 'rgba(5, 5, 8, 0.85)';
    }
});
