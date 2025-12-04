import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, ShoppingBag, Shield, Heart, MessageCircle, Star, Truck, Info, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <ShoppingBag size={28} className="text-primary" />,
    title: 'Product Catalog',
    desc: '500+ products, organized by collections and categories for easy discovery.'
  },
  {
    icon: <Users size={28} className="text-primary" />,
    title: 'User Accounts',
    desc: 'Registration, login, password reset, and profile management.'
  },
  {
    icon: <Heart size={28} className="text-primary" />,
    title: 'Wishlist',
    desc: 'Save favorite products for later and shop with ease.'
  },
  {
    icon: <CheckCircle size={28} className="text-primary" />,
    title: 'Cart & Checkout',
    desc: 'Add to cart, view cart, and secure checkout with multiple payment options.'
  },
  {
    icon: <Shield size={28} className="text-primary" />,
    title: 'Order Management',
    desc: 'View orders, track status, and manage returns/exchanges.'
  },
  {
    icon: <MessageCircle size={28} className="text-primary" />,
    title: 'Customer Support',
    desc: 'Contact forms, WhatsApp, and email integration for quick help.'
  },
  {
    icon: <Info size={28} className="text-primary" />,
    title: 'Content Pages',
    desc: 'About Us, FAQs, and all key policies for transparency.'
  },
  {
    icon: <BarChart2 size={28} className="text-primary" />,
    title: 'SEO & Analytics',
    desc: 'Structured data, OpenGraph, and Google site verification.'
  }
];

const stats = [
  { label: 'Customers', value: '50,000+', icon: <Users size={20} className="text-fuchsia-500" /> },
  { label: 'Satisfaction', value: '99.5%', icon: <Star size={20} className="text-yellow-400" /> },
  { label: 'Products', value: '500+', icon: <ShoppingBag size={20} className="text-primary" /> },
  { label: 'Delivery', value: 'Pan-India', icon: <Truck size={20} className="text-cyan-400" /> },
];

const AngelMonkeyCaseStudy: React.FC = () => {
  return (
    <div className="bg-background min-h-screen text-text selection:bg-primary/30 selection:text-white">
      <section className="pt-32 pb-20 px-4 md:px-0 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6 text-center"
        >
          Angel Monkey: <span className="text-primary">D2C Men’s Fashion</span> Success
        </motion.h1>
        <p className="text-lg md:text-xl text-text-muted text-center max-w-2xl mx-auto mb-10">
          Angel Monkey is a modern D2C e-commerce platform focused on men’s fast fashion in India, delivering premium quality, trend-driven apparel with a strong emphasis on customer satisfaction, inclusivity, and innovation.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 bg-surface/70 border border-text/10 rounded-xl px-6 py-4 shadow-md">
              {stat.icon}
              <span className="text-2xl font-bold font-display">{stat.value}</span>
              <span className="text-xs text-text-muted uppercase font-mono tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Business Goals</h2>
          <ul className="list-disc pl-6 text-lg text-text-muted space-y-2">
            <li>Redefine men’s fashion in India with quality and style.</li>
            <li>Build a trusted, customer-obsessed brand.</li>
            <li>Scale rapidly to become a leading D2C fashion brand.</li>
            <li>Offer a seamless, secure, and enjoyable online shopping experience.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 bg-surface/60 border border-text/10 rounded-xl p-6 shadow-sm">
                <div className="shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text">{f.title}</h3>
                  <p className="text-text-muted text-base">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Technologies & Infrastructure</h2>
          <ul className="list-disc pl-6 text-lg text-text-muted space-y-2">
            <li>Frontend: Next.js (React), Tailwind CSS, Lucide & React Icons</li>
            <li>Backend/API: Next.js API routes, modular service structure</li>
            <li>State Management: React hooks, context, React Query</li>
            <li>Admin Panel: Custom dashboard for dynamic management of products, orders, users, content, and analytics. Enables real-time updates, inventory control, and customer support management.</li>
            <li>Deployment: AWS (EC2, S3, CloudFront, RDS, SES, Lambda) for scalable, secure, and high-availability hosting. CI/CD pipelines for automated deployments.</li>
            <li>Other: PostCSS, ESLint, modern JS tooling</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Challenges & Solutions</h2>
          <ul className="list-disc pl-6 text-lg text-text-muted space-y-2">
            <li><span className="font-semibold text-text">Scalability:</span> Modularized codebase with reusable components and services for easy scaling.</li>
            <li><span className="font-semibold text-text">Performance:</span> Optimized images, code-splitting, and server-side rendering.</li>
            <li><span className="font-semibold text-text">User Trust:</span> Transparent policies, secure payments, and visible customer support.</li>
            <li><span className="font-semibold text-text">Customer Experience:</span> Fast, mobile-friendly UI, easy returns, and personalized features like wishlists and recent views.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Results & Impact</h2>
          <ul className="list-disc pl-6 text-lg text-text-muted space-y-2">
            <li><span className="font-semibold text-text">Growth:</span> From inception in 2020 to 50,000+ happy customers by 2024.</li>
            <li><span className="font-semibold text-text">Brand Trust:</span> 99.5% satisfaction rate, high average ratings, and pan-India delivery.</li>
            <li><span className="font-semibold text-text">Recognition:</span> Industry leader in D2C men’s fashion by 2024.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Conclusion</h2>
          <p className="text-lg text-text-muted">
            Angel Monkey’s e-commerce platform demonstrates how a tech-driven, customer-first approach can rapidly build a trusted fashion brand. The project’s modular architecture, focus on UX, and robust business logic provide a strong foundation for future growth and innovation.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default AngelMonkeyCaseStudy;
