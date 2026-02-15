# Durvesh More - Professional Portfolio Website

A modern, responsive, and fully animated portfolio website built with React and Tailwind CSS. Showcase your projects, experience, blog posts, and connect with visitors through an integrated contact form.

## Features

✨ **Key Features:**

- **Hero Section** - Eye-catching introduction with smooth animations
- **Projects Showcase** - Display your best work with images and tech stack
- **Experience Timeline** - Professional experience and skills highlighting
- **Blog Section** - Share your knowledge and insights
- **Contact Form** - Fully functional contact form with validation and email delivery (backend)
- **Resume Download** - Downloadable PDF resume from the hero section
- **Theme** - Permanent professionally designed dark theme (theme toggle removed)
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Modern Design** - Clean and professional UI with Tailwind CSS

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **CSS**: PostCSS + Autoprefixer

## Project Structure

```
DurveshMore/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar with mobile menu
│   │   ├── Hero.jsx            # Hero section
│   │   ├── Projects.jsx        # Projects showcase
│   │   ├── Experience.jsx      # Experience timeline & skills
│   │   ├── Blog.jsx            # Blog posts section
│   │   ├── Contact.jsx         # Contact form
│   │   ├── Footer.jsx          # Footer section
 │   ├── context/
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**

   ```bash
   cd DurveshMore
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### Build

To build for production:

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Customization Guide

### Update Personal Information

Edit the following files to add your personal information:

1. **Navbar** - Update name in `src/components/Navbar.jsx`
2. **Hero Section** - Update introduction in `src/components/Hero.jsx`
3. **Projects** - Add your projects in `src/components/Projects.jsx`
4. **Experience** - Update your experience in `src/components/Experience.jsx`
5. **Blog** - Add blog posts in `src/components/Blog.jsx`
6. **Contact** - Update contact info in `src/components/Contact.jsx`
7. **Footer** - Update social links in `src/components/Footer.jsx`

### Change Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#0F172A',      // Primary color
      secondary: '#1E293B',    // Secondary color
      accent: '#00D9FF',       // Accent color
    },
  },
},
```

### Add New Sections

1. Create a new component in `src/components/`
2. Import it in `src/App.jsx`
3. Add it to the main component with proper id for navigation

## Animation Libraries

The portfolio uses **Framer Motion** for smooth animations:

- Fade-in effects on scroll
- Hover animations on buttons and cards
- Floating and glowing effects
- Smooth transitions between pages
- Staggered animations for lists

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Optimized images and assets
- Code splitting with Vite
- CSS purging with Tailwind
- Lazy loading for better performance
- Smooth scrolling behavior

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Vercel will auto-detect Vite configuration
4. Deploy!

### Deploy to GitHub Pages

1. Update `vite.config.js`:

   ```javascript
   export default {
     base: "/repository-name/",
     // ... rest of config
   };
   ```

2. Run build and deploy:
   ```bash
   npm run build
   git add dist -f
   git commit -m "Deploy"
   git push origin main
   ```

## Contributing

Feel free to fork this project and customize it for your own portfolio!

## License

This project is open source and available under the MIT License.

## Author

**Durvesh More**

- Email: developer.durvesh@gmail.com
- GitHub: [@durveshmore](https://github.com/DurveshMore8)
- LinkedIn: [Durvesh More](https://linkedin.com/in/durveshmore)

## Support

If you find this template helpful, please consider:

- Starring the repository ⭐
- Sharing your portfolio built with this template
- Contributing improvements

---

**Happy Portfolio Building! 🚀**
