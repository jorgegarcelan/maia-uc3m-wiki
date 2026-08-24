---
name: comparador-horarios
description: Detecta solapamientos entre asignaturas del MAIA y muestra parrilla semanal (Grupo 1). Úsala cuando el usuario pregunte si dos o más asignaturas chocan, compatibilidad de horario, o quiera ver la cuadrícula S1–S4.
---

# Comparador de horarios MAIA

Analiza **solapes** en el horario del **Grupo 1** (sesiones publicadas entre 14:30 y 21:00, Puerta de Toledo) usando la wiki.

## Fuentes

- `wiki/cursos/2026-2027/horarios.md` — tablas por S1, S2, S3, S4
- `wiki/asignaturas.md` — nombres abreviados que aparecen en la parrilla (p. ej. PLN, INF)
- Datos exactos del planificador: `src/data.js`
- Configurador visual: <https://maia-uc3m-wiki.vercel.app/> → skill `configurador-horario`

## Qué hacer

1. Pide al usuario la **lista de asignaturas** (o semicuatrimestre concreto) si no la dio.
2. Para cada **semicuatrimestre** relevante, localiza en el horario en qué **día + intervalo exacto** cae cada asignatura.
3. Detecta **conflictos por intersección real de horas**, incluyendo la sesión especial de las 14:30 y las sesiones de Inteligencia Ambiental que empiezan a las 16:30.
4. Presenta:
   - Lista de **solapes** (si hay).
   - **Parrilla ASCII o tabla** resumida solo con las asignaturas elegidas.
   - Asignaturas **sin conflicto** entre sí en ese semi.
5. Avisa: sesiones **(INF)** u horarios especiales (notas al pie en `horarios.md`); fechas exactas en web oficial UC3M.

## Formato sugerido de conflicto

```
S1 — Conflicto: Martes 17:45–19:15
  - Redes de Neuronas
  - Aprend. Series Temporales
```

## Si no hay datos en la wiki

Indica qué asignatura no aparece en la parrilla del semi y enlaza horarios oficiales plan 475.
