import { readFile, writeFile } from "node:fs/promises";
import { COURSES, DAYS, SESSIONS, SLOTS, TERMS } from "../src/data.js";

const ACTIVE_YEAR = "2026-2027";
const COURSE_DIR = new URL(`../wiki/cursos/${ACTIVE_YEAR}/asignaturas/`, import.meta.url);

const ROOMS = {
  "19197": { TU_F3: "0.A.08", TH_F3: "0.A.08" },
  "19198": { MO_F3: "0.A.07", WE_F3: "0.A.07" },
  "19199": { TU_F2: "0.A.08", TH_F2: "0.A.08" },
  "19200": { FR_F1: "0.A.07", TH_F1: "0.A.07", MO_F0: "0.A.07" },
  "19201": { MO_F3: "0.A.08", WE_F3: "0.A.08" },
  "19202": { TH_F1: "0.A.08", FR_F1: "1.A.06 INF" },
  "19203": { TU_F1: "0.A.08", FR_F2: "0.A.08" },
  "19204": { MO_F1: "0.A.08", WE_F1: "1.A.06 INF" },
  "19205": { MO_F2: "0.A.08", WE_F2: "1.A.06 INF" },
  "19206": { WE_F1: "0.A.08", TU_F2: "0.A.08" },
  "19207": { TU_F3: "0.A.08", TH_F3: "0.A.08" },
  "19208": { MO_F2: "0.A.08", WE_F2: "0.A.08" },
  "19209": { MO_F3: "0.A.08", WE_F3: "0.A.08" },
  "19210": { MO_F2: "0.A.08", TH_F2: "0.A.08" },
  "19211": { FR_F1: "1.A.06 INF", TH_F2: "1.A.06 INF" },
  "19212": { TU_F1: "0.A.08", FR_F2: "1.A.06 INF" },
  "19213": { WE_F3: "0.A.08", FR_F2: "1.A.06 INF" },
  "19214": { TU_F2: "0.A.08", TH_F2: "1.A.06 INF" },
  "19215": { MO_F2: "0.A.08", WE_F2: "1.A.06 INF" },
  "19216": { MO_F3: "0.A.08", TH_F1: "1.A.06 INF" },
  "19217": { TU_F1: "0.A.08", FR_F1: "1.A.06 INF" },
  "19218": { TU_F3: "0.A.08", TH_F3: "1.A.06 INF" },
  "19219": { MO_F1: "0.A.08", WE_F1: "1.A.06 INF" },
  "19222": { MO_F1: "0.A.08", WE_F1: "0.A.08" },
  "19223": { TU_F1: "0.A.08", TH_F1: "0.A.08" },
  "19224": { MO_F1: "0.A.08", TH_F1: "0.A.08" },
  "19225": { TU_F2: "0.A.08", WE_F2: "0.A.08" },
};

const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function parseDate(value) {
  return new Date(Date.UTC(Number(value.slice(0, 4)), Number(value.slice(4, 6)) - 1, Number(value.slice(6, 8))));
}

function compactDate(date) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

function moveToWeekday(value, targetOffset, direction) {
  const date = parseDate(value);
  const currentOffset = (date.getUTCDay() + 6) % 7;
  const distance = direction > 0 ? (targetOffset - currentOffset + 7) % 7 : (currentOffset - targetOffset + 7) % 7;
  date.setUTCDate(date.getUTCDate() + direction * distance);
  return compactDate(date);
}

function dateRange(sessions, term) {
  const ranges = sessions.map((session) => {
    const day = DAYS.find((item) => item.id === session.day);
    return {
      first: session.date ?? session.firstDate ?? moveToWeekday(term.start, day.offset, 1),
      last: session.date ?? session.lastDate ?? moveToWeekday(term.end, day.offset, -1),
    };
  });
  return {
    first: ranges.map((item) => item.first).sort()[0],
    last: ranges.map((item) => item.last).sort().at(-1),
  };
}

function humanDate(value, includeYear = true) {
  const date = parseDate(value);
  return `${date.getUTCDate()} de ${MONTHS[date.getUTCMonth()]}${includeYear ? ` de ${date.getUTCFullYear()}` : ""}`;
}

function humanRange(first, last) {
  const sameYear = first.slice(0, 4) === last.slice(0, 4);
  return `${humanDate(first, !sameYear)} – ${humanDate(last, true)}`;
}

function sessionNote(session) {
  const notes = [];
  if (session.note) notes.push(session.note);
  if (session.excludedDates?.length) notes.push(`Sin sesión: ${session.excludedDates.map((date) => humanDate(date)).join(", ")}`);
  return notes.join(" · ") || "—";
}

function scheduleBlock(course, sessions) {
  const term = TERMS[course.term];
  const range = dateRange(sessions, term);
  const rows = sessions
    .map((session) => {
      const day = DAYS.find((item) => item.id === session.day);
      const slot = SLOTS.find((item) => item.id === session.slot);
      const start = session.startTime ?? slot.start;
      const end = session.endTime ?? slot.end;
      const room = ROOMS[course.id]?.[`${session.day}_${session.slot}`] ?? "Consultar publicación oficial";
      const type = session.lab ? "Aula de informática" : "Presencial";
      return `| ${day.label} | ${start}–${end} | ${room} | ${type} | ${sessionNote(session)} |`;
    })
    .join("\n");

  return `## Horario (Curso 2026/2027)\n\n| Día | Hora | Aula | Tipo | Observaciones |\n|-----|------|------|------|---------------|\n${rows}\n\n**Periodo de sesiones publicado:** ${humanRange(range.first, range.last)}.\n\n> Horario del Grupo 1 verificado el 24 de agosto de 2026. Consulta la publicación oficial antes de desplazarte: puede haber cambios de aula o sesiones excepcionales.\n`;
}

let updated = 0;

for (const course of COURSES) {
  const fileUrl = new URL(`${course.slug}.md`, COURSE_DIR);
  const content = await readFile(fileUrl, "utf8");
  const sessions = SESSIONS.filter((session) => session.courseId === course.id);
  if (!sessions.length) throw new Error(`No hay sesiones para ${course.id} ${course.name}`);
  const next = content.replace(/## Horario \(Curso [^)]+\)[\s\S]*?(?=\n## Coordinador\/a)/, scheduleBlock(course, sessions));
  if (next === content) throw new Error(`No se encontró el bloque de horario en ${course.slug}.md`);
  await writeFile(fileUrl, next);
  updated += 1;
}

console.log(`Actualizadas ${updated} fichas de ${ACTIVE_YEAR}.`);
