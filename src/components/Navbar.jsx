import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { InstagramIcon } from './SocialIcons';
// Links are either a section on the home page (`hash`) or a route (`to`).
// Section links scroll in place on the home page and navigate home first
// from any other route.
const PRIMARY_LINKS = [
  { label: 'Home', hash: 'home' },
  { label: 'Services', hash: 'services' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Academy', to: '/academy' },
  { label: 'Knowledge Hub', to: '/knowledge-hub' },
  { label: 'Blog', to: '/blog' },
];

const MOBILE_LINKS = [
  { label: 'Home', hash: 'home' },
  { label: 'Team', hash: 'team' },
  { label: 'Services', hash: 'services' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Industries', hash: 'industries' },
  { label: 'Tech Stack', hash: 'tech-stack' },
  { label: 'Academy', to: '/academy' },
  { label: 'Knowledge Hub', to: '/knowledge-hub' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', hash: 'contact' },
];

const SPY_SECTIONS = ['home', 'about', 'team', 'services', 'projects', 'industries', 'tech-stack', 'how-it-works', 'contact'];

export default function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setIsScrolled(window.scrollY > 20);
      if (!isHome) return;
      const probe = window.scrollY + 160;
      let current = 'home';
      for (const id of SPY_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const goToSection = useCallback(
    (e, hash) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (!isHome) {
        navigate('/', { state: { scrollTo: hash } });
        return;
      }
      const target = document.getElementById(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    },
    [isHome, navigate]
  );

  const isLinkActive = (link) => {
    if (link.to) return pathname === link.to || pathname.startsWith(`${link.to}/`);
    if (!isHome) return false;
    if (link.hash === 'services') return activeSection === 'services';
    return activeSection === link.hash;
  };

  const renderLink = (link, className) =>
    link.to ? (
      <Link key={link.label} to={link.to} className={className} aria-current={isLinkActive(link) ? 'page' : undefined}>
        {link.label}
      </Link>
    ) : (
      <a
        key={link.label}
        href={`/#${link.hash}`}
        onClick={(e) => goToSection(e, link.hash)}
        className={className}
        aria-current={isLinkActive(link) ? 'location' : undefined}
      >
        {link.label}
      </a>
    );

  const desktopClass = (active) =>
    `px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-[50px] text-xs xl:text-sm font-bold transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FE330A] ${
      active ? 'text-white bg-[#191919] shadow-sm' : 'text-[#191919] hover:text-[#FE330A] hover:bg-[#EFEAE3]'
    }`;

  const mobileClass = (active) =>
    `px-4 py-3 rounded-xl text-base font-bold transition-colors ${
      active ? 'text-[#FE330A] bg-[#EFEAE3]' : 'text-[#191919] hover:text-[#FE330A] hover:bg-[#EFEAE3]'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#DBD6CF]'
          : 'bg-white/90 backdrop-blur-sm border-b border-[#DBD6CF]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a
            href="/#home"
            onClick={(e) => goToSection(e, 'home')}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FE330A] rounded-lg shrink-0"
          >
            <Logo dark={false} />
          </a>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Primary">
            {PRIMARY_LINKS.map((link) => renderLink(link, desktopClass(isLinkActive(link))))}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <a
              href="https://www.instagram.com/3xaiautomation/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[50px] border text-xs font-bold transition-all group duration-300 bg-white text-[#191919] border-[#DBD6CF] hover:border-[#FE330A] hover:text-[#FE330A] shadow-sm whitespace-nowrap"
              aria-label="Follow 3X AI Automation on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#FE330A] group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">Instagram</span>
            </a>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-1.5 px-5 xl:px-6 py-2.5 rounded-[50px] border-2 border-black bg-black text-white hover:bg-[#FE330A] hover:border-[#FE330A] transition-all duration-300 font-bold text-xs uppercase tracking-wider shadow-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FE330A] focus-visible:ring-offset-2"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="p-2.5 rounded-[50px] text-[#191919] hover:text-[#FE330A] bg-white border border-[#DBD6CF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FE330A]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-b border-[#DBD6CF] bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile">
            {MOBILE_LINKS.map((link) => renderLink(link, mobileClass(isLinkActive(link))))}
            <div className="pt-3 flex flex-col gap-2">
              <a
                href="https://www.instagram.com/3xaiautomation/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs text-[#191919] bg-[#EFEAE3] border border-[#DBD6CF] hover:border-[#FE330A] transition-all"
              >
                <InstagramIcon className="w-4 h-4 text-[#FE330A]" />
                <span>Follow @3xaiautomation on Instagram</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-black hover:bg-[#FE330A] transition-all shadow-md"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
