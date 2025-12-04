import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Layers, Server, ShoppingCart, Star, Smartphone, Info } from 'lucide-react';

const features = [
  {
    icon: <Globe size={28} className="text-primary" />,
    title: 'Dynamic Travel Packages',
    desc: 'Create, update, and manage travel packages with destinations, pricing, itineraries, and images.'
  },
  {
    icon: <Layers size={28} className="text-primary" />,
    title: 'Dynamic Content Management',
    desc: 'Admin panel for updating web content, banners, and blogs without code changes.'
  },
  {
    icon: <Users size={28} className="text-primary" />,
    title: 'Role-Based Access',
    desc: 'Admin, Agent, and Customer roles with secure, permission-based access to features.'
  },
  {
    icon: <Server size={28} className="text-primary" />,
    title: 'Booking System',
    desc: 'Customers can book packages, view status, and manage their bookings online.'
  },
  {
    icon: <Smartphone size={28} className="text-primary" />,
    title: 'Mobile Friendly',
    desc: 'Responsive UI for seamless experience on all devices.'
  },
  {
    icon: <Info size={28} className="text-primary" />,
    title: 'Content Pages',
    desc: 'FAQs, About, and travel guides for transparency and customer support.'
  }
];

const stats = [
  { label: 'Packages', value: '100+', icon: <Globe size={20} className="text-cyan-400" /> },
  { label: 'Bookings', value: '5,000+', icon: <ShoppingCart size={20} className="text-primary" /> },
  { label: 'Avg. Rating', value: '4.8/5', icon: <Star size={20} className="text-yellow-400" /> },
  { label: 'Active Users', value: '2,000+', icon: <Users size={20} className="text-fuchsia-500" /> },
];

const TripatakalandCaseStudy: React.FC = () => {
  return (
    <div className="bg-background min-h-screen text-text selection:bg-primary/30 selection:text-white">
      <section className="pt-32 pb-20 px-4 md:px-0 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6 text-center"
        >
          Tripatakaland Travels: <span className="text-primary">Dynamic Travel Platform</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-text-muted text-center max-w-2xl mx-auto mb-10">
          Tripatakaland Travels is a modern travel agency platform for creating, managing, and booking dynamic travel packages. The admin panel enables real-time content updates and role-based access for admins, agents, and customers.
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
            <li>Enable dynamic creation and management of travel packages and content.</li>
            <li>Provide a seamless booking experience for customers.</li>
            <li>Empower admins and agents with secure, role-based access to manage offerings.</li>
            <li>Deliver a mobile-friendly, modern, and informative user experience.</li>
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
            <li>Frontend: Angular, Tailwind CSS, Lucide Icons</li>
            <li>Backend/API: Laravel, RESTful APIs, MySQL</li>
            <li>State Management: Angular services, RxJS</li>
            <li>Admin Panel: Role-based dashboard for managing packages, content, and bookings.</li>
            <li>Deployment: AWS (EC2, S3, CloudFront, RDS) for scalable, secure, and high-availability hosting. CI/CD pipelines for automated deployments.</li>
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
            <li><span className="font-semibold text-text">Scalability:</span> Modularized codebase and dynamic admin tools for managing a large, evolving package catalog.</li>
            <li><span className="font-semibold text-text">Performance:</span> Fast search, responsive UI, and efficient booking management.</li>
            <li><span className="font-semibold text-text">User Trust:</span> Transparent travel information, secure bookings, and privacy-focused data handling.</li>
            <li><span className="font-semibold text-text">Customer Experience:</span> Mobile-first design, easy package discovery, and personalized recommendations.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Results & Impact</h2>
          <ul className="list-disc pl-6 text-lg text-text-muted space-y-2">
            <li><span className="font-semibold text-text">Growth:</span> 100+ packages, 5,000+ bookings in the first year.</li>
            <li><span className="font-semibold text-text">Brand Trust:</span> 4.8/5 average rating, strong customer engagement.</li>
            <li><span className="font-semibold text-text">Recognition:</span> Recognized as an innovative travel platform in 2025.</li>
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
            Tripatakaland Travels demonstrates how a tech-driven, user-first approach can make travel planning, booking, and content management seamless for both customers and administrators. The platform’s dynamic admin panel and scalable infrastructure provide a strong foundation for future growth and innovation in the travel industry.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default TripatakalandCaseStudy;
