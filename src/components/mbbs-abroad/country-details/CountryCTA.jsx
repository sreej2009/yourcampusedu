import { PhoneCall, MessageCircle, Plane } from "lucide-react";

const CountryCTA = ({ country }) => {
  const routeCode = (country.code || country.name.slice(0, 2)).toUpperCase();

  return (
    <section className="country-cta" id="country-cta">
      <div className="country-cta__ticket">
        <div className="country-cta__notch country-cta__notch--left" aria-hidden="true" />
        <div className="country-cta__notch country-cta__notch--right" aria-hidden="true" />

        <div className="country-cta__stub">
          <span className="country-cta__route-code">IND</span>
          <span className="country-cta__route-line">
            <Plane size={14} className="country-cta__plane" />
          </span>
          <span className="country-cta__route-code">{routeCode}</span>
        </div>

        <div className="country-cta__tear" aria-hidden="true" />

        <div className="country-cta__body">
          <h2 className="country-cta__title">Ready to start your MBBS in {country.name}?</h2>
          <p className="country-cta__subtitle">
            Get a free eligibility check and a shortlist of universities matched to your NEET score.
          </p>
          <div className="country-cta__actions">
            <a href="tel:+911234567890" className="country-cta__btn country-cta__btn--primary">
              <PhoneCall size={17} /> Call now
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noreferrer"
              className="country-cta__btn country-cta__btn--ghost"
            >
              <MessageCircle size={17} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .country-cta {
          padding: 0 1.5rem clamp(3.5rem, 7vw, 5.5rem);
          display: flex;
          justify-content: center;
        }

        .country-cta__ticket {
          position: relative;
          width: 100%;
          max-width: 480px;
          border-radius: var(--radius-xl);
          background: var(--gradient-primary);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .country-cta__notch {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-main);
          z-index: 2;
        }

        .country-cta__notch--left {
          left: -14px;
        }

        .country-cta__notch--right {
          right: -14px;
        }

        /* ---------- Stub ---------- */
        .country-cta__stub {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          padding: 1.1rem 1.5rem 0.9rem;
        }

        .country-cta__route-code {
          font-family: var(--font-main);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: color-mix(in srgb, var(--text-white) 90%, transparent);
        }

        .country-cta__route-line {
          flex: 1;
          max-width: 120px;
          height: 1px;
          background: color-mix(in srgb, var(--text-white) 40%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .country-cta__plane {
          background: var(--gradient-primary);
          color: var(--text-white);
          padding: 0 0.4rem;
          transform: rotate(90deg);
        }

        .country-cta__tear {
          position: relative;
          height: 1px;
          margin: 0 1.75rem;
          background-image: linear-gradient(
            90deg,
            color-mix(in srgb, var(--text-white) 45%, transparent) 0 8px,
            transparent 8px 16px
          );
          background-size: 16px 1px;
          background-repeat: repeat-x;
        }

        /* ---------- Body ---------- */
        .country-cta__body {
          padding: 1.75rem 2rem clamp(2rem, 5vw, 2.5rem);
          text-align: center;
        }

        .country-cta__title {
          font-family: var(--font-main);
          font-size: clamp(1.3rem, 2.6vw, 1.6rem);
          font-weight: 700;
          line-height: 1.35;
          color: var(--text-white);
          margin: 0 0 0.65rem;
        }

        .country-cta__subtitle {
          font-size: 0.92rem;
          line-height: 1.6;
          color: color-mix(in srgb, var(--text-white) 85%, transparent);
          margin: 0 0 1.75rem;
        }

        .country-cta__actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .country-cta__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.85rem 1.5rem;
          border-radius: var(--radius-md);
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 0.92rem;
          text-decoration: none;
          transition: var(--transition);
        }

        .country-cta__btn--primary {
          background: var(--bg-main);
          color: var(--primary-dark);
        }

        .country-cta__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .country-cta__btn--ghost {
          background: color-mix(in srgb, var(--text-white) 12%, transparent);
          color: var(--text-white);
          border: 1px solid color-mix(in srgb, var(--text-white) 35%, transparent);
        }

        .country-cta__btn--ghost:hover {
          background: color-mix(in srgb, var(--text-white) 22%, transparent);
        }

        @media (min-width: 480px) {
          .country-cta__actions {
            flex-direction: row;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default CountryCTA;