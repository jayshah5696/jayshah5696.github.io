import { test, expect } from '@playwright/test';

const postUrl = 'http://localhost:4321/posts/how-text-watermarks-hide-in-plain-sight/';

test.describe('watermark post performance', () => {
  test('keeps the runtime DOM and background work bounded', async ({ page }) => {
    await page.goto(postUrl);
    await page.waitForLoadState('networkidle');

    const metrics = await page.evaluate(() => ({
      elements: document.querySelectorAll('*').length,
      svgDescendants: document.querySelectorAll('svg *').length,
      svgCircles: document.querySelectorAll('circle').length,
      hiddenCompatibilityElements: document.querySelectorAll('#theme, #progress').length,
    }));

    expect(metrics.elements).toBeLessThan(3_000);
    expect(metrics.svgDescendants).toBeLessThan(500);
    expect(metrics.svgCircles).toBeLessThan(100);
    expect(metrics.hiddenCompatibilityElements).toBe(0);
  });

  test('renders the calibration chart without one DOM node per observation', async ({ page }) => {
    await page.goto(postUrl);
    await page.waitForLoadState('networkidle');

    const chart = page.locator('#calibrationPlot');
    await expect(chart).toBeVisible();
    await expect(chart.locator('circle')).toHaveCount(0);
    await expect(chart.locator('path')).toHaveCount(2);
  });

  test('runs autoplay only for the visible figure', async ({ page }) => {
    await page.addInitScript(() => {
      const activeIntervals = new Map<number, number>();
      const nativeSetInterval = window.setInterval;
      const nativeClearInterval = window.clearInterval;

      window.setInterval = ((callback: TimerHandler, delay?: number, ...args: unknown[]) => {
        const id = nativeSetInterval(callback, delay, ...args);
        activeIntervals.set(id, Number(delay) || 0);
        return id;
      }) as typeof window.setInterval;
      window.clearInterval = ((id?: number) => {
        if (id !== undefined) activeIntervals.delete(id);
        nativeClearInterval(id);
      }) as typeof window.clearInterval;

      Object.defineProperty(window, '__activeTestIntervals', {
        value: activeIntervals,
      });
    });

    const activeDelays = () => page.evaluate(() => (
      [...(window as Window & { __activeTestIntervals: Map<number, number> }).__activeTestIntervals.values()]
    ));

    await page.goto(postUrl);
    await page.waitForLoadState('networkidle');
    await expect.poll(activeDelays).toEqual([]);

    await page.locator('#media-slack').scrollIntoViewIfNeeded();
    await expect.poll(activeDelays).toEqual([900]);

    await page.locator('#coin-length').scrollIntoViewIfNeeded();
    await expect.poll(activeDelays).toEqual([2_000]);

    await page.locator('#length-ladder').scrollIntoViewIfNeeded();
    await expect.poll(activeDelays).toEqual([2_200]);

    await page.locator('#field-map').scrollIntoViewIfNeeded();
    await expect.poll(activeDelays).toEqual([]);
  });

  test('does not duplicate generated controls after client navigation', async ({ page }) => {
    await page.goto(postUrl);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#lengthButtons button')).toHaveCount(5);

    await page.goto('http://localhost:4321/');
    await page.goBack();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('#lengthButtons button')).toHaveCount(5);
    await expect(page.locator('#calibrationPlot path')).toHaveCount(2);
  });
});
