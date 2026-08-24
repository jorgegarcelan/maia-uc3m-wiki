export const TERMS = {
  S1: { label: "S1", long: "Semicuatrimestre 1", date: "7 sep — 23 oct", start: "20260907", end: "20261023" },
  S2: { label: "S2", long: "Semicuatrimestre 2", date: "3 nov — 18 dic", start: "20261103", end: "20261218" },
  S3: { label: "S3", long: "Semicuatrimestre 3", date: "25 ene — 12 mar", start: "20270125", end: "20270312" },
  S4: { label: "S4", long: "Semicuatrimestre 4", date: "30 mar — 13 may", start: "20270330", end: "20270513" },
};

export const DAYS = [
  { id: "MO", short: "L", label: "Lunes", ics: "MO", offset: 0 },
  { id: "TU", short: "M", label: "Martes", ics: "TU", offset: 1 },
  { id: "WE", short: "X", label: "Miércoles", ics: "WE", offset: 2 },
  { id: "TH", short: "J", label: "Jueves", ics: "TH", offset: 3 },
  { id: "FR", short: "V", label: "Viernes", ics: "FR", offset: 4 },
];

export const SLOTS = [
  { id: "F0", start: "14:30", end: "16:00" },
  { id: "F1", start: "16:00", end: "17:30" },
  { id: "F2", start: "17:45", end: "19:15" },
  { id: "F3", start: "19:30", end: "21:00" },
];

const course = (id, name, short, module, term, slug, area) => ({
  id, name, short, module, term, slug, area, ects: 3,
});

export const COURSES = [
  course("19197", "Implicaciones Éticas y Legales de la IA", "Ética y Legal", "M3", "S1", "implicaciones-eticas", "Ética"),
  course("19198", "Representación del Conocimiento y Razonamiento", "Representación", "M1", "S1", "representacion-conocimiento", "Razonamiento"),
  course("19199", "Aprendizaje Automático en Series Temporales", "Series Temporales", "M1", "S1", "series-temporales", "Aprendizaje"),
  course("19200", "Búsqueda y Optimización", "Búsqueda y Optim.", "M1", "S1", "busqueda-y-optimizacion", "Optimización"),
  course("19201", "Métodos Probabilísticos en IA", "Métodos Probab.", "M1", "S1", "metodos-probabilisticos", "Razonamiento"),
  course("19202", "Computación Evolutiva", "Comp. Evolutiva", "M1", "S1", "computacion-evolutiva", "Optimización"),
  course("19203", "Redes de Neuronas", "Redes Neuronales", "M1", "S1", "redes-de-neuronas", "Aprendizaje"),
  course("19204", "Aprendizaje Automático", "Aprendizaje Auto.", "M1", "S1", "aprendizaje-automatico", "Aprendizaje"),
  course("19205", "Agentes y Sistemas Multiagente", "Sist. Multiagente", "M1", "S1", "agentes-multiagente", "Razonamiento"),
  course("19206", "Aprendizaje Profundo", "Deep Learning", "M1", "S2", "aprendizaje-profundo", "Aprendizaje"),
  course("19207", "Planificación Automática", "Planificación", "M1", "S2", "planificacion-automatica", "Razonamiento"),
  course("19208", "Razonamiento con Incertidumbre", "Incertidumbre", "M1", "S2", "razonamiento-incertidumbre", "Razonamiento"),
  course("19209", "Aprendizaje por Refuerzo", "Reinforcement", "M1", "S2", "aprendizaje-por-refuerzo", "Aprendizaje"),
  course("19210", "Analítica de Negocio", "Analítica Negocio", "M2", "S4", "analitica-de-negocio", "Negocio"),
  course("19211", "Procesamiento de Lenguaje Natural", "PLN", "M2", "S2", "procesamiento-lenguaje-natural", "Lenguaje"),
  course("19212", "Vehículos Autónomos", "Vehículos Autón.", "M2", "S2", "vehiculos-autonomos", "Robótica"),
  course("19213", "Web Semántica y Buscadores", "Web Semántica", "M2", "S3", "web-semantica", "Lenguaje"),
  course("19214", "Inteligencia Artificial en Educación", "IA en Educación", "M2", "S3", "ia-en-educacion", "Sectorial"),
  course("19215", "Inteligencia Artificial en Finanzas", "IA en Finanzas", "M2", "S3", "ia-en-finanzas", "Sectorial"),
  course("19216", "Inteligencia Artificial en Salud", "IA en Salud", "M2", "S3", "ia-en-salud", "Sectorial"),
  course("19217", "Visión Artificial", "Visión Artificial", "M2", "S3", "vision-artificial", "Visión"),
  course("19218", "IA y Desarrollo Sostenible", "IA y Sostenib.", "M2", "S3", "ia-desarrollo-sostenible", "Sectorial"),
  course("19219", "Robótica Inteligente", "Robótica", "M2", "S3", "robotica-inteligente", "Robótica"),
  course("19222", "Fábricas Inteligentes", "Fábricas Intel.", "M2", "S4", "fabricas-inteligentes", "Industria"),
  course("19223", "Ciudades Inteligentes", "Ciudades Intel.", "M2", "S4", "ciudades-inteligentes", "Industria"),
  course("19224", "Inteligencia Ambiental", "Intel. Ambiental", "M2", "S2", "inteligencia-ambiental", "Sectorial"),
  course("19225", "Emprendimiento en IA", "Emprendimiento", "M3", "S4", "emprendimiento-ia", "Negocio"),
];

