import { HomeBreakSectionOne, HomeCurrentListingsSection, HomeHeroSection } from "@/components/sections/HomePageSections";
import ClientPageWrapper from "@/components/Wrappers/ClientPageWrapper";


export default function Home() {
  return (
    <ClientPageWrapper>
      <HomeHeroSection />
      <HomeCurrentListingsSection />
      <HomeBreakSectionOne />
    </ClientPageWrapper>
  );
}
