// 1. TYPING EFFECT 
const typingText = document.querySelector('.typing-text');
const words = ["Poetry.", "Stories.", "Emotions.", "Ghazals.", "Nazms."]; 
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    if (!typingText) return; 

    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    
    typingText.textContent = currentChars;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1200);
    }
}
document.addEventListener('DOMContentLoaded', typeEffect);


// 2. SCROLL REVEAL (Animation on Scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 }); 

document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
});
