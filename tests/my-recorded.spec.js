import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.microsoft.com/en-lk');
  await page.getByRole('link', { name: 'Support', exact: true }).click();
  await page.getByRole('searchbox', { name: 'How can we help you?' }).click();
  await page.getByRole('link', { name: 'Office', exact: true }).click();
  await page.getByRole('button', { name: 'Account & billing ' }).click();
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.getByRole('img', { name: 'Microsoft account sign in' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Buy or try Microsoft 365 ' }).click();
  const page1 = await page1Promise;
});