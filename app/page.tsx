import Hero from "@/components/hero";
import About from "@/components/about";
import TechStack from "@/components/tech-stack";
import Works from "@/components/works";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Hero />
      <About />
      <TechStack />
      <Works />
      <Contact />
      <Footer />
    </main>
  );
}
