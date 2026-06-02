# ESTADO DEL ARTE

**Author (s): Di Li, Zhibang Yang, Siyang Yu, Mingxing Duan, Shenghong Yang**

**Títle of paper: A Micro-Segmentation Method Based on VLAN-VxLAN Mapping Technology**

**Journal: Future Internet**

**Volume (issue): 16(320)**

**pag – pag (year): 1 – 24 (2024)**

## Estado del arte que hace el autor

Los autores desarrollan una investigación orientada a la micro-segmentación en centros de datos cloud utilizando tecnologías VLAN y VxLAN dentro de arquitecturas Zero Trust. El artículo parte del problema de seguridad en cloud computing, especialmente relacionado con tráfico east-west, aislamiento de tenants y falta de visibilidad dentro de centros de datos virtualizados. El estado del arte revisa conceptos de Zero Trust Architecture (ZTA), micro-segmentation, VxLAN, SDN, VTEP, gateways centralizados y distribuidos, trust evaluation y behavioural profiling. También se analizan investigaciones previas relacionadas con segmentación basada en agentes host, micro-segmentación basada en red y técnicas de aislamiento utilizando SDN. Asimismo, el trabajo explica cómo VxLAN permite crear más de 16 millones de segmentos mediante VNIs y cómo VLAN tradicional ya no es suficiente para escenarios cloud modernos. Finalmente, los autores destacan que existe poca investigación sobre el uso conjunto de VLAN y VxLAN en escenarios de micro-segmentación.

## Motivación del autor

La motivación principal del estudio surge debido al crecimiento de cloud computing y los nuevos desafíos de seguridad presentes en centros de datos modernos. Los autores señalan que las arquitecturas tradicionales presentan problemas para controlar tráfico interno east-west y aplicar políticas Zero Trust de manera eficiente. Además, los métodos de micro-segmentación basados en agentes host generan problemas de compatibilidad, consumo de recursos y costos elevados. Otra motivación importante es que las soluciones actuales suelen depender de fabricantes específicos o requieren interrupciones de servicio para su implementación. Por ello, el estudio busca desarrollar un método de micro-segmentación basado en VLAN-VxLAN que sea independiente del fabricante, económico, fácil de implementar y capaz de mejorar visibilidad y control del tráfico interno en centros de datos cloud.

## Descripción del aporte del autor

El principal aporte del artículo es la propuesta de un método de micro-segmentación basado en mapeo many-to-one entre VLAN y VxLAN. Los autores diseñan una arquitectura donde cada máquina virtual recibe una VLAN única, pero múltiples VLAN se asocian al mismo VNI, obligando que todo el tráfico pase por el gateway VxLAN de capa 3. Otro aporte importante es que la solución no requiere modificar aplicaciones ni interrumpir servicios. Asimismo, el estudio aporta una evaluación basada en graph theory para medir exposición de ataques y visibilidad del tráfico mediante el indicador Probability of Attack Exposure (PoAE). Finalmente, el trabajo incorpora un algoritmo mejorado de behavioural profiling para detectar comportamientos anómalos de activos internos dentro del centro de datos.

## Proceso para obtener el aporte que considera el autor

Para obtener el aporte, los autores realizaron una revisión de investigaciones relacionadas con Zero Trust, micro-segmentación y VxLAN. Luego analizaron las limitaciones de enfoques tradicionales basados en host-agents y arquitecturas SDN dependientes de fabricantes. Posteriormente diseñaron una arquitectura de micro-segmentación basada en mapeo VLAN-VxLAN utilizando gateways VxLAN y túneles encapsulados mediante UDP. Después asignaron VLAN únicas a máquinas virtuales y las asociaron al mismo VNI para evitar forwarding directo dentro del vSwitch. También construyeron modelos de topología utilizando graph theory para representar relaciones de acceso entre nodos. Finalmente evaluaron la efectividad del método mediante análisis de tráfico visible, exposición de ataques y comportamiento anómalo de activos.

## Proceso para resolver el problema considerado por el autor

Los autores resolvieron el problema transformando la topología lógica tradicional basada en bus hacia una topología tipo estrella mediante micro-segmentación VLAN-VxLAN. Primero asignaron una VLAN distinta a cada máquina virtual, evitando comunicación horizontal directa dentro del vSwitch. Luego configuraron el tráfico para que obligatoriamente pase por el gateway VxLAN L3 antes de llegar a otro host. Posteriormente utilizaron gateways y túneles VxLAN para encapsular tráfico y mantener conectividad entre segmentos. Además, aplicaron técnicas de traffic mirroring y análisis de comportamiento para incrementar visibilidad y detección de amenazas internas. Finalmente evaluaron el Probability of Attack Exposure demostrando que la micro-segmentación incrementa la visibilidad del tráfico y reduce riesgos de ataques laterales dentro del centro de datos.

## Métricas que el autor usa y resultado que obtiene. Comentar

El artículo utiliza métricas relacionadas con exposición de ataques, tráfico visible, network aggregation y comportamiento anómalo de activos. La principal métrica propuesta es Probability of Attack Exposure (PoAE), la cual mide la proporción de tráfico que puede ser analizado dentro de la red. Los resultados muestran que sin micro-segmentación gran parte del tráfico interno no puede ser monitoreado, mientras que con micro-segmentación prácticamente todo el tráfico debe pasar por el gateway y puede ser inspeccionado. Asimismo, los autores indican que el método incrementa la carga del gateway aproximadamente entre 1.5 y 2 veces, aunque consideran que el beneficio en seguridad compensa dicho costo. En mi opinión, las métricas utilizadas son bastante interesantes porque combinan seguridad, visibilidad y análisis topológico de la red, ofreciendo una evaluación más profunda que estudios tradicionales centrados únicamente en throughput o delay.

## Observaciones y/o críticas suyas al artículo

El artículo es bastante sólido porque integra conceptos modernos como Zero Trust, micro-segmentación, VxLAN y behavioural profiling dentro de una propuesta práctica para centros de datos cloud. Uno de sus puntos fuertes es que el método es independiente del fabricante y no requiere modificaciones sobre las aplicaciones existentes. También resulta valioso que los autores utilicen graph theory y Probability of Attack Exposure para evaluar seguridad y visibilidad del tráfico. Otro aspecto importante es que el trabajo aborda directamente el problema del tráfico east-west dentro de cloud data centers. Sin embargo, el estudio incrementa la carga sobre gateways VxLAN, lo cual podría representar un problema en infraestructuras extremadamente grandes. Además, aunque la propuesta es bastante completa, sería interesante evaluar el impacto real sobre latencia y rendimiento en ambientes productivos de gran escala. A pesar de ello, constituye un antecedente muy importante para investigaciones relacionadas con VLAN, VxLAN, micro-segmentación y Zero Trust.
