# Cinematic Video Editor Portfolio — Premium Edition

A responsive plain HTML/CSS/JavaScript portfolio designed for GitHub + Vercel. No build step or framework required.

## What's upgraded
- Cinematic dark styling with lime accents and subtle ambient lighting
- Sticky glass navigation, animated scroll reveal, and top reading-progress line
- Mouse-follow glow and subtle pointer highlight on project cards
- Video gallery filters: all work, vertical 9:16, and wide 16:9
- 10 video slots: 7 portrait and 3 landscape
- Responsive layout, mobile menu, reduced-motion accessibility support
- Existing Vercel Analytics snippet is preserved if already added to `index.html`

## Update your name and contact details
In `index.html`, search for and replace:
- `YOUR NAME` with your portfolio/creator name
- `YOUR_EMAIL@example.com` with your contact email
- Instagram, YouTube and LinkedIn URLs with your actual profile links

## Add your videos
1. Put your MP4 files inside the `videos/` folder.
2. Open `script.js` and find `const portfolioVideos = [`.
3. For each slot, update `title`, `category`, `description`, and `src`.
4. Example: `src: "videos/my-reel.mp4"`.
5. Keep the first seven entries as `orientation: "portrait"` and the last three as `orientation: "landscape"` if you want the original 7 + 3 layout.

## Publish the update to your existing Vercel website
**Important:** Keep a backup of your current files first.

1. Open your existing GitHub repository.
2. Replace the contents of `index.html`, `style.css`, and `script.js` with the files in this folder. Keep the paths in the same directory as your current `index.html`.
3. Keep the `videos/` folder and any MP4s you already uploaded. Do not delete your actual videos.
4. Commit the changes to the same branch connected to Vercel.
5. Wait for the latest Vercel deployment to show **Ready**, then refresh the live website.

If your repo has these files directly in its root, upload them directly to the root. If they live inside `creator-portfolio/`, update them inside that folder. Do not create an extra nested `creator-portfolio/creator-portfolio/` folder.

## Analytics
If Vercel Web Analytics was enabled and the tracking snippet is already in `index.html`, preserve it when updating. Check that your snippet remains inside the `<head>` section after replacing the file.
