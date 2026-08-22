# Ministerio Vida - Página Web Oficial

Página web profesional para el Ministerio Vida en Santa Cruz, Bolivia. Diseñada con un tema oscuro y acentos en amarillo dorado.

## Descripción del Proyecto

Este proyecto es una landing page / sitio web estático desarrollado con HTML5, CSS3 y JavaScript vanilla. Sigue las mejores prácticas modernas de desarrollo frontend sin depender de frameworks externos.

## Características

- Diseño Responsive (Mobile First)
- Animaciones al hacer scroll (Intersection Observer)
- Menú de navegación fijo y adaptable (Hamburger menu)
- Carga perezosa (Lazy loading) de videos de YouTube con Modal integrado
- Tema oscuro optimizado con variables CSS

## Estructura del Proyecto

```
.
├── index.html        # Página principal
├── css/              # Estilos CSS
│   ├── style.css     # Estilos principales (variables, layout, secciones)
│   └── responsive.css# Media queries y adaptabilidad
├── js/               # Lógica JavaScript
│   ├── main.js       # UI, scroll, animaciones, forms
│   └── videos.js     # Lazy load y modales para videos de YouTube
├── assets/           # Imágenes, íconos y otros recursos estáticos
├── package.json      # Configuración de Node.js (scripts)
├── vercel.json       # Configuración para despliegue en Vercel
└── README.md         # Este archivo
```

## Cómo ejecutar en local

1. Asegúrate de tener Node.js instalado.
2. Abre la terminal en la raíz del proyecto.
3. Ejecuta el script de inicio para usar `serve`:

```bash
npm start
# o alternativamente
npx serve .
```

El sitio estará disponible en `http://localhost:3000`.

## Despliegue en Vercel

El proyecto está configurado para ser desplegado fácilmente en Vercel como un sitio estático.

1. Instala el CLI de Vercel (opcional) o conecta tu repositorio de GitHub a Vercel.
2. Si usas el CLI, ejecuta:
```bash
vercel
```
3. La configuración en `vercel.json` se encargará de los rewrites y cabeceras de seguridad.

## Instrucciones para actualizar contenido

- **Textos e Imágenes**: Modifica el archivo `index.html` y reemplaza los assets en la carpeta `assets/`.
- **Estilos**: Ajusta las variables CSS en `:root` dentro de `css/style.css` para cambiar colores globales.
- **Videos**: Añade la clase `.video-card` y el atributo `data-youtube-id="AQUI_EL_ID"` en tu HTML para que el script `videos.js` los procese automáticamente.
