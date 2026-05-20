---
name: configurador-horario
description: Abre el configurador visual de horarios MAIA UC3M en el navegador. Úsala cuando el usuario diga "abre el configurador", "configurar horario", "abre el horario", "elegir asignaturas", "planificar mi máster", "abre el planner", "ver horario visual" o similares.
---

# Configurador de Horario MAIA — Skill

Esta skill abre `tools/horario/index.html` en el navegador por defecto del usuario para que pueda configurar su horario de forma visual (elegir asignaturas, ver ECTS por módulo, exportar a `.ics`, etc.).

## Cuándo dispararse

Cuando el usuario pida cosas como:

- "abre el configurador de horario"
- "configurar mi horario"
- "quiero elegir mis asignaturas"
- "ábreme el planner de horarios"
- "vamos a planificar el máster"
- "abre el horario visual"

## Qué hacer

1. **Confirma la ubicación del archivo**: debe existir en `tools/horario/index.html` desde la raíz del repo. Si no existe, avisa al usuario.

2. **Ábrelo en el navegador** con el comando apropiado al sistema operativo:

   ```bash
   # macOS
   open "tools/horario/index.html"

   # Linux
   xdg-open "tools/horario/index.html"

   # Windows (Git Bash)
   start "tools/horario/index.html"
   ```

   Detecta el SO con `uname` si no estás seguro. En este repo el usuario trabaja en macOS, así que `open` es el comando por defecto.

3. **Confirma al usuario** brevemente que el configurador está abierto y recuérdale las funciones principales:
   - Click en celdas → marcar asignaturas como cursadas
   - Selector S1/S2/S3/S4/Año → cambiar semicuatrimestre
   - Plantillas → cargar planes predefinidos (técnico, aplicado, equilibrado, mínimo)
   - Botón "Exportar a calendario (.ics)" → descargar para Google/Apple Calendar
   - La selección se guarda automáticamente en el navegador

## Notas

- El archivo es autocontenido (HTML + CSS + JS vanilla), no requiere servidor ni dependencias.
- La selección persiste en `localStorage` del navegador, así que si lo abre en otro navegador o ventana de incógnito empezará vacío.
- Datos de horario y asignaturas embebidos desde `wiki/horarios.md` y `wiki/asignaturas.md`.
