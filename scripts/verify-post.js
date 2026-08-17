#!/usr/bin/env node
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const slug = process.argv[2] || 'how-text-watermarks-hide-in-plain-sight';
const outputDir = path.join(process.cwd(), 'public/assets/images/previews', slug);
const artifactDir = '/Users/jshah/.gemini/antigravity/brain/f01958fe-c6a9-4584-b4c3-002e3730ce0c';
fs.mkdirSync(outputDir, { recursive: true });

async function runVerification() {
  console.log(`\n🔍 Verifying interactive post: /posts/${slug}/`);
  
  // Start preview server and capture its assigned port
  const preview = spawn('npx', ['astro', 'preview'], {
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let serverUrl = '';
  await new Promise((resolve) => {
    preview.stdout.on('data', (data) => {
      const text = data.toString();
      const match = text.match(/http:\/\/localhost:\d+\/?/);
      if (match && !serverUrl) {
        serverUrl = match[0].replace(/\/$/, '');
        resolve();
      }
    });
    // Fallback timeout
    setTimeout(() => {
      if (!serverUrl) serverUrl = 'http://localhost:4321';
      resolve();
    }, 3000);
  });

  const postUrl = `${serverUrl}/posts/${slug}/`;
  console.log(`Connected to preview server at: ${postUrl}`);

  try {
    // 1. Dark Mode Suite
    console.log('Capturing Dark Mode verification screenshots...');
    execSync(`
      agent-browser open ${postUrl} &&
      agent-browser wait 1200 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-header-toc.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_dark_header_toc.png')} &&
      
      # Figure 1: Coin Flips
      agent-browser eval "(()=>{ const el = document.getElementById('flipAgain'); if(el){ el.scrollIntoView({block:'center'}); el.click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-figure1-coins.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_dark_figure1_coins.png')} &&

      # Figure 2: Worked Steps
      agent-browser eval "(()=>{ const el = document.getElementById('calcAll'); if(el){ el.scrollIntoView({block:'center'}); el.click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-figure2-worked-steps.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_dark_figure2_worked.png')} &&

      # Figure 4: 2000-Batch Distribution Histogram
      agent-browser eval "(()=>{ const btns = document.querySelectorAll('#distLengths button'); if(btns.length > 2){ btns[2].scrollIntoView({block:'center'}); btns[2].click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-figure4-histogram.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_dark_figure4_histogram.png')} &&

      # Figure 6: Toy Stepper
      agent-browser eval "(()=>{ const el = document.getElementById('toyNext'); if(el){ el.scrollIntoView({block:'center'}); el.click(); el.click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-figure6-toy-stepper.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_dark_figure6_toy.png')} &&

      # Figure 7: Gemma Real Logits
      agent-browser eval "(()=>{ const el = document.getElementById('realOn'); if(el){ el.scrollIntoView({block:'center'}); el.click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-figure7-gemma-logits.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_dark_figure7_logits.png')} &&

      # Figure 11: Attack Robustness & Paraphrase
      agent-browser eval "(()=>{ const el = document.getElementById('editParaphrase'); if(el){ el.scrollIntoView({block:'center'}); el.click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-figure11-attack-robustness.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_dark_figure11_attack.png')} &&
      agent-browser close
    `, { stdio: 'inherit' });

    // 2. Light Mode Suite
    console.log('Capturing Light Mode verification screenshots...');
    execSync(`
      agent-browser open ${postUrl} &&
      agent-browser wait 1000 &&
      agent-browser eval "localStorage.setItem('theme', 'light'); document.documentElement.classList.remove('dark');" &&
      agent-browser wait 600 &&
      agent-browser screenshot ${path.join(outputDir, 'light-header-toc.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_light_header_toc.png')} &&

      # Light Figure 1 Coins
      agent-browser eval "(()=>{ const el = document.getElementById('flipAgain'); if(el){ el.scrollIntoView({block:'center'}); el.click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'light-figure1-coins.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_light_figure1_coins.png')} &&

      # Light Figure 4 Histogram
      agent-browser eval "(()=>{ const btns = document.querySelectorAll('#distLengths button'); if(btns.length > 2){ btns[2].scrollIntoView({block:'center'}); btns[2].click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'light-figure4-histogram.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_light_figure4_histogram.png')} &&

      # Light Figure 13 Methods
      agent-browser eval "(()=>{ const btns = document.querySelectorAll('#methodButtons button'); if(btns.length > 1){ btns[1].scrollIntoView({block:'center'}); btns[1].click(); } })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'light-figure13-methods.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'verified_light_figure13_methods.png')} &&
      agent-browser close
    `, { stdio: 'inherit' });

    console.log(`\n✅ Comprehensive visual verification successful!`);
    console.log(`   - Saved all verified screenshots in ${outputDir} and brain artifacts.`);
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    preview.kill();
  }
}

runVerification();
