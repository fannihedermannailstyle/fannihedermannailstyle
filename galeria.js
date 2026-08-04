document.addEventListener("DOMContentLoaded", () => {
    const imageFiles = [
        "IMG_8800.JPEG",
        "IMG_8792.JPEG",
        "IMG_8771.JPEG",
        "IMG_8404.JPEG",
        "IMG_8391.JPEG",
        "IMG_8384.JPEG",
        "IMG_8372.JPEG",
        "IMG_8357.JPEG",
        "IMG_8352.JPEG",
        "IMG_8305.JPEG",
        "IMG_8292.JPEG",
        "IMG_8273.JPEG",
        "IMG_8239.JPEG",
        "IMG_8230.JPEG",
        "IMG_8185.JPEG",
        "IMG_8160.JPEG",
        "IMG_8065.JPEG",
        "IMG_7907.JPEG",
        "IMG_7860.JPEG",
        "IMG_7842.JPEG",
        "IMG_7806.JPEG",
        "IMG_7627.JPEG",
        "IMG_7608.JPEG",
        "IMG_7580.JPEG",
        "IMG_7571.JPEG",
        "IMG_7554.JPEG",
        "IMG_7543.JPEG",
        "IMG_7537.JPEG",
        "IMG_7528.JPEG",
        "IMG_7520.JPEG"
    ];

    const galleryGrid =
        document.getElementById("full-gallery-grid");

    const loadMoreButton =
        document.getElementById("gallery-load-more");

    const imagesPerPage = 12;

    let displayedImages = 0;

    if (!galleryGrid || !loadMoreButton) {
        return;
    }

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