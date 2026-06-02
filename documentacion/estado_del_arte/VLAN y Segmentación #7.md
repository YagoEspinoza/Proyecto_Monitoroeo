# ESTADO DEL ARTE

**Author (s): Tareq Al-Khraishi and Muhannad Quwaider**

**Títle of paper: Performance Evaluation and Enhancement of VLAN via Wireless Networks using OPNET Modeler**

**Journal: International Journal of Wireless &amp; Mobile Networks (IJWMN)**

**Volume (issue): 12(3)**

**pag – pag (year): 15 – 30 (2020)**

## Estado del arte que hace el autor

Los autores desarrollan una investigación enfocada en la evaluación del rendimiento de redes inalámbricas WLAN utilizando VLAN y protocolos de routing adhoc. El artículo parte del problema del tráfico excesivo, broadcast innecesario y limitaciones de rendimiento presentes en redes inalámbricas tradicionales. El estado del arte revisa conceptos de WLAN, estándares IEEE 802.11, throughput, delay, access points, VLAN, trunking IEEE 802.1Q y protocolos adhoc como OLSR, DSR, AODV, TORA y GRP. También se analiza cómo VLAN permite segmentar dominios de broadcast y mejorar seguridad, administración y uso eficiente del ancho de banda. Asimismo, los autores revisan investigaciones previas relacionadas con evaluación de desempeño de redes inalámbricas y comparación de protocolos adhoc mediante simuladores como OPNET y NS-2. El artículo destaca que los estudios previos evaluaban WLAN, VLAN y protocolos adhoc por separado, mientras que esta investigación propone integrar VLAN sobre redes inalámbricas y posteriormente mejorar el throughput mediante protocolos de routing adhoc.

## Motivación del autor

La motivación principal del estudio surge por la necesidad de mejorar el rendimiento y seguridad de redes inalámbricas mediante segmentación VLAN. Los autores señalan que las redes WLAN tradicionales generan grandes dominios de broadcast, tráfico excesivo y desperdicio de ancho de banda. Además, aunque VLAN reduce tráfico y mejora seguridad, también puede reducir throughput, lo cual representa una desventaja importante en redes inalámbricas donde se requieren bajas latencias y alto rendimiento. Otra motivación importante es evaluar si los protocolos adhoc pueden compensar la reducción de throughput causada por VLAN. Por ello, el estudio busca analizar el comportamiento de redes WLAN con VLAN y posteriormente optimizar su rendimiento utilizando protocolos adhoc como OLSR, DSR, AODV, TORA y GRP.

## Descripción del aporte del autor

El principal aporte del artículo es la propuesta y evaluación de una arquitectura de red inalámbrica con VLAN utilizando simulación en OPNET Modeler 14.5. Los autores comparan tres escenarios: una WLAN tradicional, una WLAN con VLAN y una WLAN con VLAN optimizada mediante protocolos adhoc. Otro aporte importante es la evaluación comparativa de protocolos OLSR, DSR, AODV, TORA y GRP bajo diferentes densidades de nodos. Asimismo, el estudio demuestra que VLAN reduce delay y tráfico broadcast dentro de la red inalámbrica, mientras que protocolos adhoc pueden mejorar el throughput. Finalmente, el trabajo aporta resultados experimentales que muestran el impacto de VLAN y protocolos adhoc sobre métricas de delay y throughput en entornos inalámbricos.

## Proceso para obtener el aporte que considera el autor

Para obtener el aporte, los autores diseñaron varios escenarios de simulación utilizando OPNET Modeler 14.5. Primero analizaron conceptos relacionados con WLAN, VLAN y protocolos adhoc. Luego construyeron una red inalámbrica con 20 nodos conectados mediante access points, switches Ethernet y servidores. Posteriormente desarrollaron un escenario WLAN tradicional y otro con segmentación VLAN utilizando trunking IEEE 802.1Q. Después generaron tráfico pesado mediante aplicaciones FTP y HTTP. Finalmente implementaron protocolos adhoc OLSR, DSR, AODV, TORA y GRP en escenarios de baja, media y alta densidad para evaluar delay y throughput mediante simulaciones comparativas.

## Proceso para resolver el problema considerado por el autor

Los autores resolvieron el problema implementando VLAN sobre una red WLAN para dividir el dominio de broadcast y reducir tráfico innecesario. Primero segmentaron la red en VLAN10 y VLAN20, asignando grupos específicos de estaciones inalámbricas y servidores a cada VLAN. Luego utilizaron trunking IEEE 802.1Q para permitir el transporte de múltiples VLAN entre switches. Posteriormente evaluaron el impacto de VLAN sobre delay y throughput. Debido a que VLAN redujo throughput, los autores implementaron protocolos adhoc como OLSR, DSR, AODV, TORA y GRP para optimizar el rendimiento de la WLAN segmentada. Finalmente compararon resultados para identificar qué protocolo ofrece mejor comportamiento dentro de la red inalámbrica con VLAN.

## Métricas que el autor usa y resultado que obtiene. Comentar

El artículo utiliza métricas relacionadas con delay y throughput. El delay representa el tiempo requerido para transmitir datos desde el origen hasta el destino, mientras que throughput representa la tasa de transferencia de datos recibidos correctamente. Los resultados muestran que la implementación de VLAN reduce significativamente el delay debido a la disminución de tráfico broadcast. Sin embargo, VLAN también reduce throughput debido a la segmentación del tráfico. Además, entre los protocolos adhoc evaluados, OLSR presentó el menor delay gracias a que es un protocolo proactivo con rutas siempre disponibles. En mi opinión, las métricas utilizadas son adecuadas porque permiten analizar rendimiento real de redes inalámbricas segmentadas. Además, el uso de simulaciones comparativas proporciona evidencia clara del impacto de VLAN y routing adhoc sobre el comportamiento de la red.

## Observaciones y/o críticas suyas al artículo

El artículo es bastante útil porque combina conceptos de WLAN, VLAN y protocolos adhoc dentro de un mismo entorno experimental. Uno de sus puntos fuertes es el uso de OPNET Modeler para desarrollar escenarios comparativos detallados y evaluar métricas importantes como delay y throughput. También resulta valioso que los autores analicen cómo VLAN mejora seguridad y administración mediante reducción de broadcast. Otro aspecto importante es la comparación entre varios protocolos adhoc bajo distintas densidades de red. Sin embargo, el estudio se enfoca principalmente en simulación y no presenta implementación en entornos reales. Además, el trabajo podría fortalecerse incorporando métricas adicionales como packet loss, jitter o consumo energético. A pesar de ello, constituye un antecedente importante para investigaciones relacionadas con segmentación VLAN, WLAN y optimización de rendimiento mediante protocolos adhoc.
