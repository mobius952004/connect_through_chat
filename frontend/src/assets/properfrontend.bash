front/
├── public/                  # Static files like images, favicon, index.html
├── src/                     # All source code
│   ├── assets/              # Images, fonts, icons, etc.
│   ├── api/                 # API request functions (fetch/axios logic)
│   ├── components/          # Reusable UI components (Buttons, Inputs, Cards)
│   ├── pages/               # Route-level components (Signup, Profile, Home)
│   ├── layout/              # Common layout components (Navbar, Footer, Sidebar)
│   ├── context/             # React context (AuthProvider, ThemeProvider)
│   ├── hooks/               # Custom React hooks (useAuth, useFetch, etc.)
│   ├── styles/              # Global CSS/SCSS or Tailwind config
│   ├── App.jsx              # Root component with route setup
│   └── main.jsx             # Vite entry point
├── .env                     # Environment variables
├── index.html               # HTML entry (used by Vite)
├── package.json
└── vite.config.js
