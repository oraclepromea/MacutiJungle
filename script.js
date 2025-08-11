// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Hero scroll button
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message (in a real application, you would send this to a server)
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            
            // Add lightbox styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
                z-index: 10001;
            `;
            
            document.body.appendChild(lightbox);
            
            // Fade in
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close lightbox
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close with escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        }
    });
});

// Intersection Observer for animations
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

// Animate elements on scroll
const animateElements = document.querySelectorAll('.activity-card, .room-card, .feature, .testimonial');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats (if you want to add them later)
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize language toggle
    initializeLanguageToggle();
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Add hover effects to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Testimonials carousel (auto-rotate)
const testimonials = document.querySelectorAll('.testimonial');
if (testimonials.length > 1) {
    let currentTestimonial = 0;
    
    function showNextTestimonial() {
        testimonials[currentTestimonial].style.opacity = '0.7';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.opacity = '1';
    }
    
    // Initialize
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = index === 0 ? '1' : '0.7';
        testimonial.style.transition = 'opacity 0.5s ease';
    });
    
    // Auto-rotate every 5 seconds
    setInterval(showNextTestimonial, 5000);
}

// Comprehensive Translation Data
const translations = {
    en: {
        // Navigation
        "nav-home": "Home",
        "nav-about": "About",
        "nav-accommodations": "Accommodations",
        "nav-activities": "Activities",
        "nav-gallery": "Gallery",
        "nav-contact": "Contact",
        
        // Hero Section
        "hero-title": "Experience the Heart of the Amazon",
        "hero-subtitle": "Discover pristine waterfalls, lush jungle landscapes, and authentic Bolivian hospitality at our eco-lodge in Rurrenabaque",
        "hero-reserve": "Reserve Now",
        "hero-learn": "Learn More",
        
        // About Section
        "about-title": "Welcome to Paradise",
        "about-description": "Nestled in the heart of the Bolivian Amazon, Mirador Jungle el Macuti offers an unparalleled eco-lodge experience. Our rustic yet comfortable accommodations provide the perfect base for exploring one of the world's most biodiverse regions.",
        "feature-eco-title": "Eco-Friendly",
        "feature-eco-desc": "Sustainable tourism that respects and preserves the natural environment",
        "feature-views-title": "Stunning Views",
        "feature-views-desc": "Panoramic vistas of the jungle canopy and pristine waterfalls",
        "feature-authentic-title": "Authentic Experience",
        "feature-authentic-desc": "Genuine Bolivian hospitality in a tranquil natural setting",
        
        // Accommodations Section
        "accommodations-title": "Comfortable Accommodations",
        "accommodations-subtitle": "Choose from our two room options in the heart of the Amazon",
        "room-double-title": "Double Room",
        "room-single-title": "Single Occupancy",
        "price-per-night": "per night",
        "room-double-desc": "Spacious double room with 1 queen bed, perfect for couples or solo travelers seeking comfort and privacy.",
        "room-single-desc": "Perfect for solo travelers - same great double room but exclusively for one guest at a special rate.",
        "room-features-title": "Room Features",
        "views-outdoor-title": "Views & Outdoor",
        "amenities-title": "Amenities",
        "feature-queen-bed": "1 Queen bed",
        "feature-max-guests": "Max. 2 guests",
        "feature-single-guest": "Only for 1 guest",
        "feature-private-bathroom": "Private bathroom",
        "feature-kitchenette": "Private kitchenette",
        "feature-garden-view": "Garden view",
        "feature-pool-view": "Pool view",
        "feature-mountain-view": "Mountain view",
        "feature-city-view": "City view",
        "feature-balcony": "Balcony & Terrace",
        "feature-ac": "Air conditioning",
        "feature-minibar": "Minibar",
        "feature-wifi": "Free WiFi",
        "feature-microwave": "Microwave & Oven",
        "feature-coffee": "Tea/Coffee maker",
        "booking-no-prepay": "No prepayment needed – pay at property",
        "booking-rooms-left": "Only 5 rooms left!",
        "booking-exclusive": "Exclusive single occupancy rate",
        "book-double-room": "Book Double Room",
        "book-single-room": "Book Single Room",
        
        // Activities Section
        "activities-title": "Amazon Adventures Await",
        "activities-subtitle": "Explore the wonders of the Bolivian rainforest",
        "activity-waterfall-title": "Waterfall Hiking",
        "activity-waterfall-desc": "Trek through pristine jungle trails to discover hidden waterfalls and natural swimming pools.",
        "activity-wildlife-title": "Wildlife Watching",
        "activity-wildlife-desc": "Spot exotic birds, monkeys, and other fascinating creatures in their natural habitat.",
        "activity-river-title": "River Excursions",
        "activity-river-desc": "Navigate the Amazon waterways and explore remote areas accessible only by boat.",
        "activity-cultural-title": "Cultural Tours",
        "activity-cultural-desc": "Visit local indigenous communities and learn about traditional ways of life in the Amazon.",
        "activity-photo-title": "Photography Tours",
        "activity-photo-desc": "Capture the stunning beauty of the rainforest with guided photography expeditions.",
        "activity-night-title": "Night Walks",
        "activity-night-desc": "Experience the jungle after dark and discover its nocturnal inhabitants.",
        
        // Gallery Section
        "gallery-title": "Gallery",
        "gallery-subtitle": "Glimpses of paradise",
        
        // Testimonials Section
        "testimonials-title": "What Our Guests Say",
        "testimonial-1": "\"I received a really warm and lovely welcome and I really enjoyed my time there! Thank you very much! Probably the nicest hostel I've ever been to.\"",
        "testimonial-2": "\"Ideal place for those who love nature and tranquility. Beautiful view, garden full of flowers and plants. Spacious room with bathroom. Pool and kitchen are available. Rosa is welcoming and very kind!\"",
        "country-germany": "Germany",
        "country-italy": "Italy",
        
        // Contact Section
        "contact-title": "Contact Us",
        "contact-get-in-touch": "Get in Touch",
        "contact-description": "Ready to experience the magic of the Amazon? Contact us to plan your unforgettable stay.",
        "contact-location-title": "Location",
        "contact-location-text": "Rurrenabaque, Beni Department<br>Bolivia",
        "contact-phone-title": "Phone / WhatsApp",
        "contact-find-us": "Find Us",
        "contact-address-label": "Address:",
        
        // Book Now Section
        "book-title": "Ready for Your Amazon Adventure?",
        "book-description": "Book your stay at Mirador Jungle el Macuti and immerse yourself in the beauty of the Bolivian rainforest.",
        "book-whatsapp": "Book via WhatsApp",
        
        // Footer
        "footer-description": "Your gateway to the Amazon rainforest in Rurrenabaque, Bolivia.",
        "footer-quick-links": "Quick Links",
        "footer-contact-info": "Contact Info",
        "footer-rights": "All rights reserved.",
        "footer-made-with": "Made with ❤️ by"
    },
    es: {
        // Navigation
        "nav-home": "Inicio",
        "nav-about": "Acerca de",
        "nav-accommodations": "Alojamiento",
        "nav-activities": "Actividades",
        "nav-gallery": "Galería",
        "nav-contact": "Contacto",
        
        // Hero Section
        "hero-title": "Vive el Corazón del Amazonas",
        "hero-subtitle": "Descubre cascadas vírgenes, paisajes selváticos exuberantes y la auténtica hospitalidad boliviana en nuestro eco-lodge en Rurrenabaque",
        "hero-reserve": "Reservar Ahora",
        "hero-learn": "Saber Más",
        
        // About Section
        "about-title": "Bienvenidos al Paraíso",
        "about-description": "Ubicado en el corazón del Amazonas boliviano, Mirador Jungle el Macuti ofrece una experiencia incomparable de eco-lodge. Nuestros alojamientos rústicos pero cómodos proporcionan la base perfecta para explorar una de las regiones más biodiversas del mundo.",
        "feature-eco-title": "Eco-Amigable",
        "feature-eco-desc": "Turismo sostenible que respeta y preserva el medio ambiente natural",
        "feature-views-title": "Vistas Impresionantes",
        "feature-views-desc": "Vistas panorámicas del dosel de la selva y cascadas vírgenes",
        "feature-authentic-title": "Experiencia Auténtica",
        "feature-authentic-desc": "Genuina hospitalidad boliviana en un entorno natural tranquilo",
        
        // Accommodations Section
        "accommodations-title": "Alojamiento Cómodo",
        "accommodations-subtitle": "Elige entre nuestras dos opciones de habitación en el corazón del Amazonas",
        "room-double-title": "Habitación Doble",
        "room-single-title": "Ocupación Individual",
        "price-per-night": "por noche",
        "room-double-desc": "Habitación doble espaciosa con 1 cama queen, perfecta para parejas o viajeros solos que buscan comodidad y privacidad.",
        "room-single-desc": "Perfecto para viajeros solos: la misma excelente habitación doble pero exclusivamente para un huésped a una tarifa especial.",
        "room-features-title": "Características",
        "views-outdoor-title": "Vistas y Exterior",
        "amenities-title": "Comodidades",
        "feature-queen-bed": "1 Cama queen",
        "feature-max-guests": "Máx. 2 huéspedes",
        "feature-single-guest": "Solo para 1 huésped",
        "feature-private-bathroom": "Baño privado",
        "feature-kitchenette": "Cocineta privada",
        "feature-garden-view": "Vista al jardín",
        "feature-pool-view": "Vista a la piscina",
        "feature-mountain-view": "Vista a la montaña",
        "feature-city-view": "Vista a la ciudad",
        "feature-balcony": "Balcón y Terraza",
        "feature-ac": "Aire acondicionado",
        "feature-minibar": "Minibar",
        "feature-wifi": "WiFi gratuito",
        "feature-microwave": "Microondas y Horno",
        "feature-coffee": "Cafetera/Tetera",
        "booking-no-prepay": "No se necesita prepago – paga en la propiedad",
        "booking-rooms-left": "¡Solo quedan 5 habitaciones!",
        "booking-exclusive": "Tarifa exclusiva de ocupación individual",
        "book-double-room": "Reservar Habitación Doble",
        "book-single-room": "Reservar Habitación Individual",
        
        // Activities Section
        "activities-title": "Te Esperan Aventuras Amazónicas",
        "activities-subtitle": "Explora las maravillas de la selva tropical boliviana",
        "activity-waterfall-title": "Senderismo a Cascadas",
        "activity-waterfall-desc": "Camina por senderos selváticos vírgenes para descubrir cascadas ocultas y piscinas naturales.",
        "activity-wildlife-title": "Observación de Vida Silvestre",
        "activity-wildlife-desc": "Observa aves exóticas, monos y otras criaturas fascinantes en su hábitat natural.",
        "activity-river-title": "Excursiones Fluviales",
        "activity-river-desc": "Navega por las vías fluviales del Amazonas y explora áreas remotas accesibles solo en barco.",
        "activity-cultural-title": "Tours Culturales",
        "activity-cultural-desc": "Visita comunidades indígenas locales y aprende sobre las formas tradicionales de vida en el Amazonas.",
        "activity-photo-title": "Tours de Fotografía",
        "activity-photo-desc": "Captura la belleza impresionante de la selva tropical con expediciones fotográficas guiadas.",
        "activity-night-title": "Caminatas Nocturnas",
        "activity-night-desc": "Experimenta la selva después del anochecer y descubre sus habitantes nocturnos.",
        
        // Gallery Section
        "gallery-title": "Galería",
        "gallery-subtitle": "Vislumbres del paraíso",
        
        // Testimonials Section
        "testimonials-title": "Lo Que Dicen Nuestros Huéspedes",
        "testimonial-1": "\"¡Recibí una bienvenida realmente cálida y encantadora y realmente disfruté mi tiempo allí! ¡Muchas gracias! Probablemente el hostal más agradable en el que he estado.\"",
        "testimonial-2": "\"Lugar ideal para quienes aman la naturaleza y la tranquilidad. Vista hermosa, jardín lleno de flores y plantas. Habitación espaciosa con baño. Piscina y cocina están disponibles. ¡Rosa es acogedora y muy amable!\"",
        "country-germany": "Alemania",
        "country-italy": "Italia",
        
        // Contact Section
        "contact-title": "Contáctanos",
        "contact-get-in-touch": "Ponte en Contacto",
        "contact-description": "¿Listo para experimentar la magia del Amazonas? Contáctanos para planificar tu estadía inolvidable.",
        "contact-location-title": "Ubicación",
        "contact-location-text": "Rurrenabaque, Departamento del Beni<br>Bolivia",
        "contact-phone-title": "Teléfono / WhatsApp",
        "contact-find-us": "Encuéntranos",
        "contact-address-label": "Dirección:",
        
        // Book Now Section
        "book-title": "¿Listo para tu Aventura Amazónica?",
        "book-description": "Reserva tu estadía en Mirador Jungle el Macuti y sumérgete en la belleza de la selva tropical boliviana.",
        "book-whatsapp": "Reservar por WhatsApp",
        
        // Footer
        "footer-description": "Tu puerta de entrada a la selva amazónica en Rurrenabaque, Bolivia.",
        "footer-quick-links": "Enlaces Rápidos",
        "footer-contact-info": "Información de Contacto",
        "footer-rights": "Todos los derechos reservados.",
        "footer-made-with": "Hecho con ❤️ por"
    }
};

// Language Toggle Functionality
let currentLanguage = 'en';

function initializeLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Load saved language preference or default to English
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLanguage);
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang !== currentLanguage) {
                switchLanguage(selectedLang);
                // Save language preference
                localStorage.setItem('preferredLanguage', selectedLang);
            }
        });
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all translatable text
    updateTranslations(lang);
    
    // Update WhatsApp links
    updateWhatsAppLinks(lang);
    
    // Update page title and meta description
    updatePageMeta(lang);
}

function updateTranslations(lang) {
    const t = translations[lang];
    
    // Update all elements with data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            // Handle HTML content for elements that need it
            if (key === 'contact-location-text') {
                element.innerHTML = t[key];
            } else {
                element.textContent = t[key];
            }
        }
    });
}

function updateWhatsAppLinks(lang) {
    const messages = {
        en: {
            general: "Hi! I'm interested in booking a stay at Mirador Jungle el Macuti. Can you help me with availability and rates?",
            double: "Hi! I'm interested in booking a Double Room at Mirador Jungle el Macuti. Can you help me with availability?",
            single: "Hi! I'm interested in booking a Single Occupancy room at Mirador Jungle el Macuti. Can you help me with availability?"
        },
        es: {
            general: "¡Hola! Estoy interesado en reservar una estadía en Mirador Jungle el Macuti. ¿Puedes ayudarme con disponibilidad y tarifas?",
            double: "¡Hola! Estoy interesado en reservar una Habitación Doble en Mirador Jungle el Macuti. ¿Puedes ayudarme con disponibilidad?",
            single: "¡Hola! Estoy interesado en reservar una Habitación Individual en Mirador Jungle el Macuti. ¿Puedes ayudarme con disponibilidad?"
        }
    };
    
    // Update all WhatsApp links
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const key = link.getAttribute('data-translate');
        let message = messages[lang].general;
        
        if (key === 'book-double-room') {
            message = messages[lang].double;
        } else if (key === 'book-single-room') {
            message = messages[lang].single;
        }
        
        link.href = `https://wa.me/59171148008?text=${encodeURIComponent(message)}`;
    });
}

function updatePageMeta(lang) {
    const titles = {
        en: "Mirador Jungle el Macuti - Eco Lodge in Rurrenabaque, Bolivia",
        es: "Mirador Jungle el Macuti - Eco Lodge en Rurrenabaque, Bolivia"
    };
    
    const descriptions = {
        en: "Experience the beauty of the Bolivian Amazon at Mirador Jungle el Macuti, an eco-lodge in Rurrenabaque offering stunning jungle views, waterfalls, and authentic nature experiences.",
        es: "Experimenta la belleza del Amazonas boliviano en Mirador Jungle el Macuti, un eco-lodge en Rurrenabaque que ofrece vistas impresionantes de la selva, cascadas y experiencias auténticas en la naturaleza."
    };
    
    document.title = titles[lang];
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', descriptions[lang]);
    }
}

//# sourceMappingURL=main.js.map