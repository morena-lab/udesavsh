/**
 * data.js
 * ------------------------------------------------------------------
 * Fuente única de contenido para las dos evaluaciones.
 *
 * El texto de "descripcion" / "explicacion", los estados de
 * cumplimiento / severidad y las capturas de pantalla provienen del
 * análisis real (Google Sheets exportado a los PDF "Leyes_de_UX.pdf"
 * y "Heuristicas_de_Nielsen.pdf"). No se inventó, completó ni
 * "mejoró" ningún juicio de UX: el texto es el mismo, solo se
 * hicieron ajustes mínimos de formato para que se lea bien en la web.
 *
 * Las capturas fueron extraídas directamente de las imágenes
 * incrustadas en esos PDF (no son capturas genéricas de internet) y
 * asociadas a cada evaluación verificando visualmente su contenido
 * contra el texto de la fila correspondiente. Cuando una evaluación
 * no tenía captura en el análisis original (el propio documento dice
 * "no hay evidencia"), el campo queda vacío ([]) — no se inventó
 * ninguna.
 *
 * El campo "impacto" de las heurísticas de Nielsen no existe en el
 * Excel/PDF original: se deja explícitamente en null y la interfaz
 * lo señala como dato no incluido en el análisis, en vez de
 * inventarlo.
 * ------------------------------------------------------------------
 */

