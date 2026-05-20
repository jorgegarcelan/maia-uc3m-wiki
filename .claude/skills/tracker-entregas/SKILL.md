---
name: tracker-entregas
description: Genera un tracker personal de entregas y evaluaciones por semicuatrimestre o asignatura MAIA. Úsala cuando el usuario pida organizar deadlines, calendario de trabajos, seguimiento de prácticas o planificar estudio.
---

# Tracker de entregas MAIA

Genera una **plantilla Markdown** personalizable. La wiki **no** incluye fechas de entrega por defecto; el usuario (o sus apuntes) aportan los hitos.

## Fuentes útiles

- `wiki/semicuatrimestres.md` — ventanas S1–S4 (2025/2026)
- `wiki/asignaturas.md` + `wiki/asignaturas/*.md` — nombres de asignaturas y coordinadores
- `wiki/horarios.md` — días de clase (para no confundir sesión con entrega)
- Calendario oficial UC3M (enlace en `wiki/README.md`)

## Qué hacer

1. Pregunta: **semicuatrimestre** o **lista de asignaturas**; si quiere tracker de **todo el curso** o solo un semi.
2. Pregunta (opcional): fechas de entregas conocidas, peso de evaluación, si trabaja a tiempo parcial.
3. Genera un archivo o bloque Markdown con tablas:

### Por asignatura (recomendado)

```markdown
| Asignatura | Tipo (examen / trabajo / lab) | Fecha límite | Estado | Notas |
|------------|-------------------------------|--------------|--------|-------|
| ...        | ...                           | YYYY-MM-DD   | ⬜     |       |
```

### Por semana (opcional)

Semanas alineadas con el periodo del semi en `wiki/semicuatrimestres.md`.

4. Incluye fila **Éticas (19197)** si el semi es S1.
5. Recuerda: actualizar fechas desde **Aula Global** y guías del profesor; la wiki no sustituye eso.

## Exportación

- Ofrece guardar como `tracker-<usuario>-S1.md` en la raíz o carpeta personal del usuario (no commitear datos personales al repo sin permiso).
- Sugiere exportar a calendario solo si el usuario pide integración (.ics) → `@configurador-horario` cubre horario de clases, no entregas.
