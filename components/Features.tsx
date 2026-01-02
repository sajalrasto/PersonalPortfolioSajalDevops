import React from 'react';
import { motion } from 'framer-motion';
import Hourglass3D from './Hourglass3D';
import { Calendar, Code, Zap, Shield, Globe, Database } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      number: '1',
      title: 'Seamless Calendar Synchronization',
      description: 'Automatically sync bookings with google, outlook, or icalendar to avoid overlaps and keep your schedule organized.',
      icon: Calendar,
    },
    {
      number: '2',
      title: 'Full-Stack Development',
      description: 'End-to-end development solutions from frontend to backend, ensuring seamless integration and optimal performance.',
      icon: Code,
    },
    {
      number: '3',
      title: 'Lightning Fast Performance',
      description: 'Optimized applications with cutting-edge technologies for blazing fast load times and smooth user experiences.',
      icon: Zap,
    },
    {
      number: '4',
      title: 'Enterprise Security',
      description: 'Bank-level security protocols and best practices to protect your data and ensure compliance with industry standards.',
      icon: Shield,
    },
    {
      number: '5',
      title: 'Global Scalability',
      description: 'Build applications that scale effortlessly across multiple regions and handle millions of users without breaking a sweat.',
      icon: Globe,
    },
    {
      number: '6',
      title: 'Database Optimization',
      description: 'Advanced database architectures and query optimization for handling complex data operations with maximum efficiency.',
      icon: Database,
    },
  ];

  return (
    <section className="py-32 px-6 relative bg-black overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-semibold border border-white/10">
              Features
            </span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-display font-bold text-white leading-tight"
            >
              Explore powerful features <br/>
              and capabilities.
            </motion.h2>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Small Hourglass in bottom left */}
          <div className="hidden lg:block absolute -bottom-32 -left-20 opacity-30">
            <Hourglass3D size="small" />
          </div>

          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gray-900 border border-white/10 hover:border-yellow-400/30 transition-all group"
              >
                {/* Logo */}
                <div className="mb-6">
                  <span className="text-yellow-400 font-bold text-2xl">V.</span>
                </div>

                {/* Feature Number and Title */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.number}. {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Icon */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <Icon className="text-yellow-400" size={24} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;


