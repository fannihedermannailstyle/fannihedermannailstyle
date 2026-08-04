document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    /* Oldalon belüli sima görgetés */

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.getBoundingClientRect().height
                : 0;

            const sectionTop =
                targetSection.getBoundingClientRect().top +
                window.scrollY;

            const extraOffset =
                targetId === "#velemenyek" ? 120 : 0;

            window.scrollTo({
                top: Math.max(
                    0,
                    sectionTop - headerHeight + extraOffset
                ),
                behavior: "smooth"
            });

            history.replaceState(null, "", targetId);
        });
    });

    /* Főoldali lapozható galéria */

    const slider = document.querySelector("[data-gallery-slider]");

    if (!slider) {
        return;
    }

    const slides = Array.from(
        slider.querySelectorAll(".featured-gallery-slide")
    );

    const previousButton =
        slider.querySelector("[data-gallery-prev]");

    const nextButton =
        slider.querySelector("[data-gallery-next]");

    const dotsContainer =
        document.querySelector("[data-gallery-dots]");

    if (slides.length === 0) {
        return;
    }

    let currentSlide = 0;
    let automaticSlider = null;
    const dots = [];

    function showSlide(index) {
        currentSlide =
            (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle(
                "is-active",
                slideIndex === currentSlide
            );
        });

        dots.forEach((dot, dotIndex) => {
            const isActive =
                dotIndex === currentSlide;

            dot.classList.toggle(
                "is-active",
                isActive
            );

            dot.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );
        });
    }

    /* Lapozópontok létrehozása */

    if (dotsContainer) {
        slides.forEach((slide, index) => {
            const dot =
                document.createElement("button");

            dot.type = "button";
            dot.className = "featured-gallery-dot";

            dot.setAttribute(
                "aria-label",
                `${index + 1}. kép megjelenítése`
            );

            dot.addEventListener("click", () => {
                showSlide(index);
                restartAutomaticSlider();
            });

            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

    function stopAutomaticSlider() {
        if (automaticSlider !== null) {
            window.clearInterval(automaticSlider);
            automaticSlider = null;
        }
    }

    function startAutomaticSlider() {
        stopAutomaticSlider();

        automaticSlider = window.setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function restartAutomaticSlider() {
        startAutomaticSlider();
    }

    /* Előző kép */

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            showSlide(currentSlide - 1);
            restartAutomaticSlider();
        });
    }

    /* Következő kép */

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showSlide(currentSlide + 1);
            restartAutomaticSlider();
        });
    }

    /* Automatikus lapozás megállítása használat közben */

    slider.addEventListener(
        "mouseenter",
        stopAutomaticSlider
    );

    slider.addEventListener(
        "mouseleave",
        startAutomaticSlider
    );

    slider.addEventListener(
        "focusin",
        stopAutomaticSlider
    );

    slider.addEventListener(
        "focusout",
        startAutomaticSlider
    );

    showSlide(0);
    startAutomaticSlider();
});