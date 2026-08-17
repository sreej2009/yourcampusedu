// src/components/mbbsAbroad/TopCountries.jsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { mbbsCountries } from "../../Data/mbbsAbroadData";

const TopCountries = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="top-countries" id="top-countries">
      <div className="top-countries__inner">
        <div className="top-countries__header">
          <span className="top-countries__eyebrow">Choose Your Destination</span>

          <h2 className="top-countries__title">
            <span className="top-countries__title-accent">Three countries.</span>{" "}
            One recognised path to MBBS.
          </h2>
        </div>

        <div className="top-countries__grid">
          {mbbsCountries.map((country, index) => (
            <motion.div
              key={country.slug}
              initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link to={`/mbbs-abroad/${country.slug}`} className="country-card" style={{ "--card-accent": country.accent }}>
                {/* Image Banner */}
                <div className="country-card__media">
                  <img src={country.image} alt={country.name} loading="lazy" />
                  <div className="country-card__media-scrim" />

                  <div className="country-card__stamp">
                    <span>{country.code}</span>
                  </div>

                  <div className="country-card__media-text">
                    <p className="country-card__eyebrow">{country.tagline}</p>
                    <h3 className="country-card__name">{country.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="country-card__body">
                  <div className="country-card__meta">
                    <div>
                      <span className="country-card__meta-label">Total Fees</span>
                      <span className="country-card__meta-value">{country.fees}</span>
                    </div>
                    <div>
                      <span className="country-card__meta-label">Duration</span>
                      <span className="country-card__meta-value">{country.duration}</span>
                    </div>
                  </div>

                  <ul className="country-card__highlights">
                    {country.highlights.map((point) => (
                      <li key={point}>
                        <Check size={14} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="country-card__cta">
                    Explore {country.name} <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .top-countries {
          background: var(--primary-light);
          font-family: var(--font-main);
          padding: clamp(3.5rem, 7vw, 5.5rem) 1.5rem;
        }

        .top-countries__inner {
          max-width: 1180px;
          margin: 0 auto;
        }

        .top-countries__header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto clamp(2.5rem, 5vw, 3.5rem);
        }

        .top-countries__eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 0.9rem;
        }

        .top-countries__title {
          font-size: clamp(1.9rem, 3.8vw, 2.75rem);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.02em;
          color: var(--primary-dark);
          margin: 0;
        }

        .top-countries__title-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .top-countries__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        /* ===== Card ===== */
        .country-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-radius: var(--radius-lg);
          background: var(--white);
          border: 1px solid var(--border);
          text-decoration: none;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .country-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-8px);
          border-color: color-mix(in srgb, var(--card-accent) 35%, var(--border));
        }

        /* ---- Image banner ---- */
        .country-card__media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--bg-light);
        }

        .country-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .country-card:hover .country-card__media img {
          transform: scale(1.08);
        }

        .country-card__media-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            color-mix(in srgb, var(--primary-dark) 88%, transparent) 0%,
            color-mix(in srgb, var(--primary-dark) 25%, transparent) 55%,
            transparent 100%
          );
        }

        .country-card__stamp {
          position: absolute;
          top: 1.1rem;
          right: 1.1rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--white) 88%, transparent);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .country-card__stamp span {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--card-accent);
        }

        .country-card__media-text {
          position: absolute;
          left: 1.5rem;
          right: 1.5rem;
          bottom: 1.1rem;
        }

        .country-card__eyebrow {
          font-size: 0.8rem;
          font-weight: 600;
          color: color-mix(in srgb, var(--white) 85%, transparent);
          margin: 0 0 0.25rem;
        }

        .country-card__name {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
        }

        /* ---- Body ---- */
        .country-card__body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 1.5rem 1.75rem 1.75rem;
        }

        .country-card__meta {
          display: flex;
          gap: 1.75rem;
          padding-bottom: 1.1rem;
          margin-bottom: 1.1rem;
          border-bottom: 1px solid var(--border);
        }

        .country-card__meta > div {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .country-card__meta-label {
          font-size: 0.72rem;
          color: var(--text-light);
        }

        .country-card__meta-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .country-card__highlights {
          list-style: none;
          margin: 0 0 1.5rem;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          flex-grow: 1;
        }

        .country-card__highlights li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.86rem;
          color: var(--text-medium);
        }

        .country-card__highlights svg {
          flex-shrink: 0;
          margin-top: 0.15rem;
          color: var(--card-accent);
        }

        .country-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--card-accent);
        }

        @media (max-width: 900px) {
          .top-countries__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default TopCountries;