# Low Kane | Official Website

Premium landing page para el artista musical Low Kane.

## Diseño Conceptual

**Concepto:** "Shadow & Sound" - Una experiencia inmersiva que refleja la dualidad del sonido urbano oscuro meets sofisticación minimalista.

**Inspiración visual:**
- Apple Pro product pages (espaciado, tipografía)
- adidas Yeezy aesthetic (minimalismo oscuro)
- Sitios de artistas como Travis Scott, Kanye West

## Estructura de Archivos

```
Low Kane/
├── index.html          # Estructura principal
├── styles.css          # Estilos y animaciones
├── script.js           # Interactividad
├── README.md           # Este archivo
├── DSC08775 - BY BLVCKSUS.jpg    # Hero image (portrait)
├── DSC08996 - BY BLVCKSUS.jpg    # Studio overhead
└── DSC09031 - BY BLVCKSUS.jpg    # Gallery shot
```

## Características

### Visuales
- [x] Cursor customizado con efecto magnético
- [x] Animaciones scroll-triggered suaves
- [x] Parallax sutil en hero section
- [x] Lazy loading para imágenes
- [x] Gradientes y overlays atmosféricos
- [x] Tipografía premium (Space Grotesk + Inter)

### Técnicas
- [x] 100% responsive (mobile-first)
- [x] Sin dependencias externas (vanilla JS)
- [x] Optimizado para performance
- [x] Accesible (keyboard nav, focus states)
- [x] Respeta prefers-reduced-motion

### Secciones
1. **Hero** - Impacto visual inmediato con tipografía cinemática
2. **About** - Storytelling minimalista con imagen cenital del estudio
3. **Music** - Integración con YouTube
4. **Gallery** - Grid asimétrico con las 3 fotos
5. **Contact** - Footer limpio con links sociales

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Black | `#0a0a0a` | Fondo principal |
| Black Light | `#111111` | Secciones alternas |
| Black Medium | `#1a1a1a` | Borders, cards |
| Gray Dark | `#2a2a2a` | Divisores |
| Gray | `#888888` | Texto secundario |
| Gray Light | `#b8b8b8` | Texto body |
| White | `#ffffff` | Texto principal |
| White Dim | `rgba(255,255,255,0.8)` | Texto secundario |

## Tipografía

- **Display:** Space Grotesk (títulos, logo)
- **Body:** Inter (texto corrido, UI)

## Cómo Usar

1. Asegúrate de que las 3 imágenes estén en la misma carpeta
2. Abre `index.html` en cualquier navegador moderno
3. Para producción, considera:
   - Optimizar imágenes (WebP con fallback)
   - Minificar CSS/JS
   - Agregar meta tags SEO específicos
   - Configurar hosting (Vercel, Netlify, etc.)

## Personalización

### Cambiar enlaces de YouTube
Edita los `iframe` en la sección `#music` con los IDs de video específicos:
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
```

### Modificar textos
Todos los textos están en `index.html`. Las secciones clave son:
- Hero subtitle (línea ~47)
- About text (líneas ~55-65)
- Email de contacto (línea ~130)

### Ajustar animaciones
En `styles.css`, modifica las variables CSS:
```css
:root {
    --duration-slow: 0.8s;      /* Animaciones largas */
    --duration-medium: 0.5s;    /* Transiciones UI */
    --duration-fast: 0.3s;      /* Hover states */
}
```

## Créditos

- **Diseño & Desarrollo:** Creative Web Director AI
- **Fotografía:** BLVCKSUS
- **Artista:** Low Kane

---

&copy; 2026 Low Kane. Todos los derechos reservados.
