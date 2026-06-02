# ESTADO DEL ARTE

**Author (s): Lucian Florin Ilca, Ogruțan Petre Lucian, Titus Constantin Balan**

Títle of paper: Enhancing Cyber-Resilience for Small and Medium-Sized Organizations with Prescriptive Malware Analysis, Detection and Response

**Journal: Sensors**

**Volume (issue): 23(15)**

**pag – pag (year): 6757 (2023)**

## Estado del arte que hace el autor

El artículo analiza el panorama actual de amenazas cibernéticas que afectan principalmente a pequeñas y medianas empresas. Los autores explican que las técnicas tradicionales de detección basadas únicamente en firmas ya no son suficientes para identificar malware moderno como ransomware, malware polimórfico, rootkits, fileless malware y amenazas persistentes avanzadas.

El estudio revisa investigaciones relacionadas con inteligencia artificial aplicada a malware, sistemas XDR/EDR, SIEM, sandboxes y técnicas avanzadas de análisis de comportamiento. También se describen problemas actuales relacionados con evasión de antivirus, mutación automática de malware utilizando IA y dificultades para detectar amenazas zero-day.

Los autores realizan una revisión amplia de algoritmos de Machine Learning y Deep Learning aplicados a detección de malware. Se analizan técnicas como Random Forest, Support Vector Machines, Hidden Markov Models y análisis dinámico basado en opcodes.

Asimismo, el trabajo examina problemas asociados a datasets desbalanceados en sistemas de clasificación de amenazas. El artículo menciona investigaciones previas donde ciertos algoritmos pierden precisión debido a la distribución desigual entre malware y software legítimo.

Otro aspecto importante del estado del arte es el análisis de políticas organizacionales de ciberseguridad, incluyendo incident response, network security policy y business continuity plans. Los investigadores consideran que muchas pequeñas empresas no poseen recursos suficientes para implementar soluciones enterprise complejas.

Finalmente, el artículo concluye que todavía existe una gran necesidad de soluciones accesibles, automatizadas y escalables para mejorar la ciber-resiliencia de organizaciones pequeñas y medianas.

## Motivación del autor

La motivación principal del estudio surge debido al incremento acelerado de amenazas cibernéticas dirigidas contra pequeñas y medianas empresas. Los autores explican que las SMEs suelen ser objetivos vulnerables debido a recursos económicos limitados, falta de personal especializado y baja madurez en ciberseguridad.

El artículo menciona que los ataques modernos evolucionan constantemente utilizando técnicas avanzadas de evasión, mutación automática y malware polimórfico. Además, muchas soluciones comerciales de seguridad poseen costos elevados que dificultan su implementación en pequeñas organizaciones.

Otra motivación importante es la necesidad de automatizar procesos de detección y respuesta ante incidentes. Los autores consideran que las SMEs requieren soluciones rápidas de desplegar, fáciles de administrar y capaces de responder automáticamente frente a amenazas emergentes.

Por ello, el objetivo principal del trabajo es desarrollar una infraestructura open source, automatizada y escalable capaz de mejorar la resiliencia cibernética organizacional utilizando tecnologías accesibles.

## Descripción del aporte del autor

El principal aporte del artículo es el diseño de una infraestructura de ciber-resiliencia basada completamente en soluciones open source y tecnologías containerizadas mediante Docker.

La propuesta integra múltiples componentes de seguridad como XDR/EDR, SIEM, AV Sandbox, Firewall avanzado, NIPS, HIDS, SOAR, Threat Hunting y módulos de Digital Forensics.

Otro aporte importante es el uso de inteligencia artificial y análisis de comportamiento para detectar malware avanzado y amenazas emergentes. El sistema puede identificar patrones anómalos incluso en ataques desconocidos o variantes polimórficas.

Además, el trabajo propone metodologías automatizadas de incident response y gestión de políticas organizacionales orientadas específicamente a SMEs con hasta 250 endpoints.

