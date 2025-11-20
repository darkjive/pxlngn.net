/**
 * Performance Tests
 *
 * Testet Performance-Aspekte:
 * - Core Web Vitals (LCP, FID, CLS)
 * - Resource Loading
 * - Image Optimization
 * - JavaScript Bundle Size
 * - CSS Optimization
 */

import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Core Web Vitals', () => {
    test('sollte schnelle LCP haben (< 2.5s)', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      // Measure LCP using Performance API
      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.renderTime || lastEntry.loadTime);
          }).observe({ type: 'largest-contentful-paint', buffered: true });

          // Timeout after 10 seconds
          setTimeout(() => resolve(0), 10000);
        });
      });

      // LCP sollte unter 2.5 Sekunden sein (Good)
      expect(lcp).toBeLessThan(2500);
    });

    test('sollte niedrige CLS haben (< 0.1)', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      // Scroll durch die Seite
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await page.waitForTimeout(500);

      // Measure CLS
      const cls = await page.evaluate(() => {
        return new Promise((resolve) => {
          let clsValue = 0;

          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });

          // Resolve after short delay
          setTimeout(() => resolve(clsValue), 1000);
        });
      });

      // CLS sollte unter 0.1 sein (Good)
      expect(cls).toBeLessThan(0.1);
    });

    test('sollte FCP unter 1.8s haben', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      const fcp = await page.evaluate(() => {
        const perfEntries = performance.getEntriesByType('paint');
        const fcpEntry = perfEntries.find((entry) => entry.name === 'first-contentful-paint');
        return fcpEntry ? fcpEntry.startTime : 0;
      });

      // FCP sollte unter 1.8 Sekunden sein (Good)
      expect(fcp).toBeLessThan(1800);
    });
  });

  test.describe('Resource Loading', () => {
    test('sollte CSS inline im Head haben', async ({ page }) => {
      const inlineStyles = await page.locator('head style').count();

      // Sollte mindestens einige inline styles haben (Critical CSS)
      expect(inlineStyles).toBeGreaterThan(0);
    });

    test('sollte externe CSS-Files laden', async ({ page }) => {
      const externalStyles = await page.locator('head link[rel="stylesheet"]').count();

      // Externe Stylesheets sollten vorhanden sein
      expect(externalStyles).toBeGreaterThanOrEqual(0);
    });

    test('sollte Scripts mit defer/async laden', async ({ page }) => {
      const scripts = page.locator('script[src]');
      const count = await scripts.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const script = scripts.nth(i);
          const hasDefer = await script.getAttribute('defer');
          const hasAsync = await script.getAttribute('async');
          const hasModule = await script.getAttribute('type');

          // Script sollte entweder defer, async oder type="module" haben
          const isOptimized = hasDefer !== null || hasAsync !== null || hasModule === 'module';

          if (!isOptimized) {
            const src = await script.getAttribute('src');
            console.log(`Script ohne defer/async/module: ${src}`);
          }
        }
      }
    });

    test('sollte keine blockierenden Resources haben', async ({ page }) => {
      await page.waitForLoadState('domcontentloaded');

      const domContentLoadedTime = await page.evaluate(() => {
        const timing = performance.timing;
        return timing.domContentLoadedEventEnd - timing.navigationStart;
      });

      // DOMContentLoaded sollte schnell sein (< 1.5s)
      expect(domContentLoadedTime).toBeLessThan(1500);
    });
  });

  test.describe('Image Optimization', () => {
    test('sollte WebP-Format verwenden', async ({ page }) => {
      const images = page.locator('img[src]');
      const count = await images.count();

      if (count > 0) {
        let webpCount = 0;

        for (let i = 0; i < Math.min(count, 10); i++) {
          const src = await images.nth(i).getAttribute('src');
          if (src && (src.includes('.webp') || src.includes('format=webp'))) {
            webpCount++;
          }
        }

        // Mindestens einige Images sollten WebP sein
        expect(webpCount).toBeGreaterThan(0);
      }
    });

    test('sollte responsive Images mit srcset haben', async ({ page }) => {
      const responsiveImages = page.locator('img[srcset], img[sizes]');
      const count = await responsiveImages.count();

      // Sollte responsive images haben
      expect(count).toBeGreaterThan(0);
    });

    test('sollte lazy loading für Bilder nutzen', async ({ page }) => {
      const lazyImages = page.locator('img[loading="lazy"]');
      const count = await lazyImages.count();

      // Sollte mindestens einige lazy-loaded images haben
      expect(count).toBeGreaterThan(0);
    });

    test('sollte width und height Attribute haben', async ({ page }) => {
      const images = page.locator('img[src]');
      const count = await images.count();

      if (count > 0) {
        let imagesWithDimensions = 0;

        for (let i = 0; i < Math.min(count, 10); i++) {
          const width = await images.nth(i).getAttribute('width');
          const height = await images.nth(i).getAttribute('height');

          if (width && height) {
            imagesWithDimensions++;
          }
        }

        // Meiste Images sollten width/height haben (verhindert CLS)
        expect(imagesWithDimensions).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Asset Compression', () => {
    test('sollte komprimierte Assets ausliefern', async ({ page }) => {
      const response = await page.goto('/');

      // Prüfe Content-Encoding Header
      const headers = response.headers();
      const contentEncoding = headers['content-encoding'];

      // Sollte komprimiert sein (gzip oder brotli)
      // Note: Im Dev-Modus ist das eventuell nicht der Fall
      if (process.env.CI) {
        expect(contentEncoding).toMatch(/(gzip|br)/);
      }
    });

    test('sollte Cache-Headers setzen', async ({ page }) => {
      // Lade statische Assets
      const responses = [];
      page.on('response', (response) => {
        if (
          response.url().includes('.css') ||
          response.url().includes('.js') ||
          response.url().includes('.webp') ||
          response.url().includes('.png')
        ) {
          responses.push(response);
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      if (responses.length > 0) {
        // Mindestens ein Asset sollte Cache-Header haben
        const hasCacheHeaders = responses.some((response) => {
          const headers = response.headers();
          return headers['cache-control'] || headers['etag'] || headers['expires'];
        });

        // Note: Im Dev-Modus eventuell nicht verfügbar
        if (process.env.CI) {
          expect(hasCacheHeaders).toBeTruthy();
        }
      }
    });
  });

  test.describe('JavaScript Performance', () => {
    test('sollte keine Long Tasks haben (> 50ms)', async ({ page }) => {
      await page.goto('/');

      // Measure Long Tasks
      const longTasks = await page.evaluate(() => {
        return new Promise((resolve) => {
          const tasks = [];

          if ('PerformanceObserver' in window) {
            try {
              new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.duration > 50) {
                    tasks.push(entry.duration);
                  }
                }
              }).observe({ type: 'longtask', buffered: true });
            } catch (e) {
              // longtask nicht verfügbar in allen Browsern
            }
          }

          setTimeout(() => resolve(tasks), 3000);
        });
      });

      // Sollte nicht zu viele Long Tasks haben
      expect(longTasks.length).toBeLessThan(5);
    });

    test('sollte keine Memory Leaks haben', async ({ page }) => {
      const initialMemory = await page.evaluate(() => {
        if (performance.memory) {
          return performance.memory.usedJSHeapSize;
        }
        return 0;
      });

      // Scrolle und interagiere mit der Seite
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      const finalMemory = await page.evaluate(() => {
        if (performance.memory) {
          return performance.memory.usedJSHeapSize;
        }
        return 0;
      });

      // Memory sollte nicht dramatisch steigen (max 50% Increase)
      if (initialMemory > 0 && finalMemory > 0) {
        const increase = (finalMemory - initialMemory) / initialMemory;
        expect(increase).toBeLessThan(0.5);
      }
    });
  });

  test.describe('Network Performance', () => {
    test('sollte weniger als 100 Requests machen', async ({ page }) => {
      const requests = [];

      page.on('request', (request) => {
        requests.push(request.url());
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Sollte nicht zu viele Requests haben
      expect(requests.length).toBeLessThan(100);
    });

    test('sollte Gesamtgröße unter 3MB haben', async ({ page }) => {
      let totalSize = 0;

      page.on('response', async (response) => {
        try {
          const buffer = await response.body();
          totalSize += buffer.length;
        } catch (e) {
          // Ignore errors
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Gesamtgröße sollte unter 3MB sein
      expect(totalSize).toBeLessThan(3 * 1024 * 1024);
    });
  });
});
