# ESTADO DEL ARTE

**Author (s): Claudio Zanasi, Silvio Russo, Michele Colajanni**

**Títle of paper: Flexible zero trust architecture for the cybersecurity of industrial IoT infrastructures**

**Journal: Ad Hoc Networks**

**Volume (issue): 156**

**pag – pag (year): 103414 (2024)**

## Estado del arte que hace el autor

Los autores realizan un análisis profundo sobre las limitaciones de las arquitecturas tradicionales de ciberseguridad aplicadas a entornos industriales modernos e infraestructuras Industrial Internet of Things (IIoT). Explican que el crecimiento de sistemas ciberfísicos, cloud computing, dispositivos IoT y ambientes de trabajo remoto ha provocado que los modelos clásicos basados en perímetros de red pierdan efectividad. Según el artículo, las soluciones tradicionales como VPNs y modelos centralizados ya no son suficientes debido al incremento de ataques sofisticados y a la necesidad de entornos descentralizados.

El trabajo revisa investigaciones previas relacionadas con Zero Trust, micro-segmentación y Software Defined Networking (SDN). Los autores mencionan que varios estudios anteriores consideran la micro-segmentación como una solución teóricamente efectiva, pero no abordan adecuadamente problemas reales relacionados con escalabilidad, mantenimiento de políticas de seguridad y administración dinámica de redes industriales heterogéneas.

Asimismo, se comparan diferentes enfoques de Zero Trust utilizados en cloud computing y redes SDN centralizadas. Los investigadores critican que muchas propuestas dependen excesivamente de controladores centrales, generando puntos únicos de fallo y reduciendo la resiliencia de la infraestructura. También se destaca que varias investigaciones asumen que los proveedores cloud son completamente confiables, contradiciendo principios fundamentales de Zero Trust.

Otro aspecto importante del estado del arte es el análisis de arquitecturas SDN basadas en OpenFlow. Los autores explican que estas soluciones permiten controlar dinámicamente el tráfico de red, pero presentan problemas de resiliencia, vulnerabilidades en controladores centrales y dificultades para implementar cifrado extremo a extremo en redes heterogéneas.

Finalmente, el artículo concluye que todavía existen desafíos abiertos en entornos IIoT relacionados con descentralización, administración automática de políticas, autenticación distribuida, compatibilidad con sistemas legacy y reducción de overhead operativo.

## Motivación del autor

La principal motivación del estudio surge debido al incremento de la digitalización industrial y la integración de tecnologías cloud e IoT en infraestructuras críticas. Los autores consideran que las organizaciones industriales modernas enfrentan un entorno altamente vulnerable debido a la gran cantidad de dispositivos conectados y a la creciente sofisticación de los ataques cibernéticos.

El artículo menciona que muchas arquitecturas actuales no logran satisfacer requerimientos críticos como resiliencia, operaciones en tiempo real, alta disponibilidad y descentralización. Además, los modelos tradicionales de confianza implícita dentro de las redes internas ya no son válidos en ambientes donde existen conexiones remotas, dispositivos heterogéneos y múltiples servicios cloud.

Otra motivación importante es la complejidad de administrar políticas de seguridad en entornos industriales grandes. Los autores señalan que mantener miles de reglas de micro-segmentación puede ser costoso, propenso a errores y difícil de escalar. También consideran preocupante la dependencia de controladores SDN centralizados, ya que representan un objetivo crítico para posibles atacantes.

Por ello, el objetivo principal del trabajo es diseñar una arquitectura Zero Trust flexible, descentralizada y compatible con infraestructuras industriales existentes, permitiendo mejorar la resiliencia sin afectar la continuidad operativa.

## Descripción del aporte del autor

El principal aporte del artículo es el diseño de una arquitectura Zero Trust específicamente optimizada para infraestructuras industriales IIoT. La propuesta combina micro-segmentación con redes definidas por software (SDN) y mecanismos distribuidos de autenticación mediante certificados digitales.

La arquitectura propuesta utiliza un modelo resource-centric donde cada recurso debe autenticarse antes de establecer comunicaciones. A diferencia de arquitecturas tradicionales basadas en perímetros, este enfoque elimina la confianza implícita entre dispositivos internos.

Otro aporte importante es la descentralización del Policy Decision Point (PDP) y Policy Enforcement Point (PEP). En lugar de depender de un controlador central, las decisiones de seguridad son aplicadas localmente por cada recurso utilizando políticas distribuidas. Esto incrementa significativamente la resiliencia y reduce el riesgo de fallos globales.

Los autores también proponen el uso de una overlay SDN basada en Nebula y WireGuard para implementar autenticación mutua y cifrado extremo a extremo. Gracias a ello, incluso protocolos industriales sin mecanismos de seguridad pueden operar de manera segura.

