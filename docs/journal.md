# Diario de desarollo

## 2025-12-15
- Elegí Astro como framework para el portafolio porque está pensado para sitios que muestran contenido más que para aplicaciones web complejas. Se basa en cargar los recursos del lado del servidor y enviar HTML estático al cliente, lo que mejora la velocidad de carga y el SEO.
- Seguí el tutorial oficial para crear un proyecto básico con Astro.

## 2025-12-21
- Cambié la paleta de colores accent de verde lima a amarillo Lemon Glacier (#FDFF00) para darle un toque más vibrante y estético al portfolio. Actualicé todos los estados hover, focus y selección.
- Cambié la tipografía del proyecto a Work Sans, importándola desde Google Fonts.
- Implementé un efecto de "decodificación" en los enlaces del navbar: al pasar el mouse, el texto se codifica con caracteres aleatorios y luego se decodifica letra por letra. Añadí llaves `{}` amarillas que aparecen y se animan en hover/focus.
- Creé la página principal de Trabajos (`/trabajos`) con efecto de bienvenida: al cargar, aparece "BIENVENIDO" que se decodifica, hace una pausa y luego transiciona a "RODRIGO AMARILLA" con el mismo efecto.
- Diseñé el layout principal usando grid de 4 columnas: nombre (izquierda, font-weight 300, 5rem), título profesional, ubicación y hora en tiempo real. Las columnas de info están posicionadas a 18rem de margin-left con alineamiento vertical centrado.
- Añadí prop `noPadding` al BaseLayout para permitir control total del espacio horizontal en páginas específicas.
- Desactivé el riel lateral del nombre para mantener la vista limpia.
- Implementé diseño responsivo: en tablets (≤1024px) el layout cambia a columna única con nombre a 3.5rem, en móviles (≤640px) el nombre baja a 2.5rem y el texto de información a 0.65rem.
- Agregué una sección de proyectos tipo "tren" horizontal debajo del contenido principal con scroll horizontal. Los vagones son tarjetas de 350x240px alineadas desde la izquierda (padding 2rem) con hover effect que levanta la tarjeta y cambia el borde a amarillo.
- Ajusté el layout vertical para que todo quepa en una vista: min-height de 62vh en la sección principal y padding de 1.5rem en la sección de proyectos, posicionando las tarjetas exactamente en el límite del borde inferior sin cortarse.
- Configuré la ruta raíz (/) para redirigir a `/trabajos` y actualicé el navbar con los enlaces correctos (Trabajos, Info, Archive).