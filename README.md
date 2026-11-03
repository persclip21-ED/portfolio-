# Ed Cyrelle Lendio portfolio

A static portfolio built with HTML, CSS, and vanilla JavaScript. The Vercel entry point is `index.html`; styles, scripts, and the profile photo are served from `assets/`.

## Deploy to Vercel

Import this repository in Vercel and keep the project root set to this directory. Choose the **Other** framework preset, leave the build command and output directory empty, and deploy. Vercel serves the root `index.html` directly; no dependencies or build step are needed.

The `.vercelignore` file keeps the preserved PHP files and the old `portfolio-` scaffold out of the public deployment. The live static page uses email, phone, GitHub, and Facebook links for contact, so it requires no mail server or secrets.

## Preview locally

Open `index.html` directly in a browser, or serve this folder with Python:

```powershell
py -m http.server 8000
```

Then visit <http://localhost:8000/>.

## Update portfolio content

- Edit skills, education, services, contact details, and social profile URLs in `assets/js/portfolio.js`.
- Add project entries to the `projects` array in `assets/js/portfolio.js` when ready.
- Replace `assets/image.png` to update the profile photo used in the hero, header, and footer.
- The site uses Google Fonts and Simple Icons from their CDNs; those assets require an internet connection.

## Archived originals

The original server-side files are preserved outside this project in `C:\xampp\htdocs\PORTFOLIO-legacy-php-backup`. The portfolio itself contains only static site files and has no PHP runtime or server-side contact form.
