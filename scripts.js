document.addEventListener("DOMContentLoaded", function() {
    // Показване на съдържанието с анимация при зареждане на страницата
    const content = document.querySelector('.content');
    content.classList.add('show');

    // Добавяне на анимации при превъртане
    const faders = document.querySelectorAll('.intro, .bio, .error-404');

    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Анимация при кликване върху линкове за навигация
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');

            content.classList.remove('show');
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // Брояч и пренасочване за страницата 404
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        let countdown = 5;
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                window.location.href = '/index.html';
            }
        }, 1000);
    }

    // Свиване на хедъра при скролиране
    const header = document.querySelector('.dynamic-header');
    if (header) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shrink'); // Свива хедъра
            } else {
                header.classList.remove('shrink'); // Възстановява хедъра
            }
            lastScrollY = window.scrollY;
        });
    }

    // Зареждане на съдържанието на футъра
    fetch('footer-content.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer content:', error));
});
