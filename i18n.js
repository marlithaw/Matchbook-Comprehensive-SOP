/* ============================================================
   Matchbook SOP Handbook — lightweight i18n runtime
   Languages: English (source) · Español · Kreyòl Ayisyen · Kiswahili
   Translations cover the interface, navigation, section titles &
   summaries, quick reference, the guided-experience heading/message
   layer, and key statements. Detailed policy paragraph bodies remain
   in English behind an on-page notice (machine-assisted; pending
   fluent-speaker review).
   ============================================================ */
(function (global) {
  "use strict";
  var LANGS = ["en", "es", "ht", "sw"];
  var NAMES = { en: "English", es: "Español", ht: "Kreyòl Ayisyen", sw: "Kiswahili" };
  var SHORT = { en: "EN", es: "ES", ht: "HT", sw: "SW" };
  var STORE = "mbl-sop-lang";
  function DATA() { return global.MBL_I18N_DATA || {}; }
  var cache = [];        // {el, en, html}
  var cbs = [];          // language-change callbacks
  var mounted = false;

  function getLang() {
    var l;
    try { l = localStorage.getItem(STORE); } catch (e) {}
    return LANGS.indexOf(l) >= 0 ? l : "en";
  }

  // t(): for strings rendered by page JS. Falls back EN -> key.
  function t(key, vars) {
    var l = getLang(), d = DATA();
    var s = (l !== "en" && d[l] && d[l][key] != null) ? d[l][key]
          : (d.en && d.en[key] != null ? d.en[key] : key);
    if (vars) Object.keys(vars).forEach(function (k) {
      s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
    });
    return s;
  }

  function buildCache() {
    cache = [];
    document.querySelectorAll("[data-i18n],[data-i18n-html]").forEach(function (el) {
      var html = el.hasAttribute("data-i18n-html");
      cache.push({
        el: el,
        key: el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html"),
        en: html ? el.innerHTML : el.textContent,
        html: html
      });
    });
  }

  function applyDom(l) {
    var d = DATA();
    cache.forEach(function (c) {
      var val = (l !== "en" && d[l] && d[l][c.key] != null) ? d[l][c.key] : c.en;
      if (c.html) c.el.innerHTML = val; else c.el.textContent = val;
    });
  }

  function apply(l) {
    if (LANGS.indexOf(l) < 0) l = "en";
    document.documentElement.setAttribute("lang", l);
    applyDom(l);
    // reflect on any switchers
    document.querySelectorAll("select.mbl-lang").forEach(function (s) { s.value = l; });
    document.querySelectorAll(".mbl-lang-note").forEach(function (n) {
      n.style.display = (l === "en") ? "none" : "";
      n.textContent = t("ui.tnotice");
    });
    cbs.forEach(function (fn) { try { fn(l); } catch (e) {} });
  }

  function setLang(l) {
    try { localStorage.setItem(STORE, l); } catch (e) {}
    apply(l);
  }

  function onChange(fn) { cbs.push(fn); }

  // Build a compact <select> switcher inside the given container element.
  function mountSwitcher(container, opts) {
    opts = opts || {};
    var wrap = document.createElement("div");
    wrap.className = "mbl-lang-wrap";
    var sel = document.createElement("select");
    sel.className = "mbl-lang";
    sel.setAttribute("aria-label", "Language / Idioma / Lang / Lugha");
    LANGS.forEach(function (l) {
      var o = document.createElement("option");
      o.value = l; o.textContent = (opts.short ? SHORT[l] + " · " : "") + NAMES[l];
      sel.appendChild(o);
    });
    sel.value = getLang();
    sel.addEventListener("change", function () { setLang(sel.value); });
    wrap.appendChild(sel);
    container.appendChild(wrap);
    return sel;
  }

  function init() {
    if (mounted) return;
    mounted = true;
    buildCache();
    apply(getLang());
  }

  global.MBLI18N = {
    LANGS: LANGS, NAMES: NAMES, SHORT: SHORT,
    t: t, getLang: getLang, setLang: setLang, apply: apply,
    onChange: onChange, mountSwitcher: mountSwitcher, init: init, rebuild: buildCache
  };
})(window);

/* ============================================================
   TRANSLATION DATA
   ============================================================ */
