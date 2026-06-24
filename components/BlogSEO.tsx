import React from 'react';
import { BlogPost } from '../services/blogService';

interface BlogSEOProps {
  post?: BlogPost;
  posts?: BlogPost[];
  isListPage?: boolean;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post, posts = [], isListPage = false }) => {
  React.useEffect(() => {
    // Remove existing blog schemas
    const existingSchemas = document.querySelectorAll('script[id^="blog-schema-"]');
    existingSchemas.forEach(script => script.remove());

    if (isListPage) {
      // Blog List Page Schema
      const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": "https://sajalrastogi.com/blog#blog",
        "name": "Engineering Journal - Full Stack Developer Blog",
        "description": "Expert Full Stack Developer's blog featuring tech insights, tutorials, and modern web development best practices. Learn React, Next.js, TypeScript, and more from Vishwjeet Kumar in Gaya, Bihar.",
        "url": "https://sajalrastogi.com/blog",
        "author": {
          "@type": "Person",
          "@id": "https://sajalrastogi.com/#person",
          "name": "Vishwjeet Kumar",
          "jobTitle": "Full Stack Developer",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gaya",
            "addressRegion": "Bihar",
            "addressCountry": "IN"
          }
        },
        "publisher": {
          "@type": "Person",
          "@id": "https://sajalrastogi.com/#person",
          "name": "Vishwjeet Kumar",
          "logo": {
            "@type": "ImageObject",
            "url": "https://sajalrastogi.com/v-logo.png"
          }
        },
        "inLanguage": "en-US",
        "keywords": [
          "Full Stack Developer Blog",
          "Web Developer Gaya",
          "Software Engineer Bihar",
          "React Tutorials",
          "Next.js Tutorials",
          "TypeScript Tutorials",
          "Tech Blog Bihar",
          "Programming Blog India"
        ],
        "blogPost": posts.slice(0, 10).map(blogPost => ({
          "@type": "BlogPosting",
          "@id": `https://sajalrastogi.com/blog/${blogPost.slug || blogPost.id}`,
          "headline": blogPost.title,
          "description": blogPost.excerpt,
          "datePublished": blogPost.publishedDate,
          "dateModified": blogPost.publishedDate,
          "author": {
            "@type": "Person",
            "name": blogPost.author || "Vishwjeet Kumar"
          },
          "image": blogPost.image && blogPost.image !== '#' ? blogPost.image : "https://sajalrastogi.com/v-logo.png",
          "url": `https://sajalrastogi.com/blog/${blogPost.slug || blogPost.id}`
        }))
      };

      // ItemList Schema for Blog Posts
      const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Latest Blog Posts - Full Stack Developer",
        "description": "Latest articles and tutorials from Vishwjeet Kumar, Full Stack Developer in Gaya, Bihar",
        "url": "https://sajalrastogi.com/blog",
        "numberOfItems": posts.length,
        "itemListElement": posts.slice(0, 20).map((blogPost, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "@id": `https://sajalrastogi.com/blog/${blogPost.slug || blogPost.id}`,
            "name": blogPost.title,
            "description": blogPost.excerpt,
            "url": `https://sajalrastogi.com/blog/${blogPost.slug || blogPost.id}`,
            "datePublished": blogPost.publishedDate,
            "author": {
              "@type": "Person",
              "name": blogPost.author || "Vishwjeet Kumar"
            },
            "image": blogPost.image && blogPost.image !== '#' ? blogPost.image : "https://sajalrastogi.com/v-logo.png"
          }
        }))
      };

      // Add schemas
      const blogScript = document.createElement('script');
      blogScript.type = 'application/ld+json';
      blogScript.id = 'blog-schema-blog';
      blogScript.textContent = JSON.stringify(blogSchema);
      document.head.appendChild(blogScript);

      const listScript = document.createElement('script');
      listScript.type = 'application/ld+json';
      listScript.id = 'blog-schema-list';
      listScript.textContent = JSON.stringify(itemListSchema);
      document.head.appendChild(listScript);

    } else if (post) {
      // Individual Blog Post Schema
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `https://sajalrastogi.com/blog/${post.slug || post.id}`,
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image && post.image !== '#' ? post.image : "https://sajalrastogi.com/v-logo.png",
        "datePublished": post.publishedDate,
        "dateModified": post.publishedDate,
        "author": {
          "@type": "Person",
          "@id": "https://sajalrastogi.com/#person",
          "name": post.author || "Vishwjeet Kumar",
          "jobTitle": "Full Stack Developer",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gaya",
            "addressRegion": "Bihar",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://github.com/sajalrasto9097",
            "https://linkedin.com/in/sajal-rastogi-5b474b6a"
          ]
        },
        "publisher": {
          "@type": "Person",
          "@id": "https://sajalrastogi.com/#person",
          "name": "Vishwjeet Kumar",
          "logo": {
            "@type": "ImageObject",
            "url": "https://sajalrastogi.com/v-logo.png",
            "width": 200,
            "height": 200
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://sajalrastogi.com/blog/${post.slug || post.id}`
        },
        "url": `https://sajalrastogi.com/blog/${post.slug || post.id}`,
        "wordCount": post.fullContent ? post.fullContent.replace(/<[^>]*>/g, '').split(/\s+/).length : 500,
        "timeRequired": post.readTime,
        "inLanguage": "en-US",
        "isAccessibleForFree": true,
        "genre": ["Technology", "Web Development", "Programming"],
        "keywords": [
          post.category,
          "Full Stack Developer",
          "Web Development",
          "Programming",
          "Tech Tutorial",
          "Software Engineering",
          post.title
        ],
        "about": {
          "@type": "Thing",
          "name": post.category,
          "description": `${post.category} related content for developers`
        },
        "mentions": [
          {
            "@type": "SoftwareApplication",
            "name": "React",
            "applicationCategory": "JavaScript Library"
          },
          {
            "@type": "SoftwareApplication", 
            "name": "Next.js",
            "applicationCategory": "React Framework"
          },
          {
            "@type": "SoftwareApplication",
            "name": "TypeScript",
            "applicationCategory": "Programming Language"
          }
        ]
      };

      // Add original source attribution if available
      if (post.sourceUrl && post.sourceUrl !== '#') {
        articleSchema.isBasedOn = {
          "@type": "CreativeWork",
          "url": post.sourceUrl,
          "name": post.title,
          "author": {
            "@type": "Organization",
            "name": post.sourceName || "Original Source"
          }
        };
      }

      // BreadcrumbList Schema for Blog Post
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sajalrastogi.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Engineering Journal",
            "item": "https://sajalrastogi.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://sajalrastogi.com/blog/${post.slug || post.id}`
          }
        ]
      };

      // Add schemas
      const articleScript = document.createElement('script');
      articleScript.type = 'application/ld+json';
      articleScript.id = 'blog-schema-article';
      articleScript.textContent = JSON.stringify(articleSchema);
      document.head.appendChild(articleScript);

      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.id = 'blog-schema-breadcrumb';
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(breadcrumbScript);
    }

    return () => {
      // Cleanup
      const schemas = document.querySelectorAll('script[id^="blog-schema-"]');
      schemas.forEach(script => script.remove());
    };
  }, [post, posts, isListPage]);

  return null;
};

export default BlogSEO;