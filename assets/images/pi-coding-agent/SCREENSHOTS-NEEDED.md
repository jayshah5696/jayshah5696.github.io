# Screenshots Needed for Pi Coding Agent Blog Post

This document lists the screenshots that should be added to complete the blog post.

## 1. Hero Image (Optional but recommended)
**Location**: Top of the blog post
**Description**: Screenshot of your Pi terminal with powerline footer, extensions loaded, mid-session. Dark theme.
**Filename suggestion**: `pi-terminal-hero.png`
**Where to add**: Currently using the Drake meme as header image, but could replace with an actual terminal screenshot

## 2. Pi /tree Output
**Location**: Section "Why Pi: the minimum viable agent" 
**Description**: Screenshot showing Pi's `/tree` command output with a branching session displaying multiple conversation paths
**Filename suggestion**: `pi-tree-output.png`
**Purpose**: Demonstrates Pi's conversation tree feature where you can branch and fork conversations

## 3. Pi Startup with Extensions
**Location**: Section "My rig: the extensions"
**Description**: Screenshot of Pi startup showing the loaded extensions list, powerline footer, dark theme
**Filename suggestion**: `pi-extensions-loaded.png`
**Purpose**: Shows what a customized Pi setup looks like with all extensions loaded

## 4. /handoff Command Output
**Location**: Section "My rig: the extensions" > "Handoff" subsection
**Description**: Screenshot of `/handoff` command output showing:
   - Extracted files from current session
   - Key decisions made
   - Open questions
   - Command that will launch new session
**Filename suggestion**: `pi-handoff-output.png`
**Purpose**: Demonstrates the handoff feature for context preservation

## 5. Whimsical Extension
**Location**: Section "My rig: the extensions" > "Whimsical" subsection
**Description**: Screenshot showing a Bollywood loading message from the whimsical extension
**Filename suggestion**: `pi-whimsical-bollywood.png`
**Purpose**: Shows the personality customization aspect

## How to Add Screenshots

1. Take the screenshots while using Pi
2. Save them to: `/home/jshah/Github/jayshah5696.github.io/assets/images/pi-coding-agent/`
3. Update the blog post by replacing the TODO comments with:

```markdown
<div class="center">
<img src="../assets/images/pi-coding-agent/FILENAME.png" alt="DESCRIPTION" width="700" style="margin: 20px auto;"/>
<figcaption>Caption text here</figcaption>
</div>
```

## Current Status
- ✅ All meme images added (4 total)
- ⏳ Screenshots marked with TODO comments in blog post
- ⏳ Need to capture 5 screenshots during Pi usage

## Notes
- Use dark theme for consistency
- Ensure terminal text is readable (good contrast)
- Consider sanitizing any sensitive information (API keys, file paths, etc.)
- Recommended width: 700-800px for terminal screenshots
