import { test, expect } from '@playwright/test';

test.describe('Kolam Border Component', () => {
  test('should have a flowing CSS animation on the kolam-border element', async ({ page }) => {
    // Navigate to a page with a kolam-border.
    await page.goto('http://localhost:4321/');

    // Select the first kolam-border
    const kolamBorder = page.locator('.kolam-border').first();

    // Expect it to be visible
    await expect(kolamBorder).toBeVisible();

    // Check if the element has an animation property applied
    const animation = await kolamBorder.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.animationName;
    });

    // We expect the animation name to be 'flow' or something similar
    expect(animation).not.toBe('none');
    expect(animation.length).toBeGreaterThan(0);
  });
});
