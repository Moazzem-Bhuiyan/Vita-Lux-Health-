# Vita Lux Health — Spa & Wellness Platform

A luxury spa and wellness customer-facing website built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. Production-grade, fully modular, and ready for backend integration.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Navbar, Footer, Chatbot)
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # Custom 404 page
│   ├── booking/
│   │   └── page.tsx              # Multi-step booking flow
│   ├── services/
│   │   ├── page.tsx              # Services listing with category filter
│   │   └── [slug]/
│   │       └── page.tsx          # Service detail page
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx          # Blog detail page
│   └── contact/
│       └── page.tsx              # Contact form + locations + map
│
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx            # Primary / Secondary / Ghost / Gold-Outline
│   │   ├── Badge.tsx             # Category badges
│   │   ├── StarRating.tsx        # 5-star rating display
│   │   ├── SectionHeader.tsx     # Eyebrow + heading + divider
│   │   ├── Modal.tsx             # Accessible modal dialog
│   │   ├── Input.tsx             # Styled text input
│   │   ├── Textarea.tsx          # Styled textarea
│   │   └── index.ts              # Barrel export
│   └── shared/                   # Layout-level components
│       ├── Navbar.tsx            # Sticky nav with mobile drawer
│       ├── Footer.tsx            # Full footer with links + awards
│       └── Chatbot.tsx           # Floating chatbot UI
│
├── sections/                     # Page-specific sections
│   ├── home/
│   │   ├── Hero/                 # Full-screen hero with stats
│   │   ├── ServicesPreview/      # Featured services grid
│   │   ├── BookingWidget/        # Quick-book widget
│   │   ├── Testimonials/         # Guest reviews
│   │   ├── Promotions/           # Seasonal offers
│   │   └── SocialMedia/          # Instagram feed grid
│   ├── services/
│   │   ├── ServicesPageContent.tsx   # Category-filtered listing
│   │   └── ServiceDetailContent.tsx  # Full service detail
│   ├── blog/
│   │   ├── BlogListingContent.tsx    # Featured + category filter
│   │   └── BlogDetailContent.tsx     # Article with sidebar
│   ├── contact/
│   │   └── ContactPageContent.tsx    # Form + map + locations
│   └── booking/
│       ├── BookingPageContent.tsx    # Booking orchestrator
│       ├── StepIndicator.tsx         # Progress steps UI
│       ├── ServiceStep.tsx           # Step 1: Choose service
│       ├── DateTimeStep.tsx          # Step 2: Calendar + time slots
│       ├── TherapistStep.tsx         # Step 3: Choose therapist
│       ├── DetailsStep.tsx           # Step 4: Personal details
│       └── ConfirmationStep.tsx      # Step 5: Review + confirm
│
├── lib/
│   ├── utils.ts                  # cn(), formatCurrency(), formatDate(), etc.
│   └── data/
│       ├── services.ts           # 8 mock services with full details
│       ├── blog.ts               # 6 mock blog posts with authors
│       └── misc.ts               # Testimonials, therapists, locations, promos
│
├── types/
│   └── index.ts                  # All TypeScript interfaces
│
└── styles/
    └── globals.css               # Tailwind directives + Google Fonts + custom CSS
```

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `cream-50` | `#FDFBF7` | Page backgrounds |
| `cream-100` | `#FAF6EE` | Subtle sections |
| `cream-200` | `#F4EBD8` | Card backgrounds |
| `gold-500` | `#C9A96E` | Primary accent |
| `gold-600` | `#A07850` | Text on light |
| `stone-900` | `#1c1917` | Dark sections, text |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Headings | Cormorant Garamond | 300–400 |
| Display | Playfair Display | 400–600 |
| Body | DM Sans | 300–400 |
| Labels | DM Sans | 500 (tracked) |

### Component Variants
- **Button**: `primary` · `secondary` · `ghost` · `gold-outline`
- **Badge**: `gold` · `stone` · `sage` · `cream`
- **SectionHeader**: `align="center | left"` · `light` prop for dark backgrounds

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Services Preview, Booking Widget, Testimonials, Promotions, Social |
| `/services` | Filterable services listing by category |
| `/services/[slug]` | Full service detail with benefits, booking sidebar |
| `/blog` | Blog listing with featured post and category filter |
| `/blog/[slug]` | Full article with sidebar, tags, related posts |
| `/contact` | Contact form, branch locations, interactive map placeholder |
| `/booking` | 5-step booking flow (service → date/time → therapist → details → confirm) |

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Icons | Lucide React |
| Images | Next.js Image (Unsplash CDN) |
| Fonts | Google Fonts (Cormorant Garamond, DM Sans) |

---

## 🔌 Backend Integration Points

All data fetching is currently done from static mock files in `src/lib/data/`. When the backend is ready:

1. **Replace mock data imports** in sections with `fetch()` calls to your Laravel API
2. **Booking form** (`BookingPageContent.tsx`) → POST to `/api/bookings`
3. **Contact form** (`ContactPageContent.tsx`) → POST to `/api/contact`
4. **Service/blog data** → Replace static arrays with `generateStaticParams()` + async page components
5. **Auth** → Add NextAuth.js or similar for user accounts

---

## 📝 Notes

- All API calls, booking logic, and auth are intentionally excluded (frontend only)
- Images are sourced from Unsplash — replace with your own CDN/S3 in production
- Chatbot uses client-side mock responses — wire to your knowledgebase API later
- Map placeholder designed to accept Google Maps or Mapbox embed

---

*Built with care for Vita Lux Health. © 2026 All rights reserved.*
