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
  title = 'Vishwjeet Kumar | Expert Full Stack Developer | React, Next.js, TypeScript Specialist',
  description = 'Expert Full Stack Developer specializing in React, Next.js, TypeScript, and modern web development. Building scalable applications with premium UI/UX design. Available for projects.',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://vishwjeetkumar.me',
  type = 'website',
  author = 'Vishwjeet Kumar',
  publishedTime,
  modifiedTime,
  keywords = [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'Software Engineer Freelance',
    'Freelance Software Engineer',
    'Freelance Full Stack Developer',
    'Hire Full Stack Developer',
    'Hire Software Engineer',
    'UI/UX Developer',
    'JavaScript Developer',
    'Node.js Developer',
    'Full Stack Engineer',
    'React Expert',
    'Next.js Expert',
    'TypeScript Expert',
    'Web Development Services',
    'Custom Web Development',
    'Responsive Web Design',
    'Modern Web Applications',
    'Scalable Web Solutions',
    'Experienced Developer',
    'Professional Developer',
    'Expert Developer'
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
    updateMetaTag('og:image', image.startsWith('http') ? image : `https://vishwjeetkumar.me${image}`, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'Vishwjeet Kumar - Full Stack Developer', 'property');
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
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `https://vishwjeetkumar.me${image}`);
    updateMetaTag('twitter:site', '@vishwjeetkumar', 'name');
    updateMetaTag('twitter:creator', '@vishwjeetkumar', 'name');

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
      '@id': 'https://vishwjeetkumar.me/#person',
      name: 'Vishwjeet Kumar',
      alternateName: 'Vishwjeet',
      jobTitle: 'Full Stack Developer',
      description: 'Expert Full Stack Developer specializing in React, Next.js, TypeScript, and modern web development. Building scalable applications with premium UI/UX design.',
      url: 'https://vishwjeetkumar.me',
      image: 'https://vishwjeetkumar.me/v-logo.png',
      sameAs: [
        'https://github.com/Vishwjeet9097',
        'https://linkedin.com/in/vishwjeet-kumar-5848711b9',
        'https://vishwjeetkumar.me'
      ],
      email: 'info.vishwjeetkumar@gmail.com',
      knowsAbout: [
        'Full Stack Development',
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
        name: 'Freelance Full Stack Developer',
        url: 'https://vishwjeetkumar.me'
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Full Stack Developer',
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
      '@id': 'https://vishwjeetkumar.me/#organization',
      name: 'Vishwjeet Kumar - Full Stack Developer',
      url: 'https://vishwjeetkumar.me',
      logo: 'https://vishwjeetkumar.me/v-logo.png',
      description: 'Expert Full Stack Development Services - React, Next.js, TypeScript, and Modern Web Applications',
      founder: {
        '@type': 'Person',
        name: 'Vishwjeet Kumar'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info.vishwjeetkumar@gmail.com',
        contactType: 'Customer Service',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Hindi']
      },
      sameAs: [
        'https://github.com/Vishwjeet9097',
        'https://linkedin.com/in/vishwjeet-kumar-5848711b9'
      ]
    };

    // Structured Data - WebPage/Article Schema
    const webpageSchema = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'BlogPosting' : 'WebPage',
      '@id': url,
      headline: optimizedTitle,
      description: optimizedDescription,
      image: image.startsWith('http') ? image : `https://vishwjeetkumar.me${image}`,
      url: url,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      ...(type === 'article' && {
        author: {
          '@type': 'Person',
          '@id': 'https://vishwjeetkumar.me/#person',
          name: author,
          url: 'https://vishwjeetkumar.me'
        },
        publisher: {
          '@type': 'Person',
          '@id': 'https://vishwjeetkumar.me/#person',
          name: 'Vishwjeet Kumar',
          url: 'https://vishwjeetkumar.me',
          logo: {
            '@type': 'ImageObject',
            url: 'https://vishwjeetkumar.me/v-logo.png'
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
