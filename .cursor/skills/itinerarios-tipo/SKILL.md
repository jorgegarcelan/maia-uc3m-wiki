---
name: itinerarios-tipo
description: Recomienda itinerarios de matrícula MAIA por perfil (ML Engineer, NLP, visión, robótica, sector aplicado, emprendimiento). Úsala cuando el usuario pida un camino tipo, perfil profesional o no sepa por dónde empezar.
---

# Itinerarios tipo MAIA

Propón un **itinerario orientativo** (no único ni oficial) alineado con la wiki. Luego el usuario puede afinarlo con `plan-master` o `comparador-horarios`.

## Fuentes

- `wiki/asignaturas.md`, `wiki/cursos/2026-2027/semicuatrimestres.md`, `wiki/plan-de-estudios.md`
- Fichas en `wiki/cursos/2026-2027/asignaturas/*.md` para detalle

## Perfiles predefinidos

Ajusta códigos y nombres leyendo `wiki/asignaturas.md`. Resumen orientativo:

### ML Engineer / Deep Learning

| Semi | Asignaturas orientativas |
|------|--------------------------|
| S1 | Aprendizaje Automático (19204), Redes de Neuronas (19203), Métodos Probabilísticos (19201) + Éticas (19197) |
| S2 | Aprendizaje Profundo (19206), Refuerzo (19209), Razonamiento con Incertidumbre (19208) u otra optativa compatible |
| S3 | Visión Artificial (19217), PLN (19211) u otra técnica M2 |
| S4 | Prácticas (19226) + TFM (19227) + opcional Analítica de Negocio (19210) |

### NLP / lenguaje

| Semi | Asignaturas orientativas |
|------|--------------------------|
| S1 | AA (19204), Agentes (19205), Métodos Prob. (19201) + Éticas |
| S2 | PLN (19211), Aprendizaje Profundo (19206), Planificación Automática (19207) |
| S3 | Web Semántica (19213), IA en Educación (19214) si encaja |
| S4 | Prácticas + TFM |

### Robótica / autónomos

| Semi | Asignaturas orientativas |
|------|--------------------------|
| S1 | AA, Búsqueda y Optimización (19200), Agentes (19205) + Éticas |
| S2 | Vehículos Autónomos (19212), Planificación (19207), Refuerzo (19209) |
| S3 | Robótica Inteligente (19219), Visión (19217) |
| S4 | Prácticas + TFM + Fábricas Inteligentes (19222) opcional |

### Visión / percepción

| Semi | Asignaturas orientativas |
|------|--------------------------|
| S1 | AA, Redes, Computación Evolutiva o Búsqueda + Éticas |
| S2 | Aprendizaje Profundo, Inteligencia Ambiental (19224) o Vehículos |
| S3 | Visión Artificial, Robótica |
| S4 | Prácticas + TFM |

### Sector aplicado (salud / finanzas / sostenibilidad)

| Semi | Asignaturas orientativas |
|------|--------------------------|
| S1–S2 | Base M1 razonable (AA + una técnica) + relleno M2 según interés |
| S3 | IA en Salud (19216), IA en Finanzas (19215), IA y Desarrollo Sostenible (19218) — **elegir según cupo M2** |
| S4 | Prácticas + TFM + Ciudades Inteligentes (19223) o Analítica (19210) |

### Emprendimiento / producto

| Semi | Asignaturas orientativas |
|------|--------------------------|
| S1–S3 | Mix técnico ligero + M2 aplicado |
| S4 | Emprendimiento en IA (19225), Analítica de Negocio (19210), Prácticas + TFM |

## Qué hacer

1. Pregunta **perfil** o infiere por el mensaje del usuario.
2. Entrega itinerario **S1→S4** con códigos, ECTS por asignatura (3 salvo prácticas/TFM) y totales M1/M2/M3.
3. Menciona **alternativas** (una asignatura sustituta del mismo semi en `asignaturas.md`).
4. Invita a validar horarios con `comparador-horarios` o `configurador-horario`.
5. Comprueba que el resultado suma 60 ECTS y respeta M1 15–24, M2 18–30 y M3 3–6 ECTS.
