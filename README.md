# Accretion — SaaS Landing Page

A premium, fully responsive SaaS landing page rebuilt from [accretion.framer.ai](https://accretion.framer.ai), built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **TypeScript**.

## ✨ Features

- **Dark + Cream dual-theme** — alternating sections with smooth curved SVG dividers
- **Scroll-triggered animations** — fade-up, stagger, and parallax reveal effects
- **Animated counters** — metrics animate on scroll intersection
- **Bento grid showcase** — asymmetric feature cards with data visualizations
- **Glass-morphism navbar** — transparent → frosted glass on scroll
- **Premium typography** — Switzer + Inter font system
- **Interactive dashboard mockup** — realistic chart and stats preview
- **Masonry testimonials** — star ratings and gradient avatars
- **Accordion FAQ** — smooth expand/collapse with hover accents
- **Responsive design** — desktop, tablet, and mobile breakpoints
- **Orange accent system** — vibrant `#ff6207` with warm cream `#f8f6f1`

## 🏗️ Tech Stack

| Layer       | Technology                      |
|-------------|--------------------------------|
| Framework   | Next.js 15 (App Router)        |
| UI          | React 19 + TypeScript          |
| Styling     | Tailwind CSS 3.4               |
| Icons       | Lucide React                   |
| Fonts       | Switzer (FontShare) + Inter    |
| Animation   | CSS + IntersectionObserver     |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens, utilities, components
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage section composition
├── components/
│   ├── animated-counter.tsx # Scroll-triggered number animation
│   ├── bento-grid.tsx       # Asymmetric feature showcase
│   ├── cta.tsx              # Bottom call-to-action
│   ├── faq.tsx              # Accordion FAQ
│   ├── features.tsx         # 6-card feature grid
│   ├── footer.tsx           # Full footer with newsletter
│   ├── hero.tsx             # Hero with dashboard preview
│   ├── how-it-works.tsx     # 3-step process section
│   ├── integrations.tsx     # Integration logos grid
│   ├── logo-cloud.tsx       # Marquee trusted-by carousel
│   ├── metrics.tsx          # Animated performance stats
│   ├── navbar.tsx           # Glass-morphism sticky nav
│   ├── pricing.tsx          # 3-tier pricing cards
│   ├── scroll-reveal.tsx    # Reusable scroll animation
│   ├── section-divider.tsx  # Curved SVG transitions
│   └── testimonials.tsx     # Masonry quote grid
```

## 🎨 Design System

### Colors
- **Accent**: `#ff6207` (vibrant orange)
- **Background Dark**: `#0a0a0a`
- **Background Cream**: `#f8f6f1`
- **Text Primary**: `#171717`
- **Text Muted**: `#737373`

### Typography
- **Display**: Switzer (600-900 weight)
- **Body**: Inter (400-700 weight)

## 📄 License

Private project. All rights reserved.
