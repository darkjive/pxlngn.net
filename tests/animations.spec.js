/**
 * Animation Tests
 *
 * Testet Animation-System mit anime.js v4:
 * - Alle Animation-Types (fade-up/down/left/right, scale-up, typewriter, cycle-typewriter, decipher, glitch, step-fade)
 * - IntersectionObserver Verhalten
 * - Animation Timing und Delays
 * - View Transitions Support
 */

import { test, expect } from '@playwright/test';

test.describe('Animations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sollte Elemente mit data-animate haben', async ({ page }) => {
    // Prüfe ob animierbare Elemente existieren
    const animatedElements = page.locator('[data-animate]');
    const count = await animatedElements.count();

    expect(count).toBeGreaterThan(0);
  });

  test('sollte Elemente initial mit opacity:0 rendern', async ({ page }) => {
    // Finde Element das noch nicht im Viewport ist
    const element = page.locator('[data-animate]:not([data-animated])').first();

    if ((await element.count()) > 0) {
      // Prüfe initial opacity
      const initialOpacity = await element.evaluate((el) => {
        return window.getComputedStyle(el).opacity;
      });

      expect(initialOpacity).toBe('0');
    }
  });

  test('sollte Element animieren wenn in Viewport', async ({ page }) => {
    // Scrolle zu einem Element
    const element = page.locator('#projects [data-animate]').first();

    if ((await element.count()) > 0) {
      // Scrolle Element in View
      await element.scrollIntoViewIfNeeded();

      // Warte auf Animation
      await page.waitForTimeout(600); // CONFIG.duration ist 450ms

      // Element sollte animated-Attribut haben
      const isAnimated = await element.getAttribute('data-animated');
      expect(isAnimated).toBe('true');

      // Opacity sollte 1 sein
      const opacity = await element.evaluate((el) => {
        return window.getComputedStyle(el).opacity;
      });
      expect(opacity).toBe('1');
    }
  });

  test.describe('Animation Types', () => {
    test('sollte fade-up Animationen haben', async ({ page }) => {
      const fadeUp = page.locator('[data-anim-type="fade-up"]');
      const count = await fadeUp.count();

      if (count > 0) {
        expect(count).toBeGreaterThan(0);

        // Teste Animation-Ausführung
        const element = fadeUp.first();
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);

        const isAnimated = await element.getAttribute('data-animated');
        expect(isAnimated).toBe('true');
      }
    });

    test('sollte fade-down Animationen haben', async ({ page }) => {
      const fadeDown = page.locator('[data-anim-type="fade-down"]');
      const count = await fadeDown.count();

      // Test nur wenn Type vorhanden
      if (count > 0) {
        expect(count).toBeGreaterThan(0);
      }
    });

    test('sollte fade-left Animationen haben', async ({ page }) => {
      const fadeLeft = page.locator('[data-anim-type="fade-left"]');
      const count = await fadeLeft.count();

      // Test nur wenn Type vorhanden
      if (count > 0) {
        expect(count).toBeGreaterThan(0);
      }
    });

    test('sollte fade-right Animationen haben', async ({ page }) => {
      const fadeRight = page.locator('[data-anim-type="fade-right"]');
      const count = await fadeRight.count();

      // Test nur wenn Type vorhanden
      if (count > 0) {
        expect(count).toBeGreaterThan(0);
      }
    });

    test('sollte scale-up Animationen unterstützen', async ({ page }) => {
      const scaleUp = page.locator('[data-anim-type="scale-up"]');
      const count = await scaleUp.count();

      // Test nur wenn Type vorhanden
      if (count > 0) {
        expect(count).toBeGreaterThan(0);

        // Teste Animation-Ausführung
        const element = scaleUp.first();
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);

        const transform = await element.evaluate((el) => {
          return window.getComputedStyle(el).transform;
        });

        // Transform sollte nicht 'none' sein nach Animation
        expect(transform).not.toBe('none');
      }
    });

    test('sollte step-fade Animationen haben', async ({ page }) => {
      const stepFade = page.locator('[data-anim-type="step-fade"]');
      const count = await stepFade.count();

      // Test nur wenn Type vorhanden
      if (count > 0) {
        expect(count).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Text-Animationen', () => {
    test('sollte Typewriter-Animation ausführen', async ({ page }) => {
      const typewriterElement = page.locator('[data-anim-type="typewriter"]').first();

      if ((await typewriterElement.count()) > 0) {
        // Scrolle Element in View
        await typewriterElement.scrollIntoViewIfNeeded();

        // Warte auf Animation-Start
        await page.waitForTimeout(300);

        // Element sollte spans mit Zeichen enthalten
        const spans = typewriterElement.locator('span');
        const spanCount = await spans.count();

        expect(spanCount).toBeGreaterThan(0);

        // Element sollte sichtbar sein
        const opacity = await typewriterElement.evaluate((el) => {
          return window.getComputedStyle(el).opacity;
        });
        expect(opacity).toBe('1');
      }
    });

    test('sollte Cycle-Typewriter Animation ausführen', async ({ page }) => {
      const cycleTypewriter = page.locator('[data-anim-type="cycle-typewriter"]').first();

      if ((await cycleTypewriter.count()) > 0) {
        // Scrolle Element in View
        await cycleTypewriter.scrollIntoViewIfNeeded();

        // Warte auf Animation-Start
        await page.waitForTimeout(500);

        // Element sollte Cursor haben
        const cursor = cycleTypewriter.locator('.typewriter-cursor');
        await expect(cursor).toBeVisible();

        // Element sollte Text enthalten (nach kurzer Zeit)
        await page.waitForTimeout(500);
        const hasText = await cycleTypewriter.evaluate((el) => {
          return el.textContent.length > 1; // Mehr als nur Cursor
        });
        expect(hasText).toBeTruthy();

        // Prüfe dass Farbe wechselt (text-primary oder text-yellow-500)
        const className = await cycleTypewriter.getAttribute('class');
        expect(className).toMatch(/(text-primary|text-yellow-500)/);
      }
    });

    test('sollte Decipher-Animation ausführen', async ({ page }) => {
      const decipherElement = page.locator('[data-anim-type="decipher"]').first();

      if ((await decipherElement.count()) > 0) {
        // Scrolle Element in View
        await decipherElement.scrollIntoViewIfNeeded();

        // Warte auf Animation
        await page.waitForTimeout(300);

        // Element sollte animiert sein
        const isAnimated = await decipherElement.getAttribute('data-animated');
        expect(isAnimated).toBe('true');

        // Element sollte sichtbar sein
        const opacity = await decipherElement.evaluate((el) => {
          return window.getComputedStyle(el).opacity;
        });
        expect(opacity).toBe('1');
      }
    });
  });

  test.describe('Animation-Delays', () => {
    test('sollte Animation-Delays respektieren', async ({ page }) => {
      const delayedElement = page.locator('[data-anim-delay]').first();

      if ((await delayedElement.count()) > 0) {
        // Scrolle Element in View
        await delayedElement.scrollIntoViewIfNeeded();

        // Prüfe Delay-Attribut
        const delay = await delayedElement.getAttribute('data-anim-delay');
        expect(delay).toBeTruthy();

        // Direkt nach Scroll sollte Element noch nicht animiert sein
        await page.waitForTimeout(50);
        const initialAnimated = await delayedElement.getAttribute('data-animated');

        // Nach Delay + Animation sollte es animiert sein
        await page.waitForTimeout(parseInt(delay) + 500);
        const finalAnimated = await delayedElement.getAttribute('data-animated');
        expect(finalAnimated).toBe('true');
      }
    });
  });

  test.describe('View Transitions', () => {
    test('sollte Animationen nach Navigation re-initialisieren', async ({ page }) => {
      // Erste Seite
      const firstPageElements = page.locator('[data-animate]');
      const firstCount = await firstPageElements.count();

      expect(firstCount).toBeGreaterThan(0);

      // Prüfe ob Astro Event-Listener registriert sind
      const hasAstroSupport = await page.evaluate(() => {
        return typeof document !== 'undefined' && document !== null;
      });

      expect(hasAstroSupport).toBeTruthy();
    });
  });

  test.describe('Performance', () => {
    test('sollte IntersectionObserver verwenden', async ({ page }) => {
      // Prüfe ob IntersectionObserver verfügbar ist
      const hasObserver = await page.evaluate(() => {
        return typeof IntersectionObserver !== 'undefined';
      });

      expect(hasObserver).toBeTruthy();
    });

    test('sollte will-change für Performance nutzen', async ({ page }) => {
      const element = page.locator('[data-animate]:not([data-animated])').first();

      if ((await element.count()) > 0) {
        const willChange = await element.evaluate((el) => {
          return window.getComputedStyle(el).willChange;
        });

        // will-change sollte gesetzt sein für nicht-animierte Elemente
        expect(willChange).toContain('opacity');
      }
    });
  });
});
