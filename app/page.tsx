import Header from "@/components/site/header";
import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import Offer from "@/components/site/offer";
import Works from "@/components/site/works";
import Plans from "@/components/site/plans";
import Contact from "@/components/site/contact";
import Ribbon from "@/components/site/ribbon";
import Footer from "@/components/site/footer";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="w-full">
        {/* Band rhythm: ink → bone → ink → bone → pale mint → ink → mint ribbon */}
        <Hero />
        <About />
        <Offer />
        <Works />
        <Plans />
        <Contact />
      </main>
      <Ribbon />
      <Footer />
    </SmoothScrollProvider>
  );
}
