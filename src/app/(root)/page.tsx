import ContactSection from "@/components/sections/ContactSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
        <Hero />
        <FeaturedProductsSection />
        <ContactSection />
    </>
  );
}
