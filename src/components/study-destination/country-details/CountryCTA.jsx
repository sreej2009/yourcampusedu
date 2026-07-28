import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, PhoneCall, Plane } from "lucide-react";

export default function CountryCTA({ countryName }) {
  return (
    <section className="country-cta">
      <div className="country-cta__route" aria-hidden="true">
        <span className="country-cta__dot" />
        <span className="country-cta__line" />
        <Plane size={18} strokeWidth={2} className="country-cta__plane" />
        <span className="country-cta__line" />
        <span className="country-cta__dot country-cta__dot--end" />
      </div>

      <motion.div
        className="country-cta__inner"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="country-cta__title">Ready to Study in {countryName}?</h2>
        <p className="country-cta__desc">
          Speak with our experts, explore universities, compare courses, and begin your admission
          journey today.
        </p>

        <div className="country-cta__actions">
          <Link to="/tools/eligibility-checker" className="country-cta__btn country-cta__btn--primary">
            <ClipboardCheck size={18} strokeWidth={2.2} />
            <span>Check Eligibility</span>
          </Link>
          <Link to="/contact" className="country-cta__btn country-cta__btn--ghost">
            <PhoneCall size={18} strokeWidth={2.2} />
            <span>Contact Counselor</span>
          </Link>
        </div>
      </motion.div>

      <style>{`
        .country-cta {
          position: relative;
          overflow: hidden;
          background: var(--gradient-secondary);
          border-radius: var(--radius-xl);
          margin: clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(3rem, 7vw, 5rem);
          padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 3rem);
        }

        .country-cta__route {
          position: absolute;
          top: 2.2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          width: min(420px, 70%);
          opacity: 0.55;
        }

        .country-cta__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-green);
          flex-shrink: 0;
        }

        .country-cta__dot--end {
          background: var(--secondary);
        }

        .country-cta__line {
          flex: 1;
          height: 1px;
          background: repeating-linear-gradient(
            90deg,
            color-mix(in srgb, var(--white) 55%, transparent) 0px,
            color-mix(in srgb, var(--white) 55%, transparent) 5px,
            transparent 5px,
            transparent 10px
          );
        }

        .country-cta__plane {
          color: var(--text-white);
          flex-shrink: 0;
          transform: rotate(90deg);
        }

        .country-cta__inner {
          position: relative;
          max-width: 620px;
          margin: 0 auto;
          text-align: center;
        }

        .country-cta__title {
          font-family: var(--font-main);
          font-weight: 700;
          font-size: clamp(1.7rem, 3.8vw, 2.6rem);
          color: var(--text-white);
          margin: 0 0 0.9rem;
          letter-spacing: -0.01em;
        }

        .country-cta__desc {
          font-family: var(--font-main);
          font-size: 1rem;
          line-height: 1.65;
          color: color-mix(in srgb, var(--text-white) 85%, transparent);
          margin: 0 0 2.2rem;
        }

        .country-cta__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .country-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          padding: 0.95rem 1.7rem;
          border-radius: var(--radius-md);
          transition: var(--transition);
        }

        .country-cta__btn--primary {
          background: var(--text-white);
          color: var(--primary-dark);
          box-shadow: var(--shadow-lg);
        }

        .country-cta__btn--primary:hover {
          transform: translateY(-2px);
        }

        .country-cta__btn--ghost {
          background: color-mix(in srgb, var(--white) 12%, transparent);
          color: var(--text-white);
          border: 1.5px solid color-mix(in srgb, var(--white) 40%, transparent);
        }

        .country-cta__btn--ghost:hover {
          background: color-mix(in srgb, var(--white) 20%, transparent);
        }

        @media (max-width: 560px) {
          .country-cta__actions {
            flex-direction: column;
            width: 100%;
          }
          .country-cta__btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .country-cta * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}