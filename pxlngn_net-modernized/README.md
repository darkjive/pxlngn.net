# pxlngn.net

Persönliche Portfolio-Website von Alain Ritter – Generalist aus Überzeugung.

## Tech Stack

- **[Astro 5.0](https://astro.build/)** - Static Site Generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-First CSS Framework
- **[anime.js v4](https://animejs.com)** - Animation Library für Scroll-Animationen
- **[TypeScript](https://www.typescriptlang.org/)** - Type-Safe JavaScript
- **AstroWind Template** - Basis-Template (angepasst)

## Features

- ✅ Performante Static Site mit Lighthouse Score 100
- ✅ Dark Mode Support
- ✅ Responsive Design (Mobile-First)
- ✅ Scroll-basierte Animationen mit IntersectionObserver
- ✅ Blog-Support mit MDX
- ✅ SEO-optimiert mit Open Graph Tags
- ✅ View Transitions Support
- ✅ Image Optimization

## Projekt-Struktur

```
/
├── public/              # Statische Assets (Bilder, Fonts, etc.)
├── src/
│   ├── assets/         # Optimierte Assets (verarbeitet von Astro)
│   ├── components/     # Wiederverwendbare Komponenten
│   │   ├── blog/       # Blog-spezifische Komponenten
│   │   ├── common/     # Gemeinsame Komponenten
│   │   ├── ui/         # UI-Komponenten
│   │   └── widgets/    # Page-Widgets
│   ├── content/        # Content Collections (MDX Posts)
│   ├── layouts/        # Layout-Komponenten
│   ├── pages/          # File-based Routing
│   ├── scripts/        # Client-Side Scripts
│   │   └── animations.js  # Animation System (anime.js)
│   ├── utils/          # Utility Functions
│   └── config.yaml     # Site Configuration
├── package.json
└── astro.config.ts
```

## Commands

| Command           | Action                                               |
| :---------------- | :--------------------------------------------------- |
| `npm install`     | Installiert Dependencies                             |
| `npm run dev`     | Startet Dev-Server auf `localhost:4321`              |
| `npm run build`   | Baut Production Site nach `./dist/`                  |
| `npm run preview` | Lokale Preview des Production Builds                 |
| `npm run check`   | Prüft Projekt auf Fehler (Astro + ESLint + Prettier) |
| `npm run fix`     | Formatiert Code mit ESLint und Prettier              |

## Konfiguration

Die Basis-Konfiguration befindet sich in `./src/config.yaml`:

```yaml
site:
  name: 'pxlngn | PIXEL ENGINE'
  site: 'https://pxlngn.net'
  base: '/'
  trailingSlash: false

metadata:
  title:
    default: 'pxlngn | PIXEL ENGINE'
    template: '%s | pxlngn'
  description: 'Portfolio von Alain Ritter - Generalist für Web-Entwicklung, Design und Projektmanagement'
  # ... weitere Optionen
```

## Animations System

Das Projekt nutzt ein custom Animation-System basierend auf **anime.js v4**:

### Verwendung

```html
<!-- Fade-In von unten -->
<div data-animate data-anim-type="fade-up">Content</div>

<!-- Mit Delay -->
<div data-animate data-anim-type="fade-left" data-anim-delay="200">Content</div>

<!-- Typewriter-Effekt -->
<p data-animate data-anim-type="typewriter">Text erscheint Buchstabe für Buchstabe</p>

<!-- Cycle-Typewriter (rotierende Wörter) -->
<span data-animate data-anim-type="cycle-typewriter"></span>
```

### Verfügbare Animations-Typen

- `fade-up` / `fade-down` / `fade-left` / `fade-right` - Fade mit Richtung
- `scale-up` - Skalierung von klein nach groß
- `typewriter` - Typewriter-Effekt für Text
- `cycle-typewriter` - Rotierende Wörter mit Farben
- `glitch` - Glitch-Effekt mit Loop
- `step-fade` - Fade für Timeline-Steps

Details: [src/scripts/animations.js](src/scripts/animations.js)

## Deployment

### IONOS Deploy & Space

Das Projekt wird auf **IONOS Deploy & Space** gehostet:

1. **Build**:

   ```bash
   npm run build
   ```

2. **Deploy**:
   - Automatisches Deployment via Git-Integration
   - Branch: `main` (oder konfigurierter Branch)
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**:
   - Können in IONOS Dashboard konfiguriert werden
   - `.env` Dateien werden NICHT committed (siehe `.gitignore`)

### Alternative Deployment-Optionen

Das Projekt kann auch auf anderen Plattformen deployed werden:

- **Vercel**: `vercel deploy`
- **Netlify**: Direktes Git-Deploy
- **Cloudflare Pages**: Git-Integration
- **Static Hosting**: Upload des `dist` Folders

## Development

### Neue Komponente erstellen

```bash
# Beispiel: Button-Komponente
touch src/components/ui/MyButton.astro
```

### Blog-Post hinzufügen

```bash
# Erstelle neue MDX-Datei
touch src/content/post/my-new-post.mdx
```

Frontmatter-Beispiel:

```yaml
---
title: 'Mein neuer Post'
publishDate: 2024-01-15
description: 'Beschreibung des Posts'
category: 'Web Development'
tags: ['javascript', 'astro']
---
```

### Styles anpassen

- Tailwind Config: `tailwind.config.js`
- Custom Styles: `src/assets/styles/tailwind.css`
- Komponenten-Styles: `src/components/CustomStyles.astro`

## Browser Support

- Chrome/Edge (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Mobile)

## Performance

Das Projekt erreicht in PageSpeed Insights:

- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Optimierungen:

- Image Optimization via Astro Assets
- CSS/JS Minification
- Critical CSS Inlining
- Lazy Loading für Bilder
- View Transitions für schnelle Navigation

## License

MIT License - siehe [LICENSE.md](LICENSE.md)

## Kontakt

**Alain Ritter**

- Website: [pxlngn.net](https://pxlngn.net)
- Email: hi@pxlngn.net
- LinkedIn: [alain-ritter-b49ba8233](https://www.linkedin.com/in/alain-ritter-b49ba8233/)