Además, la propuesta incorpora un sistema centralizado de administración de configuraciones capaz de generar automáticamente políticas locales para cada nodo. Esto reduce considerablemente la complejidad administrativa y permite adaptar dinámicamente las configuraciones según cambios en la red.

Finalmente, el trabajo aporta una solución compatible con sistemas legacy industriales, permitiendo una transición progresiva hacia modelos Zero Trust sin reemplazar completamente la infraestructura existente.

## Proceso para obtener el aporte que considera el autor

Para desarrollar la propuesta, los autores implementaron un prototipo funcional utilizando tecnologías open source. La arquitectura fue construida principalmente sobre Nebula, una solución SDN overlay descentralizada, junto con WireGuard para cifrado seguro.

Se desarrolló un sistema denominado NEST, encargado de gestionar el enrolamiento de clientes, distribución de certificados digitales y sincronización de configuraciones. Además, se diseñó un servicio de Certificate Authority responsable de emitir y renovar certificados digitales utilizados por los nodos.

El prototipo también incluye un Configuration Management Service capaz de mantener repositorios centralizados de políticas de seguridad y distribuir automáticamente configuraciones específicas a cada recurso.

La infraestructura de pruebas fue desplegada utilizando Microsoft Azure junto con dispositivos físicos reales como Raspberry Pi, computadoras Windows y smartphones Android. Los investigadores utilizaron máquinas virtuales de bajos recursos para demostrar que el sistema puede funcionar correctamente incluso en ambientes limitados.

Durante el desarrollo se aplicaron principios de autenticación mutua, peer-to-peer networking, micro-segmentación y monitoreo continuo de red.

## Proceso para resolver el problema considerado por el autor

Los autores realizaron múltiples pruebas experimentales para validar el funcionamiento de la arquitectura propuesta. Las evaluaciones incluyeron pruebas de enrolamiento de dispositivos, renovación automática de certificados y distribución dinámica de políticas.

También se analizaron escenarios de fallos individuales dentro de la infraestructura SDN para comprobar la resiliencia del sistema descentralizado. Gracias al modelo peer-to-peer, la red pudo continuar operando incluso cuando algunos componentes dejaban de estar disponibles.

Las pruebas incluyeron mediciones de consumo de CPU, uso de memoria RAM, estabilidad de conexiones y tiempos de respuesta bajo diferentes cantidades de clientes concurrentes. Se utilizaron dispositivos con recursos limitados para verificar la viabilidad del sistema en ambientes industriales reales.

Asimismo, se evaluó la capacidad de la arquitectura para mantener cifrado extremo a extremo y autenticación continua entre dispositivos heterogéneos distribuidos en diferentes entornos.

## Métricas que el autor usa y resultado que obtiene. Comentar

Las principales métricas utilizadas fueron tiempo de respuesta, consumo de CPU, uso de memoria, estabilidad de conexiones y cantidad de clientes concurrentes soportados.

Los resultados mostraron que la arquitectura propuesta introduce un overhead mínimo incluso utilizando máquinas virtuales de bajos recursos. Además, el sistema mantuvo estabilidad operativa aun bajo escenarios distribuidos y dinámicos.

Una de las métricas más importantes fue la capacidad de resiliencia frente a fallos individuales. Las pruebas demostraron que el enfoque descentralizado evita interrupciones globales incluso cuando ciertos nodos dejan de responder.

También se comprobó que la distribución asíncrona de políticas y certificados permite mantener comunicaciones seguras sin afectar significativamente el rendimiento de la red.

En mi opinión, las métricas utilizadas fueron adecuadas porque evalúan tanto rendimiento como resiliencia. Sin embargo, hubiera sido interesante incluir simulaciones reales de ciberataques industriales para validar aún más la propuesta.

## Observaciones y/o críticas suyas al artículo

El artículo presenta una propuesta sólida y moderna para resolver problemas actuales de ciberseguridad industrial. Uno de sus principales puntos fuertes es la descentralización del control de políticas, lo cual mejora considerablemente la resiliencia frente a ataques o fallos.

Otro aspecto positivo es el uso de tecnologías open source y la compatibilidad con sistemas legacy, ya que esto facilita la adopción progresiva de modelos Zero Trust en organizaciones industriales reales.

Sin embargo, el artículo tiene algunas limitaciones. La mayoría de pruebas fueron realizadas en entornos controlados y no en infraestructuras industriales críticas reales. Esto puede generar diferencias importantes entre el comportamiento experimental y situaciones reales de producción.

Además, aunque se menciona la reducción de complejidad administrativa, no se profundiza demasiado en los costos operativos ni en la dificultad de mantenimiento a gran escala.

Finalmente, considero que el trabajo podría fortalecerse incorporando análisis relacionados con inteligencia artificial aplicada a detección automática de amenazas dentro de la arquitectura propuesta.
