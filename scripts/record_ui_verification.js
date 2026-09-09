import { chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

async function recordVerification() {
  const videoDir = '/home/jules/verification/video';
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 800 },
    },
  });

  const page = await context.newPage();

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:4321/');
  await page.waitForLoadState('networkidle');

  // Homepage Light Mode Screenshot
  await page.screenshot({ path: '/home/jules/verification/homepage-light.png' });

  // Hover featured PostCard
  const firstArticle = page.locator('article.featured-card').first();
  await firstArticle.hover();
  await page.waitForTimeout(400);

  // Toggle Dark Mode
  console.log('Toggling dark mode...');
  const themeToggle = page.locator('#theme-toggle-desktop');
  await themeToggle.click();
  await page.waitForTimeout(500);

  // Homepage Dark Mode Screenshot
  await page.screenshot({ path: '/home/jules/verification/homepage-dark.png' });

  // Open Search Dialog
  console.log('Opening Search Dialog...');
  await page.keyboard.press('/');
  await page.waitForTimeout(600);

  // Search screenshot
  await page.screenshot({ path: '/home/jules/verification/search-modal.png' });

  // Close search
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Navigate to Reads
  console.log('Navigating to /reads/...');
  await page.goto('http://localhost:4321/reads/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(400);

  // Reads Page Screenshot
  await page.screenshot({ path: '/home/jules/verification/reads-page.png' });

  // Toggle Month Accordion
  const monthHeader = page.locator('.month-accordion-header').first();
  await monthHeader.click();
  await page.waitForTimeout(400);

  // Navigate to About
  console.log('Navigating to /about/...');
  await page.goto('http://localhost:4321/about/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(600);

  // About Page Screenshot
  await page.screenshot({ path: '/home/jules/verification/about-page.png' });

  // Navigate to Projects
  console.log('Navigating to /projects/...');
  await page.goto('http://localhost:4321/projects/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(400);

  // Projects Page Screenshot
  await page.screenshot({ path: '/home/jules/verification/projects-page.png' });

  console.log('Closing browser and finalizing video...');
  await page.close();
  await context.close();
  await browser.close();

  // Find recorded video file
  const videoFiles = fs.readdirSync(videoDir).filter(f => f.endsWith('.webm'));
  if (videoFiles.length > 0) {
    const mainVideo = path.join(videoDir, videoFiles[0]);
    const targetVideo = '/home/jules/verification/ui-demo.webm';
    fs.copyFileSync(mainVideo, targetVideo);
    console.log('Saved recorded video to:', targetVideo);
  }

  console.log('Verification completed successfully.');
}

recordVerification().catch(err => {
  console.error('Error during recording:', err);
  process.exit(1);
});
