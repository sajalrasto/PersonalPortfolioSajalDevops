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

export const SERVICES: Service[] = [ { id: "1", title: "AWS Cloud Architecture", description: "Designing secure, scalable, and highly available cloud platforms using AWS services including VPC, ECS, EKS, CloudFront, Route53, RDS, and S3.", icon: Cloud, }, { id: "2", title: "DevOps Engineering", description: "Automating infrastructure provisioning, deployments, and operational workflows using Terraform, CloudFormation, Jenkins, and Infrastructure as Code principles.", icon: Settings, }, { id: "3", title: "Kubernetes & Containers", description: "Deploying and managing containerized workloads using Docker, Kubernetes, Helm, ECS, and EKS for scalable production environments.", icon: Cpu, }, { id: "4", title: "CI/CD Automation", description: "Building reliable CI/CD pipelines with Jenkins and Azure DevOps to accelerate software delivery and improve deployment consistency.", icon: GitBranch, }, { id: "5", title: "Observability & Reliability", description: "Implementing monitoring, logging, alerting, and troubleshooting practices using CloudWatch and Datadog to improve system reliability.", icon: ChartNetwork, }, { id: "6", title: "Infrastructure as Code", description: "Managing cloud infrastructure through reusable, version-controlled code using Terraform, AWS CDK, and CloudFormation.", icon: Terminal, }, ];

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

export const PROJECTS: Project[] = [ { id: "1", title: "National Scale Government Digital Platform", category: "Cloud Infrastructure", description: "Designed and managed AWS infrastructure supporting a large-scale government platform using ECS, Aurora PostgreSQL, Redis, CloudFront, S3, and secure networking.", image: "https://picsum.photos/800/600?random=1", tech: ["AWS", "ECS", "Aurora PostgreSQL", "Redis", "CloudFront"], }, { id: "2", title: "Enterprise Digital Document Platform", category: "Platform Engineering", description: "Built deployment automation, cloud infrastructure, monitoring, and operational workflows for a document management platform serving enterprise users.", image: "https://picsum.photos/800/600?random=2", tech: ["AWS", "Terraform", "Jenkins", "Docker"], }, { id: "3", title: "Disaster Recovery Platform", category: "Business Continuity", description: "Provisioned and automated disaster recovery infrastructure for a leading insurance organization, ensuring high availability and rapid recovery.", image: "https://picsum.photos/800/600?random=3", tech: ["AWS", "Terraform", "RDS", "Route53"], }, { id: "4", title: "CCaaS Reliability Engineering", category: "Site Reliability", description: "Improved platform stability, deployment reliability, and operational observability for a large customer experience platform.", image: "https://picsum.photos/800/600?random=4", tech: ["Kubernetes", "Docker", "AWS", "Jenkins"], }, ];

export const STATS: Stat[] = [
  { value: "4+", label: "Years Experience" },
  { value: "50+", label: "Production Deployments" },
  { value: "AWS", label: "Cloud Expertise" },
  { value: "24x7", label: "Platform Reliability" },
];

export const INDUSTRIES = [
  "Government",
  "Cloud Platforms",
  "Enterprise Software",
  "Insurance",
  "Customer Experience",
];
