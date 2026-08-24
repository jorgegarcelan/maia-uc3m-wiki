import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  ExternalLink,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Info,
  Layers3,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { COURSE_COLORS, COURSES, DAYS, MODULES, SESSIONS, SLOTS, TERMS } from "./data";

const wikiFiles = {
  ...import.meta.glob("../wiki/*.md", { query: "?raw", import: "default", eager: true }),
  ...import.meta.glob("../wiki/cursos/2026-2027/**/*.md", { query: "?raw", import: "default", eager: true }),
};

const ACTIVE_ACADEMIC_YEAR = "2026-2027";
const ACTIVE_COURSE_ROOT = `../wiki/cursos/${ACTIVE_ACADEMIC_YEAR}`;

const MODULE_CLASS = { M1: "blue", M2: "teal", M3: "amber" };

const GUIDE_ARTICLES = [
  { slug: "plan-de-estudios", title: "Plan de estudios", description: "Distribución de créditos, módulos y reglas para completar el máster.", icon: Layers3, group: "Planificación" },
  { slug: "asignaturas", title: "Asignaturas", description: "Catálogo completo de optativas, códigos, ECTS y semicuatrimestres.", icon: BookOpen, group: "Planificación", href: "/asignaturas" },
  { slug: "semicuatrimestres", title: "Semicuatrimestres", description: "Cómo se organiza el curso y qué se imparte en cada periodo.", icon: CalendarDays, group: "Planificación" },
  { slug: "horarios", title: "Horarios", description: "Franjas, aulas habituales y calendario semanal del Grupo 1.", icon: Clock3, group: "Planificación" },
  { slug: "admision-y-requisitos", title: "Admisión y requisitos", description: "Perfil de acceso, documentación, plazos y criterios de admisión.", icon: GraduationCap, group: "Acceso y matrícula" },
  { slug: "matricula-y-precios", title: "Matrícula y precios", description: "Coste por crédito, reserva de plaza y proceso de matrícula.", icon: Banknote, group: "Acceso y matrícula" },
  { slug: "becas", title: "Becas", description: "Ayudas públicas, becas UC3M y opciones de financiación.", icon: Sparkles, group: "Acceso y matrícula" },
  { slug: "complementos-formativos", title: "Complementos formativos", description: "Formación adicional según el perfil académico de entrada.", icon: BookOpen, group: "Acceso y matrícula" },
  { slug: "practicas-tfm", title: "Prácticas y TFM", description: "Organización, créditos, empresas y trabajo de fin de máster.", icon: BriefcaseBusiness, group: "Durante el máster" },
  { slug: "campus", title: "Campus", description: "Puerta de Toledo, transporte, espacios y servicios disponibles.", icon: MapPin, group: "Durante el máster" },
  { slug: "recursos-herramientas", title: "Recursos y herramientas", description: "Software, plataformas y recursos utilizados en las asignaturas.", icon: Sparkles, group: "Durante el máster" },
  { slug: "usar-con-ia", title: "Usar la wiki con IA", description: "Instala las skills en Cursor o Claude y aprende a preguntar con contexto.", icon: Code2, group: "Durante el máster" },
  { slug: "profesorado", title: "Profesorado", description: "Docentes y áreas vinculadas con el programa.", icon: Users, group: "Comunidad y ayuda" },
  { slug: "faq", title: "Preguntas frecuentes", description: "Respuestas directas a las dudas más habituales.", icon: CircleHelp, group: "Comunidad y ayuda" },
  { slug: "contactos", title: "Contactos", description: "Coordinación, secretaría y canales útiles de la Universidad.", icon: Users, group: "Comunidad y ayuda" },
  { slug: "doble-master", title: "Doble máster", description: "Información para el itinerario conjunto con Ingeniería Informática.", icon: GraduationCap, group: "Comunidad y ayuda" },
];

function articleHref(article) {
  return article.href ?? `/guia/${article.slug}`;
}

function CampusMap() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    let map;
    let cancelled = false;

    import("maplibre-gl").then(({ default: maplibregl }) => {
      if (cancelled || !containerRef.current) return;
      map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: [-3.711, 40.4084],
        zoom: 15.25,
        attributionControl: false,
        cooperativeGestures: true,
      });

      map.scrollZoom.disable();
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
      new maplibregl.Marker({ color: "#563af3" }).setLngLat([-3.711, 40.4084]).addTo(map);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return <div className="campus-map-canvas" ref={containerRef} aria-label="Mapa interactivo del Campus Madrid - Puerta de Toledo" />;
}

