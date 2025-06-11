document.addEventListener("DOMContentLoaded", function () {
    // --- Scrollspy Navigation ---
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".nav-links a");

    function onScroll() {
        let scrollPos = window.scrollY + 80; // Offset for fixed navbar
        sections.forEach(section => {
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + section.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // Initialize on load

    // --- Testimonial Image Slider ---
    let slideIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-slider .prev');
    const nextBtn = document.querySelector('.testimonial-slider .next');
    let sliderInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    }

    function startSlider() {
        sliderInterval = setInterval(nextSlide, 4000);
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });
    }

    showSlide(slideIndex);
    startSlider();

    // Link the Start Free button to the Signup page
    const startFreeBtn = document.getElementById('startFreeBtn');
    if (startFreeBtn) {
        startFreeBtn.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }

    // Link the Login button to the Login page
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.onclick = function() {
            window.location.href = 'login.html';
        };
    }
});

// ...your existing code for scrollspy, slider, etc...

const slideshowImages = [
    "images/picture1.jpg",
    "images/picture2.jpg",
    "images/picture11.jpg",
    "images/picture13.jpg",
    "images/picture4.jpg",
    "images/picture14.jpg",
    "images/picture15.jpg",
    "images/picture16.jpg",
    "images/picture17.jpg",
    "images/picture18.jpg",
    "images/picture19.jpg",
    "images/picture20.jpg",
    "images/picture21.jpg",
    "images/picture22.jpg",
    "images/picture23.jpg",
    "images/picture24.jpg",
    "images/picture25.jpg"
];
let slideshowInterval = null;
let currentSlide = 0;

// Create slideshow overlay (hidden by default)
let slideshowOverlay = document.createElement('div');
slideshowOverlay.id = "slideshowOverlay";
slideshowOverlay.style.position = "fixed";
slideshowOverlay.style.top = "0";
slideshowOverlay.style.left = "0";
slideshowOverlay.style.width = "100vw";
slideshowOverlay.style.height = "100vh";
slideshowOverlay.style.background = "rgba(0,0,0,0.25)";
slideshowOverlay.style.display = "none";
slideshowOverlay.style.justifyContent = "center";
slideshowOverlay.style.alignItems = "center";
slideshowOverlay.style.zIndex = "9999";

// Slideshow container (centered and wide)
let slideshowContainer = document.createElement('div');
slideshowContainer.id = "slideshowContainer";
slideshowContainer.style.width = "60vw";
slideshowContainer.style.maxWidth = "900px";
slideshowContainer.style.height = "60vh";
slideshowContainer.style.maxHeight = "520px";
slideshowContainer.style.background = "#fff";
slideshowContainer.style.border = "none"; // No border
slideshowContainer.style.borderRadius = "24px";
slideshowContainer.style.boxShadow = "0 8px 32px rgba(0,0,0,0.18)";
slideshowContainer.style.display = "flex";
slideshowContainer.style.justifyContent = "center";
slideshowContainer.style.alignItems = "center";
slideshowContainer.style.position = "relative";
slideshowContainer.style.zIndex = "10001";
slideshowContainer.innerHTML = `<img id="slideshowImg" src="" alt="Slideshow" style="width:100%; 
                                height:100%; object-fit:cover; 
                                border-radius:18px;">`;

slideshowOverlay.appendChild(slideshowContainer);
document.body.appendChild(slideshowOverlay);

function startSlideshow() {
    if (slideshowInterval) return; // Already running
    const mainContents = document.querySelectorAll('.main-profile-wrapper, .profile-wrapper, .main-wrapper, main, .hero-section, .howitworks-section, .testimonial-section, .pricing-section, .faq-section');
    mainContents.forEach(el => {
        el.style.filter = "blur(8px)";
        el.style.transition = "filter 0.3s";
    });
    slideshowOverlay.style.display = "flex";
    currentSlide = 0;
    document.getElementById('slideshowImg').src = slideshowImages[currentSlide];
    slideshowInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideshowImages.length;
        document.getElementById('slideshowImg').src = slideshowImages[currentSlide];
    }, 1800);
}

function stopSlideshow() {
    slideshowOverlay.style.display = "none";
    const mainContents = document.querySelectorAll('.main-profile-wrapper, .profile-wrapper, .main-wrapper, main, .hero-section, .howitworks-section, .testimonial-section, .pricing-section, .faq-section');
    mainContents.forEach(el => {
        el.style.filter = "";
    });
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // ...your existing code for scrollspy, slider, etc...

    const toggle = document.getElementById('good');
    if (toggle) {
        toggle.addEventListener('change', function() {
            if (toggle.checked) {
                startSlideshow();
            } else {
                stopSlideshow();
            }
        });
    }
});

