# pxlngn.net

Persönliche Portfolio-Website von Alain Ritter – Generalist aus Überzeugung.

## Tech Stack

### Core

- **[Astro 5.15](https://astro.build/)** - Static Site Generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type-Safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-First CSS Framework

### Libraries & Tools

- **[anime.js v4](https://animejs.com)** - Animation Library für Scroll-Animationen
- **[Chart.js](https://www.chartjs.org/)** - Skill Radar Visualisierung
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-Performance Image Processing
- **[Playwright](https://playwright.dev/)** - End-to-End Testing
- **[astro-icon](https://www.astroicon.dev/)** - Icon System (Tabler Icons)

### Integrations

- **@astrojs/sitemap** - Automatische Sitemap-Generierung
- **astro-compress** - Asset-Komprimierung (CSS, HTML, JS, SVG)
- **@astrolib/seo** - SEO & Open Graph Optimierung
- **@astrolib/analytics** - Analytics Integration

### Basis

- **AstroWind Template** - Angepasstes Basis-Template

## Features

### Performance & SEO

- ✅ Lighthouse Score 100 (Performance, Accessibility, Best Practices, SEO)
- ✅ Image Optimization mit Sharp
- ✅ Asset-Komprimierung (CSS, HTML, JS, Images, SVG)
- ✅ SEO-optimiert mit Open Graph Tags
- ✅ Automatische Sitemap-Generierung

### Design & UX

- ✅ Dark Mode Support mit System-Präferenz
- ✅ Responsive Design (Mobile-First Ansatz)
- ✅ Scroll-basierte Animationen (IntersectionObserver + anime.js)
- ✅ Glitch-Effekte für visuelle Akzente
- ✅ View Transitions für flüssige Navigation
- ✅ Custom Typewriter-Animationen

### Content & Datenstruktur

- ✅ Data-driven Portfolio (Skills, Resume, Projects, Certificates)
- ✅ Skill Radar Chart mit Chart.js
- ✅ Multi-Section Single-Page Layout
- ✅ MDX Support für statische Seiten (Privacy, Terms)

### Entwicklung

- ✅ TypeScript für Type-Safety
- ✅ ESLint + Prettier für Code-Qualität
- ✅ Playwright für E2E-Testing
- ✅ Hot Module Replacement (HMR)

## Projekt-Struktur

```
/
├── public/              # Statische Assets (Bilder, Fonts, etc.)
├── src/
│   ├── assets/         # Optimierte Assets (verarbeitet von Astro)
│   │   ├── favicons/   # Favicon-Varianten
│   │   ├── images/     # Bilder und Icons
│   │   └── styles/     # Global Styles (fonts.css, glitch-profile.css, stars.css)
│   ├── components/     # Wiederverwendbare Komponenten
│   │   ├── common/     # Gemeinsame Komponenten (Image, Metadata, ToggleTheme, etc.)
│   │   ├── ui/         # UI-Komponenten (Button, Headline, GlitchProfileImage, SkillRadar, etc.)
│   │   └── widgets/    # Page-Widgets (Hero, Content, Features, Steps, Brands, etc.)
│   ├── content/        # Content Collections (aktuell: config.ts für Schema-Definitionen)
│   ├── data/           # Strukturierte Daten
│   │   ├── certificates.ts   # Zertifikate
│   │   ├── profile.ts        # Profil & Kontakt
│   │   ├── projects.ts       # Projekt-Portfolio
│   │   ├── resume.ts         # Lebenslauf
│   │   ├── skills.ts         # Skills & Erfahrungen
│   │   └── tech-stack.ts     # Technologie-Stacks
│   ├── layouts/        # Layout-Komponenten
│   ├── pages/          # File-based Routing
│   │   ├── index.astro       # Haupt-Portfolio Seite
│   │   ├── 404.astro         # Error Page
│   │   ├── privacy.md        # Datenschutz
│   │   └── terms.md          # AGB
│   ├── scripts/        # Client-Side Scripts
│   │   └── glitch-profile.js # Glitch-Effekt Script
│   ├── utils/          # Utility Functions
│   │   ├── animations.ts     # Animation Helpers
│   │   ├── images.ts         # Image Processing
│   │   ├── frontmatter.ts    # Markdown Plugins
│   │   └── ...               # Weitere Utilities
│   └── config.yaml     # Site Configuration
├── vendor/             # Custom Integrations
├── package.json
├── astro.config.ts
├── tailwind.config.js
└── playwright.config.ts
```

## Requirements

### Node.js Version

Das Projekt benötigt eine der folgenden Node.js-Versionen:

- Node.js `^18.18.0`
- Node.js `^20.9.0` (empfohlen)
- Node.js `>=21.1.0`

**Verwendung mit nvm:**

```bash
nvm use
```

Die `.nvmrc`-Datei spezifiziert automatisch die empfohlene Version (v20.9.0).

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

## Animations & Visuelle Effekte

Das Projekt nutzt verschiedene Animation-Systeme für eine moderne, interaktive UX:

### anime.js Animationen

Scroll-basierte Animationen mit IntersectionObserver:

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

**Verfügbare Animations-Typen:**

- `fade-up` / `fade-down` / `fade-left` / `fade-right` - Fade mit Richtung
- `scale-up` - Skalierung von klein nach groß
- `typewriter` - Typewriter-Effekt für Text
- `cycle-typewriter` - Rotierende Wörter mit Farben
- `step-fade` - Fade für Timeline-Steps

### Glitch-Effekt

Profilbild mit Glitch-Effekt (RGB-Split):

```astro
<GlitchProfileImage alt="Profilbild" width={500} height={500} glowColor="cyan" />
```

Details: [src/scripts/glitch-profile.js](src/scripts/glitch-profile.js)

### Chart.js Visualisierungen

Skill Radar Chart für Erfahrungswerte:

```astro
<SkillRadar />
```

Nutzt Chart.js mit date-fns Adapter für zeitbasierte Daten.

## Deployment

Das Projekt ist als statische Site konzipiert und kann auf verschiedenen Plattformen deployed werden:

### Build Prozess

```bash
npm run build
```

Generiert optimierte statische Files im `./dist/` Verzeichnis.

### Deployment-Optionen

Das Projekt enthält Konfigurationsdateien für verschiedene Plattformen:

#### Vercel

- Config: `vercel.json`
- Deploy: `vercel deploy` oder Git-Integration
- Build Command: `npm run build`
- Output Directory: `dist`

#### Netlify

- Config: `netlify.toml`
- Deploy: Git-Integration oder Netlify CLI
- Build Command: `npm run build`
- Output Directory: `dist`

#### Andere Plattformen

- **IONOS Deploy & Space**: Git-Integration
- **Cloudflare Pages**: Git-Integration
- **GitHub Pages**: Static Site Deployment
- **Beliebiges Static Hosting**: Upload des `dist` Folders

### Environment Variables

`.env` Dateien werden nicht committed (siehe `.gitignore`). Environment Variables können in den jeweiligen Plattform-Dashboards konfiguriert werden.

## Development

### Neue Komponente erstellen

```bash
# UI-Komponente
touch src/components/ui/MyComponent.astro

# Widget
touch src/components/widgets/MyWidget.astro
```

### Content hinzufügen

Das Portfolio ist data-driven. Content wird in TypeScript-Dateien unter `src/data/` verwaltet:

```bash
# Neues Projekt hinzufügen
# Bearbeite: src/data/projects.ts

# Neue Skill hinzufügen
# Bearbeite: src/data/skills.ts

# Resume aktualisieren
# Bearbeite: src/data/resume.ts
```

Beispiel (projects.ts):

```typescript
export const projectItems: Item[] = [
  {
    title: 'Projekt-Name',
    description: 'Beschreibung des Projekts',
    icon: 'tabler:world',
    callToAction: {
      text: 'Link',
      href: 'https://example.com',
    },
  },
];
```

### Styles anpassen

- **Tailwind Config**: `tailwind.config.js`
- **Global Styles**: `src/assets/styles/`
  - `fonts.css` - Custom Fonts
  - `glitch-profile.css` - Glitch-Effekt Styles
  - `stars.css` - Background Animationen
- **Komponenten-Styles**: Inline in `.astro` Komponenten

### Testing

```bash
# E2E Tests mit Playwright
npx playwright test

# Mit UI
npx playwright test --ui
```

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
