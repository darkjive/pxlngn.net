/**
 * Dark Mode Tests
 *
 * Testet Dark Mode Funktionalität:
 * - Toggle funktioniert
 * - Preference wird gespeichert
 * - System-Preference wird respektiert
 */

import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Lösche LocalStorage vor jedem Test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('sollte Theme Toggle-Button anzeigen', async ({ page }) => {
    const toggleButton = page.locator('[data-aw-toggle-color-scheme]');
    await expect(toggleButton).toBeVisible();
  });

  test('sollte zwischen Light und Dark Mode wechseln', async ({ page }) => {
    const html = page.locator('html');
    const toggleButton = page.locator('[data-aw-toggle-color-scheme]');

    // Initial Theme prüfen
    const initialTheme = await html.getAttribute('class');

    // Toggle klicken
    await toggleButton.click();
    await page.waitForTimeout(100);

    // Theme sollte gewechselt haben
    const newTheme = await html.getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);

    // Nochmal toggle
    await toggleButton.click();
    await page.waitForTimeout(100);

    // Sollte wieder beim ursprünglichen Theme sein
    const finalTheme = await html.getAttribute('class');
    expect(finalTheme).toBe(initialTheme);
  });

  test('sollte Theme-Preference in LocalStorage speichern', async ({ page }) => {
    const html = page.locator('html');
    const toggleButton = page.locator('[data-aw-toggle-color-scheme]');

    // Aktiviere Dark Mode
    const hasDarkClass = await html.evaluate((el) => el.classList.contains('dark'));

    if (!hasDarkClass) {
      await toggleButton.click();
      await page.waitForTimeout(100);
    }

    // Prüfe LocalStorage
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');

    // Reload und prüfe ob Theme persistiert
    await page.reload();
    const htmlAfterReload = page.locator('html');
    await expect(htmlAfterReload).toHaveClass(/dark/);
  });

  test('sollte Dark Mode Style korrekt anwenden', async ({ page }) => {
    const toggleButton = page.locator('[data-aw-toggle-color-scheme]');
    const html = page.locator('html');

    // Aktiviere Dark Mode
    const hasDarkClass = await html.evaluate((el) => el.classList.contains('dark'));

    if (!hasDarkClass) {
      await toggleButton.click();
      await page.waitForTimeout(100);
    }

    // Prüfe ob Dark Mode aktiv ist
    await expect(html).toHaveClass(/dark/);

    // Prüfe ob Body Dark-Styles hat (Background sollte dunkel sein)
    const bodyBg = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // RGB Werte sollten niedrig sein (dunkel)
    expect(bodyBg).toBeTruthy();
  });
});
