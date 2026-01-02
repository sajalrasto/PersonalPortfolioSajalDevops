// Blog Service - Daily Blog Publishing System
// Uses free APIs and localStorage to automatically publish new blog posts daily

import { logger } from "../utils/logger";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  sourceUrl: string;
  publishedDate: string; // ISO date string for tracking
  fullContent?: string; // Full HTML content from RSS
  author?: string; // Author name if available
  sourceName?: string; // Source name (e.g., "Dev.to", "Hacker News")
  slug?: string; // SEO-friendly URL slug
}

const STORAGE_KEY = "blog_posts";
const LAST_UPDATE_KEY = "blog_last_update";

// Free RSS Feeds for Real Tech News - Trending & Popular Content (No API Key Required)
// Prioritized by content quality and reliability
const RSS_FEEDS = [
  {
    name: "Dev.to - Top Posts",
    url: "https://dev.to/feed",
    category: "Development",
    type: "trending", // Dev.to feed shows popular posts with full content
  },
  {
    name: "FreeCodeCamp - Latest",
    url: "https://www.freecodecamp.org/news/rss/",
    category: "Programming",
    type: "latest",
  },
  {
    name: "CSS-Tricks",
    url: "https://css-tricks.com/feed/",
    category: "Frontend",
    type: "latest",
  },
  {
    name: "Smashing Magazine",
    url: "https://www.smashingmagazine.com/feed/",
    category: "Web Design",
    type: "latest",
  },
  {
    name: "TechCrunch - Latest",
    url: "https://techcrunch.com/feed/",
    category: "Tech",
    type: "trending", // TechCrunch covers trending tech news
  },
  {
    name: "The Verge - Tech",
    url: "https://www.theverge.com/rss/index.xml",
    category: "Tech",
    type: "trending",
  },
  {
    name: "Hacker News - Top Stories",
    url: "https://hnrss.org/frontpage",
    category: "Tech",
    type: "trending", // Front page usually has trending content (may have limited content)
  },
];

// Free RSS to JSON converter (CORS proxy)
const RSS_TO_JSON_API = "https://api.rss2json.com/v1/api.json?rss_url=";

// Keywords that indicate trending/hot topics
const TRENDING_KEYWORDS = [
  "breakthrough",
  "announces",
  "launches",
  "new",
  "latest",
  "update",
  "release",
  "introduces",
  "unveils",
  "revolutionary",
  "game-changing",
  "major",
  "significant",
  "trending",
  "popular",
  "viral",
];

// Check if a post title suggests it's trending
function isLikelyTrending(title: string): boolean {
  const lowerTitle = title.toLowerCase();
  return TRENDING_KEYWORDS.some((keyword) => lowerTitle.includes(keyword));
}

