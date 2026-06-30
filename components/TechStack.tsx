import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  Layout, 
  GitBranch, 
  Globe, 
  Cpu, 
  Layers, 
  Terminal, 
  Box, 
  Lock,
  ChartNetwork
} from 'lucide-react';

interface TechItemProps {
  label: string;
  icon: any;
  color?: string;
}

const TechItem: React.FC<TechItemProps> = ({ label, icon: Icon, color = "text-text-muted" }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-text/5 border border-text/5 hover:border-text/20 hover:bg-text/10 transition-all duration-300 group">
    <div className={`p-1.5 rounded-lg bg-surface ${color} group-hover:text-text transition-colors shadow-sm`}>
      <Icon size={16} />
    </div>
    <span className="text-sm font-medium text-text-muted group-hover:text-text transition-colors">{label}</span>
  </div>
);

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle: string;
  icon: any;
  delay?: number;
  glowColor?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = "", 
  title, 
  subtitle, 
  icon: Icon,
  delay = 0,
  glowColor = "from-primary/20"
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`relative group overflow-hidden p-8 rounded-3xl bg-surface border border-text/10 hover:border-primary/20 transition-colors duration-500 shadow-xl ${className}`}
  >
    {/* Hover Glow Effect */}
    <div className={`absolute -inset-px bg-gradient-to-br ${glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl`} />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} className="text-text-muted group-hover:text-text transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted group-hover:text-primary transition-colors">{subtitle}</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-text">{title}</h3>
        </div>
        <div className="w-10 h-10 rounded-full border border-text/10 flex items-center justify-center bg-text/5 group-hover:bg-text/10 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-text-muted group-hover:bg-green-400 transition-colors shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
        </div>
      </div>
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  </motion.div>
);

