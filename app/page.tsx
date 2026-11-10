import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/hero/Hero';
import Marquee from '@/components/sections/Marquee';
import ExploreEvents from '@/components/sections/ExploreEvents';
import HowItWorks from '@/components/sections/HowItWorks';
import Companies from '@/components/sections/Companies';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import WhyNetworked from '@/components/sections/WhyNetworked';
import Stories from '@/components/sections/Stories';
import FinalCTA from '@/components/sections/FinalCTA';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Sits above the fixed footer; its bottom margin equals the footer height so scrolling reveals it */}
      <main className="relative z-10 rounded-b-[28px] bg-paper shadow-[0_40px_80px_-40px_rgb(23_20_26/0.35)] md:rounded-b-[48px]" style={{ marginBottom: 'var(--footer-h, 0px)' }}>
        <Hero />
        <Marquee />
        <ExploreEvents />
        <HowItWorks />
        <Companies />
        <UpcomingEvents />
        <WhyNetworked />
        <Stories />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