window.MBL_I18N_DATA = {
  /* ---- English source strings for JS-rendered text ---- */
  en: {
    "ui.result": "result",
    "ui.results": "results",
    "ui.no_results": "No results",
    "ui.progress": "{n} of {total} sections read",
    "ui.mark_read": "Mark as read",
    "ui.marked_read": "✓ Read",
    "ui.contents": "☰ Contents",
    "ui.print": "Print / Save as PDF →",
    "ui.search_ph": "Search the handbook…",
    "ui.tnotice": "Machine-assisted translation of headings and key content. Detailed policy text stays in English, pending fluent-speaker review.",
    "nav.intro": "Introduction",
    "nav.practice": "Professional Practice & Staff Development",
    "nav.academics": "Academics & Instruction",
    "nav.assessment": "Assessment & Grading",
    "nav.culture": "Culture & Behavior Systems",
    "nav.support": "Student Support Systems",
    "nav.sped": "Special Education",
    "nav.mll": "Multilingual Learners",
    "nav.attendance": "Attendance & Accountability",
    "nav.safety": "Safety",
    "nav.family": "Family & Community Engagement",
    "nav.tech": "Technology & Digital Systems",
    "nav.cbl": "Personalized & Competency-Based Learning",
    "nav.reference": "Reference",
    "nav.glossary": "Glossary & Acronyms",
    "pl.element_x": "Element {n} of {total}",
    "pl.prev": "← Prev",
    "pl.next": "Next →",
    "pl.startover": "Start over ↺",
    "pl.tools": "Supporting tools for this element",
    "pl.done": "Mark section read",
    "pl.done_on": "✓ Marked read",
    "el.1.t": "Strong Core Instruction", "el.1.tag": "Tier 1 for all students",
    "el.2.t": "Data-Driven Small Groups", "el.2.tag": "Where personalization becomes most visible",
    "el.3.t": "Student Agency", "el.3.tag": "Voice, choice, and ownership",
    "el.4.t": "Multilingual Learner Support", "el.4.tag": "Language access as a core design principle",
    "el.5.t": "Targeted Practice Tools", "el.5.tag": "Technology as a support, not the model",
    "el.6.t": "The Five Competencies", "el.6.tag": "Habits, mindsets, and behaviors for readiness",
    "el.7.t": "Student Conferences", "el.7.tag": "Where personalization, agency & competencies converge",
    "el.8.t": "Project-Based & Applied Learning", "el.8.tag": "Learning used in authentic contexts",
    "el.9.t": "College & Career Readiness", "el.9.tag": "Awareness, identity, and purpose in K–8",
    "el.10.t": "Restorative & Structured Environment", "el.10.tag": "Personalization works best when students feel known",
    "el.11.t": "Coaching That Sustains the Work", "el.11.tag": "The engine behind every element above"
  },

  /* ============================== ESPAÑOL ============================== */
  es: {
    "ui.result": "resultado", "ui.results": "resultados", "ui.no_results": "Sin resultados",
    "ui.progress": "{n} de {total} secciones leídas",
    "ui.mark_read": "Marcar como leído", "ui.marked_read": "✓ Leído",
    "ui.contents": "☰ Contenido", "ui.print": "Imprimir / Guardar como PDF →",
    "ui.search_ph": "Buscar en el manual…",
    "ui.tnotice": "Traducción asistida por máquina de los títulos y el contenido clave. El texto detallado de las políticas permanece en inglés, pendiente de revisión por un hablante nativo.",
    "nav.intro": "Introducción",
    "nav.practice": "Práctica Profesional y Desarrollo del Personal",
    "nav.academics": "Currículo e Instrucción",
    "nav.assessment": "Evaluación y Calificaciones",
    "nav.culture": "Sistemas de Cultura y Comportamiento",
    "nav.support": "Sistemas de Apoyo al Estudiante",
    "nav.sped": "Educación Especial",
    "nav.mll": "Estudiantes Multilingües",
    "nav.attendance": "Asistencia y Responsabilidad",
    "nav.safety": "Seguridad",
    "nav.family": "Participación Familiar y Comunitaria",
    "nav.tech": "Tecnología y Sistemas Digitales",
    "nav.cbl": "Aprendizaje Personalizado y Basado en Competencias",
    "pl.element_x": "Elemento {n} de {total}", "pl.prev": "← Anterior", "pl.next": "Siguiente →",
    "pl.startover": "Comenzar de nuevo ↺", "pl.tools": "Herramientas de apoyo para este elemento",
    "pl.done": "Marcar sección como leída", "pl.done_on": "✓ Marcado como leído",
    "el.1.t": "Instrucción Central Sólida", "el.1.tag": "Nivel 1 para todos los estudiantes",
    "el.2.t": "Grupos Pequeños Basados en Datos", "el.2.tag": "Donde la personalización es más visible",
    "el.3.t": "Agencia del Estudiante", "el.3.tag": "Voz, elección y responsabilidad",
    "el.4.t": "Apoyo al Estudiante Multilingüe", "el.4.tag": "El acceso al idioma como principio de diseño",
    "el.5.t": "Herramientas de Práctica Específica", "el.5.tag": "La tecnología como apoyo, no como el modelo",
    "el.6.t": "Las Cinco Competencias", "el.6.tag": "Hábitos, mentalidades y conductas para la preparación",
    "el.7.t": "Conferencias con Estudiantes", "el.7.tag": "Donde convergen personalización, agencia y competencias",
    "el.8.t": "Aprendizaje por Proyectos y Aplicado", "el.8.tag": "Aprendizaje usado en contextos auténticos",
    "el.9.t": "Preparación Universitaria y Profesional", "el.9.tag": "Conciencia, identidad y propósito en K–8",
    "el.10.t": "Entorno Restaurativo y Estructurado", "el.10.tag": "La personalización funciona cuando el estudiante se siente conocido",
    "el.11.t": "Acompañamiento que Sostiene el Trabajo", "el.11.tag": "El motor detrás de cada elemento anterior",

    "brand.sub": "Manual de Procedimientos 2026–27", "brand.tag": "Procedimientos Operativos Estándar · Todo el Personal",
    "hero.kicker": "El Estilo Matchbook · 2026–2027",
    "hero.title": "Procedimientos Operativos Estándar",
    "hero.lede": "Cómo trabajamos juntos, enseñamos, apoyamos a los estudiantes y mantenemos las expectativas que hacen exitosa a nuestra escuela. Esta es una guía de “cómo hacemos escuela”: cuando tengas dudas, empieza aquí.",
    "qr.head": "Referencia Rápida",
    "qr.plans.l": "Planes de Lección", "qr.plans.v": "Mié · 5:00 PM", "qr.plans.n": "Se entregan en GROW cada semana. Antes de los recesos, entregar antes.",
    "qr.slc.l": "Conferencias Dirigidas por Estudiantes", "qr.slc.v": "8–9 Oct · 18–19 Mar", "qr.slc.n": "Cada estudiante presenta su crecimiento en competencias a su familia cada semestre.",
    "qr.events.l": "Eventos Familiares", "qr.events.v": "1 por semestre", "qr.events.n": "Todo el personal ayuda a planear y realizar al menos un evento escolar por semestre.",
    "qr.unsure.l": "Si Tienes Dudas", "qr.unsure.v": "Empieza Aquí", "qr.unsure.n": "Primero este manual → equipo de nivel o entrenador → canales establecidos.",
    "k.sec01": "Sección 01", "k.sec15": "Sección 1.5", "k.sec02": "Sección 02", "k.sec03": "Sección 03",
    "k.sec04": "Sección 04", "k.sec05": "Sección 05", "k.sec06": "Sección 06", "k.sec07": "Sección 07",
    "k.sec08": "Sección 08", "k.sec09": "Sección 09", "k.sec10": "Sección 10", "k.sec11": "Sección 11", "k.sec12": "Sección 12",
    "h2.intro": "Introducción",
    "h2.practice": "Práctica Profesional y Desarrollo del Personal",
    "h2.academics": "Currículo e Instrucción",
    "h2.assessment": "Evaluación y Calificaciones",
    "h2.culture": "Sistemas de Cultura y Comportamiento Escolar",
    "h2.support": "Sistemas de Apoyo al Estudiante",
    "h2.sped": "Educación Especial",
    "h2.mll": "Estudiantes Multilingües",
    "h2.attendance": "Asistencia y Responsabilidad",
    "h2.safety": "Seguridad",
    "h2.family": "Participación Familiar y Comunitaria",
    "h2.tech": "Tecnología y Sistemas Digitales",
    "h2.cbl": "Aprendizaje Personalizado y Basado en Competencias",
    "sub.intro": "Cómo trabajamos juntos, nos comunicamos y mantenemos las expectativas que hacen exitosa a nuestra escuela.",
    "sub.practice": "Cómo apoyamos el desarrollo del personal y mantenemos expectativas profesionales consistentes en toda la escuela.",
    "sub.academics": "Cómo planificamos, enseñamos, evaluamos y respondemos para asegurar un aprendizaje y crecimiento sólidos.",
    "sub.assessment": "Cómo usamos los datos para entender el progreso y cómo las calificaciones reflejan el dominio actual de los estándares del grado.",
    "sub.culture": "Cómo creamos un ambiente seguro, solidario y predecible mediante prevención, reconocimiento y respuesta.",
    "sub.support": "Cómo identificamos las necesidades de los estudiantes, coordinamos servicios y aseguramos apoyo académico, conductual y lingüístico para cada estudiante.",
    "sub.sped": "Cómo identificamos y atendemos a estudiantes con discapacidades conforme a IDEA y al Artículo 7 de Indiana.",
    "sub.mll": "Cómo identificamos a los estudiantes multilingües y ofrecemos servicios lingüísticos que dan acceso sin bajar el rigor.",
    "sub.attendance": "Cómo monitoreamos la asistencia y aseguramos la responsabilidad y participación consistente del estudiante.",
    "sub.safety": "Cómo mantenemos la seguridad, respondemos a las inquietudes y seguimos los procedimientos durante emergencias.",
    "sub.family": "Cómo nos comunicamos y colaboramos con las familias y la comunidad para apoyar el éxito estudiantil.",
    "sub.tech": "Cómo usamos, gestionamos y protegemos los sistemas tecnológicos para apoyar la instrucción, la comunicación y el aprendizaje.",
    "sub.cbl": "Cómo desarrollamos al estudiante integral mediante un modelo basado en competencias alineado con nuestro Perfil del Graduado.",
    "nav.reference": "Referencia", "nav.glossary": "Glosario y Siglas",
    "k.glossary": "Referencia", "h2.glossary": "Glosario y Siglas",
    "sub.glossary": "Definiciones de los términos, marcos y siglas utilizados en este manual.",
    "foot.tag": "Manual de Procedimientos 2026–27 · Aquí Se Hacen los Sueños.",
    "gw.eye": "Una Experiencia Guiada · El Estilo Matchbook",
    "gw.h3": "Cómo se une el aprendizaje personalizado",
    "gw.vision": "Cada niño conocido, amado y floreciendo.",
    "gw.lede": "El Aprendizaje Personalizado y Basado en Competencias no es un programa que implementamos: es cómo vivimos nuestra misión cada día. En lugar de una lista de documentos, recorre un tutorial guiado que muestra cómo la instrucción sólida, la agencia del estudiante, el apoyo multilingüe, las competencias, las conferencias y el acompañamiento se conectan como un solo sistema coherente.",
    "gw.cta": "Entrar a la experiencia guiada →",
    "gw.f1k": "Conferencias de Datos", "gw.f1v": "Cada estudiante · Mensual", "gw.f1s": "Vinculadas al registro de progreso; alimentan las Conferencias Dirigidas por Estudiantes.",
    "gw.f2k": "Conferencias Dirigidas por Estudiantes", "gw.f2v": "8–9 Oct · 18–19 Mar", "gw.f2s": "Los estudiantes presentan su crecimiento en competencias a la familia, dos veces al año.",
    "gw.f3k": "Materiales Familiares", "gw.f3v": "Inglés y Español", "gw.f3s": "Alineados con la marca; al menos una actualización escrita por semestre.",
    "gw.inside_l": "Qué incluye el tutorial",
    "gw.in1": "La Estrella Polar — visión y misión",
    "gw.in2": "Lo que es, y lo que no es",
    "gw.in3": "El motor del ABC y términos clave",
    "gw.in4": "11 elementos conectados del aula",
    "gw.in5": "Medir el trabajo (rúbrica de dominios)",
    "gw.in6": "Lo que cada estudiante vive semanalmente",
    "gw.in7": "El ritmo operativo (fechas, roles, portafolios)",
    "gw.in8": "Vivir la misión y biblioteca completa de recursos",

    /* --- Guided experience page --- */
    "pl.back": "← Volver al Manual", "pl.journey": "El Recorrido",
    "rail.north": "Estrella Polar", "rail.isnot": "Es / No Es", "rail.engine": "El Motor del ABC",
    "rail.classroom": "En Cada Aula", "rail.rubric": "Medir el Trabajo", "rail.weekly": "Cada Semana",
    "rail.rhythm": "Ritmo Operativo", "rail.mission": "Vivir la Misión", "rail.library": "Biblioteca de Recursos",
    "pl.hero_eye": "El Estilo Matchbook · 2026–2027 · Un Tutorial Guiado",
    "pl.hero_title": "Aprendizaje Personalizado y Basado en Competencias",
    "pl.vision": "Cada niño es conocido, amado y florece.",
    "pl.mission": "Personalizamos el aprendizaje en un ambiente restaurativo, fomentando la resiliencia y la excelencia mientras preparamos a los estudiantes para oportunidades del mundo real.",
    "pl.northstar": "El Aprendizaje Personalizado y Basado en Competencias no es un programa que implementamos. Es cómo vivimos nuestra misión cada día: en cómo agrupamos a los estudiantes, la retroalimentación que damos, los proyectos que asignamos y las relaciones que construimos.",
    "pl.begin": "Comenzar el recorrido ↓",
    "ch.s1": "Capítulo 01", "ch.k1": "Aclarando las Cosas", "ch.h1": "Lo Que Es, y No Es",
    "ch.l1": "El aprendizaje personalizado en Matchbook suele malinterpretarse. Antes de ver cómo funciona, aclaremos lo que realmente significa.",
    "ch.s2": "Capítulo 02", "ch.k2": "El Motor", "ch.h2": "Aprendizaje Basado en Competencias",
    "ch.l2": "El Aprendizaje Basado en Competencias es cómo el aprendizaje personalizado cobra vida en Matchbook K–8. Se apoya en cuatro compromisos y un vocabulario compartido.",
    "ch.s3": "Capítulo 03", "ch.k3": "El Corazón del Modelo", "ch.h3": "En Cada Aula",
    "ch.l3": "El aprendizaje personalizado y basado en competencias aparece en once elementos interconectados. No son programas separados: son un solo sistema coherente. Recorre cada uno para ver cómo se construyen entre sí.",
    "ch.s4": "Capítulo 04", "ch.k4": "Manteniendo la Rendición de Cuentas", "ch.h4": "Medir el Trabajo",
    "ch.l4": "Para que esta visión no se vuelva abstracta, el trabajo del Director de ABC se organiza en siete dominios de rúbrica, cada uno ponderado por su impacto y con una definición observable de la práctica sólida.",
    "ch.s5": "Capítulo 05", "ch.k5": "La Experiencia Vivida", "ch.h5": "Cada Estudiante, Cada Semana",
    "ch.l5": "Cuando el sistema funciona, esto es lo que vive cada estudiante de Matchbook, cada semana.",
    "ch.s6": "Capítulo 06", "ch.k6": "Cómo Funciona", "ch.h6": "El Ritmo Operativo",
    "ch.l6": "La visión se mantiene porque rutinas y responsabilidades concretas la mantienen en marcha. Este es el respaldo operativo del año.",
    "ch.s7": "Capítulo 07", "ch.k7": "El Porqué de Todo", "ch.h7": "Cómo Vivimos la Misión",
    "ch.l7": "Cada elemento que acabas de recorrer existe para hacer reales tres palabras para cada niño.",
    "ch.s8": "Capítulo 08", "ch.k8": "Todo en un Solo Lugar", "ch.h8": "Biblioteca de Recursos",
    "ch.l8": "Las herramientas mencionadas en este tutorial, organizadas por cómo las usarás. Cada una se abre en una pestaña nueva.",
    "isnot.no_head": "El Aprendizaje Personalizado NO es…", "isnot.yes_head": "El Aprendizaje Personalizado ES…",
    "isnot.no1": "Estudiantes en tecnología todo el día", "isnot.yes1": "Dirigido por el maestro, estructurado y receptivo",
    "isnot.no2": "Elección sin estructura ni rigor", "isnot.yes2": "Rico en lenguaje y centrado en el estudiante multilingüe",
    "isnot.no3": "Reemplazar maestros con tecnología", "isnot.yes3": "Informado por datos con retroalimentación continua",
    "isnot.no4": "Bajar las expectativas de algún estudiante", "isnot.yes4": "Propiedad del estudiante y académicamente riguroso",
    "isnot.no5": "Sistemas desconectados en paralelo", "isnot.yes5": "Restaurativo, orientado al futuro y conectado",
    "pc1.t": "Apoyo Específico", "pc1.p": "Los estudiantes reciben instrucción según lo que necesitan, no solo según su grado.",
    "pc2.t": "Evidencia a lo Largo del Tiempo", "pc2.p": "El aprendizaje se mide por el dominio demostrado, no por el tiempo de asiento o la finalización.",
    "pc3.t": "Retroalimentación Accionable", "pc3.p": "Los estudiantes reciben retroalimentación continua y específica vinculada a criterios de éxito claros.",
    "pc4.t": "Revisión y Crecimiento", "pc4.p": "Los estudiantes siempre tienen la oportunidad de revisar su aprendizaje, recibir apoyo y demostrar dominio de nuevo.",
    "gl.label": "Términos Clave — el lenguaje compartido del ABC",
    "gl.t1": "Competencia", "gl.d1": "Un área de habilidad o conocimiento claramente definida, alineada con estándares académicos y resultados de éxito.",
    "gl.t2": "Dominio", "gl.d2": "Demostración consistente de comprensión al nivel esperado: no la perfección, sino evidencia confiable y repetible.",
    "gl.t3": "Evidencia de Aprendizaje", "gl.d3": "Trabajo del estudiante que demuestra dominio: proyectos, evaluaciones, discusiones y observaciones del maestro.",
    "gl.t4": "Retroalimentación Formativa", "gl.d4": "Retroalimentación continua y específica que ayuda a los estudiantes a entender sus fortalezas e identificar próximos pasos.",
    "gl.t5": "Reevaluación", "gl.d5": "Oportunidades estructuradas para revisar el aprendizaje, recibir apoyo y demostrar dominio de nuevo.",
    "cls.coherence": "“Cada estudiante recibe lo que necesita, no exactamente el mismo próximo paso.”",
    "dom.d1": "Diseño de Marco y Currículo", "dom.d2": "Implementación y Apoyo Docente", "dom.d3": "Datos y Monitoreo del Progreso",
    "dom.d4": "Gestión del Cambio y Comunicación", "dom.d5": "Rutas del Estudiante y Preparación Profesional",
    "dom.d6": "Profesionalismo", "dom.d7": "Agencia del Estudiante", "dom.suppl": "Supl.",
    "rub.levels_intro": "Cuatro niveles de desempeño — cada dominio se mide con la misma escala, útil a mitad de año para una revisión en tiempo real, no solo en la evaluación formal.",
    "lvl.he_t": "Altamente Efectivo", "lvl.he_p": "La práctica es proactiva, basada en datos y llega consistentemente a cada estudiante o maestro a tiempo.",
    "lvl.e_t": "Efectivo", "lvl.e_p": "La práctica ocurre a tiempo y según lo planeado, con revisión regular.",
    "lvl.in_t": "Necesita Mejorar", "lvl.in_p": "La práctica ocurre pero es inconsistente, reactiva o no está ligada a los datos.",
    "lvl.ie_t": "Inefectivo", "lvl.ie_p": "Poca o ninguna evidencia de la práctica; no alineada con la implementación del ABC.",
    "wk1": "Instrucción central sólida del grado", "wk2": "Voz y elección en la práctica o demostración",
    "wk3": "Apoyo o extensión en grupo pequeño", "wk4": "Apoyo lingüístico (andamiajes para multilingües) según se necesite",
    "wk5": "Práctica específica basada en datos", "wk6": "Reflexión de competencias y establecimiento de metas",
    "wk7": "Colaboración y discusión entre pares", "wk8": "Conferencia o registro a lo largo del tiempo",
    "wk9": "Aplicación auténtica o trabajo por proyectos", "wk10": "Ambiente seguro, restaurativo y estructurado",
    "rh1.h": "Conferencias de Datos Mensuales", "rh2.h": "Conferencias Dirigidas por Estudiantes (con Familias)",
    "rh3.h": "Artefactos y Portafolios", "rh4.h": "Incorporación, DP y Mantenimiento del Marco",
    "rh5.h": "Rutas y Preparación Universitaria/Profesional", "rh6.h": "Estándares de Comunicación Familiar",
    "klf.k_t": "Conocido", "klf.k_p": "Cada estudiante tiene un maestro que lo ve: no solo sus datos, sino sus fortalezas, su historia y su potencial. Las conferencias, los grupos pequeños y las relaciones restaurativas aseguran que ningún niño quede atrás.",
    "klf.l_t": "Amado", "klf.l_p": "Un ambiente restaurativo es un compromiso con la pertenencia. Se mantienen altas expectativas dentro de una cultura de cuidado, responsabilidad y segundas oportunidades.",
    "klf.f_t": "Floreciendo", "klf.f_p": "Florecer es crecimiento académico, resiliencia y preparación para el mundo real más allá de las pruebas: excelencia mostrada en proyectos, competencias, presentaciones y hábitos que los estudiantes llevan más allá de Matchbook.",
    "klf.mantra": "Instrucción sólida. <span>Agencia significativa.</span> Apoyo multilingüe explícito.<br>Estructuras restaurativas. <span>Aplicación al mundo real.</span> Estudiantes listos para el futuro.",
    "lib.instr": "Herramientas de Instrucción", "lib.clarity": "Herramientas de Claridad", "lib.comm": "Herramientas de Comunicación",
    "end.h": "Ese es el Estilo Matchbook", "end.p": "El aprendizaje personalizado no es un programa: es cómo vivimos la misión cada día."
  },

  /* ============================== KREYÒL AYISYEN ============================== */
  ht: {
    "ui.result": "rezilta", "ui.results": "rezilta", "ui.no_results": "Pa gen rezilta",
    "ui.progress": "{n} sou {total} seksyon li",
    "ui.mark_read": "Make kòm li", "ui.marked_read": "✓ Li",
    "ui.contents": "☰ Kontni", "ui.print": "Enprime / Sove kòm PDF →",
    "ui.search_ph": "Chèche nan gid la…",
    "ui.tnotice": "Tradiksyon machin ede pou tit ak kontni kle. Tèks detaye règleman yo rete an Anglè, an atant revizyon yon moun ki pale lang lan byen.",
    "nav.intro": "Entwodiksyon",
    "nav.practice": "Pratik Pwofesyonèl ak Devlopman Anplwaye",
    "nav.academics": "Akademik ak Ansèyman",
    "nav.assessment": "Evalyasyon ak Nòt",
    "nav.culture": "Sistèm Kilti ak Konpòtman",
    "nav.support": "Sistèm Sipò Elèv",
    "nav.sped": "Edikasyon Espesyal",
    "nav.mll": "Elèv Miltileng",
    "nav.attendance": "Prezans ak Responsablite",
    "nav.safety": "Sekirite",
    "nav.family": "Angajman Fanmi ak Kominote",
    "nav.tech": "Teknoloji ak Sistèm Dijital",
    "nav.cbl": "Aprantisaj Pèsonalize ki Baze sou Konpetans",
    "pl.element_x": "Eleman {n} sou {total}", "pl.prev": "← Anvan", "pl.next": "Aprè →",
    "pl.startover": "Rekòmanse ↺", "pl.tools": "Zouti sipò pou eleman sa a",
    "pl.done": "Make seksyon an kòm li", "pl.done_on": "✓ Make kòm li",
    "el.1.t": "Ansèyman Debaz Solid", "el.1.tag": "Nivo 1 pou tout elèv",
    "el.2.t": "Ti Gwoup ki Baze sou Done", "el.2.tag": "Kote pèsonalizasyon vin pi vizib",
    "el.3.t": "Ajans Elèv", "el.3.tag": "Vwa, chwa ak responsablite",
    "el.4.t": "Sipò pou Elèv Miltileng", "el.4.tag": "Aksè nan lang kòm yon prensip debaz",
    "el.5.t": "Zouti Pratik ki Sible", "el.5.tag": "Teknoloji kòm yon sipò, pa modèl la",
    "el.6.t": "Senk Konpetans yo", "el.6.tag": "Abitid, panse ak konpòtman pou preparasyon",
    "el.7.t": "Konferans Elèv", "el.7.tag": "Kote pèsonalizasyon, ajans ak konpetans rankontre",
    "el.8.t": "Aprantisaj sou Pwojè ak Aplike", "el.8.tag": "Aprantisaj itilize nan kontèks otantik",
    "el.9.t": "Preparasyon pou Kolèj ak Karyè", "el.9.tag": "Konsyans, idantite ak objektif nan K–8",
    "el.10.t": "Anviwònman Restorativ ak Estriktire", "el.10.tag": "Pèsonalizasyon mache pi byen lè elèv santi yo koni",
    "el.11.t": "Akonpayman ki Soutni Travay la", "el.11.tag": "Motè ki dèyè chak eleman anwo a",

    "brand.sub": "Gid Pwosedi 2026–27", "brand.tag": "Pwosedi Operasyonèl Estanda · Tout Anplwaye",
    "hero.kicker": "Fason Matchbook · 2026–2027",
    "hero.title": "Pwosedi Operasyonèl Estanda",
    "hero.lede": "Kijan nou travay ansanm, anseye, sipòte elèv yo, epi kenbe atant ki fè lekòl nou an reyisi. Sa a se yon gid “kijan nou fè lekòl”: lè w pa sèten, kòmanse isit la.",
    "qr.head": "Referans Rapid",
    "qr.plans.l": "Plan Leson", "qr.plans.v": "Mèk · 5:00 PM", "qr.plans.n": "Remèt nan GROW chak semèn. Anvan konje, remèt bonè.",
    "qr.slc.l": "Konferans Elèv Dirije", "qr.slc.v": "8–9 Okt · 18–19 Mas", "qr.slc.n": "Chak elèv prezante pwogrè konpetans li bay fanmi li chak semès.",
    "qr.events.l": "Aktivite Fanmi", "qr.events.v": "1 pa semès", "qr.events.n": "Tout anplwaye ede planifye epi fè omwen yon aktivite lekòl pa semès.",
    "qr.unsure.l": "Si w Pa Sèten", "qr.unsure.v": "Kòmanse Isit", "qr.unsure.n": "Gid sa a anvan → ekip nivo oswa antrenè → kanal etabli yo.",
    "k.sec01": "Seksyon 01", "k.sec15": "Seksyon 1.5", "k.sec02": "Seksyon 02", "k.sec03": "Seksyon 03",
    "k.sec04": "Seksyon 04", "k.sec05": "Seksyon 05", "k.sec06": "Seksyon 06", "k.sec07": "Seksyon 07",
    "k.sec08": "Seksyon 08", "k.sec09": "Seksyon 09", "k.sec10": "Seksyon 10", "k.sec11": "Seksyon 11", "k.sec12": "Seksyon 12",
    "h2.intro": "Entwodiksyon",
    "h2.practice": "Pratik Pwofesyonèl ak Devlopman Anplwaye",
    "h2.academics": "Akademik ak Ansèyman",
    "h2.assessment": "Evalyasyon ak Nòt",
    "h2.culture": "Sistèm Kilti ak Konpòtman nan Lekòl la",
    "h2.support": "Sistèm Sipò Elèv",
    "h2.sped": "Edikasyon Espesyal",
    "h2.mll": "Elèv Miltileng",
    "h2.attendance": "Prezans ak Responsablite",
    "h2.safety": "Sekirite",
    "h2.family": "Angajman Fanmi ak Kominote",
    "h2.tech": "Teknoloji ak Sistèm Dijital",
    "h2.cbl": "Aprantisaj Pèsonalize ki Baze sou Konpetans",
    "sub.intro": "Kijan nou travay ansanm, kominike, epi kenbe atant ki fè lekòl nou an reyisi.",
    "sub.practice": "Kijan nou sipòte devlopman anplwaye epi kenbe atant pwofesyonèl konsistan nan tout lekòl la.",
    "sub.academics": "Kijan nou planifye, anseye, evalye, epi reyaji pou asire aprantisaj ak pwogrè solid.",
    "sub.assessment": "Kijan nou itilize done pou konprann pwogrè, epi kijan nòt yo reflete metriz kounye a sou estanda nivo a.",
    "sub.culture": "Kijan nou bati yon anviwònman ki an sekirite, ki sipòte, e ki previzib atravè prevansyon, rekonesans ak repons.",
    "sub.support": "Kijan nou idantifye bezwen elèv, kowòdone sèvis, epi asire chak elèv resevwa sipò akademik, konpòtmantal ak lengwistik.",
    "sub.sped": "Kijan nou idantifye epi sèvi elèv ki gen andikap dapre IDEA ak Atik 7 Indiana a.",
    "sub.mll": "Kijan nou idantifye elèv miltileng epi bay sèvis lang ki bay aksè san bese rigè.",
    "sub.attendance": "Kijan nou siveye prezans epi asire responsablite ak patisipasyon konsistan elèv la.",
    "sub.safety": "Kijan nou kenbe sekirite, reyaji sou enkyetid, epi swiv pwosedi pandan ijans.",
    "sub.family": "Kijan nou kominike epi kolabore ak fanmi ak kominote pou sipòte siksè elèv.",
    "sub.tech": "Kijan nou itilize, jere, epi pwoteje sistèm teknoloji pou sipòte ansèyman, kominikasyon ak aprantisaj.",
    "sub.cbl": "Kijan nou devlope tout elèv la atravè yon modèl ki baze sou konpetans ki aliye ak Pòtre Gradye nou an.",
    "nav.reference": "Referans", "nav.glossary": "Glosè ak Sig",
    "k.glossary": "Referans", "h2.glossary": "Glosè ak Sig",
    "sub.glossary": "Definisyon tèm, kad, ak sig yo itilize nan gid sa a.",
    "foot.tag": "Gid Pwosedi 2026–27 · Se La Rèv Fèt.",
    "gw.eye": "Yon Eksperyans Gide · Fason Matchbook",
    "gw.h3": "Kijan aprantisaj pèsonalize a vin ansanm",
    "gw.vision": "Chak timoun koni, renmen, epi ap grandi.",
    "gw.lede": "Aprantisaj Pèsonalize ki Baze sou Konpetans se pa yon pwogram nou aplike — se kijan nou viv misyon nou chak jou. Olye yon lis dokiman, mache atravè yon vizit gide ki montre kijan ansèyman solid, ajans elèv, sipò miltileng, konpetans, konferans ak akonpayman konekte kòm yon sèl sistèm koyeran.",
    "gw.cta": "Antre nan eksperyans gide a →",
    "gw.f1k": "Konferans Done", "gw.f1v": "Chak elèv · Chak mwa", "gw.f1s": "Lye ak swivi pwogrè a; alimante Konferans Elèv Dirije yo.",
    "gw.f2k": "Konferans Elèv Dirije", "gw.f2v": "8–9 Okt · 18–19 Mas", "gw.f2s": "Elèv prezante pwogrè konpetans bay fanmi, de fwa pa ane.",
    "gw.f3k": "Materyèl Fanmi", "gw.f3v": "Anglè ak Panyòl", "gw.f3s": "Aliye ak mak la; omwen yon aktyalizasyon ekri pa semès.",
    "gw.inside_l": "Sa ki nan vizit la",
    "gw.in1": "Etwal Polè a — vizyon ak misyon",
    "gw.in2": "Sa li ye, ak sa li pa ye",
    "gw.in3": "Motè ABC a ak tèm kle",
    "gw.in4": "11 eleman klas ki konekte",
    "gw.in5": "Mezire travay la (rubrik domèn)",
    "gw.in6": "Sa chak elèv viv chak semèn",
    "gw.in7": "Ritm operasyonèl la (dat, wòl, pòtfolyo)",
    "gw.in8": "Viv misyon an ak bibliyotèk resous konplè",

    "pl.back": "← Retounen nan Gid la", "pl.journey": "Vwayaj la",
    "rail.north": "Etwal Polè", "rail.isnot": "Se / Se Pa", "rail.engine": "Motè ABC a",
    "rail.classroom": "Nan Chak Klas", "rail.rubric": "Mezire Travay la", "rail.weekly": "Chak Semèn",
    "rail.rhythm": "Ritm Operasyonèl", "rail.mission": "Viv Misyon an", "rail.library": "Bibliyotèk Resous",
    "pl.hero_eye": "Fason Matchbook · 2026–2027 · Yon Vizit Gide",
    "pl.hero_title": "Aprantisaj Pèsonalize ki Baze sou Konpetans",
    "pl.vision": "Chak timoun koni, renmen, epi ap grandi.",
    "pl.mission": "Nou pèsonalize aprantisaj nan yon anviwònman restorativ, ap ankouraje rezilyans ak ekselans pandan n ap prepare elèv pou opòtinite nan mond reyèl la.",
    "pl.northstar": "Aprantisaj Pèsonalize ki Baze sou Konpetans se pa yon pwogram nou aplike. Se kijan nou viv misyon nou chak jou — nan kijan nou gwoupe elèv, fidbak nou bay, pwojè nou bay, ak relasyon nou bati.",
    "pl.begin": "Kòmanse vizit la ↓",
    "ch.s1": "Chapit 01", "ch.k1": "Mete Verite a Klè", "ch.h1": "Sa Li Ye, ak Sa Li Pa Ye",
    "ch.l1": "Yo souvan konprann aprantisaj pèsonalize nan Matchbook mal. Anvan nou wè kijan li mache, ann mete klè sa li vle di reyèlman.",
    "ch.s2": "Chapit 02", "ch.k2": "Motè a", "ch.h2": "Aprantisaj ki Baze sou Konpetans",
    "ch.l2": "Aprantisaj ki Baze sou Konpetans se kijan aprantisaj pèsonalize a pran lavi nan Matchbook K–8. Li chita sou kat angajman ak yon vokabilè pataje.",
    "ch.s3": "Chapit 03", "ch.k3": "Kè Modèl la", "ch.h3": "Nan Chak Klas",
    "ch.l3": "Aprantisaj pèsonalize ki baze sou konpetans parèt nan onz eleman ki konekte. Se pa pwogram separe — se yon sèl sistèm koyeran. Mache atravè chak pou wè kijan yo bati youn sou lòt.",
    "ch.s4": "Chapit 04", "ch.k4": "Kenbe Responsablite", "ch.h4": "Mezire Travay la",
    "ch.l4": "Pou vizyon sa a pa vin abstrè, travay Direktè ABC a òganize otou sèt domèn rubrik, chak peze pa enpak li, chak ak yon definisyon obsèvab sou bon pratik.",
    "ch.s5": "Chapit 05", "ch.k5": "Eksperyans Vivan an", "ch.h5": "Chak Elèv, Chak Semèn",
    "ch.l5": "Lè sistèm nan ap mache, men sa chak elèv Matchbook viv, chak semèn.",
    "ch.s6": "Chapit 06", "ch.k6": "Kijan Li Mache", "ch.h6": "Ritm Operasyonèl la",
    "ch.l6": "Vizyon an kenbe paske woutin ak responsablite konkrè kenbe l sou orè. Men sipò operasyonèl ane a.",
    "ch.s7": "Chapit 07", "ch.k7": "Poukisa Dèyè Tout Sa", "ch.h7": "Kijan Nou Viv Misyon an",
    "ch.l7": "Chak eleman ou fèk mache atravè egziste pou fè twa mo vin reyèl pou chak timoun.",
    "ch.s8": "Chapit 08", "ch.k8": "Tout nan yon Sèl Kote", "ch.h8": "Bibliyotèk Resous",
    "ch.l8": "Zouti yo mansyone nan vizit sa a, òganize dapre kijan w ap itilize yo. Chak louvri nan yon nouvo onglè.",
    "isnot.no_head": "Aprantisaj Pèsonalize se PA…", "isnot.yes_head": "Aprantisaj Pèsonalize SE…",
    "isnot.no1": "Elèv sou teknoloji tout jounen", "isnot.yes1": "Dirije pa pwofesè, estriktire ak reyaktif",
    "isnot.no2": "Chwa san estrikti san rigè", "isnot.yes2": "Rich nan lang epi santre sou elèv miltileng",
    "isnot.no3": "Ranplase pwofesè ak teknoloji", "isnot.yes3": "Enfòme pa done ak fidbak kontinyèl",
    "isnot.no4": "Bese atant pou nenpòt elèv", "isnot.yes4": "Elèv posede l epi akademikman rigoureu",
    "isnot.no5": "Sistèm dekonekte an paralèl", "isnot.yes5": "Restorativ, oryante vè lavni ak konekte",
    "pc1.t": "Sipò Sible", "pc1.p": "Elèv resevwa ansèyman selon sa yo bezwen, pa selman selon nivo yo.",
    "pc2.t": "Prèv sou Tan", "pc2.p": "Aprantisaj mezire pa metriz demontre, pa tan chita oswa fini.",
    "pc3.t": "Fidbak ki Aksyonab", "pc3.p": "Elèv resevwa fidbak kontinyèl ak espesifik ki lye ak kritè siksè klè.",
    "pc4.t": "Revizyon ak Kwasans", "pc4.p": "Elèv toujou gen opòtinite pou revize aprantisaj, resevwa sipò, epi demontre metriz ankò.",
    "gl.label": "Tèm Kle — lang pataje ABC a",
    "gl.t1": "Konpetans", "gl.d1": "Yon domèn ladrès oswa konesans byen defini, aliye ak estanda akademik ak rezilta siksè.",
    "gl.t2": "Metriz", "gl.d2": "Demonstrasyon konsistan konpreyansyon nan nivo espere a: pa pèfeksyon, men prèv fyab e repetab.",
    "gl.t3": "Prèv Aprantisaj", "gl.d3": "Travay elèv ki demontre metriz: pwojè, evalyasyon, diskisyon ak obsèvasyon pwofesè.",
    "gl.t4": "Fidbak Fòmatif", "gl.d4": "Fidbak kontinyèl ak espesifik ki ede elèv konprann fòs yo epi idantifye pwochen etap.",
    "gl.t5": "Reevalyasyon", "gl.d5": "Opòtinite estriktire pou revize aprantisaj, resevwa sipò, epi demontre metriz ankò.",
    "cls.coherence": "“Chak elèv resevwa sa li bezwen — pa menm pwochen etap la egzakteman.”",
    "dom.d1": "Konsepsyon Kad ak Kourikoulòm", "dom.d2": "Aplikasyon ak Sipò Pwofesè", "dom.d3": "Done ak Swivi Pwogrè",
    "dom.d4": "Jesyon Chanjman ak Kominikasyon", "dom.d5": "Chemen Elèv ak Preparasyon Karyè",
    "dom.d6": "Pwofesyonalis", "dom.d7": "Ajans Elèv", "dom.suppl": "Siplemantè",
    "rub.levels_intro": "Kat nivo pèfòmans — chak domèn mezire ak menm echèl la, itil nan mitan ane pou yon tcheke an tan reyèl, pa sèlman nan evalyasyon fòmèl.",
    "lvl.he_t": "Trè Efikas", "lvl.he_p": "Pratik la pwoaktif, baze sou done, epi rive konsistan sou chak elèv oswa pwofesè sou orè.",
    "lvl.e_t": "Efikas", "lvl.e_p": "Pratik la fèt sou orè epi jan sa te planifye, ak revizyon regilye.",
    "lvl.in_t": "Bezwen Amelyorasyon", "lvl.in_p": "Pratik la fèt men li enkonsistan, reyaktif, oswa li pa lye ak done.",
    "lvl.ie_t": "Pa Efikas", "lvl.ie_p": "Ti kras oswa okenn prèv pratik la; pa aliye ak aplikasyon ABC.",
    "wk1": "Ansèyman debaz solid nan nivo a", "wk2": "Vwa ak chwa nan pratik oswa demonstrasyon",
    "wk3": "Sipò oswa ekstansyon nan ti gwoup", "wk4": "Sipò lang (echafodaj miltileng) jan sa nesesè",
    "wk5": "Pratik sible ki baze sou done", "wk6": "Refleksyon konpetans ak fikse objektif",
    "wk7": "Kolaborasyon ak diskisyon ant kanmarad", "wk8": "Konferans oswa tcheke sou tan",
    "wk9": "Aplikasyon otantik oswa travay pwojè", "wk10": "Anviwònman an sekirite, restorativ ak estriktire",
    "rh1.h": "Konferans Done Chak Mwa", "rh2.h": "Konferans Elèv Dirije (ak Fanmi)",
    "rh3.h": "Atifak ak Pòtfolyo", "rh4.h": "Entwodiksyon, Fòmasyon ak Antretyen Kad",
    "rh5.h": "Chemen ak Preparasyon Kolèj/Karyè", "rh6.h": "Estanda Kominikasyon Fanmi",
    "klf.k_t": "Koni", "klf.k_p": "Chak elèv gen yon pwofesè ki wè l — pa sèlman done l, men fòs li, istwa li, ak potansyèl li. Konferans, ti gwoup, ak relasyon restorativ asire okenn timoun pa pèdi.",
    "klf.l_t": "Renmen", "klf.l_p": "Yon anviwònman restorativ se yon angajman pou apatenans. Elèv kenbe nan gwo atant nan yon kilti swen, responsablite, ak dezyèm chans.",
    "klf.f_t": "Ap Grandi", "klf.f_p": "Grandi se kwasans akademik, rezilyans, ak preparasyon pou mond reyèl la pi lwen pase nòt: ekselans montre nan pwojè, konpetans, prezantasyon, ak abitid elèv pote pi lwen pase Matchbook.",
    "klf.mantra": "Ansèyman solid. <span>Ajans ki gen sans.</span> Sipò miltileng eksplisit.<br>Estrikti restorativ. <span>Aplikasyon nan mond reyèl.</span> Elèv pare pou lavni.",
    "lib.instr": "Zouti Ansèyman", "lib.clarity": "Zouti Klète", "lib.comm": "Zouti Kominikasyon",
    "end.h": "Se sa Fason Matchbook la ye", "end.p": "Aprantisaj pèsonalize se pa yon pwogram — se kijan nou viv misyon an chak jou."
  },

  /* ============================== KISWAHILI ============================== */
  sw: {
    "ui.result": "matokeo", "ui.results": "matokeo", "ui.no_results": "Hakuna matokeo",
    "ui.progress": "Sehemu {n} kati ya {total} zimesomwa",
    "ui.mark_read": "Weka alama umesoma", "ui.marked_read": "✓ Imesomwa",
    "ui.contents": "☰ Yaliyomo", "ui.print": "Chapisha / Hifadhi kama PDF →",
    "ui.search_ph": "Tafuta kwenye mwongozo…",
    "ui.tnotice": "Tafsiri iliyosaidiwa na mashine kwa vichwa na maudhui muhimu. Maandishi ya kina ya sera yanabaki kwa Kiingereza, yakisubiri ukaguzi wa mzungumzaji fasaha.",
    "nav.intro": "Utangulizi",
    "nav.practice": "Utendaji wa Kitaaluma na Maendeleo ya Wafanyakazi",
    "nav.academics": "Taaluma na Ufundishaji",
    "nav.assessment": "Tathmini na Alama",
    "nav.culture": "Mifumo ya Utamaduni na Tabia",
    "nav.support": "Mifumo ya Kusaidia Wanafunzi",
    "nav.sped": "Elimu Maalum",
    "nav.mll": "Wanafunzi wa Lugha Nyingi",
    "nav.attendance": "Mahudhurio na Uwajibikaji",
    "nav.safety": "Usalama",
    "nav.family": "Ushirikiano wa Familia na Jamii",
    "nav.tech": "Teknolojia na Mifumo ya Kidijitali",
    "nav.cbl": "Ujifunzaji Binafsi na wa Umahiri",
    "pl.element_x": "Kipengele {n} kati ya {total}", "pl.prev": "← Nyuma", "pl.next": "Mbele →",
    "pl.startover": "Anza upya ↺", "pl.tools": "Zana za kusaidia kipengele hiki",
    "pl.done": "Weka alama sehemu imesomwa", "pl.done_on": "✓ Imesomwa",
    "el.1.t": "Ufundishaji Imara wa Msingi", "el.1.tag": "Ngazi ya 1 kwa wanafunzi wote",
    "el.2.t": "Vikundi Vidogo Vinavyoongozwa na Data", "el.2.tag": "Mahali ubinafsishaji unapoonekana zaidi",
    "el.3.t": "Uwezo wa Mwanafunzi", "el.3.tag": "Sauti, chaguo na umiliki",
    "el.4.t": "Msaada kwa Mwanafunzi wa Lugha Nyingi", "el.4.tag": "Ufikiaji wa lugha kama kanuni kuu ya muundo",
    "el.5.t": "Zana za Mazoezi Lengwa", "el.5.tag": "Teknolojia kama msaada, si mfumo wenyewe",
    "el.6.t": "Umahiri Tano", "el.6.tag": "Tabia, mitazamo na mienendo ya utayari",
    "el.7.t": "Mikutano na Wanafunzi", "el.7.tag": "Mahali ubinafsishaji, uwezo na umahiri hukutana",
    "el.8.t": "Ujifunzaji wa Miradi na Utumizi", "el.8.tag": "Ujifunzaji unaotumika katika miktadha halisi",
    "el.9.t": "Utayari wa Chuo na Kazi", "el.9.tag": "Ufahamu, utambulisho na kusudi katika K–8",
    "el.10.t": "Mazingira ya Urejeshaji na Yenye Mpangilio", "el.10.tag": "Ubinafsishaji hufanikiwa wanafunzi wanapojisikia wanajulikana",
    "el.11.t": "Ukocha Unaodumisha Kazi", "el.11.tag": "Injini nyuma ya kila kipengele hapo juu",

    "brand.sub": "Mwongozo wa Taratibu 2026–27", "brand.tag": "Taratibu za Uendeshaji Sanifu · Wafanyakazi Wote",
    "hero.kicker": "Njia ya Matchbook · 2026–2027",
    "hero.title": "Taratibu za Uendeshaji Sanifu",
    "hero.lede": "Jinsi tunavyofanya kazi pamoja, kufundisha, kusaidia wanafunzi, na kudumisha matarajio yanayofanya shule yetu kufanikiwa. Huu ni mwongozo wa “jinsi tunavyoendesha shule”: usipojua, anza hapa.",
    "qr.head": "Marejeleo ya Haraka",
    "qr.plans.l": "Mipango ya Somo", "qr.plans.v": "Jmn · 5:00 PM", "qr.plans.n": "Huwasilishwa kwenye GROW kila wiki. Kabla ya mapumziko, wasilisha mapema.",
    "qr.slc.l": "Mikutano Inayoongozwa na Wanafunzi", "qr.slc.v": "8–9 Okt · 18–19 Mac", "qr.slc.n": "Kila mwanafunzi huwasilisha ukuaji wa umahiri kwa familia kila muhula.",
    "qr.events.l": "Matukio ya Familia", "qr.events.v": "1 kwa muhula", "qr.events.n": "Wafanyakazi wote husaidia kupanga na kuendesha angalau tukio moja la shule kwa muhula.",
    "qr.unsure.l": "Ikiwa Huna Uhakika", "qr.unsure.v": "Anza Hapa", "qr.unsure.n": "Mwongozo huu kwanza → timu ya ngazi au kocha → njia zilizowekwa.",
    "k.sec01": "Sehemu 01", "k.sec15": "Sehemu 1.5", "k.sec02": "Sehemu 02", "k.sec03": "Sehemu 03",
    "k.sec04": "Sehemu 04", "k.sec05": "Sehemu 05", "k.sec06": "Sehemu 06", "k.sec07": "Sehemu 07",
    "k.sec08": "Sehemu 08", "k.sec09": "Sehemu 09", "k.sec10": "Sehemu 10", "k.sec11": "Sehemu 11", "k.sec12": "Sehemu 12",
    "h2.intro": "Utangulizi",
    "h2.practice": "Utendaji wa Kitaaluma na Maendeleo ya Wafanyakazi",
    "h2.academics": "Taaluma na Ufundishaji",
    "h2.assessment": "Tathmini na Alama",
    "h2.culture": "Mifumo ya Utamaduni na Tabia Shuleni",
    "h2.support": "Mifumo ya Kusaidia Wanafunzi",
    "h2.sped": "Elimu Maalum",
    "h2.mll": "Wanafunzi wa Lugha Nyingi",
    "h2.attendance": "Mahudhurio na Uwajibikaji",
    "h2.safety": "Usalama",
    "h2.family": "Ushirikiano wa Familia na Jamii",
    "h2.tech": "Teknolojia na Mifumo ya Kidijitali",
    "h2.cbl": "Ujifunzaji Binafsi na wa Umahiri",
    "sub.intro": "Jinsi tunavyofanya kazi pamoja, kuwasiliana, na kudumisha matarajio yanayofanya shule yetu kufanikiwa.",
    "sub.practice": "Jinsi tunavyosaidia maendeleo ya wafanyakazi na kudumisha matarajio ya kitaaluma yanayolingana shuleni kote.",
    "sub.academics": "Jinsi tunavyopanga, kufundisha, kutathmini, na kuitikia ili kuhakikisha ujifunzaji na ukuaji imara.",
    "sub.assessment": "Jinsi tunavyotumia data kuelewa maendeleo, na jinsi alama zinavyoakisi umahiri wa sasa wa viwango vya darasa.",
    "sub.culture": "Jinsi tunavyojenga mazingira salama, yenye msaada, na yanayotabirika kupitia kuzuia, kutambua, na kuitikia.",
    "sub.support": "Jinsi tunavyotambua mahitaji ya wanafunzi, kuratibu huduma, na kuhakikisha kila mwanafunzi anapata msaada wa kitaaluma, kitabia, na wa lugha.",
    "sub.sped": "Jinsi tunavyotambua na kuhudumia wanafunzi wenye ulemavu kulingana na IDEA na Kifungu cha 7 cha Indiana.",
    "sub.mll": "Jinsi tunavyotambua wanafunzi wa lugha nyingi na kutoa huduma za lugha zinazotoa ufikiaji bila kupunguza ugumu.",
    "sub.attendance": "Jinsi tunavyofuatilia mahudhurio na kuhakikisha uwajibikaji na ushiriki thabiti wa mwanafunzi.",
    "sub.safety": "Jinsi tunavyodumisha usalama, kuitikia wasiwasi, na kufuata taratibu wakati wa dharura.",
    "sub.family": "Jinsi tunavyowasiliana na kushirikiana na familia na jamii kusaidia mafanikio ya mwanafunzi.",
    "sub.tech": "Jinsi tunavyotumia, kusimamia, na kulinda mifumo ya teknolojia kusaidia ufundishaji, mawasiliano, na ujifunzaji.",
    "sub.cbl": "Jinsi tunavyomkuza mwanafunzi mzima kupitia modeli ya umahiri inayolingana na Picha yetu ya Mhitimu.",
    "nav.reference": "Marejeleo", "nav.glossary": "Kamusi na Vifupisho",
    "k.glossary": "Marejeleo", "h2.glossary": "Kamusi na Vifupisho",
    "sub.glossary": "Maelezo ya istilahi, mifumo, na vifupisho vinavyotumika katika mwongozo huu.",
    "foot.tag": "Mwongozo wa Taratibu 2026–27 · Ndoto Hutimizwa Hapa.",
    "gw.eye": "Uzoefu Ulioongozwa · Njia ya Matchbook",
    "gw.h3": "Jinsi ujifunzaji binafsi unavyounganika",
    "gw.vision": "Kila mtoto anajulikana, anapendwa, na anastawi.",
    "gw.lede": "Ujifunzaji Binafsi na wa Umahiri si programu tunayotekeleza — ni jinsi tunavyoishi dhamira yetu kila siku. Badala ya orodha ya nyaraka, pitia ziara iliyoongozwa inayoonyesha jinsi ufundishaji imara, uwezo wa mwanafunzi, msaada wa lugha nyingi, umahiri, mikutano, na ukocha vinavyounganika kama mfumo mmoja shirikishi.",
    "gw.cta": "Ingia kwenye uzoefu ulioongozwa →",
    "gw.f1k": "Mikutano ya Data", "gw.f1v": "Kila mwanafunzi · Kila mwezi", "gw.f1s": "Imeunganishwa na kifuatiliaji cha maendeleo; hulisha Mikutano Inayoongozwa na Wanafunzi.",
    "gw.f2k": "Mikutano Inayoongozwa na Wanafunzi", "gw.f2v": "8–9 Okt · 18–19 Mac", "gw.f2s": "Wanafunzi huwasilisha ukuaji wa umahiri kwa familia, mara mbili kwa mwaka.",
    "gw.f3k": "Nyenzo za Familia", "gw.f3v": "Kiingereza na Kihispania", "gw.f3s": "Zinazolingana na chapa; angalau taarifa moja iliyoandikwa kwa muhula.",
    "gw.inside_l": "Kilichomo kwenye ziara",
    "gw.in1": "Nyota ya Kaskazini — maono na dhamira",
    "gw.in2": "Ni nini, na si nini",
    "gw.in3": "Injini ya CBL na maneno muhimu",
    "gw.in4": "Vipengele 11 vilivyounganika vya darasa",
    "gw.in5": "Kupima kazi (rubriki ya vikoa)",
    "gw.in6": "Kile kila mwanafunzi anachopitia kila wiki",
    "gw.in7": "Mdundo wa uendeshaji (tarehe, majukumu, portfolio)",
    "gw.in8": "Kuishi dhamira na maktaba kamili ya rasilimali",

    "pl.back": "← Rudi kwenye Mwongozo", "pl.journey": "Safari",
    "rail.north": "Nyota ya Kaskazini", "rail.isnot": "Ni / Si", "rail.engine": "Injini ya CBL",
    "rail.classroom": "Katika Kila Darasa", "rail.rubric": "Kupima Kazi", "rail.weekly": "Kila Wiki",
    "rail.rhythm": "Mdundo wa Uendeshaji", "rail.mission": "Kuishi Dhamira", "rail.library": "Maktaba ya Rasilimali",
    "pl.hero_eye": "Njia ya Matchbook · 2026–2027 · Ziara Iliyoongozwa",
    "pl.hero_title": "Ujifunzaji Binafsi na wa Umahiri",
    "pl.vision": "Kila mtoto anajulikana, anapendwa, na anastawi.",
    "pl.mission": "Tunabinafsisha ujifunzaji katika mazingira ya urejeshaji, tukikuza ustahimilivu na ubora huku tukiwaandaa wanafunzi kwa fursa za ulimwengu halisi.",
    "pl.northstar": "Ujifunzaji Binafsi na wa Umahiri si programu tunayotekeleza. Ni jinsi tunavyoishi dhamira yetu kila siku — katika jinsi tunavyounda vikundi, maoni tunayotoa, miradi tunayopangia, na mahusiano tunayojenga.",
    "pl.begin": "Anza ziara ↓",
    "ch.s1": "Sura 01", "ch.k1": "Kuweka Ukweli Wazi", "ch.h1": "Ni Nini, na Si Nini",
    "ch.l1": "Ujifunzaji binafsi Matchbook mara nyingi hueleweka vibaya. Kabla ya kuona jinsi unavyofanya kazi, tuweke wazi maana yake halisi.",
    "ch.s2": "Sura 02", "ch.k2": "Injini", "ch.h2": "Ujifunzaji wa Umahiri",
    "ch.l2": "Ujifunzaji wa Umahiri ndio jinsi ujifunzaji binafsi unavyopata uhai Matchbook K–8. Unategemea ahadi nne na msamiati wa pamoja.",
    "ch.s3": "Sura 03", "ch.k3": "Moyo wa Modeli", "ch.h3": "Katika Kila Darasa",
    "ch.l3": "Ujifunzaji binafsi wa umahiri hujitokeza katika vipengele kumi na kimoja vilivyounganika. Si programu tofauti — ni mfumo mmoja shirikishi. Pitia kila kimoja kuona jinsi vinavyojengana.",
    "ch.s4": "Sura 04", "ch.k4": "Kudumisha Uwajibikaji", "ch.h4": "Kupima Kazi",
    "ch.l4": "Ili maono haya yasiwe dhahania, kazi ya Mkurugenzi wa CBL imepangwa katika vikoa saba vya rubriki, kila kimoja kikipimwa kwa athari yake, na chenye maelezo yanayoonekana ya utendaji imara.",
    "ch.s5": "Sura 05", "ch.k5": "Uzoefu Halisi", "ch.h5": "Kila Mwanafunzi, Kila Wiki",
    "ch.l5": "Mfumo unapofanya kazi, hivi ndivyo kila mwanafunzi wa Matchbook anavyopitia, kila wiki.",
    "ch.s6": "Sura 06", "ch.k6": "Jinsi Unavyoendeshwa", "ch.h6": "Mdundo wa Uendeshaji",
    "ch.l6": "Maono hudumu kwa sababu ratiba na majukumu halisi huyaweka kwenye ratiba. Huu ndio uti wa mgongo wa uendeshaji wa mwaka.",
    "ch.s7": "Sura 07", "ch.k7": "Kwa Nini Nyuma ya Yote", "ch.h7": "Jinsi Tunavyoishi Dhamira",
    "ch.l7": "Kila kipengele ulichopitia kipo ili kufanya maneno matatu kuwa halisi kwa kila mtoto.",
    "ch.s8": "Sura 08", "ch.k8": "Vyote Mahali Pamoja", "ch.h8": "Maktaba ya Rasilimali",
    "ch.l8": "Zana zilizotajwa katika ziara hii, zimepangwa kulingana na jinsi utakavyozitumia. Kila moja hufunguka kwenye kichupo kipya.",
    "isnot.no_head": "Ujifunzaji Binafsi SI…", "isnot.yes_head": "Ujifunzaji Binafsi NI…",
    "isnot.no1": "Wanafunzi kwenye teknolojia mchana kutwa", "isnot.yes1": "Unaoongozwa na mwalimu, wenye mpangilio na unaoitikia",
    "isnot.no2": "Chaguo lisilo na mpangilio wala ugumu", "isnot.yes2": "Wenye lugha tajiri na unaomlenga mwanafunzi wa lugha nyingi",
    "isnot.no3": "Kuwabadilisha walimu kwa teknolojia", "isnot.yes3": "Unaoongozwa na data wenye maoni endelevu",
    "isnot.no4": "Kupunguza matarajio kwa mwanafunzi yeyote", "isnot.yes4": "Unaomilikiwa na mwanafunzi na wenye ugumu wa kitaaluma",
    "isnot.no5": "Mifumo iliyotengana ikienda sambamba", "isnot.yes5": "Wa urejeshaji, unaoangalia mbeleni na uliounganika",
    "pc1.t": "Msaada Lengwa", "pc1.p": "Wanafunzi hupata ufundishaji kulingana na wanachohitaji, si tu kulingana na darasa lao.",
    "pc2.t": "Ushahidi kwa Muda", "pc2.p": "Ujifunzaji hupimwa kwa umahiri ulioonyeshwa, si muda wa kukaa au kukamilisha.",
    "pc3.t": "Maoni Yanayotekelezeka", "pc3.p": "Wanafunzi hupata maoni endelevu na mahususi yanayohusishwa na vigezo vya wazi vya mafanikio.",
    "pc4.t": "Marekebisho na Ukuaji", "pc4.p": "Wanafunzi daima wana fursa ya kurudia ujifunzaji, kupata msaada, na kuonyesha umahiri tena.",
    "gl.label": "Maneno Muhimu — lugha ya pamoja ya CBL",
    "gl.t1": "Umahiri", "gl.d1": "Eneo la ujuzi au maarifa lililobainishwa wazi, linalolingana na viwango vya kitaaluma na matokeo ya mafanikio.",
    "gl.t2": "Umilisi", "gl.d2": "Kuonyesha uelewa kwa uthabiti katika kiwango kinachotarajiwa: si ukamilifu, bali ushahidi wa kuaminika unaorudiwa.",
    "gl.t3": "Ushahidi wa Ujifunzaji", "gl.d3": "Kazi ya mwanafunzi inayoonyesha umilisi: miradi, tathmini, majadiliano na uchunguzi wa mwalimu.",
    "gl.t4": "Maoni ya Kuunda", "gl.d4": "Maoni endelevu na mahususi yanayomsaidia mwanafunzi kuelewa uwezo wake na kutambua hatua zinazofuata.",
    "gl.t5": "Tathmini Upya", "gl.d5": "Fursa zilizopangwa za kurudia ujifunzaji, kupata msaada, na kuonyesha umilisi tena.",
    "cls.coherence": "“Kila mwanafunzi hupata anachohitaji — si hatua ileile inayofuata.”",
    "dom.d1": "Muundo wa Mfumo na Mtaala", "dom.d2": "Utekelezaji na Msaada kwa Walimu", "dom.d3": "Data na Ufuatiliaji wa Maendeleo",
    "dom.d4": "Usimamizi wa Mabadiliko na Mawasiliano", "dom.d5": "Njia za Mwanafunzi na Utayari wa Kazi",
    "dom.d6": "Uweledi", "dom.d7": "Uwezo wa Mwanafunzi", "dom.suppl": "Nyongeza",
    "rub.levels_intro": "Viwango vinne vya utendaji — kila kikoa hupimwa kwa kipimo kilekile, kinachotumika katikati ya mwaka kwa ukaguzi wa wakati halisi, si tu wakati wa tathmini rasmi.",
    "lvl.he_t": "Bora Sana", "lvl.he_p": "Utendaji ni wa kujitolea, unaoongozwa na data, na hufikia kila mwanafunzi au mwalimu kwa uthabiti kwa ratiba.",
    "lvl.e_t": "Bora", "lvl.e_p": "Utendaji hutokea kwa ratiba na kama ilivyopangwa, ukiwa na ukaguzi wa mara kwa mara.",
    "lvl.in_t": "Uboreshaji Unahitajika", "lvl.in_p": "Utendaji hutokea lakini si thabiti, ni wa kuitikia, au hauhusishwi na data kwa uthabiti.",
    "lvl.ie_t": "Hautoshelezi", "lvl.ie_p": "Ushahidi mdogo au hakuna wa utendaji; haulingani na utekelezaji wa CBL.",
    "wk1": "Ufundishaji imara wa ngazi ya darasa", "wk2": "Sauti na chaguo katika mazoezi au uonyeshaji",
    "wk3": "Msaada wa kikundi kidogo au upanuzi", "wk4": "Msaada wa lugha (viunzi vya lugha nyingi) inavyohitajika",
    "wk5": "Mazoezi lengwa yanayoongozwa na data", "wk6": "Tafakari ya umahiri na kuweka malengo",
    "wk7": "Ushirikiano na majadiliano kati ya wenzao", "wk8": "Mkutano au ukaguzi kwa muda",
    "wk9": "Utumizi halisi au kazi ya mradi", "wk10": "Mazingira salama, ya urejeshaji na yenye mpangilio",
    "rh1.h": "Mikutano ya Data ya Kila Mwezi", "rh2.h": "Mikutano Inayoongozwa na Wanafunzi (na Familia)",
    "rh3.h": "Kazi za Sanaa na Portfolio", "rh4.h": "Uanzishaji, Maendeleo ya Kitaaluma na Utunzaji wa Mfumo",
    "rh5.h": "Njia na Utayari wa Chuo/Kazi", "rh6.h": "Viwango vya Mawasiliano na Familia",
    "klf.k_t": "Anajulikana", "klf.k_p": "Kila mwanafunzi ana mwalimu anayemwona — si data yake tu, bali uwezo wake, hadithi yake, na uwezekano wake. Mikutano, vikundi vidogo, na mahusiano ya urejeshaji huhakikisha hakuna mtoto anayepotea.",
    "klf.l_t": "Anapendwa", "klf.l_p": "Mazingira ya urejeshaji ni ahadi ya kuwa mali. Wanafunzi hushikiliwa kwa matarajio ya juu ndani ya utamaduni wa utunzaji, uwajibikaji, na nafasi za pili.",
    "klf.f_t": "Anastawi", "klf.f_p": "Kustawi ni ukuaji wa kitaaluma, ustahimilivu, na utayari wa ulimwengu halisi zaidi ya alama za mtihani: ubora unaoonyeshwa kupitia miradi, umahiri, mawasilisho, na tabia wanazobeba zaidi ya Matchbook.",
    "klf.mantra": "Ufundishaji imara. <span>Uwezo wenye maana.</span> Msaada wa lugha nyingi ulio wazi.<br>Miundo ya urejeshaji. <span>Utumizi wa ulimwengu halisi.</span> Wanafunzi walio tayari kwa siku zijazo.",
    "lib.instr": "Zana za Ufundishaji", "lib.clarity": "Zana za Uwazi", "lib.comm": "Zana za Mawasiliano",
    "end.h": "Hiyo ndiyo Njia ya Matchbook", "end.p": "Ujifunzaji binafsi si programu — ni jinsi tunavyoishi dhamira kila siku."
  }
};
