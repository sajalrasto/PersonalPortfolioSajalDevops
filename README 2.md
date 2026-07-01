# Sajal Rastogi - Senior DevOps Engineer Portfolio

एक आधुनिक, interactive और professional portfolio website जो React, TypeScript, और Framer Motion के साथ बनाई गई है।

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

## ✨ Features

### 🎨 Design & UI
- **Modern Aesthetics**: Glassmorphism, gradients, और premium animations
- **Dark/Light Mode**: Smooth theme switching के साथ
- **Responsive Design**: Mobile-first approach
- **3D Effects**: Perspective और depth के साथ interactive elements
- **Smooth Animations**: Framer Motion powered transitions

### 📄 Sections
- **Hero Section**: Animated dashboard preview के साथ
- **Services**: Spotlight cards के साथ capabilities showcase
- **Tech Stack**: Bento grid layout में organized
- **Projects**: Swiper carousel के साथ cinematic showcase
- **About**: Global reach map visualization
- **Resume Page**: AI-powered resume builder inspired design
- **Contact**: Interactive CTAs के साथ

### ⚡ Performance
- **Vite Build System**: Lightning fast development
- **Code Splitting**: Optimized bundle size
- **Lazy Loading**: On-demand component loading
- **Smooth Scrolling**: Optimized scroll performance

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 या उससे ऊपर)
- npm या yarn

### Installation

```bash
# Repository clone करें
git clone https://github.com/your-username/portfolio.git

# Project directory में जाएं
cd portfolio

# Dependencies install करें
npm install

# Development server start करें
npm run dev
```

Development server `http://localhost:3000` पर चलेगी।

### Build for Production

```bash
# Production build बनाएं
npm run build

# Build preview करें
npm run preview
```

## 📁 Project Structure

```
sajal-rastogi-portfolio/
├── components/
│   ├── pages/
│   │   ├── ResumePage.tsx          # Resume builder page
│   │   ├── AngelMonkeyCaseStudy.tsx
│   │   ├── BlogPage.tsx
│   │   └── ...
│   ├── ui/
│   │   ├── MagneticButton.tsx      # Interactive magnetic button
│   │   ├── SpotlightCard.tsx       # Mouse-following spotlight
│   │   └── ThemeToggle.tsx         # Dark/Light mode toggle
│   ├── Hero.tsx                    # Hero section with 3D dashboard
│   ├── Services.tsx                # Services showcase
│   ├── Projects.tsx                # Projects carousel
│   ├── TechStack.tsx               # Tech stack bento grid
│   ├── About.tsx                   # About section
│   ├── Contact.tsx                 # Contact section
│   └── Footer.tsx                  # Footer
├── styles/
│   ├── gradient-hero.css           # Gradient animations
│   ├── glass-card.css              # Glassmorphism effects
│   ├── float-tooltips.css          # Floating animations
│   └── resume-animations.css       # Resume page animations
├── constants.ts                     # Static data
├── types.ts                        # TypeScript definitions
├── App.tsx                         # Main app component
├── index.tsx                       # Entry point
└── vite.config.ts                  # Vite configuration
```

## 🎨 Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **TypeScript 5.8.2** - Type safety
- **Framer Motion 12.23.24** - Animations
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons

### Build Tools
- **Vite 6.2.0** - Build tool
- **@vitejs/plugin-react** - React plugin

### External Libraries
- **Swiper.js** - Carousel/Slider

## 🎯 Key Components

### MagneticButton
Interactive button जो mouse movement पर react करता है:
```tsx
<MagneticButton className="...">
  Click Me
</MagneticButton>
```

### SpotlightCard
Mouse position को follow करने वाली spotlight effect:
```tsx
<SpotlightCard spotlightColor="rgba(0, 240, 255, 0.15)">
  Content here
</SpotlightCard>
```

### ThemeToggle
Dark/Light mode switcher:
```tsx
<ThemeToggle isDark={isDark} toggle={toggleTheme} />
```

## 🎨 Color Palette

```css
/* Primary Colors */
--primary: #00F0FF;      /* Electric Cyan */
--violet: #8b5cf6;
--fuchsia: #d946ef;

/* Dark Theme */
--background: #020408;
--surface: #0B0F17;
--text: #E2E8F0;

/* Light Theme */
--background: #F8FAFC;
--surface: #FFFFFF;
--text: #0F172A;
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Tailwind Config
Tailwind CDN के through configure किया गया है `index.html` में।

### Vite Config
```typescript
{
  server: { port: 3000, host: '0.0.0.0' },
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } }
}
```

## 🎭 Animation Guidelines

### Framer Motion
- **Initial**: Component की starting state
- **Animate**: Final animated state
- **Transition**: Animation timing और easing
- **Viewport**: Scroll-based animations के लिए

Example:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Vercel CLI install करें
npm i -g vercel

# Deploy करें
vercel
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

## 📝 Customization

### Personal Information Update करें
1. `constants.ts` में projects, services, और stats update करें
2. `components/Hero.tsx` में personal details बदलें
3. `components/Footer.tsx` में social links add करें

### Theme Colors Change करें
`index.html` में CSS variables update करें:
```css
:root {
  --primary: #yourcolor;
  --background: #yourcolor;
  --text: #yourcolor;
}
```

## 🐛 Known Issues & Solutions

### Issue: Swiper not loading
**Solution**: CDN link check करें `index.html` में

### Issue: Animations laggy हैं
**Solution**: GPU acceleration enable करें:
```css
transform: translateZ(0);
will-change: transform;
```

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Sajal Rastogi**
- Email: sajalrastogi20@gmail.com
- Portfolio: [sajalrastogi.com](https://sajalrastogi.com)
- GitHub: [@sajalrasto9097](https://github.com/sajalrasto9097)
- LinkedIn: [Sajal Rastogi](https://linkedin.com/in/sajal-rastogi-5b474b6a)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Framer Motion for amazing animation capabilities
- Tailwind CSS for rapid styling
- React community for continuous support

## 📞 Support

Issues या questions के लिए:
- GitHub Issues create करें
- Email करें: sajalrastogi20@gmail.com

---

<div align="center">
  Made with ❤️ by Sajal Rastogi
</div>
