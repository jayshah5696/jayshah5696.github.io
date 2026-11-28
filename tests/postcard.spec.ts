import { test, expect } from '@playwright/test';

const port = process.env.PORT || '4321';

test.describe('PostCard Component', () => {
  test('renders grounded featured spotlight card linking to latest essay', async ({ page }) => {
    await page.goto(`http://localhost:${port}/`);

    const featuredCard = page.locator('article.featured-card').first();
    await expect(featuredCard).toBeVisible();

    const postLink = featuredCard.locator('a[href^="/posts/"]').first();
    await expect(postLink).toBeVisible();

    await featuredCard.hover();
    const delay = await featuredCard.evaluate((el) => window.getComputedStyle(el).transitionDelay);
    expect(delay).toBe('0s');
  });
});
