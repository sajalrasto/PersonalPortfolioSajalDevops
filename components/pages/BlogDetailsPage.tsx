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
  Eye,
  X,
  User
} from 'lucide-react';
import { BlogPost, getAllBlogPosts, getBlogPostBySlug } from '../../services/blogService';
import SEO from '../SEO';
import { logger } from '../../utils/logger';

const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Load post from slug
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  
  // Use window scroll (default) instead of element scroll to avoid hydration issues
  const { scrollYProgress } = useScroll();

  const [readingTime, setReadingTime] = useState(5);
  const [copied, setCopied] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  // Load post from slug
  useEffect(() => {
    if (slug) {
      const postFromSlug = getBlogPostBySlug(slug);
      if (postFromSlug) {
        setPost(postFromSlug);
        setReadingTime(parseInt(postFromSlug.readTime) || 5);
        setLoading(false);
      } else {
        logger.warn('Post not found for slug:', slug);
        navigate('/blog');
      }
    } else {
      navigate('/blog');
    }
  }, [slug, navigate]);

  // Get related posts (same category, exclude current post)
  useEffect(() => {
    if (post) {
      const allPosts = getAllBlogPosts();
      const related = allPosts
        .filter(p => p.id !== post.id && (p.category === post.category || Math.random() > 0.7))
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [post]);

  // Reading progress bar
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate reading time from content
  useEffect(() => {
    if (post?.fullContent) {
      const text = post.fullContent.replace(/<[^>]*>/g, '');
      const wordCount = text.split(/\s+/).length;
      const estimatedTime = Math.max(3, Math.ceil(wordCount / 200));
      setReadingTime(estimatedTime);
    }
  }, [post?.fullContent]);

  // Reset first mount after initial render
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
    }
  }, []);

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      logger.error('Failed to copy:', err);
    }
  };

  // Share functions
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
        <div className="prose prose-invert max-w-none">
          <p className="text-text-muted text-lg leading-relaxed mb-6">{post.excerpt}</p>
          <div className="mt-8 p-6 rounded-xl bg-surface/50 border border-text/10">
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

    // Clean and format HTML content
    let content = post.fullContent;
    
    // Fix relative image URLs
    content = content.replace(/<img([^>]+)src="([^"]+)"/gi, (match, attrs, src) => {
      // If relative URL, try to make it absolute
      if (src.startsWith('/') && !src.startsWith('//')) {
        // Try to get base URL from source
        try {
          const sourceUrl = new URL(post.sourceUrl || window.location.origin);
          src = `${sourceUrl.origin}${src}`;
        } catch (e) {
          // Keep original if URL parsing fails
        }
      }
      // Add error handling to images
      return `<img${attrs}src="${src}" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(56, 189, 248, 0.1))';" loading="lazy"`;
    });
    
    // Wrap content in a container for styling
    return (
      <div 
        className={`prose prose-invert max-w-none ${readingMode ? 'prose-lg' : ''}`}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          color: 'var(--text)',
        }}
      />
    );
  };

  // Show loading state
  if (loading || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading article...</p>
        </div>
      </div>
    );
  }

  // Generate SEO-friendly URL
  const seoUrl = post.slug 
    ? `${window.location.origin}/blog/${post.slug}`
    : window.location.href;

  const handleBack = () => {
    navigate('/blog');
  };

  return (
    <>
      <SEO
        title={`${post.title} | Engineering Journal`}
        description={post.excerpt}
        image={post.image}
        url={seoUrl}
        type="article"
        author={post.author}
        publishedTime={post.publishedDate}
        modifiedTime={post.publishedDate}
        keywords={[post.category, 'Tech Blog', 'Software Engineering', 'Web Development']}
      />
      <div 
        ref={containerRef}
        className={`min-h-screen bg-background overflow-x-hidden ${readingMode ? 'bg-gradient-to-b from-background to-surface/30' : ''}`}
      >
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 z-[60] origin-left"
          style={{ scaleX: progress }}
        />

        {/* Hero Section - Clean & Professional */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Gradient - Light mode: subtle, Dark mode: vibrant */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 via-violet-50/30 to-background dark:from-cyan-950/50 dark:via-violet-950/40 dark:to-black/80">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-600/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-200/20 dark:bg-violet-600/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-200/10 dark:bg-fuchsia-500/15 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={isFirstMount.current ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
            >
              {/* Navigation Bar - Top */}
              <div className="flex items-center justify-between mb-12 md:mb-16">
                {/* Back Button */}
                <motion.button
                  initial={isFirstMount.current ? { opacity: 0, x: -20 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 dark:bg-surface/50 backdrop-blur-xl border border-text/20 dark:border-white/10 text-sm font-medium text-text shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </motion.button>

                {/* Source Badge */}
                {post.sourceName && (
                  <motion.div
                    initial={isFirstMount.current ? { opacity: 0, x: 20 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="px-4 py-2 rounded-full bg-surface/80 dark:bg-surface/50 backdrop-blur-xl border border-text/20 dark:border-white/10 text-xs font-medium text-text shadow-xl"
                  >
                    {post.sourceName.toUpperCase()}
                  </motion.div>
                )}
              </div>

              {/* Article Title - Centered & Clean */}
              <motion.div
                initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10 md:mb-12"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-text dark:text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg dark:drop-shadow-lg"
                  style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)' }}
                >
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-base md:text-lg lg:text-xl text-text-muted dark:text-white/85 max-w-3xl mx-auto leading-relaxed drop-shadow-md dark:drop-shadow-md"
                    style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    {post.excerpt}
                  </p>
                )}
              </motion.div>

              {/* Article Meta Info - Clean Layout */}
              <motion.div
                initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-text-muted dark:text-white/80 text-sm md:text-base"
              >
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User size={16} className="opacity-70" />
                    <span className="font-medium">{post.author}</span>
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
                {post.category && (
                  <span className="px-3 py-1.5 rounded-full bg-surface/80 dark:bg-white/10 backdrop-blur-md border border-text/20 dark:border-white/20 text-xs font-semibold text-text dark:text-white">
                    {post.category}
                  </span>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content Area - Professional Layout */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 pb-20 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Hero Image - Full Width */}
              {post.image && post.image !== '#' && (
                <motion.div
                  initial={isFirstMount.current ? { opacity: 0, y: 30 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative mb-12 md:mb-16 w-full aspect-video rounded-xl overflow-hidden border border-text/10 dark:border-white/10 bg-gradient-to-br from-cyan-500/20 via-sky-400/20 to-cyan-300/20 shadow-2xl"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                </motion.div>
              )}

              {/* Article Content - Professional Typography */}
              <motion.article
                initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose-wrapper mb-16"
              >
                <div className="prose prose-invert max-w-none 
                  prose-headings:text-text prose-headings:font-bold 
                  prose-headings:mt-12 prose-headings:mb-6 prose-headings:leading-tight
                  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl md:prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4
                  prose-p:text-text-muted prose-p:leading-relaxed 
                  prose-p:text-base md:prose-p:text-lg prose-p:mb-6
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-strong:text-text prose-strong:font-semibold
                  prose-code:text-primary prose-code:bg-surface/80 dark:prose-code:bg-surface/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-surface/80 dark:prose-pre:bg-surface/50 prose-pre:border prose-pre:border-text/10 dark:prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:text-sm md:prose-pre:text-base prose-pre:p-4
                  prose-img:rounded-xl prose-img:my-10 prose-img:border prose-img:border-text/10 prose-img:shadow-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-text-muted
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                  prose-li:my-2">
                  {renderContent()}
                </div>

                {/* Source & Attribution Box - Clean Design */}
                <motion.div
                  initial={isFirstMount.current ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-16 p-6 md:p-8 rounded-xl bg-surface/80 dark:bg-surface/50 backdrop-blur-sm border border-text/10 dark:border-white/10"
                >
                  <h4 className="text-text font-semibold text-sm mb-3 uppercase tracking-wider text-text-muted">
                    Source & Attribution
                  </h4>
                  <p className="text-text-muted text-sm mb-6 leading-relaxed">
                    This article was originally published on {post.sourceName || 'the source website'}.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {post.sourceUrl && post.sourceUrl !== '#' && (
                      <a
                        href={post.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/20 via-sky-400/20 to-cyan-300/20 hover:from-cyan-500/30 hover:via-sky-400/30 hover:to-cyan-300/30 border border-cyan-500/30 text-primary hover:text-primary font-medium text-sm transition-all"
                      >
                        Read Original Article <ExternalLink size={14} />
                      </a>
                    )}
                    <button 
                      onClick={() => window.open(post.sourceUrl, '_blank')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface/80 dark:bg-surface/50 hover:bg-surface/60 dark:hover:bg-surface/40 border border-text/10 dark:border-white/10 text-text-muted hover:text-text transition-all text-sm font-medium"
                    >
                      <Eye size={14} />
                      <span>Proof of Source</span>
                    </button>
                  </div>
                </motion.div>
              </motion.article>
            </div>

            {/* Sidebar - Related Articles */}
            <aside className="lg:col-span-4">
              <motion.div
                initial={isFirstMount.current ? { opacity: 0, x: 20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-32"
              >
                <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-8">Related Articles</h3>
                {relatedPosts.length > 0 ? (
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost, index) => (
                      <motion.div
                        key={relatedPost.id}
                        initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        onClick={() => {
                          if (relatedPost.slug) {
                            navigate(`/blog/${relatedPost.slug}`);
                          } else {
                            const allPosts = getAllBlogPosts();
                            const post = allPosts.find(p => p.id === relatedPost.id);
                            if (post && post.slug) {
                              navigate(`/blog/${post.slug}`);
                            }
                          }
                        }}
                        className="group cursor-pointer p-4 rounded-lg overflow-hidden border border-text/10 dark:border-white/10 bg-surface/80 dark:bg-surface/50 hover:border-text/20 dark:hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          {/* Thumbnail - Smaller */}
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-text/10 bg-gradient-to-br from-cyan-500/20 via-sky-400/20 to-cyan-300/20">
                            {relatedPost.image && relatedPost.image !== '#' ? (
                              <img
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen size={20} className="text-text-muted opacity-50" />
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {relatedPost.category && (
                              <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold text-violet-700 dark:text-violet-200 mb-1.5 bg-violet-500/10">
                                {relatedPost.category}
                              </span>
                            )}
                            <h4 className="text-sm font-bold text-text mb-1.5 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                              {relatedPost.excerpt}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-text-muted">
                    <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No related articles available</p>
                  </div>
                )}
              </motion.div>
            </aside>
          </div>
        </div>

        {/* Floating Share Menu - Mobile Only */}
        <div className="fixed bottom-[152px] right-6 z-[45] md:hidden">
          <AnimatePresence>
            {isShareMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  onClick={() => setIsShareMenuOpen(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
                />
                
                {/* Share Menu Items */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 35,
                    mass: 0.6
                  }}
                  className="absolute bottom-14 right-0 flex flex-col gap-3 mb-2 will-change-transform"
                  style={{ transformOrigin: 'bottom right' }}
                >
                  <motion.button
                    initial={{ opacity: 0, x: 15, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 15, scale: 0.9 }}
                    transition={{ 
                      delay: 0.02, 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      mass: 0.5
                    }}
                    onClick={() => {
                      handleShare('twitter');
                      setIsShareMenuOpen(false);
                    }}
                    className="w-12 h-12 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg backdrop-blur-md transition-all active:scale-95 will-change-transform"
                    title="Share on Twitter"
                  >
                    <Twitter size={20} />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 15, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 15, scale: 0.9 }}
                    transition={{ 
                      delay: 0.04, 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      mass: 0.5
                    }}
                    onClick={() => {
                      handleShare('linkedin');
                      setIsShareMenuOpen(false);
                    }}
                    className="w-12 h-12 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 flex items-center justify-center text-blue-500 shadow-lg backdrop-blur-md transition-all active:scale-95 will-change-transform"
                    title="Share on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 15, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 15, scale: 0.9 }}
                    transition={{ 
                      delay: 0.06, 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      mass: 0.5
                    }}
                    onClick={() => {
                      handleShare('facebook');
                      setIsShareMenuOpen(false);
                    }}
                    className="w-12 h-12 rounded-full bg-blue-700/20 hover:bg-blue-700/30 border border-blue-700/30 flex items-center justify-center text-blue-600 shadow-lg backdrop-blur-md transition-all active:scale-95 will-change-transform"
                    title="Share on Facebook"
                  >
                    <Facebook size={20} />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 15, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 15, scale: 0.9 }}
                    transition={{ 
                      delay: 0.08, 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      mass: 0.5
                    }}
                    onClick={() => {
                      handleCopyLink();
                      setIsShareMenuOpen(false);
                    }}
                    className="w-12 h-12 rounded-full bg-surface/80 hover:bg-surface border border-text/20 flex items-center justify-center text-text-muted hover:text-primary shadow-lg backdrop-blur-md transition-all active:scale-95 will-change-transform"
                    title="Copy Link"
                  >
                    {copied ? <CheckCircle size={20} className="text-green-400" /> : <Copy size={20} />}
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Share Button - Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 via-sky-400/20 to-cyan-300/20 hover:from-cyan-500/30 hover:via-sky-400/30 hover:to-cyan-300/30 border border-cyan-500/30 flex items-center justify-center text-primary shadow-2xl backdrop-blur-xl transition-all relative overflow-hidden will-change-transform"
            title="Share"
          >
            <AnimatePresence mode="wait">
              {isShareMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    mass: 0.4
                  }}
                  className="will-change-transform"
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    mass: 0.4
                  }}
                  className="will-change-transform"
                >
                  <Share2 size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Custom Styles for Content */}
        <style>{`
          .prose-wrapper img {
            border-radius: 0.75rem;
            margin: 1.5rem 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
            max-width: 100%;
            height: auto;
          }
          @media (min-width: 768px) {
            .prose-wrapper img {
              border-radius: 1rem;
              margin: 2rem 0;
            }
          }
          .prose-wrapper img:hover {
            transform: scale(1.02);
          }
          .prose-wrapper code {
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.85em;
          }
          @media (min-width: 768px) {
            .prose-wrapper code {
              font-size: 0.9em;
            }
          }
          .prose-wrapper pre {
            border-radius: 0.5rem;
            padding: 1rem;
            overflow-x: auto;
            font-size: 0.875rem;
          }
          @media (min-width: 768px) {
            .prose-wrapper pre {
              border-radius: 0.75rem;
              padding: 1.5rem;
              font-size: 1rem;
            }
          }
          .prose-wrapper blockquote {
            border-left: 3px solid var(--primary);
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: var(--text-muted);
          }
          @media (min-width: 768px) {
            .prose-wrapper blockquote {
              border-left: 4px solid var(--primary);
              padding-left: 1.5rem;
              margin: 2rem 0;
            }
          }
          .prose-wrapper a {
            color: var(--primary);
            transition: all 0.2s ease;
          }
          .prose-wrapper h2, .prose-wrapper h3 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            scroll-margin-top: 100px;
          }
          @media (min-width: 768px) {
            .prose-wrapper h2, .prose-wrapper h3 {
              margin-top: 3rem;
              margin-bottom: 1.5rem;
            }
          }
          .prose-wrapper h2 {
            font-size: 1.5rem;
            font-weight: 700;
            border-bottom: 2px solid var(--text-muted);
            padding-bottom: 0.5rem;
          }
          @media (min-width: 768px) {
            .prose-wrapper h2 {
              font-size: 2rem;
            }
          }
          .prose-wrapper h3 {
            font-size: 1.25rem;
            font-weight: 600;
          }
          @media (min-width: 768px) {
            .prose-wrapper h3 {
              font-size: 1.5rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default BlogDetailsPage;
