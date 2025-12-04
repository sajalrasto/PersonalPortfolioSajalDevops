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
}

const SEO: React.FC<SEOProps> = ({
  title = 'Vishwjeet Kumar | Full-Stack Engineer',
  description = 'Full-stack engineering meets premium design. Building scalable applications and immersive interfaces.',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  keywords = ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development'],
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

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
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    if (author) updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    if (author) updateMetaTag('og:author', author, 'property');
    if (publishedTime) updateMetaTag('article:published_time', publishedTime, 'property');
    if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime, 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebPage',
      headline: title,
      description: description,
      image: image,
      url: url,
      ...(author && { author: { '@type': 'Person', name: author } }),
      ...(publishedTime && { datePublished: publishedTime }),
      ...(modifiedTime && { dateModified: modifiedTime }),
      ...(type === 'article' && {
        publisher: {
          '@type': 'Person',
          name: 'Vishwjeet Kumar',
        },
      }),
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [title, description, image, url, type, author, publishedTime, modifiedTime, keywords]);

  return null;
};

export default SEO;

