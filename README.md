# 🪔 Traditional South Indian Telugu Gruhapravesam Invitation Website

A luxury, photorealistic, fully responsive **Gruhapravesam (Housewarming Ceremony)** digital invitation web application inspired by authentic South Indian Andhra & Telangana cultural traditions.

---

## 🌟 Master Finalization Highlights

1. **Centralized Family Configuration (`src/config/gruhapravesamConfig.js`)**:
   - Single point of customization for all family details, event timings, venue location, contacts, and feature toggles.
   - Fully decoupled with editable placeholders.

2. **Dedicated Modular Translation Files**:
   - English Translations: `src/config/translations/en.js`
   - Telugu Translations: `src/config/translations/te.js`
   - Dynamically bound with instant language switching (Telugu, English, Bilingual).

3. **Complete 15-Section Cultural Experience**:
   - 1. Opening traditional house entrance with 3D carved teakwood double door.
   - 2. Interactive "తలుపులు తెరవండి | Open Invitation" animation with temple bell chime.
   - 3. Authentic Sanskrit slokas & bilingual Telugu/English invitation wording.
   - 4. Structured family hierarchy honoring hosts, grandparents, elders, and children.
   - 5. Auspicious Muhurtham date and ceremony details.
   - 6. Live countdown timer to sacred Sumuhurtham.
   - 7. Family photo gallery with Album and Masonry presentation modes.
   - 8. Guest RSVP system with validation and clear Supabase setup warnings.
   - 9. WhatsApp sharing with professional greeting message.
   - 10. Printable Telugu invitation PDF (A4 & A5 formats).
   - 11. Printable English invitation PDF (A4 & A5 formats).
   - 12. Venue and Google Maps GPS navigation with directions integration.
   - 13. Guest parking information (two-wheeler, four-wheeler, valet assistance).
   - 14. Family contact cards with direct Call Now & WhatsApp links.
   - 15. Traditional closing devotional sloka (`|| సర్వే జనాః సుఖినో భవంతు ||`).

4. **Security & Privacy Hardening**:
   - Zero hardcoded private credentials in source code.
   - Sanitized user inputs against XSS and HTML injection.
   - Guest phone numbers masked and protected from public view.
   - Rate limiting on RSVP form submissions.
   - Supabase Row Level Security (RLS) policies.
   - Admin Passcode Protection (`#/admin/rsvps`, Passcode: `Gruham2026`).

5. **Performance & Optimization**:
   - Code-splitting with `React.lazy` and `Suspense` for heavy components (PDF generator, gallery, admin dashboard).
   - Initial JS bundle optimized to **~162 kB** (43 kB gzipped).
   - Page Visibility API pauses animations when tab is inactive.

---

## ⚙️ Centralized Family Configuration Guide

All ceremony and family information is managed exclusively in:
👉 `src/config/gruhapravesamConfig.js`

```javascript
export const gruhapravesamConfig = {
  family: {
    surname: "[FAMILY SURNAME]",
    hostNames: ["[HOST NAME 1]", "[HOST NAME 2]"],
    familyMembers: ["[FAMILY MEMBER 1]", "[FAMILY MEMBER 2]"],
    invitationBy: "[FAMILY NAME]"
  },

  event: {
    date: "[YYYY-MM-DD]",
    day: "[DAY]",
    muhurtham: "[TIME]",
    ganapathiPooja: "[TIME]",
    vastuPooja: "[TIME]",
    satyanarayanaVratham: "[TIME]",
    lunch: "[TIME]"
  },

  venue: {
    name: "[FAMILY NAME RESIDENCE]",
    address: "[COMPLETE ADDRESS]",
    landmark: "[LANDMARK]",
    city: "[CITY]",
    state: "Telangana",
    pincode: "[PINCODE]",
    googleMapsUrl: "[GOOGLE MAPS URL]"
  },

  contact: {
    primaryName: "[CONTACT NAME]",
    primaryPhone: "[PHONE NUMBER]",
    whatsappNumber: "[WHATSAPP NUMBER]"
  },

  settings: {
    defaultLanguage: "te",       // "te" | "en"
    enableMusic: true,           // Toggle background Carnatic audio
    enableRSVP: true,            // Toggle RSVP & Blessings section
    enableCountdown: true,       // Toggle Muhurtham countdown timer
    enableGallery: true,         // Toggle photo memories gallery
    enablePDFDownload: true      // Toggle printable PDF card section
  }
};
```

