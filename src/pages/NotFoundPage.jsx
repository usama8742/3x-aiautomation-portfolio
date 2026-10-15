import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 Page Not Found | 3X AI Automation"
        description="The requested page could not be found on 3X AI Automation."
        canonicalUrl="/404"
      />

      <div className="min-h-[80vh] bg-white text-[#191919] flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#FE330A]/10 border border-[#FE330A]/30 text-[#FE330A] flex items-center justify-center font-mono text-3xl font-black mb-6 shadow-glow">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#191919] tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-600 max-w-md mb-8 font-normal text-sm sm:text-base">
          The page or route you requested does not exist or has been moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link to="/services" className="btn-secondary">
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </>
  );
}
