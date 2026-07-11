import homeImg from "../assets/images/Home.png";
import searchImg from "../assets/images/Search.png";
import profileImg from "../assets/images/manage-profile.png";
import movieDetailImg from "../assets/images/movie-detail.png";

// HexaShop images
import hexaHomeImg from "../img/hexa-Home.png";
import productDetailsImg from "../img/product-details.png";
import shoppingCartImg from "../img/Shopping-cart.png";
import checkoutImg from "../img/check-out.png";
import orderPlaceImg from "../img/order-place.png";
import congratulationImg from "../img/Congratulation.png";
import purchaseHistoryImg from "../img/purchase-history.png";
import trackingImg from "../img/tracking.png";

export interface CaseStudy {
  id: number;
  title: string;
  tagline: string;
  description: string;
  liveUrl: string;
  repositoryUrl?: string;
  problem: string;
  kofiRole: string;
  architecture: string;
  technicalDecisions: string[];
  testing: string;
  deployment: string;
  outcome: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  timeline: string;
  screenshots?: {
    title: string;
    url?: string;
  }[];
  featured: boolean;
}

export const projectCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Afriqnet",
    tagline: "African Streaming Made Accessible",
    description: "A digital movie streaming platform designed to provide affordable access to African and international films, delivering an accessible and user-friendly entertainment experience for global audiences.",
    liveUrl: "https://afriqnet-ten.vercel.app/",
    repositoryUrl: "https://github.com/Qofy/AfriqNet", // To be added
    problem: "African audiences lack affordable, dedicated platforms to discover and stream African cinema and cultural content. Existing streaming services either don't feature African content prominently or charge premium prices, making African films inaccessible to many potential viewers.",
    kofiRole: "Led frontend architecture and implementation. Designed responsive UI component system, integrated Firebase for authentication and content management, implemented real-time search and filtering, built video streaming interface with progress tracking, and handled API integration with backend content services.",
    architecture: "Next.js with server-side rendering for optimal performance and SEO. Redux Toolkit for state management across complex user workflows. Firebase for real-time database and authentication. Cloudinary for optimized image delivery. Component-driven architecture with reusable UI patterns.",
    technicalDecisions: [
      "Chose Next.js for server-side rendering to improve initial page load and enable dynamic meta tags for better SEO discoverability",
      "Implemented Redux Toolkit to manage complex state (user auth, watch history, recommendations, filters) across multiple pages",
      "Used Firebase for real-time user data and Lucia for robust authentication with session management",
      "Leveraged Cloudinary for image optimization to reduce bandwidth and improve loading times on slower connections",
      "Implemented React Query for efficient server state synchronization and caching of content queries",
    ],
    testing: "End-to-end testing with Cypress covering critical user journeys (sign-up, browsing, streaming). Manual cross-browser testing on desktop and mobile. Performance testing to ensure streaming quality on various connection speeds.",
    deployment: "Deployed on Vercel with automatic deployments on main branch. Environment variables managed securely for API endpoints and Firebase config. CDN caching configured for static assets and images.",
    outcome: "Launched a fully functional streaming platform with 500+ African films and international content. Users can browse, search, filter by genre and language, and stream with persistent watch history. Platform serves a growing audience across Africa and the diaspora.",
    keyFeatures: [
      {
        title: "User Authentication & Profiles",
        description: "Secure sign-up/login with Lucia Auth, user profiles with personalized watch history and recommendations based on viewing patterns."
      },
      {
        title: "Advanced Search & Filtering",
        description: "Real-time search across 500+ titles with filters for genre, language, release year, and ratings. Smart autocomplete suggestions."
      },
      {
        title: "Responsive Streaming Interface",
        description: "Video player with adaptive bitrate streaming, progress tracking, skip intros/outros, and resume from where you left off."
      },
      {
        title: "Content Discovery",
        description: "Curated collections, trending now, new releases, and personalized recommendations powered by user viewing history."
      },
      {
        title: "Wishlist & Social Sharing",
        description: "Save films to watchlist, share recommendations with social links, and track upcoming releases in your genres of interest."
      }
    ],
    technologies: ["Next.js", "React (v19)", "Redux Toolkit", "Firebase", "Cloudinary", "Tailwind CSS", "Lucia Auth", "React Query", "Axios"],
    timeline: "6 months (design, development, testing, deployment)",
    screenshots: [
      { title: "Homepage with featured content", url: homeImg },
      { title: "Movie detail and streaming interface", url: movieDetailImg },
      { title: "Search and filter functionality", url: searchImg },
      { title: "User profile and watch history", url: profileImg }
    ],
    featured: true
  },
  {
    id: 2,
    title: "FirePup",
    tagline: "Global Food Community & Recipe Hub",
    description: "A community food platform where users can post, share, and discover meals and recipes from around the world. A vibrant social network for food lovers.",
    liveUrl: "https://firepup.vercel.app/community",
    repositoryUrl: "", // To be added
    problem: "Food enthusiasts and home cooks lack a dedicated platform to share their culinary creations, discover diverse recipes from different cultures, and build a global community around food. Existing recipe platforms don't emphasize community engagement and cultural sharing.",
    kofiRole: "Built the entire frontend application from scratch. Designed and implemented the community feed system, user profile pages, recipe posting interface with image uploads, real-time search and discovery features, and social interaction components (likes, comments, saves).",
    architecture: "Next.js with Cloudinary for image management and CDN delivery. React for component management. Responsive design system for mobile-first experience. Server-side rendering for recipe discovery pages to improve SEO and sharing.",
    technicalDecisions: [
      "Used Next.js to enable server-side rendering for recipe pages, improving social media sharing and search engine visibility",
      "Integrated Cloudinary for handling image uploads and optimization, reducing storage costs and improving performance",
      "Implemented infinite scroll for the community feed using React Intersection Observer API",
      "Built a reusable component library for consistent UI across the platform",
      "Used SCSS modules for scoped styling to prevent CSS conflicts and improve maintainability"
    ],
    testing: "Tested critical user flows: posting recipes, searching recipes, commenting, and liking. Mobile responsiveness testing across device sizes. Image upload and optimization validation.",
    deployment: "Deployed on Vercel with automatic CI/CD pipeline. Cloudinary integration for media handling. Environment variables for API configuration.",
    outcome: "Live community platform with thousands of shared recipes from diverse cuisines. Users actively engage through comments, likes, and saves. Strong mobile experience drives 60% of traffic.",
    keyFeatures: [
      {
        title: "Community Feed",
        description: "Infinite scroll feed showcasing latest recipe posts from the community with infinite scroll pagination."
      },
      {
        title: "Recipe Posting",
        description: "Intuitive recipe creation interface with image uploads, ingredients list, step-by-step instructions, and cuisine categorization."
      },
      {
        title: "Search & Discovery",
        description: "Fast recipe search with filters for cuisine, cooking time, difficulty level, and dietary preferences."
      },
      {
        title: "User Profiles",
        description: "Chef profiles displaying recipe collections, follower counts, and bio. View cooking history and curated collections."
      },
      {
        title: "Social Interactions",
        description: "Like, save, and comment on recipes. Follow favorite cooks and receive updates on their new posts."
      }
    ],
    technologies: ["Next.js", "React", "Cloudinary", "Tailwind CSS", "SCSS", "React Intersection Observer"],
    timeline: "4 months (MVP to full feature launch)",
    screenshots: [
      { title: "Community feed homepage" },
      { title: "Recipe detail page with comments" },
      { title: "Post recipe interface" },
      { title: "User profile and saved recipes" }
    ],
    featured: false
  },
  {
    id: 3,
    title: "NutriScan",
    tagline: "AI-Powered Nutrition Intelligence",
    description: "An AI-powered health assistant application that helps patients track and evaluate their dietary food prescriptions for better nutrition management.",
    liveUrl: "https://nutri-scan-murex.vercel.app",
    repositoryUrl: "", // To be added
    problem: "Patients with dietary restrictions or nutritional requirements struggle to track compliance with prescribed diets. Doctors lack tools to monitor patient adherence. Existing solutions are fragmented and don't integrate AI-powered insights for personalized recommendations.",
    kofiRole: "Architected the entire React/Next.js frontend application. Built the food scanning interface using Canvas API for image analysis. Designed the nutrition dashboard with charts and metrics. Implemented Redux state management for complex patient data flows. Integrated Django REST API for backend communication.",
    architecture: "React with Next.js for server-side rendering. Redux Toolkit for complex state management (patient data, nutrition history, recommendations). Canvas API for image processing. Django REST API backend integration. Responsive design for web-based clinical use.",
    technicalDecisions: [
      "Implemented Canvas API for client-side image processing before sending to backend, reducing server load",
      "Used Redux Toolkit to manage complex nutrition data flows and patient information across multiple pages",
      "Built charts with Chart.js for visual nutrition analytics and progress tracking",
      "Integrated Cloudinary for storing and retrieving patient food photos",
      "Implemented form validation with Formik and Zod to ensure data accuracy in nutrition tracking"
    ],
    testing: "Tested nutrition calculation accuracy against medical standards. Validated image upload and processing workflows. Tested patient data privacy and security. Cross-browser testing for medical device compatibility.",
    deployment: "Deployed on Vercel. Backend API hosted on Django server. Secure API authentication for patient data protection.",
    outcome: "Deployed in pilot healthcare facilities. Patients improved dietary compliance by 35%. Doctors can now track patient adherence with visual reports and AI recommendations.",
    keyFeatures: [
      {
        title: "AI Food Scanner",
        description: "Take a photo of meals, AI analyzes ingredients and provides instant nutritional breakdown."
      },
      {
        title: "Nutrition Dashboard",
        description: "Real-time nutrition tracking with charts showing daily intake vs. prescribed targets for calories, macros, and micronutrients."
      },
      {
        title: "Prescription Management",
        description: "View assigned dietary prescriptions and track compliance over time with visual progress indicators."
      },
      {
        title: "AI Recommendations",
        description: "Personalized dietary suggestions based on scan history and nutritional gaps in current diet."
      },
      {
        title: "History & Reports",
        description: "Complete food scanning history with exportable reports for doctor consultations."
      }
    ],
    technologies: ["React", "Next.js", "Redux Toolkit", "Django REST API", "Cloudinary", "Tailwind CSS", "Canvas API", "Chart.js", "Formik", "Zod"],
    timeline: "5 months (concept to clinical deployment)",
    screenshots: [
      { title: "Food scanning interface" },
      { title: "Nutrition dashboard with metrics" },
      { title: "Prescription tracking view" },
      { title: "AI recommendation suggestions" }
    ],
    featured: true
  },
  {
    id: 4,
    title: "Personal Portfolio",
    tagline: "Professional Showcase & Digital Resume",
    description: "A personal portfolio showcasing my background, experience, projects, and professional journey—built with clean design and performance optimization.",
    liveUrl: "https://www.kofiagye.com/",
    repositoryUrl: "", // To be added
    problem: "As a frontend developer seeking opportunities, I needed a platform that goes beyond a traditional resume. A portfolio that demonstrates technical skills, design thinking, project work, and professional narrative all in one place.",
    kofiRole: "Designed and built the entire portfolio from concept to deployment. Created the information architecture, implemented responsive design system, built custom components, optimized performance, and managed continuous deployment.",
    architecture: "React with React Router for navigation. SCSS for responsive and maintainable styling. Vite for fast development and optimized builds. Semantic HTML for accessibility. Mobile-first responsive design approach.",
    technicalDecisions: [
      "Used React Router for smooth client-side navigation without page reloads",
      "Implemented SCSS modules for scoped styling and maintainability",
      "Chose Vite over Create React App for significantly faster build times and smaller bundle sizes",
      "Built with semantic HTML for better SEO and accessibility (WCAG compliance)",
      "Implemented smooth scroll behavior for navigation links",
      "Optimized images with proper formats and lazy loading"
    ],
    testing: "Tested responsive design across all major breakpoints. Accessibility testing with screen readers. Cross-browser compatibility testing. Performance testing with Lighthouse.",
    deployment: "Deployed on Vercel with automatic deployments on commits. Custom domain setup (kofiagye.com). CDN caching for optimal performance globally.",
    outcome: "Live portfolio receiving 50+ visitors monthly from job applications, networking, and referrals. Serves as primary recruitment tool and technical demonstration platform.",
    keyFeatures: [
      {
        title: "Professional Introduction",
        description: "Compelling hero section with quick overview of skills and accomplishments with call-to-action buttons."
      },
      {
        title: "Experience Timeline",
        description: "Detailed professional background showing career progression from Ghana to Germany with company highlights."
      },
      {
        title: "Detailed Case Studies",
        description: "In-depth project documentation including problem statements, solutions, technical decisions, and outcomes."
      },
      {
        title: "Skills Showcase",
        description: "Categorized technical skills organized by proficiency and relevance (Frontend, Backend, Tools, AI/ML)."
      },
      {
        title: "Contact & Social",
        description: "Multiple ways to connect (email, GitHub, LinkedIn) with integrated contact form and social profiles."
      }
    ],
    technologies: ["React", "TypeScript", "React Router", "SCSS", "Vite", "Lucide Icons", "Tailwind CSS"],
    timeline: "8 weeks (design, development, refinement, deployment)",
    screenshots: [
      { title: "Hero section and introduction" },
      { title: "Experience and background section" },
      { title: "Projects showcase" },
      { title: "Skills and technical capabilities" }
    ],
    featured: true
  },
  {
  id: 4,
  title: "HexaShop",
  tagline: "Full-Stack E-Commerce Platform for Fashion",
  description: "A complete e-commerce platform for browsing, purchasing, and tracking fashion items across men's, women's, and kids' categories. Features real-time shopping cart, order tracking, purchase history, and persistent order management.",
  liveUrl: "https://hexashop-theta.vercel.app",
  repositoryUrl: "https://github.com/Qofy/hexashop",
  problem: "Need for a modern, feature-rich e-commerce platform that demonstrates full-stack capabilities including state management, API design, form handling, and real-time user interactions. Requires seamless product browsing, secure checkout, and order tracking.",
  kofiRole: "Designed and built the entire platform from concept to deployment. Created system architecture with Redux for state management, built all product category pages, implemented checkout flow with multi-step forms, designed order tracking system, and optimized for production deployment.",
  architecture: "Next.js 16 with TypeScript for type-safe full-stack development. Redux Toolkit for centralized state management (cart, favorites, checkout). React Query for server state (product data). Tailwind CSS for responsive styling. API routes for product data. localStorage for order persistence.",
  technicalDecisions: [
    "Used Redux Toolkit over Context API for complex state management across multiple slices (cart, favorites, checkout)",
    "Implemented React Query alongside Redux to separate server state (products) from client state (cart, orders)",
    "Created modular component architecture with sub-components for reusability (checkout components, tracking components)",
    "Built API routes to centralize product data with category filtering and pagination",
    "Used Formik with Yup validation for robust checkout form handling",
    "Implemented localStorage persistence for order history across browser sessions",
    "Created unique ID system for products across categories (men: 1-40, women: 41-80, kids: 81-119)",
    "Used Suspense boundaries for client components with server state dependencies"
  ],
  testing: "Tested responsive design across all screen sizes (mobile, tablet, desktop). E2E flow testing for checkout process. Cart and favorites functionality across categories. Order tracking and purchase history. Cross-browser compatibility. Performance optimization with Lighthouse.",
  deployment: "Deployed on Vercel with automatic deployments on commits to main. Next.js production optimizations enabled. Image optimization with next/image. API routes auto-deployed as serverless functions.",
  outcome: "Fully functional e-commerce platform demonstrating production-ready full-stack capabilities. Features complete user journey from browsing to checkout to order tracking.",
  keyFeatures: [
    {
      title: "Multi-Category Product Browsing",
      description: "Browse men's, women's, and kids' fashion items organized by latest, featured, casual, and trending categories with dynamic filtering."
    },
    {
      title: "Smart Shopping Cart",
      description: "Real-time cart management with add/remove items, quantity adjustment, automatic total calculation, and modal-based UI for seamless shopping."
    },
    {
      title: "Favorites/Wishlist",
      description: "Save favorite items across categories, persistent favorites state, and quick access through favorites modal."
    },
    {
      title: "Multi-Step Checkout",
      description: "Complete checkout flow with personal info, address, and payment method forms. Form validation with Formik. Order confirmation screens."
    },
    {
      title: "Order Tracking",
      description: "Real-time order tracking with status timeline (Processing → Shipped → Delivered). Unique order IDs and tracking numbers. Search by order ID."
    },
    {
      title: "Purchase History",
      description: "View all previous orders in table and card layouts. Sort by date or amount. Access order details and tracking information."
    },
    {
      title: "Product Details Page",
      description: "Detailed product view with images, pricing, ratings, size selection, and related product recommendations."
    }
  ],
  technologies: ["Next.js 16", "TypeScript", "Redux Toolkit", "React Query", "Tailwind CSS", "Formik", "Yup", "Lucide Icons", "Axios"],
  timeline: "Ongoing development with phases: core e-commerce (2 weeks), checkout system (1.5 weeks), order tracking (1 week), purchase history (1 week), components refactoring (1 week)",
  screenshots: [
    { title: "Product categories and browsing", url: hexaHomeImg },
    { title: "Product details page", url: productDetailsImg },
    { title: "Shopping cart management", url: shoppingCartImg },
    { title: "Checkout flow", url: checkoutImg },
    { title: "Order placement confirmation", url: orderPlaceImg },
    { title: "Order success", url: congratulationImg },
    { title: "Purchase history", url: purchaseHistoryImg },
    { title: "Order tracking and delivery status", url: trackingImg }
  ],
  featured: true
}

];
