# Sistema de diseño de MAIA Wiki

Este documento define la identidad visual y las reglas de interfaz de la web de MAIA Wiki. Su objetivo es que el planificador, el catálogo de asignaturas, la guía y las páginas futuras se sientan como un único producto.

La referencia funcional es [maia-uc3m-wiki.vercel.app](https://maia-uc3m-wiki.vercel.app/) y la implementación principal vive en `src/styles.css`.

## 1. Idea de marca

MAIA Wiki debe sentirse:

- **Académica y fiable:** la información compleja se presenta con orden, fuentes y estados claros.
- **Cercana:** está hecha desde la experiencia de estudiantes, no con lenguaje institucional distante.
- **Tecnológica sin clichés:** azul, violeta, datos y retículas, pero sin robots, cerebros, neones ni estética genérica de “IA”.
- **Premium por contención:** pocos recursos visuales, bien repetidos; el contenido siempre tiene prioridad.
- **Útil antes que decorativa:** el color ayuda a reconocer módulos, asignaturas, conflictos y progreso.

La expresión visual se resume como **MAIA dot**: superficies claras, azul marino, degradados azul-violeta y patrones de puntos usados como atmósfera.

## 2. Experiencia y arquitectura

La navegación principal tiene cuatro destinos:

1. **Planificador:** elegir asignaturas, comprobar restricciones, detectar solapes y exportar el horario.
2. **Asignaturas:** explorar el catálogo y abrir la ficha de cada materia.
3. **Guía:** consultar información académica, administrativa y del campus.
4. **Sobre el proyecto:** explicar qué es MAIA Wiki, su carácter estudiantil y quién la mantiene.

El orden de prioridad en cualquier pantalla es:

1. acción o respuesta principal;
2. estado y restricciones;
3. contexto necesario;
4. detalle y enlaces externos.

## 3. Fundamentos visuales

### 3.1 Logotipo

Activos canónicos:

- `public/maia_logo.png`: composición horizontal para la cabecera.
- `public/maia_logo_icon.png`: símbolo compacto para espacios pequeños o fondos oscuros.
- `public/maia_logo_letras.png`: logotipo tipográfico para el pie y composiciones editoriales.
- `public/og.png`: tarjeta de preview social.

Reglas:

- Mantener siempre la proporción original.
- Dejar alrededor del logo, como mínimo, el ancho de uno de los trazos verticales del símbolo.
- Usar la composición horizontal sobre fondos claros y el símbolo cuando el espacio sea reducido.
- No recolorear, deformar, rotar ni añadir sombras fuertes al logo.
- No reconstruir el logo con texto HTML.

### 3.2 Tipografía

La familia de producto es **Varela Round**, cargada desde Google Fonts, con estas alternativas:

```css
font-family: "Varela Round", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Jerarquía recomendada:

| Uso | Peso | Tamaño orientativo | Interlineado |
| --- | ---: | ---: | ---: |
| Hero principal | 800 | `clamp(32px, 5vw, 54px)` | 1.02–1.08 |
| Título de página | 800 | 29–45 px | 1.08 |
| Título de sección | 700–800 | 20–30 px | 1.15 |
| Título de tarjeta | 700–750 | 13–16 px | 1.25–1.35 |
| Cuerpo | 400 | 13–16 px | 1.55–1.7 |
| Metadato | 400–700 | 10–12 px | 1.35 |
| Eyebrow | 700 | 10–11 px | 1.2, mayúsculas |

Los titulares pueden usar tracking negativo entre `-0.02em` y `-0.04em`. Los textos pequeños necesitan más aire, nunca tracking negativo.

**Decisión vigente:** Varela Round es la única tipografía de marca. Las referencias a `Instrument Serif` dentro del bloque de fallback `@supports not (display: grid)` son legado y no deben copiarse a componentes nuevos.

### 3.3 Color

#### Paleta de marca

| Token | Valor | Uso |
| --- | --- | --- |
| `--maia-navy` | `#061b42` | fondos oscuros, hero y contraste de marca |
| `--navy` | `#071f4a` | títulos y superficies oscuras |
| `--navy-dark` | `#031431` | profundidad en degradados |
| `--ink` | `#111d36` | texto principal |
| `--muted` | `#65708a` | texto secundario |
| `--maia-blue` | `#2477f4` | acción y acento principal |
| `--maia-violet` | `#6538f3` | segundo extremo del degradado |
| `--maia-cyan` | `#23b7e8` | acento informativo |
| `--panel` | `#ffffff` | tarjetas y paneles |
| `--border` | `#dce3f1` | divisores y contornos |
| Fondo de página | `#f5f7fd` | lienzo general |

Degradado principal:

```css
linear-gradient(110deg, #2477f4, #6538f3)
```

Degradado de hero:

```css
linear-gradient(118deg, #041630 0%, #09285f 52%, #30207f 100%)
```

#### Colores semánticos

| Significado | Color | Fondo suave |
| --- | --- | --- |
| Módulo 1 | `#3475f6` | `#eaf1ff` |
| Módulo 2 | `#583df4` | `#eeebff` |
| Módulo 3 | `#168bd8` | `#e7f6ff` |
| Error o conflicto | `#c74343` | `#fff0ef` |
| Válido o completado | verde accesible | verde muy claro |

En el CSS actual, Módulo 2 y Módulo 3 conservan los nombres históricos `--teal` y `--amber`. No se debe deducir el tono por el nombre de esas variables; al refactorizar, conviene migrarlas a tokens semánticos (`--module-2`, `--module-3`).

#### Color por asignatura

Cada asignatura tiene un color estable y distinto definido en `src/data.js`. Ese color se reutiliza en:

- borde o acento de su tarjeta;
- bloque del horario;
- leyenda;
- cabecera de su ficha;
- estado de selección.

El color nunca debe ser el único canal de información: se acompaña del nombre, abreviatura, módulo o icono de estado. No se añaden puntos decorativos junto al nombre de una asignatura ni en la esquina superior izquierda de sus tarjetas.

### 3.4 Puntos, retículas y decoración

El patrón de puntos es un recurso de marca, no un componente informativo.

Usos permitidos:

- fondo general muy tenue;
- mitad derecha de un hero;
- esquina inferior derecha de tarjetas grandes;
- tarjeta social y piezas de difusión.

Usos que se deben evitar:

- esquina superior izquierda de cards;
- junto a todos los títulos o nombres de asignaturas;
- detrás de párrafos largos;
- con contraste suficiente para competir con el contenido;
- como sustituto de un estado, botón o leyenda.

El patrón base usa una retícula de 30 px en escritorio y 24 px en móvil, con `--maia-dot` alrededor de un 12 % de opacidad.

### 3.5 Espaciado

Usar una escala base de 4 px:

```text
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80
```

- 4–8 px: relación entre icono y texto o entre metadatos.
- 12–16 px: interior de controles y tarjetas compactas.
- 20–32 px: interior de paneles y separación entre bloques.
- 40–64 px: secciones de página.
- 80 px o más: aperturas editoriales y cambios claros de contexto.

### 3.6 Radios y elevación

| Elemento | Radio |
| --- | ---: |
| Botón o input | 8–10 px |
| Panel funcional | 12–15 px |
| Tarjeta de contenido | 17–18 px |
| Hero o bloque destacado | 22–24 px |
| Chip o pill | 999 px |

Sombra estándar:

```css
0 1px 2px rgba(7, 31, 74, .04),
0 14px 34px rgba(7, 31, 74, .06)
```

Las sombras deben ser frías, amplias y discretas. El hover puede elevar una tarjeta entre 2 y 4 px; no se usan brillos ni sombras negras duras.

### 3.7 Iconografía

- Usar **Lucide React** para mantener grosor y geometría consistentes.
- Tamaño habitual: 14–18 px en controles y 20–24 px en bloques destacados.
- El icono acompaña una etiqueta; no sustituye texto cuando la acción pueda ser ambigua.
- No mezclar emojis, iconos rellenos y Lucide dentro del mismo flujo.

## 4. Layout y responsive

El contenido general se centra con ancho máximo y márgenes fluidos. El cuerpo admite pantallas desde 320 px.

### Escritorio (`> 1180 px`)

- Planificador en tres áreas: selector de asignaturas, calendario y resumen.
- Catálogo en cuatro columnas.
- Guía en tres columnas cuando el contenido lo permite.
- Header completo con navegación visible.

### Tablet (`880–1180 px`)

- El planificador reorganiza paneles antes de reducir el calendario.
- Catálogo y guía pasan a dos o tres columnas según el ancho.
- Se conserva la jerarquía, no se comprime el texto hasta hacerlo ilegible.

### Móvil (`≤ 880 px`)

- Navegación compacta.
- Paneles y tarjetas en una columna.
- Acciones principales ocupan el ancho disponible cuando sea útil.
- El calendario mantiene sus cinco días y usa scroll horizontal; no se aplastan las columnas.
- El mapa, los hero y las imágenes reducen altura y decoración antes que contenido.

Breakpoints existentes: 1180, 1160, 1120, 960, 880, 820, 640, 620 y 560 px. Al crear una sección nueva, reutilizar uno de ellos; no añadir un breakpoint por componente sin necesidad.

## 5. Componentes

### 5.1 Cabecera

- Altura aproximada de 70 px.
- Fondo blanco translúcido con blur y borde inferior.
- Logo horizontal a la izquierda.
- Navegación principal al centro o derecha.
- Curso académico como pill secundario.
- La ruta activa se distingue por color y subrayado, no solo por peso.

### 5.2 Hero

- Superficie navy con degradado azul-violeta.
- Título blanco, breve y dominante.
- Descripción en azul grisáceo claro.
- Una acción primaria y, como máximo, una secundaria.
- Decoración de puntos concentrada en el lado derecho y siempre detrás del contenido.

### 5.3 Botones

Variantes:

- **Primario:** degradado MAIA, texto blanco y sombra azul tenue.
- **Secundario:** fondo blanco o transparente, borde gris azulado.
- **Destructivo:** rojo, reservado para acciones que eliminan o reinician.
- **Icono:** superficie mínima de 40 × 40 px en escritorio y 44 × 44 px en contexto táctil.

Estados obligatorios: default, hover, active, focus-visible, disabled y loading cuando haya espera.

### 5.4 Tabs, chips y filtros

- Forma compacta y redondeada.
- Estado activo con degradado o navy sólido y texto blanco.
- Estado inactivo con fondo claro y texto secundario.
- Mostrar el foco de teclado de forma visible.
- No depender únicamente del cambio de color: usar también fondo, borde o indicador.

### 5.5 Paneles y tarjetas

- Fondo blanco, borde azul grisáceo y sombra tenue.
- Título, metadatos y acción siguen siempre el mismo orden.
- Hover de 2–4 px solo si la tarjeta es interactiva.
- Las tarjetas estáticas no deben parecer botones.
- Los puntos decorativos, si aparecen, se limitan a la esquina inferior derecha.

### 5.6 Planificador y horario

El planificador es la experiencia principal y debe conservar:

- rango horario de **08:00 a 23:00**;
- cinco columnas laborables;
- precisión de 15 minutos;
- nombre y franja legibles en cada evento;
- color estable por asignatura;
- conflictos en rojo y con patrón rayado, además del texto de aviso;
- leyenda visible;
- resumen de requisitos generales y por semicuatrimestre;
- acceso claro a exportar, compartir o reiniciar.

El calendario puede desplazarse horizontalmente en móvil. Nunca se debe reducir tanto que las etiquetas de los eventos queden irreconocibles.

### 5.7 Estados y validación

- **Correcto:** mensaje afirmativo y progreso completo.
- **Pendiente:** indica cuánto falta y qué acción puede resolverlo.
- **Conflicto:** rojo, icono y explicación concreta de las asignaturas afectadas.
- **Sin resultados:** explica cómo cambiar búsqueda o filtros.
- **Toast:** confirmación breve, abajo y centrada; no contiene información imprescindible.

Los requisitos generales y los de cada semicuatrimestre son vistas complementarias: ninguna sustituye a la otra.

### 5.8 Catálogo y ficha de asignatura

- El catálogo prioriza nombre, módulo, ECTS y semicuatrimestre.
- Cada card hereda el color estable de la asignatura.
- La ficha repite ese color como acento lateral del hero.
- Horario, descripción, evaluación y fuente oficial se separan en bloques escaneables.
- Las fechas o datos sujetos a cambios deben indicar curso académico y procedencia.

### 5.9 Guía y artículos

- La portada de la guía usa tarjetas temáticas con iconos Lucide.
- Un contenido destacado puede ocupar más columnas, pero no debe desplazar la navegación básica.
- Los artículos usan ancho de lectura contenido, párrafos cortos, listas y enlaces descriptivos.
- Los avisos distinguen claramente información oficial, interpretación y experiencia estudiantil.

### 5.10 Mapa del campus

- Motor MapLibre con estilo **OpenFreeMap Positron**.
- Marcador MAIA azul-violeta, con nombre del campus y enlace externo para indicaciones.
- El mapa complementa la dirección escrita; nunca es la única forma de localizar el campus.
- Controles discretos y esquinas coherentes con los bloques destacados.

### 5.11 Página “Sobre el proyecto”

- Combina propósito, alcance, transparencia y autoría.
- El texto debe sonar humano y directo, evitando una biografía corporativa.
- La fotografía se trata como contenido editorial, sin filtros o marcos excesivos.
- Se declara que la wiki es estudiantil y que la UC3M conserva la autoridad oficial.

### 5.12 Pie

- Fondo navy y contraste alto.
- Logotipo alternativo, navegación útil, autoría y aviso de independencia.
- No repetir toda la navegación ni convertirlo en un segundo índice.

## 6. Movimiento

- Transiciones de hover y foco: 150–220 ms.
- Desplazamiento de tarjetas: máximo 4 px.
- Entrada de toast: alrededor de 200 ms.
- No animar grandes áreas, fondos de puntos o el calendario durante la interacción.
- Respetar `prefers-reduced-motion: reduce` y eliminar transformaciones no esenciales.

## 7. Accesibilidad

Objetivo mínimo: **WCAG 2.1 AA**.

- Contraste de 4.5:1 para texto normal y 3:1 para texto grande o componentes gráficos esenciales.
- Foco visible en todos los controles, enlaces, tabs y tarjetas clicables.
- Navegación completa con teclado y orden de tabulación coherente.
- Objetivos táctiles recomendados de al menos 44 × 44 px.
- Encabezados en orden lógico y una sola función clara por botón.
- `alt` descriptivo para imágenes con información y `alt=""` para decoración.
- Estados y conflictos comunicados con texto o icono además de color.
- Patrones y degradados con opacidad baja para no perjudicar la lectura.
- Scroll horizontal del calendario anunciado por contexto y sin bloquear el scroll vertical.

## 8. Voz y contenido

La interfaz habla en español claro, breve y útil.

Preferir:

- “Te faltan 3 ECTS de Módulo 1”.
- “Hay un solape el martes de 17:30 a 18:00”.
- “Consulta el horario oficial antes de matricularte”.

Evitar:

- tecnicismos innecesarios;
- mensajes genéricos como “Ha ocurrido un error” sin siguiente paso;
- tono promocional o afirmaciones que parezcan oficiales;
- abreviaturas sin explicación la primera vez.

Todas las cifras académicas variables deben incluir curso de referencia. Cuando exista discrepancia, se enlaza la fuente oficial y se explica que prevalece sobre la wiki.

## 9. Reglas de consistencia

### Sí

- Reutilizar tokens, radios, sombras, iconos y breakpoints existentes.
- Reservar el degradado para marca, acciones principales y estados activos.
- Usar el color de asignatura con significado estable en toda la web.
- Diseñar primero la jerarquía y después añadir decoración.
- Comprobar escritorio, tablet, móvil, teclado y contraste antes de publicar.

### No

- Introducir una segunda tipografía de marca.
- Convertir todas las superficies en degradados.
- Añadir puntos en la esquina superior izquierda de las tarjetas.
- Usar estética de robot, cerebro, circuitos o neón como recurso principal.
- Crear colores distintos para una misma asignatura según la página.
- Ocultar información crítica dentro de tooltips o solo en hover.
- Presentar información estudiantil como si fuese una publicación oficial de la UC3M.

## 10. Mapa de implementación

| Área | Archivo principal |
| --- | --- |
| Tokens y estilos globales | `src/styles.css` |
| Planificador y navegación | `src/main.jsx` |
| Catálogo, guía, mapa y About | `src/content-pages.jsx` |
| Asignaturas, sesiones y colores | `src/data.js` |
| Contenido académico | `wiki/` |
| Logotipos e imagen social | `public/` |
| Metadatos sociales | `index.html` |
| Registro editorial | `LOG.md` |

## 11. Checklist para una nueva página

Antes de incorporar una vista o componente:

- [ ] Usa Varela Round y los tokens de color existentes.
- [ ] Tiene un objetivo y una acción principal claros.
- [ ] Reutiliza header, footer, botones, tarjetas y estados disponibles.
- [ ] No añade puntos decorativos arriba a la izquierda de cards.
- [ ] Funciona a 320 px y en escritorio ancho.
- [ ] Se puede recorrer con teclado y muestra `focus-visible`.
- [ ] No comunica estados únicamente mediante color.
- [ ] Enlaza fuentes oficiales cuando presenta datos académicos variables.
- [ ] Añade o actualiza metadatos si la página necesita compartirse.
- [ ] Registra el cambio en `LOG.md`.

---

**Versión del documento:** 1.0

**Última revisión:** 2026-08-24

**Estado:** referencia vigente para la web MAIA Wiki
