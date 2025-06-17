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
//----------------------------------------------

 // --- Modal Logic ---
const startFreeBtn = document.getElementById('startFreeBtn');
const loginBtn = document.getElementById('loginBtn');
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const showSignupModal = document.getElementById('showSignupModal');
const showLoginModal = document.getElementById('showLoginModal');

// "Get Started" opens signup modal
if (startFreeBtn && signupModal) {
    startFreeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.classList.add('active');
        document.body.classList.add('modal-open');
    });
}

// "Log in" (hero/nav) opens login modal
if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('active');
        document.body.classList.add('modal-open');
    });
}
// Close signup modal
if (closeSignupModal && signupModal) {
    closeSignupModal.addEventListener('click', function() {
        signupModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });
}

// Close login modal
if (closeLoginModal && loginModal) {
    closeLoginModal.addEventListener('click', function() {
        loginModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });
}


// Switch to signup modal from login modal
if (showSignupModal && signupModal && loginModal) {
    showSignupModal.onclick = function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        signupModal.classList.add('active');
    };
}

// Switch to login modal from signup modal
if (showLoginModal && signupModal && loginModal) {
    showLoginModal.onclick = function(e) {
        e.preventDefault();
        signupModal.classList.remove('active');
        loginModal.classList.add('active');
        document.body.classList.add('modal-open');
    };
}

    // Open login modal
    if (loginBtn && loginModal) {
        loginBtn.onclick = function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.classList.add('modal-open');
        };
    }

    
//---------------------------------------------
    // Signup password show/hide
    const signupPasswordInput = document.getElementById('signup-password');
    const toggleSignupPassword = document.getElementById('toggle-password');
    const eyeShowSignup = document.getElementById('eye-show-signup');
    const eyeHideSignup = document.getElementById('eye-hide-signup');




    if (toggleSignupPassword && signupPasswordInput) {
        toggleSignupPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const isPassword = signupPasswordInput.type === 'password';
            signupPasswordInput.type = isPassword ? 'text' : 'password';
            eyeShowSignup.style.display = isPassword ? 'none' : 'inline';
            eyeHideSignup.style.display = isPassword ? 'inline' : 'none';
        });
    }

    // Signup confirm password show/hide
    const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    const eyeShowConfirm = document.getElementById('eye-show-confirm');
    const eyeHideConfirm = document.getElementById('eye-hide-confirm');

    if (toggleConfirmPassword && signupConfirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const isPassword = signupConfirmPasswordInput.type === 'password';
            signupConfirmPasswordInput.type = isPassword ? 'text' : 'password';
            eyeShowConfirm.style.display = isPassword ? 'none' : 'inline';
            eyeHideConfirm.style.display = isPassword ? 'inline' : 'none';
        });
    }
 

    // Switch to signup modal from login modal
    if (showSignupModal && signupModal) {
        showSignupModal.onclick = function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
        };
    }

    // --- Login Form Logic ---
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        const loginBtn = loginForm.querySelector('.login-btn');
        const messageDiv = document.getElementById('login-message');
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            messageDiv.textContent = "";
            loginBtn.disabled = true;
            loginBtn.textContent = "Logging in...";
            const data = {
                email: document.getElementById('login-email').value,
                password: document.getElementById('login-password').value
            };
            try {
                const res = await fetch('http://localhost:4000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if (res.ok) {
                    window.location.href = "profile.html";
                } else {
                    messageDiv.textContent = result.message || "Login failed.";
                }
            } catch (err) {
                messageDiv.textContent = "Network error. Please try again.";
            } finally {
                loginBtn.disabled = false;
                loginBtn.textContent = "Log In";
            }
        });
    }

    // --- Password show/hide for login modal ---
    const loginPasswordInput = document.getElementById('login-password');
    const toggleLoginPassword = document.getElementById('toggle-login-password');
    const eyeShow = document.getElementById('eye-show');
    const eyeHide = document.getElementById('eye-hide');

    if (toggleLoginPassword && loginPasswordInput && eyeShow && eyeHide) {
        toggleLoginPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const isPassword = loginPasswordInput.type === 'password';
            loginPasswordInput.type = isPassword ? 'text' : 'password';
            eyeShow.style.display = isPassword ? 'none' : 'inline';
            eyeHide.style.display = isPassword ? 'inline' : 'none';
        });
    }

// Password strength check for signup
const passwordStrengthDiv = document.getElementById('password-strength');
if (signupPasswordInput && passwordStrengthDiv) {
    signupPasswordInput.addEventListener('input', function() {
        const val = signupPasswordInput.value;
        let strength = 0;
        if (val.length >= 8) strength++;
        if (/[A-Z]/.test(val)) strength++;
        if (/[a-z]/.test(val)) strength++;
        if (/[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;

        let msg = '';
        let color = '';
        if (val.length === 0) {
            msg = '';
        } else if (strength <= 2) {
            msg = 'Weak password';
            color = '#d32f2f';
        } else if (strength === 3 || strength === 4) {
            msg = 'Good password';
            color = '#fbc02d';
        } else if (strength === 5) {
            msg = 'Strong password';
            color = '#388e3c';
        }
        passwordStrengthDiv.textContent = msg;
        passwordStrengthDiv.style.color = color;
    });
}

// Signup form validation on submit
const signupForm = document.querySelector('.signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        const password = signupPasswordInput.value;
        const confirm = signupConfirmPasswordInput.value;
        let error = '';

        // Password strength check
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength < 3) {
            error = 'Password is too weak. Use at least 8 characters, upper and lower case, a number, and a symbol.';
        } else if (password !== confirm) {
            error = 'Passwords do not match.';
        }

        if (error) {
            e.preventDefault();
            passwordStrengthDiv.textContent = error;
            passwordStrengthDiv.style.color = '#d32f2f';
            signupConfirmPasswordInput.focus();
        }
    });
}

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

 // --- Signup Form Submission with Email Verification ---