const PRODUCTO_EVALUADO = {
  // Confirmado a partir de una de las propias capturas del análisis
  // (barra de direcciones visible en la evidencia de "Umbral de
  // Doherty"): el dominio real de la plataforma es gestion.udesa.edu.ar.
  nombre: "Plataforma de Gestión de Alumnos — Universidad de San Andrés",
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
 *
 * "capturas" es un array de { src, alt } — puede tener 0, 1 o varias
 * imágenes, según cuántas se hayan usado como evidencia en el Excel
 * original para esa ley.
 */
const LEYES_UX = [
  {
    numero: 1,
    nombre: "Ley de Fits",
    estado: "cumple",
    descripcion:
      "Los botones están cerca uno de otro y con tamaño adecuado, aunque " +
      "algunos elementos podrían destacarse más.",
    capturas: [
      { src: "assets/img/u01-fits-a-login.png", alt: "Formulario de inicio de sesión con botones agrupados" },
      { src: "assets/img/u01-fits-b-menu.png", alt: "Menú lateral con sección Cursos expandida" },
    ],
  },
  {
    numero: 2,
    nombre: "Efecto Von Restorff",
    estado: "rompe",
    descripcion:
      "Ningún elemento se diferencia del resto, aunque haya una jerarquía " +
      "de relevancia clara. El promedio o las notas de los finales son " +
      "mucho más importantes que otras notas.",
    capturas: [
      { src: "assets/img/u02-von-restorff.png", alt: "Tabla de notas donde todas las filas tienen el mismo peso visual" },
    ],
  },
  {
    numero: 3,
    nombre: "Efecto Estética-Usabilidad",
    estado: "rompe",
    descripcion:
      "El diseño de esta página es poco estético / \"lindo\" y esto no " +
      "ayuda a mejorar su usabilidad.",
    capturas: [
      { src: "assets/img/u03-estetica-usabilidad.png", alt: "Pantalla de Iniciar trámite/consulta, con diseño básico" },
    ],
  },
  {
    numero: 4,
    nombre: "Ley de Hick",
    estado: "rompe",
    descripcion:
      "Hay demasiadas opciones y secciones visibles al mismo tiempo, por " +
      "lo que cuesta decidir rápidamente dónde entrar para realizar una " +
      "tarea.",
    capturas: [
      { src: "assets/img/u04-hick.png", alt: "Menú lateral completo con todas las secciones expandidas" },
    ],
  },
  {
    numero: 5,
    nombre: "Ley de Miller",
    estado: "rompe",
    descripcion:
      "Se muestra mucha información a la vez y no siempre está bien " +
      "agrupada.",
    capturas: [
      { src: "assets/img/u05-miller.png", alt: "Agenda semanal con múltiples bloques de clases" },
    ],
  },
  {
    numero: 6,
    nombre: "Navaja de Occam",
    estado: "rompe",
    descripcion:
      "Hay secciones, textos o botones que podrían eliminarse sin perder " +
      "funcionalidad.",
    capturas: [
      { src: "assets/img/u06-occam-a-cards.png", alt: "Tarjetas redundantes de Admisión y Alumno" },
      { src: "assets/img/u06-occam-b-links.png", alt: "Panel de links (Biblioteca, Campus Virtual, Tesorería)" },
    ],
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
    capturas: [
      { src: "assets/img/u07-tesler.png", alt: "Tabla de inscripciones con muchas columnas" },
    ],
  },
  {
    numero: 8,
    nombre: "Regla Peak-End",
    estado: "rompe",
    descripcion:
      "Las pantallas de confirmación, error y éxito son poco emocionantes " +
      "y bastante simples. De hecho, en esa pantalla de confirmación al " +
      "cerrar sesión, ni siquiera se entiende la pregunta.",
    capturas: [
      { src: "assets/img/u08-peak-end-a-confirmacion.png", alt: "Mensaje \"Has iniciado sesión satisfactoriamente\"" },
      { src: "assets/img/u08-peak-end-b-seguro.png", alt: "Diálogo de confirmación \"¿Está seguro?\"" },
    ],
  },
  {
    numero: 9,
    nombre: "Efecto Zeigarnik",
    estado: "rompe",
    descripcion:
      "No hay recordatorios claros de tareas pendientes o procesos " +
      "incompletos que ayuden a recordar qué falta hacer y faciliten " +
      "retomarlo.",
    capturas: [],
    sinEvidencia: "No hay evidencia ya que no lo cumple.",
  },
  {
    numero: 10,
    nombre: "Efecto Gradiente de Meta",
    estado: "rompe",
    descripcion:
      "No se muestra en un lugar intuitivo cuánto falta para terminar un " +
      "proceso ni qué es lo que falta concretamente.",
    capturas: [
      { src: "assets/img/u10-gradiente-meta.png", alt: "Listado de solicitudes con barra de progreso" },
    ],
  },
  {
    numero: 11,
    nombre: "Ley de Jakob",
    estado: "cumple",
    descripcion:
      "Usa íconos similares a la vida real o patrones que la gente ya ha " +
      "usado.",
    capturas: [
      { src: "assets/img/u11-jakob.png", alt: "Pantalla de bienvenida con íconos convencionales" },
    ],
  },
  {
    numero: 12,
    nombre: "Ley de Postel",
    estado: "rompe",
    descripcion:
      "Los formularios permiten casi en su totalidad solo respuestas " +
      "predeterminadas.",
    capturas: [
      { src: "assets/img/u12-postel.png", alt: "Formulario de trámite con solo opciones desplegables predeterminadas" },
    ],
  },
  {
    numero: 13,
    nombre: "Umbral de Doherty",
    estado: "parcial",
    descripcion:
      "Al entrar a algunas secciones se muestra una barra de carga, en la " +
      "minoría.",
    capturas: [
      { src: "assets/img/u13-doherty.png", alt: "Barra de carga al 88% en el navegador" },
    ],
  },
  {
    numero: 14,
    nombre: "Principio de Pareto",
    estado: "rompe",
    descripcion:
      "Funciones frecuentes como Clases, Inscripciones o Notas no tienen " +
      "una jerarquía claramente superior a opciones menos frecuentes como " +
      "Suscripción, Condiciones o +Udesa.",
    capturas: [
      { src: "assets/img/u14-pareto.png", alt: "Menú lateral sin jerarquía entre opciones frecuentes y poco frecuentes" },
    ],
  },
];

/**
 * Severidad 0–4 según la escala definida:
 * 0 Sin problema · 1 Cosmético · 2 Menor · 3 Mayor · 4 Catástrofe de usabilidad
 *
 * "impacto" no existía en el Excel/PDF original: se deja en null a
 * propósito (ver nota al inicio del archivo) y la interfaz debe
 * mostrar que el dato no fue incluido en el análisis, no inventarlo.
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
    capturas: [
      { src: "assets/img/n01-visibilidad.png", alt: "Pantalla de modificación de inscripción sin confirmación" },
    ],
  },
  {
    numero: 2,
    nombre: "Correspondencia entre el sistema y el mundo real",
    severidad: 0,
    explicacion:
      "A través de esos íconos del mundo real, el usuario puede entender " +
      "ciertos botones o secciones sin leer el título.",
    impacto: null,
    capturas: [
      { src: "assets/img/n02-correspondencia-e-completa.png", alt: "Portal con menú de íconos y usuario logueado" },
      { src: "assets/img/n02-correspondencia-d-menu.png", alt: "Menú lateral con íconos reconocibles" },
      { src: "assets/img/n02-correspondencia-a-alerta.png", alt: "Aviso \"You are already signed in\"" },
      { src: "assets/img/n02-correspondencia-b-mensajes.png", alt: "Ícono de mensajes" },
      { src: "assets/img/n02-correspondencia-c-usuario.png", alt: "Badge de usuario \"Sofía Heine\"" },
    ],
  },
  {
    numero: 3,
    nombre: "Control y libertad del usuario",
    severidad: 0,
    explicacion: "La navegación permite volver a otras secciones o terminar procesos.",
    impacto: null,
    capturas: [
      { src: "assets/img/n03-control-libertad-a-volver.png", alt: "Botón \"Cambiar de sección\"" },
      { src: "assets/img/n03-control-libertad-b-pago.png", alt: "Modal de pago online con opción de cerrar" },
    ],
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
    capturas: [
      { src: "assets/img/n04-consistencia.png", alt: "Portal con usuario arriba a la derecha y menú vertical a la izquierda" },
    ],
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
    capturas: [
      { src: "assets/img/n05-prevencion-errores.png", alt: "Formulario de login sin requisitos de contraseña visibles" },
    ],
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
    capturas: [
      { src: "assets/img/n06-reconocimiento.png", alt: "Pestaña de Datos Académicos donde se encuentra el legajo" },
    ],
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
    capturas: [],
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
    capturas: [
      { src: "assets/img/n08-diseno-estetico.png", alt: "Calendario semanal con muchos bloques de clases superpuestos" },
    ],
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
    capturas: [
      { src: "assets/img/n09-ayudar-reconocer-errores.png", alt: "Mensaje \"Invalid login or password.\"" },
    ],
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
    capturas: [],
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
