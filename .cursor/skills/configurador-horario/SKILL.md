---
name: configurador-horario
description: Abre el configurador visual de horarios MAIA UC3M en el navegador. Úsala cuando el usuario diga "abre el configurador", "configurar horario", "abre el horario", "elegir asignaturas", "planificar mi máster", "abre el planner", "ver horario visual" o similares.
---

# Configurador de horario MAIA

Abre el planificador web del MAIA para elegir asignaturas, comprobar restricciones y solapes, guardar varios planes y exportar el horario a `.ics`.

## Cuándo dispararse

Cuando el usuario pida cosas como:

- "abre el configurador de horario"
- "configurar mi horario"
- "quiero elegir mis asignaturas"
- "ábreme el planner de horarios"
- "vamos a planificar el máster"
- "abre el horario visual"

## Qué hacer

1. Abre <https://maia-uc3m-wiki.vercel.app/> con la herramienta de navegación disponible. Si no puedes abrir páginas, comparte ese enlace.
2. Si el usuario quiere ejecutar su copia local, indica `npm install` y `npm run dev`; usa el puerto que Vite asigne, sin asumir que 5173 está libre.
3. Resume solo las funciones relevantes: selección por S1–S4, restricciones generales y por semi, detección de solapes, varios planes, enlace compartible y exportación `.ics`.

## Notas

- La selección persiste en `localStorage`; otro navegador o una ventana privada empiezan con un plan nuevo.
- La edición activa es 2026/2027. La UC3M puede modificar horarios, así que hay que contrastar las sesiones con la publicación oficial enlazada en la web.
