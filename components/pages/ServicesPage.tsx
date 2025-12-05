import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import SEO from '../SEO';
import {
    Code2,
    ShoppingCart,
    Globe,
    Server,
    Smartphone,
    UserCircle,
    Zap,
    Shield,
    Target,
    MessageSquare,
    Sparkles,
    CheckCircle,
    ArrowRight,
    Clock,
    DollarSign,
    TrendingUp,
    Users,
    Award,
    ChevronDown,
    Mail,
    Phone,
    Linkedin,
    CheckSquare,
    Bug,
    FileText,
    Calendar,
    Eye,
    Search,
    RefreshCw,
    Box
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import SpotlightCard from '../ui/SpotlightCard';

// Optimized Service Card Component with React.memo
interface ServiceCardProps {
    service: {
        id: number;
        icon: React.ReactNode;
        title: string;
        description: string;
        tech: string[];
    };
    index: number;
}

const ServiceCard = React.memo(({ service, index }: ServiceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
            style={{ isolation: 'isolate', willChange: 'transform' }}
        >
            {/* Optimized: Single shadow effect instead of multiple */}
            <div className="absolute bottom-0 left-0 right-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[-1] overflow-hidden rounded-b-2xl" style={{
                background: 'radial-gradient(ellipse 80% 100% at center bottom, rgba(6, 182, 212, 0.15) 0%, rgba(56, 189, 248, 0.1) 40%, transparent 70%)',
                filter: 'blur(10px)',
                transform: 'translateY(50%)',
                willChange: 'opacity',
            }} />

            <div className="relative h-full p-6 md:p-8 rounded-2xl bg-surface/80 dark:bg-surface/50 backdrop-blur-md border border-text/10 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 transition-all duration-300 overflow-hidden group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),0_0_0_1px_rgba(6,182,212,0.1)] dark:group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]">
                
                {/* Simplified background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-sky-400/0 to-cyan-300/0 group-hover:from-cyan-500/5 group-hover:via-sky-400/5 group-hover:to-cyan-300/5 transition-all duration-300 pointer-events-none" />

                {/* Service Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 via-sky-400/20 to-cyan-300/20 border border-cyan-500/50 dark:border-cyan-500/30 flex items-center justify-center z-10 shadow-sm">
                    <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {service.id}
                    </span>
                </div>

                {/* Icon Container */}
                <div className="mb-6 relative">
                    <div className="relative w-14 h-14 rounded-xl bg-surface border border-text/20 dark:border-white/10 flex items-center justify-center text-text shadow-md dark:shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-sky-400/20 to-cyan-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        <div className="relative z-10">
                            {service.icon}
                        </div>
                    </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-3 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-sky-400 group-hover:to-cyan-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'white' }}>
                    {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6">
                    {service.description}
                </p>

                {/* Tech Stack Tags - Optimized: CSS transitions instead of motion */}
                <div className="flex flex-wrap gap-2">
                    {service.tech.map((tech) => (
                        <span 
                            key={tech}
                            className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/15 via-sky-400/15 to-cyan-300/15 dark:from-cyan-500/10 dark:via-sky-400/10 dark:to-cyan-300/10 border border-cyan-500/40 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-xs font-mono rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/25 hover:via-sky-400/25 hover:to-cyan-300/25 dark:hover:from-cyan-500/20 dark:hover:via-sky-400/20 dark:hover:to-cyan-300/20 hover:border-cyan-500/60 dark:hover:border-cyan-400/40 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Simplified hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(56, 189, 248, 0.2)',
                    willChange: 'opacity',
                }} />
            </div>
        </motion.div>
    );
});

ServiceCard.displayName = 'ServiceCard';

