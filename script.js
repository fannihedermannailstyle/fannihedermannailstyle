document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

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

    const imageFiles = [
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
        !galleryGrid ||
        !previousButton ||
        !nextButton ||
        !pageStatus
    ) {
        return;
    }

    const imagesPerPage = 9;
    const totalPages = Math.ceil(
        imageFiles.length / imagesPerPage
    );

    let currentPage = 1;

    function createGalleryCard(fileName, imageNumber) {
        const figure = document.createElement("figure");
        const link = document.createElement("a");
        const image = document.createElement("img");

        figure.className = "home-gallery-card";

        link.href = `./images/${fileName}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        image.src = `./images/${fileName}`;
        image.alt =
            `Fanni Hederman Nailstyle körömmunka ${imageNumber}`;
        image.loading = "lazy";
        image.decoding = "async";

        link.appendChild(image);
        figure.appendChild(link);

        return figure;
    }

    function renderGalleryPage() {
        const firstImageIndex =
            (currentPage - 1) * imagesPerPage;

        const pageImages = imageFiles.slice(
            firstImageIndex,
            firstImageIndex + imagesPerPage
        );

        const fragment = document.createDocumentFragment();

        pageImages.forEach((fileName, index) => {
            fragment.appendChild(
                createGalleryCard(
                    fileName,
                    firstImageIndex + index + 1
                )
            );
        });

        galleryGrid.replaceChildren(fragment);

        pageStatus.textContent =
            `${currentPage} / ${totalPages}`;

        previousButton.disabled =
            currentPage === 1;

        nextButton.disabled =
            currentPage === totalPages;
    }

    function scrollToGallery() {
        const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

        const galleryTop =
            galleryGrid.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            24;

        window.scrollTo({
            top: Math.max(0, galleryTop),
            behavior: "smooth"
        });
    }

    previousButton.addEventListener("click", () => {
        if (currentPage <= 1) {
            return;
        }

        currentPage -= 1;
        renderGalleryPage();
        scrollToGallery();
    });

    nextButton.addEventListener("click", () => {
        if (currentPage >= totalPages) {
            return;
        }

        currentPage += 1;
        renderGalleryPage();
        scrollToGallery();
    });

    renderGalleryPage();
});
