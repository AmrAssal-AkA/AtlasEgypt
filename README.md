# Atlas Egypt 🌍

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)

A modern, responsive travel and discovery platform built with Next.js, designed to showcase Egypt's rich cultural heritage, breathtaking destinations, and unforgettable experiences. Explore ancient wonders, plan your perfect trip, and discover the magic of the Land of the Pharaohs.

## ✨ Features

### 🏛️ Destination Discovery

- **Interactive Explore Page**: Browse through curated destinations with detailed information
- **Dynamic Content**: Real-time data fetched from Firebase Realtime Database
- **Rich Media**: High-quality images and comprehensive descriptions

### 🏠 Home Experience

- **Featured Tours**: Highlighted premium travel packages
- **Hero Section**: Engaging landing with call-to-action buttons
- **Responsive Grid**: Beautifully laid out featured content

### 📝 Blog & Stories

- **Travel Insights**: Articles and stories about Egyptian culture and history
- **User Engagement**: Share experiences and tips

### 🔐 User Authentication

- **Secure Login/Register**: User account management
- **Personalized Experience**: Save favorites and preferences

### 📱 Modern UI/UX

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Intuitive Navigation**: Clean header and footer with easy access
- **Accessibility**: WCAG compliant components

### 🚀 Performance Optimized

- **Server-Side Rendering (SSR)**: Fast initial page loads with Next.js
- **SEO Friendly**: Meta tags and structured data for search engines
- **Optimized Images**: Fast loading with Next.js Image component

## 🏗️ Project Structure

```
atlas-egypt/
├── components/          # Reusable React components
│   ├── Header.jsx       # Navigation header
│   ├── Footer.jsx       # Site footer
│   ├── Model.jsx        # Modal components
│   └── ui/              # UI component library
│       ├── Button.jsx   # Custom button component
│       └── icons/       # Icon components
├── pages/               # Next.js pages (App Router)
│   ├── index.js         # Home page with SSR
│   ├── login.js         # Authentication page
│   ├── Register.js      # User registration
│   ├── Blog/            # Blog section
│   ├── Book/            # Booking interface
│   ├── Discover/        # Destination explorer
│   └── Contactus/       # Contact form
├── helper/              # Utility functions
│   └── db-util.js       # Firebase data operations
├── data/                # Static data files
│   └── data.js          # Blog posts and static content
├── styles/              # Global styles
│   └── globals.css      # Tailwind CSS imports
├── public/              # Static assets
│   ├── blogs/           # Blog images
│   └── trips/           # Destination images
├── package.json         # Dependencies and scripts
├── next.config.mjs      # Next.js configuration
├── tailwind.config.js   # Tailwind CSS config
└── README.md            # Project documentation
```

## 🛠️ Tech Stack

### Frontend Framework

- **[Next.js 16](https://nextjs.org)** - React framework with App Router and SSR
- **React 19** - UI library with concurrent features

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com)** - Accessible UI primitives
- **[Lucide React](https://lucide.dev)** - Beautiful icon library
- **[FontAwesome](https://fontawesome.com)** - Icon toolkit

### Backend & Database

- **[Firebase Realtime Database](https://firebase.google.com/products/realtime-database)** - NoSQL cloud database for dynamic content

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **SVGR** - SVG to React component conversion

### Notifications

- **[React Hot Toast](https://react-hot-toast.com)** - Lightweight toast notifications
- **[React Toastify](https://fkhadra.github.io/react-toastify)** - Feature-rich toast library

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Firebase project (for data management)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/atlas-egypt.git
   cd atlas-egypt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Add your Firebase config to environment variables
   - Populate the database with destination and tour data

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Start exploring Egypt!

### Build for Production

```bash
npm run build
npm start
```

## 📊 Data Management

The application uses Firebase Realtime Database for dynamic content:

- **Destinations**: Location data with images, descriptions, and ratings
- **Tours**: Travel packages with pricing and itineraries
- **Featured Content**: Curated highlights for the home page

Data is fetched server-side using `getStaticProps` for optimal performance and SEO.

## 🤝 Contributing

We welcome contributions from developers, designers, and travel enthusiasts!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Egypt's rich cultural heritage
- Built with modern web technologies
- Thanks to the open-source community

## 📞 Contact

For questions, suggestions, or collaborations:

- **Project Repository**: [GitHub](https://github.com/your-username/atlas-egypt)
- **Issues**: [Create an issue](https://github.com/your-username/atlas-egypt/issues)

---

_Discover Egypt's wonders, one destination at a time._ 🇪🇬
