import { test, expect } from '@playwright/test';

test.describe('Reads Page Accordion and Collapsed Past Months', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/reads/');
  });

  test('current month is expanded by default and past months are collapsed', async ({ page }) => {
    const augustBranch = page.locator('#month-2026-08');
    const julyBranch = page.locator('#month-2026-07');
    const juneBranch = page.locator('#month-2026-06');
    const mayBranch = page.locator('#month-2026-05');

    // August (current month) should be visible and expanded
    await expect(augustBranch).toBeVisible();
    await expect(augustBranch.locator('.month-cards-wrapper')).toBeVisible();

    // Past months (July, June, May) should have hidden cards wrapper
    await expect(julyBranch.locator('.month-cards-wrapper')).toBeHidden();
    await expect(juneBranch.locator('.month-cards-wrapper')).toBeHidden();
    await expect(mayBranch.locator('.month-cards-wrapper')).toBeHidden();
  });

  test('clicking a past month header expands and collapses it', async ({ page }) => {
    const julyBranch = page.locator('#month-2026-07');
    const julyHeader = julyBranch.locator('.month-accordion-header');
    const julyCards = julyBranch.locator('.month-cards-wrapper');

    // Initially collapsed
    await expect(julyCards).toBeHidden();

    // Click to expand
    await julyHeader.click();
    await expect(julyCards).toBeVisible();

    // Click again to collapse
    await julyHeader.click();
    await expect(julyCards).toBeHidden();
  });

  test('searching auto-expands matching past months and clearing search collapses them', async ({ page }) => {
    const searchInput = page.locator('#reads-search-input');
    const mayBranch = page.locator('#month-2026-05');
    const mayCards = mayBranch.locator('.month-cards-wrapper');

    // Initially May is collapsed
    await expect(mayCards).toBeHidden();

    // Type a query that matches a May entry
    await searchInput.fill('adam instability');
    await expect(mayBranch).toBeVisible();
    await expect(mayCards).toBeVisible();

    // Clear search query
    await searchInput.fill('');
    await expect(mayCards).toBeHidden();
  });
});