// Trending tech topics for fallback blog generation
const TRENDING_TOPICS = [
  {
    category: "AI",
    topics: [
      "GPT-5 Rumors: What to Expect from OpenAI's Next Model",
      "Google's Gemini 2.0: Multimodal AI Revolution",
      "Anthropic Claude 4: Enhanced Reasoning Capabilities",
      "Meta Llama 4: Open Source AI for Enterprise",
      "Microsoft Copilot Pro: Advanced AI Features",
      "Apple Intelligence: On-Device AI Processing",
      "NVIDIA Blackwell: Next-Gen AI Chips",
      "Stability AI: Open Source Image Generation",
      "Midjourney v7: Photorealistic AI Art",
      "Runway ML: AI Video Generation Tools",
      "Perplexity AI: Search Engine Revolution",
      "Character.AI: Conversational AI Platform",
      "Hugging Face: Open Source AI Hub",
      "LangChain: AI Application Framework",
      "Ollama: Local LLM Deployment",
    ],
    excerpts: [
      "Latest developments in artificial intelligence and machine learning are transforming how we build applications.",
      "AI models are becoming more capable, efficient, and accessible to developers worldwide.",
      "The future of AI is here, with new models pushing the boundaries of what's possible.",
      "Enterprise AI adoption is accelerating with new tools and platforms.",
      "Open source AI is democratizing access to advanced machine learning capabilities.",
    ],
  },
  {
    category: "Frontend",
    topics: [
      "React 20: Concurrent Features and Performance",
      "Next.js 16: Server Components Evolution",
      "Vite 6: Lightning Fast Build Tool",
      "TypeScript 5.7: Enhanced Type Safety",
      "Tailwind CSS 4: New Utility Classes",
      "Svelte 5: Runes and Reactivity",
      "Astro 4: Islands Architecture",
      "Remix 2.0: Full-Stack Framework",
      "SolidJS: Fine-Grained Reactivity",
      "Qwik: Resumable Framework",
      "Vue 4: Composition API Updates",
      "Angular 19: Standalone Components",
      "Web Components: Native Browser Support",
      "Progressive Web Apps: Offline First",
      "WebAssembly: High Performance Web",
    ],
    excerpts: [
      "Frontend frameworks are evolving rapidly with new features and performance improvements.",
      "Modern web development is focusing on better developer experience and user performance.",
      "The JavaScript ecosystem continues to innovate with new tools and frameworks.",
      "Build tools are becoming faster and more efficient for large-scale applications.",
      "Type safety and developer experience are priorities in modern frontend development.",
    ],
  },
  {
    category: "Backend",
    topics: [
      "Node.js 22: Performance Improvements",
      "Deno 2.0: Secure Runtime Environment",
      "Bun: All-in-One JavaScript Runtime",
      "Fastify: High Performance Web Framework",
      "tRPC: End-to-End Type Safety",
      "GraphQL: Modern API Architecture",
      "PostgreSQL 17: Database Features",
      "MongoDB 8: Document Database Updates",
      "Redis 8: In-Memory Data Store",
      "Docker: Container Orchestration",
      "Kubernetes: Cloud Native Deployments",
      "Serverless: AWS Lambda Updates",
      "Edge Computing: Cloudflare Workers",
      "Microservices: Architecture Patterns",
      "API Design: REST vs GraphQL",
    ],
    excerpts: [
      "Backend technologies are focusing on performance, scalability, and developer productivity.",
      "Modern backend architectures are embracing serverless and edge computing.",
      "Database technologies are evolving to handle larger datasets and better performance.",
      "API design patterns are improving developer experience and type safety.",
      "Cloud-native technologies are making deployment and scaling easier.",
    ],
  },
  {
    category: "DevOps",
    topics: [
      "GitHub Actions: CI/CD Automation",
      "GitLab CI: Pipeline Optimization",
      "Jenkins: Continuous Integration",
      "Terraform: Infrastructure as Code",
      "Ansible: Configuration Management",
      "Kubernetes: Container Orchestration",
      "Docker: Containerization Best Practices",
      "AWS: Cloud Services Updates",
      "Azure: Microsoft Cloud Platform",
      "GCP: Google Cloud Platform",
      "Vercel: Frontend Deployment",
      "Netlify: JAMstack Hosting",
      "Cloudflare: Edge Network",
      "Monitoring: Observability Tools",
      "Security: DevSecOps Practices",
    ],
    excerpts: [
      "DevOps tools are automating deployment and infrastructure management.",
      "CI/CD pipelines are becoming more efficient and reliable.",
      "Cloud platforms are offering new services and improved performance.",
      "Infrastructure as code is standardizing deployment practices.",
      "Monitoring and observability are critical for production applications.",
    ],
  },
];

// Get random image from Unsplash based on category
function getCategoryImage(category: string): string {
  const imageMap: Record<string, string[]> = {
    AI: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1676299080923-7e40a4e5b5e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    Frontend: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    Backend: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    DevOps: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  };

  const images = imageMap[category] || imageMap.AI;
  return images[Math.floor(Math.random() * images.length)];
}

// Generate a new blog post (tries RSS first, then falls back to generation)
async function generateBlogPost(): Promise<BlogPost> {
  // Try to fetch real blog post from RSS feeds first
  const rssPost = await fetchBlogFromRSS();
  if (rssPost) {
    return rssPost;
  }

  // Fallback to generated post from trending topics
  return generateBlogPostFromTopics();
}

