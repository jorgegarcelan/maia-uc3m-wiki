---
name: plan-master
description: Genera un plan de matrícula MAIA personalizado (ECTS por módulo y semicuatrimestre). Úsala cuando el usuario pida qué asignaturas coger, planificar el máster, repartir optativas, cumplir M1/M2 o elegir por intereses (ML, NLP, visión, sector).
---

# Plan de matrícula MAIA

Construye un **plan por semicuatrimestre (S1–S4)** válido según la wiki. No sustituye la secretaría ni la matrícula oficial.

## Fuentes obligatorias

- `wiki/plan-de-estudios.md` — módulos y límites ECTS (M1: 15–24, M2: 18–30, M3: 3–6)
- `wiki/cursos/2026-2027/semicuatrimestres.md` — ECTS por semi y qué bloques tocan en cada uno
- `wiki/asignaturas.md` — códigos, nombres y semicuatrimestre de cada optativa
- `wiki/cursos/2026-2027/horarios.md` — si el usuario pide compatibilidad horaria (avisar solapes; usar `comparador-horarios` para detalle)

## Pregunta al usuario (si falta información)

- Intereses (ML clásico, deep learning, NLP, robótica, visión, sector salud/finanzas, emprendimiento…)
- Restricciones: trabajo por las tardes, asignaturas ya aprobadas, preferencia de carga en S3/S4
- Si solo quiere orientación genérica, ofrece **dos variantes** (p. ej. más técnico vs más aplicado)

## Reglas a validar en el plan

| Regla | Detalle |
|-------|---------|
| Total máster | 60 ECTS (3 ética + 45 opt. + 6 prácticas + 6 TFM) |
| S1 | 15 ECTS: **19197** Éticas (3) + **12 ECTS M1** en optativas de S1 |
| S2 | 15 ECTS: mezcla **M1 y M2** según `semicuatrimestres.md` |
| S3 | **9–15 ECTS**, solo **M2** |
| S4 | **Prácticas + TFM** + **1–3 optativas** (15–21 ECTS en el semi según wiki) |
| Módulos | M1 ∈ [15,24], M2 ∈ [18,30], M3 ∈ [3,6]; Éticas (19197) aporta los 3 ECTS obligatorios de M3 |

## Formato de salida

1. Tabla **S1 | S2 | S3 | S4** con asignatura (código), ECTS y módulo.
2. Resumen: totales por módulo y por semi.
3. Notas: posibles solapes horarios, enlaces a fichas `wiki/cursos/2026-2027/asignaturas/...`.
4. Recordatorio: verificar en [horarios oficiales UC3M](https://aplicaciones.uc3m.es/horarios-web/publicacion/master.page?plan=475&centro=4).

## Ejemplos en el repo

- `ejemplos/01-asignaturas-disponibles.md`
- `ejemplos/02-primer-semicuatrimestre.md`
