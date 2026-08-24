import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  Copy,
  Download,
  FileText,
  Info,
  Plus,
  Search,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { COURSE_COLORS, COURSES, DAYS, MODULES, PRESETS, SESSIONS, SLOTS, TERMS } from "./data";
import { AboutPage, CourseCatalog, CourseDetail, GuideArticle, GuideHub, NotFound, SiteFooter, SiteHeader } from "./content-pages";
import "./styles.css";

const STORAGE_KEY = "maia.scheduler.plans.v2";
const MODULE_COLORS = { M1: "blue", M2: "teal", M3: "amber" };
const CALENDAR_START_MINUTES = 8 * 60;
const CALENDAR_END_MINUTES = 23 * 60;
const CALENDAR_STEP_MINUTES = 15;
const DISPLAY_HOURS = Array.from(
  { length: (CALENDAR_END_MINUTES - CALENDAR_START_MINUTES) / 60 },
  (_, index) => CALENDAR_START_MINUTES / 60 + index,
);

function minutesFromTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function sessionTimes(session) {
  const slot = SLOTS.find((item) => item.id === session.slot);
  return { start: session.startTime ?? slot.start, end: session.endTime ?? slot.end };
}

function sessionGridPosition(session) {
  const { start: startTime, end: endTime } = sessionTimes(session);
  const start = minutesFromTime(startTime);
  const end = minutesFromTime(endTime);
  return {
    row: (start - CALENDAR_START_MINUTES) / CALENDAR_STEP_MINUTES + 2,
    span: (end - start) / CALENDAR_STEP_MINUTES,
  };
}

function latestSessionEnd(sessions) {
  if (!sessions.length) return "—";
  return sessions.map((session) => sessionTimes(session).end).sort().at(-1);
}

function createInitialState() {
  const params = new URLSearchParams(window.location.search);
  const shared = params.get("courses")?.split(",").filter((id) => COURSES.some((course) => course.id === id));
  const initialTerm = TERMS[params.get("term")] ? params.get("term") : "S1";

  if (shared?.length) {
    return {
      activePlanId: "shared",
      term: initialTerm,
      plans: [{ id: "shared", name: "Horario compartido", courses: shared }],
    };
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.plans?.length) return saved;
  } catch {
    // Continue with a clean planner if browser storage is unavailable.
  }

  return {
    activePlanId: "main",
    term: "S1",
    plans: [{ id: "main", name: "Mi horario", courses: ["19197"] }],
  };
}

function escapeIcs(value) {
  return value.replaceAll("\\", "\\\\").replaceAll(",", "\\,").replaceAll(";", "\\;").replaceAll("\n", "\\n");
}

function compactDate(date) {
  return date.replaceAll("-", "");
}

function addDays(dateString, days) {
  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(4, 6)) - 1;
  const day = Number(dateString.slice(6, 8));
  const date = new Date(Date.UTC(year, month, day + days));
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

function firstDayOnOrAfter(dateString, targetOffset) {
  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(4, 6)) - 1;
  const day = Number(dateString.slice(6, 8));
  const date = new Date(Date.UTC(year, month, day));
  const currentOffset = (date.getUTCDay() + 6) % 7;
  return addDays(dateString, (targetOffset - currentOffset + 7) % 7);
}

