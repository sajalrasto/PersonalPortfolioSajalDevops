import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Services from './components/Services';
import Industries from './components/Industries';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Lazy load heavy components for code splitting
const ResumePage = lazy(() => import('./components/pages/ResumePage'));
const ServicesPage = lazy(() => import('./components/pages/ServicesPage'));
const BlogPage = lazy(() => import('./components/pages/BlogPage'));
const BlogDetailsPage = lazy(() => import('./components/pages/BlogDetailsPage'));
const CaseStudyPage = lazy(() => import('./components/pages/CaseStudyPage'));
const AngelMonkeyCaseStudy = lazy(() => import('./components/pages/AngelMonkeyCaseStudy'));
const PlationAtHomeCaseStudy = lazy(() => import('./components/pages/PlationAtHomeCaseStudy'));
const CMSCaseStudy = lazy(() => import('./components/pages/CMSCaseStudy'));
const TripatakalandCaseStudy = lazy(() => import('./components/pages/TripatakalandCaseStudy'));

// Loading component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-text-muted">Loading...</p>
    </div>
  </div>
);

// Wrapper for Suspense
const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Services />
            <TechStack />
            <Projects />
            <About />
            <Contact />
            <Footer />
          </>
        }
      />

      {/* Services Route */}
      <Route
        path="/services"
        element={
          <SuspenseWrapper>
            <ServicesPage />
            <Footer />
          </SuspenseWrapper>
        }
      />

      {/* Resume Route */}
      <Route
        path="/resume"
        element={
          <SuspenseWrapper>
            <ResumePage />
            <Footer />
          </SuspenseWrapper>
        }
      />

      {/* Blog Routes */}
      <Route
        path="/blog"
        element={
          <SuspenseWrapper>
            <BlogPage />
            <Footer />
          </SuspenseWrapper>
        }
      />

      <Route
        path="/blog/:slug"
        element={
          <SuspenseWrapper>
            <BlogDetailsPage />
            <Footer />
          </SuspenseWrapper>
        }
      />

      {/* Case Study Routes */}
      <Route
        path="/case-study/angelmonkey"
        element={
          <SuspenseWrapper>
            <AngelMonkeyCaseStudy />
            <Footer />
          </SuspenseWrapper>
        }
      />

      <Route
        path="/case-study/plationathome"
        element={
          <SuspenseWrapper>
            <PlationAtHomeCaseStudy />
            <Footer />
          </SuspenseWrapper>
        }
      />

      <Route
        path="/case-study/cms"
        element={
          <SuspenseWrapper>
            <CMSCaseStudy />
            <Footer />
          </SuspenseWrapper>
        }
      />

      <Route
        path="/case-study/tripatakaland"
        element={
          <SuspenseWrapper>
            <TripatakalandCaseStudy />
            <Footer />
          </SuspenseWrapper>
        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center">
              <h1 className="text-6xl font-display font-bold text-text mb-4">404</h1>
              <p className="text-text-muted mb-8">Page not found</p>
              <a
                href="/"
                className="px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-medium transition-all"
              >
                Go Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

