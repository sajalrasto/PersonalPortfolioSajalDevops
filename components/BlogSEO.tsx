import React from 'react';
import { BlogPost } from '../services/blogService';

interface BlogSEOProps {
  post?: BlogPost;
  posts?: BlogPost[];
  isListPage?: boolean;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post, posts = [], isListPage = false }) => {
  // Generate schema objects for rendering in JSX
  const schemas: { id: string; data: any }[] = [];

  if (isListPage) {
    // Blog List Page Schema
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://sajalrastogi.com/blog#blog",
      "name": "DevOps Engineering Journal",
      "description": "Latest articles and technical insights from Sajal Rastogi, Senior DevOps Engineer",
      "url": "https://sajalrastogi.com/blog",
      "author": {
        "@type": "Person",
        "@id": "https://sajalrastogi.com/#person",
        "name": "Sajal Rastogi",
        "jobTitle": "Senior DevOps Engineer",
        "url": "https://sajalrastogi.com"
      },
      "publisher": {
        "@type": "Person",
        "@id": "https://sajalrastogi.com/#person",
        "name": "Sajal Rastogi",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sajalrastogi.com/sr-logo.png"
        }
      },
      "inLanguage": "en-US",
      "keywords": [
        "DevOps Engineering Blog",
        "AWS Architecture",
        "Kubernetes Tutorials",
        "Terraform Infrastructure",
        "CI/CD Pipelines",
        "Cloud Engineering",
        "Infrastructure as Code",
        "Platform Engineering",
        "Site Reliability Engineering"
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
          "name": blogPost.author || "Sajal Rastogi"
        },
        "image": blogPost.image && blogPost.image !== '#' ? blogPost.image : "https://sajalrastogi.com/sr-logo.png",
        "url": `https://sajalrastogi.com/blog/${blogPost.slug || blogPost.id}`
      }))
    };

    schemas.push({ id: 'blog-schema-blog', data: blogSchema });

    // ItemList Schema for Blog Posts
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Latest Blog Posts - DevOps Engineering",
      "description": "Latest articles and technical insights from Sajal Rastogi, Senior DevOps Engineer",
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
            "name": blogPost.author || "Sajal Rastogi"
          },
          "image": blogPost.image && blogPost.image !== '#' ? blogPost.image : "https://sajalrastogi.com/sr-logo.png"
        }
      }))
    };

    schemas.push({ id: 'blog-schema-list', data: itemListSchema });

  } else if (post) {
    // Individual Blog Post Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `https://sajalrastogi.com/blog/${post.slug || post.id}`,
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image && post.image !== '#' ? post.image : "https://sajalrastogi.com/sr-logo.png",
      "datePublished": post.publishedDate,
      "dateModified": post.publishedDate,
      "author": {
        "@type": "Person",
        "@id": "https://sajalrastogi.com/#person",
        "name": post.author || "Sajal Rastogi",
        "jobTitle": "Senior DevOps Engineer",
        "sameAs": [
          "https://github.com/sajalrasto9097",
          "https://linkedin.com/in/sajal-rastogi-5b474b6a"
        ]
      },
      "publisher": {
        "@type": "Person",
        "@id": "https://sajalrastogi.com/#person",
        "name": "Sajal Rastogi",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sajalrastogi.com/sr-logo.png",
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
        "DevOps Engineering",
        "AWS Architecture",
        "Kubernetes",
        "Terraform",
        "CI/CD",
        "Infrastructure as Code",
        "Cloud Engineering",
        "Platform Engineering",
        "Site Reliability Engineering"
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

    schemas.push({ id: 'blog-schema-article', data: articleSchema });

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

    schemas.push({ id: 'blog-schema-breadcrumb', data: breadcrumbSchema });
  }

  // Render schemas as script tags in JSX (SEO-friendly - visible in initial HTML)
  return (
    <>
      {schemas.map(schema => (
        <script
          key={schema.id}
          id={schema.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.data) }}
        />
      ))}
    </>
  );
};

export default BlogSEO;