# Atlas Egypt 🌍

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)

A modern, responsive travel and discovery platform built with Next.js, designed to showcase Egypt's rich cultural heritage, breathtaking destinations, and unforgettable experiences. Features newsletter subscription, interactive destination discovery, and seamless user experience. Explore ancient wonders, plan your perfect trip, and discover the magic of the Land of the Pharaohs.

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

### � Newsletter Subscription

- **Global Newsletter Handler**: Reusable newsletter subscription functionality
- **Email Validation**: Client-side and server-side email validation
- **Toast Notifications**: User feedback with success/error messages
- **API Integration**: RESTful API endpoint for email subscriptions

### 🚀 Performance Optimized

- **Server-Side Rendering (SSR)**: Fast initial page loads with Next.js
- **SEO Friendly**: Meta tags and structured data for search engines
- **Optimized Images**: Fast loading with Next.js Image component
- **React Compiler**: Enhanced performance with React 19 compiler

## 🏗️ Project Structure

```
atlas-egypt/
├── components/              # Reusable React components
│   ├── Footer.jsx           # Site footer
│   ├── Model.jsx            # Modal components
│   ├── main-navigation/     # Navigation components
│   │   ├── Header.jsx       # Main navigation header
│   │   └── upper-header.jsx # Top header with newsletter & contact
│   └── ui/                  # UI component library
│       ├── Button.jsx       # Custom button component
│       └── icons/           # Icon components
│           ├── menuIcon.jsx
│           ├── Usericon.jsx
│           └── Xicon.jsx
├── pages/                   # Next.js pages (Pages Router)
│   ├── _app.js              # Custom App component
│   ├── _document.js         # Custom Document
│   ├── index.js             # Home page
│   ├── login.js             # Authentication page
│   ├── Register.js          # User registration
│   ├── 404.js               # 404 error page
│   ├── api/                 # API routes
│   │   └── newsletter.js    # Newsletter subscription API
│   ├── Blog/                # Blog section
│   │   └── index.js
│   ├── Book/                # Booking interface
│   │   └── index.js
│   ├── Contactus/           # Contact form
│   │   └── index.js
│   └── Discover/            # Destination explorer
│       ├── index.js
│       └── [Id].js          # Dynamic route for destinations
├── helper/                  # Utility functions
│   ├── db-util.js           # Database operations
│   ├── data-util.js         # Data processing utilities
│   └── newsletter.js        # Newsletter subscription handler
├── data/                    # Static data files
│   └── data.js              # Blog posts and static content
├── styles/                  # Global styles
│   └── globals.css          # Tailwind CSS imports
├── public/                  # Static assets
│   ├── blogs/               # Blog images
│   ├── trips/               # Destination images
│   ├── AtlasEgypt.png       # Logo
│   ├── HeroPhoto.png        # Hero banner
│   └── Favicon.ico          # Favicon
├── package.json             # Dependencies and scripts
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── eslint.config.mjs        # ESLint configuration
├── jsconfig.json            # JavaScript configuration
└── README.md                # Project documentation
```

## 🛠️ Tech Stack

### Frontend Framework

- **[Next.js 16.1.4](https://nextjs.org)** - React framework with Pages Router and SSR
- **React 19.2.0** - UI library with concurrent features
- **React DOM 19.2.0** - React rendering library

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com)** - Accessible UI primitives for toast notifications
- **[Lucide React](https://lucide.dev)** - Beautiful icon library
- **[FontAwesome](https://fontawesome.com)** - Icon toolkit with React integration

### Backend & Database

- **[Firebase Realtime Database](https://firebase.google.com/products/realtime-database)** - NoSQL cloud database for dynamic content
- **[MongoDB](https://www.mongodb.com)** - NoSQL database for data storage
- **Next.js API Routes** - Serverless API endpoints

### Development Tools

- **ESLint 9** - Code linting and formatting
- **PostCSS** - CSS processing with Tailwind integration
- **SVGR** - SVG to React component conversion
- **Babel Plugin React Compiler** - React compilation optimization

### Notifications

- **[React Hot Toast](https://react-hot-toast.com)** - Lightweight toast notifications
- **[React Toastify](https://fkhadra.github.io/react-toastify)** - Feature-rich toast library

### Configuration

- **JSConfig** - JavaScript project configuration
- **Next.js Config** - Custom Next.js configuration with React Compiler and Strict Mode

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Firebase project (for dynamic content)
- MongoDB database (local or cloud instance)

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
   - Set up MongoDB connection string in your environment variables
   - Configure database collections for destinations, tours, and newsletter data
   - Populate both databases with initial data

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

### Code Quality

```bash
npm run lint
```

## 📊 Data Management

The application uses both Firebase Realtime Database and MongoDB for comprehensive data management, along with Next.js API routes for serverless backend functionality:

- **Destinations**: Location data with images, descriptions, and ratings
- **Tours**: Travel packages with pricing and itineraries
- **Newsletter Subscriptions**: Email collection and management
- **User Data**: Authentication and user preferences
- **Blog Content**: Articles and travel stories

Data is managed through utility functions in the `helper/` directory and API routes in `pages/api/`.

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

- **Project Repository**: [GitHub](https://github.com/AmrAssal-AkA/AtlasEgypt)
- **Issues**: [Create an issue](https://github.com/AmrAssal-AkA/AtlasEgypt/issues)

---

_Discover Egypt's wonders, one destination at a time._ 🇪🇬
