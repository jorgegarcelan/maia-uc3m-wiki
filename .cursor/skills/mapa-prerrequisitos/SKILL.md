---
name: mapa-prerrequisitos
description: Muestra prerrequisitos y orden recomendado entre asignaturas MAIA. Úsala cuando el usuario pregunte qué conviene cursar antes, dependencias, base para deep learning, NLP, robótica, etc.
---

# Mapa de prerrequisitos MAIA

La wiki documenta prerrequisitos **por asignatura** en cada ficha (`## Prerrequisitos`). No hay un grafo único centralizado: hay que **leer las fichas** implicadas.

## Fuentes

- `wiki/asignaturas.md` — listado y semicuatrimestre
- `wiki/asignaturas/<nombre>.md` — sección **Prerrequisitos** y temario
- `wiki/plan-de-estudios.md` — agrupación por materias

## Qué hacer

1. Identifica las asignaturas objetivo del usuario (p. ej. Aprendizaje Profundo, PLN, Robótica).
2. Lee la sección **Prerrequisitos** de cada ficha en `wiki/asignaturas/`.
3. Construye:
   - **Lista** de conocimientos o asignaturas previas citadas en la wiki.
   - **Orden sugerido** respetando el **semicuatrimestre** del catálogo (no matricular en S2 lo que la wiki sitúa en S3 salvo que el usuario ya lo tenga aprobado).
   - Diagrama **mermaid** `flowchart TD` si hay varias dependencias (opcional).
4. Relaciona con el **itinerario del máster**: muchas fichas piden *Cálculo, Programación, Métodos Numéricos* como base general del máster.

## Heurísticas del plan (cuando la ficha es genérica)

| Objetivo | Suele apoyarse en (según fichas y catálogo) |
|----------|-----------------------------------------------|
| Aprendizaje Profundo (S2) | Aprendizaje Automático (S1), Redes de Neuronas (S1) |
| PLN (S2) | AA, bases probabilísticas |
| Visión / Robótica (S3) | AA, Redes o Aprendizaje Profundo en S2 |
| Refuerzo, Planificación (S2) | AA, Métodos Probabilísticos, Representación del Conocimiento |

**Siempre** contrasta con el texto exacto de cada `wiki/asignaturas/*.md`; no inventes prerrequisitos no escritos.

## Salida

- Resumen en español.
- Enlaces relativos a fichas wiki.
- Si faltan datos en una ficha, dilo explícitamente.