---

## 📋 List of Placeholders to Customize Before Launch

| Section | Placeholder Field | Description |
| :--- | :--- | :--- |
| **Family** | `family.surname` | Family surname (e.g., `Sharma`, `Rao`, `Reddy`) |
| **Family** | `family.hostNames` | Primary ceremony hosts (e.g., `["Smt. Lakshmi", "Sri Venkata Ramana"]`) |
| **Family** | `family.familyMembers`| Children and family members |
| **Family** | `family.invitationBy` | Family name for invitation card signoff |
| **Event** | `event.date` | Ceremony date in ISO format `YYYY-MM-DD` |
| **Event** | `event.day` | Day of week (e.g., `Saturday`) |
| **Event** | `event.muhurtham` | Auspicious Gruhapravesam entry time (e.g., `05:42 AM`) |
| **Event** | `event.ganapathiPooja`| Time for Ganapathi & Dwara Pooja (e.g., `05:15 AM`) |
| **Event** | `event.vastuPooja` | Time for Vastu Pooja & Milk Boiling (e.g., `06:30 AM`) |
| **Event** | `event.satyanarayanaVratham` | Time for Satyanarayana Swamy Vratham (e.g., `09:30 AM`) |
| **Event** | `event.lunch` | Time for Festive Lunch Feast (e.g., `12:30 PM`) |
| **Venue** | `venue.name` | House name (e.g., `Sri Venkateswara Nilayam`) |
| **Venue** | `venue.address` | Street address or plot number |
| **Venue** | `venue.landmark` | Prominent nearby landmark |
| **Venue** | `venue.city` | City (e.g., `Hyderabad`) |
| **Venue** | `venue.pincode` | Postal PIN code |
| **Venue** | `venue.googleMapsUrl` | Live Google Maps link for GPS directions |
| **Contact**| `contact.primaryName` | Contact person's name |
| **Contact**| `contact.primaryPhone`| Calling phone number |
| **Contact**| `contact.whatsappNumber` | WhatsApp phone number (with country code, digits only) |

---

## 📲 Social Sharing Message (WhatsApp & SMS)

Standardized invitation message ready for sharing:

```text
With immense happiness, we invite you and your family to celebrate the auspicious occasion of our Gruhapravesam.

Please join us and bless our new home.

We look forward to welcoming you!

Invitation: [WEBSITE URL]
```

---

## 🛠️ Deployment Instructions

### 1. Build the Production Bundle
```bash
npm run build
```
The output directory will be `dist/` containing all pre-bundled assets, images, and HTML.

### 2. Deployment on Vercel
```bash
npx vercel --prod
```
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### 3. Deployment on Netlify
- Build Command: `npm run build`
- Publish Directory: `dist`
- Security headers are automatically applied via the bundled `dist/_headers`.

### 4. Deployment on Cloudflare Pages or GitHub Pages
- Select `dist` as the build output directory.

### 5. Supabase Configuration (Optional for Cloud RSVP Sync)
To enable multi-device live RSVP database syncing, add these variables in your deployment environment:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_ADMIN_PASSCODE=Gruham2026
```
Execute the SQL schema in `supabase/schema.sql` inside the Supabase SQL editor to create the table, views, and RLS policies.
*(If not configured, the website seamlessly operates in local storage mode with clear setup notices.)*

---

## 🚀 Website Launch Checklist

- [ ] **Family Details**: Replace placeholders in `src/config/gruhapravesamConfig.js`.
- [ ] **Ceremony Timings**: Verify Muhurtham, Pooja, and Lunch timings with family priest.
- [ ] **Google Maps Link**: Update `venue.googleMapsUrl` with exact GPS pin.
- [ ] **Contact Numbers**: Confirm phone numbers for Call Now and WhatsApp buttons.
- [ ] **Family Photos**: Add personal photos to `src/config/galleryConfig.js` (optional).
- [ ] **Supabase Setup**: Connect Supabase credentials in `.env` if cloud RSVP syncing is desired.
- [ ] **Test Admin Portal**: Log into `#/admin/rsvps` using passcode `Gruham2026`.
- [ ] **Verify PDF Download**: Download Telugu and English A4/A5 PDFs from `#digital-invitation`.
- [ ] **Deploy to Production**: Deploy `dist/` to your chosen hosting provider.
