import { test, expect } from '@playwright/test';

const port = process.env.PORT || '4321';

test.describe('Reads Page Accordion and Collapsed Past Months', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:${port}/reads/`);
  });

  test('current month is expanded by default and past months are collapsed', async ({ page }) => {
    const branches = page.locator('.timeline-month-branch');
    const count = await branches.count();
    expect(count).toBeGreaterThan(1);

    await expect(branches.first().locator('.month-cards-wrapper')).toBeVisible();
    await expect(branches.nth(1).locator('.month-cards-wrapper')).toBeHidden();
  });

  test('clicking a past month header expands and collapses it', async ({ page }) => {
    const pastBranch = page.locator('.timeline-month-branch').nth(1);
    const pastHeader = pastBranch.locator('.month-accordion-header');
    const pastCards = pastBranch.locator('.month-cards-wrapper');

    await expect(pastCards).toBeHidden();

    await pastHeader.click();
    await expect(pastCards).toBeVisible();

    await pastHeader.click();
    await expect(pastCards).toBeHidden();
  });

  test('searching auto-expands matching past months and clearing search collapses them', async ({ page }) => {
    const searchInput = page.locator('#reads-search-input');
    const mayBranch = page.locator('#month-2026-05');
    const mayCards = mayBranch.locator('.month-cards-wrapper');

    await expect(mayCards).toBeHidden();

    await searchInput.fill('adam instability');
    await expect(mayBranch).toBeVisible();
    await expect(mayCards).toBeVisible();

    await searchInput.fill('');
    await expect(mayCards).toBeHidden();
  });
});
