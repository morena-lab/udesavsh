/**
 * render.js
 * ------------------------------------------------------------------
 * Componentes reutilizables para construir el "documento navegable"
 * a partir de los datos en data.js. No hay backend ni build step:
 * este script corre en el navegador y arma el DOM directamente.
 *
 * Incluye: índice lateral navegable (con scrollspy), anclas por
 * evaluación, navegación anterior/siguiente entre tarjetas, y un
 * lightbox para ampliar cada captura de pantalla. No cambia ningún
 * dato de data.js.
 * ------------------------------------------------------------------
 */

/** Id del <a id="..."> del índice de cada sección (única fuente de verdad). */
const INDEX_ANCHOR_ID = {
  ley: "leyes-indice",
  heuristica: "heuristicas-indice",
};

/** Escapa texto para insertarlo de forma segura como HTML. */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Header + navegación, compartido por todas las páginas. */
function renderHeader(activePage) {
  const mount = document.querySelector("[data-component='site-header']");
  if (!mount) return;

  const links = [
    { href: "index.html", label: "Inicio", key: "home" },
    { href: "leyes-ux.html", label: "Leyes UX", key: "leyes" },
    { href: "heuristicas-nielsen.html", label: "Heurísticas de Nielsen", key: "heuristicas" },
  ];

  const navHtml = links
    .map((link) => {
      const isActive = link.key === activePage;
      return `<a href="${link.href}"${isActive ? ' aria-current="page"' : ""}>${escapeHtml(link.label)}</a>`;
    })
    .join("");

  mount.innerHTML = `
    <div class="site-header__inner">
      <a class="brand" href="index.html">
        <span class="brand__eyebrow">Evaluación UX</span>
        <span class="brand__name">${escapeHtml(PRODUCTO_EVALUADO.nombre)}</span>
      </a>
      <nav class="main-nav" aria-label="Navegación principal">
        ${navHtml}
      </nav>
    </div>
  `;
}

/** Footer, compartido por todas las páginas. */
function renderFooter() {
  const mount = document.querySelector("[data-component='site-footer']");
  if (!mount) return;
  mount.innerHTML = `
    <div class="page-shell">
      <span>Trabajo académico de Experiencia de Usuario.</span>
      <span>${LEYES_UX.length} leyes UX · ${HEURISTICAS_NIELSEN.length} heurísticas de Nielsen</span>
    </div>
  `;
}

/**
 * Si una imagen de evidencia no carga (ruta rota, archivo movido),
 * reemplaza el contenido del frame por un aviso claro en vez de dejar
 * el ícono de imagen rota del navegador, y deshabilita el click
 * (no tiene sentido abrir un lightbox vacío).
 */
function handleScreenshotError(imgEl) {
  const frame = imgEl.closest(".screenshot-frame");
  if (!frame) return;
  frame.classList.add("screenshot-frame--broken");
  frame.innerHTML = '<span class="placeholder-text">No se pudo cargar esta captura.</span>';
  if ("disabled" in frame) frame.disabled = true;
  frame.style.cursor = "default";
}

/**
 * Sección de capturas de una evaluación.
 * - Sin capturas y con nota de "sin evidencia" -> se muestra esa nota,
 *   tal como está en el análisis original (no se inventa una imagen).
 * - Sin capturas y sin nota -> placeholder neutro.
 * - Una o más capturas reales -> "stages" grandes, con proporción
 *   original intacta (object-fit: contain, sin recortar ni deformar),
 *   clickeables para ampliar en un lightbox.
 */
function renderScreenshotSection(capturas, sinEvidencia, altFallback) {
  if (capturas && capturas.length > 0) {
    const galleryClass = capturas.length > 1 ? "screenshot-gallery" : "";
    const items = capturas
      .map((cap) => {
        const alt = cap.alt || altFallback;
        return `
        <button
          type="button"
          class="screenshot-frame"
          data-lightbox-src="${escapeHtml(cap.src)}"
          data-lightbox-alt="${escapeHtml(alt)}"
          aria-label="Ampliar captura: ${escapeHtml(alt)}"
        >
          <img src="${escapeHtml(cap.src)}" alt="${escapeHtml(alt)}" loading="lazy" onerror="handleScreenshotError(this)" />
          <span class="screenshot-frame__hint" aria-hidden="true">🔍 Ampliar</span>
        </button>`;
      })
      .join("");
    return `<div class="${galleryClass}">${items}</div>`;
  }

  if (sinEvidencia) {
    return `
      <div class="placeholder-box" role="note">
        Sin captura: el análisis original indica "${escapeHtml(sinEvidencia)}"
      </div>
    `;
  }

  return `
    <div class="placeholder-box placeholder-box--tag" role="img" aria-label="Sin captura registrada para: ${escapeHtml(altFallback)}">
      Sin captura registrada en el análisis original
    </div>
  `;
}

