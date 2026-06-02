# ESTADO DEL ARTE

**Author (s): Yanmeng Mo, Huige Li, Dongsheng Wang, Gaqiong Liu**

**Títle of paper: An intrusion detection system based on convolution neural network**

**Journal: PeerJ Computer Science**

**Volume (issue): 10:e2152**

**pag – pag (year): 1 – 23 (2024)**

## Estado del arte que hace el autor

Los autores desarrollan una investigación enfocada en mejorar la detección de intrusiones mediante un sistema basado en Convolutional Neural Networks denominado SA-BO-CNN. El estado del arte inicia explicando cómo el crecimiento exponencial de Internet y de los ciberataques ha provocado que los sistemas tradicionales de detección ya no sean suficientes para enfrentar amenazas modernas. El artículo revisa diversos enfoques de Machine Learning y Deep Learning aplicados a intrusion detection, incluyendo Random Forest, SVM, AdaBoost, KNN, RNN, GRU, LSTM y CNN. También analiza investigaciones recientes relacionadas con IoT security, ensemble learning, deep neural networks y modelos híbridos. Los autores destacan que muchas soluciones existentes todavía presentan limitaciones relacionadas con baja tasa de detección, dependencia excesiva de extracción manual de características y dificultades para manejar datos complejos y desbalanceados. Asimismo, el trabajo resalta el potencial de las CNN debido a su capacidad para extraer automáticamente características espaciales importantes sin necesidad de ingeniería manual avanzada.

## Motivación del autor

La motivación principal del artículo surge por la necesidad urgente de fortalecer la seguridad de red frente a ataques cada vez más complejos y sofisticados. Los autores consideran que las soluciones tradicionales de intrusion detection ya no logran detectar adecuadamente amenazas modernas, lo que mantiene vigente la crisis de seguridad informática. Otra motivación importante es que muchos enfoques Machine Learning tradicionales dependen demasiado de la construcción manual de características, lo cual limita la capacidad de generalización y eficiencia del sistema. Además, los autores identifican problemas relacionados con desbalance de datos y baja capacidad de extracción de características relevantes. Frente a ello, el estudio busca combinar Sparse Autoencoder, Bayesian Optimization y CNN para construir un IDS más inteligente, preciso y eficiente.

## Descripción del aporte del autor

El principal aporte del artículo es la propuesta del framework SA-BO-CNN, un sistema de intrusion detection basado en Convolutional Neural Networks optimizado mediante Sparse Autoencoder y Bayesian Optimization. Primero, el framework utiliza SMOTE resampling para reducir el problema de desbalance de datos dentro del dataset NSL-KDD. Luego implementa Sparse Autoencoder para realizar extracción de características y reducción de dimensionalidad de manera automática. Finalmente, incorpora Bayesian Optimization junto con CNN para optimizar hiperparámetros y mejorar el accuracy del sistema. Otro aporte importante es la utilización de múltiples rondas iterativas para refinar continuamente la capacidad de detección. El estudio demuestra que la integración de Bayesian Optimization mejora métricas como accuracy, precision, recall y F1-score.

## Proceso para obtener el aporte que considera el autor

Para obtener el aporte, los autores desarrollaron una metodología organizada en tres grandes etapas. Primero realizaron el preprocesamiento de datos utilizando one-hot encoding para variables categóricas, SMOTE para balanceo de datos y normalización de características. Después implementaron un Sparse Autoencoder encargado de reducir dimensionalidad y extraer representaciones relevantes del tráfico de red. Posteriormente utilizaron estas representaciones como entrada de una CNN entrenada para clasificación de ataques. Además, aplicaron Bayesian Optimization para ajustar automáticamente hiperparámetros del modelo y maximizar el desempeño. Finalmente, evaluaron el framework utilizando el dataset NSL-KDD y compararon los resultados obtenidos frente a enfoques previos de la literatura.

## Proceso para resolver el problema considerado por el autor

Los autores resolvieron el problema mediante una arquitectura CNN fortalecida con técnicas adicionales de optimización y extracción de características. Primero redujeron el impacto del desbalance de datos mediante SMOTE resampling. Luego emplearon Sparse Autoencoder para capturar características importantes y reducir ruido o redundancia dentro del dataset. Posteriormente, las características optimizadas fueron procesadas mediante CNN para clasificar diferentes tipos de ataques de red. Además, Bayesian Optimization permitió seleccionar hiperparámetros óptimos de manera automática, incrementando la capacidad predictiva del modelo. Finalmente, el sistema fue refinado mediante múltiples iteraciones hasta alcanzar un desempeño elevado en intrusion detection.

## Métricas que el autor usa y resultado que obtiene. Comentar

El estudio utiliza métricas como accuracy, precision, recall y F1-score para evaluar el desempeño del framework SA-BO-CNN. Los resultados muestran que el sistema alcanza 98.36% de accuracy sobre el dataset NSL-KDD, demostrando mejoras significativas frente a varios métodos previos. También se observa un incremento importante en capacidad de detección gracias a Bayesian Optimization y Sparse Autoencoder. En mi opinión, el enfoque de métricas es bastante adecuado porque considera no solo accuracy sino también calidad de clasificación mediante precision y recall. Además, el uso de F1-score permite evaluar mejor el equilibrio entre detección y falsos positivos. Sin embargo, el estudio podría complementarse con pruebas sobre datasets más recientes y escenarios de tráfico en tiempo real para validar aún más la robustez del sistema.

## Observaciones y/o críticas suyas al artículo

El artículo presenta una propuesta bastante sólida porque combina varias técnicas complementarias dentro de un mismo framework: SMOTE, Sparse Autoencoder, Bayesian Optimization y CNN. Uno de sus puntos más fuertes es que aborda simultáneamente problemas de desbalance de datos, extracción de características y optimización de hiperparámetros. También destaca positivamente el uso de CNN para automatizar aprendizaje de características sin depender excesivamente de ingeniería manual. Sin embargo, el framework depende principalmente del dataset NSL-KDD, el cual aunque sigue siendo popular, ya tiene ciertas limitaciones frente a amenazas modernas más complejas. Además, la incorporación de múltiples componentes puede incrementar el costo computacional del sistema. A pesar de ello, el trabajo representa un antecedente muy importante para investigaciones relacionadas con intrusion detection basado en CNN, Deep Learning aplicado a ciberseguridad y optimización inteligente de modelos.
