// Dynamic Sitemap Generator for Blog Posts
import { getAllBlogPosts } from '../services/blogService';

export const generateDynamicSitemap = (): string => {
  const baseUrl = 'https://vishwjeetkumar.me';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Get all blog posts
  const blogPosts = getAllBlogPosts();
  
  // Static URLs
  const staticUrls = [
    { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: 'weekly', priority: '1.0' },
    { loc: `${baseUrl}/services`, lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { loc: `${baseUrl}/resume`, lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { loc: `${baseUrl}/blog`, lastmod: currentDate, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/project-portfolio`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/case-study/angelmonkey`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/case-study/plationathome`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/case-study/cms`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/case-study/tripatakaland`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
  ];
  
  // Dynamic blog post URLs
  const blogUrls = blogPosts.map(post => {
    const slug = post.slug || post.id || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const publishedDate = post.publishedDate ? new Date(post.publishedDate).toISOString().split('T')[0] : currentDate;
    
    return {
      loc: `${baseUrl}/blog/${slug}`,
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

// Function to save sitemap to public folder (for build process)
export const saveDynamicSitemap = (): void => {
  if (typeof window === 'undefined') {
    // Only run on server/build time
    const fs = require('fs');
    const path = require('path');
    
    const sitemapContent = generateDynamicSitemap();
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log('✅ Dynamic sitemap generated successfully!');
  }
};