import React from 'react';

const OrganizationSchema: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://sajalrastogi.com/#person",
    "name": "Sajal Rastogi",
    "alternateName": "Senior DevOps Engineer | AWS Cloud Architect",
    "description": "Senior DevOps Engineer with 5 years of experience specializing in AWS, Kubernetes, Terraform, CI/CD automation, Infrastructure as Code, and Cloud Architecture.",
    "url": "https://sajalrastogi.com",
    "email": "sajalrastogi20@gmail.com",
    "jobTitle": "Senior DevOps Engineer",
    "experience": {
      "@type": "Organization",
      "name": "DevOps Engineering",
      "duration": "5 Years"
    },
    "knowsAbout": [
      "AWS",
      "Kubernetes",
      "Terraform",
      "Docker",
      "Jenkins",
      "CI/CD",
      "Infrastructure as Code",
      "CloudFormation",
      "AWS CDK",
      "ECS",
      "EKS",
      "RDS",
      "CloudFront",
      "Route53",
      "Azure DevOps",
      "GitHub Actions",
      "Datadog",
      "CloudWatch",
      "Linux",
      "Python",
      "Bash"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ContactPoint",
      "contactType": "professional",
      "url": "https://sajalrastogi.com"
    },
    "sameAs": [
      "https://github.com/sajalrasto",
      "https://linkedin.com/in/sajal-rastogi-5b474b6a"
    ]
  };

  React.useEffect(() => {
    // Remove existing org schema
    const existingSchema = document.querySelector('script[id="org-schema"]');
    if (existingSchema) existingSchema.remove();

    const script = document.createElement('script');
    script.id = 'org-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(organizationSchema);
    document.head.appendChild(script);
  }, []);

  return null;
};

export default OrganizationSchema;