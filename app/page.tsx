import Hero from "@/components/hero";
import About from "@/components/about";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Hero />
      <About />
      <TechStack />
    </main>
  );
}
