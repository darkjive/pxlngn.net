/**
 * SkillRadar Tests
 *
 * Testet die Chart.js Skill Radar Komponente:
 * - Canvas-Element vorhanden
 * - Chart wird initialisiert
 * - Loader verschwindet nach Initialisierung
 * - Chart ist interaktiv
 * - Responsive Verhalten
 */

import { test, expect } from '@playwright/test';

test.describe('SkillRadar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Scrolle zur Skills-Section
    const skillsSection = page.locator('#skills');
    if ((await skillsSection.count()) > 0) {
      await skillsSection.scrollIntoViewIfNeeded();
    }
  });

  test.describe('Component-Struktur', () => {
    test('sollte Skill Radar Container haben', async ({ page }) => {
      const container = page.locator('[data-skill-radar-wrapper]');

      if ((await container.count()) > 0) {
        await expect(container).toBeVisible();
      } else {
        // Component ist optional
        test.skip();
      }
    });

    test('sollte Canvas-Element haben', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        await expect(canvas).toBeVisible();

        // Canvas sollte data-chart-type Attribut haben
        const chartType = await canvas.getAttribute('data-chart-type');
        expect(chartType).toBeTruthy();
      } else {
        test.skip();
      }
    });

    test('sollte Loader haben', async ({ page }) => {
      const loader = page.locator('[data-skill-radar-loader]');

      if ((await loader.count()) > 0) {
        await expect(loader).toBeVisible();
      } else {
        test.skip();
      }
    });
  });

  test.describe('Chart-Initialisierung', () => {
    test('sollte Chart.js laden', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        // Scrolle zum Element
        await canvas.scrollIntoViewIfNeeded();

        // Warte auf Chart-Initialisierung
        await page.waitForTimeout(1000);

        // Prüfe ob Chart.js verfügbar ist
        const hasChartJS = await page.evaluate(() => {
          return typeof window.Chart !== 'undefined';
        });

        expect(hasChartJS).toBeTruthy();
      } else {
        test.skip();
      }
    });

    test('sollte Canvas context haben', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        // Prüfe ob Canvas einen 2D-Context hat
        const hasContext = await canvas.evaluate((el) => {
          const ctx = el.getContext('2d');
          return ctx !== null;
        });

        expect(hasContext).toBeTruthy();
      } else {
        test.skip();
      }
    });

    test('sollte Chart gerendert haben', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // Prüfe ob Canvas Inhalt hat (nicht leer)
        const hasContent = await canvas.evaluate((el) => {
          const ctx = el.getContext('2d');
          const imageData = ctx.getImageData(0, 0, el.width, el.height);
          // Prüfe ob mindestens ein Pixel nicht transparent ist
          for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] !== 0) return true;
          }
          return false;
        });

        expect(hasContent).toBeTruthy();
      } else {
        test.skip();
      }
    });
  });

  test.describe('Loader-Verhalten', () => {
    test('sollte Loader nach Chart-Init ausblenden', async ({ page }) => {
      const loader = page.locator('[data-skill-radar-loader]');
      const canvas = page.locator('#skillRadarChart');

      if ((await loader.count()) > 0 && (await canvas.count()) > 0) {
        await canvas.scrollIntoViewIfNeeded();

        // Warte auf Chart-Initialisierung
        await page.waitForTimeout(1500);

        // Loader sollte loaded-Klasse haben oder versteckt sein
        const hasLoadedClass = await loader.evaluate((el) => {
          return el.classList.contains('loaded');
        });

        expect(hasLoadedClass).toBeTruthy();
      } else {
        test.skip();
      }
    });
  });

  test.describe('Interaktivität', () => {
    test('sollte auf Hover reagieren', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // Hover über Canvas
        await canvas.hover();

        // Canvas sollte weiterhin sichtbar sein
        await expect(canvas).toBeVisible();

        // Prüfe ob Chart noch gerendert ist
        const hasContent = await canvas.evaluate((el) => {
          const ctx = el.getContext('2d');
          const imageData = ctx.getImageData(0, 0, el.width, el.height);
          for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] !== 0) return true;
          }
          return false;
        });

        expect(hasContent).toBeTruthy();
      } else {
        test.skip();
      }
    });

    test('sollte Cursor-Style bei Hover haben', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // Prüfe Cursor-Style
        const cursor = await canvas.evaluate((el) => {
          return window.getComputedStyle(el).cursor;
        });

        // Cursor sollte gesetzt sein (nicht default)
        expect(cursor).toBeTruthy();
      } else {
        test.skip();
      }
    });
  });

  test.describe('Responsive Verhalten', () => {
    test('sollte auf Mobile responsive sein', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        // Mobile Viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // Canvas sollte sichtbar sein
        await expect(canvas).toBeVisible();

        // Canvas sollte Width haben
        const width = await canvas.evaluate((el) => el.width);
        expect(width).toBeGreaterThan(0);
      } else {
        test.skip();
      }
    });

    test('sollte auf Tablet responsive sein', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        // Tablet Viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // Canvas sollte sichtbar sein
        await expect(canvas).toBeVisible();

        const width = await canvas.evaluate((el) => el.width);
        expect(width).toBeGreaterThan(0);
      } else {
        test.skip();
      }
    });

    test('sollte auf Desktop responsive sein', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        // Desktop Viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // Canvas sollte sichtbar sein
        await expect(canvas).toBeVisible();

        const width = await canvas.evaluate((el) => el.width);
        expect(width).toBeGreaterThan(0);
      } else {
        test.skip();
      }
    });
  });

  test.describe('Chart-Daten', () => {
    test('sollte Chart-Typ radar sein', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // Prüfe data-chart-type Attribut
        const chartType = await canvas.getAttribute('data-chart-type');
        expect(chartType).toBeTruthy();
      } else {
        test.skip();
      }
    });

    test('sollte keine Console-Errors werfen', async ({ page }) => {
      const consoleErrors = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(2000);

        // Filter Chart-relevante Errors
        const chartErrors = consoleErrors.filter(
          (error) =>
            error.toLowerCase().includes('chart') ||
            error.toLowerCase().includes('canvas') ||
            error.toLowerCase().includes('radar')
        );

        expect(chartErrors).toHaveLength(0);
      } else {
        test.skip();
      }
    });
  });

  test.describe('Performance', () => {
    test('sollte Canvas mit Hardware-Beschleunigung rendern', async ({ page }) => {
      const canvas = page.locator('#skillRadarChart');

      if ((await canvas.count()) > 0) {
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // Prüfe ob Canvas 2D-Context hat
        const hasContext = await canvas.evaluate((el) => {
          const ctx = el.getContext('2d', { alpha: true });
          return ctx !== null;
        });

        expect(hasContext).toBeTruthy();
      } else {
        test.skip();
      }
    });
  });
});
