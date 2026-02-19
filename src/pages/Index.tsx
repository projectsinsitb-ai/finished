import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ConceptSection from '@/components/ConceptSection';
import ProfilesSection from '@/components/ProfilesSection';
import ExtrasSection from '@/components/ExtrasSection';
import ExperienceSection from '@/components/ExperienceSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ConceptSection />
      <ProfilesSection />
      <ExtrasSection />
      <section id="experience">
        <ExperienceSection />
      </section>
      <FooterSection />
    </div>
  );
};

export default Index;
