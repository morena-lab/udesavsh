/**
 * data.js
 * ------------------------------------------------------------------
 * Fuente única de contenido para las dos evaluaciones.
 *
 * El texto de "descripcion" / "explicacion" y los estados de
 * cumplimiento / severidad provienen tal cual de los PDFs de análisis
 * (Leyes_de_UX.pdf y Heuristicas_de_Nielsen.pdf) que exportan el
 * Excel de trabajo. No se inventó ni completó ningún juicio de UX.
 *
 * Los campos marcados explícitamente como PLACEHOLDER no existían en
 * la fuente y deben completarse a mano (ej: capturas como archivos de
 * imagen reales, o el campo "impacto" de cada heurística, que el
 * Excel original no incluía).
 * ------------------------------------------------------------------
 */

const PRODUCTO_EVALUADO = {
  // PLACEHOLDER: confirmar el nombre exacto/oficial del producto.
  nombre: "[PLACEHOLDER — Nombre del producto evaluado]",
  descripcion:
    "Evaluación heurística y de leyes de UX realizada sobre la plataforma " +
    "de autogestión académica utilizada por estudiantes. El análisis " +
    "documenta, a partir de capturas reales de la interfaz, qué principios " +
    "de usabilidad se cumplen y cuáles no.",
};

/**
 * Estado posible para una Ley UX: "cumple" | "rompe" | "parcial"
 * ("parcial" se usa para el único caso de "Semi-Cumple" del análisis
 * original — Umbral de Doherty).
 */
const LEYES_UX = [
  {
    numero: 1,
    nombre: "Ley de Fits",
    estado: "cumple",
    descripcion:
      "Los botones están cerca uno de otro y con tamaño adecuado, aunque " +
      "algunos elementos podrían destacarse más.",
    captura: null,
  },
  {
    numero: 2,
    nombre: "Efecto Von Restorff",
    estado: "rompe",
    descripcion:
      "Ningún elemento se diferencia del resto, aunque haya una jerarquía " +
      "de relevancia clara. El promedio o las notas de los finales son " +
      "mucho más importantes que otras notas.",
    captura: null,
  },
  {
    numero: 3,
    nombre: "Efecto Estética-Usabilidad",
    estado: "rompe",
    descripcion:
      "El diseño de esta página es poco estético / \"lindo\" y esto no " +
      "ayuda a mejorar su usabilidad.",
    captura: null,
  },
  {
    numero: 4,
    nombre: "Ley de Hick",
    estado: "rompe",
    descripcion:
      "Hay demasiadas opciones y secciones visibles al mismo tiempo, por " +
      "lo que cuesta decidir rápidamente dónde entrar para realizar una " +
      "tarea.",
    captura: null,
  },
  {
    numero: 5,
    nombre: "Ley de Miller",
    estado: "rompe",
    descripcion:
      "Se muestra mucha información a la vez y no siempre está bien " +
      "agrupada.",
    captura: null,
  },
  {
    numero: 6,
    nombre: "Navaja de Occam",
    estado: "rompe",
    descripcion:
      "Hay secciones, textos o botones que podrían eliminarse sin perder " +
      "funcionalidad.",
    captura: null,
  },
  {
    numero: 7,
    nombre: "Ley de Tesler",
    estado: "rompe",
    descripcion:
      "La complejidad del proceso está muy cargada sobre el usuario. La " +
      "persona tiene que interpretar una tabla extensa con muchas " +
      "columnas (Período, Curso, Agenda, Docentes, Curso activo, " +
      "Recursando, Baja...) y además comprender por su cuenta cuál es la " +
      "cursada correcta, qué grupo le corresponde y cómo modificar su " +
      "inscripción.",
    captura: null,
  },
  {
    numero: 8,
    nombre: "Regla Peak-End",
    estado: "rompe",
    descripcion:
      "Las pantallas de confirmación, error y éxito son poco emocionantes " +
      "y bastante simples. De hecho, en esa pantalla de confirmación al " +
      "cerrar sesión, ni siquiera se entiende la pregunta.",
    captura: null,
  },
  {
    numero: 9,
    nombre: "Efecto Zeigarnik",
    estado: "rompe",
    descripcion:
      "No hay recordatorios claros de tareas pendientes o procesos " +
      "incompletos que ayuden a recordar qué falta hacer y faciliten " +
      "retomarlo.",
    captura: null,
    sinEvidencia: "No hay evidencia ya que no lo cumple.",
  },
  {
    numero: 10,
    nombre: "Efecto Gradiente de Meta",
    estado: "rompe",
    descripcion:
      "No se muestra en un lugar intuitivo cuánto falta para terminar un " +
      "proceso ni qué es lo que falta concretamente.",
    captura: null,
  },
  {
    numero: 11,
    nombre: "Ley de Jakob",
    estado: "cumple",
    descripcion:
      "Usa íconos similares a la vida real o patrones que la gente ya ha " +
      "usado.",
    captura: null,
  },
  {
    numero: 12,
    nombre: "Ley de Postel",
    estado: "rompe",
    descripcion:
      "Los formularios permiten casi en su totalidad solo respuestas " +
      "predeterminadas.",
    captura: null,
  },
  {
    numero: 13,
    nombre: "Umbral de Doherty",
    estado: "parcial",
    descripcion:
      "Al entrar a algunas secciones se muestra una barra de carga, en la " +
      "minoría.",
    captura: null,
  },
  {
    numero: 14,
    nombre: "Principio de Pareto",
    estado: "rompe",
    descripcion:
      "Funciones frecuentes como Clases, Inscripciones o Notas no tienen " +
      "una jerarquía claramente superior a opciones menos frecuentes como " +
      "Suscripción, Condiciones o +Udesa.",
    captura: null,
  },
];