// Generate a new blog post from trending topics (fallback)
function generateBlogPostFromTopics(): BlogPost {
  const categoryData =
    TRENDING_TOPICS[Math.floor(Math.random() * TRENDING_TOPICS.length)];
  const topicIndex = Math.floor(Math.random() * categoryData.topics.length);
  const excerptIndex = Math.floor(Math.random() * categoryData.excerpts.length);

  const title = categoryData.topics[topicIndex];
  const excerpt = categoryData.excerpts[excerptIndex];
  const category = categoryData.category;
  const readTime = `${Math.floor(Math.random() * 4) + 5} min read`;

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const id = `blog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    id,
    title,
    excerpt,
    date: dateStr,
    readTime,
    category,
    image: getCategoryImage(category),
    sourceUrl: `https://example.com/blog/${id}`,
    publishedDate: today.toISOString(),
  };
}

// Fetch real blog post from RSS feeds - Prioritizes Trending Content
async function fetchBlogFromRSS(): Promise<BlogPost | null> {
  try {
    // Sort feeds: trending first, then latest
    const sortedFeeds = [...RSS_FEEDS].sort((a, b) => {
      if (a.type === "trending" && b.type !== "trending") return -1;
      if (a.type !== "trending" && b.type === "trending") return 1;
      return 0;
    });

    // Try each RSS feed until we get a valid post (trending feeds first)
    for (const feed of sortedFeeds) {
      try {
        const response = await fetch(
          `${RSS_TO_JSON_API}${encodeURIComponent(feed.url)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) continue;

        const data = await response.json();

        if (data.status === "ok" && data.items && data.items.length > 0) {
          // Smart selection: Prioritize trending content
          let item;
          if (feed.type === "trending" && data.items.length > 1) {
            // For trending feeds, check top 10 posts
            const topPosts = data.items.slice(
              0,
              Math.min(10, data.items.length)
            );

            // First, try to find a post with trending keywords
            const trendingPost = topPosts.find((post) =>
              isLikelyTrending(post.title || "")
            );

            if (trendingPost) {
              item = trendingPost;
            } else {
              // If no trending keywords found, pick from top 5 (usually popular)
              const topFive = topPosts.slice(0, Math.min(5, topPosts.length));
              item = topFive[Math.floor(Math.random() * topFive.length)];
            }
          } else {
            // For regular feeds, check if latest post is trending
            const latestPost = data.items[0];
            if (isLikelyTrending(latestPost.title || "")) {
              item = latestPost;
            } else if (data.items.length > 1) {
              // Check next few posts for trending content
              const nextPosts = data.items.slice(
                1,
                Math.min(5, data.items.length)
              );
              const trendingPost = nextPosts.find((post) =>
                isLikelyTrending(post.title || "")
              );
              item = trendingPost || latestPost;
            } else {
              item = latestPost;
            }
          }

          // Extract image from content or use default
          let image = getCategoryImage(feed.category);
          if (item.enclosure && item.enclosure.link) {
            image = item.enclosure.link;
          } else if (item.content) {
            // Try to extract image from HTML content
            const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/i);
            if (imgMatch && imgMatch[1]) {
              image = imgMatch[1];
            }
          }

          // Calculate read time (average 200 words per minute)
          const wordCount = item.content
            ? item.content.split(/\s+/).length
            : 500;
          const readTime = Math.max(3, Math.ceil(wordCount / 200));

          // Format date
          const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
          const dateStr = pubDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          // Create excerpt from description or content
          let excerpt = item.description || item.content || "";
          // Remove HTML tags
          excerpt = excerpt.replace(/<[^>]*>/g, "").trim();
          // Limit to 200 characters
          if (excerpt.length > 200) {
            excerpt = excerpt.substring(0, 197) + "...";
          }

          // Extract full content (HTML) - try multiple fields
          let fullContent = "";

          // Try multiple content fields (different RSS feed formats)
          const contentFields = [
            item.content, // Atom feeds
            item["content:encoded"], // WordPress RSS feeds
            item.description, // RSS 2.0
            item.summary, // Some Atom feeds
          ].filter(Boolean);

          // Find the longest content (usually the full article)
          for (const field of contentFields) {
            if (
              field &&
              typeof field === "string" &&
              field.trim().length > fullContent.length
            ) {
              fullContent = field.trim();
            }
          }

          // If still empty, use any available field
          if (!fullContent) {
            for (const field of contentFields) {
              if (field && typeof field === "string") {
                fullContent = field.trim();
                break;
              }
            }
          }

          // Extract author if available
          const author = item.author || item.creator || feed.name || "";

          return {
            id: `rss-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: item.title || "Tech News Update",
            excerpt: excerpt || "Latest updates from the tech world.",
            date: dateStr,
            readTime: `${readTime} min read`,
            category: feed.category,
            image: image,
            sourceUrl: item.link || "#",
            publishedDate: pubDate.toISOString(),
            fullContent: fullContent, // Full HTML content
            author: author,
            sourceName: feed.name,
          };
        }
      } catch (feedError) {
        // Try next feed
        continue;
      }
    }

    return null;
  } catch (error) {
    logger.log("RSS fetch failed, will use generated blog post");
    return null;
  }
}

