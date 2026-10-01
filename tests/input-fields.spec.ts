import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Pet type is updated', async ({ page }) => {
  await page.getByText('PET TYPES').click();
  await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible();

  await page.getByRole('button', { name: 'Edit' }).first().click();
  await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible();

  const nameInput = page.locator('input.form-control#name');
  await expect(nameInput).toHaveValue('cat');

  await nameInput.fill('rabbit');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByRole('row', { name: 'rabbit' })).toBeVisible();

  await page.getByRole('button', { name: 'Edit' }).first().click();
  await expect(nameInput).toHaveValue('rabbit');
  await nameInput.fill('cat');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByRole('row', { name: 'cat' })).toBeVisible();
});