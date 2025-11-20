/**
 * Homepage Tests
 *
 * Testet grundlegende Funktionalität der Startseite:
 * - Seite lädt erfolgreich
 * - Wichtige Elemente sind sichtbar
 * - SEO Meta-Tags vorhanden
 * - Navigation funktioniert
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sollte erfolgreich laden', async ({ page }) => {
    // Prüfe ob Seite geladen wurde
    await expect(page).toHaveTitle(/pxlngn/i);

    // Prüfe ob Hero-Section vorhanden ist
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
  });

  test('sollte wichtige Sections enthalten', async ({ page }) => {
    // Prüfe ob wichtige Sections vorhanden sind
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#profile')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
  });

  test('sollte SEO Meta-Tags enthalten', async ({ page }) => {
    // Prüfe Meta-Description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(50);

    // Prüfe OpenGraph Tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
  });

  test('sollte responsive sein', async ({ page }) => {
    const hero = page.locator('#hero');

    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(hero).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(hero).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(hero).toBeVisible();
  });

  test('sollte alle wichtigen Komponenten laden', async ({ page }) => {
    // Prüfe wichtige Komponenten
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#profile')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();

    // Prüfe ob Header geladen wurde
    await expect(page.locator('#header')).toBeVisible();

    // Prüfe ob Footer geladen wurde
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });

  test('sollte Images optimiert laden', async ({ page }) => {
    // Prüfe ob Images lazy loading nutzen
    const images = page.locator('img');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    // Mindestens einige Images sollten lazy loading haben
    const lazyImages = page.locator('img[loading="lazy"]');
    const lazyCount = await lazyImages.count();
    expect(lazyCount).toBeGreaterThan(0);
  });

  test('sollte schnelle Ladezeit haben', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Seite sollte in weniger als 3 Sekunden laden
    expect(loadTime).toBeLessThan(3000);
  });

  test('sollte keine Console-Errors haben', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Erlaube Sound-Errors (da Audio-Files evtl. nicht vorhanden)
    const relevantErrors = consoleErrors.filter(
      (error) => !error.includes('Sound play failed') && !error.includes('Ambiance play failed')
    );

    expect(relevantErrors).toHaveLength(0);
  });
});
