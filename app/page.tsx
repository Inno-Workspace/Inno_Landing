import Hero from "@/components/hero";
import About from "@/components/about";
import TechStack from "@/components/tech-stack";
import Marquee from "@/components/marquee";
import Works from "@/components/works";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TransitionOverlay from "@/components/transition-overlay";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <TransitionOverlay />
      <Header />
      <div className="page-content">
        <main className="w-full min-h-screen">
          <Hero />
          <About />
          <TechStack />
          <Marquee />
          <Works />
          <Contact />
          <Footer />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
