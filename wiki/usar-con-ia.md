# Usar MAIA Wiki con IA

Las skills de este repositorio permiten preguntar por el máster en lenguaje natural sin copiar cada documento en el chat. El agente descubre qué información leer, consulta la edición correcta y devuelve una respuesta adaptada a tu caso.

> La IA sirve para **buscar, comparar y organizar**. La matrícula, los precios, las fechas y los cambios de aula se confirman siempre en la UC3M.

## Opción rápida: no instalar nada

Para planificar asignaturas y detectar solapes, abre el [planificador web](https://maia-uc3m-wiki.vercel.app/). Las skills son útiles cuando quieres hacer preguntas más abiertas o trabajar directamente con toda la documentación.

## 1. Descargar la wiki

Necesitas [Git](https://git-scm.com/downloads) y uno de los clientes compatibles.

```bash
git clone https://github.com/jorgegarcelan/maia-uc3m-wiki.git
cd maia-uc3m-wiki
```

Si descargaste el repositorio como ZIP, descomprímelo y abre la carpeta raíz, no solamente `wiki/`.

## 2. Usarla en Cursor

1. Instala [Cursor](https://cursor.com/downloads) y abre la carpeta `maia-uc3m-wiki` con **File → Open Folder**.
2. Abre el chat en modo **Agent**. Cursor detecta automáticamente las skills de `.cursor/skills/` y `.agents/skills/`.
3. Pregunta directamente o escribe `/` y selecciona una skill, por ejemplo `/plan-master`.
4. Para comprobar que se han cargado, abre **Customize → Skills** en Cursor.

No hace falta copiar archivos ni configurar una clave API para usar las skills dentro de la aplicación de Cursor. Consulta la [documentación oficial de Agent Skills](https://cursor.com/docs/skills) si cambia la interfaz.

## 3. Usarla en Claude Code

1. Instala [Claude Code](https://code.claude.com/docs/en/setup).
2. En una terminal, entra en la raíz del repositorio e inicia Claude:

```bash
cd maia-uc3m-wiki
claude
```

3. Claude Code detecta automáticamente `.claude/skills/<nombre>/SKILL.md`.
4. Pregunta en lenguaje natural o invoca una skill con `/maia-wiki`, `/comparador-horarios`, etc.

Claude vigila los cambios dentro de una carpeta de skills ya existente. Si acabas de crear por primera vez `.claude/skills/` durante una sesión, reinicia Claude Code. Más detalles en la [documentación oficial de skills de Claude Code](https://code.claude.com/docs/en/skills).

## Instalar las skills para todos tus proyectos

No es necesario para consultar esta wiki. Si quieres tenerlas disponibles globalmente, copia cada carpeta completa —no solo el `SKILL.md`— al directorio personal del cliente:

| Cliente | Directorio personal |
|---------|----------------------|
| Cursor | `~/.cursor/skills/<nombre>/SKILL.md` |
| Claude Code | `~/.claude/skills/<nombre>/SKILL.md` |

Las skills siguen leyendo rutas de este repositorio, así que conviene usarlas con la carpeta de MAIA Wiki abierta o indicar explícitamente dónde está el clon local.

## Qué skill usar

| Skill | Para qué sirve | Ejemplo |
|-------|----------------|---------|
| `maia-wiki` | Dudas generales, acceso, precios, becas, campus o TFM | “¿Cómo está organizado el máster?” |
| `plan-master` | Crear un plan de 60 ECTS que cumpla módulos y semis | “Hazme un plan centrado en NLP y producto.” |
| `comparador-horarios` | Detectar solapes exactos entre asignaturas | “¿Chocan Deep Learning, PLN y Vehículos en S2?” |
| `configurador-horario` | Abrir el planificador visual | “Abre el configurador con estas asignaturas.” |
| `itinerarios-tipo` | Explorar caminos por perfil profesional | “¿Qué itinerario elegirías para robótica?” |
| `mapa-prerrequisitos` | Entender qué conocimientos conviene traer | “¿Qué debería saber antes de Aprendizaje Profundo?” |
| `tracker-entregas` | Preparar una plantilla de seguimiento | “Hazme un tracker para las entregas de S1.” |

## Cómo preguntar para obtener una respuesta útil

Una buena consulta incluye tu objetivo, tus restricciones y el nivel de detalle que necesitas. No hace falta escribir un prompt técnico.

### Para elegir asignaturas

```text
Quiero orientar el máster a visión y robótica. Trabajo hasta las 15:30,
prefiero no salir después de las 21:00 y quiero un plan completo de 60 ECTS.
Comprueba módulos, semicuatrimestres y solapes.
```

### Para comparar dos alternativas

```text
Compara Aprendizaje Profundo y Aprendizaje por Refuerzo:
prerrequisitos, evaluación, horario y en qué perfiles encaja cada una.
Cita las fichas que has usado.
```

### Para verificar información sensible

```text
¿Cuánto cuesta el máster en 2026/2027?
Separa lo confirmado de lo pendiente y dime la fecha de la última revisión.
```

### Para consultar otro curso

```text
Quiero ver el horario histórico de 2025/2026, sin mezclarlo con 2026/2027.
```

## Qué debes comprobar siempre

- Pide que indique el **curso académico** y las **rutas consultadas**.
- Para horarios, abre el enlace oficial antes de desplazarte; la UC3M puede cambiar aulas o sesiones.
- Para precios y becas, distingue entre convocatoria abierta, cerrada o pendiente.
- Para entregas, usa Aula Global y las instrucciones del profesor: la wiki no guarda fechas personales de evaluación.
- No compartas contraseñas, expedientes, DNI ni documentación de admisión con una skill.

## Mantener la copia al día

Si clonaste el repositorio con Git:

```bash
git pull
```

La edición activa está en `wiki/cursos/2026-2027/`. El archivo `LOG.md` indica qué se actualizó, cuándo y con qué fuente. Si detectas una discrepancia, abre una propuesta siguiendo `CONTRIBUTING.md`.

## Si una skill no aparece

1. Comprueba que has abierto la raíz `maia-uc3m-wiki`.
2. Verifica que existe `.cursor/skills/` o `.claude/skills/` y que cada skill contiene un `SKILL.md`.
3. Reinicia el cliente si la carpeta superior se creó después de iniciar la sesión.
4. Escribe `/` en el chat para ver las skills disponibles.
5. Si sigue sin aparecer, formula la pregunta normalmente y pide al agente que lea `wiki/README.md` y la edición activa.