const COURSE_PALETTE = [
  "#2563eb", "#4f46e5", "#7c3aed", "#9333ea", "#c026d3", "#db2777", "#e11d48",
  "#dc2626", "#ea580c", "#d97706", "#ca8a04", "#65a30d", "#16a34a", "#059669",
  "#0d9488", "#0891b2", "#0284c7", "#0369a1", "#1d4ed8", "#4338ca", "#6d28d9",
  "#a21caf", "#be185d", "#b91c1c", "#c2410c", "#a16207", "#15803d",
];

export const COURSE_COLORS = Object.fromEntries(COURSES.map((item, index) => [item.id, COURSE_PALETTE[index]]));

const s = (term, day, slot, courseId, lab = false, note = "", options = {}) => ({
  term, day, slot, courseId, lab, note, ...options,
});

export const SESSIONS = [
  s("S1", "MO", "F1", "19204", false, "", { excludedDates: ["20261012"] }), s("S1", "WE", "F1", "19204", true),
  s("S1", "TU", "F1", "19203"), s("S1", "FR", "F2", "19203"),
  s("S1", "TH", "F1", "19202"), s("S1", "FR", "F1", "19202", true),
  s("S1", "FR", "F1", "19200"), s("S1", "TH", "F1", "19200", false, "Desde el 17 de septiembre", { firstDate: "20260917" }),
  s("S1", "MO", "F0", "19200", false, "Sesión especial · 28 sep", { date: "20260928" }),
  s("S1", "MO", "F2", "19205", false, "", { excludedDates: ["20261012"] }), s("S1", "WE", "F2", "19205", true),
  s("S1", "TU", "F2", "19199"), s("S1", "TH", "F2", "19199"),
  s("S1", "MO", "F3", "19201", false, "", { excludedDates: ["20261012"] }), s("S1", "WE", "F3", "19201"),
  s("S1", "MO", "F3", "19198", false, "", { excludedDates: ["20261012"] }), s("S1", "WE", "F3", "19198"),
  s("S1", "TU", "F3", "19197"), s("S1", "TH", "F3", "19197"),

  s("S2", "MO", "F1", "19224", false, "", { startTime: "16:30", firstDate: "20261116", excludedDates: ["20261207"] }),
  s("S2", "TH", "F1", "19224", false, "", { startTime: "16:30" }),
  s("S2", "TU", "F1", "19212", false, "", { excludedDates: ["20261208"] }), s("S2", "FR", "F2", "19212", true),
  s("S2", "WE", "F1", "19206"), s("S2", "TU", "F2", "19206", false, "", { excludedDates: ["20261208"] }),
  s("S2", "FR", "F1", "19211", true), s("S2", "TH", "F2", "19211", true),
  s("S2", "MO", "F2", "19208", false, "", { firstDate: "20261116", excludedDates: ["20261207"] }), s("S2", "WE", "F2", "19208"),
  s("S2", "MO", "F3", "19209", false, "", { firstDate: "20261116", excludedDates: ["20261207"] }), s("S2", "WE", "F3", "19209"),
  s("S2", "TU", "F3", "19207", false, "", { excludedDates: ["20261208"] }), s("S2", "TH", "F3", "19207"),

  s("S3", "MO", "F1", "19219"), s("S3", "WE", "F1", "19219", true),
  s("S3", "TU", "F1", "19217"), s("S3", "FR", "F1", "19217", true),
  s("S3", "WE", "F3", "19213"), s("S3", "FR", "F2", "19213", true),
  s("S3", "MO", "F2", "19215"), s("S3", "WE", "F2", "19215", true),
  s("S3", "TU", "F2", "19214"), s("S3", "TH", "F2", "19214", true),
  s("S3", "MO", "F3", "19216"), s("S3", "TH", "F1", "19216", true),
  s("S3", "TU", "F3", "19218"), s("S3", "TH", "F3", "19218", true),

  s("S4", "TU", "F1", "19223"), s("S4", "TH", "F1", "19223"),
  s("S4", "MO", "F1", "19222"), s("S4", "WE", "F1", "19222"),
  s("S4", "MO", "F2", "19210"), s("S4", "TH", "F2", "19210"),
  s("S4", "TU", "F2", "19225"), s("S4", "WE", "F2", "19225"),
];

export const PRESETS = {
  equilibrado: {
    name: "Plan equilibrado",
    courses: ["19197", "19204", "19203", "19200", "19205", "19206", "19208", "19211", "19224", "19212", "19217", "19219", "19213", "19216", "19222", "19225"],
  },
  tecnico: {
    name: "Perfil técnico",
    courses: ["19197", "19204", "19203", "19205", "19201", "19206", "19207", "19208", "19209", "19211", "19217", "19219", "19213", "19216", "19222", "19210"],
  },
  aplicado: {
    name: "Perfil aplicado",
    courses: ["19197", "19204", "19203", "19200", "19205", "19206", "19208", "19211", "19212", "19224", "19213", "19214", "19215", "19216", "19217", "19223"],
  },
};

export const MODULES = {
  M1: { label: "Fundamentos y técnicas", short: "Módulo 1", min: 15, max: 24 },
  M2: { label: "Aplicaciones", short: "Módulo 2", min: 18, max: 30 },
  M3: { label: "Ética y emprendimiento", short: "Módulo 3", min: 3, max: 6 },
};
