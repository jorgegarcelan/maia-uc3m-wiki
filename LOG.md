# Registro de actualizaciones de MAIA Wiki

Este archivo deja constancia de cuándo cambia la información de la wiki, qué archivos se han tocado y qué fuente se ha utilizado. No sustituye al historial de Git: funciona como un registro editorial legible para estudiantes y mantenedores.

## Cómo registrar una actualización

Cada entrada debe incluir:

- **Fecha:** día en formato `AAAA-MM-DD`.
- **Curso:** curso académico afectado o `General` si no depende de una edición.
- **Ámbito:** horarios, asignaturas, calendario, precios, skills, web, etc.
- **Archivos:** rutas concretas modificadas.
- **Fuente:** enlace oficial, documento o motivo del cambio.
- **Estado:** `verificado`, `pendiente de confirmación` o `histórico`.

Las entradas se añaden en orden cronológico inverso. Si un dato oficial aún no está publicado, debe conservarse el último dato confirmado y marcarse expresamente como pendiente; nunca se cambia solo el año del encabezado.

## Historial

### 2026-08-24 — Imagen para previews sociales

- **Curso:** General
- **Ámbito:** metadatos y difusión
- **Archivos:** `index.html` y `public/og.png`
- **Cambio:** se conectó la tarjeta social del Planificador MAIA mediante URLs absolutas y metadatos completos de Open Graph y X/Twitter.
- **Fuente:** identidad visual MAIA y URL de producción en Vercel
- **Estado:** verificado

### 2026-08-24 — Simplificación del README

- **Curso:** General
- **Ámbito:** documentación pública
- **Archivos:** `README.md`
- **Cambio:** se eliminó el bloque local de instalación y despliegue en Vercel; el README mantiene únicamente el acceso destacado a la web ya publicada.
- **Fuente:** decisión editorial del mantenedor
- **Estado:** verificado

### 2026-08-24 — Enlace público desde GitHub

- **Curso:** General
- **Ámbito:** difusión y acceso al planificador
- **Archivos:** `README.md` y metadatos del repositorio de GitHub
- **Cambio:** se añadió un acceso destacado al planificador en el README y se configuró la URL de producción como homepage del repositorio.
- **Fuente:** URL de producción en Vercel
- **Estado:** verificado

### 2026-08-24 — Documentación activa, skills y guía de uso con IA

- **Curso:** 2026-2027 y General
- **Ámbito:** fichas, calendario, admisión, precios, becas, TFM, ejemplos y skills
- **Archivos:** `wiki/cursos/2026-2027/asignaturas/`, documentos generales de `wiki/`, `ejemplos/`, `.agents/skills/`, `.cursor/skills/`, `.claude/skills/`, `wiki/usar-con-ia.md` y `scripts/sync-course-markdown.mjs`
- **Cambio:** se sincronizaron los horarios de las 27 fichas con el planificador; se actualizaron fechas y estados administrativos; se corrigieron las restricciones de M3 y el itinerario de Series Temporales; se añadió una guía para Cursor y Claude Code.
- **Fuentes:** web oficial del MAIA, horarios oficiales del Grupo 1, calendario específico MAIA 2026/2027, documentación oficial de Cursor Agent Skills y Claude Code Skills
- **Estado:** verificado; precios 2026/2027 pendientes de publicación definitiva
- **Despliegue:** producción publicada en <https://maia-uc3m-wiki.vercel.app/> (`dpl_5P8mrraoRVcXgtk2JFxR4X7BCKWr`)

### 2026-08-24 — Base de datos por curso académico

- **Curso:** General, 2025-2026 y 2026-2027
- **Ámbito:** estructura documental y trazabilidad
- **Archivos:** `LOG.md`, `wiki/cursos/`, `src/content-pages.jsx` y referencias internas de la wiki
- **Cambio:** las fichas de las 27 asignaturas y los documentos de horarios y semicuatrimestres pasan a guardarse por curso académico. Se conserva 2025-2026 como snapshot histórico y 2026-2027 como edición activa.
- **Fuente:** reorganización editorial solicitada por el mantenedor del proyecto
- **Estado:** verificado

### 2026-08-24 — Horarios 2026-2027

- **Curso:** 2026-2027
- **Ámbito:** horarios y planificador
- **Archivos:** `wiki/cursos/2026-2027/horarios.md`, `wiki/cursos/2026-2027/semicuatrimestres.md` y `src/data.js`
- **Cambio:** actualización de las franjas, días, aulas y fechas publicadas para el Grupo 1; se añadieron excepciones de calendario y una sesión a las 14:30.
- **Fuente:** [horario oficial del primer cuatrimestre](https://aplicaciones.uc3m.es/horarios-web/publicacion/2026/porCentroPlanCursoGrupo.tt?plan=475&centro=4&curso=1&grupo=1&tipoPer=C&valorPer=1) y [horario oficial del segundo cuatrimestre](https://aplicaciones.uc3m.es/horarios-web/publicacion/2026/porCentroPlanCursoGrupo.tt?plan=475&centro=4&curso=1&grupo=1&tipoPer=C&valorPer=2)
- **Estado:** verificado el 2026-08-24; los horarios oficiales pueden cambiar

## Estructura versionada

```text
wiki/cursos/
├── 2025-2026/
│   ├── README.md
│   ├── horarios.md
│   ├── semicuatrimestres.md
│   └── asignaturas/
└── 2026-2027/
    ├── README.md
    ├── horarios.md
    ├── semicuatrimestres.md
    └── asignaturas/
```

La edición que consume la web se declara en `src/content-pages.jsx`. Al abrir un nuevo curso hay que copiar la última edición, actualizar únicamente los datos confirmados, cambiar esa referencia y añadir una entrada a este registro.
