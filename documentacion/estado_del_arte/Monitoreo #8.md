# ESTADO DEL ARTE

**Author (s): Abdullah Asım Yılmaz**

Títle of paper: A novel deep learning-based framework with particle swarm optimisation for intrusion detection in computer networks

**Journal: PLOS ONE**

**Volume (issue): 20(2)**

**pag – pag (year): e0316253 (2025)**

## Estado del arte que hace el autor

El autor desarrolla una investigación orientada a mejorar los sistemas de detección de intrusiones mediante una arquitectura híbrida basada en Deep Learning y optimización por Particle Swarm Optimization (PSO). El estado del arte inicia describiendo la importancia de los Intrusion Detection Systems dentro de la seguridad informática y cómo las amenazas actuales evolucionan constantemente mediante ataques más complejos y sofisticados. El artículo revisa los dos enfoques principales de IDS: anomaly-based IDS y signature-based IDS, destacando que los sistemas basados únicamente en firmas presentan limitaciones importantes frente a ataques desconocidos. Asimismo, el trabajo revisa el uso de técnicas Machine Learning y Deep Learning aplicadas a intrusion detection, incluyendo SVM, KNN, CNN, RNN, LSTM, autoencoders y arquitecturas híbridas. También analiza investigaciones previas donde se utilizan datasets ampliamente conocidos como KDDCUP’99, NSL-KDD, UNSW-NB15 y CICID2017. El estado del arte enfatiza que muchos sistemas actuales todavía presentan problemas relacionados con alta complejidad computacional, espacios de características demasiado grandes, baja capacidad para generalizar ataques nuevos y dificultades para optimizar hiperparámetros de manera eficiente.

## Motivación del autor

La motivación principal del estudio surge debido al crecimiento acelerado y constante de los ciberataques modernos, los cuales generan nuevos tipos de intrusión difíciles de detectar mediante sistemas tradicionales. El autor considera que muchos IDS existentes continúan dependiendo de enfoques poco robustos y de métodos basados en firmas que no pueden reconocer amenazas desconocidas. Además, las arquitecturas Deep Learning convencionales presentan limitaciones relacionadas con complejidad computacional, sobreajuste y dificultad para seleccionar hiperparámetros óptimos. Otra motivación importante es la necesidad de reducir el espacio de características y mejorar simultáneamente accuracy y eficiencia del sistema. Frente a ello, el autor propone combinar modelos pre-entrenados de Deep Learning con técnicas de optimización PSO para construir un framework híbrido capaz de clasificar diferentes tipos de ataques con mayor precisión y estabilidad.

## Descripción del aporte del autor

El principal aporte del artículo es la propuesta de una arquitectura híbrida de Deep Learning para intrusion detection que integra tres modelos pre-entrenados junto con optimización de hiperparámetros mediante Particle Swarm Optimization. La arquitectura utiliza redes profundas como ResNet50, GoogLeNet y AlexNet dentro de un esquema híbrido optimizado. Otro aporte importante es la incorporación de una nueva hash layer que combina los modelos pre-entrenados para mejorar la extracción de características relevantes desde los datos de intrusión. Además, el framework implementa un pipeline completo compuesto por recolección de datos, preprocesamiento, diseño de arquitectura DNN, optimización de hiperparámetros, entrenamiento y evaluación. El estudio también propone transformar datos de intrusión en representaciones visuales tipo imagen utilizando one-hot encoding, normalización y conversión a imágenes grayscale 8x8 para aprovechar mejor las capacidades de CNN. Finalmente, el sistema es validado utilizando tres datasets ampliamente utilizados: KDDCUP’99, NSL-KDD y UNSW-NB15.

## Proceso para obtener el aporte que considera el autor

Para obtener el aporte, el autor desarrolló una metodología compuesta por seis etapas principales. Primero realizó la recolección de datos utilizando los datasets KDDCUP’99, NSL-KDD y UNSW-NB15. Luego aplicó un proceso de preprocesamiento que incluyó one-hot encoding para variables categóricas, min-max normalization para características continuas y conversión de los datos en imágenes binarias/grayscale adecuadas para redes convolucionales. Posteriormente implementó una arquitectura híbrida basada en ResNet50, GoogLeNet y AlexNet como extractores de características. Después utilizó PSO para optimizar hiperparámetros relacionados con el entrenamiento y desempeño del modelo. En la siguiente etapa entrenó el sistema utilizando capas fully connected y clasificación SoftMax. Finalmente, evaluó el desempeño del framework mediante experimentos comparativos frente a métodos previos reportados en la literatura.

## Proceso para resolver el problema considerado por el autor

El autor resolvió el problema integrando múltiples arquitecturas Deep Learning dentro de un único framework híbrido optimizado mediante PSO. Primero transformó los datos de intrusión tradicionales en representaciones visuales utilizando one-hot encoding y normalización, permitiendo que las CNN pudieran procesar los datos como imágenes. Después utilizó ResNet50, GoogLeNet y AlexNet como modelos extractores de características para capturar patrones complejos asociados a distintos tipos de ataques. Posteriormente aplicó Particle Swarm Optimization para encontrar configuraciones óptimas de hiperparámetros y mejorar accuracy del sistema. Finalmente, el modelo clasifica el tráfico utilizando capas fully connected y SoftMax, logrando una arquitectura más robusta, eficiente y precisa para intrusion detection.

## Métricas que el autor usa y resultado que obtiene. Comentar

El estudio utiliza principalmente métricas de accuracy para evaluar la capacidad de clasificación del sistema frente a distintos tipos de ataques. Los resultados muestran que el modelo propuesto obtiene 93.55% de accuracy en KDDCUP’99, 90.42% en NSL-KDD y 82.44% en UNSW-NB15, superando diversos enfoques previos reportados en la literatura. Asimismo, el trabajo analiza capacidad de reducción del espacio de características y desempeño comparativo frente a otros métodos ML y DL. En mi opinión, los resultados son bastante sólidos porque utilizan datasets reconocidos y muestran mejoras consistentes frente a modelos tradicionales. Sin embargo, el accuracy sobre UNSW-NB15 todavía es menor respecto a otros datasets, lo cual evidencia que los escenarios modernos siguen siendo bastante complejos y desafiantes para los IDS basados en Deep Learning.

## Observaciones y/o críticas suyas al artículo

El artículo presenta una propuesta interesante porque combina Deep Learning híbrido con optimización PSO, permitiendo mejorar el rendimiento de intrusion detection frente a arquitecturas individuales. Uno de sus puntos más fuertes es la integración de varios modelos pre-entrenados dentro de un único framework, así como el uso de optimización de hiperparámetros para aumentar precisión y eficiencia. También destaca positivamente la transformación de datos de red en representaciones visuales, permitiendo aprovechar mejor las capacidades de las CNN. Sin embargo, la arquitectura propuesta puede resultar bastante pesada computacionalmente debido al uso simultáneo de ResNet50, GoogLeNet y AlexNet. Además, aunque los resultados son buenos, el estudio depende de datasets públicos tradicionales y no evalúa escenarios completamente reales o tráfico en tiempo real. A pesar de ello, el trabajo constituye un antecedente importante para investigaciones relacionadas con intrusion detection híbrido, Deep Learning aplicado a ciberseguridad y optimización mediante metaheurísticas.
