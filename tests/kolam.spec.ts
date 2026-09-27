import { test, expect } from '@playwright/test';

test.describe('Kolam Divider Component', () => {
  test('should have a breathing CSS animation on the kolam wave strand elements', async ({ page }) => {
    // Navigate to a page with a KolamDivider.
    await page.goto('http://localhost:4321/');

    // Select the first wave strand in KolamDivider
    const waveStrand = page.locator('.wave-terra-strand').first();

    // Expect it to be visible
    await expect(waveStrand).toBeVisible();

    // Check if the element has an animation property applied
    const animation = await waveStrand.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.animationName;
    });

    expect(animation).not.toBe('none');
    expect(animation.length).toBeGreaterThan(0);
  });
});
