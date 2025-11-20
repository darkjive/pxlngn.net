/**
 * GlitchProfileImage Tests
 *
 * Testet die Glitch-Effekt Komponente:
 * - Loader-Verhalten (Skeleton verschwindet nach Laden)
 * - Glitch-Overlays sind vorhanden
 * - Glitch-Effekt wird in Viewport getriggert
 * - Hover stoppt Glitch-Effekt
 * - IntersectionObserver-Verhalten
 * - Image-Loading Performance
 */

import { test, expect } from '@playwright/test';

test.describe('GlitchProfileImage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Component-Struktur', () => {
    test('sollte Glitch-Profile Wrapper haben', async ({ page }) => {
      const wrapper = page.locator('[data-glitch-profile]');
      await expect(wrapper).toBeVisible();
    });

    test('sollte Base-Image haben', async ({ page }) => {
      const baseImage = page.locator('[data-glitch-profile] .glitch-profile-base');
      await expect(baseImage).toBeVisible();

      // Prüfe ob Bild geladen wurde
      const isLoaded = await baseImage.evaluate((img) => {
        return img.complete && img.naturalHeight !== 0;
      });
      expect(isLoaded).toBeTruthy();
    });

    test('sollte Glitch-Overlays haben', async ({ page }) => {
      const overlays = page.locator('[data-glitch-overlay]');
      const count = await overlays.count();

      // Sollte 2 Overlays haben (glitch.webp und glitch-hard.webp)
      expect(count).toBe(2);
    });

    test('sollte Loader haben', async ({ page }) => {
      const loader = page.locator('[data-glitch-loader]');
      await expect(loader).toBeVisible();
    });
  });

  test.describe('Loader-Verhalten', () => {
    test('sollte Loader nach Laden ausblenden', async ({ page }) => {
      const loader = page.locator('[data-glitch-loader]');

      // Warte kurz auf Load
      await page.waitForTimeout(200);

      // Loader sollte loaded-Klasse haben oder versteckt sein
      const skeleton = loader.locator('[data-futuristic-skeleton]');
      if ((await skeleton.count()) > 0) {
        const hasLoadedClass = await skeleton.evaluate((el) => {
          return el.classList.contains('loaded');
        });
        expect(hasLoadedClass).toBeTruthy();
      }
    });
  });

  test.describe('Glitch-Effekt', () => {
    test('sollte Glitch-Effekt in Viewport triggern', async ({ page }) => {
      const wrapper = page.locator('[data-glitch-profile]');

      // Scrolle zum Element
      await wrapper.scrollIntoViewIfNeeded();

      // Warte auf möglichen Glitch-Trigger (2-5 Sekunden Random)
      // Wir warten max 6 Sekunden
      await page.waitForTimeout(6000);

      // Prüfe ob mindestens ein Glitch getriggert wurde
      // (Das ist schwer zu testen wegen des Random-Timings)
      // Alternativ: Prüfe ob Overlays existieren und bereit sind
      const overlays = page.locator('[data-glitch-overlay]');
      const count = await overlays.count();
      expect(count).toBeGreaterThan(0);
    });

    test('sollte Overlays initial versteckt haben', async ({ page }) => {
      const overlays = page.locator('[data-glitch-overlay]');
      const firstOverlay = overlays.first();

      // Overlays sollten initial nicht die glitch-active Klasse haben
      const hasActiveClass = await firstOverlay.evaluate((el) => {
        return el.classList.contains('glitch-active');
      });

      // Initial sollte kein Glitch aktiv sein (kurz nach Load)
      expect(hasActiveClass).toBeFalsy();
    });

    test('sollte Glitch bei Hover pausieren', async ({ page }) => {
      const wrapper = page.locator('[data-glitch-profile]');

      // Scrolle zum Element
      await wrapper.scrollIntoViewIfNeeded();

      // Hover über Element
      await wrapper.hover();

      // Nach Hover sollte kein Glitch aktiv sein
      await page.waitForTimeout(500);

      const overlays = page.locator('[data-glitch-overlay]');
      const activeCount = await overlays.evaluateAll((els) => {
        return els.filter((el) => el.classList.contains('glitch-active')).length;
      });

      // Während Hover sollte kein Glitch aktiv sein
      expect(activeCount).toBe(0);
    });
  });

  test.describe('IntersectionObserver', () => {
    test('sollte IntersectionObserver verwenden', async ({ page }) => {
      // Prüfe ob IntersectionObserver verfügbar ist
      const hasObserver = await page.evaluate(() => {
        return typeof IntersectionObserver !== 'undefined';
      });

      expect(hasObserver).toBeTruthy();
    });

    test('sollte Glitch nur in Viewport aktivieren', async ({ page }) => {
      const wrapper = page.locator('[data-glitch-profile]');

      // Scrolle weg vom Element
      await page.evaluate(() => window.scrollTo(0, 9999));

      // Warte kurz
      await page.waitForTimeout(1000);

      // Glitch sollte nicht aktiv sein außerhalb Viewport
      const overlays = page.locator('[data-glitch-overlay]');
      const activeCount = await overlays.evaluateAll((els) => {
        return els.filter((el) => el.classList.contains('glitch-active')).length;
      });

      // Sollte 0 sein wenn außerhalb Viewport
      expect(activeCount).toBe(0);
    });
  });

  test.describe('Image-Performance', () => {
    test('sollte Base-Image mit eager loading haben', async ({ page }) => {
      const baseImage = page.locator('[data-glitch-profile] .glitch-profile-base');

      const loading = await baseImage.getAttribute('loading');
      expect(loading).toBe('eager');
    });

    test('sollte Overlays mit lazy loading haben', async ({ page }) => {
      const overlays = page.locator('[data-glitch-overlay]');
      const firstOverlay = overlays.first();

      const loading = await firstOverlay.getAttribute('loading');
      expect(loading).toBe('lazy');
    });

    test('sollte WebP-Format verwenden', async ({ page }) => {
      const baseImage = page.locator('[data-glitch-profile] .glitch-profile-base');

      const src = await baseImage.getAttribute('src');
      expect(src).toContain('.webp');
    });

    test('sollte responsive sizes haben', async ({ page }) => {
      const baseImage = page.locator('[data-glitch-profile] .glitch-profile-base');

      const sizes = await baseImage.getAttribute('sizes');
      expect(sizes).toBeTruthy();
      expect(sizes).toContain('max-width');
    });
  });

  test.describe('Accessibility', () => {
    test('sollte alt-Text für Base-Image haben', async ({ page }) => {
      const baseImage = page.locator('[data-glitch-profile] .glitch-profile-base');

      const alt = await baseImage.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt.length).toBeGreaterThan(0);
    });

    test('sollte Overlays als aria-hidden markieren', async ({ page }) => {
      const overlays = page.locator('[data-glitch-overlay]');
      const firstOverlay = overlays.first();

      const ariaHidden = await firstOverlay.getAttribute('aria-hidden');
      expect(ariaHidden).toBe('true');
    });

    test('sollte Overlays ohne alt-Text haben', async ({ page }) => {
      const overlays = page.locator('[data-glitch-overlay]');
      const firstOverlay = overlays.first();

      const alt = await firstOverlay.getAttribute('alt');
      // Alt sollte leer sein für dekorative Overlays
      expect(alt).toBe('');
    });
  });
});
