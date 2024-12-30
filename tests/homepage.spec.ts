import { test, expect } from '@playwright/test';

test('Homepage sollte geladen werden', async ({ page }) => {
  // Navigiere zur Homepage
  await page.goto('http://localhost:4321/');

  // Überprüfen, ob der Titel korrekt ist
  const title = await page.title();
  expect(title).toBe('pxlngn | Intro');

  // Überprüfen, ob ein bestimmtes Element vorhanden ist
  // const heading = await page.locator('h1');
  // await expect(heading).toHaveText('Hallo');
});
