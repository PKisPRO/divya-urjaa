import Hero from "@/components/home/Hero";
import BrandStatement from "@/components/home/BrandStatement";
import Benefits from "@/components/home/Benefits";
import ProductExperience from "@/components/home/ProductExperience";
import IngredientExperience from "@/components/home/IngredientExperience";
import JourneySequence from "@/components/home/JourneySequence";
import ArtisanSequence from "@/components/home/ArtisanSequence";
import VideoStory from "@/components/home/VideoStory";
import ImpactStory from "@/components/home/ImpactStory";
import CorporateGifting from "@/components/home/CorporateGifting";
import RitualSequence from "@/components/home/RitualSequence";
import FinalFlame from "@/components/home/FinalFlame";
import EnergyPath from "@/components/home/EnergyPath";

export default function Home() {
  return (
    <>
      {/* the flame film — swap `mode` to "image" for a still hero */}
      <Hero mode="video" />

      {/* the trail draws through the light half of the page */}
      <EnergyPath>
        <BrandStatement />
        <Benefits />
      </EnergyPath>

      <ProductExperience />
      <IngredientExperience />
      <JourneySequence />

      <ArtisanSequence />
      <VideoStory compact />

      <ImpactStory />
      <CorporateGifting />

      {/* descent into night: the ritual lights the flame, the flame closes */}
      <RitualSequence />
      <FinalFlame />
    </>
  );
}
