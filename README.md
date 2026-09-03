# udesavsh — Evaluación UX

Mini-web estática (sin backend) que documenta una evaluación de UX real
sobre una plataforma de autogestión académica, organizada en dos tableros:

- **Leyes UX** (`leyes-ux.html`) — 14 leyes/efectos de UX evaluados.
- **Heurísticas de Nielsen** (`heuristicas-nielsen.html`) — las 10
  heurísticas de usabilidad, con severidad 0–4.

## Estructura

```
index.html                 Página de inicio
leyes-ux.html               Tablero de Leyes UX
heuristicas-nielsen.html    Tablero de Heurísticas de Nielsen
assets/
  css/styles.css            Sistema de diseño (un solo archivo)
  js/data.js                 Contenido de ambas evaluaciones
  js/render.js                Componentes reutilizables (tarjetas, badges, leyendas)
  img/                        Capturas de pantalla (pendiente de completar)
```

No hay build step: es HTML/CSS/JS plano. Para verla, abrir `index.html`
en el navegador o servir la carpeta con cualquier servidor estático
(por ejemplo `python3 -m http.server`).

## Contenido pendiente

- `PRODUCTO_EVALUADO.nombre` en `assets/js/data.js`: confirmar el nombre
  exacto del producto evaluado.
- Capturas de pantalla: hoy cada tarjeta muestra un placeholder
  ("Captura pendiente de extracción / carga"). Hay que extraer las
  imágenes reales (hoy incrustadas dentro de los PDF de análisis) y
  cargarlas en `assets/img/`, referenciándolas desde `data.js`.
- Campo `impacto` de cada heurística de Nielsen: no existía en el
  Excel/PDF original, está marcado como PLACEHOLDER en `data.js`.
