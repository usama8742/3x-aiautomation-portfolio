import React from 'react';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AiCourseAcademy from '../components/AiCourseAcademy';
import AiPlatformPillars from '../components/AiPlatformPillars';
import MotionReveal from '../components/MotionReveal';
import SEOHead from '../components/SEOHead';
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AI Engineering & Automation Academy',
  description:
    'A free, zero-jargon course covering machine learning foundations, LLMs and prompt engineering, RAG knowledge bases, multi-agent systems, n8n production automation, and trust & safety.',
  provider: {
    '@type': 'Organization',
    name: '3X AI Automation',
  },
  isAccessibleForFree: true,
};

export default function AcademyPage({ onOpenContact }) {
  return (
    <>
      <SEOHead
        title="Free AI Automation Course | Zero Jargon to Production | 3X AI Automation"
        description="Learn how AI agents, LLMs, RAG knowledge bases and n8n automation work from the ground up. Six free modules with runnable production code, written in plain English."
        keywords="AI course, learn AI automation, n8n course, RAG tutorial, AI agents course, LLM prompt engineering"
        canonicalUrl="/academy"
        schemaData={schema}
      />

      <main className="relative z-10 pt-24 sm:pt-28">
        {/* Page header */}
        <section className="bg-white border-b border-[#DBD6CF] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-slate-600 flex items-center gap-2">
              <Link to="/" className="hover:text-[#FE330A] transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#191919] font-semibold">Academy</span>
            </nav>

            <span className="pill-badge mb-5">
              <GraduationCap className="w-3.5 h-3.5 text-[#FE330A]" />
              Free AI Engineering Academy
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#191919] tracking-tight leading-[1.05] max-w-3xl">
              Learn How Production AI <span className="text-[#FE330A]">Actually Works.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              The same platform principles and engineering practices we use on client systems, explained in plain
              English with runnable code. Start with the four pillars, then work through the six-module course.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#ai-academy" className="btn-azzle-primary">
                Start the course
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/knowledge-hub" className="btn-azzle-white">
                <BookOpen className="w-4 h-4" />
                Browse the Knowledge Hub
              </Link>
            </div>
          </div>
        </section>

        <MotionReveal direction="up" distance={30}>
          <AiPlatformPillars onOpenContact={onOpenContact} />
        </MotionReveal>

        <MotionReveal direction="up" distance={30}>
          <AiCourseAcademy onOpenContact={onOpenContact} />
        </MotionReveal>
      </main>
    </>
  );
}
