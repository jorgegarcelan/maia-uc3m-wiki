# Recursos y Herramientas por Asignatura

> [← Volver al índice](README.md)
>
> Lenguajes, frameworks y herramientas que se utilizan o conviene conocer en cada asignatura.
> Esta lista es orientativa basada en el contenido típico de cada materia.

---

## Herramientas Transversales

Estas se usan en prácticamente todas las asignaturas:

| Herramienta | Para qué |
|-------------|----------|
| **Python 3** | Lenguaje principal del máster |
| **Jupyter Notebooks** | Entregas de prácticas y experimentación |
| **Git / GitHub** | Control de versiones (algunas asignaturas lo exigen) |
| **Aula Global (Moodle)** | Plataforma docente UC3M: materiales, entregas, foros |
| **Google Colab** | Notebooks con GPU gratuita (útil para DL) |

---

## Por Asignatura

### Módulo 1 — Fundamentos y Técnicas

| Asignatura | Lenguajes / Frameworks | Herramientas / Libros |
|-----------|------------------------|----------------------|
| Aprendizaje Automático | Python, scikit-learn, pandas, numpy | Matplotlib, seaborn |
| Búsqueda y Optimización | Python | Algoritmos de búsqueda (A*, BFS, DFS) |
| Computación Evolutiva | Python, DEAP | Algoritmos genéticos, PSO |
| Aprend. Series Temporales | Python, scikit-learn, statsmodels | pandas, Prophet, ARIMA |
| Redes de Neuronas | Python, PyTorch / TensorFlow | Keras, numpy |
| Aprendizaje Profundo | Python, PyTorch | torchvision, Hugging Face, Colab/GPU |
| Aprendizaje por Refuerzo | Python, OpenAI Gym / Gymnasium | Stable-Baselines3 |
| Agentes y Sist. Multiagente | Python, Java (JADE) | SPADE, mesa |
| Planificación Automática | PDDL | Fast Downward, planificadores STRIPS |
| Métodos Probabilísticos | Python, PyMC, scipy | pgmpy (redes bayesianas) |
| Razonam. con Incertidumbre | Python | scikit-fuzzy, Dempster-Shafer |
| Represent. Conocim. y Razon. | Prolog, OWL, RDF | Protégé, SPARQL |

### Módulo 2 — Aplicaciones

| Asignatura | Lenguajes / Frameworks | Herramientas / Libros |
|-----------|------------------------|----------------------|
| Procesamiento de Lenguaje Natural | Python, Hugging Face Transformers | spaCy, NLTK, GPT/BERT |
| Vehículos Autónomos | Python, C++ | ROS, CARLA, OpenCV, PCL |
| Visión Artificial | Python, OpenCV, PyTorch | torchvision, YOLO, detectron2 |
| Analítica de Negocio | Python, R | Power BI, Tableau, pandas |
| Web Semántica y Buscadores | SPARQL, RDF, OWL | Protégé, Elasticsearch, Whoosh |
| IA en Educación | Python | Learning analytics, xAPI |
| IA en Finanzas | Python, pandas | yfinance, QuantLib, backtesting |
| IA en Salud | Python | scikit-learn, imágenes DICOM, FHIR |
| IA y Desarrollo Sostenible | Python | Datasets medioambientales, GIS |
| Robótica Inteligente | Python, C++ | ROS 2, Gazebo, MoveIt |
| Inteligencia Ambiental | Python, Arduino/RPi | Sensores IoT, MQTT |
| Fábricas Inteligentes | Python | Digital twins, PLC, OPC-UA |
| Ciudades Inteligentes | Python | Open Data, APIs municipales, GIS |

### Módulo 3

| Asignatura | Lenguajes / Frameworks | Herramientas / Libros |
|-----------|------------------------|----------------------|
| Implic. Éticas y Legales | — | Regulación AI Act, GDPR, papers |
| Emprendimiento en IA | — | Lean Canvas, Business Model Canvas |

---

## Setup Recomendado

### Antes de empezar el máster

```
# Python 3.10+ con entorno virtual
python -m venv maia
source maia/bin/activate

# Librerías base
pip install numpy pandas matplotlib seaborn scikit-learn jupyter

# Para Deep Learning (instalar cuando llegue S2)
pip install torch torchvision transformers

# Útiles generales
pip install tqdm ipywidgets
```

### IDE Recomendado
- **VS Code** o **Cursor** con extensiones de Python y Jupyter
- **PyCharm** (alternativa)
- **Google Colab** para prácticas que necesiten GPU

### Hardware
- Portátil con 8+ GB RAM es suficiente para la mayoría de prácticas
- Para Deep Learning (S2 en adelante): usar Google Colab o servidores de la uni si los hay
- Las aulas INF tienen equipos con software preinstalado

---

*Esta lista es orientativa. Cada profesor indica las herramientas concretas en la primera clase y en Aula Global.*