Los autores también desarrollan modelos matemáticos para analizar dinámicamente la evolución de incidentes de seguridad dentro de una organización utilizando ecuaciones diferenciales y modelos logísticos.

Finalmente, el sistema fue diseñado para ser rápido de desplegar, económicamente accesible y escalable según el tamaño de la infraestructura.

## Proceso para obtener el aporte que considera el autor

Para desarrollar la solución, los autores integraron múltiples herramientas open source dentro de una infraestructura basada en contenedores Docker.

Se implementaron componentes como firewalls multifunción, SIEM, módulos XDR/EDR, IDS/IPS, sistemas de monitoreo, sandboxing y mecanismos de threat intelligence sharing.

Asimismo, se aplicaron algoritmos de Machine Learning y modelos estadísticos orientados a clasificación de malware y detección de anomalías. Los investigadores analizaron datasets reales de amenazas y realizaron pruebas utilizando malware polimórfico y técnicas avanzadas de evasión.

También se desarrollaron políticas organizacionales relacionadas con network security, incident response y gestión de riesgos. La solución fue diseñada para facilitar despliegues rápidos en organizaciones con infraestructura limitada.

El sistema fue validado mediante múltiples pruebas comparativas utilizando diferentes motores antivirus y escenarios reales de detección.

## Proceso para resolver el problema considerado por el autor

Los autores realizaron diferentes pruebas prácticas orientadas a validar la capacidad de detección y respuesta del sistema propuesto.

Las evaluaciones incluyeron escenarios de malware polimórfico, ransomware, DLL injection, process hollowing y ataques avanzados generados mediante IA.

También se compararon distintos clasificadores de Machine Learning como Random Forest, Bayesian Networks, SVM y Hidden Markov Models para evaluar precisión, recall y tasa de falsos positivos.

Además, se probaron mecanismos automatizados de incident response y correlación de eventos utilizando SIEM y SOAR. Las pruebas buscaron demostrar que el sistema puede responder rápidamente ante amenazas sin requerir intervención manual constante.

Finalmente, se validó la capacidad de despliegue rápido utilizando contenedores Docker y recursos computacionales limitados.

## Métricas que el autor usa y resultado que obtiene. Comentar

Las métricas utilizadas incluyen accuracy, precision, recall, false positive rate, F-measure y capacidad de detección de malware emergente.

Los resultados demostraron mejoras significativas frente a soluciones tradicionales basadas únicamente en firmas. Algunos modelos alcanzaron niveles de precisión superiores al 90% en clasificación de malware.

También se evaluó la velocidad de despliegue, facilidad de administración y capacidad de escalabilidad de la infraestructura propuesta.

Los autores resaltan que el sistema puede ser implementado rápidamente en SMEs y mantener capacidades avanzadas de detección utilizando herramientas open source.

Considero que las métricas utilizadas fueron adecuadas porque abarcan aspectos técnicos, organizacionales y operativos. Sin embargo, hubiera sido interesante incluir pruebas de rendimiento bajo ataques masivos reales o simulaciones más agresivas.

## Observaciones y/o críticas suyas al artículo

El artículo presenta una propuesta completa y práctica para mejorar la resiliencia cibernética de pequeñas y medianas organizaciones. Uno de sus principales puntos fuertes es la integración de múltiples herramientas open source dentro de una arquitectura automatizada y accesible económicamente.

También resulta interesante la incorporación de inteligencia artificial y modelos matemáticos aplicados a gestión de incidentes y análisis de malware.

Sin embargo, el artículo tiene algunas limitaciones. Aunque se describen muchas tecnologías y herramientas, algunas secciones resultan demasiado amplias y poco profundas técnicamente.

Además, varias pruebas fueron realizadas en ambientes controlados y no se detallan completamente ciertos parámetros experimentales utilizados durante las evaluaciones.

Finalmente, considero que el trabajo podría fortalecerse incorporando análisis comparativos más detallados frente a soluciones comerciales enterprise ampliamente utilizadas en el mercado.
