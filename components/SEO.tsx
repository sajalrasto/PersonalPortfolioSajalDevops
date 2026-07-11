import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  articleSection?: string;
  tags?: string[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Sajal Rastogi | Senior DevOps Engineer | AWS Cloud Architect',
  description = 'Senior DevOps Engineer building scalable AWS, Kubernetes, Terraform, and CI/CD solutions for modern cloud platforms and reliable infrastructure.',
  image = 'https://sajalrastogi.com/sr-logo.png',
  url = typeof window !== 'undefined' ? window.location.href : 'https://sajalrastogi.com',
  type = 'website',
  author = 'Sajal Rastogi',
  publishedTime,
  modifiedTime,
  keywords = [
    'Senior DevOps Engineer',
    'AWS DevOps Engineer',
    'DevOps Engineer India',
    'Kubernetes Engineer',
    'Cloud Engineer',
    'Infrastructure Engineer',
    'Platform Engineer',
    'Site Reliability Engineer',
    'Terraform Engineer',
    'AWS Cloud Engineer',
    'Docker',
    'Jenkins',
    'Azure DevOps',
    'GitHub Actions',
    'Linux',
    'CI/CD',
    'Infrastructure as Code',
    'Kubernetes',
    'Amazon Web Services',
    'CloudFormation',
    'AWS CDK',
    'ECS',
    'EKS',
    'CloudFront',
    'Route53',
    'RDS',
    'DevOps Portfolio'
  ],
  articleSection,
  tags = [],
  breadcrumbs,
  faq,
  noindex = false,
  nofollow = false,
}) => {
  useEffect(() => {
    // Update document title (optimized for CTR - 55-60 characters)
    const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
    document.title = optimizedTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
    updateMetaTag('description', optimizedDescription);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', author);
    updateMetaTag('robots', `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`);
    
    // Geo tags for local SEO
    updateMetaTag('geo.region', 'IN');
    updateMetaTag('geo.placename', 'India');

    // Open Graph tags (Enhanced for better social sharing)
    updateMetaTag('og:title', optimizedTitle, 'property');
    updateMetaTag('og:description', optimizedDescription, 'property');
    updateMetaTag('og:image', image.startsWith('http') ? image : `https://sajalrastogi.com${image}`, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'Sajal Rastogi - Senior DevOps Engineer', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');
    if (author) {
      updateMetaTag('og:author', author, 'property');
      updateMetaTag('article:author', author, 'property');
    }
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, 'property');
      updateMetaTag('og:published_time', publishedTime, 'property');
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, 'property');
    }
    if (articleSection) {
      updateMetaTag('article:section', articleSection, 'property');
    }
    if (tags.length > 0) {
      tags.forEach((tag, index) => {
        updateMetaTag(`article:tag`, tag, 'property');
      });
    }

    // Twitter Card tags (Enhanced)
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', optimizedTitle);
    updateMetaTag('twitter:description', optimizedDescription);
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `https://sajalrastogi.com${image}`);
    updateMetaTag('twitter:site', '@SajalRastogitTo', 'name');
    updateMetaTag('twitter:creator', '@SajalRastogitTo', 'name');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Remove old structured data scripts
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]');
    oldScripts.forEach(script => script.remove());

    // Structured Data - Person Schema (For Google Knowledge Graph)
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://sajalrastogi.com/#person',
      name: 'Sajal Rastogi',
      alternateName: 'Sajal',
      jobTitle: 'Senior DevOps Engineer',
      description: 'Senior DevOps Engineer specializing in AWS cloud architecture, Kubernetes operations, Terraform infrastructure automation, CI/CD orchestration, and platform engineering. Building scalable, reliable cloud infrastructure with industry best practices.',
      url: 'https://sajalrastogi.com',
      image: 'https://sajalrastogi.com/sr-logo.png',
      sameAs: [
        'https://github.com/sajalrasto9097',
        'https://linkedin.com/in/sajal-rastogi-5b474b6a',
        'https://sajalrastogi.com'
      ],
      email: 'sajalrastogi20@gmail.com',
      knowsAbout: [
        'DevOps Engineering',
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Web Development',
        'UI/UX Design',
        'Frontend Development',
        'Backend Development',
        'Software Engineering',
        'Responsive Web Design',
        'Modern Web Applications'
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Software Engineering Education'
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Senior DevOps Engineer',
        url: 'https://sajalrastogi.com'
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'DevOps Engineer',
        occupationLocation: {
          '@type': 'Country',
          name: 'India'
        }
      }
    };

    // Structured Data - Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://sajalrastogi.com/#organization',
      name: 'Sajal Rastogi - Senior DevOps Engineer',
      url: 'https://sajalrastogi.com',
      logo: 'https://sajalrastogi.com/sr-logo.png',
      description: 'Expert DevOps Engineering Services - AWS, Kubernetes, Terraform, CI/CD Pipelines, and Cloud Infrastructure Automation',
      founder: {
        '@type': 'Person',
        name: 'Sajal Rastogi'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'sajalrastogi20@gmail.com',
        contactType: 'Customer Service',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Hindi']
      },
      sameAs: [
        'https://github.com/sajalrasto9097',
        'https://linkedin.com/in/sajal-rastogi-5b474b6a'
      ]
    };

    // Structured Data - WebPage/Article Schema
    const webpageSchema = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'BlogPosting' : 'WebPage',
      '@id': url,
      headline: optimizedTitle,
      description: optimizedDescription,
      image: image.startsWith('http') ? image : `https://sajalrastogi.com${image.startsWith('/') ? image : '/' + image}`,
      url: url,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      ...(type === 'article' && {
        author: {
          '@type': 'Person',
          '@id': 'https://sajalrastogi.com/#person',
          name: author,
          url: 'https://sajalrastogi.com'
        },
        publisher: {
          '@type': 'Person',
          '@id': 'https://sajalrastogi.com/#person',
          name: 'Sajal Rastogi',
          url: 'https://sajalrastogi.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://sajalrastogi.com/sr-logo.png'
          }
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        },
        ...(articleSection && { articleSection }),
        ...(tags.length > 0 && { keywords: tags.join(', ') })
      })
    };

    // Structured Data - BreadcrumbList Schema
    let breadcrumbSchema = null;
    if (breadcrumbs && breadcrumbs.length > 0) {
      breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url
        }))
      };
    }

    // Structured Data - FAQPage Schema
    let faqSchema = null;
    if (faq && faq.length > 0) {
      faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      };
    }

    // Add all structured data scripts
    const schemas = [
      personSchema,
      organizationSchema,
      webpageSchema,
      breadcrumbSchema,
      faqSchema
    ].filter(Boolean);

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', `structured-data-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      // Remove dynamically added structured data on unmount
      const dynamicScripts = document.querySelectorAll('script[id^="structured-data-"]');
      dynamicScripts.forEach(script => script.remove());
    };
  }, [title, description, image, url, type, author, publishedTime, modifiedTime, keywords, articleSection, tags, breadcrumbs, faq, noindex, nofollow]);

  return null;
};

export default SEO;
