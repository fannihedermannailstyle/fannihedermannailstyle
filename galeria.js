document.addEventListener("DOMContentLoaded", () => {
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
        document.getElementById("full-gallery-grid");

    const loadMoreButton =
        document.getElementById("gallery-load-more");

    if (!galleryGrid || !loadMoreButton) {
        return;
    }

    const imagesPerPage = 12;
    let displayedImages = 0;

    function loadNextImages() {
        const nextImages = imageFiles.slice(
            displayedImages,
            displayedImages + imagesPerPage
        );

        const fragment =
            document.createDocumentFragment();

        nextImages.forEach((fileName, index) => {
            const figure =
                document.createElement("figure");

            const link =
                document.createElement("a");

            const image =
                document.createElement("img");

            figure.className = "full-gallery-card";

            link.href = `./images/${fileName}`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            image.src = `./images/${fileName}`;

            image.alt =
                `Fanni Hederman Nailstyle körömmunka ${
                    displayedImages + index + 1
                }`;

            image.loading = "lazy";
            image.decoding = "async";

            link.appendChild(image);
            figure.appendChild(link);
            fragment.appendChild(figure);
        });

        galleryGrid.appendChild(fragment);

        displayedImages += nextImages.length;

        if (displayedImages >= imageFiles.length) {
            loadMoreButton.hidden = true;
        }
    }

    loadMoreButton.addEventListener(
        "click",
        loadNextImages
    );

    loadNextImages();
});