// Get all blog posts from storage
export function getAllBlogPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    logger.error("Error reading blog posts from storage:", error);
  }
  return [];
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const allPosts = getAllBlogPosts();
  // Try to find by slug first, then by ID as fallback
  const post = allPosts.find((post) => {
    if (post.slug === slug) return true;
    if (post.id === slug) return true;
    // Generate slug from title and compare
    const generatedSlug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return generatedSlug === slug;
  });
  
  // If found, ensure it has a slug for future use
  if (post && !post.slug) {
    post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  
  return post || null;
}

// Get blog post by ID
export function getBlogPostById(id: string): BlogPost | null {
  const allPosts = getAllBlogPosts();
  return allPosts.find((post) => post.id === id) || null;
}

// Save blog posts to storage
function saveBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    localStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString());
  } catch (error) {
    logger.error("Error saving blog posts to storage:", error);
  }
}

// Check if we need to add a new blog post today
function shouldAddNewPost(): boolean {
  const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);
  if (!lastUpdate) {
    return true; // First time, add initial posts
  }

  const lastUpdateDate = new Date(lastUpdate);
  const today = new Date();

  // Reset time to compare dates only
  lastUpdateDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Add new post if it's a new day
  return today.getTime() > lastUpdateDate.getTime();
}

// Initialize blog posts with existing ones (async version)
export async function initializeBlogPosts(
  existingPosts: BlogPost[]
): Promise<BlogPost[]> {
  const storedPosts = getAllBlogPosts();

  // If we have stored posts, use them
  if (storedPosts.length > 0) {
    // Check if we need to add a new post today
    if (shouldAddNewPost()) {
      const newPost = await generateBlogPost();
      // Add new post at the beginning (most recent first)
      const updatedPosts = [newPost, ...storedPosts];
      saveBlogPosts(updatedPosts);
      return updatedPosts;
    }
    return storedPosts;
  }

  // First time initialization - save existing posts
  if (existingPosts.length > 0) {
    // Check if we need to add today's post
    if (shouldAddNewPost()) {
      const todayPost = await generateBlogPost();
      const allPosts = [todayPost, ...existingPosts];
      saveBlogPosts(allPosts);
      return allPosts;
    }
    // Save existing posts without adding new one
    saveBlogPosts(existingPosts);
    return existingPosts;
  }

  // No existing posts, generate initial set
  const initialPosts: BlogPost[] = [];
  for (let i = 0; i < 5; i++) {
    const post = await generateBlogPost();
    const date = new Date();
    date.setDate(date.getDate() - i);
    post.date = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    post.publishedDate = date.toISOString();
    initialPosts.push(post);
  }
  saveBlogPosts(initialPosts);
  return initialPosts;
}

// Get blog posts (checks daily and adds new post if needed) - Async version
export async function getBlogPosts(
  existingPosts: BlogPost[]
): Promise<BlogPost[]> {
  return await initializeBlogPosts(existingPosts);
}

// Manually add a new blog post (for testing) - Async version
export async function addNewBlogPost(): Promise<BlogPost> {
  const newPost = await generateBlogPost();
  const allPosts = getAllBlogPosts();
  const updatedPosts = [newPost, ...allPosts];
  saveBlogPosts(updatedPosts);
  return newPost;
}

