# PROJECT HANDOVER DOCUMENTATION
## Traditional South Indian Telugu Gruhapravesam Digital Invitation
**Project Name:** Bonam Family Gruhapravesam Ceremony Website  
**Hosts:** Sri B. Ramanjaneyulu & Smt. B. Lakshmi Kumari  
**Ceremony Date:** Thursday, 26th November 2026 | **Muhurtham:** 08:00 PM IST  
**Venue:** Mangalaguntapalem, Rusthumbada, Narsapuram, West Godavari District, Andhra Pradesh  
**Repository:** [github.com/sureshrocknsp/Housewarming-invitation](https://github.com/sureshrocknsp/Housewarming-invitation.git)  
**Target Hosting:** Vercel (Edge Network)  

---

## 1. Executive Summary & Design System

This website is a custom-engineered digital Gruhapravesam invitation built to honor traditional South Indian Telugu cultural customs while delivering mobile-first performance, offline resilience, and enterprise security.

### Visual Identity & Theme
* **Palette:**
  * Royal Temple Maroon: `#641E16` (Primary brand color)
  * Deep Maroon: `#4A1510` (Accents and borders)
  * Golden Turmeric: `#D6A437` & `#F5B014` (Traditional gold highlights)
  * Antique Parchment Cream: `#FFF8E8` & `#FAF3E0` (Background parchment texture)
  * Leaf Green: `#2E6930` (Auspicious mango & banana foliage)
* **Typography:**
  * **Telugu Headings & Slokas:** `Noto Serif Telugu` (Authentic traditional serif)
  * **English Headings & Badges:** `Cinzel` (Classical engraved serif)
  * **Body Prose:** `Poppins` & `Cormorant Garamond` (Crisp readability)
* **Cultural Motifs:**
  * Authentic carved South Indian teakwood entrance doors
  * Hand-drawn Rice Flour Muggu (Kolam) with red chemman boundary
  * Banana Tree (Arati Chettu) motifs and fresh mango leaf thoranam
  * Brass Kuthu Vilakku (Deepam) with gentle glowing animation
  * Natural falling marigold and rose petals

---

## 2. Technology Stack

* **Frontend Framework:** React 18.3.1 (Functional components with React Hooks)
* **Build Tool & Bundler:** Vite v5.4.21 (ESM native, sub-second HMR)
* **Styling Engine:** Tailwind CSS v3.4.17 with custom South Indian theme extensions
* **Typography & Icons:** Lucide React (feather-weight SVG icons)
* **Audio Synthesis:** Web Audio API (`audioEngine.js` generating authentic Tanpura drone & Ghanta bell frequencies with zero CORS/network dependency)
* **Database & Auth:** Supabase REST & Supabase Auth with Row Level Security (RLS)
* **Offline/Storage Engine:** Dual-mode resilient persistent storage with automatic memory fallback

---

## 3. Project Architecture & File Structure

```text
housewarming-invitation/
├── public/
│   ├── images/                     # Production photography & background assets
│   │   ├── family-portrait.jpg     # Bonam family formal portrait
│   │   ├── carved-teak-door.jpg    # Authentic 3D wooden entrance door
│   │   ├── pooja-mandir.jpg        # Sacred home pooja mandir
│   │   ├── home-interior.jpg       # Pristine home living space
│   │   ├── construction-bhoomi-pooja.jpg # Foundation stone ceremony
│   │   ├── milk-boiling.jpg        # Traditional Paalu Pongadam ritual
│   │   ├── traditional-muggu.jpg   # Gadapa entrance rice flour muggu
│   │   ├── banana-mango-decor.jpg  # Auspicious mango and marigold thoranam
│   │   ├── brass-deepam.jpg        # Sacred brass oil lamp
│   │   └── pooja-kalasham.jpg      # Sacred coconut and brass kalasham
├── src/
│   ├── components/
│   │   ├── hero/
│   │   │   └── OpeningExperience.jsx # 3D opening plaque & carved teak entrance
│   │   ├── invitation/
│   │   │   └── MainInvitation.jsx    # Primary bilingual invitation card
│   │   ├── family/
│   │   │   └── FamilyDetails.jsx     # Host family lineage & introductions
│   │   ├── gallery/
│   │   │   ├── FamilyGallerySection.jsx # Curated photo gallery with category filter
│   │   │   └── ImageLightbox.jsx     # Touch-friendly full-screen lightbox
│   │   ├── events/
│   │   │   ├── EventSchedule.jsx     # Sumuhurtham & ritual timeline
│   │   │   └── RitualsGuide.jsx      # Significance of Paalu Pongadam
│   │   ├── venue/
│   │   │   └── VenueLocation.jsx     # Google Maps navigation & direct host call
│   │   ├── blessings/
│   │   │   └── BlessingsSection.jsx  # Well-wisher blessings & admin moderation
│   │   ├── layout/
│   │   │   ├── Navbar.jsx            # Bilingual sticky navigation bar
│   │   │   ├── Footer.jsx            # Auspicious closing blessings
│   │   │   ├── FallingPetals.jsx     # Lightweight drifting marigold petals
│   │   │   └── AudioPlayer.jsx       # Carnatic ambient Tanpura drone player
│   │   ├── ui/
│   │   │   ├── ErrorBoundary.jsx     # Traditional Telugu error recovery boundary
│   │   │   └── SectionHeader.jsx     # Standardized decorative header
│   │   ├── CountdownTimer.jsx        # IST-anchored live Muhurtham countdown
│   │   ├── TraditionalMotifs.jsx     # Vector SVGs (Deepam, Thoranam, Banana Tree)
│   │   └── TraditionalShowcase.jsx   # Cultural photo showcase
│   ├── config/
│   │   ├── gruhapravesamConfig.js    # MASTER SINGLE SOURCE OF TRUTH (Names, Dates, Venue)
│   │   ├── galleryConfig.js          # Photo gallery registry & captions
│   │   └── translations/
│   │       ├── te.js                 # Pure Telugu cultural translations
│   │       └── en.js                 # Polished English translations
│   ├── context/
│   │   └── LanguageContext.jsx       # State management for TE / EN switching
│   ├── services/
│   │   ├── blessingsService.js       # Supabase REST, Auth & resilient storage
│   │   └── rsvpService.js            # Guest confirmation service
│   ├── utils/
│   │   └── audioEngine.js            # Classical Web Audio synthesis engine
│   ├── App.jsx                       # Root application orchestration
│   ├── main.jsx                      # DOM mount point
│   └── index.css                     # Custom animations and gold foil gradients
├── supabase/
│   └── schema.sql                    # Production Postgres table, indexes, and RLS policies
├── vercel.json                       # Vercel SPA routing and caching rules
├── package.json                      # Project dependencies and npm scripts
└── README.md                         # Project documentation
```

---

## 4. Hosting & Deployment Instructions

### Vercel Deployment (Production Target)
The project includes a pre-configured `vercel.json` file. To deploy:

1. **Option 1: Deploy through Vercel Web Dashboard (Recommended)**
   * Log into [vercel.com](https://vercel.com).
   * Click **Add New...** -> **Project**.
   * Import the GitHub repository: `sureshrocknsp/Housewarming-invitation`.
   * Keep default settings:
     * **Framework Preset:** Vite
     * **Build Command:** `npm run build`
     * **Output Directory:** `dist`
   * Click **Deploy**.

2. **Option 2: Deploy through Vercel CLI**
   In your terminal, run:
   ```bash
   npx vercel login
   npx vercel --prod
   ```

### Custom Domain Configuration
To attach a custom domain (e.g. `bonamfamily.in`):
1. In Vercel Project Settings, navigate to **Domains**.
2. Add your custom domain.
3. Configure your registrar's DNS records:
   * **Root Domain (`@`):** `A` record pointing to `76.76.21.21`
   * **Subdomain (`www` or `invitation`):** `CNAME` record pointing to `cname.vercel-dns.com`
4. SSL/TLS certificates will automatically be provisioned by Let's Encrypt within 5 minutes.

---

## 5. Supabase Database & Security Configuration

### Database Schema
The database runs on Supabase (PostgreSQL). The full schema is stored in [`supabase/schema.sql`](supabase/schema.sql).

To create the production table:
1. Open the [Supabase Dashboard](https://app.supabase.com) for your project.
2. Go to the **SQL Editor**.
3. Paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql).

### Row Level Security (RLS) Rules
* **Public Guests:**
  * Can **SELECT** only rows where `approval_status = 'approved'`.
  * Can **INSERT** new blessings; the database automatically forces `approval_status = 'pending'`.
* **Authenticated Administrators:**
  * Can **SELECT**, **UPDATE**, and **DELETE** all rows using their authenticated Supabase Auth session token (`auth.role() = 'authenticated'`).

### Connecting Environment Variables
In your Vercel Project Settings (under **Environment Variables**) or local `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-public-anon-key-here
VITE_ADMIN_PASSCODE=Gruham2026
```
> **Security Mandate:** Never add `SUPABASE_SERVICE_ROLE_KEY` to frontend environment variables. The client application only ever needs the public anonymous key (`VITE_SUPABASE_ANON_KEY`).

---

## 6. Administrator Authentication & Moderation Procedure

The Bonam family can moderate guest blessings directly from the live website without exposing passwords or PINs to public visitors.

1. **Accessing the Portal:**
   * Scroll to the **Blessings from Well-Wishers** section on the website.
   * Click the subtle **Family Moderation** link at the bottom of the section.
2. **Authenticating:**
   * Enter the registered family administrator email (e.g., `ramanji.bonam@gmail.com`).
   * Enter the administrator password.
   * Click **Sign In as Administrator**.
3. **Moderating Blessings:**
   * **Pending Blessings:** Review the message text and guest name.
   * **Approve:** Click the green **Approve** button. The blessing is instantly published to the public guest wall.
   * **Reject:** Click the amber **Reject** button. The blessing is hidden from public view.
   * **Delete:** Click the trash icon to permanently remove inappropriate submissions.
4. **Signing Out:**
   * Click the **Sign Out** button in the modal header to clear the authenticated session.

---

## 7. Content Editing Guide

All family names, dates, muhurtham timings, venue addresses, and slokas are stored in a single centralized configuration file:  
[`src/config/gruhapravesamConfig.js`](src/config/gruhapravesamConfig.js)

### Changing Host Names or Family Lineage
Open [`src/config/gruhapravesamConfig.js`](src/config/gruhapravesamConfig.js) and update the `familyConfig` object:
```javascript
const familyConfig = {
  surname: "Bonam Family",
  surnameTelugu: "బోనం",
  hostNames: ["Sri B. Ramanjaneyulu", "Smt. B. Lakshmi Kumari"],
  hostNamesTelugu: ["శ్రీ బి. రామాంజనేయులు", "శ్రీమతి బి. లక్ష్మీ కుమారి"],
  // ...
};
```

### Changing Event Date or Muhurtham Time
Update the `eventConfig` object:
```javascript
const eventConfig = {
  date: "2026-11-26",
  dateFormatted: "Thursday, 26th November 2026",
  teluguDate: "శ్రీ విశ్వావసు నామ సంవత్సరం • కార్తీక బహుళ తదియ • గురువారం",
  muhurthamTime: "08:00 PM",
  muhurthamTelugu: "రాత్రి గం. 08:00 ని.లకు",
  // ...
};
```

### Changing Venue Coordinates or Phone Number
Update the `venueConfig` object:
```javascript
const venueConfig = {
  coordinates: {
    lat: 16.446154,
    lng: 81.655852
  },
  mapUrl: "https://maps.google.com/?q=16.446154,81.655852",
  phone: "+91 6300599958"
};
```

---

## 8. Image & Asset Replacement Guide

All images are located in the [`public/images/`](public/images/) directory.

### Image Specifications
| Image Name | Description | Recommended Dimensions | Format |
| :--- | :--- | :--- | :--- |
| `family-portrait.jpg` | Formal family portrait | 1200 x 800 px (3:2) | JPG (compressed < 300KB) |
| `carved-teak-door.jpg` | Teak entrance doors | 1200 x 900 px (4:3) | JPG |
| `pooja-mandir.jpg` | Sacred pooja room | 1200 x 900 px | JPG |
| `home-interior.jpg` | Living room interior | 1200 x 900 px | JPG |
| `construction-bhoomi-pooja.jpg` | Bhoomi pooja ceremony | 1200 x 900 px | JPG |
| `milk-boiling.jpg` | Paalu Pongadam stove | 1200 x 900 px | JPG |
| `traditional-muggu.jpg` | Rice flour muggu pattern | 1200 x 400 px | JPG |
| `brass-deepam.jpg` | Traditional brass lamp | 800 x 1200 px (2:3) | JPG |
| `pooja-kalasham.jpg` | Coconut & brass kalasham | 800 x 1200 px (2:3) | JPG |

To replace an image, save your new photo with the exact same filename into `public/images/` and rebuild with `npm run build`.

---

## 9. Troubleshooting & Common Scenarios

### 1. Browser shows "క్షమించండి, పేజీని లోడ్ చేయడంలో చిన్న అంతరాయం ఏర్పడింది"
* **Cause:** The custom Error Boundary caught a runtime issue (e.g. an updated Vite chunk failed to load due to aggressive browser caching, or storage was blocked).
* **Resolution:**
  1. Click **Reload Invitation (పేజీని రీలోడ్ చేయండి)**.
  2. The application includes `lazyWithRetry`, which automatically bypasses stale cache chunks on reload.
  3. Expand **Technical Diagnostics** at the bottom of the error card to inspect the exact stack trace if needed.

### 2. Audio does not play automatically
* **Explanation:** Modern mobile browsers (iOS Safari and Android Chrome) intentionally block autoplay of audio until the user interacts with the page (taps a button).
* **Resolution:** Audio begins playing when the guest taps the **Open Traditional Invitation Plaque** button or taps the speaker icon in the bottom-right corner.

### 3. Countdown timer displays zero or incorrect hours
* **Verification:** The countdown strictly targets `2026-11-26T20:00:00+05:30` (Indian Standard Time).
* **Resolution:** Check that the client device's clock is set to automatic time synchronization. Regardless of whether a guest opens the link in the US, Europe, or India, it calculates the remaining time relative to the exact moment in Narsapuram.

---

## 10. Backup & Disaster Recovery Procedures

1. **Source Code & Git History:**
   * Hosted on GitHub: `sureshrocknsp/Housewarming-invitation` on branch `main`.
   * To clone a fresh working copy:
     ```bash
     git clone https://github.com/sureshrocknsp/Housewarming-invitation.git
     cd Housewarming-invitation
     npm install
     npm run build
     ```
2. **Database Backup:**
   * Supabase automatically creates daily snapshots of the database.
   * To take a manual backup: open Supabase Dashboard -> **Database** -> **Backups** -> **Download Backup**, or use `pg_dump`:
     ```bash
     pg_dump -h db.<project-id>.supabase.co -U postgres -d postgres > backup.sql
     ```
3. **Rollback Strategy:**
   * If a bad deployment occurs on Vercel, navigate to **Deployments** in the Vercel Dashboard, find the previous stable deployment, and click **Rollback**. Instant rollback takes effect in under 5 seconds without rebuilding.