const ServicesPage: React.FC = () => {
        const containerRef = useRef<HTMLDivElement>(null);
        const servicesSectionRef = useRef<HTMLDivElement>(null);
        const [selectedDate, setSelectedDate] = useState<number | null>(null);

    // Scroll-based animations for Services section
    const { scrollYProgress: servicesScrollYProgress } = useScroll({
        target: servicesSectionRef,
        offset: ["start end", "end start"]
    });

    // Optimized: Reduced from 4 layers to 2 for better performance
    const layer2Y = useTransform(servicesScrollYProgress, [0, 1], [120, -60]);
    const layer2Opacity = useTransform(servicesScrollYProgress, [0, 0.3, 0.7, 1], [0, 0.2, 0.2, 0]);
    const layer2Scale = useTransform(servicesScrollYProgress, [0, 1], [0.95, 1.05]);

    const layer1Y = useTransform(servicesScrollYProgress, [0, 1], [60, -30]);
    const layer1Opacity = useTransform(servicesScrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.3, 0]);
    const layer1Scale = useTransform(servicesScrollYProgress, [0, 1], [0.97, 1.03]);

    // Content animation - simplified
    const contentY = useTransform(servicesScrollYProgress, [0, 0.5, 1], [80, 0, -30]);
    const contentOpacity = useTransform(servicesScrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.9]);

    // Get current date dynamically
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    const currentMonthName = now.toLocaleDateString('en-US', { month: 'long' });
    const currentMonthShort = now.toLocaleDateString('en-US', { month: 'short' });

    // Generate calendar days for current month
    const getCalendarDays = () => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Adjust to Monday as first day (0 = Monday)
        const adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
        
        const days: Array<{ day: number | null; isToday: boolean; hasMilestone: any }> = [];
        
        // Add empty cells for days before month starts
        for (let i = 0; i < adjustedStart; i++) {
            days.push({ day: null, isToday: false, hasMilestone: null });
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                isToday: day === currentDay,
                hasMilestone: getMilestoneForDay(day)
            });
        }
        
        // Fill remaining cells to make 35 total (5 weeks)
        while (days.length < 35) {
            days.push({ day: null, isToday: false, hasMilestone: null });
        }
        
        return days;
    };

    // Get milestone for a specific day
    const getMilestoneForDay = (day: number) => {
        const milestones: { [key: number]: { phase: string; deep: boolean; details: string } } = {
            1: { 
                phase: "Discovery", 
                deep: true,
                details: "Project discovery phase begins. We'll analyze requirements, gather stakeholder input, and define project scope. This phase includes user research, competitive analysis, and technical feasibility studies."
            },
            6: { 
                phase: "Planning", 
                deep: true,
                details: "Detailed project planning phase. We'll create wireframes, user flows, technical architecture, and project timeline. Resource allocation and team assignments will be finalized."
            },
            12: { 
                phase: "Development", 
                deep: true,
                details: "Active development phase starts. Our team will build core features, implement APIs, create database schemas, and develop frontend components. Daily standups and code reviews ensure quality."
            },
            15: { 
                phase: "Dev Sprint 2", 
                deep: true,
                details: "Second development sprint begins. Focus on advanced features, integrations, and performance optimization. Testing and bug fixes run parallel to development."
            },
            25: { 
                phase: "Deployment", 
                deep: true,
                details: "Deployment phase initiates. We'll set up production environments, configure CI/CD pipelines, perform security audits, and prepare for launch. Final testing and staging deployment."
            },
            27: { 
                phase: "Celebration 🎉", 
                deep: true,
                details: "Project Celebration day! Final production deployment, monitoring setup, and go-live activities. Post-launch support and monitoring begin immediately."
            }
        };
        return milestones[day] || null;
    };

    // Get details for selected date
    const getDateDetails = (day: number) => {
        const milestone = getMilestoneForDay(day);
        if (milestone) {
            return {
                title: milestone.phase,
                description: milestone.details,
                date: `${currentMonthName} ${day}, ${currentYear}`
            };
        }
        return {
            title: `Day ${day}`,
            description: `This is day ${day} of ${currentMonthName} ${currentYear}. No specific milestone scheduled for this date.`,
            date: `${currentMonthName} ${day}, ${currentYear}`
        };
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -100]), { stiffness: 100, damping: 30 });
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 0.8]), { stiffness: 100, damping: 30 });

    // Services data
    const services = [
        {
            id: 1,
            icon: <Sparkles size={32} />,
            title: "Full-Stack Website Development",
            description: "End-to-end web solutions using React, Next.js, Angular, and robust Laravel/Node.js backend architectures.",
            tech: ["React", "Next.js", "Laravel", "Node.js"],
            color: "from-cyan-500/20 to-blue-500/20",
            borderColor: "primary"
        },
        {
            id: 2,
            icon: <ShoppingCart size={32} />,
            title: "E-commerce Systems",
            description: "Scalable online stores with secure payment gateways, inventory management, and admin dashboards.",
            tech: ["Next.js", "Laravel", "MySQL", "AWS"],
            color: "from-green-500/20 to-emerald-500/20",
            borderColor: "green-500"
        },
        {
            id: 3,
            icon: <Code2 size={32} />,
            title: "Custom Web Applications",
            description: "Tailored SaaS products and internal tools designed for specific business needs with scalable architecture.",
            tech: ["Angular", "Spring Boot", "PostgreSQL"],
            color: "from-cyan-500/20 via-sky-400/20 to-cyan-300/20",
            borderColor: "cyan-500"
        },
        {
            id: 4,
            icon: <Server size={32} />,
            title: "API & Backend Development",
            description: "High-performance REST & GraphQL APIs built with Node.js, Laravel, or Spring Boot with comprehensive documentation.",
            tech: ["Node.js", "Laravel", "Java", "Docker"],
            color: "from-orange-500/20 to-amber-500/20",
            borderColor: "orange-500"
        },
        {
            id: 5,
            icon: <Smartphone size={32} />,
            title: "Mobile-Friendly Development",
            description: "Responsive web applications that work seamlessly across all devices with progressive web app capabilities.",
            tech: ["React", "Tailwind", "PWA"],
            color: "from-pink-500/20 to-rose-500/20",
            borderColor: "pink-500"
        },
        {
            id: 6,
            icon: <UserCircle size={32} />,
            title: "Personal Portfolio Websites",
            description: "Showcasing individual skills, projects, and experiences through custom-designed, animated websites.",
            tech: ["Next.js", "Framer Motion", "3D CSS"],
            color: "from-cyan-500/20 via-sky-400/20 to-cyan-300/20",
            borderColor: "green-500"
        }
    ];

    // Pricing packages (India pricing)
    const packages = [
        {
            name: "Starter",
            price: "₹5,000",
            period: "onwards",
            description: "Perfect for personal projects and small businesses",
            features: [
                "Personal Portfolio/Landing Page",
                "Responsive Design",
                "Basic SEO Optimization",
                "Contact Form Integration",
                "2-3 Weeks Delivery",
                "15 Days Support"
            ],
            highlighted: false,
            color: "from-cyan-500/10 to-blue-500/10"
        },
        {
            name: "Business",
            price: "₹1,50,000",
            period: "onwards",
            description: "Ideal for growing businesses and e-commerce",
            features: [
                "E-commerce Platform/Web App",
                "Admin Dashboard",
                "Payment Gateway Integration",
                "Database Design & APIs",
                "4-8 Weeks Delivery",
                "30 Days Support",
                "AWS/Cloud Deployment"
            ],
            highlighted: true,
            color: "from-primary/20 to-sky-400/20"
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "quote",
            description: "For large-scale systems and complex requirements",
            features: [
                "Full-Stack Enterprise Solution",
                "Microservices Architecture",
                    "Advanced Security Features",
                    "Third-party Integrations",
                    "Custom Timeline",
                "Dedicated Support",
                "Complete Documentation",
                "Team Training"
            ],
            highlighted: false,
            color: "from-cyan-500/10 to-sky-400/10"
        }
    ];



    return (
        <>
            <SEO
                title="Full Stack Development Services | Software Engineer Freelance | Hire Expert Developer"
                description="Hire an experienced Full Stack Developer and Software Engineer Freelance. Expert in React, Next.js, TypeScript, Node.js. Custom web applications, e-commerce solutions, and scalable software development. Why choose experienced developer over AI? Get professional, tailored solutions."
                url={typeof window !== 'undefined' ? window.location.href : 'https://vishwjeetkumar.me/services'}
                keywords={[
                    'Software Engineer Freelance',
                    'Freelance Software Engineer',
                    'Hire Full Stack Developer',
                    'Hire Software Engineer',
                    'Freelance Full Stack Developer',
                    'Full Stack Development Services',
                    'React Developer',
                    'Next.js Developer',
                    'TypeScript Developer',
                    'Web Development Services',
                    'Custom Web Development',
                    'E-commerce Development',
                    'API Development',
                    'Backend Development',
                    'Frontend Development',
                    'Experienced Developer',
                    'Professional Developer',
                    'Why Hire Developer',
                    'Developer vs AI',
                    'Expert Developer'
                ]}
                breadcrumbs={[
                    { name: 'Home', url: 'https://vishwjeetkumar.me/' },
                    { name: 'Services', url: 'https://vishwjeetkumar.me/services' }
                ]}
                faq={[
                    {
                        question: 'Why should you hire an experienced Full Stack Developer?',
                        answer: 'Hiring an experienced Full Stack Developer ensures you get proven expertise in React, Next.js, TypeScript, Node.js, and modern web technologies. Experienced developers bring real-world problem-solving skills, best practices, code quality, performance optimization, security expertise, and the ability to deliver scalable, maintainable solutions that meet your specific business needs and deadlines.'
                    },
                    {
                        question: 'Why is an experienced software engineer freelance better than AI for development?',
                        answer: 'While AI tools are helpful assistants, experienced freelance software engineers provide critical thinking, creative problem-solving, understanding of business context, strategic technical decisions, debugging complex issues, security best practices, code architecture, and human communication. Experienced developers adapt to unique requirements, make strategic decisions, ensure long-term maintainability, and align projects with business goals - capabilities AI cannot replicate.'
                    },
                    {
                        question: 'What makes a freelance software engineer better than AI development tools?',
                        answer: 'A freelance software engineer offers personalized solutions tailored to your business, understands specific requirements, provides ongoing support and maintenance, makes strategic technical decisions, ensures code quality and maintainability, handles edge cases and complex scenarios, delivers human-centered design, and provides direct communication. Unlike AI tools that generate generic code, experienced developers create custom solutions with proper architecture, security, scalability, and business alignment.'
                    },
                    {
                        question: 'Should I hire a software engineer freelance or use AI development tools?',
                        answer: 'For production-ready, scalable, and maintainable software, hiring an experienced freelance software engineer is essential. AI tools are great for learning and prototyping, but experienced developers provide strategic thinking, business understanding, code quality, security, performance optimization, and long-term support. For critical business applications, an experienced developer ensures your project succeeds and scales with your business needs.'
                    }
                ]}
            />
            <div ref={containerRef} className="bg-background min-h-screen text-text selection:bg-primary/30">
            
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-32 overflow-hidden">
                
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50" />
                    <div className="absolute top-[20%] right-0 w-[600px] h-[400px] bg-sky-400/10 blur-[100px] rounded-full" />
                    
                    {/* Animated Particles */}
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/40 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 dark:bg-surface/50 backdrop-blur-md border border-text/20 dark:border-white/10 mb-8 shadow-sm"
                    >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-text-muted">Available for new projects</span>
                    </motion.div>

                    {/* Hero Text */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-text leading-[1.1] tracking-tighter mb-6"
                    >
                        Transform Your Ideas<br />
                        Into <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Reality</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-xl text-text-muted max-w-3xl mx-auto mb-10 px-4"
                    >
                        Full-stack development services for businesses of all sizes. From e-commerce platforms to 
                        enterprise solutions, I bring your vision to life with <span className="text-primary font-semibold">cutting-edge technology</span>.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12"
                    >
                        {[
                            { value: "20+", label: "Projects Delivered" },
                            { value: "90%", label: "Client Satisfaction" },
                            { value: "5+", label: "Years Experience" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-xs md:text-sm text-text-muted font-mono uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <MagneticButton className="h-14 px-8 bg-primary text-black hover:bg-white font-bold text-base flex items-center gap-2" onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}>
                            <Mail size={20} /> Start Your Project
                        </MagneticButton>
                        <button 
                            onClick={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })}
                            className="h-14 px-8 rounded-full border border-text/20 text-text hover:bg-text/5 font-medium transition-colors flex items-center gap-2"
                        >
                            Explore Services <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2 text-text-muted"
                    >
                        <span className="text-xs font-mono uppercase tracking-wider">Scroll to explore</span>
                        <ChevronDown size={20} />
                    </motion.div>
                </motion.div>
            </section>

            {/* Services Grid - Modern Redesign */}
            <section ref={servicesSectionRef} id="services-grid" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
                    {/* Optimized: Simplified background - static gradients instead of animated */}
                <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-background" />
                        {/* Static gradient orbs - no animation for better performance */}
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/8 rounded-full blur-3xl" />
                    </div>

                {/* Optimized: Reduced to 2 layers for better performance */}
                {/* Card Layer 2 - Background */}
                    <motion.div
                    style={{
                        y: layer2Y,
                        opacity: layer2Opacity,
                        scale: layer2Scale,
                        rotate: -1.5,
                        willChange: 'transform, opacity',
                    }}
                    className="absolute inset-0 pointer-events-none z-[1] rounded-3xl bg-gradient-to-br from-cyan-500/12 via-sky-400/12 to-cyan-300/12 border border-cyan-500/15 dark:border-white/8"
                />
                
                {/* Card Layer 1 - Foreground */}
                    <motion.div
                    style={{
                        y: layer1Y,
                        opacity: layer1Opacity,
                        scale: layer1Scale,
                        rotate: 1,
                        willChange: 'transform, opacity',
                    }}
                    className="absolute inset-0 pointer-events-none z-[1] rounded-3xl bg-gradient-to-br from-cyan-500/18 via-sky-400/18 to-cyan-300/18 border border-cyan-500/20 dark:border-white/12 backdrop-blur-sm"
                />

                <motion.div 
                    className="w-full mx-auto relative z-10 px-4 md:px-6 lg:px-8"
                    style={{
                        y: contentY,
                        opacity: contentOpacity,
                    }}
                >
                    
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16 relative z-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/15 via-sky-400/15 to-cyan-300/15 dark:from-cyan-500/10 dark:via-sky-400/10 dark:to-cyan-300/10 border border-cyan-500/40 dark:border-cyan-500/20 mb-6 backdrop-blur-sm shadow-sm"
                        >
                            <Sparkles size={14} className="text-cyan-400" />
                            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">What I Build</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 relative z-20">
                            <span className="text-text">Services That </span>
                            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Scale</span>
                        </h2>
                        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto relative z-20">
                            Professional development solutions built with modern technology
                        </p>
                    </motion.div>

                    {/* Services Grid - Optimized with React.memo pattern */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pb-12 relative z-20">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                            />
                        ))}
                                </div>
                            </motion.div>
            </section>

            {/* How We Work - Process Timeline - HORIZONTAL ROADMAP */}
            <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'linear-gradient(rgba(0,240,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />
                    
                    {/* Radial Glows */}
                    <motion.div
                        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-sky-400/10 blur-[150px] rounded-full"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.5, 0.3, 0.5],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                        }}
                    />
                </div>
                
                <div className="max-w-[1600px] mx-auto relative z-10">
                    
                    {/* Header with Motivational Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/15 via-sky-400/15 to-cyan-300/15 dark:from-cyan-500/10 dark:via-sky-400/10 dark:to-cyan-300/10 border border-cyan-500/40 dark:border-cyan-500/20 mb-6 backdrop-blur-sm shadow-sm"
                        >
                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 rounded-full animate-pulse" />
                            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Project Timeline</span>
                        </motion.div>
                        
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            <span className="text-text">Plan Your Project </span>
                            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Now</span>
                        </h2>
                        <p className="text-lg md:text-xl text-text max-w-3xl mx-auto mb-3 font-medium">
                            It's Never Too Late to Start Your Success Journey
                        </p>
                        <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto">
                            Every great project begins with a single step. Let's map out your path to success.
                        </p>
                    </motion.div>

                    {/* Project Calendar - Full Layout with Sidebar & Schedule */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 md:mb-20 px-4 md:px-8"
                    >
                        <div className="max-w-[1600px] mx-auto flex gap-4 md:gap-6">
                            
                            {/* Left Sidebar - Navigation */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="hidden lg:flex flex-col gap-3 w-16 flex-shrink-0"
                            >
                                <div className="bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 rounded-2xl p-4 flex flex-col gap-3 items-center shadow-xl relative overflow-hidden">
                                    {/* Navigation Icons with Blur Effect */}
                                    {[
                                        { Icon: CheckSquare, label: "Tasks" },
                                        { Icon: Shield, label: "Security" },
                                        { Icon: Bug, label: "Bugs" },
                                        { Icon: FileText, label: "Documents" },
                                        { Icon: Calendar, label: "Calendar", active: true },
                                        { Icon: Eye, label: "View" },
                                        { Icon: Search, label: "Search" },
                                        { Icon: RefreshCw, label: "Sync" },
                                        { Icon: Box, label: "3D View" }
                                    ].map((item, idx) => {
                                        const IconComponent = item.Icon;
                                        const selectedIndex = 4; // Calendar is at index 4
                                        const distance = Math.abs(idx - selectedIndex);
                                        const totalIcons = 9;
                                        const maxDistance = Math.max(selectedIndex, totalIcons - 1 - selectedIndex); // Max distance from center (4)
                                        
                                        // Calculate blur: 0 for selected, smoothly increasing for distance
                                        // Icons at ends get max blur (6px), icons near center (distance 1-2) get less blur
                                        // Selected gets 0 blur
                                        let blurAmount = 0;
                                        if (distance === 0) {
                                            blurAmount = 0; // Selected icon - no blur
                                        } else if (distance === 1) {
                                            blurAmount = 1; // Very close to center - minimal blur
                                        } else if (distance === 2) {
                                            blurAmount = 2.5; // Close to center - light blur
                                        } else if (distance === 3) {
                                            blurAmount = 4; // Medium distance - moderate blur
                                        } else {
                                            blurAmount = 6; // Far from center - max blur
                                        }
                                        
                                        // Calculate opacity: 100% for selected, smoothly decreasing for distance
                                        // Icons at ends get 35% opacity, icons near center get better visibility
                                        // Selected gets 100% opacity
                                        let opacity = 1.0;
                                        if (distance === 0) {
                                            opacity = 1.0; // Selected icon - 100% visible
                                        } else if (distance === 1) {
                                            opacity = 0.85; // Very close to center - 85% visible
                                        } else if (distance === 2) {
                                            opacity = 0.7; // Close to center - 70% visible
                                        } else if (distance === 3) {
                                            opacity = 0.5; // Medium distance - 50% visible
                                        } else {
                                            opacity = 0.35; // Far from center - 35% visible (ends)
                                        }
                                        
                                        return (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ 
                                                    scale: 1.1,
                                                    filter: `blur(${Math.max(0, blurAmount - 1.5)}px)`,
                                                    opacity: Math.min(1, opacity + 0.15)
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white cursor-pointer transition-all duration-300 ${
                                                    item.active 
                                                        ? 'bg-white/20 shadow-lg' 
                                                        : 'hover:bg-white/10'
                                                }`}
                                                style={{
                                                    filter: `blur(${blurAmount}px)`,
                                                    opacity: opacity,
                                                    transition: 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                }}
                                                title={item.label}
                                            >
                                                <IconComponent size={20} />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Main Calendar Container */}
                            <div className="flex-1 p-6 md:p-8 lg:p-12 rounded-3xl bg-white dark:bg-surface backdrop-blur-xl border border-text/20 dark:border-white/10 shadow-2xl overflow-visible flex flex-col">
                            
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-display font-bold text-text mb-2">
                                        Project Timeline
                                    </h3>
                                    <p className="text-base text-text-muted">10-Week Development Calendar</p>
                                </div>
                                <div className="text-right px-6 py-3 rounded-2xl bg-surface/50">
                                    <div className="text-sm text-text-muted mb-1">{currentYear}</div>
                                    <div className="text-2xl font-display font-bold text-text">
                                        {currentMonthShort} {currentDay}
                                    </div>
                                </div>
                            </div>

                            {/* Days of Week Header */}
                            <div className="grid grid-cols-7 gap-2 md:gap-3 lg:gap-4 mb-4">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                    <div key={day} className="text-center text-xs md:text-sm font-bold text-text-muted uppercase tracking-wider">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid Wrapper with Side Dates */}
                            <div className="relative">
                                {/* Left Side Date (Previous Month Last Day) */}
                                {(() => {
                                    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
                                    return (
                                        <div className="absolute -left-8 md:-left-12 lg:-left-14 top-8 md:top-10 hidden md:block">
                                            <div className="w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl border-2 border-dashed border-text/20 bg-surface/30 flex items-center justify-center opacity-40">
                                                <span className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-text-muted">{prevMonthLastDay}</span>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Right Side Dates (Next Month) */}
                                {(() => {
                                    const nextMonthFirstDay = 1;
                                    const nextMonthSecondWeek = 8;
                                    return (
                                        <>
                                            <div className="absolute -right-8 md:-right-12 lg:-right-14 top-16 md:top-20 hidden md:block">
                                                <div className="w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl bg-surface/40 flex items-center justify-center opacity-35">
                                                    <span className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-text-muted">{nextMonthFirstDay}</span>
                                                </div>
                                            </div>
                                            <div className="absolute -right-6 md:-right-10 bottom-12 md:bottom-16 hidden md:block">
                                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-surface/40 flex items-center justify-center opacity-25">
                                                    <span className="text-lg md:text-xl lg:text-2xl font-display font-bold text-text-muted">{nextMonthSecondWeek}</span>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}

                                {/* Calendar Grid - Construction App Style */}
                                <div className="grid grid-cols-7 gap-2 md:gap-3 lg:gap-4">
                                {getCalendarDays().map((data, index) => {
                                        if (!data.day) return <div key={`empty-${index}`} className="aspect-square" />;
                                        
                                        const { day, isToday, hasMilestone } = data;
                                        
                                        return (
                                            <motion.div
                                                key={day}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.015, duration: 0.4, ease: "easeOut" }}
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    y: -4,
                                                    z: 20,
                                                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(92, 231, 246, 0.3), 0 0 90px rgba(34, 197, 94, 0.3)',
                                                    transition: { 
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 20,
                                                        duration: 0.3
                                                    }
                                                }}
                                                whileTap={{ 
                                                    scale: 0.98,
                                                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(92, 228, 246, 0.4), 0 0 90px rgba(34, 197, 94, 0.3)'
                                                }}
                                                onClick={() => setSelectedDate(day)}
                                                className={`group relative aspect-square rounded-2xl lg:rounded-3xl cursor-pointer flex flex-col items-center justify-center p-2 md:p-3 lg:p-4 transition-all duration-300 overflow-visible ${
                                                    selectedDate === day ? 'ring-4 ring-cyan-400 ring-offset-2' : ''
                                                } ${
                                                    hasMilestone
                                                        ? 'bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 shadow-lg shadow-cyan-500/30'
                                                        : isToday 
                                                        ? 'bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 shadow-md shadow-cyan-500/30' 
                                                        : 'bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-text/30 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.5),0_0_40px_rgba(56,189,248,0.3),0_0_60px_rgba(34,197,94,0.2)]'
                                                }`}
                                            >
                                                {/* Day Number */}
                                                <span className={`text-xl md:text-2xl lg:text-3xl font-display font-bold relative z-10 ${
                                                    (isToday || hasMilestone) ? 'text-white' : 'text-text'
                                                }`}>
                                                    {day}
                                                </span>

                                                {/* Milestone Label */}
                                                {hasMilestone && !isToday && (
                                                    <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2">
                                                        <div className="text-[10px] md:text-xs font-semibold text-white/90 whitespace-nowrap hidden md:block">
                                                            {hasMilestone.phase}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Hover Popup Card with Message - Today (Shows on Hover) */}
                                                {isToday && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.6, rotate: 0, x: 0, y: 0 }}
                                                        animate={{ 
                                                            opacity: 0,
                                                            scale: 0.6,
                                                            rotate: 0,
                                                            x: 0,
                                                            y: 0
                                                        }}
                                                        whileHover={{ 
                                                            opacity: 1, 
                                                            scale: 1, 
                                                            rotate: 15, 
                                                            x: 15, 
                                                            y: 15 
                                                        }}
                                                        className="absolute bottom-0 right-0 w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 rounded-2xl md:rounded-3xl shadow-[0_30px_80px_rgba(6,182,212,0.5)] flex flex-col items-center justify-center z-50 border-4 md:border-[5px] border-white p-4 md:p-5 lg:p-6 pointer-events-none"
                                                        style={{ 
                                                            transformOrigin: 'bottom right',
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 260,
                                                            damping: 16,
                                                            opacity: { duration: 0.2 }
                                                        }}
                                                    >
                                                        {/* Cursor Pointer Icon */}
                                                        <motion.svg 
                                                            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white mb-3" 
                                                            fill="currentColor" 
                                                            viewBox="0 0 20 20"
                                                            initial={{ scale: 0.9, rotate: -8 }}
                                                            whileHover={{ scale: 1, rotate: 0 }}
                                                            transition={{ delay: 0.15 }}
                                                        >
                                                            <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.34-5.89a1.5 1.5 0 000-2.54L6.3 2.84z"/>
                                                        </motion.svg>
                                                        {/* Motivational Message */}
                                                        <p className="text-white text-[11px] md:text-xs lg:text-sm font-bold text-center leading-snug px-2">
                                                            Take action now to set up your daily notes
                                                        </p>
                                                    </motion.div>
                                                )}

                                                {/* Hover Popup Card - Milestones (Shows on Hover) */}
                                                {hasMilestone && !isToday && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.6, rotate: 0, x: 0, y: 0 }}
                                                        animate={{ 
                                                            opacity: 0,
                                                            scale: 0.6,
                                                            rotate: 0,
                                                            x: 0,
                                                            y: 0
                                                        }}
                                                        whileHover={{ 
                                                            opacity: 1, 
                                                            scale: 1, 
                                                            rotate: 15, 
                                                            x: 12, 
                                                            y: 12 
                                                        }}
                                                        className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 rounded-2xl md:rounded-3xl shadow-[0_25px_65px_rgba(6,182,212,0.5)] flex flex-col items-center justify-center z-50 border-4 md:border-[5px] border-white p-3 md:p-4 pointer-events-none"
                                                        style={{ transformOrigin: 'bottom right' }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 260,
                                                            damping: 16,
                                                            opacity: { duration: 0.2 }
                                                        }}
                                                    >
                                                        {/* Arrow Icon */}
                                                        <motion.svg 
                                                            className="w-7 h-7 md:w-9 md:h-9 text-white mb-2" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                            initial={{ x: -5 }}
                                                            whileHover={{ x: 0 }}
                                                            transition={{ delay: 0.15 }}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </motion.svg>
                                                        {/* Phase Name */}
                                                        <p className="text-white text-[12px] md:text-sm font-bold text-center leading-tight">
                                                            {hasMilestone.phase}
                                                        </p>
                                                    </motion.div>
                                                )}

                                                {/* Hover Gradient Box Shadow Effect - Regular Days Only */}
                                                {!isToday && !hasMilestone && (
                                                    <div 
                                                        className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                                                        style={{
                                                            boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(56, 189, 248, 0.35)',
                                                            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(56, 189, 248, 0.12), rgba(34, 197, 94, 0.1))',
                                                        }}
                                                    />
                                                )}

                                                {/* Hover Glow Effect - Milestone & Today Only */}
                                                {(isToday || hasMilestone) && (
                                                    <div 
                                                        className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                        style={{
                                                            boxShadow: '0 0 25px rgba(6, 182, 212, 0.5), 0 0 50px rgba(56, 189, 248, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.15)',
                                                        }}
                                                    />
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 shadow-md" />
                                    <span className="text-sm font-medium text-text">Project Milestones</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 shadow-md" />
                                    <span className="text-sm font-medium text-text">Today</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-surface/60 border-2 border-text/30 dark:border-white/10 shadow-sm" />
                                    <span className="text-sm font-medium text-text">Available Days</span>
                                </div>
                            </div>
                            </div>

                            {/* Right Schedule Panel */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="hidden lg:flex flex-col w-80 flex-shrink-0 self-stretch"
                            >
                                <div className="bg-surface/80 dark:bg-surface/50 rounded-3xl p-5 shadow-xl border border-text/20 dark:border-white/10 h-full flex flex-col min-h-0">
                                    {/* Date Header */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-display font-bold text-text mb-1">
                                            {currentYear} {currentMonthName} {currentDay}
                                        </h3>
                                    </div>

                                    {/* Selected Date Details */}
                                    {selectedDate && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 text-white shadow-lg"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-lg font-bold">{getDateDetails(selectedDate).title}</h4>
                                                <button
                                                    onClick={() => setSelectedDate(null)}
                                                    className="text-white/80 hover:text-white transition-colors"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <p className="text-xs opacity-90 mb-2">{getDateDetails(selectedDate).date}</p>
                                            <p className="text-sm leading-relaxed opacity-95">
                                                {getDateDetails(selectedDate).description}
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Time Slots */}
                                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 min-h-0">
                                        {[
                                            { time: "07:00 am", event: null, blurred: { title: "Morning Standup", end: "07:30 am", color: "blue" } },
                                            { time: "08:00 am", event: { title: "Appointment with Mr. Adams", end: "09:45 am", color: "purple" }, blurred: null },
                                            { time: "09:00 am", event: null, blurred: { title: "Code Review Session", end: "09:30 am", color: "green" } },
                                            { time: "10:00 am", event: null, blurred: { title: "Client Consultation", end: "10:25 am", color: "indigo" } },
                                            { time: "10:30 am", event: { title: "Appointment with My team", end: "12:00 pm", color: "orange" }, blurred: null },
                                            { time: "11:00 am", event: null, blurred: { title: "Team Sync", end: "11:30 am", color: "teal" } },
                                            { time: "12:00 pm", event: null, blurred: { title: "Lunch Break", end: "12:45 pm", color: "yellow" } },
                                            { time: "01:00 pm", event: null, blurred: { title: "Project Planning", end: "02:00 pm", color: "pink" } }
                                        ].map((slot, idx) => (
                                            <div key={idx} className="relative">
                                                <div className="text-xs text-text-muted mb-1.5 font-medium">
                                                    {slot.time}
                                                </div>
                                                {slot.event ? (
                                                    <div className={`ml-4 p-2.5 rounded-xl ${
                                                        slot.event.color === 'purple' 
                                                            ? 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300 text-white' 
                                                            : 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300 text-white'
                                                    } shadow-md`}>
                                                        <p className="text-sm font-semibold">{slot.event.title}</p>
                                                        <p className="text-xs opacity-90 mt-0.5">{slot.time} - {slot.event.end}</p>
                                                    </div>
                                                ) : slot.blurred ? (
                                                    <div className={`ml-4 p-2.5 rounded-xl blur-sm opacity-40 pointer-events-none ${
                                                        slot.blurred.color === 'blue'
                                                            ? 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300'
                                                            : slot.blurred.color === 'green'
                                                            ? 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300'
                                                            : slot.blurred.color === 'indigo'
                                                            ? 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300'
                                                            : slot.blurred.color === 'yellow'
                                                            ? 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300'
                                                            : slot.blurred.color === 'pink'
                                                            ? 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300'
                                                            : slot.blurred.color === 'teal'
                                                            ? 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300'
                                                            : slot.blurred.color === 'cyan'
                                                            ? 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300'
                                                            : 'bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-300'
                                                    }`}>
                                                        <p className="text-sm font-semibold text-white">{slot.blurred.title}</p>
                                                        <p className="text-xs opacity-90 mt-0.5 text-white">{slot.time} - {slot.blurred.end}</p>
                                                    </div>
                                                ) : (
                                                    <div className="ml-4 p-2.5 rounded-xl bg-surface/40 blur-[3px] opacity-25 pointer-events-none border border-white/10">
                                                        <div className="h-3.5 bg-text/20 rounded w-3/4 mb-1.5"></div>
                                                        <div className="h-2.5 bg-text/15 rounded w-1/2"></div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer Logos */}
                                    <div className="mt-auto pt-4 border-t border-text/20 dark:border-white/10 flex items-center justify-between">
                                        <span className="text-xs text-text-muted">#Development</span>
                                        <span className="text-xs text-text-muted font-semibold">Vishwjeet Workspace</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Mobile Details Modal */}
                    <AnimatePresence>
                        {selectedDate && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 lg:hidden"
                                onClick={() => setSelectedDate(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 20 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white dark:bg-surface rounded-3xl p-6 max-w-md w-full shadow-2xl"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-display font-bold text-text">
                                            {getDateDetails(selectedDate).title}
                                        </h3>
                                        <button
                                            onClick={() => setSelectedDate(null)}
                                            className="text-text-muted hover:text-text text-2xl"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <p className="text-sm text-text-muted mb-4">
                                        {getDateDetails(selectedDate).date}
                                    </p>
                                    <p className="text-base text-text leading-relaxed">
                                        {getDateDetails(selectedDate).description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 md:mt-20"
                    >
                        <div className="max-w-5xl mx-auto">
                            <div className="relative p-6 md:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-surface/50 to-surface/30 backdrop-blur-xl border border-primary/20 shadow-2xl overflow-hidden">
                            
                            {/* Animated Background */}
                            <div className="absolute inset-0 pointer-events-none">
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.1) 0%, transparent 70%)',
                                    }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                    }}
                                />
                            </div>

                                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-8">
                                    <div className="flex items-start gap-4 lg:gap-5 flex-1">
                                        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-sky-400/20 border border-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <Sparkles size={24} className="text-primary md:w-6 md:h-6 lg:w-7 lg:h-7" />
                                    </div>
                                        <div className="text-left flex-1">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-text mb-2">
                                            Ready to Start Your Project?
                                        </h3>
                                            <p className="text-sm md:text-base text-text-muted mb-4 max-w-xl">
                                            Get a detailed timeline and quote tailored to your needs
                                        </p>
                                            <div className="flex flex-wrap gap-3 md:gap-4">
                                                <span className="flex items-center gap-1.5 text-xs md:text-sm text-text-muted">
                                                    <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                                Free Consultation
                                            </span>
                                                <span className="flex items-center gap-1.5 text-xs md:text-sm text-text-muted">
                                                    <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                                24hr Response
                                            </span>
                                                <span className="flex items-center gap-1.5 text-xs md:text-sm text-text-muted">
                                                    <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                                No Obligation
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full sm:w-auto lg:w-auto flex-shrink-0">
                                        <button 
                                            onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                                            className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 text-white font-bold text-sm md:text-base hover:shadow-[0_0_30px_rgba(6,182,212,0.5),0_0_50px_rgba(56,189,248,0.3)] transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap flex items-center justify-center gap-2"
                                        >
                                            <Mail size={18} className="md:w-5 md:h-5" />
                                        Get Started
                                    </button>
                                        <button 
                                            onClick={() => window.dispatchEvent(new CustomEvent('openWhatsAppModal'))}
                                            className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl border-2 border-cyan-400/50 text-text hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-sky-400/10 hover:to-cyan-300/10 font-semibold text-sm md:text-base transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 hover:border-sky-400/50 hover:scale-105"
                                        >
                                            <Phone size={18} className="md:w-5 md:h-5" />
                                        Schedule Call
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent font-mono text-xs tracking-widest uppercase mb-4 block" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Transparent Pricing
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-text mb-6">
                            Investment That <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pays Off</span>
                        </h2>
                        <p className="text-lg text-text-muted max-w-2xl mx-auto">
                            Flexible packages designed for Indian businesses and startups
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative"
                            >
                                {pkg.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                        <span className="px-4 py-1.5 bg-primary text-black text-xs font-bold rounded-full shadow-lg">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}
                                
                                <div className={`relative h-full p-8 rounded-2xl border ${pkg.highlighted ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-sky-400/10' : 'border-text/20 dark:border-white/10 bg-surface/80 dark:bg-surface/50'} hover:border-cyan-500/50 dark:hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(6,182,212,0.4),0_0_60px_rgba(56,189,248,0.3),0_0_90px_rgba(34,197,94,0.15)]`}>
                                    
                                    {pkg.highlighted && (
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-sky-400/10"
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />
                                    )}
                                    
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                                        boxShadow: '0 0 40px rgba(6, 182, 212, 0.4), 0 0 80px rgba(56, 189, 248, 0.3), 0 0 120px rgba(34, 197, 94, 0.15)',
                                    }} />

                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-display font-bold text-text mb-2">{pkg.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-4xl md:text-5xl font-display font-bold text-primary">{pkg.price}</span>
                                            <span className="text-sm text-text-muted">/ {pkg.period}</span>
                                        </div>
                                        <p className="text-sm text-text-muted mb-6 pb-6 border-b border-text/10">
                                            {pkg.description}
                                        </p>

                                        <ul className="space-y-3 mb-8">
                                            {pkg.features.map((feature, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.5 + i * 0.05 }}
                                                    className="flex items-start gap-2 text-sm text-text-muted"
                                                >
                                                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>

                                        <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${pkg.highlighted ? 'bg-primary text-black hover:bg-white hover:shadow-[0_0_30px_rgba(6,182,212,0.5),0_0_60px_rgba(56,189,248,0.35),0_0_90px_rgba(34,197,94,0.2)]' : 'bg-surface-highlight border border-text/20 text-text hover:bg-text/5 hover:shadow-[0_0_20px_rgba(6,182,212,0.4),0_0_40px_rgba(56,189,248,0.25)]'}`}
                                            onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Payment Terms */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <p className="text-sm text-text-muted">
                            <DollarSign size={14} className="inline mr-1" />
                            Payment Terms: 50% upfront, 25% mid-project, 25% on completion
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background pointer-events-none" />
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-text mb-6">
                        Let's Build Your <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Next Project</span>
                    </h2>
                    <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto">
                        Ready to transform your ideas into reality? Get in touch for a free consultation and project quote.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted mb-10">
                        <span className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-400" />
                            Free Consultation
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-400" />
                            Quick Response (24hrs)
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-400" />
                            No Obligation Quote
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <MagneticButton className="h-16 px-10 bg-primary text-black hover:bg-white font-bold text-lg flex items-center gap-2" onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}>
                            <Mail size={22} /> Get Project Quote
                        </MagneticButton>
                        <a
                            href="tel:+919097490427"
                            className="h-16 px-10 rounded-full border border-text/20 text-text hover:bg-text/5 font-medium transition-colors text-lg flex items-center gap-2 justify-center"
                        >
                            <Phone size={22} /> Call Now
                        </a>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 pt-8 border-t border-text/10 flex flex-wrap justify-center gap-x-8 gap-y-4">
                        <a href="mailto:info.vishwjeetkumar@gmail.com" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                            <Mail size={16} />
                            <span className="text-sm">info.vishwjeetkumar@gmail.com</span>
                        </a>
                        <a href="tel:+919097490427" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                            <Phone size={16} />
                            <span className="text-sm">+91 9097490427</span>
                        </a>
                        <a href="https://linkedin.com/in/vishwjeet-kumar-5848711b9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                            <Linkedin size={16} />
                            <span className="text-sm">LinkedIn</span>
                        </a>
                    </div>
                </motion.div>
            </section>

        </div>
        </>
    );
};

export default ServicesPage;

