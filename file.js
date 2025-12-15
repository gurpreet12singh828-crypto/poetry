// 1. TYPING EFFECT (Optimized)
const typingText = document.querySelector('.typing-text');
const words = ["Poetry.", "Stories.", "Emotions.", "Ghazals.", "Nazms."]; // Added a new word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    if (!typingText) return; // Guard clause

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
            // Move to the next word after deletion
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1200);
    }
}
// Run the effect once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', typeEffect);


// 2. THEME TOGGLE (Dark/Light)
const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        if (themeIcon) {
            themeIcon.classList.toggle('fa-moon', !isDarkMode);
            themeIcon.classList.toggle('fa-sun', isDarkMode);
        }
    });
}


// 3. SCROLL REVEAL (Animation on Scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Added a check to only add the 'visible' class once
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            entry.target.classList.add('visible');
            // Optional: unobserve after showing to save resources
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 }); // Slightly higher threshold

document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
});
