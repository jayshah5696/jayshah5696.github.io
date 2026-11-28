import { test, expect } from '@playwright/test';

test.describe('Archives mouse interaction and hover synchronization', () => {
  const port = process.env.PORT || '4321';

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(`http://localhost:${port}/archives/`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
  });

  test('should enforce 0s transition-delay across row, links, titles, and diamond nodes', async ({ page }) => {
    const items = page.locator('section:first-of-type li.group');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 4); i++) {
      const item = items.nth(i);
      const delays = await item.evaluate((el) => {
        const diamond = el.querySelector('.kolam-diamond-node');
        const link = el.querySelector('a');
        const title = el.querySelector('.index-row-title');
        return {
          itemDelay: window.getComputedStyle(el).transitionDelay,
          diamondDelay: window.getComputedStyle(diamond!).transitionDelay,
          linkDelay: window.getComputedStyle(link!).transitionDelay,
          titleDelay: window.getComputedStyle(title!).transitionDelay,
        };
      });

      const allZero = (val: string) => val.split(',').every((v) => v.trim() === '0s');
      expect(allZero(delays.itemDelay)).toBe(true);
      expect(allZero(delays.diamondDelay)).toBe(true);
      expect(allZero(delays.linkDelay)).toBe(true);
      expect(allZero(delays.titleDelay)).toBe(true);
    }
  });

  test('should synchronize row hover: diamond node and title highlight cleanly without box chrome', async ({ page }) => {
    const firstItem = page.locator('section:first-of-type li.group').first();
    const diamond = firstItem.locator('.kolam-diamond-node');
    const title = firstItem.locator('.index-row-title');

    const diamondPointerEvents = await diamond.evaluate((el) => window.getComputedStyle(el).pointerEvents);
    expect(diamondPointerEvents).toBe('none');

    const defaultColor = await title.evaluate((el) => window.getComputedStyle(el).color);

    await firstItem.hover();
    await page.waitForTimeout(220);

    const diamondState = await diamond.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        boxShadow: cs.boxShadow,
        transform: cs.transform,
        rotate: cs.rotate,
      };
    });
    expect(diamondState.boxShadow).toContain('2px');
    // Stays a rotated diamond (135deg), never combines CSS rotate + transform into an upright square
    expect(diamondState.rotate).toBe('none');
    expect(diamondState.transform).toMatch(/matrix\(-0\.707\d*, 0\.707\d*, -0\.707\d*, -0\.707\d*, 0, 0\)/);

    const hoveredColor = await title.evaluate((el) => window.getComputedStyle(el).color);
    expect(hoveredColor).not.toBe(defaultColor);

    await page.mouse.move(10, 10);
    await page.waitForTimeout(150);

    const resetColor = await title.evaluate((el) => window.getComputedStyle(el).color);
    expect(resetColor).toBe(defaultColor);
  });

  test('should cleanly handle rapid mouse sweeps across archive stack without glitching', async ({ page }) => {
    const items = page.locator('section:first-of-type li.group');
    const count = await items.count();
    const defaultColor = await items.first().locator('.index-row-title').evaluate((el) => window.getComputedStyle(el).color);

    const boxes = [];
    for (let i = 0; i < count; i++) {
      boxes.push(await items.nth(i).boundingBox());
    }

    for (const box of boxes) {
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(20);
      }
    }

    await page.mouse.move(10, 10);
    await page.waitForTimeout(200);

    const anyStuck = await page.evaluate((base) => {
      return Array.from(document.querySelectorAll('section:first-of-type li.group .index-row-title')).some((el) => {
        return window.getComputedStyle(el).color !== base;
      });
    }, defaultColor);
    expect(anyStuck).toBe(false);
  });
});
