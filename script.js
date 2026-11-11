/* ==========================================================================
   SCRIPT INTERACTIVO (script.js)
   Portfolio de Santiago Tornau - Desarrollo Tecnológico 2 (UNRAF)
   Funciones incluidas:
   1. Cambio en vivo entre los 2 Modelos de diseño (Oscuro Gamer vs. Claro Minimalista).
   2. Filtro de proyectos por categoría.
   3. Selector para alternar entre las 2 capturas de pantalla de cada juego.
   4. Visor de imagen ampliada (Lightbox) al hacer clic en cualquier captura.
   5. Menú hamburguesa desplegable para celulares.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------------------------------------------------
       1. ALTERNAR ENTRE LOS 2 MODELOS (OSCURO GAMER / CLARO MINIMALISTA)
       ---------------------------------------------------------------------- */
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeLabel = document.getElementById("theme-label");

    // Función que actualiza el texto y el ícono del botón según el modelo activo
    function actualizarBotonTema(temaActual) {
        if (temaActual === "light") {
            themeIcon.textContent = "🌙";
            themeLabel.textContent = "Modelo Oscuro";
        } else {
            themeIcon.textContent = "☀️";
            themeLabel.textContent = "Modelo Claro";
        }
    }

    // Revisar si el usuario ya había elegido un modelo anteriormente
    const temaGuardado = localStorage.getItem("portfolio-theme") || "dark";
    htmlElement.setAttribute("data-theme", temaGuardado);
    actualizarBotonTema(temaGuardado);

    themeToggleBtn.addEventListener("click", () => {
        const temaActual = htmlElement.getAttribute("data-theme");
        const nuevoTema = temaActual === "dark" ? "light" : "dark";

        htmlElement.setAttribute("data-theme", nuevoTema);
        localStorage.setItem("portfolio-theme", nuevoTema);
        actualizarBotonTema(nuevoTema);
    });


    /* ----------------------------------------------------------------------
       2. FILTRO DE PROYECTOS POR CATEGORÍA
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Quitar clase 'active' de todos los botones y activarla en el presionado
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            const categoriaSeleccionada = button.getAttribute("data-filter");

            projectCards.forEach((card) => {
                const categoriaProyecto = card.getAttribute("data-category");

                if (categoriaSeleccionada === "todos" || categoriaProyecto === categoriaSeleccionada) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });


    /* ----------------------------------------------------------------------
       3. CAMBIADOR DE CAPTURAS EN CADA PROYECTO (1/2 <-> 2/2)
       ---------------------------------------------------------------------- */
    const switchButtons = document.querySelectorAll(".img-switch-btn");

    switchButtons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita abrir el visor grande al tocar el botón
            const wrapper = btn.closest(".project-image-wrapper");
            const img = wrapper.querySelector(".project-img");

            // Leemos las rutas de las imágenes separadas por "|"
            const listaImagenes = img.getAttribute("data-images").split("|");
            let indiceActual = parseInt(img.getAttribute("data-current-index"), 10);

            // Pasamos a la siguiente imagen de la carpeta del juego
            indiceActual = (indiceActual + 1) % listaImagenes.length;
            img.setAttribute("src", listaImagenes[indiceActual]);
            img.setAttribute("data-current-index", indiceActual);

            // Actualizamos el contador del botón
            btn.textContent = `🔄 Ver otra captura (${indiceActual + 1}/${listaImagenes.length})`;
        });
    });


    /* ----------------------------------------------------------------------
       4. VISOR DE IMAGEN AMPLIADA (LIGHTBOX)
       ---------------------------------------------------------------------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const projectImages = document.querySelectorAll(".project-img");

    projectImages.forEach((img) => {
        img.addEventListener("click", () => {
            lightboxImg.setAttribute("src", img.getAttribute("src"));
            lightboxImg.setAttribute("alt", img.getAttribute("alt"));
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
        });
    });

    function cerrarLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
    }

    lightboxClose.addEventListener("click", cerrarLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            cerrarLightbox();
        }
    });


    /* ----------------------------------------------------------------------
       5. MENÚ HAMBURGUESA PARA DISPOSITIVOS MÓVILES
       ---------------------------------------------------------------------- */
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        const estaAbierto = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", estaAbierto);
    });

    // Cerrar el menú móvil automáticamente al tocar cualquier sección
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

});

