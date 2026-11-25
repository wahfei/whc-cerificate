# Wealthy Healthy Club Certificate Studio

A Next.js certificate editor for the 10-Day Saya Mahu Kurus Challenge. The form and preview run in the browser. Entries are held in the current tab and clear on reload.

## Run locally

Unzip the project, open a terminal in the `wellness-certificate` folder, and use Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Print a certificate

1. Enter the recipient's details and check the live preview. The challenge metrics are prefilled with sample values from the reference. Replace them with the recipient's results.
2. Click **Print / Save PDF**.
3. Choose a printer or **Save as PDF**. Use A4 landscape, 100% scale, and the default margin setting. The layout leaves its own white space around the certificate. If your browser still shows the timestamp, page title, URL, or page number, turn off **Headers and footers** under **More settings**.

The certificate uses selectable text and includes an inset border for printing on ordinary A4 paper. The included logo is cropped from the supplied reference PNG. You can replace `public/club-logo.png` with a higher-resolution version of the logo with the same aspect ratio.

## Customize

- `app/certificate-editor.tsx` contains the form, default values, and certificate wording.
- `app/globals.css` contains the screen and print layouts.
- `npm run build` creates a static web export in `out/` that can be served over HTTP.
