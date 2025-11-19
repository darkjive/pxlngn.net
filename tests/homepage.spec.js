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
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    const heroDesktop = page.locator('#hero');
    await expect(heroDesktop).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(heroDesktop).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(heroDesktop).toBeVisible();
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
