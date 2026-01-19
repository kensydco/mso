# Kensyd Companies Website

A modern, professional holding company website showcasing the portfolio of operating companies under Kensyd Companies management.

## 🚀 Features

- **Modern Design**: Bold typography, scroll-triggered animations, and Reyes Holdings-inspired aesthetic
- **8 Brand Portfolio**: Individual themed pages for 6 active brands and 2 coming soon
- **Dynamic Theming**: Each brand page adopts its unique color scheme
- **GoHighLevel Integration**: Blog/news feed and contact form webhooks
- **Google Analytics 4**: Comprehensive tracking and analytics
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Performance Optimized**: Built with Next.js 14+ for optimal performance
- **Cloudflare Pages Ready**: Configured for static export deployment

## 📁 Project Structure

```
kensyd-companies/
├── app/                        # Next.js App Router pages
│   ├── about/                  # About page
│   ├── portfolio/              # Portfolio pages
│   │   ├── [slug]/            # Dynamic brand pages
│   │   └── page.tsx           # Portfolio grid with filtering
│   ├── news/                   # News listing (GHL integration)
│   ├── careers/                # Careers page
│   ├── contact/                # Contact page with form
│   ├── api/                    # API routes
│   │   └── contact/           # Contact form webhook
│   ├── layout.tsx              # Root layout (header, footer)
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles and design system
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── layout/                 # Layout components
│   └── sections/               # Home page sections
├── lib/
│   ├── ghl.ts                  # GoHighLevel API client
│   ├── analytics.ts            # Google Analytics helpers
│   └── utils.ts                # Utility functions
├── data/
│   └── brands.ts               # Brand data and configuration
└── public/
    ├── logos/                  # Brand logos
    └── images/                 # Static images
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: CSS Animations
- **CMS/Blog**: GoHighLevel API
- **Analytics**: Google Analytics 4
- **Deployment**: Cloudflare Pages (static export)

## 📦 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd mso
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# GoHighLevel API Configuration
GHL_API_KEY=your_ghl_api_key_here
GHL_WEBHOOK_URL=your_ghl_webhook_url_here

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://kensydcompanies.com
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎨 Brand Configuration

Brands are configured in `data/brands.ts`. Each brand includes:

- Name, tagline, and description
- Category (fitness, healthcare, service, etc.)
- Status (active or coming-soon)
- Color scheme (primary, secondary, accent)
- Services/offerings
- Contact information
- Location data

### Adding a New Brand

Edit `data/brands.ts` and add a new brand object to the array.

## 🚢 Deployment

### Cloudflare Pages

1. **Build the site**

```bash
npm run build
```

2. **Configure Cloudflare Pages**

- Build command: `npm run build`
- Build output directory: `out`
- Root directory: `/`

3. **Set environment variables** in Cloudflare Pages dashboard

4. **Deploy**

Connect your GitHub repository to Cloudflare Pages for automatic deployments on push.

## 📊 Analytics Events

The following events are tracked with Google Analytics 4:

- Page Views (automatic)
- CTA Clicks
- Form Submissions
- Brand Page Views
- Outbound Clicks

## 🔗 GoHighLevel Integration

The news page fetches posts from the GHL API. Mock data is provided for development. Contact form submissions are sent to the GHL webhook.

## 📄 License

© 2026 Kensyd Companies, LLC. All rights reserved.

## 🤝 Support

For support or questions, contact info@kensydcompanies.com

---

**Built with ❤️ by Kensyd Companies**
# Kensyd Companies MSO Website

A corporate website for Kensyd Companies, a diversified holding company managing fitness, healthcare, service, and technology brands across the Mid-South region.

## Portfolio Brands

- **HOTWORX Collierville** - 24-Hour Infrared Fitness Studio
- **HOTWORX Ithaca** - 24-Hour Infrared Fitness Studio
- **Rolling Suds** - The Power Washing Professionals
- **Precision Wound Management** - Expert Wound Care Solutions
- **Master Fit Club** - Fitness Loves Company
- **OurHealth Rx** - Healthcare Made Accessible
- **CampusFam** - Connecting Campus Communities (Coming Soon)
- **Trezevant Alumni Network** - Connecting Generations of Excellence (Coming Soon)

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui components
- Wouter for routing
- Framer Motion for animations

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Deployment

This site is configured for deployment to Cloudflare Pages.

### Build Settings for Cloudflare Pages:
- **Build command:** `pnpm build`
- **Build output directory:** `dist/public`
- **Root directory:** `/`

## License

MIT