const signupMessage = document.getElementById('signup-message');
const verifyModal = document.getElementById('verify-modal');
const verifyError = document.getElementById('verify-error');
const verifyCodeInput = document.getElementById('verify-code-input');
const verifySubmitBtn = document.getElementById('verify-submit-btn');
const verifyCancelBtn = document.getElementById('verify-cancel-btn');

if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const firstname = document.getElementById('signup-firstname').value.trim();
        const surname = document.getElementById('signup-surname').value.trim();
        const dob = document.getElementById('signup-dob').value;
        const gender = document.getElementById('signup-gender').value;
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        // Simple password match check
        if (password !== confirmPassword) {
            signupMessage.textContent = "Passwords do not match.";
            return;
        }

        // Prepare data
        const formData = { firstname, surname, dob, gender, email, password };

        try {
            const res = await fetch('http://localhost:4000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (res.ok) {
                signupMessage.textContent = "";
                verifyModal.style.display = 'flex'; // Show verification modal
            } else {
                signupMessage.textContent = result.message || "Signup failed.";
            }
        } catch (err) {
            signupMessage.textContent = "Network error. Please try again.";
        }
    });
}

// Handle verification code submission
if (verifySubmitBtn && verifyCodeInput) {
    verifySubmitBtn.addEventListener('click', async function() {
        const code = verifyCodeInput.value.trim();
        if (!code) {
            verifyError.textContent = "Please enter the verification code.";
            return;
        }
        try {
            const res = await fetch('http://localhost:4000/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: document.getElementById('signup-email').value.trim(),
                    code
                })
            });
            const result = await res.json();

            if (res.ok) {
            verifyError.style.color = "#388e3c";
            verifyError.textContent = "Email verified! You can now log in.";

            // if (signupModal) {
            //     signupModal.classList.remove('active');
            // }

            setTimeout(() => {
                verifyModal.style.display = 'none';
                verifyError.textContent = "";
                // Hide signup modal if open
                if (signupModal) {
                    signupModal.classList.remove('active');
                }
                // Show login modal
                if (loginModal) {
                    loginModal.classList.add('active');
                    document.body.classList.add('modal-open');
                }
            }, 1250);
            

            } else {
                verifyError.style.color = "#d32f2f";
                verifyError.textContent = result.message || "Invalid code.";
            }
        } catch (err) {
            verifyError.style.color = "#d32f2f";
            verifyError.textContent = "Network error. Please try again.";
        }
    });
}

// Cancel verification
if (verifyCancelBtn) {
    verifyCancelBtn.addEventListener('click', function() {
        verifyModal.style.display = 'none';
        verifyError.textContent = "";
    });
}


// --- Login Form Logic to login into Profile Page
// -------------------------------------------------------
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const loginMessage = document.getElementById('login-message');
        loginMessage.textContent = "";
        try {
            const res = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await res.json();
            if (res.ok) {
                // Save email to localStorage for profile page
                localStorage.setItem('userEmail', email);
                // Redirect to profile page
                window.location.href = "profile.html";
            } else {
                loginMessage.textContent = result.message || "Login failed.";
                loginMessage.style.color = "#d32f2f";
            }
        } catch (err) {
            loginMessage.textContent = "Network error. Please try again.";
            loginMessage.style.color = "#d32f2f";
        }
    });
}


 //------------------------------------------------------------------------------------------------------
 //-----------------------------------------------------------------------------------------------------

    // --- FAQ Main Drop-tab Logic ---
    document.querySelectorAll('.faq-main-question').forEach(mainBtn => {
        mainBtn.addEventListener('click', function() {
            const answer = mainBtn.nextElementSibling;
            mainBtn.classList.toggle('active');
            answer.classList.toggle('open');
        });
    });

    // --- FAQ Sub Drop-tabs Logic ---
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            // Only open if the main FAQ is open
            const mainAnswer = btn.closest('.faq-main-answer');
            if (mainAnswer && !mainAnswer.classList.contains('open')) return;

            // Close all open answers except the one clicked
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== btn.nextElementSibling) ans.classList.remove('open');
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                if (q !== btn) q.classList.remove('active');
            });
            // Toggle current
            btn.classList.toggle('active');
            btn.nextElementSibling.classList.toggle('open');
        });
    });

    // --- Slideshow Toggle ---
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

    // --- Smooth scroll for ALL navbar links with offset ---
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 60;
                const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: sectionTop, behavior: 'smooth' });
            }
        });
    });
});

// --- Slideshow Overlay Logic (outside DOMContentLoaded) ---
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

// Password show/hide for login modal
const toggleLoginPassword = document.getElementById('toggle-login-password');
const loginPasswordInput = document.getElementById('login-password');
const eyeShow = document.getElementById('eye-show');
const eyeHide = document.getElementById('eye-hide');

if (toggleLoginPassword && loginPasswordInput && eyeShow && eyeHide) {
    toggleLoginPassword.addEventListener('click', function(e) {
        e.preventDefault();
        const isPassword = loginPasswordInput.type === 'password';
        loginPasswordInput.type = isPassword ? 'text' : 'password';
        eyeShow.style.display = isPassword ? 'none' : 'inline';
        eyeHide.style.display = isPassword ? 'inline' : 'none';
    });
}

