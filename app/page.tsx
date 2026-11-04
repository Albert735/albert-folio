import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import KenteBand from "@/components/KenteBand";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only z-[200] rounded-full bg-gold px-4 py-2 text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <KenteBand words={["Accra", "Legon", "React Native", "Next.js", "Mobile money", "Figma", "Expo", "Mapbox"]} />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
