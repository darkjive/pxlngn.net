import { test } from '@playwright/test';

test('Prüfe Tailwind-Klassen', async ({ page }) => {
  await page.goto('http://localhost:4321/');

});
