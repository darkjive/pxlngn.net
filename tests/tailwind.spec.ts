// import { test, expect } from '@playwright/test';
import { test } from '@playwright/test';

test('Prüfe Tailwind-Klassen', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // const button = page.locator('button');
  // await expect(button).toHaveClass(/btn-primary/); // Prüft, ob die Klasse vorhanden ist
});