const TechStack: React.FC = () => {
  return (
    <section className="py-32 px-6 relative" id="tech-stack">
      {/* Schematic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             color: 'var(--text)'
           }} 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block"
            >
              The Stack
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-text leading-tight"
            >
              Cloud <span className="text-text-muted">Infrastructure.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:flex items-center gap-2 text-sm text-text-muted font-mono"
          >
            <Terminal size={14} />
            <span>sys_check: optimal</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {/* AWS Cloud Platform - Largest */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-8"
            title="AWS Cloud Platform"
            subtitle="Cloud Services"
            icon={Cloud}
            glowColor="from-orange-500/20"
            delay={0.1}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <TechItem label="EC2" icon={Server} color="text-orange-400" />
              <TechItem label="ECS" icon={Layers} color="text-orange-400" />
              <TechItem label="EKS" icon={Cpu} color="text-orange-400" />
              <TechItem label="Lambda" icon={Code2} color="text-orange-400" />
              <TechItem label="RDS" icon={Database} color="text-orange-400" />
              <TechItem label="S3" icon={Box} color="text-orange-400" />
              <TechItem label="VPC" icon={Globe} color="text-orange-400" />
              <TechItem label="IAM" icon={Lock} color="text-orange-400" />
              <TechItem label="CloudFront" icon={Globe} color="text-orange-400" />
              <TechItem label="Route53" icon={Globe} color="text-orange-400" />
              <TechItem label="CloudFormation" icon={Code2} color="text-orange-400" />
              <TechItem label="CloudWatch" icon={ChartNetwork} color="text-orange-400" />
              <TechItem label="API Gateway" icon={Server} color="text-orange-400" />
              <TechItem label="SNS/SQS" icon={Layers} color="text-orange-400" />
              <TechItem label="Secrets Manager" icon={Lock} color="text-orange-400" />
              <TechItem label="DocumentDB" icon={Database} color="text-orange-400" />
              <TechItem label="EventBridge" icon={Layers} color="text-orange-400" />
              <TechItem label="Athena" icon={Code2} color="text-orange-400" />
            </div>
          </BentoCard>

          {/* Multi-Cloud & GCP */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-4"
            title="Multi-Cloud"
            subtitle="Cloud Platforms"
            icon={Cloud}
            glowColor="from-blue-500/20"
            delay={0.2}
          >
            <div className="grid grid-cols-1 gap-3">
              <TechItem label="Google Cloud Platform" icon={Cloud} color="text-blue-400" />
              <TechItem label="Compute Engine" icon={Server} color="text-blue-400" />
              <TechItem label="Cloud Storage" icon={Box} color="text-blue-400" />
              <TechItem label="App Engine" icon={Server} color="text-blue-400" />
            </div>
          </BentoCard>

          {/* Infrastructure as Code */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-6"
            title="Infrastructure as Code"
            subtitle="IaC & Automation"
            icon={Code2}
            glowColor="from-purple-500/20"
            delay={0.3}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="Terraform" icon={Terminal} color="text-purple-400" />
              <TechItem label="AWS CDK" icon={Layers} color="text-purple-400" />
              <TechItem label="CloudFormation" icon={Code2} color="text-purple-400" />
              <TechItem label="Ansible" icon={Code2} color="text-purple-400" />
              <TechItem label="Boto3" icon={Code2} color="text-purple-400" />
              <TechItem label="Serverless Framework" icon={Layers} color="text-purple-400" />
            </div>
          </BentoCard>

          {/* Container & Orchestration */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-6"
            title="Container Management"
            subtitle="Container Tech"
            icon={Box}
            glowColor="from-cyan-500/20"
            delay={0.4}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="Docker" icon={Box} color="text-cyan-400" />
              <TechItem label="Kubernetes" icon={Layers} color="text-cyan-400" />
              <TechItem label="ECS" icon={Layers} color="text-cyan-400" />
              <TechItem label="ECR" icon={Box} color="text-cyan-400" />
            </div>
          </BentoCard>

          {/* CI/CD & Build Tools */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-7"
            title="CI/CD & Source Control"
            subtitle="DevOps Pipeline"
            icon={GitBranch}
            glowColor="from-red-500/20"
            delay={0.5}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <TechItem label="Jenkins" icon={Terminal} color="text-red-500" />
              <TechItem label="Azure DevOps Pipelines" icon={Code2} color="text-blue-600" />
              <TechItem label="SonarQube" icon={ChartNetwork} color="text-text-muted" />
              <TechItem label="Git" icon={GitBranch} color="text-red-600" />
              <TechItem label="GitHub" icon={GitBranch} color="text-text-muted" />
              <TechItem label="GitLab" icon={GitBranch} color="text-orange-500" />
              <TechItem label="Azure Repos" icon={GitBranch} color="text-blue-600" />
              <TechItem label="Bitbucket" icon={GitBranch} color="text-blue-500" />
              <TechItem label="Maven" icon={Code2} color="text-red-600" />
            </div>
          </BentoCard>

          {/* Monitoring & Logging */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-5"
            title="Monitoring & Logging"
            subtitle="Observability"
            icon={ChartNetwork}
            glowColor="from-green-500/20"
            delay={0.6}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="Datadog" icon={ChartNetwork} color="text-purple-500" />
              <TechItem label="CloudWatch" icon={ChartNetwork} color="text-orange-400" />
              <TechItem label="Prometheus" icon={ChartNetwork} color="text-orange-500" />
              <TechItem label="Grafana" icon={ChartNetwork} color="text-green-500" />
              <TechItem label="ELK Stack" icon={ChartNetwork} color="text-yellow-600" />
              <TechItem label="Elasticsearch" icon={Database} color="text-yellow-600" />
              <TechItem label="Kibana" icon={ChartNetwork} color="text-yellow-600" />
              <TechItem label="Uptime Kuma" icon={ChartNetwork} color="text-green-400" />
            </div>
          </BentoCard>

          {/* Databases & Caching */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-6"
            title="Databases & Caching"
            subtitle="Data Storage"
            icon={Database}
            glowColor="from-blue-500/20"
            delay={0.7}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="PostgreSQL" icon={Database} color="text-blue-400" />
              <TechItem label="MySQL" icon={Database} color="text-blue-500" />
              <TechItem label="MongoDB" icon={Database} color="text-green-500" />
              <TechItem label="MongoDB Atlas" icon={Database} color="text-green-500" />
              <TechItem label="SQL Server" icon={Database} color="text-red-500" />
              <TechItem label="Redis" icon={Layers} color="text-red-600" />
              <TechItem label="RabbitMQ" icon={Layers} color="text-orange-400" />
              <TechItem label="SQS" icon={Layers} color="text-orange-400" />
            </div>
          </BentoCard>

          {/* Web/App Servers & Build Tools */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-6"
            title="Application Servers"
            subtitle="Server Tech"
            icon={Server}
            glowColor="from-yellow-500/20"
            delay={0.8}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="Nginx" icon={Server} color="text-green-400" />
              <TechItem label="Apache HTTP Server" icon={Server} color="text-red-600" />
              <TechItem label="Tomcat" icon={Server} color="text-red-700" />
              <TechItem label="Gradle" icon={Code2} color="text-blue-600" />
              <TechItem label="NPM" icon={Code2} color="text-red-500" />
              <TechItem label="Poetry" icon={Code2} color="text-blue-400" />
            </div>
          </BentoCard>

          {/* Programming & Scripting */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-5"
            title="Programming Languages"
            subtitle="Scripting"
            icon={Terminal}
            glowColor="from-cyan-500/20"
            delay={0.9}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="Python" icon={Code2} color="text-blue-500" />
              <TechItem label="Bash/Shell" icon={Terminal} color="text-green-400" />
              <TechItem label="Java" icon={Code2} color="text-red-600" />
              <TechItem label="YAML" icon={Code2} color="text-red-500" />
            </div>
          </BentoCard>

          {/* Operating Systems */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-5"
            title="Operating Systems"
            subtitle="Linux & Windows"
            icon={Terminal}
            glowColor="from-yellow-500/20"
            delay={1.0}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="Red Hat Linux" icon={Terminal} color="text-red-600" />
              <TechItem label="CentOS" icon={Terminal} color="text-red-600" />
              <TechItem label="Ubuntu" icon={Terminal} color="text-orange-600" />
              <TechItem label="Debian" icon={Terminal} color="text-red-700" />
              <TechItem label="Windows" icon={Server} color="text-blue-600" />
            </div>
          </BentoCard>

          {/* Additional Tools */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-5"
            title="Additional Tools"
            subtitle="DevOps Ecosystem"
            icon={Box}
            glowColor="from-purple-500/20"
            delay={1.1}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="Azure Artifacts" icon={Box} color="text-blue-600" />
              <TechItem label="Jira" icon={ChartNetwork} color="text-blue-500" />
              <TechItem label="Azure Boards" icon={ChartNetwork} color="text-blue-600" />
              <TechItem label="PIP" icon={Code2} color="text-blue-500" />
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default TechStack;