# Atlas Egypt 🌍

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A modern, responsive travel and discovery platform built with Next.js 16, designed to showcase Egypt's rich cultural heritage, breathtaking destinations, and unforgettable experiences. Features secure user authentication, newsletter subscription, interactive destination discovery, comprehensive blog functionality, and seamless booking experience. Explore ancient wonders, plan your perfect trip, and discover the magic of the Land of the Pharaohs.

## ✨ Features

### 🏛️ Destination Discovery

- **Interactive Explore Page**: Browse through curated Egyptian destinations with dynamic, detailed information
- **Destination Cards**: Beautiful, responsive card layouts featuring destination images and key details
- **Dynamic Routing**: Individual destination pages with unique URLs using Next.js dynamic routes (`[Id].js`)
- **Rich Media**: High-quality images and comprehensive descriptions for each location
- **Grid Layout**: Responsive grid display of all available destinations

### 🏠 Home Experience

- **Featured Tours**: Showcase of premium travel packages on the homepage
- **Responsive Grid Layout**: Beautifully organized tour and destination cards
- **Call-to-Action Elements**: Strategic navigation buttons and engagement features
- **Professional Navigation**: Sticky header and footer with site-wide navigation
- **Hero Section**: Eye-catching landing section with key information

### 📝 Blog & Stories

- **Full Blog System**: Complete blog functionality with article creation and management
- **AddBlog Interface**: Admin page for creating and adding new blog posts
- **Blog Grid Display**: Beautiful grid layout of blog articles
- **Individual Blog Posts**: Detailed blog post pages with full content
- **Travel Insights**: Articles and stories about Egyptian culture, history, and travel tips

### 🔐 User Authentication

- **Secure Login System**: User authentication with login validation
- **User Registration**: New user signup with form validation
- **Login/Register Pages**: Dedicated pages for authentication flows
- **Session Management**: User account management and preferences

### 📧 Newsletter Subscription

- **Global Newsletter Handler**: Reusable newsletter subscription functionality accessible site-wide
- **Email Validation**: Comprehensive client-side and server-side email validation
- **Toast Notifications**: Real-time user feedback with success/error messages via React Hot Toast
- **API Integration**: RESTful API endpoint (`/api/newsletter`) for email subscriptions
- **Database Storage**: Newsletter subscriptions securely stored in MongoDB
- **Header Integration**: Newsletter signup form in the upper header component

### 🎫 Booking System

- **Tour Booking Interface**: Dedicated booking page for travel packages
- **Dynamic Tour Selection**: Integration with destination and tour data for booking
- **Booking Management**: Complete booking interface for customers

### 📞 Contact Management

- **Contact Form Page**: Professional contact form with multiple input fields
- **Form Validation**: Comprehensive client and server-side validation
- **API Integration**: Contact submissions processed via dedicated API route (`/api/contactus`)
- **Multi-channel Support**: Contact form available on contact page and in header
- **Database Integration**: Contact submissions stored and managed through MongoDB

### 🚀 Performance & Quality

- **Server-Side Rendering (SSR)**: Fast initial page loads with Next.js Pages Router
- **SEO Friendly**: Meta tags and structured data for optimal search engine visibility
- **Responsive Design**: Mobile-first approach using Tailwind CSS v4
- **Optimized Components**: Reusable, well-structured React components with best practices
- **Code Quality**: ESLint 9 configuration for consistent code standards
- **React Compiler**: Advanced React optimization via Babel plugin

## 🏗️ Project Structure

