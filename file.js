// 1. TYPING EFFECT (The Cool Part)
const typingText = document.querySelector('.typing-text');
const words = ["Poetry.", "Stories.", "Emotions.", "Ghazals."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    
    typingText.textContent = currentChars;

    if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        // Word finished
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        }
        setTimeout(typeEffect, 1200);
    }
}
typeEffect();


// 2. THEME TOGGLE (Dark/Light)
const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});


// 3. SCROLL REVEAL (Animation on Scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
});
