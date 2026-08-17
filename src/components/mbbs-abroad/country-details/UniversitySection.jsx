import { motion, useReducedMotion } from "framer-motion";
import { getUniversitiesBySlug } from "../../../Data/mbbsuniversitiesData";

const UniversitySection = ({ country }) => {
  const reduceMotion = useReducedMotion();
  const universities = getUniversitiesBySlug(country.slug);

  if (universities.length === 0) return null;

  return (
    <section className="university-section" style={{ "--country-accent": country.accent }}>
      <div className="university-section__header">
        <p className="university-section__eyebrow">Partner Universities</p>
        <h2 className="university-section__title">
          Where you could study MBBS in {country.name}
        </h2>
      </div>

      <div className="university-section__grid">
        {universities.map((uni, index) => (
          <motion.div
            className="university-card"
            key={uni.name}
            initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <div className="university-card__logo">
              <img src={uni.logo} alt={`${uni.name} logo`} loading="lazy" />
            </div>

            <h3 className="university-card__name">{uni.name}</h3>
            <p className="university-card__city">{uni.city}</p>

            <div className="university-card__stats">
              <div className="university-card__stat university-card__stat--fees">
                <span className="university-card__stat-label">Annual Fees</span>
                <span className="university-card__stat-value">{uni.fees}</span>
              </div>
              <div className="university-card__stat university-card__stat--intake">
                <span className="university-card__stat-label">Intake</span>
                <span className="university-card__stat-value">{uni.intake}</span>
              </div>
            </div>

            <div className="university-card__tags">
              <span className="tag-pill tag-pill--subject">MBBS</span>
              {uni.language && (
                <span className="tag-pill tag-pill--language">{uni.language}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .university-section {
          padding: clamp(3.5rem, 7vw, 5.5rem) 1.5rem;
          max-width: 1180px;
          margin: 0 auto;
          font-family: var(--font-main);
        }

        .university-section__header {
          text-align: center;
          max-width: 560px;
          margin: 0 auto clamp(2.5rem, 5vw, 3rem);
        }

        .university-section__eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--country-accent, var(--primary));
          margin: 0 0 0.75rem;
        }

        .university-section__title {
          font-size: clamp(1.6rem, 3.4vw, 2.2rem);
          font-weight: 700;
          color: var(--text-dark);
          margin: 0;
        }

        .university-section__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .university-card {
          display: flex;
          flex-direction: column;
          padding: 1.75rem;
          border-radius: var(--radius-lg);
          background: var(--bg-main);
          border: 1px solid var(--border);
          transition: var(--transition);
        }

        .university-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--country-accent, var(--primary)) 35%, var(--border));
        }

        /* ---------- Logo ---------- */

        .university-card__logo {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          margin-bottom: 1.25rem;
        }

        .university-card__logo img {
          max-height: 100%;
          max-width: 85%;
          object-fit: contain;
        }

        /* ---------- Name / city ---------- */

        .university-card__name {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--text-dark);
          margin: 0 0 0.3rem;
        }

        .university-card__city {
          font-size: 0.88rem;
          color: var(--text-light);
          margin: 0 0 1.4rem;
        }

        /* ---------- Fee / Intake stat boxes ---------- */

        .university-card__stats {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.4rem;
        }

        .university-card__stat {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding: 0.7rem 0.9rem;
          border-radius: var(--radius-md);
          background: var(--bg-light);
        }

        .university-card__stat-label {
          font-size: 0.72rem;
          color: var(--text-light);
        }

        .university-card__stat-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-dark);
          white-space: nowrap;
        }

        /* ---------- Tags ---------- */

        .university-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        .tag-pill {
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          white-space: nowrap;
        }

        .tag-pill--subject {
          background: var(--primary-light);
          color: var(--primary);
        }

        .tag-pill--language {
          background: color-mix(in srgb, var(--accent-green) 16%, var(--bg-main));
          color: var(--accent-green);
        }

        @media (max-width: 900px) {
          .university-section__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default UniversitySection;