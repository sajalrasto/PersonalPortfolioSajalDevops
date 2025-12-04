import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  Zap, 
  ChevronDown,
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';
import { getAllBlogPosts, BlogPost as BlogPostType, fetchMultipleRealBlogs } from '../../services/blogService';
import SEO from '../SEO';
import { logger } from '../../utils/logger';

interface BlogPageProps {
  onBlogClick?: (post: BlogPostType) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBlogClick }) => {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState(6);
  const [sortBy, setSortBy] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Tech');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const isFirstMount = useRef(true);
  const postsPerPage = 6;

  const handleBlogClick = (post: BlogPostType) => {
    if (onBlogClick) {
      onBlogClick(post);
    } else {
      if (post.slug) {
        navigate(`/blog/${post.slug}`);
      } else {
        const slug = post.slug || post.id || post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        navigate(`/blog/${slug}`);
      }
    }
  };

  useEffect(() => {
    const loadBlogPosts = async () => {
      const existingPosts = getAllBlogPosts();
      if (existingPosts.length > 0) {
        setAllPosts(existingPosts);
        setIsLoading(false);
        logger.log(`📚 Loaded ${existingPosts.length} existing posts from cache`);
      } else {
        setIsLoading(true);
      }

      try {
        const realPosts = await fetchMultipleRealBlogs(8);
        if (realPosts.length > 0) {
          try {
            localStorage.setItem('blog_posts', JSON.stringify(realPosts));
            localStorage.setItem('blog_last_update', new Date().toISOString());
            logger.log(`✅ Fetched ${realPosts.length} fresh real blog posts`);
          } catch (e) {
            logger.error('Error saving posts:', e);
          }
          setAllPosts(realPosts);
        } else {
          logger.warn('⚠️ No real posts fetched from RSS');
          if (existingPosts.length === 0) {
            setAllPosts([]);
          }
        }
      } catch (error) {
        logger.error('Error loading blog posts:', error);
        if (existingPosts.length === 0) {
          setAllPosts([]);
        }
      } finally {
        setIsLoading(false);
        isFirstMount.current = false;
      }
    };

    loadBlogPosts();
  }, []);

  // Filter posts based on active filter
  const filteredPosts = activeFilter === 'All' 
    ? allPosts 
    : allPosts.filter(post => {
        if (activeFilter === 'Tech') {
          return post.category?.toLowerCase().includes('tech') || 
                 post.category?.toLowerCase().includes('ai') ||
                 post.category?.toLowerCase().includes('development') ||
                 post.title?.toLowerCase().includes('tech');
        } else if (activeFilter === 'Development') {
          return post.category?.toLowerCase().includes('development') ||
                 post.category?.toLowerCase().includes('web') ||
                 post.category?.toLowerCase().includes('software') ||
                 post.title?.toLowerCase().includes('development');
        }
        return true;
      });
  const visiblePosts = filteredPosts.slice(0, displayedPosts);
  const hasMore = displayedPosts < filteredPosts.length;

  const handleLoadMore = () => {
    setDisplayedPosts(prev => prev + postsPerPage);
  };

  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const faqs = [
    {
      question: 'What is no-code?',
      answer: 'No-code is a development method that allows people to build apps or websites without coding, using visual tools and drag-and-drop interfaces.'
    },
    {
      question: 'What are the benefits?',
      answer: 'No-code platforms enable faster development, lower costs, and allow non-technical users to create powerful applications without writing a single line of code.'
    },
    {
      question: 'What services do you offer?',
      answer: 'We offer comprehensive no-code/low-code development services including web applications, mobile apps, automation, and custom solutions tailored to your business needs.'
    },
    {
      question: 'How can I get started?',
      answer: 'Getting started is easy! Simply contact us through our contact form or email, and our team will schedule a consultation to discuss your project requirements.'
    },
    {
      question: 'Can I integrate with existing systems?',
      answer: 'Yes, absolutely! Our no-code solutions can integrate seamlessly with your existing systems, APIs, and third-party services to create a unified workflow.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <>
      <SEO
        title="Engineering Journal | Tech Blog & Insights"
        description="Deep dives into software architecture, design patterns, AI breakthroughs, and the future of web development."
        url={window.location.href}
        keywords={['Tech Blog', 'Software Engineering', 'AI', 'Web Development', 'Programming']}
      />
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Hero Section - New Design */}
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Gradient - Light mode: subtle, Dark mode: vibrant */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-orange-100/30 to-background dark:from-orange-950/40 dark:via-orange-900/30 dark:to-black/80">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/30 dark:bg-orange-600/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/20 dark:bg-yellow-600/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
    <motion.div
              initial={false}
      animate={{ opacity: 1 }}
            >
              {/* Blog Tag - Top Right Only */}
              <div className="flex items-center justify-end mb-12 md:mb-16 w-full">
                <motion.div
                  initial={isFirstMount.current ? { opacity: 0, x: 20 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <span className="inline-block px-5 py-2.5 rounded-full bg-surface/80 dark:bg-surface/50 backdrop-blur-xl border border-text/20 dark:border-white/10 text-sm font-medium text-text shadow-xl whitespace-nowrap">
                    Blog
                  </span>
                </motion.div>
              </div>

              {/* Main Title and Subtitle */}
              <div className="text-center mb-12 md:mb-16">
                <motion.h1
                  initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-text dark:text-white mb-6 leading-tight drop-shadow-lg dark:drop-shadow-lg"
                  style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)' }}
                >
                  The Beauty of Disconnection in a Connected World
                </motion.h1>
                <motion.p
                  initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-lg md:text-xl lg:text-2xl text-text-muted dark:text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md dark:drop-shadow-md"
                  style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  In an age of constant input, what does stillness look like when filtered through glass, code, and glowing circuitry?
                </motion.p>
              </div>

              {/* Featured Article Card */}
              {featuredPost && (
                <motion.div
                  initial={isFirstMount.current ? { opacity: 0, y: 30 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onClick={() => handleBlogClick(featuredPost)}
                  className="group cursor-pointer mb-12 md:mb-16"
                >
                  <div className="rounded-3xl overflow-hidden border border-text/10 dark:border-white/10 bg-surface/80 dark:bg-surface/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Left: Article Details */}
                      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between bg-surface/80 dark:bg-surface/50 backdrop-blur-sm">
                        {/* Category Tags */}
                        <div className="flex items-center gap-3 mb-6">
                          <span className="px-4 py-2 rounded-full bg-violet-500/20 dark:bg-violet-500/30 border border-violet-500/40 dark:border-violet-400/60 text-xs font-semibold text-violet-700 dark:text-violet-200 shadow-md">
                            Futurism
                          </span>
                          <span className="px-4 py-2 rounded-full bg-cyan-500/20 dark:bg-cyan-500/30 border border-cyan-500/40 dark:border-cyan-400/60 text-xs font-semibold text-cyan-700 dark:text-cyan-200 shadow-md">
                            Augmented Reality
          </span>
                        </div>

                        {/* Article Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-6 leading-tight group-hover:text-primary transition-colors">
                          A Visual Meditation on Augmented Identity
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-text-muted mb-8 leading-relaxed flex-1 font-medium">
                          As wearable technology evolves, where does the body end and the interface begin? A look into how design, motion, and emotion intertwine in the future of selfhood.
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-base border-2 border-white/30 shadow-lg">
                            {featuredPost.author?.charAt(0) || 'R'}
                          </div>
                          <div>
                            <div className="text-base font-semibold text-text">{featuredPost.author || 'Ronald Richards'}</div>
                            <div className="text-sm text-text-muted mt-0.5 font-medium">
                              {featuredPost.date || 'May 17, 2025'}
                            </div>
                          </div>
                        </div>
        </div>

                      {/* Right: Featured Image */}
                      <div className="relative h-64 md:h-80 lg:h-full min-h-[400px] overflow-hidden bg-gradient-to-br from-violet-900/20 via-purple-900/20 to-fuchsia-900/20">
                        {featuredPost.image && featuredPost.image !== '#' ? (
                          <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center relative">
                            {/* Futuristic Helmet Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-orange-500/20 to-yellow-500/20 blur-2xl"></div>
                            <div className="relative z-10 text-center p-8">
                              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border-4 border-pink-500/50 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-pink-500/20 blur-xl"></div>
                                <Zap size={48} className="text-white relative z-10" />
                              </div>
                              <p className="text-text-muted text-sm">Featured Image</p>
                            </div>
                          </div>
                        )}
                        {/* Glowing Light Trails Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/5 via-orange-500/5 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Related Articles Grid */}
              {allPosts.length > 1 && (
                <motion.div
                  initial={isFirstMount.current ? { opacity: 0, y: 30 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                  {allPosts.slice(1, 4).map((post, index) => (
            <motion.div
              key={post.id}
                      initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      onClick={() => handleBlogClick(post)}
              className="group cursor-pointer"
            >
                      <div className="rounded-2xl overflow-hidden border border-text/10 dark:border-white/10 bg-surface/80 dark:bg-surface/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        {/* Category Tag */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 rounded-full bg-surface/90 dark:bg-surface-highlight/90 backdrop-blur-sm border border-text/10 dark:border-white/10 text-xs font-medium text-text">
                            {post.category || ['CyberElegance', 'SurrealTech', 'NeuroInterface'][index]}
                          </span>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-violet-900/20 via-purple-900/20 to-fuchsia-900/20">
                          {post.image && post.image !== '#' ? (
                <img 
                  src={post.image} 
                  alt={post.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-red-500/20 blur-xl"></div>
                              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/30 to-pink-500/30 border-2 border-orange-500/50"></div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl md:text-2xl font-bold text-text mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {post.title || [
                              'Designing a Future That Feels Soft, Fluid, and Strange',
                              'The Haunting Beauty of Digital Memory and Presence',
                              'How the Mind Melds With the Machine in Subtle Revolutions'
                            ][index]}
                          </h3>
                          <p className="text-text-muted text-sm leading-relaxed line-clamp-3 flex-1">
                            {post.excerpt || [
                              'From glowing helmets to ambient hues, we explore how futuristic design language can evoke emotion, mystery, and calm.',
                              'This visual essay explores the ephemeral nature of identity in a data-driven world through blurred lines and luminous helmets.',
                              'We explore the gentle collapse between consciousness and computation through imagery and concept.'
                            ][index]}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* All Blog Post Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text">
                All Blog Post
              </h2>
              
              {/* Segmented Control - Tech / Development */}
              <div className="flex items-center justify-center md:justify-end">
                <div className="relative inline-flex rounded-full bg-surface-highlight dark:bg-surface/50 border border-text/10 dark:border-white/10 p-1 shadow-inner">
                  {/* Active Background with Glow Effect */}
                  <motion.div
                    className="absolute inset-y-1 rounded-full bg-surface dark:bg-surface-highlight"
                    initial={false}
                    animate={{
                      left: activeFilter === 'Tech' ? '4px' : 'calc(50% + 2px)',
                      width: 'calc(50% - 6px)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 8px rgba(255, 255, 255, 0.08)',
                      filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.1))'
                    }}
                  />
                  
                  {/* Tech Button */}
                  <button
                    onClick={() => {
                      setActiveFilter('Tech');
                      setDisplayedPosts(6);
                    }}
                    className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeFilter === 'Tech'
                        ? 'text-text font-semibold'
                        : 'text-text-muted'
                    }`}
                  >
                    Tech
                  </button>
                  
                  {/* Development Button */}
                  <button
                    onClick={() => {
                      setActiveFilter('Development');
                      setDisplayedPosts(6);
                    }}
                    className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeFilter === 'Development'
                        ? 'text-text font-semibold'
                        : 'text-text-muted'
                    }`}
                  >
                    Development
                  </button>
                </div>
                </div>
              </div>
              
            {/* Blog Grid */}
            {isLoading && allPosts.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <RefreshCw size={32} className="mx-auto mb-4 text-primary animate-spin" />
                  <p className="text-text-muted">Fetching real blog posts from RSS feeds...</p>
                </div>
              </div>
            ) : visiblePosts.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-text-muted mb-4">No blog posts available.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
                  {visiblePosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={isFirstMount.current ? { delay: i * 0.05 } : {}}
                      whileHover={{ y: -4 }}
                      onClick={() => handleBlogClick(post)}
                      className="group cursor-pointer"
                    >
                      <div className="rounded-2xl overflow-hidden border border-text/10 dark:border-white/10 bg-surface/80 dark:bg-surface/50 hover:border-primary/50 transition-all duration-300 h-full flex flex-col shadow-md hover:shadow-lg">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/20 via-sky-400/20 to-cyan-300/20">
                          {post.image && post.image !== '#' ? (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : null}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-5 md:p-6 flex-1 flex flex-col">
                          {/* Author Info */}
                          <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-fuchsia flex items-center justify-center text-white font-bold text-[10px]">
                              {post.author?.charAt(0) || 'J'}
                            </div>
                            <span>{post.author || 'John Doe'}</span>
                            <span>•</span>
                            <span>{post.date || '13 Jan 2022'}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {post.readTime || '5 min read'}
                            </span>
              </div>
              
                          {/* Title */}
                          <h3 className="text-lg md:text-xl font-bold text-text mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {post.title || 'The Importance of Blogging for Business'}
              </h3>
              
                          {/* Excerpt */}
                          <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                            {post.excerpt || 'Discover how blogging can boost your business growth.'}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            <span className="px-2.5 py-1 rounded-md bg-surface/80 dark:bg-surface/50 text-xs text-text-muted border border-text/10 dark:border-white/10">
                              Finance
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-surface/80 dark:bg-surface/50 text-xs text-text-muted border border-text/10 dark:border-white/10">
                              Website
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-surface/80 dark:bg-surface/50 text-xs text-text-muted border border-text/10 dark:border-white/10">
                              Case Study
                            </span>
                          </div>
                        </div>
              </div>
            </motion.div>
          ))}
        </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <motion.button
                      onClick={handleLoadMore}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                    >
                      Load More <ArrowRight size={16} />
                    </motion.button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-violet-50/20 to-fuchsia-50/20 dark:from-orange-500/20 dark:via-violet-500/20 dark:to-fuchsia-500/20" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={isFirstMount.current ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center rounded-3xl bg-surface/80 dark:bg-surface/50 backdrop-blur-sm border border-text/10 dark:border-white/10 p-8 md:p-12 shadow-xl"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4">
                Stay Updated With Our Newsletter
              </h2>
              <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest updates and insights on no-code/low-code development.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                  className="flex-1 px-6 py-3 rounded-lg bg-background dark:bg-surface border border-text/10 dark:border-white/10 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  {newsletterSubmitted ? (
                    <>
                      <CheckCircle size={16} />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Join Now <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="text-xs text-text-muted mt-4">
                By joining, you agree to our Terms and Conditions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column */}
              <motion.div
                initial={isFirstMount.current ? { opacity: 0, x: -20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-text-muted mb-8 leading-relaxed">
                  Find answers to common questions about our no-code/low-code development services.
                </p>
                <div className="mb-6">
                  <p className="text-text-muted mb-4">Still have questions?</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/#contact')}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    Contact <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Column - FAQ Accordion */}
              <motion.div
                initial={isFirstMount.current ? { opacity: 0, x: 20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={isFirstMount.current ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="rounded-lg border border-text/10 dark:border-white/10 bg-surface/80 dark:bg-surface/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface/50 dark:hover:bg-surface/30 transition-colors"
                    >
                      <span className="font-semibold text-text pr-4">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {expandedFAQ === index ? (
                          <Minus size={20} className="text-primary flex-shrink-0" />
                        ) : (
                          <Plus size={20} className="text-text-muted flex-shrink-0" />
                        )}
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 text-text-muted leading-relaxed border-t border-text/10 dark:border-white/10">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
