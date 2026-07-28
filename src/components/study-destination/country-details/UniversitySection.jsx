import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Trophy, Wallet, ArrowRight, ArrowUpRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function UniversitySection({ universities, countryName, countryId }) {
  const list = universities || [];

  return (
    <section className="university-section" id="universities">
      <div className="university-section__inner">
        <motion.div
          className="university-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="university-section__eyebrow">SHORTLIST</span>
          <h2 className="university-section__title">Top Universities in {countryName}</h2>
          <p className="university-section__subtitle">
            A curated shortlist of highly ranked institutions actively admitting international
            students this intake.
          </p>
        </motion.div>

        {list.length === 0 ? (
          <div className="university-section__empty">
            University data for {countryName} is being added — check back shortly.
          </div>
        ) : (
          <motion.div
            className="university-section__grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {list.map((uni) => (
              <motion.div key={uni.slug} className="university-card" variants={card} whileHover={{ y: -6 }}>
                <div className="university-card__top">
                  <img src={uni.logo} alt={`${uni.name} logo`} className="university-card__logo" />
                  <span className="university-card__rank">
                    <Trophy size={13} strokeWidth={2.2} />
                    QS #{uni.qsRanking}
                  </span>
                </div>

                <h3 className="university-card__name">{uni.name}</h3>

                <div className="university-card__meta">
                  <span className="university-card__meta-item">
                    <MapPin size={14} strokeWidth={2} />
                    {uni.city}
                  </span>
                  <span className="university-card__meta-item">
                    <Wallet size={14} strokeWidth={2} />
                    {uni.tuition}
                  </span>
                </div>

                <Link to={`/study-destination/university/${uni.slug}`} className="university-card__btn">
                  <span>View University</span>
                  <ArrowRight size={16} strokeWidth={2.2} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="university-section__footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to={`/study-destination/universities?country=${countryId}`} className="university-section__viewall">
            <span>View All Universities</span>
            <ArrowUpRight size={17} strokeWidth={2.2} />
          </Link>
        </motion.div>
      </div>

      <style>{`
        .university-section {
          background: var(--bg-main);
          padding: clamp(3rem, 7vw, 5.5rem) clamp(1.25rem, 4vw, 2.5rem);
          scroll-margin-top: 90px;
        }

        .university-section__inner {
          max-width: 1180px;
          margin: 0 auto;
        }

        .university-section__header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto clamp(2.25rem, 5vw, 3.25rem);
        }

        .university-section__eyebrow {
          display: inline-block;
          font-family: var(--font-main);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--secondary);
          background: var(--secondary-light);
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          margin-bottom: 0.9rem;
        }

        .university-section__title {
          font-family: var(--font-main);
          font-weight: 700;
          font-size: clamp(1.7rem, 3.6vw, 2.5rem);
          color: var(--text-dark);
          margin: 0 0 0.7rem;
          letter-spacing: -0.01em;
        }

        .university-section__subtitle {
          font-family: var(--font-main);
          font-size: 1rem;
          line-height: 1.65;
          color: var(--text-medium);
          margin: 0;
        }

        .university-section__empty {
          text-align: center;
          font-family: var(--font-main);
          color: var(--text-light);
          background: var(--bg-light);
          border: 1px dashed var(--border);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
        }

        .university-section__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.4rem;
        }

        .university-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .university-card:hover {
          box-shadow: var(--shadow-md);
          border-color: color-mix(in srgb, var(--primary) 30%, var(--border));
        }

        .university-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .university-card__logo {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          box-shadow: var(--shadow-sm);
        }

        .university-card__rank {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-main);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--primary-dark);
          background: var(--primary-light);
          padding: 0.3rem 0.55rem;
          border-radius: 999px;
        }

        .university-card__name {
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.35;
          color: var(--text-dark);
          margin: 0 0 0.85rem;
          min-height: 2.7em;
        }

        .university-card__meta {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.3rem;
        }

        .university-card__meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-main);
          font-size: 0.84rem;
          color: var(--text-medium);
        }

        .university-card__meta-item svg {
          color: var(--primary);
          flex-shrink: 0;
        }

        .university-card__btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          color: var(--primary);
          border: 1.5px solid var(--primary);
          border-radius: var(--radius-md);
          padding: 0.65rem 1rem;
          transition: var(--transition);
        }

        .university-card__btn:hover {
          background: var(--primary);
          color: var(--text-white);
        }

        .university-section__footer {
          display: flex;
          justify-content: center;
          margin-top: clamp(2rem, 5vw, 3rem);
        }

        .university-section__viewall {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-white);
          text-decoration: none;
          background: var(--gradient-secondary);
          padding: 0.9rem 1.8rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          transition: var(--transition);
        }

        .university-section__viewall:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 1024px) {
          .university-section__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .university-section__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .university-section * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}