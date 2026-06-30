import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    Download,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    Award,
    Code2,
    Sparkles,
    CheckCircle,
    Star,
    TrendingUp,
    Zap,
    ArrowRight,
    Globe,
    Github,
    Linkedin,
    Shield,
    Clock,
    DollarSign,
    User
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const ResumePage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth spring physics for paper-like movement
    const springConfig = { stiffness: 100, damping: 30, mass: 1 };

    const y = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -100]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 0.8]), springConfig);
    const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.95, 1]), springConfig);

    // Paper tilt effect - starts tilted like on desk, becomes flat on scroll
    // Reduced tilt for mobile, full tilt for desktop
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.3], [25, 0]), springConfig);
    const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.3], [-8, 0]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.3], [2, 0]), springConfig);

    // Floating annotations data - Real achievements
    const annotations = [
        {
            text: "54% RDS Cost Reduction",
            position: { top: '15%', left: '10%' },
            delay: 0.3
        },
        {
            text: "National Digital Platform",
            position: { top: '35%', right: '8%' },
            delay: 0.5
        },
        {
            text: "Infrastructure as Code",
            position: { top: '50%', left: '12%' },
            delay: 0.7
        },
        {
            text: "Disaster Recovery Automation",
            position: { top: '73%', right: '10%' },
            delay: 0.9
        }
    ];

    // Freelance trust indicators
    const trustBadges = [
        { icon: <Clock size={20} />, label: "Fast Delivery", color: "text-green-400" },
        { icon: <Shield size={20} />, label: "Quality Assured", color: "text-blue-400" },
        { icon: <DollarSign size={20} />, label: "Fair Pricing", color: "text-yellow-400" },
    ];

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-text selection:bg-primary/30 selection:text-white overflow-hidden">

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-24 md:py-32">

                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet/20 blur-[120px] rounded-full opacity-50 dark:opacity-100" />
                    <div className="absolute top-[30%] left-1/4 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />

                    {/* Animated Stars/Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/30 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-3 mb-6 md:mb-8 w-full max-w-2xl"
                >
                    <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-full bg-surface/50 backdrop-blur-md border border-white/10">
                        <div className="flex -space-x-3">
                            {[
                                { bg: 'bg-gradient-to-br from-blue-500 to-cyan-500', text: 'S', ring: 'ring-blue-400/30' },
                                { bg: 'bg-gradient-to-br from-blue-500 to-purple-500', text: 'A', ring: 'ring-violet-400/30' },
                                { bg: 'bg-gradient-to-br from-pink-500 to-rose-500', text: 'J', ring: 'ring-pink-400/30' },
                                { bg: 'bg-gradient-to-br from-orange-500 to-amber-500', text: 'A', ring: 'ring-orange-400/30' },
                                { bg: 'bg-gradient-to-br from-red-500 to-purple-600', text: 'L', ring: 'ring-orange-400/30' }
                            ].map((item, i) => (
                                <div 
                                    key={i} 
                                    className={`w-7 h-7 md:w-9 md:h-9 rounded-full ${item.bg} border-2 border-background flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 ring-2 ${item.ring}`}
                                >
                                    <span className="text-white text-xs md:text-sm font-bold font-display">{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <span className="text-xs md:text-sm text-text-muted">Experienced in <span className="text-text font-semibold">Enterprise & Government</span> cloud platforms</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        {trustBadges.map((badge, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-full bg-surface/30 backdrop-blur-md border border-white/10">
                                <span className={`${badge.color} scale-90 md:scale-100`}>{badge.icon}</span>
                                <span className="text-[10px] md:text-xs text-text-muted whitespace-nowrap">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-6 md:mb-8 max-w-5xl px-2"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-text leading-[1.1] md:leading-[1.0] tracking-tighter mb-4 md:mb-6">
                    Build with an <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet to-fuchsia">Experienced</span><br />
                    DevOps Engineer
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed mb-4 px-4">
                    <span className="text-text font-semibold">5 years</span> of experience designing, automating, and operating secure cloud platforms.<br className="hidden md:block" />
                    <span className="md:inline block mt-1 md:mt-0">
                        Specialized in <span className="text-primary">AWS, Kubernetes, Terraform, Docker, Jenkins & CI/CD</span>
                    </span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-text-muted px-4">
                    <span className="flex items-center gap-1.5 md:gap-2">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                        <span className="whitespace-nowrap">Production Infrastructure</span>
                    </span>

                    <span className="flex items-center gap-1.5 md:gap-2">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                        <span className="whitespace-nowrap">Infrastructure as Code</span>
                    </span>

                    <span className="flex items-center gap-1.5 md:gap-2">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                        <span className="whitespace-nowrap">Open to Opportunities</span>
                    </span>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 md:mb-16 z-10 w-full max-w-md sm:max-w-none px-4 justify-center"
                >
                    <MagneticButton 
                        className="h-12 md:h-14 px-6 md:px-8 bg-primary text-black hover:bg-white font-bold text-sm md:text-base flex items-center gap-2 justify-center w-full sm:w-auto"
                        onClick={() => {
                            //Download CV functionality
                            const link = document.createElement('a');
                            link.href = '/Sajal_Rastogi_Resume.pdf';
                            link.download = 'Sajal_Rastogi_Resume.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            // window.open('/Sajal_Rastogi_Resume.pdf', '_blank');
                        }}
                    >
                        <Download size={18} className="md:w-5 md:h-5" /> Download CV
                    </MagneticButton>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                        className="h-12 md:h-14 px-6 md:px-8 rounded-full border border-text/20 text-text hover:bg-text/5 font-medium transition-colors flex items-center gap-2 justify-center text-sm md:text-base w-full sm:w-auto"
                    >
                        Hire Me <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                </motion.div>

                {/* 3D Resume Preview with Annotations - Paper on Desk Effect */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative w-full max-w-5xl perspective-2000 px-4 md:px-0"
                >
                    {/* Main Resume Card - Tilted like paper on desk */}
                    <motion.div
                        initial={{ 
                            opacity: 0, 
                            rotateX: window.innerWidth < 768 ? 15 : 35, 
                            rotateY: window.innerWidth < 768 ? -5 : -10, 
                            y: window.innerWidth < 768 ? 50 : 100, 
                            scale: window.innerWidth < 768 ? 0.95 : 0.9 
                        }}
                        animate={{ 
                            opacity: 1, 
                            rotateX: window.innerWidth < 768 ? 12 : 25, 
                            rotateY: window.innerWidth < 768 ? -4 : -8, 
                            y: 0, 
                            scale: window.innerWidth < 768 ? 0.98 : 0.95 
                        }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            transformStyle: 'preserve-3d',
                            rotateX,
                            rotateY,
                            rotateZ,
                            scale,
                        }}
                        className="relative bg-white dark:bg-surface rounded-xl md:rounded-2xl shadow-2xl dark:shadow-[0_0_100px_-20px_rgba(0,240,255,0.3)] border border-white/10 overflow-hidden"
                    >
                        {/* Resume Content */}
                        <div className="p-4 sm:p-6 md:p-8 lg:p-12">

                            {/* Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 md:pb-6 border-b border-text/10">
                                <div className="w-full md:w-auto">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text mb-1 md:mb-2">SAJAL RASTOGI</h2>
                                    <p className="text-base md:text-lg text-primary font-medium">SENIOR DEVOPS ENGINEER</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Sparkles size={12} className="text-primary md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs text-primary font-mono uppercase tracking-wider">5 YEARS EXPERIENCE</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 md:gap-3 mt-3 md:mt-0">
                                    <a href="https://sajalrastogi.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-text/5 flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                                        <Globe size={16} className="md:w-[18px] md:h-[18px]" />
                                    </a>
                                    <a href="https://github.com/sajalrasto" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-text/5 flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                                        <Github size={16} className="md:w-[18px] md:h-[18px]" />
                                    </a>
                                    <a href="https://linkedin.com/in/sajal-rastogi-5b474b6a" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-text/5 flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                                        <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />
                                    </a>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
                                <div className="flex items-center gap-2 text-xs md:text-sm text-text-muted">
                                    <Mail size={14} className="text-primary flex-shrink-0 md:w-4 md:h-4" />
                                    <span className="truncate">sajalrastogi20@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-text-muted">
                                    <Phone size={14} className="text-primary flex-shrink-0 md:w-4 md:h-4" />
                                    <span>+91 8400840123</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-text-muted">
                                    <MapPin size={14} className="text-primary flex-shrink-0 md:w-4 md:h-4" />
                                    <span>India (Remote)</span>
                                </div>
                            </div>

                            {/* Professional Summary */}
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-display font-bold text-text mb-2 md:mb-3 flex items-center gap-2">
                                    <Sparkles size={16} className="text-primary md:w-5 md:h-5" />
                                    PROFESSIONAL SUMMARY
                                </h3>
                                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                                    Results-driven Senior Software Engineer with 5 years of experience designing, automating, and managing secure cloud infrastructure. Experienced in AWS, Kubernetes, Terraform, Docker, Jenkins, CI/CD, and Infrastructure as Code, delivering scalable solutions for enterprise and government projects.
                                    Skilled at solving complex technical problems and creating innovative solutions that drive business growth.
                                </p>
                                <div className="mt-3 md:mt-4 inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                                    <Sparkles size={12} className="text-primary md:w-[14px] md:h-[14px]" />
                                    <span className="text-[10px] md:text-xs text-primary font-semibold">90% client satisfaction</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-display font-bold text-text mb-3 md:mb-4 flex items-center gap-2">
                                    <Code2 size={16} className="text-primary md:w-5 md:h-5" />
                                    TECHNICAL EXPERTISE
                                </h3>
                                <div className="space-y-2 md:space-y-3">
                            <div>
                                <p className="text-[10px] md:text-xs font-mono text-text-muted mb-1.5 md:mb-2 uppercase tracking-wider">
                                    Cloud Platforms
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {[
                                        'AWS',
                                        'ECS',
                                        'EKS',
                                        'CloudFormation',
                                        'AWS CDK',
                                        'Route 53',
                                        'CloudFront'
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 md:px-3 py-1 md:py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-[10px] md:text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] md:text-xs font-mono text-text-muted mb-1.5 md:mb-2 uppercase tracking-wider">
                                    Containers & Infrastructure
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {[
                                        'Docker',
                                        'Kubernetes',
                                        'Terraform',
                                        'EFS',
                                        'RDS',
                                        'Redis',
                                        'RabbitMQ'
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 md:px-3 py-1 md:py-1.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full text-[10px] md:text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] md:text-xs font-mono text-text-muted mb-1.5 md:mb-2 uppercase tracking-wider">
                                    Automation & DevOps
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {[
                                        'Jenkins',
                                        'Azure DevOps',
                                        'Git',
                                        'Linux',
                                        'Python',
                                        'Bash',
                                        'CloudWatch',
                                        'Datadog'
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 md:px-3 py-1 md:py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] md:text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 md:mt-4 inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                            <Sparkles size={12} className="text-primary md:w-[14px] md:h-[14px]" />
                            <span className="text-[10px] md:text-xs text-primary font-semibold">
                                AWS • Kubernetes • Terraform
                            </span>
                        </div>
                                <div className="mt-3 md:mt-4 inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                                    <Sparkles size={12} className="text-primary md:w-[14px] md:h-[14px]" />
                                    <span className="text-[10px] md:text-xs text-primary font-semibold">Expert in Disaster Recovery</span>
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-display font-bold text-text mb-3 md:mb-4 flex items-center gap-2">
                                    <Briefcase size={16} className="text-primary md:w-5 md:h-5" />
                                    PROFESSIONAL EXPERIENCE
                                </h3>
                                <div className="space-y-4 md:space-y-6">
                                    <ExperienceItem
                                        title="Senior Software Engineer"
                                        company="Trigyn Technologies"
                                        period="Mar 2025 – Present"
                                        description="Designing, automating, and managing AWS cloud infrastructure for enterprise and government platforms. Building CI/CD pipelines, provisioning infrastructure using Terraform and CloudFormation, managing ECS workloads, and improving platform reliability, scalability, and security."
                                        highlights={[
                                            "AWS",
                                            "Terraform",
                                            "CloudFormation",
                                            "Docker",
                                            "ECS",
                                            "Redis",
                                            "CI/CD",
                                            "DevOps"
                                        ]}
                                    />

                                    <ExperienceItem
                                        title="Senior Software Engineer"
                                        company="GlobalLogic India Pvt. Ltd."
                                        period="Jun 2022 – Aug 2024"
                                        description="Implemented cloud infrastructure, deployment automation, and containerized application delivery for enterprise applications. Worked extensively with Docker, Kubernetes, Jenkins, AWS services, monitoring solutions, and Infrastructure as Code."
                                        highlights={[
                                            "AWS",
                                            "Kubernetes",
                                            "Docker",
                                            "Jenkins",
                                            "Azure DevOps",
                                            "Linux",
                                            "Datadog",
                                            "CloudWatch"
                                        ]}
                                    />

                                    <ExperienceItem
                                        title="Project Engineer"
                                        company="Wipro Limited"
                                        period="Jun 2019 – Sep 2020"
                                        description="Worked on enterprise application for Rating and Review module and software development while collaborating in Agile teams. Gained hands-on experience with Java, SQL, Git, Linux, and software delivery best practices."
                                        highlights={[
                                            "Java",
                                            "SQL",
                                            "Linux",
                                            "Git",
                                            "Agile",
                                            "AWS",
                                            "Jenkins"
                                        ]}
                                    />    
                                </div>
                            </div>

                            {/* Education */}
                            <div>
                                <h3 className="text-lg md:text-xl font-display font-bold text-text mb-3 md:mb-4 flex items-center gap-2">
                                    <GraduationCap size={16} className="text-primary md:w-5 md:h-5" />
                                    EDUCATION
                                </h3>
                                <div className="space-y-3 md:space-y-4">
                                    <EducationItem
                                        degree="Post Graduate Diploma in Artificial Intelligence & Machine Learning"
                                        institution="National Institute of Technology (NIT), Warangal"
                                        year="Jul 2022 – Jun 2023"
                                    />

                                    <EducationItem
                                        degree="Bachelor of Technology (Computer Science) – First Class"
                                        institution="Galgotias University"
                                        year="Sep 2015 – May 2019"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gradient Overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
                    </motion.div>

                    {/* Floating Annotations */}
                    {annotations.map((annotation, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: annotation.delay }}
                            className="absolute hidden lg:block"
                            style={annotation.position}
                        >
                            <div className="relative">
                                <div className="px-4 py-2 rounded-lg bg-surface/90 backdrop-blur-xl border border-primary/30 shadow-lg">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={14} className="text-primary" />
                                        <span className="text-xs font-medium text-text whitespace-nowrap">{annotation.text}</span>
                                    </div>
                                </div>
                                {/* Connector line */}
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                            </div>
                        </motion.div>
                    ))}

                    {/* Match Score Badge - Freelance Ready */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-auto"
                    >
                        <div className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-green-500/20 to-primary/20 backdrop-blur-xl border border-green-500/30 shadow-xl">
                            <div className="flex items-center gap-2 md:gap-3 justify-center">
                                <div className="relative">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 md:border-4 border-green-500/30 flex items-center justify-center">
                                        <span className="text-lg md:text-xl font-bold text-green-400">90</span>
                                    </div>
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-3 md:border-4 border-green-500"
                                        style={{
                                            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 90%)',
                                        }}
                                        initial={{ rotate: -90 }}
                                        animate={{ rotate: 270 }}
                                        transition={{ duration: 1.5, delay: 1.5 }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs md:text-sm font-bold text-text">Available Now</div>
                                    <div className="text-[10px] md:text-xs text-text-muted">for freelance work</div>
                                </div>
                                <CheckCircle size={16} className="text-green-400 md:w-5 md:h-5 flex-shrink-0" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Reflection effect */}
                    <div className="hidden md:block absolute -bottom-20 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent blur-2xl rounded-[100%]" />
                </motion.div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8 md:mb-12 lg:mb-16"
                    >
                        <span className="text-primary font-mono text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-4 block">
                            Featured Work
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text mb-4 md:mb-6 px-4">
                            Projects That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet">Drive Results</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 relative z-10">
                        {/* Government Digital Platform Modernization */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="group relative p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-surface/50 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(0,240,255,0.3)]"
                        >
                            <div>
                                <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3 md:mb-4">
                                    <Sparkles size={10} className="text-primary md:w-3 md:h-3" />
                                    <span className="text-[10px] md:text-xs text-primary font-semibold">Government Digital Platform</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-2 md:mb-3">Government Digital Platform Modernization</h3>
                                <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-3 md:mb-4">
                                    Designed and managed cloud infrastructure for a large-scale government digital platform running production workloads on AWS. Automated deployments using Jenkins, deployed containerized microservices on Amazon ECS, configured CloudFront, EFS, Aurora PostgreSQL, Redis, RabbitMQ, ClamAV malware scanning, VPC Endpoints and AWS Network Firewall to deliver a secure, scalable and highly available platform.
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                                    {['Amazon ECS', 'Aurora PostgreSQL', 'CloudFront', 'Amazon EFS', 'Redis', 'RabbitMQ', 'Terraform', 'Jenkins'].map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 md:py-1 bg-text/5 text-text-muted text-[10px] md:text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <CheckCircle size={12} className="text-green-400 md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs">Highly Available Architecture</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CheckCircle size={12} className="text-green-400 md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs">Secure Government Platform</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Enterprise Disaster Recovery Platform */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="group relative p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-surface/50 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(0,240,255,0.3)]"
                        >
                            <div>
                                <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 md:mb-4">
                                    <Sparkles size={10} className="text-green-400 md:w-3 md:h-3" />
                                    <span className="text-[10px] md:text-xs text-green-400 font-semibold">Disaster Recovery</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-2 md:mb-3">Enterprise Disaster Recovery Platform</h3>
                                <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-3 md:mb-4">
                                    Built Infrastructure as Code solutions to provision complete AWS disaster recovery environments using Terraform, AWS CDK, CloudFormation, Kubernetes and Python. Automated cloud resource provisioning enabling one-click disaster recovery for enterprise applications while reducing recovery time and manual intervention.
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                                    {['Terraform', 'AWS CDK', 'CloudFormation', 'Python', 'Kubernetes'].map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 md:py-1 bg-text/5 text-text-muted text-[10px] md:text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <CheckCircle size={12} className="text-green-400 md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs">One-Click Recovery</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CheckCircle size={12} className="text-green-400 md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs">Infrastructure as Code</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* National Digital Document Wallet Platform */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="group relative p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-surface/50 border border-white/10 hover:border-violet/30 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)]"
                            style={{ opacity: 0.7, filter: 'blur(0.5px)', transform: 'scale(0.98)' }}
                        >
                            <div>
                                <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-3 md:mb-4">
                                    <Sparkles size={10} className="text-violet md:w-3 md:h-3" />
                                    <span className="text-[10px] md:text-xs text-violet font-semibold">Government Platform</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-2 md:mb-3">National Digital Document Wallet Platform</h3>
                                <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-3 md:mb-4">
                                    Engineered cloud infrastructure supporting a national digital document platform. Built secure CI/CD pipelines, containerized application deployments, Redis caching, RabbitMQ messaging and production monitoring using AWS services while ensuring scalability, security and operational reliability.
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                                    {['AWS ECS', 'RabbitMQ', 'Redis', 'Jenkins', 'CloudWatch'].map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 md:py-1 bg-text/5 text-text-muted text-[10px] md:text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <CheckCircle size={12} className="text-green-400 md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs">Production Infrastructure</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CheckCircle size={12} className="text-green-400 md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs">National Scale Platform</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Cloud Cost Optimization Initiative */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="group relative p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-surface/50 border border-white/10 hover:border-fuchsia/30 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(217,70,239,0.3)]"
                            style={{ opacity: 0.6, filter: 'blur(1px)', transform: 'scale(0.96)' }}
                        >
                            <div>
                                <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-full bg-fuchsia/10 border border-fuchsia/20 mb-3 md:mb-4">
                                    <Sparkles size={10} className="text-fuchsia md:w-3 md:h-3" />
                                    <span className="text-[10px] md:text-xs text-fuchsia font-semibold">Cloud Optimization</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-2 md:mb-3">54% AWS RDS Cost Optimization</h3>
                                <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-3 md:mb-4">
                                    Optimized production AWS database infrastructure resulting in a 54% reduction in Amazon RDS costs while maintaining application performance and reliability. Improved cloud resource utilization, monitoring and operational efficiency through performance tuning and infrastructure optimization.
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                                    {['Amazon RDS', 'CloudWatch', 'AWS', 'Performance Tuning', 'Cost Optimization'].map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 md:py-1 bg-text/5 text-text-muted text-[10px] md:text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <CheckCircle size={12} className="text-green-400 md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs">54% Cost Reduction</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CheckCircle size={12} className="text-green-400 md:w-[14px] md:h-[14px]" />
                                        <span className="text-[10px] md:text-xs">Performance Maintained</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Gradient Fade Overlay - Melts into background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="absolute bottom-0 left-0 right-0 h-64 md:h-80 pointer-events-none z-20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background backdrop-blur-sm" />
                        {/* Optional: View All Button */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-surface/80 backdrop-blur-xl border border-primary/30 text-text hover:bg-primary/10 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 flex items-center gap-2 group"
                            >
                                <span className="text-sm md:text-base font-medium">View All Projects</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section - Why Hire Me */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
                            Why Hire Me
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-text mb-6">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet">Trusted</span> Tech Partner
                        </h2>
                        <p className="text-lg text-text-muted max-w-3xl mx-auto">
                            Delivering excellence in every project with proven expertise and dedication
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="text-primary" size={32} />}
                            title="Microservices Expert"
                            description="Specialized in building scalable applications with microservices architecture, ensuring modularity and high performance."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<TrendingUp className="text-violet-400" size={32} />}
                            title="Fast Delivery"
                            description="Agile methodology ensures rapid development cycles without compromising quality. On-time, every time."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Star className="text-yellow-400" size={32} />}
                            title="Proven Track Record"
                            description="Successfully delivered 20+ projects for global clients with 90% satisfaction rate. Results that speak."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12"
                    >
                        <StatItem value="5+" label="Years Experience" />
                        <StatItem value="20+" label="Projects Completed" />
                        <StatItem value="90%" label="Client Satisfaction" />
                        <StatItem value="Remote" label="Work Style" />
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text mb-4 md:mb-6 px-4">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet">build</span> something amazing?
                    </h2>
                    <p className="text-base md:text-lg text-text-muted mb-4 max-w-2xl mx-auto px-4">
                        Let's transform your ideas into reality. Available for freelance projects and long-term collaborations.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-text-muted mb-8 md:mb-10 px-4">
                        <span className="flex items-center gap-1.5 md:gap-2">
                            <CheckCircle size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
                            <span className="whitespace-nowrap">Quick Response</span>
                        </span>
                        <span className="flex items-center gap-1.5 md:gap-2">
                            <CheckCircle size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
                            <span className="whitespace-nowrap">Flexible Hours</span>
                        </span>
                        <span className="flex items-center gap-1.5 md:gap-2">
                            <CheckCircle size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
                            <span className="whitespace-nowrap">Fair Pricing</span>
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 max-w-md sm:max-w-none mx-auto">
                        <MagneticButton className="h-14 md:h-16 px-8 md:px-10 bg-primary text-black hover:bg-white font-bold text-base md:text-lg flex items-center gap-2 justify-center w-full sm:w-auto" onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}>
                            <Mail size={18} className="md:w-[22px] md:h-[22px]" /> Start a Project
                        </MagneticButton>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('openWhatsAppModal'))}
                            className="h-14 md:h-16 px-8 md:px-10 rounded-full border border-text/20 text-text hover:bg-text/5 font-medium transition-colors text-base md:text-lg flex items-center gap-2 justify-center w-full sm:w-auto"
                        >
                            <Phone size={18} className="md:w-[22px] md:h-[22px]" /> Schedule Call
                        </button>
                    </div>

                    {/* Contact Details */}
                    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-text/10 flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-x-8 md:gap-y-4 px-4">
                        <a href="mailto:sajalrastogi20@gmail.com" className="flex items-center justify-center sm:justify-start gap-2 text-text-muted hover:text-primary transition-colors">
                            <Mail size={14} className="md:w-4 md:h-4 flex-shrink-0" />
                            <span className="text-xs md:text-sm truncate">sajalrastogi20@gmail.com</span>
                        </a>
                        <a href="tel:+918400840123" className="flex items-center justify-center sm:justify-start gap-2 text-text-muted hover:text-primary transition-colors">
                            <Phone size={14} className="md:w-4 md:h-4 flex-shrink-0" />
                            <span className="text-xs md:text-sm">+91 8400840123</span>
                        </a>
                        <a href="https://linkedin.com/in/sajal-rastogi-5b474b6a" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 text-text-muted hover:text-primary transition-colors">
                            <Linkedin size={14} className="md:w-4 md:h-4 flex-shrink-0" />
                            <span className="text-xs md:text-sm">LinkedIn Profile</span>
                        </a>
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

// Helper Components
const ExperienceItem: React.FC<{
    title: string;
    company: string;
    period: string;
    description: string;
    highlights?: string[];
}> = ({ title, company, period, description, highlights }) => (
    <div className="relative pl-4 md:pl-6 border-l-2 border-primary/30">
        <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
        <h4 className="text-base md:text-lg font-bold text-text">{title}</h4>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs md:text-sm text-text-muted mb-2">
            <span className="font-medium">{company}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[10px] md:text-xs">{period}</span>
        </div>
        <p className="text-text-muted text-xs md:text-sm mb-2 leading-relaxed">{description}</p>
        {highlights && highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2">
                {highlights.map((highlight) => (
                    <span key={highlight} className="px-2 py-0.5 md:py-1 bg-primary/5 border border-primary/10 rounded text-[10px] md:text-xs text-primary">
                        {highlight}
                    </span>
                ))}
            </div>
        )}
    </div>
);

const EducationItem: React.FC<{ degree: string; institution: string; year: string }> = ({ degree, institution, year }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
        <div className="flex-1">
            <h4 className="text-base md:text-lg font-bold text-text">{degree}</h4>
            <p className="text-xs md:text-sm text-text-muted">{institution}</p>
        </div>
        <span className="text-xs md:text-sm text-primary font-medium flex-shrink-0">{year}</span>
    </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; delay: number }> = ({ icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        className="group p-6 md:p-8 rounded-xl md:rounded-2xl bg-surface/50 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(0,240,255,0.3)]"
    >
        <div className="mb-4 md:mb-6 inline-block p-2.5 md:p-3 rounded-lg md:rounded-xl bg-text/5 group-hover:bg-primary/10 transition-colors">
            {icon}
        </div>
        <h3 className="text-lg md:text-xl font-display font-bold text-text mb-2 md:mb-3">{title}</h3>
        <p className="text-sm md:text-base text-text-muted leading-relaxed">{description}</p>
    </motion.div>
);

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
    >
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-1 md:mb-2">{value}</div>
        <div className="text-[10px] sm:text-xs md:text-sm text-text-muted font-mono uppercase tracking-wider leading-tight">{label}</div>
    </motion.div>
);

export default ResumePage;

