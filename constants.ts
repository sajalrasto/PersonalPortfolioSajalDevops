import {
  Code,
  ShoppingCart,
  Layout,
  Server,
  Smartphone,
  Settings,
  Database,
  Globe,
  Layers,
  Cpu,
  GitBranch,
  Terminal,
  Cloud,
  UserCircle,
  ChartNetwork,
  Sparkle,
  Sparkles,
} from "lucide-react";
import { Project, Service, Skill, Stat } from "./types";

export const SERVICES: Service[] = [
  {
    id: "1",
    title: "Full-stack Website Development",
    description:
      "End-to-end web solutions using Next.js, React, and robust backend architectures.",
    icon: Sparkles,
  },
  {
    id: "2",
    title: "E-commerce Systems",
    description:
      "Scalable online stores with secure payment gateways and inventory management.",
    icon: ShoppingCart,
  },
  {
    id: "3",
    title: "Custom Web Applications",
    description:
      "Tailored SaaS products and internal tools designed for specific business needs.",
    icon: Code,
  },
  {
    id: "4",
    title: "API & Backend Development",
    description:
      "High-performance REST & GraphQL APIs built with Node.js, Laravel, or Spring Boot.",
    icon: ChartNetwork,
  },
  {
    id: "5",
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications using React Native for iOS and Android.",
    icon: Smartphone,
  },
  {
    id: "6",
    title: "Personal Portfolio Websites",
    description:
      "Showcasing individual skills, projects, and experiences through custom-designed websites.",
    icon: UserCircle,
  },
];

export const SKILLS: Skill[] = [
  { name: "React", icon: Code, category: "frontend" },
  { name: "Next.js", icon: Layers, category: "frontend" },
  { name: "Tailwind", icon: Layout, category: "frontend" },
  { name: "Node.js", icon: Server, category: "backend" },
  { name: "Laravel", icon: Database, category: "backend" },
  { name: "PHP", icon: Code, category: "backend" },
  { name: "Java", icon: Code, category: "backend" },
  { name: "Spring Boot", icon: Server, category: "backend" },
  { name: "MySQL", icon: Database, category: "backend" },
  { name: "MongoDB", icon: Database, category: "backend" },
  { name: "Docker", icon: Cloud, category: "devops" },
  { name: "AWS", icon: Cloud, category: "devops" },
  { name: "Git", icon: GitBranch, category: "devops" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Angel Monkey Ecommerce",
    category: "E-commerce",
    description:
      "A high-performance fashion marketplace built with Next.js and Laravel API. Features real-time inventory and AI recommendations.",
    image: "https://picsum.photos/800/600?random=1",
    tech: ["Next.js", "Laravel", "MySQL", "Stripe"],
  },
  {
    id: "2",
    title: "Plantation At Home",
    category: "Food Delivery",
    description:
      "Plantation At Home is a modern web platform for discovering and learning about indoor and outdoor plants. Users can browse a dynamic catalog, request air quality tests, and access plant care guides. The admin panel enables dynamic management of plant data and content.",
    image: "https://picsum.photos/800/600?random=2",
    tech: ["Angular", "Node.js", "Socket.io", "MongoDB"],
  },
  {
    id: "3",
    title: "University Management System",
    category: "EdTech",
    description:
      "Comprehensive ERP for universities handling admissions, grading, and scheduling for over 10,000 students.",
    image: "https://picsum.photos/800/600?random=3",
    tech: ["Angular", "Laravel", "MySQL", "AWS"],
  },
  {
    id: "4",
    title: "Tripataka Land Travel",
    category: "Travel Agency",
    description:
      "Tripatakaland Travels is a modern travel agency platform for creating, managing, and booking dynamic travel packages. The admin panel enables real-time content updates and role-based access for admins, agents, and customers.",
    image: "https://picsum.photos/800/600?random=4",
    tech: ["Angular", "Laravel", "Tailwind"],
  },
];

export const STATS: Stat[] = [
  { value: "20+", label: "Completed Projects" },
  { value: "90%", label: "Client Satisfaction" },
  { value: "10+", label: "Tech Stack Mastery" },
];

export const INDUSTRIES = [
  "E-commerce",
  "Healthcare",
  "Fintech",
  "Education",
  "Automation / SaaS",
];
