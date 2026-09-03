/**
 * render.js
 * ------------------------------------------------------------------
 * Componentes reutilizables para construir el "documento navegable"
 * a partir de los datos en data.js. No hay backend ni build step:
 * este script corre en el navegador y arma el DOM directamente.
 * ------------------------------------------------------------------
 */

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
        ${escapeHtml(PRODUCTO_EVALUADO.nombre)}
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

/** Caja de placeholder para una captura de pantalla faltante. */
function renderScreenshot(captura, altFallback) {
  if (captura && captura.src) {
    return `
      <div class="screenshot-frame">
        <img src="${escapeHtml(captura.src)}" alt="${escapeHtml(captura.alt || altFallback)}" loading="lazy" />
      </div>
    `;
  }
  return `
    <div class="placeholder-box placeholder-box--tag" role="img" aria-label="Captura de pantalla pendiente para: ${escapeHtml(altFallback)}">
      Captura pendiente de extracción / carga
    </div>
  `;
}

/** Badge de estado para una Ley UX: Cumple / Rompe / Cumple parcialmente. */
function renderEstadoBadge(estado) {
  const icon = estado === "cumple" ? "✓" : estado === "rompe" ? "✕" : "±";
  const label = ESTADO_LABELS[estado] || estado;
  return `
    <span class="badge badge--${escapeHtml(estado)}">
      <span class="badge__icon" aria-hidden="true">${icon}</span>
      ${escapeHtml(label)}
    </span>
  `;
}

/** Badge de severidad 0–4 para una heurística de Nielsen. */
function renderSeveridadBadge(nivel) {
  const label = SEVERIDAD_LABELS[nivel] || "Sin clasificar";
  return `
    <span class="severity severity--${nivel}">
      <span class="severity__value">${nivel}</span>
      <span class="severity__label">${escapeHtml(label)}</span>
    </span>
  `;
}

/** Tarjeta de evaluación para una Ley UX. */
function renderLeyCard(ley) {
  const evidenciaExtra = ley.sinEvidencia
    ? `<p class="placeholder-text">${escapeHtml(ley.sinEvidencia)}</p>`
    : "";

  return `
    <article class="eval-card">
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
          ${evidenciaExtra}
        </div>
      </div>
      <div class="eval-card__media">
        <h3>Captura de pantalla</h3>
        ${renderScreenshot(ley.captura, ley.nombre)}
      </div>
    </article>
  `;
}

/** Tarjeta de evaluación para una heurística de Nielsen. */
function renderHeuristicaCard(h) {
  const evidenciaExtra = h.sinEvidencia
    ? `<p class="placeholder-text">${escapeHtml(h.sinEvidencia)}</p>`
    : "";

  const impactoHtml = h.impacto
    ? `<p>${escapeHtml(h.impacto)}</p>`
    : `<p class="placeholder-text">PLACEHOLDER — completar impacto en la persona usuaria.</p>`;

  return `
    <article class="eval-card">
      <div class="eval-card__main">
        <div class="eval-card__header">
          <div class="eval-card__title-group">
            <p class="eval-card__number">Heurística N.º ${h.numero}</p>
            <h2 class="eval-card__title">${escapeHtml(h.nombre)}</h2>
          </div>
          ${renderSeveridadBadge(h.severidad)}
        </div>
        <div class="eval-card__body">
          <h3>Explicación</h3>
          <p>${escapeHtml(h.explicacion)}</p>
          ${evidenciaExtra}
        </div>
        <div class="eval-card__body impact">
          <h3>Impacto en la persona usuaria</h3>
          ${impactoHtml}
        </div>
      </div>
      <div class="eval-card__media">
        <h3>Captura de pantalla</h3>
        ${renderScreenshot(h.captura, h.nombre)}
      </div>
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

/** Arma la grilla de tarjetas de Leyes UX. */
function renderLeyesUXPage() {
  const grid = document.querySelector("[data-component='leyes-grid']");
  if (!grid) return;
  grid.innerHTML = LEYES_UX.map(renderLeyCard).join("");

  const legend = document.querySelector("[data-component='estado-legend']");
  if (legend) renderEstadoLegend(legend);

  const count = document.querySelector("[data-component='leyes-count']");
  if (count) count.textContent = LEYES_UX.length;
}

/** Arma la grilla de tarjetas de Heurísticas de Nielsen. */
function renderHeuristicasPage() {
  const grid = document.querySelector("[data-component='heuristicas-grid']");
  if (!grid) return;
  grid.innerHTML = HEURISTICAS_NIELSEN.map(renderHeuristicaCard).join("");

  const legend = document.querySelector("[data-component='severidad-legend']");
  if (legend) renderSeveridadLegend(legend);

  const count = document.querySelector("[data-component='heuristicas-count']");
  if (count) count.textContent = HEURISTICAS_NIELSEN.length;
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
