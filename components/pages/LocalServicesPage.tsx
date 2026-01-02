import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Star, Users, Code, Smartphone, Globe, Database, Cloud } from 'lucide-react';
import SEO from '../SEO';

const LocalServicesPage: React.FC = () => {
  const localServices = [
    {
      title: "Web Development Gaya",
      description: "Professional website development services in Gaya, Bihar. Custom React, Next.js, and full-stack solutions for local businesses.",
      icon: Globe,
      keywords: ["web development gaya", "website design gaya bihar"]
    },
    {
      title: "Software Engineering Bodhgaya", 
      description: "Expert software engineering services in Bodhgaya. Custom software solutions, database design, and system architecture.",
      icon: Code,
      keywords: ["software engineer bodhgaya", "custom software bodhgaya"]
    },
    {
      title: "Mobile App Development Bihar",
      description: "Cross-platform mobile app development for businesses across Bihar. React Native and Flutter solutions.",
      icon: Smartphone,
      keywords: ["mobile app developer bihar", "app development gaya"]
    },
    {
      title: "Database Solutions Gaya",
      description: "Professional database design and management services in Gaya. MySQL, MongoDB, and cloud database solutions.",
      icon: Database,
      keywords: ["database developer gaya", "mysql developer bihar"]
    },
    {
      title: "Cloud Services Bihar",
      description: "AWS, Azure, and Google Cloud deployment services for businesses in Bihar. Scalable cloud infrastructure.",
      icon: Cloud,
      keywords: ["cloud services bihar", "aws developer gaya"]
    }
  ];

  const localTestimonials = [
    {
      name: "Rajesh Kumar",
      business: "Kumar Enterprises, Gaya",
      text: "Excellent web development services! Vishwjeet created a professional website for our business in Gaya. Highly recommended for local businesses.",
      rating: 5
    },
    {
      name: "Priya Singh",
      business: "Bodhgaya Tourism Services",
      text: "Outstanding software solutions for our tourism business in Bodhgaya. Professional, timely, and cost-effective services.",
      rating: 5
    },
    {
      name: "Amit Sharma",
      business: "Bihar Tech Solutions",
      text: "Best web developer in Bihar! Created our complete digital presence with modern technology stack.",
      rating: 5
    }
  ];

  const serviceAreas = [
    "Gaya", "Bodhgaya", "Patna", "Muzaffarpur", "Bhagalpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai"
  ];

  return (
    <>
      <SEO
        title="Web Developer Gaya Bihar | Software Engineer Bodhgaya | IT Services"
        description="Top-rated web developer and software engineer serving Gaya, Bodhgaya, and Bihar. Professional web development, custom software solutions, and IT services for local businesses. Expert React, Next.js, and full-stack development."
        keywords={[
          'web developer gaya',
          'software engineer bodhgaya', 
          'web agency gaya bihar',
          'website development gaya',
          'software company bodhgaya',
          'IT services bihar',
          'full stack developer bihar',
          'web design gaya',
          'custom software gaya',
          'digital marketing bihar'
        ]}
        url="https://vishwjeetkumar.me/services/local-bihar"
        type="website"
      />

      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6">
              Top Web Developer in <span className="text-primary">Gaya, Bihar</span>
            </h1>
            <p className="text-xl text-text-muted max-w-4xl mx-auto mb-8">
              Professional web development and software engineering services serving Gaya, Bodhgaya, and entire Bihar state. 
              Expert full-stack solutions for local businesses with modern technology stack.
            </p>
            
            {/* Local Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin size={20} className="text-primary" />
                <span>Serving Gaya, Bodhgaya, Bihar</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Phone size={20} className="text-primary" />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Mail size={20} className="text-primary" />
                <span>info.vishwjeetkumar@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Local Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-display font-bold text-text text-center mb-12">
              Professional IT Services in Bihar
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {localServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-surface border border-text/10 rounded-lg p-6 hover:border-primary/30 transition-all"
                >
                  <service.icon size={40} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-text mb-3">{service.title}</h3>
                  <p className="text-text-muted mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.keywords.map((keyword, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Local Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-display font-bold text-text text-center mb-12">
              What Local Clients Say
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {localTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-surface border border-text/10 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-text-muted mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-text">{testimonial.name}</p>
                    <p className="text-sm text-text-muted">{testimonial.business}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-display font-bold text-text text-center mb-12">
              Areas We Serve in Bihar
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {serviceAreas.map((area, index) => (
                <div key={index} className="text-center p-4 bg-surface border border-text/10 rounded-lg">
                  <MapPin size={24} className="text-primary mx-auto mb-2" />
                  <p className="font-semibold text-text">{area}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Local CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-primary/10 to-violet-500/10 rounded-lg p-12"
          >
            <h2 className="text-3xl font-display font-bold text-text mb-6">
              Ready to Grow Your Business in Bihar?
            </h2>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Get professional web development and software engineering services tailored for businesses in Gaya, Bodhgaya, and across Bihar.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Free Consultation
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LocalServicesPage;