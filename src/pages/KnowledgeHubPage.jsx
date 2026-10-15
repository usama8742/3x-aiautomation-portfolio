import React from 'react';
import { ArrowRight, GraduationCap, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import KnowledgeHub from '../components/KnowledgeHub';
import MotionReveal from '../components/MotionReveal';
import SEOHead from '../components/SEOHead';
export default function KnowledgeHubPage({ onOpenContact }) {
  return (
    <>
      <SEOHead
        title="AI Automation Knowledge Hub | Concepts, Architectures & Code | 3X AI Automation"
        description="Searchable explanations of AI agents, RAG, vector databases, LLM orchestration, n8n workflows and more, from beginner to expert, with architecture diagrams and code."
        keywords="AI knowledge base, what is RAG, vector database explained, AI agent architecture, n8n tutorial, LLM orchestration"
        canonicalUrl="/knowledge-hub"
      />

      <main className="relative z-10 pt-24 sm:pt-28">
        <section className="bg-white border-b border-[#DBD6CF] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-slate-600 flex items-center gap-2">
              <Link to="/" className="hover:text-[#FE330A] transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#191919] font-semibold">Knowledge Hub</span>
            </nav>

            <span className="pill-badge mb-5">
              <Library className="w-3.5 h-3.5 text-[#FE330A]" />
              Interactive Knowledge Hub
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#191919] tracking-tight leading-[1.05] max-w-3xl">
              Every AI Concept, <span className="text-[#FE330A]">Explained Properly.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Search any topic, from "what is a vector database" to multi-agent orchestration, and get a plain-English
              explanation, an architecture diagram and the code that makes it real.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#knowledge-hub" className="btn-azzle-primary">
                Start exploring
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/academy" className="btn-azzle-white">
                <GraduationCap className="w-4 h-4" />
                Take the full course
              </Link>
            </div>
          </div>
        </section>

        <MotionReveal direction="up" distance={30}>
          <KnowledgeHub onOpenContact={onOpenContact} />
        </MotionReveal>
      </main>
    </>
  );
}