/** Badge de estado para una Ley UX: Cumple / Rompe / Cumple parcialmente. */
function renderEstadoBadge(estado, size) {
  const icon = estado === "cumple" ? "✓" : estado === "rompe" ? "✕" : "±";
  const label = ESTADO_LABELS[estado] || estado;
  const sizeClass = size === "sm" ? " badge--sm" : "";
  return `
    <span class="badge badge--${escapeHtml(estado)}${sizeClass}">
      <span class="badge__icon" aria-hidden="true">${icon}</span>
      <span class="badge__label">${escapeHtml(label)}</span>
    </span>
  `;
}

/** Badge de severidad 0–4 para una heurística de Nielsen. */
function renderSeveridadBadge(nivel, size) {
  const label = SEVERIDAD_LABELS[nivel] || "Sin clasificar";
  const sizeClass = size === "sm" ? " severity--sm" : "";
  return `
    <span class="severity severity--${nivel}${sizeClass}">
      <span class="severity__value">${nivel}</span>
      <span class="severity__label">${escapeHtml(label)}</span>
    </span>
  `;
}

/** Fila de navegación anterior/siguiente, para el pie de cada tarjeta (solo flechas, sin nombre ni link al índice). */
function renderCardNav(kind, items, currentIndex) {
  const prev = items[currentIndex - 1];
  const next = items[currentIndex + 1];
  const prefix = kind === "ley" ? "ley" : "heuristica";

  const prevHtml = prev
    ? `<a class="card-nav__link card-nav__link--prev" href="#${prefix}-${prev.numero}">← Anterior</a>`
    : `<span class="card-nav__link card-nav__link--disabled">← Anterior</span>`;

  const nextHtml = next
    ? `<a class="card-nav__link card-nav__link--next" href="#${prefix}-${next.numero}">Siguiente →</a>`
    : `<span class="card-nav__link card-nav__link--disabled">Siguiente →</span>`;

  return `
    <div class="card-nav">
      ${prevHtml}
      ${nextHtml}
    </div>
  `;
}

/** Tarjeta de evaluación para una Ley UX. */
function renderLeyCard(ley, index, items) {
  return `
    <article class="eval-card" id="ley-${ley.numero}" data-index-id="ley-${ley.numero}">
      <div class="eval-card__main">
        <div class="eval-card__header">
          <div class="eval-card__title-group">
            <p class="eval-card__number">Ley UX N.º ${ley.numero}</p>
            <h2 class="eval-card__title">${escapeHtml(ley.nombre)}</h2>
          </div>
          ${renderEstadoBadge(ley.estado)}
        </div>
        <div class="eval-card__body">
          <h3>Explicación / análisis</h3>
          <p>${escapeHtml(ley.descripcion)}</p>
        </div>
      </div>
      <div class="eval-card__media">
        <h3>Captura de pantalla</h3>
        ${renderScreenshotSection(ley.capturas, ley.sinEvidencia, ley.nombre)}
      </div>
      ${renderCardNav("ley", items, index)}
    </article>
  `;
}

