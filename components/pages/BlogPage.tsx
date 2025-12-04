import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle,
  Plus,
  Minus,
  Search,
  TrendingUp,
  Mail,
  Play,
  Sparkles,
  Zap,
  Layers,
  Waves,
  RotateCw,
  Move3D,
  FileText,
  BookOpen
} from 'lucide-react';
import { getAllBlogPosts, BlogPost as BlogPostType, fetchMultipleRealBlogs } from '../../services/blogService';
import SEO from '../SEO';
import { logger } from '../../utils/logger';

interface BlogPageProps {
  onBlogClick?: (post: BlogPostType) => void;
}

// Memoized Article Card Component
const ArticleCard = React.memo<{ 
  post: BlogPostType; 
  onClick: () => void;
  variant?: 'small' | 'medium' | 'large';
}>(({ post, onClick, variant = 'medium' }) => {
  const isSmall = variant === 'small';
  const isLarge = variant === 'large';
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className={`rounded-lg overflow-hidden border border-text/10 dark:border-white/10 bg-surface/90 dark:bg-surface/70 hover:border-primary/30 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md ${isSmall ? 'shadow-none hover:shadow-sm' : ''}`}>
        {!isSmall && (
          <div className={`relative overflow-hidden bg-gradient-to-br from-primary/5 via-violet-500/5 to-fuchsia-500/5 ${isLarge ? 'h-64 md:h-80' : 'h-40 md:h-48'}`}>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        <div className={`flex-1 flex flex-col ${isSmall ? 'p-4' : 'p-5 md:p-6'}`}>
          {isSmall && (
            <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-fuchsia flex items-center justify-center text-white font-bold text-[9px]">
                {post.author?.charAt(0) || 'J'}
              </div>
              <span>{post.author || 'John Doe'}</span>
              <span>•</span>
              <span>{formatDateWithYear(post.date)}</span>
            </div>
          )}
          
          <h3 className={`font-bold text-text mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2 ${
            isLarge ? 'text-2xl md:text-3xl' : isSmall ? 'text-base' : 'text-lg md:text-xl'
          }`}>
            {post.title || 'The Importance of Blogging for Business'}
          </h3>
          
          {!isSmall && (
            <p className="text-text-muted text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
              {post.excerpt || 'Discover how blogging can boost your business growth.'}
            </p>
          )}

          {!isSmall && (
            <div className="flex items-center gap-3 text-xs text-text-muted mt-auto">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-fuchsia flex items-center justify-center text-white font-bold text-[10px]">
                {post.author?.charAt(0) || 'J'}
              </div>
              <span>{post.author || 'John Doe'}</span>
              <span>•</span>
              <span>{formatDateWithYear(post.date)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {post.readTime || '5 min read'}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ArticleCard.displayName = 'ArticleCard';

// Helper function to format date with year
const formatDateWithYear = (dateString: string | undefined): string => {
  if (!dateString) {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  // Check if date already has year (4 digits)
  if (/\d{4}/.test(dateString)) {
    return dateString;
  }
  
  // Try to parse and reformat
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  } catch (e) {
    // If parsing fails, return current date
  }
  
  // Fallback: return current date with year
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const BlogPage: React.FC<BlogPageProps> = ({ onBlogClick }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [allPosts, setAllPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState(6);
  const [activeFilter, setActiveFilter] = useState('Tech');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dailyJokes, setDailyJokes] = useState<{ setup: string; punchline: string }[]>([]);
  const [horoscopes, setHoroscopes] = useState<{ sign: string; prediction: string }[]>([]);
  const [cryptoNews, setCryptoNews] = useState<{ title: string; source: string; date: string }[]>([]);
  const [politicsNews, setPoliticsNews] = useState<{ title: string; source: string; date: string }[]>([]);
  const [worldNews, setWorldNews] = useState<{ title: string; source: string; date: string }[]>([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [activeTab, setActiveTab] = useState<'trending' | 'latest'>('trending');
  const isFirstMount = useRef(true);
  const postsPerPage = 6;
  const paperCardRef = useRef<HTMLDivElement>(null);
  
  // Cursor tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const spotlightY = useSpring(mouseY, { damping: 25, stiffness: 200 });
  
  // Transform values for spotlight position (must be at top level, not conditional)
  const spotlightXTransformed = useTransform(spotlightX, (v) => v - 150);
  const spotlightYTransformed = useTransform(spotlightY, (v) => v - 150);
  const spotlightXTransformedDark = useTransform(spotlightX, (v) => v - 175);
  const spotlightYTransformedDark = useTransform(spotlightY, (v) => v - 175);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!paperCardRef.current) return;
    const rect = paperCardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Scroll-based 3D paper effect (same as ResumePage)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -100]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 0.9]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.98, 1]), springConfig);
  // Reduced tilt effect - 10% of original (0.3/-0.2/0.05 instead of 3/-2/0.5)
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.3, 0]), springConfig);
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.3], [-0.2, 0]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.05, 0]), springConfig);

  const handleBlogClick = useCallback((post: BlogPostType) => {
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
  }, [navigate, onBlogClick]);

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
        const realPosts = await fetchMultipleRealBlogs(12);
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

  // Fetch daily jokes and horoscopes
  useEffect(() => {
    const fetchDailyContent = async () => {
      setLoadingContent(true);
      try {
        // Fetch Multiple Jokes (3-4 jokes to fill space)
        const jokePromises = [];
        for (let i = 0; i < 4; i++) {
          jokePromises.push(
            fetch('https://official-joke-api.appspot.com/random_joke')
              .then(res => res.ok ? res.json() : null)
              .catch(() => null)
          );
        }
        
        const jokeResults = await Promise.all(jokePromises);
        const validJokes = jokeResults
          .filter(j => j && j.setup && j.punchline)
          .map(j => ({ setup: j.setup, punchline: j.punchline }));
        
        // Add fallback jokes if needed
        const fallbackJokes = [
          { setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs!' },
          { setup: 'How do you comfort a JavaScript bug?', punchline: 'You console it!' },
          { setup: 'Why did the developer go broke?', punchline: 'Because he used up all his cache!' },
          { setup: 'What do you call a programmer from Finland?', punchline: 'Nerdic!' }
        ];
        
        while (validJokes.length < 4) {
          validJokes.push(fallbackJokes[validJokes.length % fallbackJokes.length]);
        }
        
        setDailyJokes(validJokes.slice(0, 4));

        // Fetch Horoscopes for different signs (all 12 signs)
        const zodiacSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        const horoscopePromises = zodiacSigns.map(async (sign) => {
          try {
            const horoResponse = await fetch(`https://horoscope-api.herokuapp.com/horoscope/today/${sign}`);
            if (horoResponse.ok) {
              const horoData = await horoResponse.json();
              return { sign: sign.charAt(0).toUpperCase() + sign.slice(1), prediction: horoData.horoscope || 'Today is a great day for new opportunities!' };
            }
          } catch (error) {
            logger.error(`Error fetching horoscope for ${sign}:`, error);
          }
          return { sign: sign.charAt(0).toUpperCase() + sign.slice(1), prediction: 'Today brings new opportunities and positive energy your way!' };
        });

        const horoscopeResults = await Promise.all(horoscopePromises);
        setHoroscopes(horoscopeResults.filter(h => h !== null));

        // Fetch Crypto News
        try {
          const cryptoResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss');
          if (cryptoResponse.ok) {
            const cryptoData = await cryptoResponse.json();
            if (cryptoData.status === 'ok' && cryptoData.items) {
              const cryptoItems = cryptoData.items.slice(0, 5).map((item: any) => ({
                title: item.title || 'Crypto News',
                source: 'CoinTelegraph',
                date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              }));
              setCryptoNews(cryptoItems);
            }
          }
        } catch (error) {
          logger.error('Error fetching crypto news:', error);
          const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          setCryptoNews([
            { title: 'Bitcoin reaches new all-time high', source: 'Crypto News', date: today },
            { title: 'Ethereum 2.0 staking reaches milestone', source: 'Crypto News', date: today },
            { title: 'NFT market shows signs of recovery', source: 'Crypto News', date: today },
            { title: 'DeFi protocols see increased adoption', source: 'Crypto News', date: today },
            { title: 'Regulatory clarity boosts crypto markets', source: 'Crypto News', date: today }
          ]);
        }

        // Fetch Politics/World News
        try {
          const politicsResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/rss.xml');
          if (politicsResponse.ok) {
            const politicsData = await politicsResponse.json();
            if (politicsData.status === 'ok' && politicsData.items) {
              const politicsItems = politicsData.items.slice(0, 5).map((item: any) => ({
                title: item.title || 'World News',
                source: 'BBC World',
                date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              }));
              setPoliticsNews(politicsItems);
              setWorldNews(politicsItems.slice(0, 5));
            }
          }
        } catch (error) {
          logger.error('Error fetching politics/world news:', error);
          const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const fallbackPolitics = [
            { title: 'Global summit addresses climate change', source: 'World News', date: today },
            { title: 'International trade agreements signed', source: 'World News', date: today },
            { title: 'Diplomatic talks resume between nations', source: 'World News', date: today },
            { title: 'UN Security Council meets on global issues', source: 'World News', date: today },
            { title: 'Economic cooperation strengthens ties', source: 'World News', date: today }
          ];
          setPoliticsNews(fallbackPolitics);
          setWorldNews(fallbackPolitics);
        }
      } catch (error) {
        logger.error('Error fetching daily content:', error);
      } finally {
        setLoadingContent(false);
      }
    };

    fetchDailyContent();
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return allPosts;
    
    return allPosts.filter(post => {
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
  }, [allPosts, activeFilter]);

  const visiblePosts = useMemo(() => filteredPosts.slice(0, displayedPosts), [filteredPosts, displayedPosts]);
  const hasMore = displayedPosts < filteredPosts.length;

  const handleLoadMore = useCallback(() => {
    setDisplayedPosts(prev => prev + postsPerPage);
  }, []);

  const featuredPost = useMemo(() => allPosts.length > 0 ? allPosts[0] : null, [allPosts]);
  const mainStories = useMemo(() => allPosts.slice(0, 3), [allPosts]);
  const leftSidebarPosts = useMemo(() => allPosts.slice(3, 15), [allPosts]); // Increased from 8 to 15
  const relatedArticles = useMemo(() => allPosts.slice(1, 2), [allPosts]); // Only 1 related article
  const trendingPosts = useMemo(() => allPosts.slice(0, 5), [allPosts]);

  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 3000);
    }
  }, [newsletterEmail]);

  const faqs = useMemo(() => [
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
    },
    {
      question: 'Where do you pull the blog content from?',
      answer: 'Our blog content is sourced from reputable RSS feeds including Dev.to, FreeCodeCamp, TechCrunch, CSS-Tricks, and Smashing Magazine. We fetch real, trending tech articles daily to keep content fresh and authentic.'
    },
    {
      question: 'Is the content genuine and authentic?',
      answer: 'Yes! All blog posts are fetched from legitimate RSS feeds of established tech publications. We do not generate fake content. The articles are real, published pieces from trusted sources in the tech industry.'
    },
    {
      question: 'How often is the content updated?',
      answer: 'Content is automatically refreshed daily. We cache posts for 24 hours to ensure fast loading while maintaining fresh content. New articles are fetched from RSS feeds every day.'
    },
    {
      question: 'What about the jokes and horoscopes?',
      answer: 'Daily jokes are fetched from the Official Joke API (official-joke-api.appspot.com), and horoscopes come from a free horoscope API. These are updated daily to provide fresh, entertaining content alongside our tech articles.'
    },
    {
      question: 'Are the horoscopes accurate?',
      answer: 'Horoscopes are provided for entertainment purposes from a free API service. They are general predictions and should be taken as fun, light-hearted content rather than serious astrological advice.'
    },
    {
      question: 'Can I request specific topics or articles?',
      answer: 'Absolutely! Feel free to contact us through our contact form with your topic suggestions. We continuously monitor trending tech topics and user interests to curate relevant content.'
    },
    {
      question: 'Is there a cost for using these services?',
      answer: 'No, all the content on this blog page is free to access. We use free APIs and RSS feeds to provide you with valuable tech insights, jokes, and daily predictions without any subscription fees.'
    }
  ], []);

  const toggleFAQ = useCallback((index: number) => {
    setExpandedFAQ(prev => prev === index ? null : index);
  }, []);

  return (
    <>
      <SEO
        title="Engineering Journal | Tech Blog & Insights"
        description="Deep dives into software architecture, design patterns, AI breakthroughs, and the future of web development."
        url={window.location.href}
        keywords={['Tech Blog', 'Software Engineering', 'AI', 'Web Development', 'Programming']}
      />
      <div 
        ref={containerRef}
        className="min-h-screen overflow-x-hidden bg-background relative"
      >
        {/* Professional Animated Background - Light Mode */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Base Gradient - Warm, Professional Tone */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #F8F6F0 0%, #F5F1E8 25%, #FAF8F3 50%, #F0EDE5 75%, #F8F6F0 100%)',
              backgroundSize: '400% 400%',
            }}
          />
          
          {/* Animated Gradient Orbs - Professional Depth */}
          <motion.div
            className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(217, 70, 239, 0.1) 40%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute top-[40%] right-[10%] w-[600px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)',
              filter: 'blur(120px)',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, 50, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
          
          <motion.div
            className="absolute bottom-[20%] left-[15%] w-[500px] h-[400px] rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 240, 255, 0.08) 40%, transparent 70%)',
              filter: 'blur(90px)',
            }}
            animate={{
              x: [0, 60, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Subtle Animated Particles - Professional Touch */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `rgba(${Math.random() > 0.5 ? '139, 92, 246' : '0, 240, 255'}, ${0.15 + Math.random() * 0.15})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
                y: [0, Math.random() * 50 - 25],
                x: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
          </div>

        {/* Professional Animated Background - Dark Mode */}
        <div className="dark:block hidden absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Base Gradient - Deep, Professional Tone */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0A0E1A 0%, #0F1419 25%, #0D1117 50%, #0A0E1A 75%, #0F1419 100%)',
              backgroundSize: '400% 400%',
            }}
          />
          
          {/* Animated Gradient Orbs - Professional Depth */}
    <motion.div
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(217, 70, 239, 0.2) 40%, transparent 70%)',
              filter: 'blur(120px)',
            }}
            animate={{
              x: [0, 60, 0],
              y: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
                <motion.div
            className="absolute top-[35%] right-[8%] w-[700px] h-[600px] rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
              filter: 'blur(130px)',
            }}
            animate={{
              x: [0, -50, 0],
              y: [0, 60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
          
          <motion.div
            className="absolute bottom-[15%] left-[12%] w-[600px] h-[500px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(0, 240, 255, 0.15) 40%, transparent 70%)',
              filter: 'blur(110px)',
            }}
            animate={{
              x: [0, 70, 0],
              y: [0, -40, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Subtle Animated Particles - Professional Touch */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: `rgba(${Math.random() > 0.5 ? '139, 92, 246' : '0, 240, 255'}, ${0.3 + Math.random() * 0.3})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${4 + Math.random() * 4}px rgba(${Math.random() > 0.5 ? '139, 92, 246' : '0, 240, 255'}, 0.5)`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 2, 0],
                y: [0, Math.random() * 60 - 30],
                x: [0, Math.random() * 60 - 30],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            />
          ))}
              </div>

        {/* Subtle Paper Texture Overlay - Professional Detail */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] dark:opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Main Content Container with Paper Corner Fold Effect */}
        <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6 lg:px-8">
          {/* Full Width Container */}
          <div className="w-full mx-auto">
            {/* 3D Paper Container - Tilted Effect */}
    <motion.div
              style={{ y, opacity }}
              className="relative w-full perspective-2000"
            >
              {/* Main Paper Card - Newspaper Layout */}
                <motion.div
                ref={paperCardRef}
                initial={{ 
                  opacity: 0, 
                  y: window.innerWidth < 768 ? 30 : 50
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0
                }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  transformStyle: 'preserve-3d',
                  rotateX,
                  rotateY,
                  rotateZ,
                  scale,
                  boxShadow: isHovered 
                    ? '0 20px 60px rgba(0, 240, 255, 0.15), 0 0 40px rgba(139, 92, 246, 0.1)' 
                    : 'none'
                }}
                className="relative bg-white dark:bg-[#0F1419] rounded-2xl md:rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden shadow-none transition-shadow duration-500"
              >
                {/* Cursor Follow Spotlight Effect */}
                {isHovered && (
                  <motion.div
                    className="absolute pointer-events-none rounded-2xl md:rounded-3xl"
                    style={{
                      width: '300px',
                      height: '300px',
                      background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(139, 92, 246, 0.05) 30%, transparent 70%)',
                      filter: 'blur(60px)',
                      opacity: 0.6,
                      x: spotlightXTransformed,
                      y: spotlightYTransformed,
                    }}
                  />
                )}
                
                {/* Additional Glow Layer for Dark Mode */}
                {isHovered && (
                <motion.div
                    className="absolute pointer-events-none rounded-2xl md:rounded-3xl dark:block hidden"
                    style={{
                      width: '350px',
                      height: '350px',
                      background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(139, 92, 246, 0.08) 35%, transparent 70%)',
                      filter: 'blur(80px)',
                      opacity: 0.5,
                      x: spotlightXTransformedDark,
                      y: spotlightYTransformedDark,
                    }}
                  />
                )}
                {/* Paper Content */}
                <div className="p-6 md:p-8 lg:p-12">
                  {/* Header Section - Newspaper Style */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mb-8 md:mb-12"
                  >
                    {/* Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-text/10 dark:border-white/10">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                        <span className="hover:text-text transition-colors cursor-pointer">EVENTS</span>
                        <span className="hover:text-text transition-colors cursor-pointer">BREAKING NEWS</span>
                        <span className="hover:text-text transition-colors cursor-pointer">ABOUT US</span>
                        <span className="hover:text-text transition-colors cursor-pointer">CONTACT US</span>
                      </div>
                      <div className="text-xs text-text-muted font-mono">
                        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}</span>
                        <span className="mx-2">|</span>
                        <span>CALL US (123) 456 7890</span>
                        <span className="mx-2">/</span>
                        <span>HELLO@NEWSFACTORY.COM</span>
                      </div>
                        </div>

                    {/* Main Navigation */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b-2 border-text/20 dark:border-white/20">
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-text">EN</span>
                          <span className="text-text-muted">|</span>
                          <span className="text-text-muted">IN</span>
                        </div>
                        <div className="flex-1 md:flex-initial flex items-center gap-2 px-4 py-2 rounded-lg border border-text/10 dark:border-white/10 bg-surface/50 dark:bg-surface/30">
                          <Search size={16} className="text-text-muted" />
                          <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="flex-1 bg-transparent border-none outline-none text-sm text-text placeholder:text-text-muted"
                          />
                        </div>
                        </div>

                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text text-center md:text-left">
                        ENGINEERING JOURNAL
                      </h1>
                      
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-sm font-medium text-text hover:text-primary transition-colors">
                          LOGIN
                        </button>
                        <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                          className="px-6 py-2 rounded-full bg-text text-white dark:bg-primary dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                        >
                          SUBSCRIBE
                        </button>
                          </div>
                            </div>

                    {/* Category Navigation */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm font-medium text-text-muted border-b border-text/10 dark:border-white/10 pb-4">
                      <span className="hover:text-text transition-colors cursor-pointer">OPINION</span>
                      <span className="text-text/20">|</span>
                      <span className="hover:text-text transition-colors cursor-pointer">BUSINESS & TRENDS</span>
                      <span className="text-text/20">|</span>
                      <span className="hover:text-text transition-colors cursor-pointer">POLITICS</span>
                      <span className="text-text/20">|</span>
                      <span className="hover:text-text transition-colors cursor-pointer">SPORTS</span>
                      <span className="text-text/20">|</span>
                      <span className="hover:text-text transition-colors cursor-pointer">STYLE & EXPERIENCES</span>
                      <span className="text-text/20">|</span>
                      <span className="hover:text-text transition-colors cursor-pointer">SUSTAINABILITY</span>
                      <span className="text-text/20">|</span>
                      <span className="hover:text-text transition-colors cursor-pointer">ACADEMIC</span>
                      <span className="text-text/20">|</span>
                      <span className="hover:text-text transition-colors cursor-pointer">WORLDS OF LUXURY</span>
                          </div>
                  </motion.div>

   

                  {/* Main Content - 3 Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-12 lg:items-stretch">
                    {/* Left Sidebar - Recent Articles */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="lg:col-span-3 space-y-6 flex flex-col"
                    >
                      <h2 className="text-lg font-bold text-text mb-4 pb-2 border-b border-text/10 dark:border-white/10">
                        Recent Articles
                      </h2>
                      <div className="space-y-6 flex-1">
                        {leftSidebarPosts.slice(0, 12).map((post, index) => (
                          <motion.div
                            key={post.id || index}
                            initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                            onClick={() => handleBlogClick(post)}
                            className="group cursor-pointer pb-6 border-b border-text/5 dark:border-white/5 last:border-0"
                          >
                            <h3 className="text-sm font-bold text-text mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {post.title || `Article Title ${index + 1}`}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                              <span>{post.author || 'John Doe'}</span>
                              <span>•</span>
                              <span>{formatDateWithYear(post.date)}</span>
                        </div>
                </motion.div>
                        ))}
              </div>

                    </motion.div>

                    {/* Center Column - Main Story */}
                <motion.div
                      initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="lg:col-span-6 flex flex-col"
                    >
                      {mainStories.length > 0 && (
                        <div className="relative flex flex-col flex-1">
                          {/* MAIN STORY Label */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1 rounded bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                              MAIN STORY
          </span>
                        </div>

                          {/* Main Story Image */}
                          <div 
                            className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-6 cursor-pointer group"
                            onClick={() => handleBlogClick(mainStories[0])}
                          >
                            {mainStories[0].image && mainStories[0].image !== '#' ? (
                              <img
                                src={mainStories[0].image}
                                alt={mainStories[0].title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-violet-500/30 border-4 border-primary/50 flex items-center justify-center">
                                    <TrendingUp size={48} className="text-white" />
                              </div>
                              <p className="text-text-muted text-sm">Featured Image</p>
                            </div>
                          </div>
                        )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                          {/* Main Story Content */}
                          <div onClick={() => handleBlogClick(mainStories[0])} className="cursor-pointer mb-8">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-text mb-4 leading-tight group-hover:text-primary transition-colors">
                              {mainStories[0].title || 'House Democrats introduce resolution to censure Rep. Gosar'}
                        </h2>
                            <p className="text-base md:text-lg text-text-muted mb-6 leading-relaxed">
                              {mainStories[0].excerpt || 'Detailed description of the main story goes here...'}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-text-muted mb-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-fuchsia flex items-center justify-center text-white font-bold text-xs">
                                {mainStories[0].author?.charAt(0) || 'M'}
                          </div>
                          <div>
                                <div className="font-semibold text-text">
                                  {mainStories[0].author || 'Michael Jordy and Sarah Apsari'}
                  </div>
                                <div className="text-xs">
                                  {formatDateWithYear(mainStories[0].date)}
                            </div>
                          </div>
                        </div>
        </div>

                          {/* Related Articles Section - Below Main Story */}
                          {relatedArticles.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-text/10 dark:border-white/10">
                              <h3 className="text-lg font-bold text-text mb-4 pb-2 border-b border-text/10 dark:border-white/10">
                                Related Stories
                              </h3>
                              <div className="space-y-4">
                                {relatedArticles.map((post, index) => (
                                  <motion.div
                                    key={post.id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                                    onClick={() => handleBlogClick(post)}
                                    className="group cursor-pointer flex gap-4 pb-4 border-b border-text/5 dark:border-white/5 last:border-0"
                                  >
                                    {post.image && post.image !== '#' ? (
                                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 flex-shrink-0">
                                        <img
                                          src={post.image}
                                          alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                                      </div>
                                    ) : (
                                      <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 via-violet-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg font-bold text-text/50">{post.title?.charAt(0) || 'A'}</span>
                              </div>
                                    )}
                                    <div className="flex-1">
                                      <h4 className="text-sm font-bold text-text mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title || `Related Article ${index + 1}`}
                                      </h4>
                                      <p className="text-xs text-text-muted mb-2 line-clamp-2">
                                        {post.excerpt || 'Article excerpt...'}
                                      </p>
                                      <div className="flex items-center gap-2 text-xs text-text-muted">
                                        <span>{post.author || 'Author'}</span>
                                        <span>•</span>
                                        <span>{formatDateWithYear(post.date)}</span>
                            </div>
                          </div>
                                  </motion.div>
                                ))}
                      </div>
                    </div>
                          )}

                  </div>
              )}
                    </motion.div>

                    {/* Right Sidebar - Trending Topics */}
                <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="lg:col-span-3 flex flex-col"
                    >
                      {/* Tabs */}
                      <div className="flex gap-4 mb-6 border-b border-text/10 dark:border-white/10">
                        <button 
                          onClick={() => setActiveTab('trending')}
                          className={`pb-2 px-1 text-sm font-bold transition-colors ${
                            activeTab === 'trending' 
                              ? 'border-b-2 border-red-600 text-text' 
                              : 'text-text-muted hover:text-text'
                          }`}
                        >
                          TRENDING TOPIC
                        </button>
                        <button 
                          onClick={() => setActiveTab('latest')}
                          className={`pb-2 px-1 text-sm font-bold transition-colors ${
                            activeTab === 'latest' 
                              ? 'border-b-2 border-red-600 text-text' 
                              : 'text-text-muted hover:text-text'
                          }`}
                        >
                          LATEST UPDATE
                        </button>
                      </div>

                      {/* Trending Topics List */}
                      {activeTab === 'trending' && (
                        <div className="space-y-4 mb-6">
                          {trendingPosts.slice(0, 5).map((post, index) => (
            <motion.div
                            key={post.id || index}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 + index * 0.05, duration: 0.4 }}
                      onClick={() => handleBlogClick(post)}
              className="group cursor-pointer"
            >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl font-bold text-red-600 flex-shrink-0">#{index + 1}</span>
                              <h3 className="text-sm font-bold text-text leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {post.title || `Trending Topic ${index + 1}`}
                              </h3>
                        </div>
                          </motion.div>
                        ))}
                        </div>
                      )}

                      {/* Latest Update List */}
                      {activeTab === 'latest' && (
                        <div className="space-y-4 mb-6">
                          {allPosts.slice(0, 5).map((post, index) => (
                            <motion.div
                              key={post.id || index}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.1 + index * 0.05, duration: 0.4 }}
                              onClick={() => handleBlogClick(post)}
                              className="group cursor-pointer"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-blue-600 flex-shrink-0">#{index + 1}</span>
                                <h3 className="text-sm font-bold text-text leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                  {post.title || `Latest Update ${index + 1}`}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-text-muted mt-1 ml-10">
                                <span>{post.author || 'Author'}</span>
                                <span>•</span>
                                <span>{formatDateWithYear(post.date)}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Additional Articles */}
                      <div className="mt-6 pt-6 border-t border-text/10 dark:border-white/10">
                        <h3 className="text-lg font-bold text-text mb-4 pb-2 border-b border-text/10 dark:border-white/10">
                          More Articles
                        </h3>
                        <div className="space-y-4">
                        {allPosts.slice(5, 10).map((post, index) => (
                          <motion.div
                            key={post.id || index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 + index * 0.05, duration: 0.4 }}
                            onClick={() => handleBlogClick(post)}
                            className="group cursor-pointer flex gap-3 pb-4 border-b border-text/5 dark:border-white/5 last:border-0"
                          >
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 flex-shrink-0">
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
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-violet-500/20">
                                  <span className="text-xs font-bold text-text/50">{post.title?.charAt(0) || 'A'}</span>
                            </div>
                          )}
                        </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-bold text-text mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {post.title || `Article ${index + 1}`}
                          </h3>
                              <div className="text-xs text-text-muted">
                                {formatDateWithYear(post.date)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Additional News Sections - Crypto, Politics, World News */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="mb-12 mt-12 pt-8 border-t-2 border-text/20 dark:border-white/20"
                  >
                    {/* Section Header */}
                    <div className="mb-6 pb-3 border-b border-text/10 dark:border-white/10">
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-text mb-2">
                        WORLD NEWS & MARKETS
                      </h2>
                      <div className="h-1 w-20 bg-red-600 dark:bg-red-500"></div>
                    </div>

                    {/* 3 Column News Layout - Equal Height */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:items-stretch">
                      {/* Crypto News Column */}
                      <div className="border-l-4 border-yellow-500 dark:border-yellow-400 pl-4 flex flex-col min-h-[400px]">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-text mb-2 flex items-center gap-2">
                            <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold uppercase">CRYPTO</span>
                            <span>Market Updates</span>
                          </h3>
                        </div>
                        {loadingContent ? (
                          <div className="flex items-center justify-center py-8 flex-1">
                            <RefreshCw size={16} className="text-primary animate-spin" />
                          </div>
                        ) : cryptoNews.length > 0 ? (
                          <div className="space-y-4 flex-1">
                            {cryptoNews.slice(0, 5).map((news, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 + index * 0.05, duration: 0.4 }}
                                className="pb-3 border-b border-text/5 dark:border-white/5 last:border-0"
                              >
                                <h4 className="text-sm font-bold text-text mb-1 leading-tight hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-2 cursor-pointer">
                                  {news.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                                  <span>{news.source}</span>
                                  <span>•</span>
                                  <span>{news.date}</span>
                      </div>
                    </motion.div>
                  ))}
                          </div>
                        ) : (
                          <div className="text-text-muted text-sm flex-1 flex items-center">Loading crypto news...</div>
                        )}
                      </div>

                      {/* Politics News Column */}
                      <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 flex flex-col min-h-[400px]">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-text mb-2 flex items-center gap-2">
                            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold uppercase">POLITICS</span>
                            <span>Global Affairs</span>
                          </h3>
                        </div>
                        {loadingContent ? (
                          <div className="flex items-center justify-center py-8 flex-1">
                            <RefreshCw size={16} className="text-primary animate-spin" />
                          </div>
                        ) : politicsNews.length > 0 ? (
                          <div className="space-y-4 flex-1">
                            {politicsNews.slice(0, 5).map((news, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.3 + index * 0.05, duration: 0.4 }}
                                className="pb-3 border-b border-text/5 dark:border-white/5 last:border-0"
                              >
                                <h4 className="text-sm font-bold text-text mb-1 leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer">
                                  {news.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                                  <span>{news.source}</span>
                                  <span>•</span>
                                  <span>{news.date}</span>
                                </div>
                </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-text-muted text-sm flex-1 flex items-center">Loading politics news...</div>
                        )}
                      </div>

                      {/* World News Column */}
                      <div className="border-l-4 border-green-500 dark:border-green-400 pl-4 flex flex-col min-h-[400px]">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-text mb-2 flex items-center gap-2">
                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold uppercase">WORLD</span>
                            <span>Global Headlines</span>
                          </h3>
                        </div>
                        {loadingContent ? (
                          <div className="flex items-center justify-center py-8 flex-1">
                            <RefreshCw size={16} className="text-primary animate-spin" />
                          </div>
                        ) : worldNews.length > 0 ? (
                          <div className="space-y-4 flex-1">
                            {worldNews.slice(0, 5).map((news, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4 + index * 0.05, duration: 0.4 }}
                                className="pb-3 border-b border-text/5 dark:border-white/5 last:border-0"
                              >
                                <h4 className="text-sm font-bold text-text mb-1 leading-tight hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-2 cursor-pointer">
                                  {news.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                                  <span>{news.source}</span>
                                  <span>•</span>
                                  <span>{news.date}</span>
                                </div>
            </motion.div>
                            ))}
          </div>
                        ) : (
                          <div className="text-text-muted text-sm flex-1 flex items-center">Loading world news...</div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Filter Tabs and Article Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mb-12"
                  >
                    {/* Section Header with Filter */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-text">
                        MORE TOP STORIES
              </h2>
              
                      {/* Segmented Control */}
              <div className="flex items-center justify-center md:justify-end">
                <div className="relative inline-flex rounded-full bg-surface-highlight dark:bg-surface/50 border border-text/10 dark:border-white/10 p-1 shadow-inner">
                  <motion.div
                            className="absolute inset-y-1 rounded-full bg-white dark:bg-surface-highlight"
                    initial={false}
                    animate={{
                      left: activeFilter === 'Tech' ? '4px' : 'calc(50% + 2px)',
                      width: 'calc(50% - 6px)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 8px rgba(255, 255, 255, 0.08)',
                    }}
                  />
                  
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
              
                    {/* Article Grid */}
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
                            <ArticleCard
                              key={post.id || i}
                              post={post}
                      onClick={() => handleBlogClick(post)}
                              variant="medium"
                            />
          ))}
        </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <motion.button
                      onClick={handleLoadMore}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary via-cyan-400 to-primary text-black dark:text-white font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                      Load More <ArrowRight size={16} />
                    </motion.button>
                  </div>
                )}
              </>
            )}
                  </motion.div>

                  {/* Newspaper Style Section - Daily Content */}
            <motion.div
                    initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="mt-16 pt-12 border-t-2 border-text/20 dark:border-white/20"
                  >
            {/* Section Header - Newspaper Style */}
            <div className="mb-8 pb-4 border-b-2 border-text/20 dark:border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text">
                  DAILY SPECIALS
              </h2>
                <span className="text-xs text-text-muted font-mono">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
                </span>
          </div>
              <div className="h-1 w-24 bg-red-600 dark:bg-red-500"></div>
                </div>

            {/* Newspaper 3-Column Layout - Equal Height */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:items-stretch">
              {/* Left Column - FAQ Section */}
              <div className="lg:col-span-5 flex flex-col min-h-[500px]">
                <div className="mb-6 pb-3 border-b border-text/10 dark:border-white/10">
                  <h3 className="text-xl font-bold text-text mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold uppercase">FAQ</span>
                    <span>Frequently Asked Questions</span>
                  </h3>
                </div>
                <div className="space-y-3 flex-1">
                  {faqs.slice(0, 8).map((faq, index) => (
                  <motion.div
                    key={index}
                      initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + index * 0.1, duration: 0.4 }}
                      className="border-l-4 border-primary/30 pl-4 py-2 hover:border-primary transition-colors"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                        className="w-full text-left"
                      >
                        <h4 className="font-bold text-sm text-text mb-1 hover:text-primary transition-colors">
                          {faq.question}
                        </h4>
                        <AnimatePresence>
                          {expandedFAQ === index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                              className="text-xs text-text-muted leading-relaxed mt-2"
                            >
                              {faq.answer}
                            </motion.p>
                          )}
                        </AnimatePresence>
                    </button>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                  className="mt-6 px-4 py-2 rounded-lg bg-text text-white dark:bg-primary dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Contact Us <ArrowRight size={6} />
                </motion.button>
              </div>

              {/* Middle Column - Daily Jokes */}
              <div className="lg:col-span-4 flex flex-col min-h-[500px]">
                <div className="mb-6 pb-3 border-b border-text/10 dark:border-white/10">
                  <h3 className="text-xl font-bold text-text mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold uppercase">JOKE</span>
                    <span>Daily Laugh</span>
                  </h3>
                </div>
                {loadingContent ? (
                  <div className="flex items-center justify-center py-8 flex-1">
                    <RefreshCw size={20} className="text-primary animate-spin" />
                  </div>
                ) : dailyJokes.length > 0 ? (
                  <div className="space-y-4 flex-1">
                    {dailyJokes.map((joke, index) => (
                        <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 p-5 rounded-lg border-2 border-yellow-200 dark:border-yellow-800/30"
                      >
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-text mb-2 leading-relaxed">
                            {joke.setup}
                          </p>
                          <div className="relative">
                            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-yellow-300 dark:bg-yellow-700/50"></div>
                            <p className="relative text-base font-bold text-text italic">
                              {joke.punchline}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-text-muted italic mt-3">
                          — Joke #{index + 1}
                          </div>
                        </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-text-muted text-sm flex-1">Loading jokes...</div>
                )}
              </div>

              {/* Right Column - Horoscopes */}
              <div className="lg:col-span-3 flex flex-col min-h-[500px]">
                <div className="mb-6 pb-3 border-b border-text/10 dark:border-white/10">
                  <h3 className="text-xl font-bold text-text mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold uppercase">ASTRO</span>
                    <span>Daily Predictions</span>
                  </h3>
                </div>
                {loadingContent ? (
                  <div className="flex items-center justify-center py-8 flex-1">
                    <RefreshCw size={20} className="text-primary animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    {horoscopes.slice(0, 6).map((horo, index) => (
                      <motion.div
                        key={horo.sign}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.7 + index * 0.1, duration: 0.4 }}
                        className="border-l-2 border-purple-400 dark:border-purple-500 pl-3 py-2 hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
                      >
                        <h4 className="font-bold text-sm text-text mb-1 uppercase tracking-wide">
                          {horo.sign}
                        </h4>
                        <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                          {horo.prediction}
                        </p>
                  </motion.div>
                ))}
                    {horoscopes.length > 6 && (
                      <div className="text-xs text-text-muted italic pt-2 border-t border-text/10 dark:border-white/10">
                        +{horoscopes.length - 6} more signs available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
              </motion.div>
            </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
