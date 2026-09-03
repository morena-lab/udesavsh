# udesavsh — Evaluación UX

Mini-web estática (sin backend) que documenta una evaluación de UX real
sobre la plataforma de autogestión académica de la Universidad de San
Andrés (gestion.udesa.edu.ar), organizada en dos tableros:

- **Leyes UX** (`leyes-ux.html`) — 14 leyes/efectos de UX evaluados.
- **Heurísticas de Nielsen** (`heuristicas-nielsen.html`) — las 10
  heurísticas de usabilidad, con severidad 0–4.

Todo el contenido (nombres, estados, severidades, explicaciones y
capturas de pantalla) proviene del análisis real hecho por el equipo
(exportado originalmente a los PDF `Leyes_de_UX.pdf` y
`Heuristicas_de_Nielsen.pdf`). Las capturas se extrajeron de las
imágenes incrustadas en esos PDF y se verificaron una por una contra
el texto de cada fila antes de asociarlas.

## Estructura

```
index.html                 Página de inicio
leyes-ux.html               Tablero de Leyes UX
heuristicas-nielsen.html    Tablero de Heurísticas de Nielsen
assets/
  css/styles.css            Sistema de diseño (un solo archivo)
  js/data.js                 Contenido de ambas evaluaciones
  js/render.js                Componentes reutilizables (tarjetas, badges, leyendas, galería de capturas)
  img/                        Capturas reales extraídas del análisis
```

No hay build step: es HTML/CSS/JS plano. Para verla, abrir `index.html`
en el navegador o servir la carpeta con cualquier servidor estático
(por ejemplo `python3 -m http.server`).

## Datos que el análisis original no incluye

- **Campo "impacto en la persona usuaria"** de cada heurística de
  Nielsen: no existía en el Excel/PDF original. La interfaz lo declara
  explícitamente como "No incluido en el análisis original" en vez de
  inventarlo.
- **3 evaluaciones sin captura**, tal como están en el análisis
  original (el propio documento dice "no hay evidencia"): Efecto
  Zeigarnik (Leyes UX), Flexibilidad y eficiencia de uso y Ayuda y
  documentación (Heurísticas de Nielsen). La web muestra la nota
  original en vez de una imagen.