/** Tarjeta de evaluación para una heurística de Nielsen. */
function renderHeuristicaCard(h, index, items) {
  const impactoHtml = h.impacto
    ? `<p>${escapeHtml(h.impacto)}</p>`
    : `<p class="placeholder-text">No incluido en el análisis original (el Excel de trabajo no registra este campo).</p>`;

  return `
    <article class="eval-card" id="heuristica-${h.numero}" data-index-id="heuristica-${h.numero}">
      <div class="eval-card__main">
        <div class="eval-card__header">
          <div class="eval-card__title-group">
            <p class="eval-card__number">Heurística N.º ${h.numero}</p>
            <h2 class="eval-card__title">
              <span class="eval-card__monogram">H${h.numero}</span>
              ${escapeHtml(h.nombre)}
            </h2>
          </div>
          ${renderSeveridadBadge(h.severidad)}
        </div>
        <div class="eval-card__body">
          <h3>Explicación</h3>
          <p>${escapeHtml(h.explicacion)}</p>
        </div>
        <div class="eval-card__body impact">
          <h3>Impacto en la persona usuaria</h3>
          ${impactoHtml}
        </div>
      </div>
      <div class="eval-card__media">
        <h3>Captura de pantalla</h3>
        ${renderScreenshotSection(h.capturas, h.sinEvidencia, h.nombre)}
      </div>
      ${renderCardNav("heuristica", items, index)}
    </article>
  `;
}

/** Leyenda de estados (Cumple / Rompe / Cumple parcialmente). */
function renderEstadoLegend(mount) {
  mount.innerHTML = `
    <span class="legend__item"><span class="legend__swatch" style="background:var(--color-cumple)"></span>Cumple</span>
    <span class="legend__item"><span class="legend__swatch" style="background:var(--color-rompe)"></span>Rompe</span>
    <span class="legend__item"><span class="legend__swatch" style="background:var(--color-parcial)"></span>Cumple parcialmente</span>
  `;
}

/** Leyenda de la escala de severidad 0–4. */
function renderSeveridadLegend(mount) {
  mount.innerHTML = Object.entries(SEVERIDAD_LABELS)
    .map(
      ([nivel, label]) => `
      <span class="legend__item">
        <span class="legend__swatch" style="background:var(--sev-${nivel})"></span>
        ${nivel} — ${escapeHtml(label)}
      </span>`
    )
    .join("");
}

/**
 * Índice lateral (o superior en mobile) con todas las leyes/heurísticas,
 * su número y un indicador visual compacto de estado/severidad, para
 * que se puedan identificar y recorrer de un vistazo.
 */
function renderIndex(mount, kind, items) {
  if (!mount) return;
  const prefix = kind === "ley" ? "ley" : "heuristica";
  const title = kind === "ley" ? "Leyes evaluadas" : "Heurísticas evaluadas";

  const rows = items
    .map((item) => {
      const numLabel = kind === "ley" ? String(item.numero).padStart(2, "0") : `H${item.numero}`;
      const indicator =
        kind === "ley" ? renderEstadoBadge(item.estado, "sm") : renderSeveridadBadge(item.severidad, "sm");
      const statusText =
        kind === "ley" ? ESTADO_LABELS[item.estado] || item.estado : `Severidad ${item.severidad} — ${SEVERIDAD_LABELS[item.severidad] || ""}`;
      return `
        <li>
          <a
            href="#${prefix}-${item.numero}"
            data-index-link="${prefix}-${item.numero}"
            aria-label="${numLabel} — ${escapeHtml(item.nombre)} — ${escapeHtml(statusText)}"
          >
            <span class="eval-index__num">${numLabel}</span>
            <span class="eval-index__name">${escapeHtml(item.nombre)}</span>
            ${indicator}
          </a>
        </li>
      `;
    })
    .join("");

  mount.innerHTML = `
    <p class="eval-index__title" id="${INDEX_ANCHOR_ID[kind]}">${title}</p>
    <ol class="eval-index__list">${rows}</ol>
  `;
}

/**
 * Activa el resaltado del ítem del índice correspondiente a la
 * tarjeta visible mientras se recorre la página (scrollspy liviano,
 * sin dependencias externas).
 */
