import { test, expect } from '@playwright/test';

test('Homepage sollte geladen werden', async ({ page }) => {
  
  await page.goto('http://localhost:4321/');

  const title = await page.title();
  expect(title).toBe('pxlngn | Intro');

});
