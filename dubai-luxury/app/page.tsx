import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import Portfolio from "@/components/Portfolio";
import Advisory from "@/components/Advisory";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <StorySection />
        <Portfolio />
        <Advisory />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