function buildIcs(selectedIds) {
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const events = SESSIONS.filter((session) => selectedIds.includes(session.courseId));
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MAIA UC3M//Planificador//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Horario MAIA",
    "X-WR-TIMEZONE:Europe/Madrid",
  ];

  events.forEach((session, index) => {
    const course = COURSES.find((item) => item.id === session.courseId);
    const day = DAYS.find((item) => item.id === session.day);
    const term = TERMS[session.term];
    const { start, end } = sessionTimes(session);
    const date = session.date ?? session.firstDate ?? firstDayOnOrAfter(term.start, day.offset);
    const lastDate = session.date ?? session.lastDate ?? term.end;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${course.id}-${session.term}-${session.day}-${session.slot}-${index}@maia-scheduler`,
      `DTSTAMP:${now}`,
      `DTSTART;TZID=Europe/Madrid:${compactDate(date)}T${start.replace(":", "")}00`,
      `DTEND;TZID=Europe/Madrid:${compactDate(date)}T${end.replace(":", "")}00`,
      ...(!session.date ? [`RRULE:FREQ=WEEKLY;BYDAY=${day.ics};UNTIL=${lastDate}T215900Z`] : []),
      ...(session.excludedDates?.length ? [`EXDATE;TZID=Europe/Madrid:${session.excludedDates.map((item) => `${item}T${start.replace(":", "")}00`).join(",")}`] : []),
      `SUMMARY:${escapeIcs(course.name)}${session.lab ? " (INF)" : ""}`,
      "LOCATION:Campus Madrid - Puerta de Toledo",
      "DESCRIPTION:Comprueba fechas y aulas en el horario oficial de la UC3M.",
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function conflictsFor(selectedIds, term) {
  const sessions = SESSIONS.filter((session) => session.term === term && selectedIds.includes(session.courseId));
  const conflicts = new Map();
  sessions.forEach((first, index) => {
    sessions.slice(index + 1).forEach((second) => {
      if (first.day !== second.day || first.courseId === second.courseId) return;
      const firstTimes = sessionTimes(first);
      const secondTimes = sessionTimes(second);
      const start = minutesFromTime(firstTimes.start) >= minutesFromTime(secondTimes.start) ? firstTimes.start : secondTimes.start;
      const end = minutesFromTime(firstTimes.end) <= minutesFromTime(secondTimes.end) ? firstTimes.end : secondTimes.end;
      if (minutesFromTime(start) >= minutesFromTime(end)) return;
      const key = `${first.day}-${start}-${end}`;
      conflicts.set(key, {
        key,
        day: first.day,
        start,
        end,
        ids: [...new Set([...(conflicts.get(key)?.ids ?? []), first.courseId, second.courseId])],
      });
    });
  });
  return [...conflicts.values()];
}

function PlannerPage() {
  const [planner, setPlanner] = useState(createInitialState);
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [summaryView, setSummaryView] = useState("GENERAL");
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef(null);

  const activePlan = planner.plans.find((plan) => plan.id === planner.activePlanId) ?? planner.plans[0];
  const selectedIds = activePlan.courses;
  const selectedCourses = COURSES.filter((course) => selectedIds.includes(course.id));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planner));
  }, [planner]);

  const toast = (message) => {
    setNotice(message);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 2600);
  };

  const updatePlan = (updater) => {
    setPlanner((current) => ({
      ...current,
      plans: current.plans.map((plan) => (plan.id === current.activePlanId ? updater(plan) : plan)),
    }));
  };

  const toggleCourse = (id) => {
    updatePlan((plan) => ({
      ...plan,
      courses: plan.courses.includes(id) ? plan.courses.filter((courseId) => courseId !== id) : [...plan.courses, id],
    }));
  };

  const visibleCourses = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return COURSES.filter((course) => {
      const inTerm = course.term === planner.term;
      const inModule = moduleFilter === "ALL" || course.module === moduleFilter;
      const inSearch = !normalized || `${course.name} ${course.id} ${course.area}`.toLocaleLowerCase("es").includes(normalized);
      return inTerm && inModule && inSearch;
    });
  }, [moduleFilter, planner.term, query]);

  const termSessions = SESSIONS.filter((session) => session.term === planner.term);
  const selectedTermSessions = termSessions.filter((session) => selectedIds.includes(session.courseId));
  const conflicts = useMemo(() => conflictsFor(selectedIds, planner.term), [selectedIds, planner.term]);

  const credits = selectedCourses.reduce(
    (sum, course) => ({ ...sum, total: sum.total + course.ects, [course.module]: sum[course.module] + course.ects }),
    { total: 0, M1: 0, M2: 0, M3: 0 },
  );
  const totalDegree = credits.total + 12;
  const isValid = credits.total === 48 && credits.M1 >= 15 && credits.M1 <= 24 && credits.M2 >= 18 && credits.M2 <= 30 && credits.M3 >= 3 && credits.M3 <= 6 && selectedIds.includes("19197");

  const termBreakdown = useMemo(() => Object.keys(TERMS).reduce((result, term) => {
    const courses = selectedCourses.filter((course) => course.term === term);
    const teaching = courses.reduce((sum, course) => sum + course.ects, 0);
    const byModule = courses.reduce((sum, course) => ({ ...sum, [course.module]: sum[course.module] + course.ects }), { M1: 0, M2: 0, M3: 0 });
    const fixed = term === "S4" ? 12 : 0;
    const total = teaching + fixed;
    const termConflicts = conflictsFor(selectedIds, term);
    const sessions = SESSIONS.filter((session) => session.term === term && selectedIds.includes(session.courseId));
    const days = new Set(sessions.map((session) => session.day)).size;
    let checks = [];
    if (term === "S1") checks = [
      { label: "15 ECTS en total", valid: total === 15, value: `${total}/15` },
      { label: "Ética obligatoria", valid: courses.some((course) => course.id === "19197"), value: courses.some((course) => course.id === "19197") ? "Incluida" : "Falta" },
      { label: "12 ECTS de Módulo 1", valid: byModule.M1 === 12, value: `${byModule.M1}/12` },
    ];
    if (term === "S2") checks = [
      { label: "15 ECTS en total", valid: total === 15, value: `${total}/15` },
      { label: "Entre 3 y 12 ECTS de M1", valid: byModule.M1 >= 3 && byModule.M1 <= 12, value: `${byModule.M1} ECTS` },
      { label: "Entre 3 y 12 ECTS de M2", valid: byModule.M2 >= 3 && byModule.M2 <= 12, value: `${byModule.M2} ECTS` },
    ];
    if (term === "S3") checks = [
      { label: "Entre 9 y 15 ECTS", valid: total >= 9 && total <= 15, value: `${total} ECTS` },
      { label: "Solo asignaturas de M2", valid: courses.every((course) => course.module === "M2"), value: `${byModule.M2} ECTS M2` },
    ];
    if (term === "S4") checks = [
      { label: "Entre 15 y 21 ECTS", valid: total >= 15 && total <= 21, value: `${total} ECTS` },
      { label: "Entre 1 y 3 optativas", valid: courses.length >= 1 && courses.length <= 3, value: `${courses.length} opt.` },
      { label: "Prácticas y TFM", valid: true, value: "12 ECTS fijos" },
    ];
    checks.push({ label: "Sin solapamientos", valid: termConflicts.length === 0, value: termConflicts.length ? `${termConflicts.length} conflicto${termConflicts.length > 1 ? "s" : ""}` : "Correcto" });
    result[term] = { courses, teaching, fixed, total, byModule, conflicts: termConflicts, checks, valid: checks.every((check) => check.valid), days, end: latestSessionEnd(sessions) };
    return result;
  }, {}), [selectedIds]);

  const allTermsValid = Object.values(termBreakdown).every((term) => term.valid);
  const allConflicts = Object.values(termBreakdown).reduce((sum, term) => sum + term.conflicts.length, 0);
  const planValid = isValid && allTermsValid;
  const summaryTerm = summaryView === "GENERAL" ? null : termBreakdown[summaryView];

  const scheduleStats = useMemo(() => {
    const days = new Set(selectedTermSessions.map((session) => session.day)).size;
    return { days, end: latestSessionEnd(selectedTermSessions) };
  }, [selectedIds, planner.term]);

  const applyPreset = (key) => {
    const preset = PRESETS[key];
    updatePlan((plan) => ({ ...plan, name: preset.name, courses: preset.courses }));
    toast(`${preset.name} cargado`);
  };

  const addPlan = () => {
    const next = {
      id: `plan-${Date.now()}`,
      name: `Alternativa ${planner.plans.length + 1}`,
      courses: [...selectedIds],
    };
    setPlanner((current) => ({ ...current, activePlanId: next.id, plans: [...current.plans, next] }));
    toast("Alternativa creada");
  };

  const deletePlan = () => {
    if (planner.plans.length === 1) {
      updatePlan((plan) => ({ ...plan, courses: [] }));
      toast("Horario vaciado");
      return;
    }
    const remaining = planner.plans.filter((plan) => plan.id !== planner.activePlanId);
    setPlanner((current) => ({ ...current, activePlanId: remaining[0].id, plans: remaining }));
    toast("Alternativa eliminada");
  };

  const share = async () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("term", planner.term);
    url.searchParams.set("courses", selectedIds.join(","));
    try {
      await navigator.clipboard.writeText(url.toString());
      toast("Enlace copiado");
    } catch {
      window.prompt("Copia este enlace", url.toString());
    }
  };

  const exportCalendar = () => {
    if (!selectedIds.length) return toast("Selecciona alguna asignatura primero");
    downloadFile("horario-maia.ics", buildIcs(selectedIds), "text/calendar;charset=utf-8");
    toast("Calendario descargado");
  };

  return (
    <div className="app-shell">
      <SiteHeader active="planner" />

      <section className="workspace-header" id="planificador">
        <div>
          <p className="eyebrow">Construye tu horario</p>
          <h1>Tu año en MAIA, sin sorpresas.</h1>
          <p>Combina asignaturas, detecta solapamientos y comprueba los requisitos del plan.</p>
        </div>
        <div className="header-actions">
          <button className="button secondary" onClick={share}><Share2 size={16} /> Compartir</button>
          <button className="button primary" onClick={exportCalendar}><Download size={16} /> Exportar .ics</button>
        </div>
      </section>

      <section className="planner-toolbar" aria-label="Controles del planificador">
        <div className="plan-control">
          <label htmlFor="plan-select">Plan</label>
          <div className="select-wrap">
            <select
              id="plan-select"
              value={planner.activePlanId}
              onChange={(event) => setPlanner((current) => ({ ...current, activePlanId: event.target.value }))}
            >
              {planner.plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
            </select>
            <ChevronDown size={15} />
          </div>
          <button className="icon-button" onClick={addPlan} aria-label="Crear alternativa"><Plus size={17} /></button>
          <button className="icon-button subtle" onClick={deletePlan} aria-label="Eliminar alternativa"><Trash2 size={16} /></button>
        </div>
        <div className="term-tabs" role="tablist" aria-label="Semicuatrimestre">
          {Object.entries(TERMS).map(([id, term]) => (
            <button
              key={id}
              className={planner.term === id ? "active" : ""}
              onClick={() => {
                setPlanner((current) => ({ ...current, term: id }));
                setSummaryView(id);
              }}
              role="tab"
              aria-selected={planner.term === id}
            >
              <span>{term.label}</span><small>{term.date}</small>
            </button>
          ))}
        </div>
        <div className="preset-wrap">
          <label htmlFor="preset">Plantilla</label>
          <div className="select-wrap">
            <select id="preset" defaultValue="" onChange={(event) => event.target.value && applyPreset(event.target.value)}>
              <option value="" disabled>Elegir perfil</option>
              {Object.entries(PRESETS).map(([key, preset]) => <option value={key} key={key}>{preset.name}</option>)}
            </select>
            <ChevronDown size={15} />
          </div>
        </div>
      </section>

      <main className="planner-grid">
        <aside className="course-panel panel">
          <div className="panel-heading">
            <div><h2>Asignaturas</h2><span>{visibleCourses.length} en {planner.term}</span></div>
            <span className="term-course-count">3 ECTS cada una</span>
          </div>
          <label className="search-box">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar asignatura o código" />
            {query && <button onClick={() => setQuery("")} aria-label="Borrar búsqueda"><X size={14} /></button>}
          </label>
          <div className="filter-chips" aria-label="Filtrar por módulo">
            {["ALL", "M1", "M2", "M3"].map((module) => (
              <button key={module} className={moduleFilter === module ? "active" : ""} onClick={() => setModuleFilter(module)}>
                {module === "ALL" ? "Todas" : module}
              </button>
            ))}
          </div>
          <div className="course-list">
            {visibleCourses.map((course) => {
              const selected = selectedIds.includes(course.id);
              const hasSchedule = SESSIONS.some((session) => session.courseId === course.id);
              return (
                <article className={`course-card ${selected ? "selected" : ""}`} style={{ "--course-color": COURSE_COLORS[course.id] }} key={course.id}>
                  <button className="course-toggle" onClick={() => toggleCourse(course.id)} aria-pressed={selected}>
                    <span className={`check-box ${selected ? "checked" : ""}`}>{selected && <Check size={13} strokeWidth={3} />}</span>
                    <span className="course-copy">
                      <strong>{course.name}</strong>
                      <span><em className={`module-pill ${MODULE_COLORS[course.module]}`}>{course.module}</em>{course.id} · {course.ects} ECTS</span>
                    </span>
                  </button>
                  <a href={`/asignaturas/${course.slug}`} title="Abrir ficha" aria-label={`Ver ficha de ${course.name}`}><Info size={15} /></a>
                  {!hasSchedule && <span className="missing-time">Sin horario publicado</span>}
                </article>
              );
            })}
            {!visibleCourses.length && <div className="empty-search"><Search size={22} /><p>No hay asignaturas que coincidan.</p></div>}
          </div>
          <div className="course-panel-foot"><Info size={14} /><span>Haz clic para añadir o quitar asignaturas.</span></div>
        </aside>

        <section className="calendar-panel panel">
          <div className="panel-heading calendar-heading">
            <div><h2>{TERMS[planner.term].long}</h2><span>{TERMS[planner.term].date} · Puerta de Toledo</span></div>
            <div className="calendar-stats"><span><CalendarDays size={14} /> {scheduleStats.days} días</span><span><Clock3 size={14} /> 08:00–23:00</span></div>
          </div>
          <div className="calendar-scroll">
            <div className="calendar-grid">
              <div className="calendar-corner" />
              {DAYS.map((day) => <div className="day-head" key={day.id}><strong>{day.short}</strong><span>{day.label}</span></div>)}
              {DISPLAY_HOURS.map((hour, hourIndex) => (
                <React.Fragment key={hour}>
                  <div
                    className={`time-label hour-label ${hourIndex === DISPLAY_HOURS.length - 1 ? "last-hour" : ""}`}
                    style={{ gridColumn: 1, gridRow: `${hourIndex * 4 + 2} / span 4` }}
                  >
                    <strong>{String(hour).padStart(2, "0")}:00</strong>
                    {hourIndex === DISPLAY_HOURS.length - 1 && <span>23:00</span>}
                  </div>
                  {DAYS.map((day, dayIndex) => (
                    <div
                      className="calendar-cell hour-cell"
                      key={`${day.id}-${hour}`}
                      style={{ gridColumn: dayIndex + 2, gridRow: `${hourIndex * 4 + 2} / span 4` }}
                    />
                  ))}
                </React.Fragment>
              ))}
              {DAYS.flatMap((day, dayIndex) => {
                const groups = new Map();
                selectedTermSessions.filter((session) => session.day === day.id).forEach((session) => {
                  const times = sessionTimes(session);
                  const key = `${times.start}-${times.end}`;
                  groups.set(key, [...(groups.get(key) ?? []), session]);
                });
                return [...groups.entries()].map(([timeKey, sessions]) => {
                const isConflict = new Set(sessions.map((session) => session.courseId)).size > 1;
                const position = sessionGridPosition(sessions[0]);
                return (
                  <div
                    className={`calendar-event-stack ${isConflict ? "conflict" : ""}`}
                    key={`${day.id}-${timeKey}`}
                    style={{ gridColumn: dayIndex + 2, gridRow: `${position.row} / span ${position.span}` }}
                  >
                    {sessions.map((session) => {
                      const course = COURSES.find((item) => item.id === session.courseId);
                      const times = sessionTimes(session);
                      return (
                        <button className="event course-colored" style={{ "--course-color": COURSE_COLORS[course.id] }} key={`${course.id}-${session.lab}-${session.note}-${session.date ?? "weekly"}`} onClick={() => toggleCourse(course.id)} title="Quitar del horario">
                          <span>{course.short}</span>
                          <small>{times.start}–{times.end} · {course.module}{session.lab ? " · INF" : ""}{session.note ? ` · ${session.note}` : ""}</small>
                        </button>
                      );
                    })}
                    {isConflict && <span className="conflict-flag"><AlertTriangle size={11} /> Solape</span>}
                  </div>
                );
              });
              })}
            </div>
          </div>
          <div className="calendar-legend course-color-legend">
            {selectedCourses.filter((course) => course.term === planner.term).map((course) => (
              <span key={course.id}><i className="legend-dot" style={{ background: COURSE_COLORS[course.id] }} /> {course.short}</span>
            ))}
            {!selectedCourses.some((course) => course.term === planner.term) && <span><i className="legend-dot color-wheel" /> Cada asignatura tiene su propio color</span>}
            <span className="official-note"><CircleAlert size={14} /> Verifica siempre fechas y aulas en la fuente oficial.</span>
          </div>
        </section>

        <aside className="summary-panel panel">
          <div className="panel-heading"><div><h2>Mi plan</h2><span>Se guarda automáticamente</span></div><Check size={17} className="autosave-icon" /></div>
          <div className="summary-view-tabs" aria-label="Nivel de validación">
            {["GENERAL", "S1", "S2", "S3", "S4"].map((view) => (
              <button
                key={view}
                className={summaryView === view ? "active" : ""}
                onClick={() => {
                  setSummaryView(view);
                  if (view !== "GENERAL") setPlanner((current) => ({ ...current, term: view }));
                }}
              >{view === "GENERAL" ? "General" : view}</button>
            ))}
          </div>

          {summaryView === "GENERAL" ? (
            <>
              <div className={`verdict ${planValid ? "success" : allConflicts ? "danger" : "progress"}`}>
                <span className="verdict-icon">{planValid ? <Check size={18} /> : allConflicts ? <AlertTriangle size={18} /> : <BookOpen size={18} />}</span>
                <div><strong>{planValid ? "Plan completo" : allConflicts ? `${allConflicts} solapamiento${allConflicts > 1 ? "s" : ""} en el año` : "Plan en construcción"}</strong><p>{planValid ? "Cumple las reglas globales y de S1–S4." : allConflicts ? "Abre cada semicuatrimestre para revisarlos." : "Revisa los créditos globales y la distribución por periodo."}</p></div>
              </div>

              <div className="degree-total">
                <div><span>Créditos del máster</span><strong>{totalDegree}<small>/60 ECTS</small></strong></div>
                <div className="progress-track"><span style={{ width: `${Math.min(100, (totalDegree / 60) * 100)}%` }} /></div>
                <p>{credits.total} ECTS de docencia + 12 de prácticas y TFM</p>
              </div>

              <div className="requirements">
                {["M1", "M2", "M3"].map((module) => {
                  const meta = MODULES[module];
                  const value = credits[module];
                  const valid = value >= meta.min && value <= meta.max;
                  return (
                    <div className="requirement" key={module}>
                      <div className="requirement-head">
                        <span><i className={`legend-dot ${MODULE_COLORS[module]}`} /> {meta.short}</span>
                        <strong className={valid ? "valid" : ""}>{value} <small>/ {meta.min}–{meta.max}</small></strong>
                      </div>
                      <div className="mini-progress"><span className={MODULE_COLORS[module]} style={{ width: `${Math.min(100, (value / meta.max) * 100)}%` }} /></div>
                      <p>{meta.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="fixed-credits"><span><FileText size={16} /> Prácticas + TFM</span><strong>12 ECTS</strong></div>

              <div className="term-overview">
                <h3>Distribución por semicuatrimestre</h3>
                {Object.entries(termBreakdown).map(([term, data]) => (
                  <button key={term} onClick={() => { setSummaryView(term); setPlanner((current) => ({ ...current, term })); }}>
                    <span className={`term-status ${data.valid ? "valid" : "pending"}`}>{data.valid ? <Check size={12} /> : <CircleAlert size={12} />}</span>
                    <span><strong>{term}</strong><small>{data.courses.length} asignaturas · {data.days} días</small></span>
                    <b>{data.total}<small>{term === "S1" || term === "S2" ? "/15" : term === "S3" ? "/9–15" : "/15–21"}</small></b>
                    <ChevronDown size={14} />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={`verdict ${summaryTerm.valid ? "success" : summaryTerm.conflicts.length ? "danger" : "progress"}`}>
                <span className="verdict-icon">{summaryTerm.valid ? <Check size={18} /> : summaryTerm.conflicts.length ? <AlertTriangle size={18} /> : <BookOpen size={18} />}</span>
                <div><strong>{summaryTerm.valid ? `${summaryView} está completo` : `${summaryView} necesita revisión`}</strong><p>{summaryTerm.valid ? "Cumple la carga, composición y horario." : "Comprueba las reglas detalladas de este periodo."}</p></div>
              </div>

              <div className="term-credit-total">
                <div><span>{TERMS[summaryView].long}</span><strong>{summaryTerm.total}<small> ECTS</small></strong></div>
                <p>{summaryTerm.teaching} de docencia{summaryTerm.fixed ? ` + ${summaryTerm.fixed} de prácticas y TFM` : ""}</p>
                <div><span><CalendarDays size={13} /> {summaryTerm.days} días por semana</span><span><Clock3 size={13} /> hasta {summaryTerm.end}</span></div>
              </div>

              <div className="term-checks">
                <h3>Restricciones de {summaryView}</h3>
                {summaryTerm.checks.map((check) => (
                  <div className={check.valid ? "valid" : "invalid"} key={check.label}>
                    <span>{check.valid ? <Check size={13} /> : <X size={13} />}</span>
                    <p><strong>{check.label}</strong><small>{check.value}</small></p>
                  </div>
                ))}
              </div>

              <div className="term-course-summary">
                <h3>Asignaturas seleccionadas</h3>
                {summaryTerm.courses.length ? summaryTerm.courses.map((course) => (
                  <button key={course.id} onClick={() => toggleCourse(course.id)} title="Quitar del plan">
                    <i className="legend-dot" style={{ background: COURSE_COLORS[course.id] }} /><span>{course.short}<small>{course.module} · {course.ects} ECTS</small></span><X size={12} />
                  </button>
                )) : <p className="term-empty">Todavía no has elegido asignaturas para {summaryView}.</p>}
              </div>

              {summaryTerm.conflicts.length > 0 && (
                <div className="conflict-list">
                  <h3><AlertTriangle size={15} /> Conflictos en {summaryView}</h3>
                  {summaryTerm.conflicts.map((conflict) => {
                    const day = DAYS.find((item) => item.id === conflict.day);
                    return <p key={conflict.key}><strong>{day.label}, {conflict.start}–{conflict.end}</strong>{conflict.ids.map((id) => COURSES.find((course) => course.id === id)?.short).join(" · ")}</p>;
                  })}
                </div>
              )}
            </>
          )}

          <div className="summary-actions">
            <button className="button primary wide" onClick={exportCalendar}><Download size={16} /> Exportar calendario</button>
            <button className="button secondary wide" onClick={share}><Copy size={16} /> Copiar enlace</button>
          </div>
        </aside>
      </main>

      <SiteFooter />
      {notice && <div className="toast" role="status"><Check size={15} /> {notice}</div>}
    </div>
  );
}

function RootApp() {
  const path = decodeURIComponent(window.location.pathname).replace(/\/$/, "") || "/";
  if (path === "/") return <PlannerPage />;
  if (path === "/asignaturas") return <CourseCatalog />;
  if (path.startsWith("/asignaturas/")) return <CourseDetail slug={path.split("/").pop()} />;
  if (path === "/guia") return <GuideHub />;
  if (path.startsWith("/guia/")) return <GuideArticle slug={path.split("/").pop()} />;
  if (path === "/sobre-el-proyecto") return <AboutPage />;
  return <NotFound />;
}

createRoot(document.getElementById("root")).render(<RootApp />);
