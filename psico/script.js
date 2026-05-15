/* =========================================
   Raquel Cabral - Psicologia Clinica
   JavaScript Completo
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // NAVBAR - Scroll effect & active section
  // ==========================================
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileLinks = document.querySelectorAll(".mobile-menu a:not(.mobile-cta)");
  const sections = [
    "inicio",
    "sobre",
    "especialidades",
    "abordagem",
    "depoimentos",
    "contato",
  ];

  function updateNavbar() {
    // Scroll background
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active section detection
    let currentSection = "inicio";
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 120) {
        currentSection = sections[i];
        break;
      }
    }

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href").replace("#", "");
      if (href === currentSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    mobileLinks.forEach(function (link) {
      const href = link.getAttribute("href").replace("#", "");
      if (href === currentSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  // ==========================================
  // HAMBURGER - Mobile menu toggle
  // ==========================================
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open")
      ? "hidden"
      : "";
  });

  // Close mobile menu on link click
  document.querySelectorAll(".mobile-menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // ==========================================
  // SMOOTH SCROLL for all anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ==========================================
  // HERO - Entry animations (staggered)
  // ==========================================
  const heroAnimElements = document.querySelectorAll(".hero [data-animate]");
  heroAnimElements.forEach(function (el, i) {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    setTimeout(function () {
      el.style.transition =
        "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 300 + i * 150);
  });

  // ==========================================
  // SCROLL REVEAL - IntersectionObserver
  // ==========================================
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(function (el) {
    revealObserver.observe(el);
  });

  // ==========================================
  // APPROACH - Step auto-play
  // ==========================================
  var activeStep = 0;
  var stepCards = document.querySelectorAll(".step-card");
  var progressBars = document.querySelectorAll(".approach-progress-bar");
  var stepInterval;

  function setActiveStep(index) {
    activeStep = index;

    stepCards.forEach(function (card, i) {
      if (i === activeStep) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    progressBars.forEach(function (bar, i) {
      var fill = bar.querySelector(".approach-progress-fill");
      bar.classList.remove("active", "past");
      fill.style.animation = "none";
      // Force reflow
      void fill.offsetWidth;

      if (i < activeStep) {
        bar.classList.add("past");
        fill.style.width = "100%";
      } else if (i === activeStep) {
        bar.classList.add("active");
        fill.style.animation = "fillBar 4s linear forwards";
      } else {
        fill.style.width = "0";
      }
    });
  }

  function startStepAutoPlay() {
    clearInterval(stepInterval);
    stepInterval = setInterval(function () {
      activeStep = (activeStep + 1) % stepCards.length;
      setActiveStep(activeStep);
    }, 4000);
  }

  if (stepCards.length > 0) {
    setActiveStep(0);
    startStepAutoPlay();

    stepCards.forEach(function (card, i) {
      card.addEventListener("click", function () {
        setActiveStep(i);
        startStepAutoPlay();
      });
    });

    progressBars.forEach(function (bar, i) {
      bar.addEventListener("click", function () {
        setActiveStep(i);
        startStepAutoPlay();
      });
    });
  }

  // ==========================================
  // TESTIMONIALS - Carousel
  // ==========================================
  var currentTestimonial = 0;
  var testimonialSlides = document.querySelectorAll(".testimonial-slide");
  var testimonialDots = document.querySelectorAll(".testimonial-dot");
  var isAutoPlaying = true;
  var testimonialInterval;

  function showTestimonial(index) {
    currentTestimonial = index;

    testimonialSlides.forEach(function (slide, i) {
      if (i === currentTestimonial) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    testimonialDots.forEach(function (dot, i) {
      if (i === currentTestimonial) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function startTestimonialAutoPlay() {
    clearInterval(testimonialInterval);
    if (isAutoPlaying) {
      testimonialInterval = setInterval(function () {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
      }, 5000);
    }
  }

  if (testimonialSlides.length > 0) {
    showTestimonial(0);
    startTestimonialAutoPlay();

    testimonialDots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        isAutoPlaying = false;
        clearInterval(testimonialInterval);
        showTestimonial(i);
      });
    });

    var prevBtn = document.querySelector(".testimonial-arrow.prev");
    var nextBtn = document.querySelector(".testimonial-arrow.next");

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        isAutoPlaying = false;
        clearInterval(testimonialInterval);
        var idx =
          currentTestimonial === 0
            ? testimonialSlides.length - 1
            : currentTestimonial - 1;
        showTestimonial(idx);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        isAutoPlaying = false;
        clearInterval(testimonialInterval);
        var idx = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(idx);
      });
    }
  }

  // ==========================================
  // CONTACT FORM
  // ==========================================
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector(".btn-submit");
      btn.classList.add("sent");
      btn.innerHTML =
        '<span>Mensagem Enviada!</span>';

      // Reset after delay
      setTimeout(function () {
        btn.classList.remove("sent");
        btn.innerHTML =
          '<span>Enviar Mensagem</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
        contactForm.reset();
      }, 3000);
    });
  }

  // ==========================================
  // WHATSAPP BUTTON - Show on scroll
  // ==========================================
  var whatsappBtn = document.querySelector(".whatsapp-btn");
  function updateWhatsApp() {
    if (window.scrollY > 300) {
      whatsappBtn.classList.add("visible");
    } else {
      whatsappBtn.classList.remove("visible");
    }
  }
  window.addEventListener("scroll", updateWhatsApp, { passive: true });
  updateWhatsApp();

  // ==========================================
  // MOBILE MENU - Staggered link animation
  // ==========================================
  var mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
  mobileMenuLinks.forEach(function (link, i) {
    link.style.transitionDelay = i * 80 + "ms";
  });
});