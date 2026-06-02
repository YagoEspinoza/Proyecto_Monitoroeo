# ESTADO DEL ARTE

**Author (s): Antonio Francesco Gentile, Peppino Fazio and Giuseppe Miceli**

Títle of paper: A Survey on the Implementation and Management of Secure Virtual Private Networks (VPNs) and Virtual LANs (VLANs) in Static and Mobile Scenarios

**Journal: Telecom**

**Volume (issue): 2(4)**

**pag – pag (year): 430 – 445 (2021)**

## Estado del arte que hace el autor

Los autores desarrollan una investigación tipo survey orientada al análisis de las tecnologías VPN y VLAN en escenarios estáticos y móviles. El artículo revisa ampliamente investigaciones relacionadas con redes inalámbricas, seguridad de redes, segmentación lógica, movilidad y administración de conexiones seguras. El estado del arte aborda protocolos VPN clásicos como OpenVPN, L2TP/IPsec, SSTP, PPTP e IKEv2, explicando sus características, ventajas y limitaciones. También revisa tecnologías VLAN como IEEE 802.1Q, VTP, trunking y tagged VLANs. Además, el trabajo analiza investigaciones previas relacionadas con movilidad en VPN, protocolos para redes móviles, técnicas de caching, Mobile VPN, WireGuard y soluciones para UAVs conectados mediante LTE y 5G. Otro aspecto importante es la revisión de problemas de seguridad relacionados con VPN y VLAN, incluyendo IDS, IPS y sistemas de detección de intrusos. Finalmente, los autores destacan que la movilidad y el crecimiento de dispositivos inalámbricos generan nuevos desafíos relacionados con seguridad, rendimiento y administración de redes virtuales.

## Motivación del autor

La motivación principal del estudio surge debido al crecimiento acelerado de conexiones remotas, movilidad laboral, cloud computing y dispositivos móviles conectados a Internet. Los autores señalan que las organizaciones necesitan mecanismos seguros y eficientes para conectar sedes remotas, trabajadores móviles y servicios distribuidos utilizando infraestructura pública como Internet. Además, el incremento de dispositivos inalámbricos y tecnologías 5G genera problemas relacionados con pérdida de paquetes, movilidad, seguridad y administración del tráfico. Otra motivación importante es que las tecnologías VPN y VLAN tradicionales fueron diseñadas principalmente para redes estáticas, por lo que presentan limitaciones en escenarios móviles. Asimismo, el estudio busca analizar cómo nuevas soluciones como WireGuard, Mobile VPN y segmentación VLAN pueden mejorar seguridad, rendimiento y escalabilidad en redes modernas.

## Descripción del aporte del autor

El principal aporte del artículo es la elaboración de un survey detallado sobre tecnologías VPN y VLAN aplicadas en escenarios estáticos y móviles. Los autores integran en un solo trabajo conceptos relacionados con protocolos VPN, segmentación VLAN, movilidad, seguridad y administración de redes inalámbricas. Otro aporte importante es la comparación de diferentes protocolos VPN como OpenVPN, L2TP/IPsec, SSTP, PPTP e IKEv2, describiendo sus ventajas, niveles de seguridad y rendimiento. Asimismo, el artículo analiza soluciones modernas como WireGuard y Mobile VPN para escenarios con movilidad. También aporta ejemplos prácticos de implementación de VLAN y configuraciones de seguridad utilizando switches Cisco. Finalmente, el trabajo propone buenas prácticas para proteger redes virtuales mediante firewalls, IDS, IPS, VTP seguro, ACLs y segmentación lógica del tráfico.

## Proceso para obtener el aporte que considera el autor

Para obtener el aporte, los autores realizaron una revisión exhaustiva de investigaciones relacionadas con VPNs, VLANs, movilidad y seguridad de redes. Primero analizaron protocolos VPN tradicionales y modernos, describiendo su funcionamiento y aplicaciones. Luego estudiaron tecnologías VLAN y mecanismos de segmentación lógica como IEEE 802.1Q y VTP. Posteriormente revisaron investigaciones enfocadas en movilidad dentro de VPNs y VLANs, incluyendo técnicas de caching, session resume, DHCP relay y Mobile VPN. Después analizaron soluciones modernas como WireGuard y escenarios prácticos relacionados con UAVs, LTE y 5G. Finalmente, integraron ejemplos reales de configuración de seguridad en switches Cisco, firewalls y sistemas IDS/IPS para mostrar cómo implementar redes virtuales seguras en ambientes empresariales y móviles.

## Proceso para resolver el problema considerado por el autor

Los autores resolvieron el problema mediante el análisis y comparación de múltiples tecnologías VPN y VLAN enfocadas en mejorar seguridad y movilidad en redes modernas. Primero explicaron cómo los protocolos VPN crean túneles seguros para proteger tráfico sobre Internet. Luego describieron cómo VLAN segmenta redes lógicamente para reducir broadcast y mejorar administración. Posteriormente evaluaron mecanismos de movilidad para mantener sesiones VPN estables durante handovers y cambios de red inalámbrica. Además, analizaron tecnologías como WireGuard y Mobile VPN para optimizar conexiones móviles. En el caso de VLAN, los autores propusieron soluciones relacionadas con DHCP relay, administración dinámica de direcciones IP y segmentación eficiente. Finalmente, incorporaron mecanismos de seguridad como ACLs, firewalls, IDS e IPS para prevenir ataques y proteger el tráfico dentro de redes virtuales.

## Métricas que el autor usa y resultado que obtiene. Comentar

El artículo utiliza métricas relacionadas con throughput, packet loss, latencia, estabilidad de conexión, movilidad, consumo energético y seguridad de red. Los autores comparan protocolos VPN considerando velocidad de transmisión, capacidad de reconexión, overhead, estabilidad y soporte para movilidad. Además, en escenarios móviles se analiza la capacidad de mantener sesiones activas durante handovers entre redes WiFi y LTE. También se consideran métricas relacionadas con seguridad como autenticación, cifrado, detección de ataques y prevención de intrusiones. Los resultados muestran que tecnologías modernas como WireGuard presentan mejor rendimiento, menor latencia y menor consumo energético comparado con protocolos tradicionales. Asimismo, VLAN mejora administración y segmentación de redes, mientras que IDS e IPS fortalecen la protección frente a ataques. En mi opinión, las métricas utilizadas son bastante completas porque no solo consideran rendimiento técnico sino también seguridad, movilidad y eficiencia operativa dentro de redes modernas.

## Observaciones y/o críticas suyas al artículo

El artículo es bastante completo porque integra conceptos de VPN, VLAN, movilidad y seguridad dentro de un mismo survey técnico. Uno de sus principales puntos fuertes es que compara múltiples protocolos y tecnologías modernas aplicadas tanto en redes empresariales como en escenarios móviles y 5G. También resulta valioso que incluya ejemplos prácticos de configuración Cisco y mecanismos de protección mediante IDS e IPS. Otro aspecto importante es el análisis de WireGuard y aplicaciones en UAVs y redes LTE/5G, lo cual hace que el trabajo sea bastante actual. Sin embargo, al tratarse de un survey, el artículo se enfoca más en revisión teórica que en experimentación propia. Además, algunas comparaciones de rendimiento podrían fortalecerse con pruebas prácticas y simulaciones experimentales más profundas. A pesar de ello, constituye un antecedente muy importante para investigaciones relacionadas con VPN, VLAN, movilidad y seguridad de redes.
