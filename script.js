document.addEventListener("DOMContentLoaded", () => {
    /* Fejléc és mobilmenü */

    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".main-navigation");

    function closeMenu() {
        if (!menuButton || !navigation) {
            return;
        }

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.classList.remove("is-open");
        navigation.classList.remove("is-open");
    }

    if (menuButton && navigation) {
        menuButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuButton.classList.toggle("is-open", !isOpen);
            navigation.classList.toggle("is-open", !isOpen);
        });

        navigation.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                closeMenu();
            }
        });

        document.addEventListener("click", (event) => {
            if (
                !menuButton.contains(event.target) &&
                !navigation.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1020) {
                closeMenu();
            }
        });
    }

    /* Oldalon belüli görgetés */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetSection =
                document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();
            closeMenu();

            const headerHeight = header
                ? header.getBoundingClientRect().height
                : 0;

            const sectionTop =
                targetSection.getBoundingClientRect().top +
                window.scrollY;

            window.scrollTo({
                top: Math.max(0, sectionTop - headerHeight),
                behavior: "smooth"
            });

            history.replaceState(null, "", targetId);
        });
    });

    /* Főoldali galéria */

    const imageFiles = [
        "IMG_8993.webp",
        "IMG_8973.webp",
        "IMG_8957.webp",
        "IMG_8821.webp",
        "IMG_8800.webp",
        "IMG_8792.webp",
        "IMG_8771.webp",
        "IMG_8404.webp",
        "IMG_8391.webp",
        "IMG_8384.webp",
        "IMG_8372.webp",
        "IMG_8357.webp",
        "IMG_8352.webp",
        "IMG_8305.webp",
        "IMG_8292.webp",
        "IMG_8273.webp",
        "IMG_8239.webp",
        "IMG_8230.webp",
        "IMG_8185.webp",
        "IMG_8160.webp",
        "IMG_8065.webp",
        "IMG_7907.webp",
        "IMG_7860.webp",
        "IMG_7842.webp",
        "IMG_7806.webp",
        "IMG_7627.webp",
        "IMG_7608.webp",
        "IMG_7580.webp",
        "IMG_7571.webp",
        "IMG_7554.webp",
        "IMG_7543.webp",
        "IMG_7537.webp",
        "IMG_7528.webp",
        "IMG_7520.webp"
    ];

    const galleryGrid =
        document.getElementById("home-gallery-grid");

    const previousButton =
        document.getElementById("home-gallery-prev");

    const nextButton =
        document.getElementById("home-gallery-next");

    const pageStatus =
        document.getElementById("home-gallery-page-status");

    if (
        galleryGrid &&
        previousButton &&
        nextButton &&
        pageStatus
    ) {
        let currentPage = 0;

let imagesPerPage =
    window.innerWidth <= 768 ? 6 : 9;

let totalPages =
    Math.ceil(imageFiles.length / imagesPerPage);

    let mobileView = window.innerWidth <= 768;

window.addEventListener("resize", () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile === mobileView) {
        return;
    }

    mobileView = isMobile;
    imagesPerPage = isMobile ? 6 : 9;
    totalPages =
        Math.ceil(imageFiles.length / imagesPerPage);
currentPage = 0;
renderGallery();
    
});
        function renderGallery() {
            const start = currentPage * imagesPerPage;
            const pageImages = imageFiles.slice(
                start,
                start + imagesPerPage
            );

            galleryGrid.replaceChildren();

            const fragment =
                document.createDocumentFragment();

            pageImages.forEach((fileName, index) => {
                const figure =
                    document.createElement("figure");

                const link =
                    document.createElement("a");

                const image =
                    document.createElement("img");

                figure.className = "home-gallery-card";

                link.href = `./images/${fileName}`;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                image.src = `./images/${fileName}`;
                image.alt =
                    `Fanni Hederman Nailstyle körömmunka ${
                        start + index + 1
                    }`;

                image.loading = "lazy";
                image.decoding = "async";

                link.appendChild(image);
                figure.appendChild(link);
                fragment.appendChild(figure);
            });

            galleryGrid.appendChild(fragment);

            pageStatus.textContent =
                `${currentPage + 1} / ${totalPages}`;

            previousButton.disabled =
                currentPage === 0;

            nextButton.disabled =
                currentPage === totalPages - 1;
        }

        previousButton.addEventListener("click", () => {
            if (currentPage > 0) {
                currentPage -= 1;
                renderGallery();
            }
        });

        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages - 1) {
                currentPage += 1;
                renderGallery();
            }
        });

        renderGallery();
    }
});