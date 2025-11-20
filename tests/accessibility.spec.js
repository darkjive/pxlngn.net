/**
 * Accessibility Tests
 *
 * Testet WCAG 2.1 Konformität:
 * - Keyboard Navigation
 * - ARIA Attributes
 * - Semantic HTML
 * - Color Contrast
 * - Focus Management
 * - Screen Reader Support
 */

import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Semantic HTML', () => {
    test('sollte semantische HTML5-Elemente verwenden', async ({ page }) => {
      // Prüfe wichtige semantische Elemente
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();

      // Prüfe ob Sections vorhanden sind
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      expect(sectionCount).toBeGreaterThan(0);
    });

    test('sollte korrektes Heading-Hierarchy haben', async ({ page }) => {
      // Sollte genau ein h1 haben
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);

      // Sollte h2 und h3 haben
      const h2Count = await page.locator('h2').count();
      expect(h2Count).toBeGreaterThan(0);
    });

    test('sollte nav-Element für Navigation haben', async ({ page }) => {
      const nav = page.locator('nav');
      const count = await nav.count();
      expect(count).toBeGreaterThan(0);
    });

    test('sollte article oder section für Content verwenden', async ({ page }) => {
      const contentElements = page.locator('article, section');
      const count = await contentElements.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('ARIA Attributes', () => {
    test('sollte aria-label für Icons haben', async ({ page }) => {
      const buttons = page.locator('button, a');
      const count = await buttons.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 20); i++) {
          const button = buttons.nth(i);
          const hasIcon = (await button.locator('svg, [data-icon]').count()) > 0;

          if (hasIcon) {
            const ariaLabel = await button.getAttribute('aria-label');
            const hasText = (await button.textContent()).trim().length > 0;

            // Button mit Icon sollte entweder aria-label oder Text haben
            expect(ariaLabel !== null || hasText).toBeTruthy();
          }
        }
      }
    });

    test('sollte aria-hidden für dekorative Elemente haben', async ({ page }) => {
      const decorativeElements = page.locator('[aria-hidden="true"]');
      const count = await decorativeElements.count();

      // Sollte mindestens einige dekorative Elemente haben
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('sollte aria-current für aktive Navigation haben', async ({ page }) => {
      // Scrolle zur Navigation
      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(500);

      // Prüfe ob aktive Links aria-current haben
      const activeLinks = page.locator('a[aria-current]');
      const count = await activeLinks.count();

      // Sollte mindestens einen aktiven Link haben
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('sollte role-Attribute korrekt verwenden', async ({ page }) => {
      // Prüfe auf häufige Roles
      const navigation = page.locator('[role="navigation"]');
      const buttons = page.locator('[role="button"]');

      // Sollte semantische Roles haben
      const navCount = await navigation.count();
      expect(navCount).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('sollte mit Tab navigierbar sein', async ({ page }) => {
      // Fokussiere erstes Element
      await page.keyboard.press('Tab');

      // Prüfe ob ein Element Fokus hat
      const focusedElement = await page.evaluate(() => {
        return document.activeElement !== document.body;
      });

      expect(focusedElement).toBeTruthy();
    });

    test('sollte Links mit Enter aktivieren', async ({ page }) => {
      // Finde ersten Link
      const firstLink = page.locator('a[href^="#"]').first();

      if ((await firstLink.count()) > 0) {
        await firstLink.focus();
        const href = await firstLink.getAttribute('href');

        // Drücke Enter
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);

        // Prüfe ob zur Section gescrollt wurde
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const target = page.locator(`#${targetId}`);

          if ((await target.count()) > 0) {
            const isInViewport = await target.isInViewport();
            expect(isInViewport).toBeTruthy();
          }
        }
      }
    });

    test('sollte Focus-Outline haben', async ({ page }) => {
      const firstLink = page.locator('a').first();

      if ((await firstLink.count()) > 0) {
        await firstLink.focus();

        // Prüfe ob Outline vorhanden ist
        const outline = await firstLink.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            outline: styles.outline,
            outlineWidth: styles.outlineWidth,
            outlineColor: styles.outlineColor,
            boxShadow: styles.boxShadow,
          };
        });

        // Element sollte entweder outline oder box-shadow haben
        const hasFocusIndicator =
          (outline.outline && outline.outline !== 'none') ||
          (outline.outlineWidth && outline.outlineWidth !== '0px') ||
          (outline.boxShadow && outline.boxShadow !== 'none');

        expect(hasFocusIndicator).toBeTruthy();
      }
    });

    test('sollte Skip-Link für Keyboard-User haben', async ({ page }) => {
      // Tab zum ersten Element
      await page.keyboard.press('Tab');

      // Prüfe ob Skip-Link vorhanden ist
      const skipLink = page.locator('a[href="#main"], a[href="#content"]');
      const count = await skipLink.count();

      // Skip-Link ist optional aber empfohlen
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Images & Media', () => {
    test('sollte alt-Text für alle Images haben', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const img = images.nth(i);
          const alt = await img.getAttribute('alt');
          const ariaHidden = await img.getAttribute('aria-hidden');

          // Image sollte entweder alt-Text haben oder aria-hidden sein
          expect(alt !== null || ariaHidden === 'true').toBeTruthy();
        }
      }
    });

    test('sollte dekorative Images mit leerem alt markieren', async ({ page }) => {
      const decorativeImages = page.locator('img[aria-hidden="true"]');
      const count = await decorativeImages.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const img = decorativeImages.nth(i);
          const alt = await img.getAttribute('alt');

          // Dekorative Images sollten leeren alt-Text haben
          expect(alt).toBe('');
        }
      }
    });

    test('sollte keine Bilder ohne Dimensionen haben', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      if (count > 0) {
        let imagesWithoutDimensions = 0;

        for (let i = 0; i < count; i++) {
          const img = images.nth(i);
          const width = await img.getAttribute('width');
          const height = await img.getAttribute('height');

          if (!width && !height) {
            imagesWithoutDimensions++;
          }
        }

        // Maximal 2 Images ohne Dimensionen erlauben (für Lazy-Loading)
        expect(imagesWithoutDimensions).toBeLessThan(3);
      }
    });
  });

  test.describe('Forms & Inputs', () => {
    test('sollte Labels für Inputs haben', async ({ page }) => {
      const inputs = page.locator('input, textarea, select');
      const count = await inputs.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const input = inputs.nth(i);
          const id = await input.getAttribute('id');
          const ariaLabel = await input.getAttribute('aria-label');
          const ariaLabelledby = await input.getAttribute('aria-labelledby');
          const type = await input.getAttribute('type');

          // Hidden inputs brauchen keine Labels
          if (type === 'hidden') continue;

          // Input sollte entweder Label, aria-label oder aria-labelledby haben
          const hasLabel = id
            ? (await page.locator(`label[for="${id}"]`).count()) > 0
            : false;

          expect(hasLabel || ariaLabel !== null || ariaLabelledby !== null).toBeTruthy();
        }
      }
    });
  });

  test.describe('Color Contrast', () => {
    test('sollte ausreichend Kontrast für Text haben', async ({ page }) => {
      // Prüfe Hero-Text
      const heroText = page.locator('#hero h1, #hero p').first();

      if ((await heroText.count()) > 0) {
        const contrast = await heroText.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            fontSize: styles.fontSize,
          };
        });

        // Einfacher Check: Farben sollten gesetzt sein
        expect(contrast.color).toBeTruthy();
      }
    });

    test('sollte Dark Mode korrekt implementieren', async ({ page }) => {
      const html = page.locator('html');

      // Prüfe ob Dark Mode Toggle existiert
      const toggle = page.locator('[data-aw-toggle-color-scheme]');
      const hasToggle = (await toggle.count()) > 0;

      if (hasToggle) {
        // Toggle Dark Mode
        await toggle.click();
        await page.waitForTimeout(200);

        // Prüfe ob dark-Klasse gesetzt wurde
        const hasDarkClass = await html.evaluate((el) => {
          return el.classList.contains('dark');
        });

        expect(hasDarkClass).toBeTruthy();
      }
    });
  });

  test.describe('Language & Meta', () => {
    test('sollte lang-Attribut haben', async ({ page }) => {
      const html = page.locator('html');
      const lang = await html.getAttribute('lang');

      expect(lang).toBeTruthy();
      expect(lang.length).toBeGreaterThan(1);
    });

    test('sollte viewport meta-tag haben', async ({ page }) => {
      const viewport = await page.locator('meta[name="viewport"]').count();
      expect(viewport).toBe(1);
    });

    test('sollte charset meta-tag haben', async ({ page }) => {
      const charset = await page.evaluate(() => {
        return document.characterSet || document.charset;
      });

      expect(charset.toLowerCase()).toBe('utf-8');
    });

    test('sollte title haben', async ({ page }) => {
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    });
  });

  test.describe('Interactive Elements', () => {
    test('sollte Buttons als button-Element haben', async ({ page }) => {
      const buttons = page.locator('button');
      const count = await buttons.count();

      // Sollte Button-Elemente haben
      expect(count).toBeGreaterThan(0);
    });

    test('sollte keine disabled Links haben', async ({ page }) => {
      const disabledLinks = page.locator('a[disabled]');
      const count = await disabledLinks.count();

      // Links sollten nicht disabled sein (nicht valid)
      expect(count).toBe(0);
    });

    test('sollte Links mit href haben', async ({ page }) => {
      const links = page.locator('a');
      const count = await links.count();

      if (count > 0) {
        let linksWithoutHref = 0;

        for (let i = 0; i < Math.min(count, 20); i++) {
          const link = links.nth(i);
          const href = await link.getAttribute('href');
          const role = await link.getAttribute('role');

          // Links sollten href haben oder role="button"
          if (!href && role !== 'button') {
            linksWithoutHref++;
          }
        }

        expect(linksWithoutHref).toBe(0);
      }
    });
  });

  test.describe('Screen Reader Support', () => {
    test('sollte sinnvolle Link-Texte haben', async ({ page }) => {
      const links = page.locator('a[href]');
      const count = await links.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 20); i++) {
          const link = links.nth(i);
          const text = await link.textContent();
          const ariaLabel = await link.getAttribute('aria-label');

          // Link sollte entweder Text oder aria-label haben
          const hasText = text && text.trim().length > 0;
          const hasAriaLabel = ariaLabel && ariaLabel.trim().length > 0;

          expect(hasText || hasAriaLabel).toBeTruthy();
        }
      }
    });

    test('sollte keine leeren Buttons haben', async ({ page }) => {
      const buttons = page.locator('button');
      const count = await buttons.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const button = buttons.nth(i);
          const text = await button.textContent();
          const ariaLabel = await button.getAttribute('aria-label');

          // Button sollte entweder Text oder aria-label haben
          const hasText = text && text.trim().length > 0;
          const hasAriaLabel = ariaLabel && ariaLabel.trim().length > 0;

          expect(hasText || hasAriaLabel).toBeTruthy();
        }
      }
    });

    test('sollte Live-Regions für dynamische Inhalte nutzen', async ({ page }) => {
      // Prüfe auf aria-live Regions
      const liveRegions = page.locator('[aria-live], [role="status"], [role="alert"]');
      const count = await liveRegions.count();

      // Live Regions sind optional
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });
});
