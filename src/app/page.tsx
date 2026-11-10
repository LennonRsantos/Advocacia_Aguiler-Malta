import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PracticeAreas } from "@/components/PracticeAreas";
import { Team } from "@/components/Team";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <PracticeAreas />
        <About />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