export function SiteHeader({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Inicio de MAIA Wiki">
        <img className="brand-lockup-image" src="/maia_logo.png" alt="MAIA · Wiki Máster IAA UC3M" />
      </a>
      <nav className={open ? "nav-links is-open" : "nav-links"}>
        <a className={active === "planner" ? "active" : ""} href="/">Planificador</a>
        <a className={active === "courses" ? "active" : ""} href="/asignaturas">Asignaturas</a>
        <a className={active === "guide" ? "active" : ""} href="/guia">Guía del máster</a>
        <a className={active === "about" ? "active" : ""} href="/sobre-el-proyecto">Sobre el proyecto</a>
        <a href="https://aplicaciones.uc3m.es/horarios-web/publicacion/master.page?plan=475&centro=4" target="_blank" rel="noreferrer">Horario oficial <ExternalLink size={13} /></a>
      </nav>
      <div className="topbar-actions">
        <span className="academic-year">Curso 2026/27</span>
        <button className="icon-button menu-button" onClick={() => setOpen((value) => !value)} aria-label="Abrir navegación"><Menu size={20} /></button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-identity"><span className="footer-wordmark"><img src="/maia_logo_letras.png" alt="MAIA · Wiki Máster IAA UC3M" /></span><span>Un proyecto estudiantil, no oficial, para el Máster en IA Aplicada de la UC3M.</span></div>
      <div><a href="/sobre-el-proyecto">Sobre el proyecto</a><a href="/guia/usar-con-ia">Usar con IA</a><a href="https://www.uc3m.es/master/inteligencia-artificial-aplicada" target="_blank" rel="noreferrer">Web oficial</a><a href="https://github.com/jorgegarcelan/maia-uc3m-wiki" target="_blank" rel="noreferrer">GitHub</a><span>Datos 2026/27</span></div>
    </footer>
  );
}

function ContentHero({ eyebrow, title, description, children }) {
  return (
    <section className="content-hero">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

export function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [module, setModule] = useState("ALL");
  const [term, setTerm] = useState("ALL");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return COURSES.filter((course) => {
      const matchesQuery = !normalized || `${course.name} ${course.area} ${course.id}`.toLocaleLowerCase("es").includes(normalized);
      return matchesQuery && (module === "ALL" || course.module === module) && (term === "ALL" || course.term === term);
    });
  }, [module, query, term]);

  return (
    <div className="app-shell content-shell">
      <SiteHeader active="courses" />
      <ContentHero eyebrow="Explora el programa" title="Asignaturas del MAIA" description="Compara las 27 asignaturas por módulo, área y semicuatrimestre antes de llevarlas a tu horario.">
        <div className="hero-stat-row">
          <span><strong>27</strong> asignaturas</span><span><strong>3</strong> módulos</span><span><strong>4</strong> semicuatrimestres</span>
        </div>
      </ContentHero>

      <main className="catalog-main">
        <section className="catalog-toolbar" aria-label="Filtros de asignaturas">
          <label className="catalog-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, código o área" /></label>
          <div className="catalog-filter-group">
            <span>Módulo</span>
            {["ALL", "M1", "M2", "M3"].map((item) => <button className={module === item ? "active" : ""} onClick={() => setModule(item)} key={item}>{item === "ALL" ? "Todos" : item}</button>)}
          </div>
          <div className="catalog-filter-group">
            <span>Periodo</span>
            {["ALL", "S1", "S2", "S3", "S4"].map((item) => <button className={term === item ? "active" : ""} onClick={() => setTerm(item)} key={item}>{item === "ALL" ? "Todo el año" : item}</button>)}
          </div>
        </section>

        <div className="catalog-results-head"><div><h2>Catálogo</h2><p>{filtered.length} resultados</p></div><a className="button primary" href="/"><CalendarDays size={16} /> Abrir planificador</a></div>
        <section className="course-catalog-grid">
          {filtered.map((course) => {
            const sessions = SESSIONS.filter((session) => session.courseId === course.id);
            const days = [...new Set(sessions.map((session) => DAYS.find((day) => day.id === session.day)?.short))].join(" · ");
            return (
              <a className="catalog-course-card" style={{ "--course-color": COURSE_COLORS[course.id] }} href={`/asignaturas/${course.slug}`} key={course.id}>
                <div className="catalog-card-top"><span className={`module-badge ${MODULE_CLASS[course.module]}`}>{course.module}</span><span>{course.id}</span><ChevronRight size={18} /></div>
                <div className="catalog-card-accent course-accent" />
                <h3>{course.name}</h3>
                <p>{course.area}</p>
                <div className="catalog-card-meta"><span><BookOpen size={14} /> {course.ects} ECTS</span><span><CalendarDays size={14} /> {course.term}</span><span><Clock3 size={14} /> {days || "Por publicar"}</span></div>
                <span className="catalog-card-link">Ver ficha <ArrowRight size={15} /></span>
              </a>
            );
          })}
        </section>
        {!filtered.length && <div className="catalog-empty"><Search size={28} /><h3>No encontramos esa asignatura</h3><p>Prueba con otro nombre, área o filtro.</p></div>}
      </main>
      <SiteFooter />
    </div>
  );
}

