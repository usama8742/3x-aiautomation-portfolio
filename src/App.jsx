import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AuroraGlow from './components/AuroraGlow';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ParticleCanvas from './components/ParticleCanvas';
import ScrollProgress from './components/ScrollProgress';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
// The home page is the landing route, so it stays in the main bundle.

// Every other route is code-split so the first paint of the home page
// does not pay for the course, knowledge hub, blog and SEO pages.
const AcademyPage = lazy(() => import('./pages/AcademyPage'));
const KnowledgeHubPage = lazy(() => import('./pages/KnowledgeHubPage'));
const ServicesIndexPage = lazy(() => import('./pages/ServicesIndexPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const IndustriesIndexPage = lazy(() => import('./pages/IndustriesIndexPage'));
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage'));
const LocationsIndexPage = lazy(() => import('./pages/LocationsIndexPage'));
const LocationDetailPage = lazy(() => import('./pages/LocationDetailPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Restores scroll position on route change, or scrolls to a section the
// previous page asked for via location state.
function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollToContact || state?.scrollTo) {
      const targetId = state.scrollToContact ? 'contact' : state.scrollTo;
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
}

// Desktop-only ambient glow that follows the cursor. It writes straight to
// the DOM instead of React state so mouse movement never re-renders the app.
function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const isDesktop = () => window.innerWidth >= 1024 && !window.matchMedia('(hover: none)').matches;
    if (!isDesktop()) return undefined;

    let frame = 0;
    let x = -400;
    let y = -400;

    const paint = () => {
      frame = 0;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 192}px, ${y - 192}px, 0)`;
      }
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden lg:block fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none z-0 opacity-20"
      style={{
        transform: 'translate3d(-400px, -400px, 0)',
        background: 'radial-gradient(circle, rgba(254, 51, 10, 0.16) 0%, rgba(254, 51, 10, 0.05) 50%, transparent 70%)',
      }}
    />
  );
}

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-32" role="status" aria-live="polite">
      <span className="font-mono text-xs uppercase tracking-widest text-slate-600">Loading…</span>
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Contact lives on the home page. From any other route we go home first
  // and let ScrollToTop finish the job.
  const handleOpenContact = () => {
    if (pathname !== '/') {
      navigate('/', { state: { scrollToContact: true } });
      return;
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-[#191919] selection:bg-[#FE330A] selection:text-white font-sans overflow-x-hidden">
      <ScrollToTop />
      <ScrollProgress />
      <AuroraGlow />
      <ParticleCanvas />
      <CursorGlow />

      <Navbar onOpenContact={handleOpenContact} />

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenContact={handleOpenContact}
              />
            }
          />

          {/* Learning content, moved off the home page */}
          <Route path="/academy" element={<AcademyPage onOpenContact={handleOpenContact} />} />
          <Route path="/knowledge-hub" element={<KnowledgeHubPage onOpenContact={handleOpenContact} />} />

          {/* Services */}
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />

          {/* Industries */}
          <Route path="/industries" element={<IndustriesIndexPage />} />
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />

          {/* Locations */}
          <Route path="/locations" element={<LocationsIndexPage />} />
          <Route path="/locations/:slug" element={<LocationDetailPage />} />

          {/* Blog */}
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
