import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('link', { name: 'English 7,141,000+ articles' }).click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('combobox', { name: 'Search Wikipedia' }).fill('pplaywright');
  await page.getByRole('button', { name: 'Search' }).click();
});