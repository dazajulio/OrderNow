import { Ecosystem } from '@/components/marketing/Ecosystem';
import { FAQ } from '@/components/marketing/FAQ';
import { Footer } from '@/components/marketing/Footer';
import { Hero } from '@/components/marketing/Hero';
import { Navbar } from '@/components/marketing/Navbar';
import { Pricing } from '@/components/marketing/Pricing';
import { ProblemSolution } from '@/components/marketing/ProblemSolution';
import { RegisterCTA } from '@/components/marketing/RegisterCTA';
import { Testimonials } from '@/components/marketing/Testimonials';
import { UseCases } from '@/components/marketing/UseCases';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-orange-500/10">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Ecosystem />
      <UseCases />
      <Testimonials />
      <Pricing />
      <FAQ />
      <RegisterCTA />
      <Footer />
    </div>
  );
}