// Force fetch a REAL blog post from RSS feeds (for today)
export async function addRealBlogPostToday(): Promise<BlogPost | null> {
  try {
    // Force fetch from RSS (skip fallback generation)
    const realPost = await fetchBlogFromRSS();

    if (realPost) {
      // Update date to today
      const today = new Date();
      realPost.date = today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      realPost.publishedDate = today.toISOString();

      // Add to beginning of posts
      const allPosts = getAllBlogPosts();
      const updatedPosts = [realPost, ...allPosts];
      saveBlogPosts(updatedPosts);

      // Update last update date
      localStorage.setItem(LAST_UPDATE_KEY, today.toISOString());

      logger.log("✅ Real blog post added for today:", realPost.title);
      return realPost;
    } else {
      logger.log("❌ Could not fetch real post from RSS feeds");
      return null;
    }
  } catch (error) {
    logger.error("Error fetching real blog post:", error);
    return null;
  }
}

// Clear all blog posts (for reset)
export function clearBlogPosts(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LAST_UPDATE_KEY);
}

// Fetch multiple real blog posts from RSS feeds (for initial load)
export async function fetchMultipleRealBlogs(
  count: number = 8
): Promise<BlogPost[]> {
  const realPosts: BlogPost[] = [];
  const sortedFeeds = [...RSS_FEEDS].sort((a, b) => {
    if (a.type === "trending" && b.type !== "trending") return -1;
    if (a.type !== "trending" && b.type === "trending") return 1;
    return 0;
  });

  // Try to fetch from each feed
  for (const feed of sortedFeeds) {
    if (realPosts.length >= count) break;

    try {
      logger.log(`Fetching from ${feed.name}...`);
      const response = await fetch(
        `${RSS_TO_JSON_API}${encodeURIComponent(feed.url)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        logger.log(`❌ ${feed.name}: Response not OK (${response.status})`);
        continue;
      }

      const data = await response.json();

      if (data.status !== "ok") {
        logger.log(`❌ ${feed.name}: Invalid response status`);
        continue;
      }

      if (data.status === "ok" && data.items && data.items.length > 0) {
        // Get up to 3 posts from each feed
        const itemsToProcess = data.items.slice(
          0,
          Math.min(3, data.items.length)
        );

        for (const item of itemsToProcess) {
          if (realPosts.length >= count) break;

          // Extract image - try multiple methods and fields
          let image = getCategoryImage(feed.category);

          // Method 1: Check enclosure (RSS 2.0)
          if (item.enclosure && item.enclosure.link) {
            image = item.enclosure.link;
          }
          // Method 2: Check media:content (Media RSS)
          else if (item.media && item.media.content) {
            const mediaContent = Array.isArray(item.media.content)
              ? item.media.content[0]
              : item.media.content;
            if (mediaContent && mediaContent.url) {
              image = mediaContent.url;
            }
          }
          // Method 3: Check thumbnail fields
          else if (item.thumbnail) {
            image = item.thumbnail;
          } else if (
            item.media &&
            item.media.thumbnail &&
            item.media.thumbnail.url
          ) {
            image = item.media.thumbnail.url;
          }
          // Method 4: Extract from content HTML (try all content fields)
          else {
            const contentFields = [
              item.content,
              item["content:encoded"],
              item.description,
            ].filter(Boolean);

            for (const contentField of contentFields) {
              if (!contentField || typeof contentField !== "string") continue;

              // Try multiple image patterns
              const imgPatterns = [
                /<img[^>]+src=["']([^"']+)["']/i,
                /<img[^>]+src=([^\s>]+)/i,
                /src=["']([^"']+\.(jpg|jpeg|png|gif|webp|webp))["']/i,
                /<img[^>]+data-src=["']([^"']+)["']/i, // Lazy loaded images
                /background-image:\s*url\(["']?([^"')]+)["']?\)/i, // CSS background images
              ];

              for (const pattern of imgPatterns) {
                const imgMatch = contentField.match(pattern);
                if (imgMatch && imgMatch[1]) {
                  let imgSrc = imgMatch[1];

                  // Clean up URL (remove query params that might break it)
                  imgSrc = imgSrc.split("?")[0].split("&")[0];

                  // Fix relative URLs
                  if (imgSrc.startsWith("/") && !imgSrc.startsWith("//")) {
                    try {
                      const sourceUrl = new URL(
                        item.link || "https://example.com"
                      );
                      imgSrc = `${sourceUrl.origin}${imgSrc}`;
                    } catch (e) {
                      // Keep original if URL parsing fails
                    }
                  }

                  // Validate URL
                  if (
                    imgSrc.startsWith("http://") ||
                    imgSrc.startsWith("https://")
                  ) {
                    // Additional validation - check if it's a valid image URL
                    if (
                      /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(imgSrc) ||
                      imgSrc.includes("unsplash") ||
                      imgSrc.includes("images.") ||
                      imgSrc.includes("cdn.") ||
                      imgSrc.includes("wp-content")
                    ) {
                      image = imgSrc;
                      break;
                    }
                  }
                }
              }

              if (image !== getCategoryImage(feed.category)) break; // Found image, stop searching
            }
          }

          // Extract full content (HTML) - try multiple fields and formats FIRST
          let fullContent = "";

          // Try multiple content fields (different RSS feed formats)
          const contentFields = [
            item.content, // Atom feeds
            item["content:encoded"], // WordPress RSS feeds
            item.description, // RSS 2.0
            item.summary, // Some Atom feeds
            item.contentSnippet, // Google News feeds
          ].filter(Boolean); // Remove null/undefined

          // Find the longest content (usually the full article)
          for (const field of contentFields) {
            if (
              field &&
              typeof field === "string" &&
              field.trim().length > fullContent.length
            ) {
              fullContent = field.trim();
            }
          }

          // If content is still empty or very short, try to extract from HTML
          if (!fullContent || fullContent.length < 200) {
            // Try to get content from any available field
            const allFields = [
              item.content,
              item["content:encoded"],
              item.description,
              item.summary,
            ].filter(Boolean);

            for (const field of allFields) {
              if (field && typeof field === "string") {
                const cleaned = field.trim();
                if (cleaned.length > fullContent.length) {
                  fullContent = cleaned;
                }
              }
            }
          }

          // If content is still too short, it might be truncated
          if (fullContent.length < 200 && item.link) {
            logger.warn(
              `⚠️ Content for "${item.title?.substring(0, 50)}" is short (${
                fullContent.length
              } chars) - might be truncated`
            );
            // Still use it, but note that full article might be on source URL
          }

          // Calculate read time from all available content
          let wordCount = 500; // Default
          const contentForWordCount =
            fullContent || item.content || item.description || "";
          if (contentForWordCount) {
            // Remove HTML tags for accurate word count
            const textOnly = contentForWordCount
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            wordCount = textOnly.split(/\s+/).length;
          }
          const readTime = Math.max(3, Math.ceil(wordCount / 200));

          // Format date
          const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
          const dateStr = pubDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          // Create excerpt
          let excerpt = item.description || item.content || "";
          excerpt = excerpt.replace(/<[^>]*>/g, "").trim();
          if (excerpt.length > 200) {
            excerpt = excerpt.substring(0, 197) + "...";
          }
          if (!excerpt) {
            excerpt = "Latest updates from the tech world.";
          }

          // Extract author
          const author = item.author || item.creator || feed.name || "";

          // Create slug for SEO-friendly URL
          const slug = item.title
            ? item.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
                .substring(0, 60) // Limit slug length
            : `post-${Date.now()}`;

          const postId = `rss-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;

          realPosts.push({
            id: postId,
            title: item.title || "Tech News Update",
            excerpt: excerpt,
            date: dateStr,
            readTime: `${readTime} min read`,
            category: feed.category,
            image: image,
            sourceUrl: item.link || "#",
            publishedDate: pubDate.toISOString(),
            fullContent: fullContent,
            author: author,
            sourceName: feed.name,
            slug: slug,
          });

          logger.log(`✅ Added post: ${item.title?.substring(0, 50)}...`);
        }

        logger.log(`✅ ${feed.name}: Fetched ${itemsToProcess.length} items`);
      } else {
        logger.log(`❌ ${feed.name}: No items in response`);
      }
    } catch (feedError) {
      logger.error(`❌ Error fetching from ${feed.name}:`, feedError);
      continue;
    }
  }

  logger.log(`📊 Total real posts fetched: ${realPosts.length}`);
  return realPosts;
}