function MarkdownContent({ content }) {
  const link = ({ href = "", children, ...props }) => {
    if (href.endsWith(".md")) {
      const clean = href.replace(/^\.\//, "").replace(/\.md$/, "");
      const base = clean.split("/").pop();
      const target = base === "asignaturas" ? "/asignaturas" : base === "README" ? "/guia" : clean.startsWith("asignaturas/") ? `/asignaturas/${base}` : `/guia/${base}`;
      return <a href={target} {...props}>{children}</a>;
    }
    const external = href.startsWith("http");
    return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} {...props}>{children}{external && <ExternalLink size={12} />}</a>;
  };
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: link }}>{content}</ReactMarkdown>;
}

export function CourseDetail({ slug }) {
  const course = COURSES.find((item) => item.slug === slug);
  const content = wikiFiles[`${ACTIVE_COURSE_ROOT}/asignaturas/${slug}.md`];
  if (!course || !content) return <NotFound />;
  const sessions = SESSIONS.filter((session) => session.courseId === course.id);
  const weeklySessions = sessions.filter((session) => !session.date);
  const currentContent = content.replace(/\n## Horario \(Curso [^)]+\)[\s\S]*?(?=\n## )/, "");
  const related = COURSES.filter((item) => item.module === course.module && item.id !== course.id).slice(0, 3);

  return (
    <div className="app-shell content-shell">
      <SiteHeader active="courses" />
      <main className="detail-main">
        <a className="back-link" href="/asignaturas"><ArrowLeft size={16} /> Todas las asignaturas</a>
        <section className="course-detail-hero" style={{ "--course-color": COURSE_COLORS[course.id] }}>
          <div>
            <div className="detail-kicker"><span className={`module-badge ${MODULE_CLASS[course.module]}`}>{course.module}</span><span>{course.id}</span><span>{course.area}</span></div>
            <h1>{course.name}</h1>
            <p>{MODULES[course.module].label}</p>
          </div>
          <div className="course-facts"><span><strong>{course.ects}</strong> ECTS</span><span><strong>{course.term}</strong> {TERMS[course.term].date}</span><span><strong>{weeklySessions.length || "—"}</strong> sesiones semanales</span></div>
        </section>

        <div className="detail-layout">
          <article className="markdown-card markdown-body"><MarkdownContent content={currentContent} /></article>
          <aside className="detail-aside">
            <section className="detail-side-card">
              <h2><CalendarDays size={17} /> Horario semanal</h2>
              {sessions.length ? sessions.map((session) => {
                const day = DAYS.find((item) => item.id === session.day);
                const slot = SLOTS.find((item) => item.id === session.slot);
                const start = session.startTime ?? slot.start;
                const end = session.endTime ?? slot.end;
                return <div className="session-row" key={`${session.day}-${session.slot}-${session.date ?? "weekly"}`}><span><strong>{day.label}{session.date ? " · 28 sep" : ""}</strong>{session.note || (session.lab ? "Aula informática" : "Sesión presencial")}</span><b>{start}–{end}</b></div>;
              }) : <p className="side-empty"><Info size={15} /> El horario todavía no figura en la tabla publicada.</p>}
              <a className="button primary wide" href={`/?term=${course.term}&courses=${course.id}`}><CalendarDays size={16} /> Añadir al planificador</a>
            </section>
            <section className="detail-side-card official-card"><Info size={17} /><div><strong>Información estudiantil</strong><p>Contrasta fechas, aulas y normativa con las fuentes oficiales de la UC3M.</p></div></section>
          </aside>
        </div>

        <section className="related-section"><div><p className="eyebrow">También puede interesarte</p><h2>Más asignaturas de {course.module}</h2></div><div className="related-grid">{related.map((item) => <a href={`/asignaturas/${item.slug}`} key={item.id}><span>{item.term} · {item.ects} ECTS</span><strong>{item.name}</strong><ArrowRight size={16} /></a>)}</div></section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function GuideHub() {
  const groups = [...new Set(GUIDE_ARTICLES.map((article) => article.group))];
  return (
    <div className="app-shell content-shell">
      <SiteHeader active="guide" />
      <ContentHero eyebrow="Todo el máster, en un lugar" title="Guía del MAIA" description="Información práctica para decidir, matricularte y orientarte durante el curso.">
        <a className="button hero-button" href="/guia/faq"><CircleHelp size={17} /> Ir a preguntas frecuentes</a>
      </ContentHero>
      <main className="guide-main">
        <section className="guide-featured">
          <div><span className="guide-featured-icon"><CalendarDays /></span><p className="eyebrow">Herramienta destacada</p><h2>Construye un horario que cumpla el plan</h2><p>Selecciona asignaturas, encuentra solapamientos y revisa automáticamente los mínimos de cada módulo.</p><a className="button primary" href="/">Abrir el planificador <ArrowRight size={16} /></a></div>
          <div className="mini-schedule" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        </section>
        <section className="campus-map-section">
          <div className="campus-map-frame">
            <CampusMap />
          </div>
          <div className="campus-map-label"><span /> Campus MAIA</div>
          <div className="campus-map-copy">
            <p className="eyebrow">Dónde estamos</p>
            <h2>Campus Madrid · Puerta de Toledo</h2>
            <p>El MAIA se imparte en el campus de posgrado de la UC3M, en pleno centro de Madrid.</p>
            <div className="campus-map-facts">
              <div><MapPin size={18} /><span><strong>Dirección</strong>Ronda de Toledo, 1 · 28005 Madrid</span></div>
              <div><Clock3 size={18} /><span><strong>Transporte</strong>Metro Puerta de Toledo (L5), a unos minutos a pie</span></div>
            </div>
            <div className="campus-map-actions">
              <a className="button primary" href="https://www.google.com/maps/search/?api=1&amp;query=Universidad+Carlos+III+de+Madrid+Campus+Puerta+de+Toledo" target="_blank" rel="noreferrer">Cómo llegar <ExternalLink size={14} /></a>
              <a className="button secondary" href="https://www.uc3m.es/conocenos/campus/campus-madrid-puerta-de-toledo" target="_blank" rel="noreferrer">Información oficial</a>
            </div>
          </div>
        </section>
        {groups.map((group) => (
          <section className="guide-group" key={group}>
            <div className="guide-group-title"><span>{String(groups.indexOf(group) + 1).padStart(2, "0")}</span><div><h2>{group}</h2><p>{group === "Planificación" ? "Diseña el curso y entiende su estructura." : group === "Acceso y matrícula" ? "Todo lo necesario antes de empezar." : group === "Durante el máster" ? "Recursos para el día a día académico." : "Personas, respuestas y canales útiles."}</p></div></div>
            <div className="guide-card-grid">
              {GUIDE_ARTICLES.filter((article) => article.group === group).map((article) => {
                const Icon = article.icon;
                return <a className="guide-card" href={articleHref(article)} key={article.slug}><span className="guide-card-icon"><Icon size={19} /></span><div><h3>{article.title}</h3><p>{article.description}</p></div><ArrowRight size={17} /></a>;
              })}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}

export function GuideArticle({ slug }) {
  const article = GUIDE_ARTICLES.find((item) => item.slug === slug && !item.href);
  const versionedArticles = new Set(["horarios", "semicuatrimestres"]);
  const contentPath = versionedArticles.has(slug) ? `${ACTIVE_COURSE_ROOT}/${slug}.md` : `../wiki/${slug}.md`;
  const content = wikiFiles[contentPath];
  if (!article || !content) return <NotFound />;
  return (
    <div className="app-shell content-shell">
      <SiteHeader active="guide" />
      <main className="guide-article-main">
        <a className="back-link" href="/guia"><ArrowLeft size={16} /> Índice de la guía</a>
        <div className="guide-article-layout">
          <aside className="guide-sidebar">
            <p>En esta guía</p>
            {GUIDE_ARTICLES.filter((item) => !item.href).map((item) => <a className={item.slug === slug ? "active" : ""} href={`/guia/${item.slug}`} key={item.slug}>{item.title}<ChevronRight size={13} /></a>)}
          </aside>
          <article className="markdown-card markdown-body guide-article"><div className="article-title"><span>{article.group}</span><h1>{article.title}</h1><p>{article.description}</p></div><MarkdownContent content={content} /></article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="app-shell content-shell">
      <SiteHeader active="about" />
      <main className="about-main">
        <section className="about-hero">
          <div className="about-hero-copy">
            <p className="eyebrow">MAIA · UC3M</p>
            <h1>Una guía del máster hecha por quienes lo viven.</h1>
            <p>Asignaturas, horarios y recursos reunidos desde la experiencia estudiantil para entender el MAIA, organizarse mejor y tomar decisiones con menos dudas.</p>
            <div className="about-hero-actions"><a className="button about-primary" href="/">Planificar mi horario <ArrowRight size={16} /></a><a className="button about-secondary" href="/guia">Explorar la guía</a></div>
          </div>
          <div className="about-mark" aria-hidden="true">
            <img src="/maia_logo_icon.png" alt="" />
            <span>Wiki estudiantil · UC3M</span>
          </div>
        </section>

        <section className="about-intro">
          <div className="about-section-heading"><p className="eyebrow">El máster</p><h2>Inteligencia artificial que sale del aula</h2></div>
          <div className="about-intro-copy"><p>El <strong>Máster Universitario en Inteligencia Artificial Aplicada (MAIA)</strong> es un programa presencial de la Universidad Carlos III de Madrid orientado a conectar los fundamentos de la IA con aplicaciones reales.</p><p>Se imparte en el campus Madrid–Puerta de Toledo, en español, y concentra sus 60 ECTS en un curso académico organizado en cuatro semicuatrimestres.</p></div>
          <div className="about-stats">
            <div><strong>60</strong><span>ECTS</span><small>en un curso académico</small></div>
            <div><strong>27</strong><span>asignaturas</span><small>para diseñar tu itinerario</small></div>
            <div><strong>4</strong><span>semicuatrimestres</span><small>de septiembre a mayo</small></div>
            <div><strong>PT</strong><span>Puerta de Toledo</span><small>en el centro de Madrid</small></div>
          </div>
        </section>

        <section className="about-modules">
          <div className="about-section-heading"><p className="eyebrow">Una estructura flexible</p><h2>Fundamentos, aplicaciones y experiencia profesional</h2><p>El plan combina una base técnica sólida con la libertad de orientar las optativas hacia los ámbitos que más interesen a cada estudiante.</p></div>
          <div className="about-module-grid">
            <article><span>01</span><div className="about-module-icon blue"><Layers3 /></div><h3>Fundamentos y técnicas</h3><p>Aprendizaje automático, redes neuronales, optimización, planificación, métodos probabilísticos y razonamiento.</p><strong>15–24 ECTS</strong></article>
            <article><span>02</span><div className="about-module-icon violet"><Sparkles /></div><h3>Aplicaciones de la IA</h3><p>Lenguaje, visión, robótica, salud, finanzas, educación, ciudades, fábricas y otros dominios.</p><strong>18–30 ECTS</strong></article>
            <article><span>03</span><div className="about-module-icon cyan"><BriefcaseBusiness /></div><h3>Ética, prácticas y TFM</h3><p>Responsabilidad profesional, experiencia en empresa y un proyecto final que integra lo aprendido.</p><strong>15–18 ECTS</strong></article>
          </div>
        </section>

        <section className="about-project">
          <div className="about-project-copy">
            <p className="eyebrow">Por qué existe</p>
            <h2>La información útil no debería estar dispersa.</h2>
            <p>Horarios por un lado, fichas docentes por otro, reglas de matrícula en otra página. Este proyecto reúne esa información y la convierte en herramientas que ayudan a tomar decisiones.</p>
            <div className="about-values">
              <div><span><Target size={18} /></span><p><strong>Centralizar</strong>Una referencia clara para alumnos actuales y futuros.</p></div>
              <div><span><CalendarDays size={18} /></span><p><strong>Planificar</strong>Horarios, ECTS, módulos y solapamientos en una sola vista.</p></div>
              <div><span><Code2 size={18} /></span><p><strong>Construir en abierto</strong>Contenido reutilizable, verificable y abierto a contribuciones.</p></div>
              <div><span><HeartHandshake size={18} /></span><p><strong>Cuidar la comunidad</strong>Convertir la experiencia de cada promoción en ayuda para la siguiente.</p></div>
            </div>
          </div>
          <div className="about-project-visual" aria-hidden="true">
            <div className="project-node node-main"><img src="/maia_logo_icon.png" alt="" /><strong>MAIA Wiki</strong><span>Conocimiento compartido</span></div>
            <div className="project-node node-one"><BookOpen size={18} /><span>Guía</span></div>
            <div className="project-node node-two"><CalendarDays size={18} /><span>Horarios</span></div>
            <div className="project-node node-three"><GraduationCap size={18} /><span>Asignaturas</span></div>
            <div className="project-node node-four"><Users size={18} /><span>Comunidad</span></div>
          </div>
        </section>

        <section className="about-jorge">
          <div className="about-portrait"><img src="/jorge-garcelan.png" alt="Jorge Garcelán" /><span>Madrid · España</span></div>
          <div className="about-jorge-copy">
            <p className="eyebrow">Quién está detrás</p>
            <h2>Jorge Garcelán</h2>
            <div className="delegate-badge"><ShieldCheck size={17} /><span><strong>Delegado del MAIA</strong>2024–2025 · 2025–2026</span></div>
            <p>Estoy cursando el Máster en Inteligencia Artificial Aplicada de la UC3M y disfruto moviéndome entre la investigación y la creación de productos. Antes estudié Ciencia e Ingeniería de Datos, también en la UC3M, y pasé un curso de intercambio en Georgia Tech.</p>
            <p>Esta wiki nació de algo muy sencillo: como delegado, veía las mismas dudas aparecer una y otra vez, mientras la información estaba repartida entre documentos, webs y mensajes. Quise reunirla en un lugar claro que nos ayudara a todos a entender mejor el máster y tomar decisiones con menos fricción.</p>
            <p>Me gusta convertir ideas y resultados de investigación en herramientas que resuelvan problemas reales. Especialmente cuando la tecnología es responsable, está bien construida y acaba siendo útil para alguien.</p>
            <div className="about-jorge-links"><a className="button primary" href="https://jorgegarcelan.com" target="_blank" rel="noreferrer"><Globe2 size={16} /> jorgegarcelan.com <ExternalLink size={13} /></a><a className="button secondary" href="https://github.com/jorgegarcelan/maia-uc3m-wiki" target="_blank" rel="noreferrer">Ver el proyecto en GitHub</a></div>
          </div>
        </section>

        <section className="about-transparency">
          <div><ShieldCheck size={22} /><h2>Una fuente estudiantil, con fuentes oficiales</h2><p>Esta web no es una publicación oficial de la UC3M. La normativa, los horarios, las fechas y los precios deben verificarse siempre en los canales oficiales de la Universidad.</p></div>
          <div><Code2 size={22} /><h2>Abierta para seguir mejorando</h2><p>El contenido se mantiene en GitHub bajo licencia CC BY-SA 4.0. Se pueden proponer correcciones, actualizar información y contribuir nuevas herramientas.</p></div>
        </section>

        <section className="about-cta"><div><p className="eyebrow">Empieza por aquí</p><h2>Convierte la información en un plan.</h2><p>Explora las asignaturas y construye un horario que cumpla todas las restricciones del máster.</p></div><div><a className="button about-primary" href="/">Abrir el planificador <ArrowRight size={16} /></a><a className="button about-secondary" href="/asignaturas">Ver asignaturas</a></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function NotFound() {
  return <div className="app-shell content-shell"><SiteHeader /><main className="not-found"><span>404</span><h1>Esta página no existe</h1><p>Puede que el contenido se haya movido o que el enlace no sea correcto.</p><a className="button primary" href="/">Volver al planificador</a></main><SiteFooter /></div>;
}
