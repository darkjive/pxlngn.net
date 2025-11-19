# BackgroundImage Component - Dokumentation

## Übersicht

Die `BackgroundImage`-Komponente unterstützt automatisch responsive und Dark-Mode-spezifische Bildvarianten.

## Funktionsweise

### Automatische Variantengenerierung

Wenn du ein Bild mit `src="/images/background.webp"` angibst, sucht die Komponente automatisch nach folgenden Varianten:

```
/images/background.webp          → Fallback (Original)
/images/background_m.webp        → Light Mode Mobile
/images/background_d.webp        → Light Mode Desktop
/images/background_dark_m.webp   → Dark Mode Mobile
/images/background_dark_d.webp   → Dark Mode Desktop
```

### Namenskonvention

| Suffix    | Beschreibung | Viewport  | Theme |
| --------- | ------------ | --------- | ----- |
| `_m`      | Mobile       | bis 767px | Light |
| `_d`      | Desktop      | ab 768px  | Light |
| `_dark_m` | Dark Mobile  | bis 767px | Dark  |
| `_dark_d` | Dark Desktop | ab 768px  | Dark  |

### Fallback-Mechanismus

**Wichtig:** Wenn eine Variante nicht existiert, verwendet der Browser automatisch das Fallback-Bild (Original). Die Seite funktioniert also auch ohne die spezifischen Varianten!

## Verwendung

### In Komponenten

```astro
<BackgroundImage src="/images/hero.webp" fetchpriority="high" loading="eager" />
```

Die Komponente generiert automatisch ein `<picture>`-Element mit allen Media Queries:

```html
<picture>
  <!-- Dark Mode Desktop -->
  <source srcset="/images/hero_dark_d.webp" media="(prefers-color-scheme: dark) and (min-width: 768px)" />

  <!-- Dark Mode Mobile -->
  <source srcset="/images/hero_dark_m.webp" media="(prefers-color-scheme: dark) and (max-width: 767px)" />

  <!-- Light Mode Desktop -->
  <source srcset="/images/hero_d.webp" media="(prefers-color-scheme: light) and (min-width: 768px)" />

  <!-- Light Mode Mobile -->
  <source srcset="/images/hero_m.webp" media="(prefers-color-scheme: light) and (max-width: 767px)" />

  <!-- Fallback -->
  <img src="/images/hero.webp" ... />
</picture>
```

## Bildvarianten erstellen

### Manuelle Erstellung

1. **Original-Bild:** `background.webp`
2. **Für Mobile optimieren:** (kleinere Auflösung, z.B. 768px Breite)
   - `background_m.webp`
   - `background_dark_m.webp`
3. **Für Desktop optimieren:** (größere Auflösung, z.B. 1920px Breite)
   - `background_d.webp`
   - `background_dark_d.webp`

### Empfohlene Auflösungen

| Variante  | Breite | Zweck                       |
| --------- | ------ | --------------------------- |
| `_m`      | 768px  | Mobile Geräte (Smartphones) |
| `_d`      | 1920px | Desktop & Tablets           |
| `_dark_m` | 768px  | Mobile (Dark Mode)          |
| `_dark_d` | 1920px | Desktop (Dark Mode)         |

### Dark Mode Varianten

Für Dark Mode solltest du dunklere oder kontrastreichere Versionen deiner Bilder erstellen:

- Helligkeit reduzieren
- Kontrast anpassen
- Eventuell andere Farbpalette verwenden

## Bildvarianten prüfen

Es gibt ein Hilfsskript, das prüft welche Varianten vorhanden sind:

```bash
node scripts/check-image-variants.js
```

### Ausgabe-Beispiel

```
🔍 BackgroundImage Variants Checker
────────────────────────────────────────────────────
📸 Gefundene Hintergrundbilder: 6

1. /images/hero.webp
   ✅ lightMobile     /images/hero_m.webp
   ✅ lightDesktop    /images/hero_d.webp
   ❌ darkMobile      /images/hero_dark_m.webp (FEHLT)
   ❌ darkDesktop     /images/hero_dark_d.webp (FEHLT)
   ✅ fallback        /images/hero.webp

📊 Zusammenfassung:
   Gesamt Varianten:    30
   ✅ Vorhanden:        18 (60%)
   ❌ Fehlend:          12 (40%)
```

## Performance-Optimierung

### Warum Varianten wichtig sind

1. **Mobile Performance:**
   - Mobile Geräte laden kleinere Bilder (\_m)
   - Spart Bandbreite und Ladezeit
   - Besserer Lighthouse-Score

2. **Dark Mode:**
   - Besserer Kontrast in dunkler UI
   - Geringere Augenbelastung
   - Professionelleres Erscheinungsbild

3. **Automatisches Switching:**
   - Browser wählt automatisch beste Variante
   - Keine JavaScript-Logik nötig
   - Native Performance

### fetchpriority & loading

```astro
<!-- Hero-Bild: Sofort laden -->
<BackgroundImage src="/images/hero.webp" fetchpriority="high" loading="eager" />

<!-- Below-the-fold: Lazy loading -->
<BackgroundImage src="/images/section.webp" loading="lazy" />
```

## Beispiel-Workflow

### Neues Hintergrundbild hinzufügen

1. **Original-Bild speichern:**

   ```
   public/images/my-background.webp
   ```

2. **In Komponente verwenden:**

   ```astro
   <BackgroundImage src="/images/my-background.webp" />
   ```

3. **Testen:**

   ```bash
   npm run dev
   ```

   → Seite funktioniert mit Fallback-Bild

4. **Varianten erstellen** (optional, für bessere Performance):

   ```
   public/images/my-background_m.webp       (768px breit)
   public/images/my-background_d.webp       (1920px breit)
   public/images/my-background_dark_m.webp  (768px, dunkel)
   public/images/my-background_dark_d.webp  (1920px, dunkel)
   ```

5. **Prüfen:**
   ```bash
   node scripts/check-image-variants.js
   ```

## Troubleshooting

### Bilder werden nicht geladen

**Problem:** 404-Fehler für Bildvarianten

**Lösung:**

- Prüfe ob Dateien in `public/images/` existieren
- Beachte exakte Schreibweise (inkl. `_m`, `_d`, `_dark_`)
- Fallback-Bild wird verwendet, wenn Varianten fehlen

### Dark Mode Bilder erscheinen nicht

**Problem:** Dark Mode Varianten werden nicht angezeigt

**Lösung:**

1. Prüfe Browser DevTools → Application → Rendering → "Emulate prefers-color-scheme: dark"
2. Prüfe ob `_dark_m.webp` und `_dark_d.webp` Dateien existieren
3. Leere Browser-Cache

### Mobile Bild auf Desktop

**Problem:** Mobile Variante wird auf Desktop angezeigt

**Lösung:**

- Breakpoint ist bei 768px
- Prüfe Viewport-Größe in DevTools
- `_m` = max-width: 767px
- `_d` = min-width: 768px

## Best Practices

✅ **Empfohlen:**

- Erstelle alle 4 Varianten für wichtige Hero-Bilder
- Verwende WebP-Format für beste Kompression
- Optimiere Dateigröße (TinyPNG, Squoosh)
- Teste Dark Mode Varianten visuell

⚠️ **Hinweis:**

- Fallback-Bild ist obligatorisch
- Varianten sind optional (aber empfohlen)
- Browser wählt automatisch beste Variante

❌ **Zu vermeiden:**

- Sehr große Dateien (>500KB)
- Identische Bilder für Light/Dark Mode
- Fehlende Fallback-Bilder
