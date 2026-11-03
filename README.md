# Ed Cyrelle Lendio portfolio

This is a dependency-free PHP and vanilla JavaScript portfolio for XAMPP. The site content is in `assets/js/portfolio.js`; update the skills, project entries and URLs, education, services, and social links there. The profile illustration uses initials so it does not imply a stock portrait is Ed.

## Run locally

1. Start Apache in the XAMPP Control Panel.
2. Visit <http://localhost/PORTFOLIO/>.

Alternatively, from this folder run `C:\xampp\php\php.exe -S localhost:8000` and visit <http://localhost:8000/>. Keep that terminal open while testing.

## Enable contact email

The form validates on the browser and server. It only reports success after PHP's configured mail transport accepts the message. Set `recipient` in `contact-config.php` to the inbox address, or set the `PORTFOLIO_CONTACT_EMAIL` environment variable. Configure the `mail` settings in `C:\xampp\php\php.ini` and restart Apache (or the PHP development server). If no recipient or mail transport is configured, the form displays a clear setup/delivery error; it never claims the message was sent.

## Personalize before publishing

- Replace the example project titles and descriptions in `assets/js/portfolio.js` with your own work and add its direct GitHub and live-demo URLs. Links are only shown when valid HTTP(S) URLs are supplied.
- Replace the GitHub and LinkedIn search URLs in `portfolio.socials` with your profile URLs.
- Update the course, school, and academic details in `portfolio.education`.
- The project cover photos are served by Unsplash; swap the URLs for your own optimized images if desired.