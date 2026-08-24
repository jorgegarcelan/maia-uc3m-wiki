# Contribuir a la wiki MAIA

Gracias por ayudar a mantener esto útil para la promoción. Esta wiki **no es oficial**: ante cualquier duda, prima la web de la UC3M y la secretaría.

## Cómo proponer cambios

1. **Con GitHub:** haz *fork* del repositorio, edita el `.md` que corresponda y abre un *pull request*. También puedes usar el lápiz “Edit” en GitHub sobre el archivo (crea el fork automáticamente).
2. **Sin GitHub:** escribe a la **delegación de estudiantes** del MAIA con el archivo, el párrafo a cambiar y, si puedes, un enlace a la fuente oficial.

## Buenas prácticas

- **Elige el curso correcto:** horarios, semicuatrimestres y fichas viven en `wiki/cursos/<AAAA-AAAA>/`. No cambies el histórico con datos de otra promoción.
- **Normativa, fechas y precios:** indica **fuente** (URL uc3m.es, PDF, comunicado) para que quien revise pueda contrastar rápido.
- **Registra el cambio:** añade una entrada breve en [`LOG.md`](LOG.md) con fecha, curso, archivos, fuente y estado de verificación.
- **Fichas activas:** si solo cambia el horario, actualiza `src/data.js` y ejecuta `node scripts/sync-course-markdown.mjs` para mantener la web y las 27 fichas alineadas.
- **No publiques** enunciados de exámenes, entregables evaluables de asignaturas ni material con **copyright** del profesorado sin permiso expreso.
- **Datos personales:** no incluyas datos identificativos de compañeros o terceros sin consentimiento.
- **Tono:** claro, respetuoso y orientado a ayudar; evita juicios sobre personas.

Las contribuciones se revisan cuando la delegación pueda; gracias por la paciencia.

Ver también [README.md](README.md) (uso del repo y enlaces oficiales) y el [índice de ediciones](wiki/cursos/README.md).
