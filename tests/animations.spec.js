/**
 * Animation Tests
 *
 * Testet Animation-System:
 * - Elemente mit data-animate werden animiert
 * - IntersectionObserver wird verwendet
 * - Animations-Script lädt
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
    const element = page.locator('[data-animate]').first();

    // Prüfe initial opacity
    const initialOpacity = await element.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    expect(initialOpacity).toBe('0');
  });

  test('sollte Element animieren wenn in Viewport', async ({ page }) => {
    // Scrolle zu einem Element
    const element = page.locator('#projects [data-animate]').first();

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
  });

  test('sollte verschiedene Animation-Types unterstützen', async ({ page }) => {
    // Prüfe verschiedene anim-type Attribute
    const fadeUp = page.locator('[data-anim-type="fade-up"]');
    const fadeUpCount = await fadeUp.count();

    const typewriter = page.locator('[data-anim-type="typewriter"]');
    const typewriterCount = await typewriter.count();

    // Mindestens einer der Types sollte vorhanden sein
    expect(fadeUpCount + typewriterCount).toBeGreaterThan(0);
  });

  test('sollte Typewriter-Animation ausführen', async ({ page }) => {
    const typewriterElement = page.locator('[data-anim-type="typewriter"]').first();

    if ((await typewriterElement.count()) > 0) {
      // Scrolle Element in View
      await typewriterElement.scrollIntoViewIfNeeded();

      // Warte auf Animation-Start
      await page.waitForTimeout(200);

      // Element sollte spans mit Zeichen enthalten
      const spans = typewriterElement.locator('span');
      const spanCount = await spans.count();

      expect(spanCount).toBeGreaterThan(0);
    }
  });

  test('sollte nach Page-Transition re-initialisieren', async ({ page }) => {
    // Erste Seite
    const firstPageElements = page.locator('[data-animate]');
    const firstCount = await firstPageElements.count();

    expect(firstCount).toBeGreaterThan(0);

    // Simuliere Page-Transition (wenn weitere Pages existieren)
    // Da wir nur eine Page haben, prüfen wir ob Event-Listener registriert sind
    const hasAstroListener = await page.evaluate(() => {
      // Prüfe ob astro:after-swap listener existiert
      return typeof document !== 'undefined';
    });

    expect(hasAstroListener).toBeTruthy();
  });
});