```
atlas-egypt/
├── components/                 # Reusable React components
│   ├── Footer.jsx              # Site-wide footer component
│   ├── Model.jsx               # Modal/dialog components
│   ├── Authentication/         # Auth-related components
│   │   ├── login-form.jsx      # Login form component
│   │   └── Register-form.jsx   # Registration form component
│   ├── blog/                   # Blog-related components
│   │   ├── blog-grid.jsx       # Blog posts grid display
│   │   └── blog-post.jsx       # Individual blog post display
│   ├── contact/                # Contact-related components
│   │   └── contact-form.jsx    # Contact form component
│   ├── Discover/               # Destination discovery components
│   │   ├── Destination-card.jsx # Single destination card
│   │   ├── Destination-grid.jsx # Destinations grid layout
│   │   ├── Tour-card.jsx       # Single tour package card
│   │   └── Tour-grid.jsx       # Tours grid layout
│   ├── main-navigation/        # Navigation components
│   │   ├── Header.jsx          # Main navigation header
│   │   └── upper-header.jsx    # Top header with newsletter & contact
│   └── ui/                     # Reusable UI component library
│       ├── Button.jsx          # Custom button component
│       └── icons/              # SVG icon components
│           ├── menuIcon.jsx
│           ├── Usericon.jsx
│           └── Xicon.jsx
│
├── pages/                      # Next.js pages (Pages Router)
│   ├── _app.js                 # Custom App component (global setup)
│   ├── _document.js            # Custom Document for HTML structure
│   ├── index.js                # Home page
│   ├── login.js                # User login page
│   ├── Register.js             # User registration page
│   ├── contactus.js            # Contact page
│   ├── 404.js                  # Custom 404 error page
│   ├── api/                    # Next.js API routes (backend)
│   │   ├── contactus.js        # Contact form API handler
│   │   └── newsletter.js       # Newsletter subscription API
│   ├── Blog/                   # Blog section
│   │   ├── index.js            # Blog listing page
│   │   └── AddBlog.js          # Blog creation/admin page
│   ├── Book/                   # Booking section
│   │   └── index.js            # Booking interface
│   └── Discover/               # Destination discovery
│       ├── index.js            # All destinations page
│       └── [Id].js             # Dynamic individual destination page
│
├── helper/                     # Utility functions and helpers
│   ├── db-util.js              # Database operations and queries
│   ├── data-util.js            # Data processing and transformation utilities
│   └── newsletter.js           # Newsletter subscription handler logic
│
├── data/                       # Static data files
│   └── data.js                 # Blog posts and static content data
│
├── styles/                     # Global styles
│   └── globals.css             # Tailwind CSS and global styles
│
├── public/                     # Static assets
│   ├── blogs/                  # Blog article images
│   ├── trips/                  # Destination and trip images
│   ├── AtlasEgypt.png          # Logo asset
│   ├── HeroPhoto.png           # Hero banner image
│   └── Favicon.ico             # Site favicon
│
├── Configuration Files
│   ├── package.json            # Dependencies and npm scripts
│   ├── next.config.mjs         # Next.js configuration (React Compiler enabled)
│   ├── postcss.config.mjs      # PostCSS configuration for Tailwind
│   ├── eslint.config.mjs       # ESLint rules and configuration
│   ├── jsconfig.json           # JavaScript project configuration
│   └── README.md               # Project documentation
```

## 🛠️ Tech Stack

### Frontend Framework

