import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCountryBySlug } from "../../data/mbbscountryDetails";
import CountryHero from "../../components/mbbs-abroad/country-details/CountryHero";
import WhyChooseCountry from "../../components/mbbs-abroad/country-details/WhyChooseCountry";
import EligibilitySection from "../../components/mbbs-abroad/country-details/EligibilitySection";
import UniversitySection from "../../components/mbbs-abroad/country-details/UniversitySection";
import CountryFAQ from "../../components/mbbs-abroad/country-details/CountryFAQ";
import CountryCTA from "../../components/mbbs-abroad/country-details/CountryCTA";

const MbbsCountryDetails = () => {
  const { countrySlug } = useParams();
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    return (
      <main className="mbbs-country-not-found">
        <h1>We couldn't find that country</h1>
        <p>Check the link, or explore the countries we currently offer MBBS admissions in.</p>
        <Link to="/mbbs-abroad" className="mbbs-country-not-found__link">
          <ArrowLeft size={16} /> Back to MBBS Abroad
        </Link>

        <style>{`
          .mbbs-country-not-found {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 4rem 1.5rem;
          }
          .mbbs-country-not-found h1 {
            font-size: 1.6rem;
            font-weight: 700;
            color: var(--text-dark);
            margin: 0 0 0.75rem;
          }
          .mbbs-country-not-found p {
            color: var(--text-medium);
            margin: 0 0 1.5rem;
          }
          .mbbs-country-not-found__link {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            color: var(--primary);
            font-weight: 600;
            text-decoration: none;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="mbbs-country-details-page">
      <CountryHero country={country} />
      <WhyChooseCountry country={country} />
      <EligibilitySection country={country} />
      <UniversitySection country={country} />
      <CountryFAQ country={country} />
      <CountryCTA country={country} />
    </main>
  );
};

export default MbbsCountryDetails;