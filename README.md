<div align="center">

# 🌊 SeaSafe

### AI-Powered Marine Safety & Fisherman Assistance Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

**SeaSafe** combines real-time weather intelligence, interactive mapping, AI-powered risk assessment, and emergency response tools to keep fishermen, sailors, and coastal communities safe at sea.

[Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [API Reference](#api-reference) · [Screenshots](#screenshots)

</div>

---

## Features

### 🗺️ Interactive Marine Dashboard
- Real-time Leaflet map with click-to-analyze any location
- Risk-colored safety zones (green/yellow/red) around marker
- Polygon overlays for rivers, bays, and seas (Godavari, Bay of Bengal, Arabian Sea, Ganges)
- Full sidebar navigation with responsive design

### 🌊 Real-Time Marine Weather
- Wave height, direction, and period from Open-Meteo Marine API
- Automatic risk assessment: **SAFE** (<1.5m), **CAUTION** (1.5–2.5m), **DANGER** (>2.5m)
- Live danger/caution alert banners with pulsing animations
- Fishing advisory recommendations per risk level

### 🔍 Intelligent Search
- Search any ocean, river, port, or city worldwide
- Live autocomplete powered by OpenStreetMap Nominatim
- Special handling for Indian rivers (Godavari) with nearest-point calculation
- Direct geocoding via OpenWeatherMap API

### 🆘 Emergency SOS System
- One-tap SOS button sends your GPS location to the server
- Real-time WebSocket notifications to all connected clients
- SOS status tracking: Active → Responded → Resolved
- Admin response workflow

### 📍 Saved Locations
- Save favorite marine locations (ports, harbors, fishing spots, emergency points)
- Categorize with color-coded labels
- One-click navigation to any saved location
- Persistent storage via MongoDB

### 📊 Weather History
- Automatic weather data logging on every location check
- Historical wave data with risk level badges
- Location-based weather history retrieval

### 🛡️ Admin Dashboard
- System-wide statistics (users, alerts, SOS, locations, weather records)
- User management with deactivation capability
- Recent SOS and user activity monitoring

### 🔐 Authentication & Authorization
- JWT-based registration and login
- Protected routes with role-based access (user/admin)
- Secure password hashing with bcrypt

### ⚡ Real-Time Alerts
- Admin-created marine alerts with severity levels (info/warning/danger)
- Location-aware alert filtering
- Dismissable notification banners

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Animations & transitions |
| React Leaflet | Interactive map |
| React Router | Client-side routing |
| Lucide React | Icon library |
| Socket.IO Client | Real-time communication |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens | Authentication |
| bcryptjs | Password hashing |
| Socket.IO | WebSocket server |
| CORS | Cross-origin support |

### External APIs
| API | Purpose |
|---|---|
| Open-Meteo Marine | Wave height, direction, period |
| OpenWeatherMap | Weather data & geocoding |
| OpenStreetMap Nominatim | Location search & autocomplete |
| OpenStreetMap Tiles | Map rendering |

---

## Getting Started

### Prerequisites
- **Node.js** 18+ 
- **MongoDB** (local or [Atlas](https://cloud.mongodb.com))
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/Kotisuresh-123/Sea_safe.git
cd Sea_safe
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB URI and secrets
```

Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/seasafe?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

```bash
# Start the backend server
npm run dev
```

### Frontend Setup

```bash
cd ../seasafe-app

# Install dependencies
npm install

# Configure environment variables
```

Edit `seasafe-app/.env`:
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

> Get a free API key at [OpenWeatherMap](https://openweathermap.org/api)

```bash
# Start the frontend dev server
npm run dev
```

### Make Yourself Admin

After registering your first account:

```bash
cd backend
node setup-admin.js your@email.com
```

---

## Project Structure

```
Sea_safe/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT auth & admin middleware
│   ├── models/
│   │   ├── User.js            # User model (bcrypt + JWT)
│   │   ├── Alert.js           # Marine alerts
│   │   ├── SOS.js             # Emergency SOS reports
│   │   ├── SavedLocation.js   # Saved locations
│   │   └── WeatherHistory.js  # Weather data log
│   ├── routes/
│   │   ├── auth.js            # Register, login, profile
│   │   ├── alerts.js          # Alert CRUD
│   │   ├── sos.js             # SOS create/respond/resolve
│   │   ├── locations.js       # Saved locations CRUD
│   │   ├── weather.js         # Weather history
│   │   └── admin.js           # Admin stats & user mgmt
│   ├── server.js              # Express + Socket.IO server
│   ├── setup-admin.js         # CLI tool to set admin role
│   ├── .env                   # Environment variables
│   └── package.json
│
├── seasafe-app/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alerts/        # Alert banner component
│   │   │   ├── common/        # Reusable Card, Button
│   │   │   ├── Comparison/
│   │   │   ├── CTA/
│   │   │   ├── Dashboard/     # Map, Status, Weather cards
│   │   │   ├── DashboardPreview/
│   │   │   ├── Features/
│   │   │   ├── Footer/
│   │   │   ├── Hero/          # Landing page hero
│   │   │   ├── HowItWorks/
│   │   │   ├── layout/        # Header, Footer
│   │   │   ├── MapPreview/
│   │   │   ├── Navbar/        # Navigation with auth
│   │   │   ├── SavedLocations/
│   │   │   ├── SOS/           # Emergency SOS button
│   │   │   ├── Statistics/
│   │   │   ├── Testimonials/
│   │   │   └── TrustedBy/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── data/
│   │   │   └── rivers.js      # River polygon data
│   │   ├── pages/
│   │   │   ├── Auth/          # Login, Register
│   │   │   ├── Admin/         # Admin dashboard
│   │   │   ├── Dashboard.jsx  # Main marine dashboard
│   │   │   ├── Home.jsx       # Landing page
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   ├── api.js         # OpenWeatherMap API
│   │   │   ├── backend.js     # Backend REST API client
│   │   │   ├── marine.js      # Open-Meteo marine API
│   │   │   ├── geoSearch.js   # Geocoding search
│   │   │   ├── geoShapes.js   # Sea/river polygons
│   │   │   └── reverseGeocode.js
│   │   ├── styles/
│   │   │   ├── Dashboard.css  # Dashboard styles
│   │   │   └── index.css      # Global Tailwind styles
│   │   ├── utils/
│   │   │   ├── distance.js
│   │   │   ├── location.js    # GPS tracking
│   │   │   └── geoRank.js
│   │   ├── App.jsx            # Router setup
│   │   └── main.jsx           # Entry point
│   ├── .env                   # Frontend env vars
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## API Reference

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/me` | Update profile | Yes |

### Alerts
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/alerts` | Get active alerts | No |
| POST | `/api/alerts` | Create alert | Admin |
| DELETE | `/api/alerts/:id` | Deactivate alert | Admin |

### SOS
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/sos` | Send SOS | Yes |
| GET | `/api/sos` | Get all SOS reports | Yes |
| GET | `/api/sos/active` | Get active SOS | Yes |
| PUT | `/api/sos/:id/respond` | Mark responded | Admin |
| PUT | `/api/sos/:id/resolve` | Mark resolved | Admin |

### Locations
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/locations` | Get saved locations | Yes |
| POST | `/api/locations` | Save new location | Yes |
| DELETE | `/api/locations/:id` | Delete location | Yes |

### Weather History
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/weather` | Get weather records | Yes |
| POST | `/api/weather` | Save weather data | Yes |

### Admin
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/admin/stats` | Dashboard statistics | Admin |
| GET | `/api/admin/users` | List all users | Admin |
| PUT | `/api/admin/users/:id/deactivate` | Deactivate user | Admin |

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/seasafe
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

### Frontend (`seasafe-app/.env`)
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with care for maritime safety**

[![SeaSafe](https://img.shields.io/badge/SeaSafe-AI%20Marine%20Safety-00B4D8?style=for-the-badge)](https://github.com/Kotisuresh-123/Sea_safe)

</div>
