# Video Editor Portfolio

A responsive, one-page portfolio website built with plain HTML, CSS, and JavaScript. No build step or framework required; suitable for GitHub and Vercel static hosting.

## Before publishing

Search the project files and replace these placeholders:

- `YOUR NAME` — your display name / creator brand
- `YOUR_EMAIL@example.com` — your contact email
- Social links in the footer — your real profiles
- The three sample project cards — replace the visual concepts and descriptions with your own work
- Hero/about copy — adjust to your experience and services

The project cards are explicitly marked as concepts/placeholders. Do not present them as completed client work unless you replace them with real projects.

## Run locally

Open `index.html` in a browser. For a local development server, use VS Code's Live Server extension.

## Deploy to GitHub + Vercel

1. Create a GitHub repository, for example `my-portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Sign in to Vercel and choose **Add New → Project**.
4. Import the GitHub repository.
5. Framework preset: **Other**. Build command: leave blank. Output directory: `.` (or leave the default if Vercel detects static files).
6. Click **Deploy**.

Every push to the connected GitHub branch can trigger a redeployment.


## Add your own videos

1. Put `.mp4` files in the `videos/` folder.
2. Open `script.js` and find `const portfolioVideos = [`.
3. Add an item for each video, changing the title and filename:

```js
const portfolioVideos = [
  { title: "My Cinematic Edit", category: "CINEMATIC", src: "videos/cinematic-edit.mp4", description: "Color grade + sound design" },
  { title: "My Reel", category: "REELS", src: "videos/my-reel.mp4", description: "Short-form edit" }
];
```

4. Test `index.html`, then upload the updated files and videos to GitHub. Vercel redeploys from GitHub. Static websites cannot permanently publish a browser-only upload; commit the video files to the project. For large videos, use a YouTube embed instead.


## Add your videos (10 slots)

The gallery has **7 portrait slots (9:16)** and **3 landscape slots (16:9)**.

1. Put your MP4 files in the `videos` folder.
2. Open `script.js` and find `const portfolioVideos = [` near the bottom.
3. For each slot, set `src` to your filename, for example `src: "videos/my-reel.mp4"`.
4. Change `title`, `category`, and `description` to match the edit.
5. Keep the first seven items as `orientation: "portrait"` and the last three as `orientation: "landscape"` to preserve the layout.

Empty slots show a placeholder until you add a video.
