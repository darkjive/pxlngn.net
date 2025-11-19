/**
 * Navigation Tests
 *
 * Testet Navigation-Funktionalität:
 * - Header ist sichtbar
 * - Scroll-Verhalten
 * - Mobile Menu Toggle
 * - Anchor-Links funktionieren
 */

import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sollte Header anzeigen', async ({ page }) => {
    const header = page.locator('#header');
    await expect(header).toBeVisible();

    // Prüfe Logo
    const logo = page.locator('#header a[href="/"]');
    await expect(logo).toBeVisible();
  });

  test('sollte beim Scrollen Styling ändern', async ({ page }) => {
    const header = page.locator('#header');

    // Initial sollte keine 'scroll' class vorhanden sein
    await expect(header).not.toHaveClass(/scroll/);

    // Scrolle nach unten
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(300); // Warte auf Scroll-Animation

    // Jetzt sollte 'scroll' class vorhanden sein
    await expect(header).toHaveClass(/scroll/);
  });

  test('sollte Mobile Menu öffnen und schließen', async ({ page }) => {
    // Setze Mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const menuToggle = page.locator('[data-aw-toggle-menu]');
    const nav = page.locator('#header nav');

    // Initial sollte Navigation versteckt sein
    await expect(nav).toHaveClass(/hidden/);

    // Öffne Menu
    await menuToggle.click();
    await page.waitForTimeout(200);

    // Navigation sollte sichtbar sein
    await expect(nav).not.toHaveClass(/hidden/);

    // Schließe Menu
    await menuToggle.click();
    await page.waitForTimeout(200);

    // Navigation sollte wieder versteckt sein
    await expect(nav).toHaveClass(/hidden/);
  });

  test('sollte Anchor-Links navigieren', async ({ page }) => {
    // Klicke auf einen Anchor-Link
    const profileLink = page.locator('a[href="#profile"]').first();
    await profileLink.click();

    // Warte kurz auf Smooth-Scroll
    await page.waitForTimeout(500);

    // Prüfe ob Section in Viewport ist
    const profileSection = page.locator('#profile');
    const isInViewport = await profileSection.isInViewport();
    expect(isInViewport).toBeTruthy();
  });

  test('sollte auf Desktop immer sichtbar sein', async ({ page }) => {
    // Desktop Viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    const header = page.locator('#header[data-aw-sticky-header]');

    // Scrolle nach unten
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    // Header sollte nicht header-hidden class haben
    await expect(header).not.toHaveClass(/header-hidden/);
  });
});
