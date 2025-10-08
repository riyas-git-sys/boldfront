# 🎨 Frontend Documentation - URL Shortener

## 📋 Overview

A modern, responsive React.js frontend for the URL Shortener application built with Vite, featuring real-time analytics, search functionality, and seamless user experience.

## Click Here For [Demo](https://boldfront.vercel.app/)

![](https://img.shields.io/badge/React-18.2.0-blue)  

![](https://img.shields.io/badge/Vite-4.5.0-purple)  

![](https://img.shields.io/badge/License-MIT-yellow)  

## ✨ Features

### 🔗 Core Features

1 URL Shortening Interface: Clean form for converting long URLs

2 Real-time Analytics: Live visit count updates

3 Search Functionality: Multi-field search across URLs

4 Copy to Clipboard: One-click URL copying

5 Responsive Design: Mobile-first approach

## 🎯 User Experience

1 Instant Feedback: Real-time form validation

2 Session Persistence: Local storage for URL history

3 Loading States: Smooth user feedback during operations

4 Error Handling: Comprehensive error messages

## 🏗 Project Structure

text
```
frontend/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── UrlShortener.jsx     # Main shortening component
│   │   ├── UrlList.jsx          # URL list display
│   │   ├── UrlItem.jsx          # Individual URL item
│   │   └── SearchBar.jsx        # Search functionality
│   ├── 📁 services/
│   │   └── api.js               # API communication layer
│   ├── 📁 hooks/
│   │   └── useLocalStorage.js   # Custom local storage hook
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Application entry point
│   └── App.css                  # Global styles
├── package.json
├── vite.config.js
├── vercel.json
└── .env
```

## Screenshots

### Get data from server
<img width="1918" height="957" alt="Image" src="https://github.com/user-attachments/assets/18d3d4d0-5bb9-4e86-a834-2ea5e3c6e1b8" />

### Adding new long url to short
<img width="1919" height="952" alt="Image" src="https://github.com/user-attachments/assets/bddeb483-f7a7-4c4e-b7e2-9eebb160acb0" />

### Added Url successful result
<img width="1918" height="955" alt="Image" src="https://github.com/user-attachments/assets/c8b6d840-88e6-452a-b93e-3865740096a8" />

### Post data from thunder client vscode
<img width="1919" height="1031" alt="Image" src="https://github.com/user-attachments/assets/9cf607a3-6427-43ed-a619-3e24edab5c7c" />

### Ai usage to complete this project
<img width="1919" height="990" alt="Image" src="https://github.com/user-attachments/assets/5e874ca2-00da-4e05-a8c3-6c0295359860" />

## 🎯 Components Documentation

### 🔧 UrlShortener Component

Purpose: Handles URL input and shortening process

## Features:

1 URL validation with real-time feedback

2 Form submission with loading states

3 Error handling and user notifications

4 Copy to clipboard functionality

## State Management:

javascript
```
const [longUrl, setLongUrl] = useState('');
const [shortUrl, setShortUrl] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

## 📋 UrlList Component

1 Purpose: Displays all shortened URLs

2 Props:

3 urls: Array of URL objects

4 onUrlVisit: Function to update visit counts

5 showAll: Boolean to control display limit

## Features:

1 Responsive grid layout

2 Empty state handling

3 Search result integration

## 🔗 UrlItem Component
1 Purpose: Renders individual URL entries

2 Props:

3 url: URL object with metadata

4 onUrlVisit: Visit counter handler

## Features:

1 URL truncation for long links

2 Visit count display with icons

3 Date formatting

4 Open in new tab and copy actions

## 🔍 SearchBar Component

1 Purpose: Provides real-time search functionality

2 Props:

3 urls: Array to search through

4 onSearchResults: Callback for search results

## Features:

1 Multi-field search (URL, code, short URL)

2 Case-insensitive matching

3 Real-time results as you type

4 Clear search functionality

## 🔌 API Service Layer

Configuration

javascript
```
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});
```

### Available Methods

1 shortenUrl(longUrl): Create new short URL

2 getAllUrls(): Fetch all URLs from backend

3 testBackendConnection(): Health check for backend

## Error Handling

1 Request/response interceptors for debugging

2 Comprehensive error messages

3 Timeout handling

## 🎨 Styling System

1 Design Principles

2 Modern Gradient Backgrounds

3 Smooth Animations & Transitions

4 Responsive Grid Layouts

5 Professional Color Scheme

### Key CSS Features
css
```
/* Gradient backgrounds */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Smooth transitions */
transition: all 0.3s ease;

/* Responsive design */
@media (max-width: 768px) { /* Mobile styles */ }

/* Professional component styling */
.url-item {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 1.5rem;
}
```

## ⚙ Configuration

Environment Variables

env
```
VITE_API_BASE_URL=https://boldback.vercel.app
Package.json Scripts
json
{
  "dev": "vite",
  "build": "vite build", 
  "preview": "vite preview",
  "lint": "eslint . --ext js,jsx"
}
Vite Configuration
javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

## 🚀 Installation & Setup

### Prerequisites

### Node.js 18+

```
npm or yarn
```

## Local Development
bash
```
# Clone repository
git clone <repository-url>
cd frontend
```

```
# Install dependencies
npm install

# Set environment variables
echo "VITE_API_BASE_URL=http://localhost:5000" > .env

# Start development server
npm run dev
Production Build
bash
# Create production build
npm run build

# Preview production build
npm run preview
🌐 Deployment
Vercel Deployment
bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
Vercel Configuration
json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

## 🛠 Dependencies

### Production Dependencies
json
```
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0", 
  "axios": "^1.6.0",
  "react-icons": "^4.12.0"
}
Development Dependencies
json
{
  "@vitejs/plugin-react": "^4.1.1",
  "vite": "^4.5.0",
  "eslint": "^8.53.0"
}
```

## 🔧 Custom Hooks

useLocalStorage Hook

Purpose: Persistent state management with localStorage

Usage:

javascript
```
const [urls, setUrls] = useLocalStorage('shortenedUrls', []);
```

## Features:

Automatic JSON serialization

Error handling for storage issues

React state synchronization

## 🎯 Performance Features

Code Splitting: Automatic with Vite

Lazy Loading: Component-based splitting ready

Optimized Builds: Vite's fast build system

Efficient Re-renders: React memoization patterns

## 📱 Browser Support

Chrome 90+

Firefox 88+

Safari 14+

Edge 90+

## 🤝 Contributing
Follow React best practices

Use meaningful component and variable names

Maintain consistent code style

Add comments for complex logic

Test responsive behavior

## 📄 License
MIT License - see LICENSE file for details.

Built with React.js & Vite | Deployed on Vercel
