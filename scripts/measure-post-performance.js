#!/usr/bin/env node
import fs from 'node:fs';
import { chromium, webkit } from 'playwright';

const args = process.argv.slice(2);
const valueFor = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args[index + 1];
};

const url = valueFor('--url', 'http://127.0.0.1:4321/posts/how-text-watermarks-hide-in-plain-sight/');
const label = valueFor('--label', 'measurement');
const output = valueFor('--output', '');
const waitMs = Number(valueFor('--wait', '5000'));
const requestedBrowsers = valueFor('--browsers', 'chromium').split(',');
const browserTypes = { chromium, webkit };
const results = [];

for (const browserName of requestedBrowsers) {
  const browserType = browserTypes[browserName];
  if (!browserType) throw new Error(`Unsupported browser: ${browserName}`);

  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(String(error)));

  await page.addInitScript(() => {
    const probe = {
      activeIntervals: new Map(),
      intervalRegistrations: 0,
      activeWindowScrollListeners: new Set(),
      longTasks: [],
    };
    window.__postPerformanceProbe = probe;

    const nativeSetInterval = window.setInterval;
    const nativeClearInterval = window.clearInterval;
    window.setInterval = function (callback, delay, ...callbackArgs) {
      probe.intervalRegistrations += 1;
      let id;
      const record = { delay: Number(delay) || 0, calls: 0 };
      id = nativeSetInterval.call(window, (...innerArgs) => {
        record.calls += 1;
        return callback(...innerArgs);
      }, delay, ...callbackArgs);
      probe.activeIntervals.set(id, record);
      return id;
    };
    window.clearInterval = function (id) {
      probe.activeIntervals.delete(id);
      return nativeClearInterval.call(window, id);
    };

    const nativeAddEventListener = EventTarget.prototype.addEventListener;
    const nativeRemoveEventListener = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (this === window && type === 'scroll') probe.activeWindowScrollListeners.add(listener);
      return nativeAddEventListener.call(this, type, listener, options);
    };
    EventTarget.prototype.removeEventListener = function (type, listener, options) {
      if (this === window && type === 'scroll') probe.activeWindowScrollListeners.delete(listener);
      return nativeRemoveEventListener.call(this, type, listener, options);
    };

    try {
      new PerformanceObserver((list) => {
        probe.longTasks.push(...list.getEntries().map((entry) => entry.duration));
      }).observe({ entryTypes: ['longtask'] });
    } catch {
      // WebKit does not expose the Long Tasks API.
    }
  });

  const navigationStarted = performance.now();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  const navigationWallTimeMs = performance.now() - navigationStarted;
  await page.waitForTimeout(waitMs);

  const metrics = await page.evaluate(async () => {
    const probe = window.__postPerformanceProbe;
    const resources = performance.getEntriesByType('resource');
    const navigation = performance.getEntriesByType('navigation')[0];
    const paragraphs = [...document.querySelectorAll('.interactive-content p')]
      .filter((element) => element.textContent.trim().length > 120);
    const selectionToPaintSamples = [];

    for (const paragraph of paragraphs.slice(0, 10)) {
      const range = document.createRange();
      range.selectNodeContents(paragraph);
      const started = performance.now();
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      range.getClientRects();
      await new Promise(requestAnimationFrame);
      selectionToPaintSamples.push(performance.now() - started);
      selection.removeAllRanges();
    }

    return {
      decodedHtmlBytes: navigation?.decodedBodySize ?? null,
      resourceCount: resources.length,
      decodedResourceBytes: resources.reduce((sum, resource) => sum + (resource.decodedBodySize || 0), 0),
      domElements: document.querySelectorAll('*').length,
      svgDescendants: document.querySelectorAll('svg *').length,
      svgCircles: document.querySelectorAll('circle').length,
      documentHeight: document.documentElement.scrollHeight,
      intervalRegistrations: probe.intervalRegistrations,
      activeIntervals: [...probe.activeIntervals.values()],
      activeWindowScrollListeners: probe.activeWindowScrollListeners.size,
      longTaskCount: probe.longTasks.length,
      longestTaskMs: probe.longTasks.length ? Math.max(...probe.longTasks) : null,
      selectionToPaintAvgMs: selectionToPaintSamples.length
        ? selectionToPaintSamples.reduce((sum, sample) => sum + sample, 0) / selectionToPaintSamples.length
        : null,
      selectionToPaintMaxMs: selectionToPaintSamples.length
        ? Math.max(...selectionToPaintSamples)
        : null,
    };
  });

  results.push({
    label,
    browser: browserName,
    url,
    navigationWallTimeMs,
    pageErrors,
    ...metrics,
  });

  await page.close();
  await browser.close();
}

const report = JSON.stringify(results, null, 2);
console.log(report);
if (output) fs.writeFileSync(output, `${report}\n`);
