# ESTADO DEL ARTE

**Author (s): Abdulsalam O. Alzahrani, Mohammed J. F. Alenazi**

**Títle of paper: Designing a Network Intrusion Detection System Based on Machine Learning for Software Defined Networks**

**Journal: Future Internet**

**Volume (issue): Vol. 13**

**pag – pag (year): 111 – 128 (2021)**

## Estado del arte que hace el autor

Los autores desarrollan una investigación enfocada en el diseño de un Network Intrusion Detection System basado en Machine Learning para entornos Software Defined Networking. El artículo analiza cómo SDN ha evolucionado como una arquitectura flexible y centralizada capaz de transformar las redes modernas, pero que al mismo tiempo introduce nuevos riesgos y amenazas de seguridad debido a su naturaleza programable y centralizada. Los autores revisan conceptos relacionados con Network Intrusion Detection Systems, anomaly detection, signature-based IDS y arquitecturas SDN. Asimismo, el estudio explica cómo tecnologías modernas como IoT, inteligencia artificial y big data han incrementado significativamente el volumen de tráfico y la complejidad de las amenazas cibernéticas. El trabajo también revisa investigaciones previas relacionadas con SVM, Random Forest, Decision Trees, Deep Neural Networks, Autoencoders y técnicas híbridas aplicadas a intrusion detection. Además, los autores analizan el uso del dataset NSL-KDD como benchmark ampliamente utilizado dentro de investigaciones de NIDS.

## Motivación del autor

La motivación principal del artículo surge debido al crecimiento acelerado de amenazas cibernéticas en redes modernas y a la necesidad de desarrollar sistemas NIDS más precisos, rápidos y adaptables dentro de arquitecturas SDN. Los autores consideran que las soluciones tradicionales de seguridad ya no son suficientes frente al aumento de ataques sofisticados como DDoS, Probe, R2L y U2R. Otra motivación importante es que SDN introduce un entorno altamente dinámico y centralizado donde un ataque exitoso podría comprometer toda la infraestructura de red. Asimismo, el artículo busca demostrar que Machine Learning puede mejorar significativamente la capacidad de detección de anomalías en tiempo real usando únicamente un conjunto reducido de características relevantes.

## Descripción del aporte del autor

El principal aporte del artículo es el desarrollo de un modelo NIDS basado en algoritmos Machine Learning orientado específicamente a entornos SDN. Los autores proponen una arquitectura integrada donde el sistema IDS se despliega directamente sobre el controlador SDN para analizar tráfico en tiempo real. Otro aporte importante es la implementación y comparación de tres algoritmos tree-based: Decision Tree, Random Forest y XGBoost, demostrando experimentalmente que XGBoost ofrece el mejor rendimiento para clasificación de ataques. Asimismo, el trabajo aporta una estrategia de feature selection donde únicamente cinco características del dataset NSL-KDD son suficientes para detectar y clasificar ataques con altos niveles de precisión.

## Proceso para obtener el aporte que considera el autor

Para obtener el aporte, los autores desarrollaron una metodología experimental basada en Machine Learning aplicado a intrusion detection dentro de SDN. Primero realizaron una revisión bibliográfica sobre IDS, SDN y algoritmos de clasificación utilizados en investigaciones previas. Posteriormente seleccionaron el dataset NSL-KDD debido a que es considerado uno de los benchmarks más utilizados en investigaciones de NIDS. Luego aplicaron procesos de análisis estadístico, limpieza de datos y preprocesamiento utilizando técnicas de normalización Min-Max para homogenizar escalas numéricas. Después realizaron feature engineering y seleccionaron únicamente cinco características relevantes del dataset original compuesto por 41 atributos.

## Proceso para resolver el problema considerado por el autor

Los autores resolvieron el problema mediante la integración de algoritmos Machine Learning dentro de una arquitectura NIDS desplegada sobre SDN. Primero diseñaron una arquitectura de tres capas conformada por infraestructura, controlador SDN y capa de aplicación donde reside el IDS. Posteriormente utilizaron el dataset NSL-KDD para entrenar modelos capaces de detectar tráfico malicioso y clasificar ataques específicos como DoS, Probe, R2L y U2R. Después aplicaron técnicas de feature selection para reducir complejidad computacional conservando únicamente cinco características relevantes.

## Métricas que el autor usa y resultado que obtiene. Comentar

El estudio utiliza múltiples métricas de evaluación clásicas dentro de problemas de clasificación e intrusion detection. Los autores emplean accuracy, precision, recall, F1-score, ROC curves y AUC para medir el desempeño de los modelos. Los resultados muestran que el algoritmo XGBoost alcanzó aproximadamente 95.55% de accuracy, 92% de precision y 98% de recall, superando a Decision Tree y Random Forest. Además, el modelo logró valores AUC cercanos al 99% para distintas categorías de ataques.

## Observaciones y/o críticas suyas al artículo

El artículo resulta bastante relevante porque combina SDN, Machine Learning y intrusion detection dentro de un framework práctico y bien estructurado. Uno de sus puntos más fuertes es la reducción significativa de dimensionalidad utilizando únicamente cinco características sin perder precisión de clasificación. Sin embargo, gran parte de las evaluaciones se realizan sobre el dataset NSL-KDD, el cual aunque es ampliamente utilizado, ya tiene ciertos años y podría no reflejar completamente amenazas modernas.
