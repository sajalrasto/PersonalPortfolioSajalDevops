import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Share2, 
  Twitter, 
  Linkedin,
  Facebook,
  Copy,
  CheckCircle,
  BookOpen,
  X,
  User,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { BlogPost, getAllBlogPosts, getBlogPostBySlug } from '../../services/blogService';
import SEO from '../SEO';
import BlogSEO from '../BlogSEO';
import { logger } from '../../utils/logger';

const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(5);
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Window scroll for progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Elegant fade and scale effect (no tilt)
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.98]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.99, 1]), springConfig);

  // Load post from slug with error handling
  useEffect(() => {
    if (slug) {
      try {
      const postFromSlug = getBlogPostBySlug(slug);
      if (postFromSlug) {
        setPost(postFromSlug);
        setReadingTime(parseInt(postFromSlug.readTime) || 5);
        setLoading(false);
      } else {
        logger.warn('Post not found for slug:', slug);
          navigate('/blog');
        }
      } catch (error) {
        logger.error('Error loading post:', error);
        navigate('/blog');
      }
    } else {
      navigate('/blog');
    }
  }, [slug, navigate]);

  // Get related posts with error handling
  useEffect(() => {
    if (post) {
      try {
      const allPosts = getAllBlogPosts();
      const related = allPosts
        .filter(p => p.id !== post.id && (p.category === post.category || Math.random() > 0.7))
        .slice(0, 3);
      setRelatedPosts(related);
      } catch (error) {
        logger.error('Error getting related posts:', error);
        setRelatedPosts([]);
      }
    }
  }, [post]);

  // Calculate reading time
  useEffect(() => {
    if (post?.fullContent) {
      const text = post.fullContent.replace(/<[^>]*>/g, '');
      const wordCount = text.split(/\s+/).length;
      const estimatedTime = Math.max(3, Math.ceil(wordCount / 200));
      setReadingTime(estimatedTime);
    }
  }, [post?.fullContent]);

  // Theme detection
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      logger.error('Failed to copy:', err);
    }
  };

  const handleShare = async (platform: string) => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Parse and clean HTML content
  const renderContent = () => {
    if (!post || !post.fullContent || post.fullContent.trim().length === 0) {
      return (
        <div className="newspaper-prose">
          <p className="text-text-muted text-lg leading-relaxed mb-6">{post.excerpt}</p>
          <div className="mt-8 p-6 border-2 border-text/20 dark:border-white/20 bg-surface/50">
            <p className="text-text-muted mb-4">
              Full content not available from RSS feed.
            </p>
            {post.sourceUrl && post.sourceUrl !== '#' && (
              <a 
                href={post.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                Read full article on source <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      );
    }

    let content = post.fullContent;
    
    // Fix relative image URLs
    content = content.replace(/<img([^>]+)src="([^"]+)"/gi, (match, attrs, src) => {
      if (src.startsWith('/') && !src.startsWith('//')) {
        try {
          const sourceUrl = new URL(post.sourceUrl || window.location.origin);
          src = `${sourceUrl.origin}${src}`;
        } catch (e) {
          // Keep original if URL parsing fails
        }
      }
      return `<img${attrs}src="${src}" onerror="this.style.display='none';" loading="lazy"`;
    });
    
    return (
      <div 
        ref={contentRef}
        className="newspaper-prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  // Generate SEO URL with proper canonical format
  const seoUrl = React.useMemo(() => {
    if (!post) return typeof window !== 'undefined' ? window.location.href : 'https://sajalrastogi.com/blog';
    
    if (post.slug) {
      return `https://sajalrastogi.com/blog/${post.slug}`;
    }
    
    // Fallback: generate slug from title
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `https://sajalrastogi.com/blog/${slug}`;
  }, [post]);

  // Format dates for SEO (ISO 8601 format)
  const formatDateForSEO = (dateString?: string): string | undefined => {
    if (!dateString) return undefined;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return undefined;
      return date.toISOString();
    } catch {
      return undefined;
    }
  };

  // Generate absolute image URL
  const getAbsoluteImageUrl = (imageUrl?: string): string => {
    if (!imageUrl || imageUrl === '#') {
      return 'https://sajalrastogi.com/og-image.jpg';
    }
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    if (imageUrl.startsWith('/')) {
      return `https://vishwjeetkumar.me${imageUrl}`;
    }
    return `https://sajalrastogi.com/${imageUrl}`;
  };

  // Generate optimized description
  const getOptimizedDescription = (): string => {
    if (!post) return 'Expert Full Stack Developer blog post with insights on modern web development from Gaya, Bihar.';
    
    if (post.excerpt && post.excerpt.length > 0) {
      // Clean excerpt and ensure it's within 160 characters
      const cleanExcerpt = post.excerpt
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      if (cleanExcerpt.length <= 160) {
        return cleanExcerpt;
      }
      return cleanExcerpt.substring(0, 157) + '...';
    }
    
    // Fallback description with local SEO
    return `${post.title} - Expert insights on ${post.category} by Full Stack Developer Vishwjeet Kumar from Gaya, Bihar. Learn modern web development techniques, best practices, and industry trends.`;
  };

  // Generate local SEO keywords
  const getLocalSEOKeywords = (): string[] => {
    const baseKeywords = [
      post?.category || 'Web Development',
      'Full Stack Developer Blog',
      'Tech Blog Bihar',
      'Web Developer Gaya',
      'Software Engineer Bihar',
      'Programming Tutorial Bihar',
      'React Developer Gaya',
      'Next.js Developer Bihar',
      'TypeScript Tutorial Bihar',
      'Web Development Bihar',
      'Software Engineering Bihar',
      'Tech Tutorial Gaya',
      'Developer Blog Bihar',
      'Programming Blog Gaya',
      post?.title || 'Tech Article'
    ];
    
    if (post?.tags) {
      baseKeywords.push(...post.tags);
    }
    
    return baseKeywords;
  };

  const handleBack = () => {
    navigate('/blog');
  };

  // Show loading state with basic SEO
  if (loading || !post) {
    return (
      <>
        <SEO
          title="Loading Article | Engineering Journal"
          description="Loading blog article..."
          url={typeof window !== 'undefined' ? window.location.href : 'https://sajalrastogi.com/blog'}
          noindex={true}
        />
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading article...</p>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} | Full Stack Developer Blog Gaya Bihar | Engineering Journal`}
        description={getOptimizedDescription()}
        image={getAbsoluteImageUrl(post.image)}
        url={seoUrl}
        type="article"
        author={post.author || 'Vishwjeet Kumar'}
        publishedTime={formatDateForSEO(post.publishedDate)}
        modifiedTime={formatDateForSEO(post.publishedDate)}
        keywords={getLocalSEOKeywords()}
        articleSection={post.category}
        tags={post.tags || [post.category, 'Web Development', 'Full Stack Development', 'Bihar Tech', 'Gaya Developer']}
        breadcrumbs={[
          { name: 'Home', url: 'https://sajalrastogi.com/' },
          { name: 'Engineering Journal', url: 'https://sajalrastogi.com/blog' },
          { name: post.title, url: seoUrl }
        ]}
      />
      <BlogSEO post={post} />
      <div 
        ref={containerRef}
        className="min-h-screen overflow-x-hidden bg-background relative"
      >
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-violet-500 z-[60] origin-left"
          style={{ scaleX: progress }}
        />

        {/* Vintage Newspaper Background - Light Mode */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Vintage Paper Background - Warm Cream/Beige for Light Mode */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #F5F1E8 0%, #F8F6F0 25%, #FAF8F3 50%, #F0EDE5 75%, #F5F1E8 100%)',
              backgroundSize: '400% 400%',
            }}
          />
          
          {/* Subtle Vintage Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          {/* Subtle Animated Orbs - Very Light for Vintage Feel */}
          <motion.div
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(217, 70, 239, 0.05) 40%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Dark Mode Background */}
        <div className="dark:block hidden absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0A0E1A 0%, #0F1419 25%, #0D1117 50%, #0A0E1A 75%, #0F1419 100%)',
              backgroundSize: '400% 400%',
            }}
          />
          
          <motion.div
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(217, 70, 239, 0.15) 40%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            animate={{
              x: [0, 40, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          </div>

        {/* Main Content Container - Max Width */}
        <div className="relative z-10 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-7xl mx-auto">
            {/* Vintage Newspaper Paper Container */}
            <motion.div
              style={{ opacity, scale }}
              className="relative w-full"
            >
              {/* Main Newspaper Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white dark:bg-[#0F1419] border-2 border-black/10 dark:border-white/10 overflow-hidden"
              >
                {/* Vintage Newspaper Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="border-b-4 border-black dark:border-white/20 bg-surface/50 dark:bg-surface/30 px-6 md:px-8 py-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBack}
                      className="flex items-center gap-2 px-4 py-2 rounded bg-surface dark:bg-surface/50 border border-text/10 dark:border-white/10 text-sm font-medium text-text hover:bg-surface-highlight transition-all"
                    >
                      <ArrowLeft size={16} />
                      <span className="hidden sm:inline">Back</span>
                    </motion.button>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className="w-10 h-10 rounded bg-surface dark:bg-surface/50 border border-text/10 dark:border-white/10 flex items-center justify-center text-text hover:bg-surface-highlight transition-all"
                        aria-label="Bookmark"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck size={18} className="text-primary" />
                        ) : (
                          <Bookmark size={18} />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                        className="w-10 h-10 rounded bg-surface dark:bg-surface/50 border border-text/10 dark:border-white/10 flex items-center justify-center text-text hover:bg-surface-highlight transition-all"
                        aria-label="Share"
                      >
                        <Share2 size={18} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Newspaper Nameplate */}
                  <div className="text-center border-t-2 border-b-2 border-black dark:border-white/20 py-3 my-3">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-text dark:text-white tracking-tight uppercase">
                      Engineering Journal
                </h1>
                    <p className="text-xs md:text-sm text-text-muted mt-1 font-mono">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }).toUpperCase()}
                    </p>
                  </div>
              </motion.div>

                {/* Main Article Content */}
                <div className="px-6 md:px-8 lg:px-12 py-8 md:py-12">
                  {/* Article Header - Vintage Style */}
              <motion.div
                    initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-8 md:mb-12"
                  >
                    {/* Category Label */}
                    {post.category && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest">
                          {post.category}
                        </span>
                      </div>
                    )}

                    {/* Main Headline - Large Vintage Typography */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-text dark:text-white mb-6 leading-[1.1] tracking-tight uppercase">
                      {post.title}
                    </h1>

                    {/* Byline and Meta - Vintage Newspaper Style */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-text-muted border-t-2 border-b-2 border-black/20 dark:border-white/20 py-4">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User size={16} className="opacity-70" />
                          <span className="font-semibold">{post.author}</span>
                  </div>
                )}
                {post.date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="opacity-70" />
                    <span>{post.date}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock size={16} className="opacity-70" />
                  <span>{readingTime} min read</span>
                </div>
                    </div>
            </motion.div>

                  {/* Hero Image - Vintage Newspaper Style */}
              {post.image && post.image !== '#' && (
                <motion.div
                      initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="relative mb-10 md:mb-16 w-full aspect-video overflow-hidden border-4 border-black dark:border-white/20 bg-gradient-to-br from-primary/10 via-cyan-400/10 to-violet-500/10"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                          e.currentTarget.style.display = 'none';
                    }}
                  />
                      {/* Vintage Caption Box */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/80 dark:bg-white/10 text-white dark:text-text px-4 py-2 text-xs font-mono">
                        {post.title} — {post.sourceName || 'Source'}
                      </div>
                </motion.div>
              )}

                  {/* Article Body - Single Column Vintage Style */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                  >
                    {/* Main Article Content - Single Column Layout */}
                    <div className="lg:col-span-8">
                      {/* Main Content - Vintage Newspaper Style */}
                      <div className="newspaper-prose">
                  {renderContent()}
                </div>
            </div>

                    {/* Sidebar - Related Articles & Classifieds Style */}
            <aside className="lg:col-span-4">
              <motion.div
                        initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="sticky top-32 space-y-6"
                      >
                        {/* Related Articles */}
                        <div className="border-2 border-black/20 dark:border-white/20 bg-surface/50 dark:bg-surface/30 p-6">
                          <h3 className="text-lg md:text-xl font-display font-black text-text dark:text-white mb-4 pb-2 border-b-2 border-black/20 dark:border-white/20 uppercase">
                            Related Stories
                          </h3>
                {relatedPosts.length > 0 ? (
                            <div className="space-y-4">
                    {relatedPosts.map((relatedPost, index) => (
                      <motion.div
                        key={relatedPost.id}
                                  initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                        onClick={() => {
                          if (relatedPost.slug) {
                            navigate(`/blog/${relatedPost.slug}`);
                                    }
                                  }}
                                  className="group cursor-pointer pb-4 border-b border-black/10 dark:border-white/10 last:border-0 hover:bg-surface-highlight/50 transition-colors"
                                >
                                  <h4 className="text-sm font-bold text-text dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                    {relatedPost.title}
                                  </h4>
                                  <p className="text-xs text-text-muted line-clamp-2 mb-2">
                                    {relatedPost.excerpt}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-text-muted">
                                    {relatedPost.date && <span>{relatedPost.date}</span>}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-text-muted">
                              <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No related articles</p>
                              </div>
                            )}
                          </div>
                          
                        {/* Vintage Classifieds Style Box */}
                        <div className="border-2 border-black/20 dark:border-white/20 bg-surface/50 dark:bg-surface/30 p-6">
                          <h3 className="text-lg font-display font-black text-text dark:text-white mb-4 pb-2 border-b-2 border-black/20 dark:border-white/20 uppercase text-sm">
                            Quick Links
                          </h3>
                          <div className="space-y-2 text-sm">
                            <a href="/blog" className="block text-text-muted hover:text-primary transition-colors border-b border-black/5 dark:border-white/5 pb-2">
                              ← Back to Blog
                            </a>
                            <a href="/services" className="block text-text-muted hover:text-primary transition-colors border-b border-black/5 dark:border-white/5 pb-2">
                              Our Services
                            </a>
                            <a href="/resume" className="block text-text-muted hover:text-primary transition-colors border-b border-black/5 dark:border-white/5 pb-2">
                              About Author
                            </a>
                            <button
                              onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                              className="block w-full text-left text-text-muted hover:text-primary transition-colors"
                            >
                              Contact Us
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </aside>
                  </motion.div>

                  {/* Full Width Bottom Sections */}
                  <div className="lg:col-span-12 mt-12">
                    {/* Call to Action Section - Full Width Vintage Style */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="w-full p-8 md:p-12 border-t-4 border-b-4 border-black dark:border-white/20 relative group cursor-pointer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-text dark:text-white mb-4 uppercase tracking-tight">
                        Ready to Get Started?
                      </h3>
                      <p className="text-text-muted text-base md:text-lg mb-6 leading-relaxed max-w-3xl">
                        Take the next step in your journey. Contact us today for a consultation and elevate your experience with precision and poise.
                      </p>
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                      >
                        Contact Us Today <ArrowLeft size={16} className="rotate-180" />
                      </button>
                    </motion.div>

                    {/* Tags Section - Full Width Vintage Style */}
                    {post.category && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="w-full mt-8 pt-6 border-t-2 border-black/20 dark:border-white/20"
                      >
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="text-text-muted font-mono">#</span>
                          <span className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-text dark:text-white font-semibold">
                            {post.category}
                          </span>
                          <span className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-text dark:text-white font-semibold">
                            TechBlog
                          </span>
                          <span className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-text dark:text-white font-semibold">
                            Engineering
                          </span>
                          <span className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-text dark:text-white font-semibold">
                            Development
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Source Attribution - Full Width Vintage Style */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="w-full mt-8 p-6 md:p-8 border-t-2 border-b-2 border-black/20 dark:border-white/20 relative group cursor-pointer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <h4 className="text-text font-bold text-sm mb-3 uppercase tracking-wider border-b-2 border-black/20 dark:border-white/20 pb-2">
                        Source & Attribution
                      </h4>
                      <p className="text-text-muted text-sm mb-4 leading-relaxed">
                        This article was originally published on {post.sourceName || 'the source website'}.
                      </p>
                      {post.sourceUrl && post.sourceUrl !== '#' && (
                        <a
                          href={post.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold hover:opacity-90 transition-opacity"
                        >
                          Read Original Article <ExternalLink size={14} />
                        </a>
                      )}
                    </motion.div>
                  </div>
                  </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Share Menu - Floating */}
        <div className="fixed right-6 bottom-36 md:bottom-24 z-[45]">
          <AnimatePresence>
            {isShareMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setIsShareMenuOpen(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30, 
                    mass: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="absolute bottom-14 right-0 flex flex-col gap-3 mb-2"
                >
                  <motion.button
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ delay: 0.03, type: "spring", stiffness: 400, damping: 28, mass: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      handleShare('twitter');
                      setIsShareMenuOpen(false);
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 relative overflow-hidden ${
                      isDark 
                        ? 'bg-blue-600/25 hover:bg-blue-600/35 backdrop-blur-2xl border border-blue-400/50 text-blue-300 shadow-[0_8px_32px_rgba(59,130,246,0.4),0_0_15px_rgba(96,165,250,0.3)]' 
                        : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-blue-500/30 text-blue-600 shadow-[0_8px_32px_rgba(59,130,246,0.25)]'
                    }`}
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                    title="Share on Twitter"
                  >
                    <Twitter size={20} />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ delay: 0.06, type: "spring", stiffness: 400, damping: 28, mass: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      handleShare('linkedin');
                      setIsShareMenuOpen(false);
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 relative overflow-hidden ${
                      isDark 
                        ? 'bg-blue-700/25 hover:bg-blue-700/35 backdrop-blur-2xl border border-blue-500/50 text-blue-300 shadow-[0_8px_32px_rgba(37,99,235,0.4),0_0_15px_rgba(59,130,246,0.3)]' 
                        : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-blue-600/30 text-blue-700 shadow-[0_8px_32px_rgba(37,99,235,0.25)]'
                    }`}
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                    title="Share on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ delay: 0.09, type: "spring", stiffness: 400, damping: 28, mass: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      handleShare('facebook');
                      setIsShareMenuOpen(false);
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 relative overflow-hidden ${
                      isDark 
                        ? 'bg-blue-800/25 hover:bg-blue-800/35 backdrop-blur-2xl border border-blue-600/50 text-blue-300 shadow-[0_8px_32px_rgba(29,78,216,0.4),0_0_15px_rgba(37,99,235,0.3)]' 
                        : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-blue-700/30 text-blue-800 shadow-[0_8px_32px_rgba(29,78,216,0.25)]'
                    }`}
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                    title="Share on Facebook"
                  >
                    <Facebook size={20} />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ delay: 0.12, type: "spring", stiffness: 400, damping: 28, mass: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      handleCopyLink();
                      setIsShareMenuOpen(false);
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 relative overflow-hidden ${
                      isDark 
                        ? 'bg-slate-800/40 hover:bg-slate-800/50 backdrop-blur-2xl border border-slate-500/50 text-slate-300 hover:text-violet-300 shadow-[0_8px_32px_rgba(71,85,105,0.4),0_0_15px_rgba(148,163,184,0.2)]' 
                        : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-text/20 text-text shadow-[0_8px_32px_rgba(0,0,0,0.15)]'
                    }`}
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                    title="Copy Link"
                  >
                    {copied ? <CheckCircle size={20} className={isDark ? 'text-green-400' : 'text-green-600'} /> : <Copy size={20} />}
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 backdrop-blur-2xl border border-violet-500/40 text-violet-300 shadow-[0_8px_32px_rgba(139,92,246,0.4),0_0_20px_rgba(168,85,247,0.3)]' 
                : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-cyan-500/30 text-cyan-700 shadow-[0_8px_32px_rgba(6,182,212,0.25)]'
            }`}
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
            title="Share"
          >
            {isDark && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-fuchsia-500/20"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: 'conic-gradient(from 0deg, rgba(139,92,246,0.1), rgba(168,85,247,0.1), rgba(217,70,239,0.1), rgba(139,92,246,0.1))',
                }}
              />
            )}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {isShareMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.4 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="share"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.4 }}
                  >
                    <Share2 size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {!isShareMenuOpen && (
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${
                  isDark ? 'border-violet-400/40' : 'border-cyan-500/30'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>
        </div>

        {/* Vintage Newspaper Typography Styles */}
        <style>{`
          .newspaper-prose {
            font-family: 'Georgia', 'Times New Roman', serif;
            color: var(--text);
            line-height: 1.8;
          }
          
          .newspaper-prose h2 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 2rem;
            font-weight: 900;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            color: var(--text);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 3px solid var(--text);
            padding-bottom: 0.5rem;
          }
          
          .newspaper-prose h3 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.3;
            color: var(--text);
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }
          
          .newspaper-prose p {
            font-size: 1.125rem;
            line-height: 1.9;
            margin-bottom: 1.5rem;
            color: var(--text-muted);
            text-align: left;
            font-family: 'Georgia', 'Times New Roman', serif;
          }
          
          /* Single column layout - clean and readable */
          .newspaper-prose {
            max-width: 100%;
            column-count: 1;
          }
          
          .newspaper-prose img {
            width: 100%;
            height: auto;
            margin: 2rem 0;
            border: 2px solid var(--text);
            border-opacity: 0.2;
          }
          
          .newspaper-prose blockquote {
            border-left: 4px solid var(--text);
            padding-left: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: var(--text-muted);
            background: var(--surface);
            padding: 1.5rem;
            border: 2px solid var(--text);
            border-opacity: 0.2;
            column-span: all;
          }
          
          .newspaper-prose code {
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
            background: var(--surface);
            padding: 0.2rem 0.4rem;
            border: 1px solid var(--text);
            border-opacity: 0.2;
            color: var(--text);
          }
          
          .newspaper-prose pre {
            background: var(--surface);
            border: 2px solid var(--text);
            border-opacity: 0.2;
            padding: 1.5rem;
            overflow-x: auto;
              margin: 2rem 0;
            column-span: all;
          }
          
          .newspaper-prose a {
            color: var(--text);
            text-decoration: underline;
            text-decoration-color: var(--primary);
            text-decoration-thickness: 2px;
            transition: all 0.2s ease;
          }
          
          .newspaper-prose a:hover {
            color: var(--primary);
            text-decoration-thickness: 3px;
          }
          
          .newspaper-prose ul,
          .newspaper-prose ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
            column-span: all;
          }
          
          .newspaper-prose li {
            margin: 0.75rem 0;
            line-height: 1.9;
            color: var(--text-muted);
          }
          
          .newspaper-prose strong {
            font-weight: 700;
            color: var(--text);
          }
        `}</style>
      </div>
    </>
  );
};

export default BlogDetailsPage;
