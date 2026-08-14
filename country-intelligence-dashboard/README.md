# Country Intelligence Dashboard

A fully frontend React + Tailwind dashboard for searching and comparing countries with instant demographic, geographic, economic, and cultural information.

## ✨ Features

- **🔍 Smart Search** — Search by name, capital, region, currency, or language
- **📊 Comprehensive Data** — Overview, geography, languages, currency, national symbols, and statistics
- **🔄 Country Comparison** — Compare two countries side-by-side across all key fields
- **❤️ Favorites** — Save and organize your favorite countries (localStorage persisted)
- **🌙 Dark Mode** — Toggle between light and dark themes
- **📱 Responsive Design** — Works seamlessly on mobile, tablet, and desktop
- **⚡ No Auth Required** — Uses free public REST Countries API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or npm

### Installation

```bash
cd country-intelligence-dashboard
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📋 Features in Detail

### Search
- Search countries by:
  - **Name** — Partial matching (e.g., "uni" finds "United States")
  - **Capital** — Find countries by capital city
  - **Region** — Filter by geographical region
  - **Currency** — Search by currency code
  - **Language** — Find countries by official language
- Autocomplete dropdown with instant results
- Clear button to reset search

### Overview Section
- Flag emoji
- Official name
- Capital city
- Population (formatted with commas)
- Area in km²
- Region and subregion
- Timezone count
- Quick link to Google Maps

### Geography Section
- Continent
- Landlocked/coastline status
- Bordering countries with count
- Geographic coordinates (latitude/longitude)
- OpenStreetMap link

### Languages & Currency
- Official languages with native names
- Currency with symbol and code
- Multiple languages/currencies displayed

### National Symbols
- High-resolution flag
- Coat of arms (if available)
- International calling code (+1, +44, etc.)
- Internet domain (.com, .uk, etc.)
- Driving side (left/right)
- Start of week

### Statistics Cards
- Population density (people per km²)
- Total area
- Number of bordering countries
- Number of time zones
- Number of official languages
- Gini index (income inequality, if available)

### Comparison View
- Select two countries to compare
- View same fields side-by-side
- Swap countries button
- Clear to start over

### Favorites
- Save/unsave countries with heart icon
- Stores locally in browser (persists across sessions)
- Dedicated favorites page
- Quick access to saved countries

### Dark Mode
- Toggle between light/dark themes
- System preference detection
- Theme preference saved

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Search.tsx
│   ├── CountryOverview.tsx
│   ├── CountryGeography.tsx
│   ├── LanguagesCurrency.tsx
│   ├── NationalSymbols.tsx
│   ├── Statistics.tsx
│   ├── CompareView.tsx
│   └── FavoritesView.tsx
├── api/                 # API integration
│   └── countries.ts     # REST Countries API calls
├── hooks/               # Custom React hooks
│   ├── useFavorites.ts  # Favorites management
│   └── useCountries.ts  # Country data fetching
├── types/               # TypeScript interfaces
│   └── index.ts         # Country data types
├── utils/               # Utility functions
│   └── formatters.ts    # Number/string formatting
├── App.tsx              # Main app component
├── App.css              # Global styles
└── main.tsx             # Entry point
```

## 🔌 API

Uses the free [REST Countries API](https://restcountries.com/v3.1/) with no authentication required.

### Main Endpoints Used
- `/all` — All countries
- `/name/{name}` — Search by country name
- `/capital/{capital}` — Search by capital
- `/region/{region}` — Filter by region
- `/currency/{currency}` — Search by currency
- `/lang/{language}` — Search by language
- `/alpha/{code}` — Get country by ISO code

API responses are cached in memory to avoid duplicate requests.

## 🛠️ Technology Stack

| Tool | Purpose |
|------|---------|
| React 19.2 | UI framework |
| TypeScript 6.0 | Type safety |
| Tailwind CSS 4.3 | Styling |
| Vite 8.2 | Build tool & dev server |
| Lucide React 1.31 | Icons |

## 📱 Responsive Breakpoints

- **Mobile** — < 640px (stacked layout)
- **Tablet** — 640px - 1024px (2-column grid)
- **Desktop** — > 1024px (full layout)

## 🎨 Customization

### Dark Mode
Edit `App.tsx` to change the default dark mode behavior:
```tsx
const [darkMode, setDarkMode] = useState(false) // true for dark by default
```

### Colors
Tailwind configuration in `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      // Add custom colors here
    }
  }
}
```

### API Caching
Clear API cache:
```ts
import { clearCache } from './api/countries'
clearCache()
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Traditional Hosting
```bash
npm run build
# Upload the 'dist' folder to your web server
```

## 📊 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork, modify, and enhance this project!

## 📝 License

MIT License - See LICENSE file for details

## 🔗 Resources

- [REST Countries API](https://restcountries.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)

## 📧 Questions?

Check the implementation guide for detailed architecture and feature breakdowns.