function initScrollSpy(cardSelector) {
  const cards = document.querySelectorAll(cardSelector);
  const links = document.querySelectorAll("[data-index-link]");
  if (!cards.length || !links.length || typeof IntersectionObserver === "undefined") return;

  const linkFor = (id) => document.querySelector(`[data-index-link="${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("data-index-id");
        const link = linkFor(id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
  );

  cards.forEach((card) => observer.observe(card));
}

/**
 * Lightbox compartido: una sola instancia por página que amplía la
 * captura clickeada. Se puede cerrar con el botón ×, clickeando fuera
 * de la imagen, o con la tecla Escape; al cerrar devuelve el foco al
 * disparador para no perder el lugar en el teclado.
 */
let lightboxLastTrigger = null;

function ensureLightbox() {
  let box = document.querySelector(".lightbox");
  if (box) return box;

  box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Captura ampliada");
  box.innerHTML = `
    <figure class="lightbox__figure">
      <button type="button" class="lightbox__close" aria-label="Cerrar (Esc)">×</button>
      <img class="lightbox__img" src="" alt="" />
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
  `;
  document.body.appendChild(box);

  box.addEventListener("click", (event) => {
    if (event.target === box) closeLightbox();
  });
  box.querySelector(".lightbox__close").addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !box.hidden) closeLightbox();
  });

  return box;
}

function openLightbox(src, alt, triggerEl) {
  const box = ensureLightbox();
  const img = box.querySelector(".lightbox__img");
  const caption = box.querySelector(".lightbox__caption");
  img.src = src;
  img.alt = alt || "";
  caption.textContent = alt || "";
  box.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxLastTrigger = triggerEl || null;
  box.querySelector(".lightbox__close").focus();
}

function closeLightbox() {
  const box = document.querySelector(".lightbox");
  if (!box) return;
  box.hidden = true;
  document.body.classList.remove("lightbox-open");
  if (lightboxLastTrigger && typeof lightboxLastTrigger.focus === "function") {
    lightboxLastTrigger.focus();
  }
  lightboxLastTrigger = null;
}

/** Delega el click de cualquier captura (leyes o heurísticas) al lightbox. */
function initLightboxTriggers() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox-src]");
    if (!trigger || trigger.disabled) return;
    openLightbox(trigger.getAttribute("data-lightbox-src"), trigger.getAttribute("data-lightbox-alt"), trigger);
  });
}

/** Arma la grilla de tarjetas de Leyes UX + su índice navegable. */
function renderLeyesUXPage() {
  const grid = document.querySelector("[data-component='leyes-grid']");
  if (!grid) return;
  grid.innerHTML = LEYES_UX.map((ley, i) => renderLeyCard(ley, i, LEYES_UX)).join("");

  const legend = document.querySelector("[data-component='estado-legend']");
  if (legend) renderEstadoLegend(legend);

  const count = document.querySelector("[data-component='leyes-count']");
  if (count) count.textContent = LEYES_UX.length;

  const index = document.querySelector("[data-component='leyes-index']");
  renderIndex(index, "ley", LEYES_UX);

  initScrollSpy("[data-component='leyes-grid'] .eval-card");
  initLightboxTriggers();
}

/** Arma la grilla de tarjetas de Heurísticas de Nielsen + su índice navegable. */
function renderHeuristicasPage() {
  const grid = document.querySelector("[data-component='heuristicas-grid']");
  if (!grid) return;
  grid.innerHTML = HEURISTICAS_NIELSEN.map((h, i) => renderHeuristicaCard(h, i, HEURISTICAS_NIELSEN)).join("");

  const legend = document.querySelector("[data-component='severidad-legend']");
  if (legend) renderSeveridadLegend(legend);

  const count = document.querySelector("[data-component='heuristicas-count']");
  if (count) count.textContent = HEURISTICAS_NIELSEN.length;

  const index = document.querySelector("[data-component='heuristicas-index']");
  renderIndex(index, "heuristica", HEURISTICAS_NIELSEN);

  initScrollSpy("[data-component='heuristicas-grid'] .eval-card");
  initLightboxTriggers();
}

/** Completa los datos del producto en la home. */
function renderHomePage() {
  const nombreMount = document.querySelector("[data-component='producto-nombre']");
  if (nombreMount) nombreMount.textContent = PRODUCTO_EVALUADO.nombre;

  const descMount = document.querySelector("[data-component='producto-descripcion']");
  if (descMount) descMount.textContent = PRODUCTO_EVALUADO.descripcion;

  const leyesCount = document.querySelector("[data-component='home-leyes-count']");
  if (leyesCount) leyesCount.textContent = LEYES_UX.length;

  const heuristicasCount = document.querySelector("[data-component='home-heuristicas-count']");
  if (heuristicasCount) heuristicasCount.textContent = HEURISTICAS_NIELSEN.length;
}
