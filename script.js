// ============================================================
//  BUJUKO MIRACLE PARK & GARDENS - COMPLETE JAVASCRIPT
//  Pages: Home | About | Contact
// ============================================================

(function () {
    // ---- Dynamic greeting rotation ----
    const msgEl = document.getElementById('dynamic-greeting');
    if (msgEl) {
        const messages = [
            '📍 Bujuko Miracle Park · follow the signpost',
            '🚗 Mityana road · 1.5 km from main road',
            '👉 turn right at the signpost · 200m to paradise',
            '🌳 Relax, Celebrate and Create Memories',
            '📞 Book now: 0757576806 / 0782230255',
        ];
        let index = 0;
        setInterval(() => {
            index = (index + 1) % messages.length;
            msgEl.textContent = messages[index];
        }, 4500);
    }

    // ---- Lightbox functionality ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');

    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach((img) => {
        img.addEventListener('click', function () {
            if (lightbox) {
                lightbox.classList.add('show');
                lightboxImage.src = this.src;
                const captionText = this.alt || this.src.split('/').pop();
                lightboxCaption.textContent = captionText;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightboxFn() {
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFn);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                closeLightboxFn();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
            closeLightboxFn();
        }
    });

    // ---- Contact Form Handler ----
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '⚠️ Please fill in all required fields.';
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '⚠️ Please enter a valid email address.';
                return;
            }

            formStatus.className = 'form-status success';
            formStatus.textContent = '✅ Thank you! Your message has been sent. We\'ll get back to you soon.';
            contactForm.reset();

            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
        });
    }

    // ---- Highlight current page in nav ----
    document.addEventListener('DOMContentLoaded', function () {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            }
        });
    });

    console.log('🌿 Bujuko Miracle Park & Gardens · 3-Page Website');
    console.log('📄 Pages: Home | About | Contact');
    console.log('📍 Mityana road, 1.5km · signpost on right, 200m from main road.');
    console.log('📞 Bookings: 0757576806 / 0782230255');
    console.log('✨ Relax, Celebrate and Create Memories');
})();