document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".main-navigation");
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    function closeMenu() {
        if (!menuButton || !navigation) {
            return;
        }

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.classList.remove("is-open");
        navigation.classList.remove("is-open");
    }

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuButton.classList.toggle("is-open", !isOpen);
            navigation.classList.toggle("is-open", !isOpen);
        });

        document.addEventListener("click", (event) => {
            if (
                header &&
                event.target instanceof Node &&
                !header.contains(event.target)
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

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            closeMenu();

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
/* Mobil hamburger menü */

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".main-navigation");

    if (!menuButton || !navigation) {
        return;
    }

    function setMenuOpen(open) {
        navigation.classList.toggle("is-open", open);
        menuButton.classList.toggle("is-open", open);
        menuButton.setAttribute("aria-expanded", String(open));
    }

    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        setMenuOpen(!isOpen);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("click", (event) => {
        if (
            !menuButton.contains(event.target) &&
            !navigation.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });
});