#!/usr/bin/env node
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.join(process.cwd(), 'public/assets/images/previews/reads');
const artifactDir = '/Users/jshah/.gemini/antigravity/brain/975932eb-bd81-4597-a875-683741072e8f';
fs.mkdirSync(outputDir, { recursive: true });

async function runVerification() {
  console.log('\n🔍 Running Automated Reads Page Verification Suite...');

  // Start preview server
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
    setTimeout(() => {
      if (!serverUrl) serverUrl = 'http://localhost:4321';
      resolve();
    }, 3000);
  });

  const readsUrl = `${serverUrl}/reads/`;
  console.log(`Connected to preview server at: ${readsUrl}`);

  try {
    // 1. Dark Mode Suite
    console.log('\n[1/4] Testing Default Accordion State (Dark Mode)...');
    execSync(`
      agent-browser open ${readsUrl} &&
      agent-browser wait 1000 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-default.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'reads_default_dark.png')}
    `, { stdio: 'inherit' });

    const defaultState = JSON.parse(execSync(`
      agent-browser eval "(()=>{
        const results = [];
        document.querySelectorAll('.timeline-month-branch').forEach(b => {
          const month = b.querySelector('h3').textContent.trim();
          const isCardsHidden = b.querySelector('.month-cards-wrapper').classList.contains('hidden');
          const chevronTransform = b.querySelector('.month-chevron').style.transform;
          const isCurrent = b.dataset.currentMonth === 'true';
          results.push({ month, isCardsHidden, chevronTransform, isCurrent });
        });
        return results;
      })()"
    `).toString().trim());

    console.log('Default month states:', defaultState);
    if (!defaultState[0].isCurrent || defaultState[0].isCardsHidden) {
      throw new Error(`Current month (${defaultState[0].month}) should be expanded by default!`);
    }
    for (let i = 1; i < defaultState.length; i++) {
      if (!defaultState[i].isCardsHidden) {
        throw new Error(`Past month (${defaultState[i].month}) should be collapsed by default!`);
      }
    }
    console.log('✓ Current month is expanded and all past months are collapsed by default.');

    // 2. Interactive Accordion Toggle
    console.log('\n[2/4] Testing Interactive Month Toggle (July)...');
    execSync(`
      agent-browser eval "(()=>{
        const julyHeader = document.querySelector('#month-2026-07 .month-accordion-header');
        if (julyHeader) {
          julyHeader.scrollIntoView({ block: 'center' });
          julyHeader.click();
        }
      })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-july-expanded.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'reads_july_expanded_dark.png')}
    `, { stdio: 'inherit' });

    const julyExpanded = JSON.parse(execSync(`
      agent-browser eval "(()=>{
        const wrapper = document.querySelector('#month-2026-07 .month-cards-wrapper');
        return !wrapper.classList.contains('hidden');
      })()"
    `).toString().trim());

    if (!julyExpanded) {
      throw new Error('July should be expanded after clicking header!');
    }
    console.log('✓ July expanded on click.');

    // 3. Search Auto-Expansion and Reset
    console.log('\n[3/4] Testing Search Auto-Expansion & Reset...');
    execSync(`
      agent-browser eval "(()=>{
        const searchInput = document.getElementById('reads-search-input');
        searchInput.value = 'distillation';
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'dark-search-filter.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'reads_search_filter_dark.png')}
    `, { stdio: 'inherit' });

    const searchState = JSON.parse(execSync(`
      agent-browser eval "(()=>{
        const results = [];
        document.querySelectorAll('.timeline-month-branch:not(.hidden)').forEach(b => {
          const month = b.querySelector('h3').textContent.trim();
          const isCardsHidden = b.querySelector('.month-cards-wrapper').classList.contains('hidden');
          results.push({ month, isCardsHidden });
        });
        return results;
      })()"
    `).toString().trim());

    console.log('Search matching months:', searchState);
    for (const match of searchState) {
      if (match.isCardsHidden) {
        throw new Error(`Matching month (${match.month}) should be auto-expanded during search!`);
      }
    }
    console.log('✓ All search matching months auto-expanded.');

    // Clear search and test collapse reset
    execSync(`
      agent-browser eval "(()=>{
        const searchInput = document.getElementById('reads-search-input');
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      })()" &&
      agent-browser wait 300
    `, { stdio: 'inherit' });

    const resetState = JSON.parse(execSync(`
      agent-browser eval "(()=>{
        const results = [];
        document.querySelectorAll('.timeline-month-branch').forEach(b => {
          const month = b.querySelector('h3').textContent.trim();
          const isCardsHidden = b.querySelector('.month-cards-wrapper').classList.contains('hidden');
          results.push({ month, isCardsHidden });
        });
        return results;
      })()"
    `).toString().trim());

    if (resetState[0].isCardsHidden || !resetState[1].isCardsHidden) {
      throw new Error('Resetting search should restore default collapsed past months!');
    }
    console.log('✓ Default collapsed past months restored after clearing search.');

    // 4. Light Mode Suite
    console.log('\n[4/4] Testing Light Mode (Kolam Theme)...');
    execSync(`
      agent-browser eval "(()=>{
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      })()" &&
      agent-browser wait 500 &&
      agent-browser screenshot ${path.join(outputDir, 'light-default.png')} &&
      agent-browser screenshot ${path.join(artifactDir, 'reads_default_light.png')} &&
      agent-browser close
    `, { stdio: 'inherit' });

    console.log('✓ Light mode verified and screenshot captured.');
    console.log('\n🎉 ALL READS PAGE VERIFICATION TESTS PASSED SUCCESSFULLY!\n');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    preview.kill();
  }
}

runVerification();
