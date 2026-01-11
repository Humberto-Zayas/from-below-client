# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **From Below Studio** - a React client application for a music recording studio. It provides booking management, an admin dashboard, and audio A/B testing functionality for mastering examples.

## Development Commands

```bash
npm install    # Install dependencies
npm run dev    # Start development server (react-scripts start)
npm run build  # Build for production (CI=false && react-scripts build)
```

## Deployment

Deployed on Railway using Caddy as the web server. Configuration files:
- `nixpacks.toml` - Railway build configuration (downloads Caddy, builds React app)
- `Caddyfile` - Caddy server configuration (serves from `build/` folder, handles SPA routing)

## Architecture

### Routing (src/App.js)
- `/` - Home page (public-facing studio site)
- `/admin` - Admin dashboard (protected by password)
- `/booking/:bookingId` - Booking status page
- `/mixing` - Audio A/B comparison page for mastering examples

### Key Directories
- `src/pages/` - Page-level components (Home, Admin, Mixing, BookingStatus)
- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks (e.g., `useAudioABTest` for audio playback)
- `src/utils/` - Utilities (auth, email service, date formatting)
- `src/data/` - Static data (tracks.js for audio files)
- `src/css/` - Global styles (normalize.css, util.css, frombelow.css)

### API Integration
The app communicates with a backend API via environment variable `REACT_APP_API_URL`. Key endpoints:
- `/days/blackoutDays` - Fetch unavailable booking dates
- `/days/getMaxDate` - Get maximum bookable date
- `/bookings/bookings` - Create/manage bookings

### Environment Variables
- `REACT_APP_API_URL` - Backend API base URL
- `REACT_APP_ADMIN_PASSWORD` - Admin dashboard password

### UI Framework
- Material UI (MUI) v5 for components
- Emotion for styled components
- Howler.js for audio playback
- dayjs/moment for date handling

### Component Patterns
- Components export from `index.js` files within their directories
- Admin functionality split into `AdminDateHours` and `AdminBookings` components
- Booking flow uses a multi-step stepper (date → hours → contact form)
- Audio A/B testing uses `useAudioABTest` hook to manage playback state across tracks
