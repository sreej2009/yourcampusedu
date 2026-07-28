import { useParams, Link } from "react-router-dom";
import { CompassIcon } from "lucide-react";

import CountryHero from "../components/study-destination/country-details/CountryHero";
import WhyChooseCountry from "../components/study-destination/country-details/WhyChooseCountry";
import UniversitySection from "../components/study-destination/country-details/UniversitySection";
import CountryCTA from "../components/study-destination/country-details/CountryCTA";

import countryDetails from "../Data/countryDetails";
import universitiesData from "../Data/universitiesData";

export default function CountryDetails() {
  const { countryId } = useParams();
  const country = countryDetails[countryId];
  const universities = universitiesData[countryId];

  if (!country) {
    return (
      <div className="country-not-found">
        <CompassIcon size={40} strokeWidth={1.6} />
        <h1>We couldn't find that destination</h1>
        <p>The country you're looking for isn't on our board yet. Try another gate.</p>
        <Link to="/study-destination" className="country-not-found__link">
          Back to Study Destinations
        </Link>

        <style>{`
          .country-not-found {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 0.75rem;
            padding: 3rem 1.5rem;
            font-family: var(--font-main);
            color: var(--text-medium);
          }
          .country-not-found svg {
            color: var(--primary);
            margin-bottom: 0.5rem;
          }
          .country-not-found h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-dark);
            margin: 0;
          }
          .country-not-found p {
            margin: 0 0 0.75rem;
            max-width: 420px;
          }
          .country-not-found__link {
            font-weight: 600;
            color: var(--text-white);
            background: var(--gradient-primary);
            padding: 0.8rem 1.5rem;
            border-radius: var(--radius-md);
            text-decoration: none;
            box-shadow: var(--shadow-md);
            transition: var(--transition);
          }
          .country-not-found__link:hover {
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="country-details-page">
      <CountryHero country={country} />
      <WhyChooseCountry countryName={country.name} />
      <UniversitySection
        universities={universities}
        countryName={country.name}
        countryId={countryId}
      />
      <CountryCTA countryName={country.name} />
    </main>
  );
}