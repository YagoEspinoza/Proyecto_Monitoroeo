# ESTADO DEL ARTE

**Author (s): Tri Widodo, Adam Sekti Aji**

Títle of paper: Implementation of Intrusion Detection System (IDS) and Snort Community Rules to Detect Types of Network Attacks

**Journal: International Journal of Computer Applications**

**Volume (issue): Volume 183 No. 42**

**pag – pag (year): 30 – 35 (2021)**

## Estado del arte que hace el autor

Los autores desarrollan una investigación enfocada en la implementación de un Intrusion Detection System utilizando Snort y reglas comunitarias para detectar distintos tipos de ataques de red. El artículo parte de la importancia creciente de proteger redes informáticas frente a amenazas como DoS, DDoS, SQL Injection, malware, spoofing y ataques FTP. Los autores revisan conceptos relacionados con IDS, firewalls y mecanismos de monitoreo de tráfico de red, explicando que muchas organizaciones implementan firewalls pero no necesariamente sistemas IDS capaces de detectar comportamientos sospechosos.

## Motivación del autor

La motivación principal del artículo surge debido a la baja adopción de sistemas IDS dentro de redes empresariales y académicas, a pesar del incremento constante de amenazas cibernéticas. Los autores consideran que muchas organizaciones dependen únicamente de firewalls, los cuales bloquean tráfico pero no necesariamente generan análisis detallado ni alertas sobre actividades sospechosas. Otra motivación importante es demostrar la efectividad de Snort Community Rules para detectar múltiples tipos de ataques de forma sencilla y eficiente.

## Descripción del aporte del autor

El principal aporte del artículo es la implementación práctica de un IDS basado en Snort utilizando reglas comunitarias oficiales para detectar diferentes ataques de red. Los autores desarrollan un entorno experimental utilizando Ubuntu, VirtualBox y Snort Community Rules obtenidas desde el sitio oficial de Snort. Otro aporte importante es la clasificación detallada de reglas según categorías de ataques, incluyendo ataques vía protocolos de red, malware, virus y ataques web.

## Proceso para obtener el aporte que considera el autor

Para obtener el aporte, los autores desarrollaron una metodología práctica dividida en varias etapas. Primero realizaron una revisión bibliográfica relacionada con IDS, Snort y mecanismos de detección de intrusiones. Posteriormente diseñaron una topología de red integrada con IDS utilizando Ubuntu como sistema operativo y VirtualBox como entorno de virtualización. Después instalaron Snort IDS e integraron las reglas comunitarias descargadas desde el sitio oficial de Snort.

## Proceso para resolver el problema considerado por el autor

Los autores resolvieron el problema implementando un sistema IDS basado en Snort capaz de monitorear tráfico de red y detectar automáticamente actividades sospechosas mediante reglas comunitarias. Primero configuraron una arquitectura de red integrada con Ubuntu y Snort IDS. Posteriormente descargaron e instalaron reglas comunitarias desde el sitio oficial de Snort para cubrir múltiples categorías de ataques.

## Métricas que el autor usa y resultado que obtiene. Comentar

El estudio utiliza principalmente métricas cualitativas basadas en capacidad de detección de ataques y generación de alertas por parte del IDS. Los resultados muestran que Snort IDS fue capaz de identificar correctamente actividades maliciosas dirigidas al servidor y generar alertas apropiadas utilizando reglas comunitarias.

## Observaciones y/o críticas suyas al artículo

El artículo resulta bastante útil porque presenta una implementación práctica y sencilla de un IDS utilizando herramientas ampliamente utilizadas dentro de ciberseguridad como Snort y Ubuntu. Sin embargo, las pruebas se realizan principalmente sobre simulaciones simples y no sobre entornos de producción con grandes volúmenes de tráfico.
