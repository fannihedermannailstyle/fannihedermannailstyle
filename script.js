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
});