/**
 * Severidad 0–4 según la escala definida:
 * 0 Sin problema · 1 Cosmético · 2 Menor · 3 Mayor · 4 Catástrofe de usabilidad
 *
 * "impacto" no existía en el Excel/PDF original: queda como PLACEHOLDER
 * explícito hasta que se redacte con la información real.
 */
const HEURISTICAS_NIELSEN = [
  {
    numero: 1,
    nombre: "Visibilidad del estado del sistema",
    severidad: 3,
    explicacion:
      "Esta es la pestaña para cambiar las inscripciones. No te muestra " +
      "ninguna confirmación de haber cambiado una clase ni los pasos para " +
      "lograrlo. Es más, al tocar el botón de \"Confirmar modificaciones a " +
      "la inscripción\" es posible que no haya más cupos y no puedas " +
      "finalizar la acción.",
    impacto: null,
    captura: null,
  },
  {
    numero: 2,
    nombre: "Correspondencia entre el sistema y el mundo real",
    severidad: 0,
    explicacion:
      "A través de esos íconos del mundo real, el usuario puede entender " +
      "ciertos botones o secciones sin leer el título.",
    impacto: null,
    captura: null,
  },
  {
    numero: 3,
    nombre: "Control y libertad del usuario",
    severidad: 0,
    explicacion: "La navegación permite volver a otras secciones o terminar procesos.",
    impacto: null,
    captura: null,
  },
  {
    numero: 4,
    nombre: "Consistencia y estándares",
    severidad: 0,
    explicacion:
      "Cumple con el estándar general de que el usuario se ubique en el " +
      "borde superior derecho y que el menú desplegable esté en vertical a " +
      "la izquierda.",
    impacto: null,
    captura: null,
  },
  {
    numero: 5,
    nombre: "Prevención de errores",
    severidad: 2,
    explicacion:
      "Al iniciar sesión, no tiene un mensaje claro de qué requisitos " +
      "tiene la contraseña para evitar que el usuario escriba una " +
      "incorrecta. Alguna pista de este estilo podría ser que se necesita " +
      "algún número o cierta cantidad de caracteres.",
    impacto: null,
    captura: null,
  },
  {
    numero: 6,
    nombre: "Reconocimiento antes que recuerdo",
    severidad: 2,
    explicacion:
      "El reconocimiento no es tan rápido, por lo que en la mayoría de " +
      "los casos se acude a la memoria. A pesar de que la mayoría de los " +
      "íconos son de fácil reconocimiento, algunos procesos como las " +
      "inscripciones necesitan de un tutorial. Por ejemplo, a la hora de " +
      "buscar el legajo, uno esperaría que se encuentre en la sección " +
      "legajo, pero en realidad forma parte de un subtítulo de datos " +
      "académicos.",
    impacto: null,
    captura: null,
  },
  {
    numero: 7,
    nombre: "Flexibilidad y eficiencia de uso",
    severidad: 1,
    explicacion:
      "Ninguna tarea tiene accesos rápidos ni atajos. Tanto las personas " +
      "nuevas como las habituales deben recorrer prácticamente los mismos " +
      "pasos.",
    impacto: null,
    captura: null,
    sinEvidencia: "No hay evidencia ya que no existen dichos atajos.",
  },
  {
    numero: 8,
    nombre: "Diseño estético y minimalista",
    severidad: 4,
    explicacion:
      "Hay exceso de información y una jerarquía visual débil. Esto " +
      "dificulta encontrar rápido lo importante y vuelve la interfaz más " +
      "pesada.",
    impacto: null,
    captura: null,
  },
  {
    numero: 9,
    nombre: "Ayudar a reconocer, diagnosticar y recuperarse de los errores",
    severidad: 3,
    explicacion:
      "Cualquiera sea el error de autenticación al iniciar sesión, el " +
      "mensaje es el mismo. No especifica si el error está en el usuario " +
      "o en la contraseña, lo cual no ayuda al usuario a resolver su " +
      "problema.",
    impacto: null,
    captura: null,
  },
  {
    numero: 10,
    nombre: "Ayuda y documentación",
    severidad: 3,
    explicacion:
      "La plataforma no tiene una sección de ayuda o instrucciones que " +
      "orienten al usuario cuando no sabe cómo realizar una acción. Lo " +
      "único que hay es un tutorial para las inscripciones que llega por " +
      "mail.",
    impacto: null,
    captura: null,
    sinEvidencia: "No hay evidencia porque no cuenta con sección de ayuda.",
  },
];

const SEVERIDAD_LABELS = {
  0: "Sin problema",
  1: "Cosmético",
  2: "Menor",
  3: "Mayor",
  4: "Catástrofe de usabilidad",
};

const ESTADO_LABELS = {
  cumple: "Cumple",
  rompe: "Rompe",
  parcial: "Cumple parcialmente",
};
