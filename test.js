document.addEventListener("DOMContentLoaded", () => {
    const dynamicWordElement = document.getElementById("dynamic-word-hero");
    const words = ["Slam", "Shots", "Slice"];
    let currentWordIndex = 0;

    // Set the first word immediately
    dynamicWordElement.textContent = words[currentWordIndex];
    dynamicWordElement.style.opacity = 1; // Make sure the first word is visible

    const typeEffect = (word, callback) => {
        dynamicWordElement.textContent = word;
        dynamicWordElement.style.opacity = 1; // Fade in the new word

        setTimeout(callback, 1500); // Pause before fading out
    };

    const fadeOutEffect = (callback) => {
        dynamicWordElement.style.opacity = 0; // Fade out the word

        setTimeout(callback, 1000); // Wait for the fade to finish
    };

    const cycleWords = () => {
        fadeOutEffect(() => {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            typeEffect(words[currentWordIndex], cycleWords); // Continue cycling words
        });
    };

    cycleWords(); // Start immediately without waiting for the observer
});

document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.querySelector('.hero-section');
    const parallaxBackground = document.querySelector('.parallax-background');
    const parallaxElements = document.querySelectorAll('.parallax-element');

    // Hero section scroll effect
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;

        // Parallax effect for background
        parallaxBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;  /* Adjust the speed (0.3) for desired effect */
        
        // Parallax effect for inner elements (e.g., scale, translate)
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${scrollPosition * 0.1}px)`;  /* Inner elements move at a slower speed */
        });
    });
});

class BubbleBackground {
    constructor(options = {}) {
        this.options = {
            containerId: 'bubble-container',
            minSize: 10,          // Minimum bubble size in pixels
            maxSize: 30,          // Maximum bubble size in pixels
            minDuration: 15,      // Minimum animation duration in seconds
            maxDuration: 30,      // Maximum animation duration in seconds
            bubbleCount: 20,      // Number of bubbles
            spawnInterval: 3000,  // Time between bubble spawns in milliseconds
            parallaxFactor: 0.2,  // Adjust this value to control the parallax effect
            ...options
        };
        
        this.container = document.getElementById(this.options.containerId);
        this.bubbles = new Set();
        this.init();
        this.initParallax();
    }

    createBubble() {
        console.log("Created bubble")
        // Create a wrapper for the bubble
        const wrapper = document.createElement('div');
        wrapper.className = 'bubble-wrapper';
        // Ensure the wrapper covers the container and doesn't interfere with interactions
        wrapper.style.position = 'absolute';
        wrapper.style.top = '0';
        wrapper.style.left = '0';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        wrapper.style.pointerEvents = 'none';

        // Create the bubble itself
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size between minSize and maxSize
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random horizontal position (within 100% width)
        bubble.style.left = `${Math.random() * 100}%`;
        
        // Set a random animation duration using CSS variable
        const duration = Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration;
        bubble.style.setProperty('--duration', `${duration}s`);
        
        // Append the bubble to the wrapper, then the wrapper to the container
        wrapper.appendChild(bubble);
        this.container.appendChild(wrapper);
        this.bubbles.add(wrapper);
        
        // Remove bubble after animation completes
        bubble.addEventListener('animationend', () => {
            wrapper.remove();
            this.bubbles.delete(wrapper);
        });
    }

    init() {
        // Create initial bubbles
        for (let i = 0; i < this.options.bubbleCount; i++) {
            setTimeout(() => {
                this.createBubble();
            }, Math.random() * 5000);
        }
        
        // Continuously spawn bubbles
        setInterval(() => {
            if (this.bubbles.size < this.options.bubbleCount) {
                this.createBubble();
            }
        }, this.options.spawnInterval);
    }
    
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            this.bubbles.forEach(wrapper => {
                // Move the wrapper based on scroll; adjust the factor as needed
                wrapper.style.transform = `translateY(${scrollY * this.options.parallaxFactor}px)`;
            });
        });
    }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BubbleBackground({
        minSize: 10,
        maxSize: 30,
        minDuration: 15,
        maxDuration: 30,
        bubbleCount: 20,
        spawnInterval: 3000,
        parallaxFactor: 0.2  // Experiment with this value
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const scrollLeftBtn = document.querySelector('.scroll-btn.left');
    const scrollRightBtn = document.querySelector('.scroll-btn.right');
    const testimonialCardWidth = document.querySelector('.testimonial-card').offsetWidth; // Get width of a single card

    scrollLeftBtn.addEventListener('click', () => {
        testimonialsContainer.scrollBy({
            left: -testimonialCardWidth, // Scroll left by one card width
            behavior: 'smooth' // Add smooth scrolling effect
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        testimonialsContainer.scrollBy({
            left: testimonialCardWidth, // Scroll right by one card width
            behavior: 'smooth' // Add smooth scrolling effect
        });
    });
});