import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, MapPin, Bell, Users, Star, Clock, Database, Server, Smartphone, Leaf, Info, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <Leaf size={28} className="text-primary" />,
    title: 'Plant Catalog',
    desc: 'Wide range of indoor and outdoor plants, organized by type, care, and benefits.'
  },
  {
    icon: <Info size={28} className="text-primary" />,
    title: 'Air Quality Test',
    desc: 'Users can request air quality tests and get plant recommendations for their environment.'
  },
  {
    icon: <Users size={28} className="text-primary" />,
    title: 'User Accounts',
    desc: 'Registration, login, and profile management for plant lovers.'
  },
  {
    icon: <Database size={28} className="text-primary" />,
    title: 'Dynamic Plant Management',
    desc: 'Admin panel to manage plant catalog, content, and air quality test requests dynamically.'
  },
  {
    icon: <Smartphone size={28} className="text-primary" />,
    title: 'Mobile Friendly',
    desc: 'Optimized for mobile users to browse and request services easily.'
  },
  {
    icon: <Info size={28} className="text-primary" />,
    title: 'Content Pages',
    desc: 'FAQs, About, and plant care guides for transparency and education.'
  }
];

const stats = [
  { label: 'Plant Types', value: '150+', icon: <Leaf size={20} className="text-green-500" /> },
  { label: 'Air Quality Tests', value: '2,000+', icon: <Info size={20} className="text-cyan-400" /> },
  { label: 'Avg. Rating', value: '4.9/5', icon: <Star size={20} className="text-yellow-400" /> },
  { label: 'Active Users', value: '5,000+', icon: <Users size={20} className="text-fuchsia-500" /> },
];

const PlationAtHomeCaseStudy: React.FC = () => {
  return (
    <div className="bg-background min-h-screen text-text selection:bg-primary/30 selection:text-white">
      <section className="pt-32 pb-20 px-4 md:px-0 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6 text-center"
        >
          Plantation At Home: <span className="text-primary">Plant Discovery Platform</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-text-muted text-center max-w-2xl mx-auto mb-10">
          Plantation At Home is a modern web platform for discovering and learning about indoor and outdoor plants. Users can browse a dynamic catalog, request air quality tests, and access plant care guides. The admin panel enables dynamic management of plant data and content. (No direct selling is enabled on the platform.)
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
            <li>Promote awareness and education about indoor and outdoor plants.</li>
            <li>Enable users to discover the best plants for their environment and needs.</li>
            <li>Provide air quality testing and personalized plant recommendations.</li>
            <li>Allow dynamic management of plant catalog and content via admin panel.</li>
            <li>Deliver a seamless, mobile-friendly, and informative user experience.</li>
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
            <li>Frontend: React, Tailwind CSS, Lucide Icons</li>
            <li>Backend/API: Node.js, Express for API and admin panel</li>
            <li>State Management: React hooks, context, React Query</li>
            <li>Admin Panel: Dynamic dashboard for managing plant catalog, content, and air quality test requests. No direct selling or payment integration.</li>
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
            <li><span className="font-semibold text-text">Scalability:</span> Modularized codebase and dynamic admin tools for managing a large, evolving plant catalog.</li>
            <li><span className="font-semibold text-text">Performance:</span> Fast plant search, responsive UI, and efficient air quality test request handling.</li>
            <li><span className="font-semibold text-text">User Trust:</span> Transparent plant care information, no direct selling, and privacy-focused data handling.</li>
            <li><span className="font-semibold text-text">Customer Experience:</span> Mobile-first design, easy plant discovery, and personalized air quality recommendations.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Results & Impact</h2>
          <ul className="list-disc pl-6 text-lg text-text-muted space-y-2">
            <li><span className="font-semibold text-text">Growth:</span> 150+ plant types, 2,000+ air quality tests requested in the first year.</li>
            <li><span className="font-semibold text-text">Brand Trust:</span> 4.9/5 average rating, strong plant community engagement.</li>
            <li><span className="font-semibold text-text">Recognition:</span> Recognized as an innovative plant discovery and education platform in 2024.</li>
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
            Plantation At Home demonstrates how a tech-driven, user-first approach can make plant discovery, education, and air quality improvement accessible to everyone. The platform’s dynamic admin panel and cloud infrastructure provide a strong foundation for future growth and innovation in the plant care space.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default PlationAtHomeCaseStudy;
