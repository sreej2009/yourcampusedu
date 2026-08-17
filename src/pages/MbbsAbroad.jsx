import MbbsHero from "../components/mbbs-abroad/MbbsHero";
import WhyMbbsAbroad from "../components/mbbs-abroad/WhyMbbsAbroad";
import TopCountries from "../components/mbbs-abroad/TopCountries";
import AdmissionProcess from "../components/mbbs-abroad/AdmissionProcess";
import MbbsFAQ from "../components/mbbs-abroad/MbbsFAQ";
import MbbsCTA from "../components/mbbs-abroad/MbbsCTA";

const MbbsAbroad = () => {
  return (
    <main className="mbbs-abroad-page">
      <MbbsHero />
      <WhyMbbsAbroad />
      <TopCountries />
      <AdmissionProcess />
      <MbbsFAQ />
      <MbbsCTA />
    </main>
  );
};

export default MbbsAbroad;