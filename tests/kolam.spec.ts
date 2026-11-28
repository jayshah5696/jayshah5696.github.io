import { test, expect } from '@playwright/test';

const port = process.env.PORT || '4321';

test.describe('Kolam Divider Component', () => {
  test('renders harmonic breathing CSS animation on Kolam wave strands', async ({ page }) => {
    await page.goto(`http://localhost:${port}/`);

    const terraStrand = page.locator('.wave-terra-strand').first();
    const goldStrand = page.locator('.wave-gold-strand').first();

    await expect(terraStrand).toBeVisible();
    await expect(goldStrand).toBeVisible();

    const animationName = await terraStrand.evaluate((el) => window.getComputedStyle(el).animationName);
    expect(animationName).not.toBe('none');
    expect(animationName.length).toBeGreaterThan(0);
  });
});
