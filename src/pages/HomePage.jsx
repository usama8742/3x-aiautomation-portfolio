import React from 'react';
import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Industries from '../components/Industries';
import MotionReveal from '../components/MotionReveal';
import Process from '../components/Process';
import Projects from '../components/Projects';
import SEOHead from '../components/SEOHead';
import Services from '../components/Services';
import Team from '../components/Team';
import TechStack from '../components/TechStack';
import { HOMEPAGE_SEO } from '../data/seoContentData';
// Home is a sales page. The full course and the knowledge hub live on
// /academy and /knowledge-hub so the landing page stays scannable.
export default function HomePage({ onOpenContact }) {
  return (
    <>
      <SEOHead
        title={HOMEPAGE_SEO.title}
        description={HOMEPAGE_SEO.description}
        keywords={HOMEPAGE_SEO.keywords}
        canonicalUrl="/"
        schemaData={HOMEPAGE_SEO.schema}
      />

      <main className="relative z-10">
        <Hero onOpenContact={onOpenContact} />

        <MotionReveal direction="up" distance={35}>
          <About />
        </MotionReveal>

        <MotionReveal direction="up" distance={35}>
          <Team />
        </MotionReveal>

        <MotionReveal direction="up" distance={40}>
          <Services />
        </MotionReveal>

        <MotionReveal direction="up" distance={40}>
          <Projects />
        </MotionReveal>

        <MotionReveal direction="up" distance={40}>
          <Industries />
        </MotionReveal>

        <MotionReveal direction="up" distance={40}>
          <TechStack />
        </MotionReveal>

        <MotionReveal direction="up" distance={40}>
          <Process />
        </MotionReveal>

        <MotionReveal direction="up" distance={40}>
          <Contact />
        </MotionReveal>
      </main>
    </>
  );
}
