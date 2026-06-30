import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Bell, Shield, Database, Server, BarChart2, Info, UserCheck, UserPlus, MessageCircle, Cloud, Key, ClipboardList, FileText, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <UserPlus size={28} className="text-primary" />,
    title: 'Student Admission & Follow-up',
    desc: 'Streamlined admission process with automated follow-ups, document uploads, and status tracking.'
  },
  {
    icon: <ClipboardList size={28} className="text-primary" />,
    title: 'Student Lifecycle Management',
    desc: 'Manage student data from admission to graduation or return, including transfers and leaves.'
  },
  {
    icon: <Bell size={28} className="text-primary" />,
    title: 'Real-time Notifications',
    desc: 'Students and staff receive instant updates on admissions, results, events, and support tickets.'
  },
  {
    icon: <BookOpen size={28} className="text-primary" />,
    title: 'Academic Records & Results',
    desc: 'Grade management, exam scheduling, and real-time result publishing.'
  },
  {
    icon: <MessageCircle size={28} className="text-primary" />,
    title: 'Support System',
    desc: 'Integrated helpdesk for students and staff, with ticketing and chat support.'
  },
  {
    icon: <Shield size={28} className="text-primary" />,
    title: 'Role-based Access',
    desc: 'Granular permissions for admin, faculty, students, and support staff.'
  },
  {
    icon: <Users size={28} className="text-primary" />,
    title: 'Student Dashboard',
    desc: 'Personalized dashboard with notifications, results, attendance, and resources.'
  },
  {
    icon: <BarChart2 size={28} className="text-primary" />,
    title: 'Analytics & Reporting',
    desc: 'Comprehensive analytics for admissions, academics, and support.'
  },
  {
    icon: <Cloud size={28} className="text-primary" />,
    title: 'Cloud Storage',
    desc: 'AWS S3 for secure document and record storage.'
  },
  {
    icon: <Key size={28} className="text-primary" />,
    title: 'Secure Authentication',
    desc: 'Multi-factor authentication and secure login for all users.'
  },
  {
    icon: <Info size={28} className="text-primary" />,
    title: 'Content Pages',
    desc: 'FAQs, About, and policy pages for transparency.'
  }
];

const stats = [
  { label: 'Students Managed', value: '10,000,0+', icon: <Users size={20} className="text-fuchsia-500" /> },
  { label: 'Admissions/Year', value: '20,000+', icon: <UserPlus size={20} className="text-primary" /> },
  { label: 'Avg. Response Time', value: '200 ms ', icon: <MessageCircle size={20} className="text-cyan-400" /> },
  { label: 'Active Roles', value: '6+', icon: <Shield size={20} className="text-green-500" /> },
];

const CMSCaseStudy: React.FC = () => {
  return (
    <div className="bg-background min-h-screen text-text selection:bg-primary/30 selection:text-white">
      <section className="pt-32 pb-20 px-4 md:px-0 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6 text-center"
        >
          CMS: <span className="text-primary">College Management System</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-text-muted text-center max-w-2xl mx-auto mb-10">
          CMS is a robust college management platform covering the entire student lifecycle—from admission and follow-up to graduation or return. It features real-time notifications, a support system, role-based access, and a dynamic student dashboard, all built for modern educational needs.
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
            <li>Digitize and automate the entire student lifecycle.</li>
            <li>Enable real-time communication and support for students and staff.</li>
            <li>Ensure secure, role-based access for all stakeholders.</li>
            <li>Provide actionable analytics for administration and faculty.</li>
            <li>Deliver a seamless, mobile-friendly, and scalable experience.</li>
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
            <li>Frontend: Angular for dynamic, component-driven UI</li>
            <li>Backend/API: Node.js for business logic and REST APIs</li>
            <li>Database: MySQL for structured data, Redis for caching and notifications</li>
            <li>Admin Panel: Role-based dashboard for managing admissions, academics, and support</li>
            <li>Cloud: AWS CLI, S3 for storage, EC2 for hosting, scalable and secure infrastructure</li>
            <li>Other: Real-time notifications, secure authentication, CI/CD pipelines</li>
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
            <li><span className="font-semibold text-text">Scalability:</span> Modular architecture and cloud deployment for handling thousands of students and staff.</li>
            <li><span className="font-semibold text-text">Performance:</span> Real-time notifications, fast search, and optimized queries with Redis caching.</li>
            <li><span className="font-semibold text-text">Security:</span> Role-based access, secure authentication, and encrypted data storage.</li>
            <li><span className="font-semibold text-text">User Experience:</span> Mobile-friendly dashboards, instant support, and personalized notifications.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Results & Impact</h2>
          <ul className="list-disc pl-6 text-lg text-text-muted space-y-2">
            <li><span className="font-semibold text-text">Growth:</span> 10,000+ students managed, 2,000+ admissions/year, 6+ active roles.</li>
            <li><span className="font-semibold text-text">Efficiency:</span> Reduced manual workload, faster admissions, and improved student satisfaction.</li>
            <li><span className="font-semibold text-text">Recognition:</span> Recognized as a leading digital solution for college management in 2024.</li>
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
            CMS (College Management System) demonstrates how technology can transform educational administration, student engagement, and academic outcomes. Its modular, cloud-based architecture and real-time features set a new standard for digital campus solutions.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default CMSCaseStudy;
