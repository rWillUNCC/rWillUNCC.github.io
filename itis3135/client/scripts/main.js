/* Hivemind Entertainment - Main JavaScript
    assited by Gemeni and CoPilot */


/* Image Slider Functionality */

class ImageSlider {
    // Sets up the gallery state and initial display
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slider-image');
        this.prevButton = document.getElementById('slider-prev');
        this.nextButton = document.getElementById('slider-next');
        this.indicator = document.getElementById('slider-indicator');

        if (this.slides.length > 0) {
            this.initializeSlider();
            this.showSlide(0);
        }
    }

    // Configures event listeners and sets the auto-advance timer
    initializeSlider() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.previousSlide());
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.nextSlide());
        }

        // Auto-advance slides every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    }

    // Updates the visible slide and manages the indicator text
    showSlide(n) {
        this.slides.forEach((slide) => slide.classList.remove('slider-image-visible'));
        
        if (n >= this.slides.length) {
            this.currentSlide = 0;
        }
        if (n < 0) {
            this.currentSlide = this.slides.length - 1;
        }

        this.slides[this.currentSlide].classList.add('slider-image-visible');
        if (this.indicator) {
            this.indicator.textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
        }
    }

    nextSlide() {
        this.currentSlide++;
        this.showSlide(this.currentSlide);
    }

    previousSlide() {
        this.currentSlide--;
        this.showSlide(this.currentSlide);
    }
}

/* Projects Filter Functionality */

class ProjectFilter {
    // Orchestrates project card filtering by category and search keywords
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-button');
        this.searchInput = document.getElementById('project-search');
        this.projectCards = document.querySelectorAll('.project-card');

        if (this.filterButtons.length > 0 || this.searchInput) {
            this.initialize();
        }
    }

    // Binds input and click events for filtering logic
    initialize() {
        this.filterButtons.forEach((button) => {
            button.addEventListener('click', () => this.handleFilter(button));
        });

        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.handleSearch());
        }
    }

    // Toggles visibility of cards based on the selected genre button
    handleFilter(button) {
        // Update selected state
        this.filterButtons.forEach((btn) => btn.classList.remove('filter-button-selected'));
        button.classList.add('filter-button-selected');

        const filterValue = button.getAttribute('data-filter').toLowerCase();

        // Filter projects
        this.projectCards.forEach((card) => {
            const genre = card.getAttribute('data-genre').toLowerCase();
            
            if (filterValue === 'all' || genre === filterValue) {
                card.style.display = 'block';
                this.animateCard(card);
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Searches card titles and descriptions against the search input
    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();

        this.projectCards.forEach((card) => {
            const title = card.getAttribute('data-title').toLowerCase();
            const description = card.getAttribute('data-description').toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                this.animateCard(card);
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Applies a subtle fade-in effect when elements are displayed
    animateCard(card) {
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
        }, 10);
    }
}

/* Accordion Functionality */

class Accordion {
    // Manages simple expandable content sections
    constructor() {
        this.headers = document.querySelectorAll('.accordion-header');

        if (this.headers.length > 0) {
            this.initialize();
        }
    }

    // Binds click handlers to accordion headers
    initialize() {
        this.headers.forEach((header) => {
            header.addEventListener('click', () => this.toggleAccordion(header));
        });
    }

    // Opens the selected section and closes all others
    toggleAccordion(header) {
        const content = header.nextElementSibling;

        // Close all other accordions
        this.headers.forEach((h) => {
            if (h !== header) {
                h.classList.remove('accordion-header-open');
                if (h.nextElementSibling) {
                    h.nextElementSibling.classList.remove('accordion-content-open');
                }
            }
        });

        // Toggle current accordion
        header.classList.toggle('accordion-header-open');
        content.classList.toggle('accordion-content-open');
    }
}

/* Form Validation */

class FormValidator {
    // Handles input validation and submission for contact and newsletter forms
    constructor() {
        this.form = document.getElementById('contact-form');
        this.newsletterForm = document.getElementById('newsletter-form');

        if (this.form) {
            this.initializeContactForm();
        }
        if (this.newsletterForm) {
            this.initializeNewsletterForm();
        }
    }

    // Sets up the contact form listener
    initializeContactForm() {
        this.form.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }

    // Sets up the newsletter form listener
    initializeNewsletterForm() {
        this.newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
    }

    // Validates and processes the contact form submission
    handleContactSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (this.validateContactForm(name, email, message)) {
            const successMsg = document.querySelector('.success-message');
            if (successMsg) {
                successMsg.classList.add('success-message-open');
                setTimeout(() => successMsg.classList.remove('success-message-open'), 3000);
            }
            this.form.reset();
        }
    }

    // Validates and processes the newsletter signup
    handleNewsletterSubmit(e) {
        e.preventDefault();

        const email = document.getElementById('newsletter-email').value.trim();

        if (this.validateEmail(email)) {
            const successMsg = this.newsletterForm.parentElement.querySelector('.success-message');
            if (successMsg) {
                successMsg.classList.add('success-message-open');
                setTimeout(() => successMsg.classList.remove('success-message-open'), 3000);
            }
            this.newsletterForm.reset();
        }
    }

    // Checks required fields and email formatting
    validateContactForm(name, email, message) {
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach((msg) => msg.remove());

        if (!name) {
            this.showError('contact-name', 'Name is required');
            isValid = false;
        }

        if (!this.validateEmail(email)) {
            this.showError('contact-email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!message) {
            this.showError('contact-message', 'Message is required');
            isValid = false;
        }

        return isValid;
    }

    // Standard regex validation for email addresses
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Appends a temporary error message below an invalid field
    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        field.parentElement.appendChild(errorMsg);
    }
}

/* Scroll to Top Functionality */

class ScrollToTop {
    // Manages the visibility and behavior of the scroll-to-top button
    constructor() {
        this.button = document.getElementById('scroll-to-top');
        
        if (this.button) {
            this.initialize();
        }
    }

    // Binds scroll and click listeners
    initialize() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    // Shows the button only after scrolling past a threshold
    handleScroll() {
        if (window.pageYOffset > 300) {
            this.button.classList.add('scroll-top-visible');
        } else {
            this.button.classList.remove('scroll-top-visible');
        }
    }

    // Executes smooth scrolling back to the page top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}



/* Initialize All Components on Page Load */

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
    new ProjectFilter();
    new Accordion();
    new FormValidator();
    new ScrollToTop();
});
