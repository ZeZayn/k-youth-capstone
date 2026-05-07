# LogiMas Sdn Bhd — Website

**Delivering Trust. Powering Malaysia's Supply Chain.**

A complete, fully-animated, deployment-ready business website for LogiMas Sdn Bhd — a Malaysian logistics and warehousing company based in Klang Valley.

---

## File Structure

```
logimas/
├── index.html       — Home page
├── services.html    — Services page (4 services + pricing)
├── about.html       — About page (story, timeline, team, warehouses)
├── contact.html     — Contact page (form, contacts table)
├── style.css        — All styles and animations
├── script.js        — All JavaScript (navbar, particles, count-up, AOS, HELPA chatbot, form)
└── README.md        — This file
```

---

## Features

- **4 fully-designed pages** — Home, Services, About, Contact
- **HELPA AI Chatbot Widget** — Rule-based operations assistant (bilingual EN/BM)
- **Animated hero** — Floating particles canvas, fade-in headlines
- **Count-up stats** — Animated number counters on scroll
- **AOS scroll animations** — Staggered fade-up, zoom-in, flip-left effects
- **Sticky navbar** — Transparent on hero, solid navy on scroll
- **Mobile responsive** — Hamburger menu, stacked layouts on small screens
- **Enquiry form** — With success message on submission
- **No build tools required** — Open `index.html` directly in any browser

---

## Quick Start (Local)

1. Download or clone all files into a single folder.
2. Open `index.html` in any modern browser.
3. All pages, styles, and scripts work without a server.

> **Note:** CDN resources (Google Fonts, Font Awesome, AOS.js) require an internet connection. For offline use, download these libraries locally.

---

## Deployment Guide

### Option 1 — GitHub Pages (Free)

1. Create a free account at [github.com](https://github.com).
2. Create a new repository (e.g. `logimas-website`).
3. Upload all files (`index.html`, `services.html`, `about.html`, `contact.html`, `style.css`, `script.js`) to the repository root.
4. Go to **Settings → Pages**.
5. Under **Source**, select `main` branch and `/ (root)` folder.
6. Click **Save**.
7. Your site will be live at `https://yourusername.github.io/logimas-website/` within a few minutes.

---

### Option 2 — Netlify (Free)

1. Create a free account at [netlify.com](https://netlify.com).
2. From the Netlify dashboard, click **"Add new site" → "Deploy manually"**.
3. Drag and drop the entire `logimas/` folder onto the upload area.
4. Netlify will instantly deploy the site and provide a URL (e.g. `https://random-name.netlify.app`).
5. To use a custom domain, go to **Site settings → Domain management** and add your domain.

**Alternative (Git-based):**
1. Push your files to a GitHub repository.
2. In Netlify, click **"Add new site" → "Import an existing project"**.
3. Connect your GitHub account and select the repository.
4. Set **Publish directory** to `/` (root).
5. Click **Deploy site**.

---

### Option 3 — Vercel (Free)

1. Create a free account at [vercel.com](https://vercel.com).
2. Install the Vercel CLI: `npm install -g vercel`
3. In your terminal, navigate to the project folder:
   ```bash
   cd /path/to/logimas
   vercel
   ```
4. Follow the prompts — select "No framework" when asked.
5. Your site will be deployed and a URL provided instantly.

**Alternative (Dashboard):**
1. Push files to a GitHub repository.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Leave all settings as default and click **Deploy**.

---

## HELPA Chatbot — Supported Keywords

| Trigger Keywords | Topic |
|---|---|
| `damaged`, `rosak`, `barang rosak` | Damaged Parcel SOP |
| `missing`, `hilang`, `parcel hilang` | Missing Parcel SOP |
| `stock`, `discrepancy`, `stok`, `perbezaan` | Stock Discrepancy SOP |
| `overtime`, `OT`, `lebih masa` | Overtime Request |
| `emergency`, `contact`, `nombor`, `kecemasan` | Emergency Contacts |
| `late`, `delay`, `lambat`, `shipment` | Late Shipment SOP |
| `leave`, `cuti`, `mc`, `annual` | Leave Application |
| `salary`, `gaji`, `termination`, `fire`, `bonus` | HR Referral |

---

## Brand Colours

| Name | Hex |
|---|---|
| Deep Navy (Primary) | `#0D1B3E` |
| Gold (Accent) | `#F5A623` |
| White (Background) | `#FFFFFF` |
| Light Grey (Surface) | `#F5F7FA` |
| Dark Grey (Text) | `#495057` |
| Red (Alert) | `#D0021B` |

---

## Contact

📞 03-7832 4400  
📧 info@logimas.com.my  
📍 Jalan Kapar, Klang, 41400 Selangor, Malaysia

© 2024 LogiMas Sdn Bhd. SSM No. 200901012345
