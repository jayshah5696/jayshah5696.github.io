import { test, expect } from '@playwright/test';

test.describe('PostCard Component', () => {
  test('should have a read article indicator and hover animations', async ({ page }) => {
    // Navigate to a page with a PostCard. Assuming homepage has them.
    await page.goto('http://localhost:4321/');

    // Select the first article (PostCard)
    const firstArticle = page.locator('article.group').first();

    // Expect it to have the featured-card class
    await expect(firstArticle).toHaveClass(/featured-card/);

    // Hover the article to trigger opacity transition
    await firstArticle.hover();

    // Expect to find a read article indicator inside it
    const readIndicator = firstArticle.locator('text=Read article');
    await expect(readIndicator).toBeVisible();

    // The indicator should have a container with the transition classes
    const indicatorContainer = firstArticle.locator('.group-hover\\\\:translate-x-0\\\\.5').first();
    await expect(indicatorContainer).toBeAttached();
  });
});
