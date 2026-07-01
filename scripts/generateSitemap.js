// Build-time sitemap generation script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock blog posts for build time (in production, you'd fetch from your data source)
const mockBlogPosts = [
  {
    id: 'react-19-features',
    title: 'React 19 New Features and Updates',
    slug: 'react-19-features',
    publishedDate: '2025-01-01T00:00:00.000Z',
    category: 'React'
  },
  {
    id: 'nextjs-15-performance',
    title: 'Next.js 15 Performance Improvements',
    slug: 'nextjs-15-performance',
    publishedDate: '2024-12-30T00:00:00.000Z',
    category: 'Next.js'
  },
  {
    id: 'typescript-5-7-features',
    title: 'TypeScript 5.7 Enhanced Type Safety',
    slug: 'typescript-5-7-features',
    publishedDate: '2024-12-28T00:00:00.000Z',
    category: 'TypeScript'
  },
  {
    id: 'web-development-bihar-trends',
    title: 'Web Development Trends in Bihar 2025',
    slug: 'web-development-bihar-trends-2025',
    publishedDate: '2024-12-25T00:00:00.000Z',
    category: 'Web Development'
  },
  {
    id: 'full-stack-developer-gaya',
    title: 'Why Choose a Senior DevOps Engineer for Cloud Infrastructure',
    slug: 'why-choose-full-stack-developer-gaya-bihar',
    publishedDate: '2024-12-22T00:00:00.000Z',
    category: 'Career'
  },
  {
    id: 'react-vs-ai-development',
    title: 'React Development vs AI Tools: Why Experience Matters',
    slug: 'react-development-vs-ai-tools-experience-matters',
    publishedDate: '2024-12-20T00:00:00.000Z',
    category: 'Opinion'
  },
  {
    id: 'bihar-tech-ecosystem',
    title: 'Growing Tech Ecosystem in Bihar: Opportunities for Developers',
    slug: 'growing-tech-ecosystem-bihar-opportunities-developers',
    publishedDate: '2024-12-18T00:00:00.000Z',
    category: 'Industry'
  },
  {
    id: 'local-business-digital-transformation',
    title: 'Digital Transformation for Local Businesses in Gaya',
    slug: 'digital-transformation-local-businesses-gaya',
    publishedDate: '2024-12-15T00:00:00.000Z',
    category: 'Business'
  }
];

const generateSitemap = () => {
  const baseUrl = 'https://sajalrastogi.com';
  const currentDate = '2025-01-02'; // Fixed current date
  
  // Static URLs
  const staticUrls = [
    { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: 'weekly', priority: '1.0' },
    { loc: `${baseUrl}/services`, lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { loc: `${baseUrl}/services/local-bihar`, lastmod: currentDate, changefreq: 'monthly', priority: '0.95' },
    { loc: `${baseUrl}/web-developer-gaya`, lastmod: currentDate, changefreq: 'monthly', priority: '0.95' },
    { loc: `${baseUrl}/software-engineer-bodhgaya`, lastmod: currentDate, changefreq: 'monthly', priority: '0.95' },
    { loc: `${baseUrl}/resume`, lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { loc: `${baseUrl}/blog`, lastmod: currentDate, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/project-portfolio`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/case-study/angelmonkey`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/case-study/plationathome`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/case-study/cms`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/case-study/tripatakaland`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
  ];
  
  // Dynamic blog post URLs
  const blogUrls = mockBlogPosts.map(post => {
    const publishedDate = post.publishedDate ? new Date(post.publishedDate).toISOString().split('T')[0] : currentDate;
    
    return {
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: publishedDate,
      changefreq: 'monthly',
      priority: '0.7'
    };
  });
  
  const allUrls = [...staticUrls, ...blogUrls];
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
};

// Save sitemap
const sitemapContent = generateSitemap();
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log('✅ Dynamic sitemap generated with', sitemapContent.split('<url>').length - 1, 'URLs');
console.log('📍 Sitemap saved to:', sitemapPath);