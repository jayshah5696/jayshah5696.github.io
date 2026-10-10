import { test, expect } from '@playwright/test';

test.describe('Archives mouse interaction and hover synchronization', () => {
  const port = process.env.PORT || '4322';

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(`http://localhost:${port}/archives/`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(400);
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
        const title = el.querySelector('span.font-medium');
        return {
          itemDelay: window.getComputedStyle(el).transitionDelay,
          diamondDelay: window.getComputedStyle(diamond).transitionDelay,
          linkDelay: window.getComputedStyle(link).transitionDelay,
          titleDelay: window.getComputedStyle(title).transitionDelay,
        };
      });

      expect(delays.itemDelay).toBe('0s');
      expect(delays.diamondDelay).toBe('0s');
      expect(delays.linkDelay).toBe('0s');
      expect(delays.titleDelay).toBe('0s');
    }
  });

  test('should synchronize row hover: diamond node, link card, and title highlight in unison', async ({ page }) => {
    const firstItem = page.locator('section:first-of-type li.group').first();
    const diamond = firstItem.locator('.kolam-diamond-node');
    const link = firstItem.locator('a');
    const title = firstItem.locator('span.font-medium');

    // Before hover: verify diamond has pointer-events-none
    const diamondPointerEvents = await diamond.evaluate((el) => window.getComputedStyle(el).pointerEvents);
    expect(diamondPointerEvents).toBe('none');

    // Hover over the item
    await firstItem.hover();
    await page.waitForTimeout(200);

    // Verify diamond node ring and border
    const diamondState = await diamond.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        borderColor: style.borderColor,
        boxShadow: style.boxShadow,
      };
    });
    // Border should transition to gold (#e8c462 or rgb(232, 196, 98) / rgb(212, 168, 67))
    expect(diamondState.boxShadow).toContain('2px');

    // Verify link card background and border transitioned via group-hover
    const linkState = await link.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
      };
    });
    // Border should not be completely transparent (2a2438 / night-700 in dark mode)
    expect(linkState.borderColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(linkState.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');

    // Verify title transitioned to terra
    const titleColor = await title.evaluate((el) => window.getComputedStyle(el).color);
    expect(titleColor).not.toBe('rgb(232, 224, 212)'); // Not default silk

    // Move mouse away to body origin
    await page.mouse.move(10, 10);
    await page.waitForTimeout(250);

    // Verify unhovered state cleanly resets
    const resetState = await firstItem.evaluate((el) => {
      const l = el.querySelector('a');
      const s = window.getComputedStyle(l);
      return {
        borderColor: s.borderColor,
        backgroundColor: s.backgroundColor,
      };
    });
    expect(resetState.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  test('should cleanly handle rapid mouse sweeps across archive stack without glitching', async ({ page }) => {
    const items = page.locator('section:first-of-type li.group');
    const count = await items.count();

    const boxes = [];
    for (let i = 0; i < count; i++) {
      boxes.push(await items.nth(i).boundingBox());
    }

    // Rapid vertical sweep across all items (20ms each)
    for (const box of boxes) {
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(20);
      }
    }

    // Move mouse out of the archive list
    await page.mouse.move(10, 10);
    await page.waitForTimeout(250);

    // Verify all items are cleanly unhovered
    const anyHovered = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('section:first-of-type li.group')).some((li) => {
        const link = li.querySelector('a');
        return window.getComputedStyle(link).backgroundColor !== 'rgba(0, 0, 0, 0)';
      });
    });
    expect(anyHovered).toBe(false);
  });
});
