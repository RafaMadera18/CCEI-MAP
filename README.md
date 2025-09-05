# CCEI-MAP
Aplicación diseñada para proporcionar información sobre la ubicación de aulas, horarios de eventos y actividades académicas, en el Campo de Ciencias Exactas e Ingenierías.

## Problema y contexto
Cuando personas externas a la UADY o alumnos de nuevo ingreso entran por primera vez al campus muchas veces no encuentran algún aula en específico, incluso alumnos que llevan años estudiando no saben dónde se encuentra un lugar en especial, como por ejemplo el laboratorio de FMAT que se encuentra atrás de FIQ.

Debido a que no se prevé un cambio para una mejor señalización de las aulas y servicios por parte de la universidad, el tener una manera de localizar todos los espacios en el campus es una necesidad que afecta a todo el alumnado.

Este proyecto busca optimizar el desplazamiento y orientación dentro del Campus de Ciencias Exactas E Ingeniería mediante una aplicación diseñada para proporcionar información sobre la ubicación de aulas, horarios de eventos y actividades académicas.

Mediante un sistema intuitivo y accesible, se pretende reducir la incertidumbre de estudiantes, personal y visitantes; y facilitar el acceso a los registros de horarios académicos.

Entre los beneficios esperados, se proyecta a largo plazo una mayor eficiencia en la planificación y asistencia a las actividades dentro del campus, una reducción en los tiempos de búsqueda de espacios específicos y una mejora en la adaptación de los estudiantes de nuevo ingreso a los espacios físicos de su correspondiente facultad dentro del campus.

## Alcance

Los usuarios deben poder contestar en segundos:
- En donde se encuentra un salon/laboratorio en especifico.
- Que espacio/salon se encuentra disponible ahora/cierta hora.
- En donde se encuentra/encontrara un maestro y la ubicación de su cubículo.
- Cual es la ruta que debo seguir a lo largo del día.
- Que cursos se imparten en un salon a lo largo del día.
- Que actividades hay en la facultad y donde se encuentran (Opcional).

## Complejidad
- Información dispersa y en diferentes formatos.
- 300+ asignaturas/cursos para procesar.
- Mapa interactivo.
- Algoritmo de generación de rutas.
- Algoritmo para determinar espacios libres basados en intervalos de tiempo.
- Creación de herramientas para automatizar la publicación de la información más reciente.
- Generación de enlaces compartibles/QR (por ejemplo, marcar/dirigir a un área).
- Genérico y modular, basado en datos dinámicos, configurable para su adopción en más campus.
- Integración con sistemas existentes como Kiin (https://www.kiin.live).

## Requerimientos (Historias de Usuario)
### Gestión de información
- Como estudiante, quiero consultar una lista de los salones disponibles dentro del campus, incluyendo identificador y ubicación, para saber qué espacios existen y dónde se encuentran.
- Como estudiante, quiero visualizar los horarios de cada salón con las clases, talleres o actividades programadas, para planificar mejor mi tiempo y uso de espacios.
- Como estudiante, quiero acceder a un listado de actividades extracurriculares con horario y ubicación, para participar en las que más me interesen.

### Orientación y navegación
- Como estudiante, quiero visualizar un mapa interactivo del campus con edificios, aulas, laboratorios y áreas comunes, para orientarme fácilmente dentro del campus.
- Como estudiante, quiero buscar un espacio específico (aula, laboratorio, oficina, área común) por nombre o número, para encontrarlo rápidamente.
- Como estudiante, quiero generar una ruta desde mi ubicación actual hacia un salón o espacio, para llegar sin perderme.

### Personalización y planificación
- Como estudiante, quiero marcar salones o espacios como favoritos, para acceder a ellos más rápido.
- Como estudiante, quiero registrar manualmente mis clases o actividades favoritas en una agenda personal local, para consultarlas rápidamente en mi dispositivo.

### Accesibilidad y usabilidad
- Como estudiante, quiero filtrar actividades y salones por categorías (clases, talleres, extracurriculares, etc.), para encontrar solo lo que necesito en cada momento.
- Como estudiante, quiero acceder a mapas e información registrada sin conexión a internet, para poder usar la aplicación en todo momento.

## Módulos
- Mapa interactivo (UI).
- Consulta/búsqueda de ubicación por criterios.
- Generador de rutas.
- Agenda/info personal.
- Compartir información, generación de Url/QR.
- Procesamiento de fuentes/formatos.
- Publicación automatizada de información.
- Integración con Kiin.

## Avance
- Prototipo de alta fidelidad (Figma)
Enlace al prototipo: https://www.figma.com/proto/FvLjM1xtWWIQoLbMk1gvHO/CCEI-MAP?node-id=0-1&t=CFj4wbBJ3LslE34o-1 