- **[Next.js 16.1.4](https://nextjs.org)** - React framework with Pages Router and Server-Side Rendering
- **[React 19.2.0](https://reactjs.org)** - UI library with modern features and concurrent rendering
- **React DOM 19.2.0** - React rendering library for the web

### Styling & UI Components

- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework for rapid UI development
- **[Radix UI](https://www.radix-ui.com)** - Accessible UI primitives for toast notifications
- **[Lucide React](https://lucide.dev)** - Consistent, beautiful icon library
- **[FontAwesome](https://fontawesome.com)** - Comprehensive icon toolkit with React integration
- **[SVGR](https://react-svgr.com/)** - SVG to React component conversion

### Backend & Database

- **[Firebase Realtime Database](https://firebase.google.com/products/realtime-database)** - Real-time NoSQL database for dynamic destinations, tours, and live content
- **[MongoDB 7.0.0](https://www.mongodb.com)** - NoSQL database for data persistence (newsletter, contacts, blog posts)
- **Next.js API Routes** - Serverless API endpoints for backend functionality

### Notifications & Toast

- **[React Hot Toast](https://react-hot-toast.com/)** - Lightweight, accessible toast notification library
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Alternative feature-rich toast library

### Development Tools & Build

- **[ESLint 9](https://eslint.org/)** - Code linting and quality assurance
- **PostCSS** - CSS transformation tool for Tailwind processing
- **[Babel Plugin React Compiler](https://react.dev/learn/react-compiler)** - Automatic React optimization (Next.js 16+)

### Configuration

- **JSConfig** - JavaScript project configuration with path aliases
- **Next.js Config** - Custom Next.js configuration with React Compiler enabled and Strict Mode

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud instance like MongoDB Atlas)
- **Git** for version control

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AmrAssal-AkA/AtlasEgypt.git
   cd atlas-egypt
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory with:

   ```env
   # Firebase Realtime Database
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_firebase_database_url

   # MongoDB Connection
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Realtime Database
   - Set up database structure for:
     - `destinations` - Destination location data with real-time updates
     - `tours` - Travel package information

5. **MongoDB Setup**
   - Set up MongoDB locally or create a MongoDB Atlas cluster
   - Create database collections for:
     - `newsletter` - Newsletter subscriptions
     - `contacts` - Contact form submissions

6. **Run Development Server**

   ```bash
   npm run dev
   ```

   Opens on [http://localhost:3000](http://localhost:3000)

7. **Build for Production**

   ```bash
   npm run build
   npm start
   ```

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint code quality checks
```

## 📊 Database Management

The application uses both Firebase Realtime Database and MongoDB for comprehensive data management:

### Firebase Realtime Database

- **Destinations**: Location metadata with real-time updates (name, description, images, ratings, coordinates)
- **Tours**: Travel packages with dynamic availability and pricing
- **Live Content**: Real-time data updates for the Discover page

### MongoDB Collections & Models

- **Newsletter Subscriptions**: Email addresses for newsletter campaigns
- **Contact Submissions**: User contact form submissions with messages
- **Blog Posts**: Article content with author, date, and formatted body

### Data Access

- **Firebase Integration**: Direct real-time database access for destinations and tours
- **MongoDB Operations**: Utility functions in `helper/` directory handle database operations
- **API Routes**: Next.js API routes in `pages/api/` provide RESTful endpoints
- **Client-side Fetching**: Components fetch data via Firebase SDK or API routes as needed

## 👨‍💻 Development Guidelines

- **Code Style**: Follow consistent formatting and naming conventions
- **Component Structure**: Keep components small, focused, and reusable
- **State Management**: Use React hooks for local state management
- **Git Workflow**: Write meaningful commit messages describing changes
- **Testing**: Test components and API routes thoroughly before deployment
- **Documentation**: Update README and code comments when adding features

## 🔐 Security Considerations

- Server-side validation for all form submissions
- MongoDB connection string kept in environment variables
- API routes validate and sanitize user input
- CORS and security headers configured in Next.js

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Egypt's rich cultural heritage and historical significance
- Built with modern web technologies and best practices
- Thanks to the vibrant open-source community
- Design inspiration from contemporary travel platforms

## 📞 Contact & Support

For questions, suggestions, bug reports, or collaboration opportunities:

- **Project Repository**: [GitHub - AmrAssal-AkA/AtlasEgypt](https://github.com/AmrAssal-AkA/AtlasEgypt)
- **Issue Tracker**: [Create an issue](https://github.com/AmrAssal-AkA/AtlasEgypt/issues)
- **Contact Form**: Available on the [Contact Us page](http://localhost:3000/contactus) of the application

## 📈 Future Enhancements

- User profile and preference management
- Advanced search and filtering for destinations
- Review and rating system for tours
- Payment integration for bookings
- Real-time notifications
- Mobile app development
- Multi-language support

---

<div align="center">

**_Discover Egypt's wonders, one destination at a time._** 🇪🇬

Built with ❤️ by [Amr Assal](https://github.com/AmrAssal-AkA)

</div>
