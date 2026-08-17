import { useEffect, useRef } from "react";
import { PhoneCall, ShieldCheck, Wallet, Clock3, Languages, CalendarRange } from "lucide-react";

const CountryHero = ({ country }) => {
  const sectionRef = useRef(null);

  const statChips = [
    { icon: Wallet, label: "Total Fees", value: country.stats.fees },
    { icon: Clock3, label: "Duration", value: country.stats.duration },
    { icon: Languages, label: "Medium", value: country.stats.medium },
    { icon: CalendarRange, label: "Intake", value: country.stats.intake },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty("--country-accent", country.accent);
    }
  }, [country.accent]);

  return (
    <section ref={sectionRef} className="ctry-hero" style={{ "--country-accent": country.accent }}>
      <div className="ctry-hero__media">
        <div
          className="ctry-hero__bg"
          style={{
            backgroundImage: country.image
              ? `url(${country.image})`
              : "linear-gradient(135deg, var(--country-accent), var(--primary-dark))",
          }}
        />
        <div className="ctry-hero__wash" />
        <div className="ctry-hero__spot" />
      </div>

      <div className="ctry-hero__inner">
        <h1 className="ctry-hero__headline">{country.tagline}</h1>
        <span className="ctry-hero__underline" aria-hidden="true" />

        <div className="ctry-hero__cta-row">
          <a href="#country-cta" className="cta-primary">
            <PhoneCall size={17} />
            <span>Get Free Counselling</span>
          </a>
          <a href="tel:+910000000000" className="cta-secondary">
            <PhoneCall size={15} />
            <span>Call us now</span>
          </a>
        </div>

        {/* Signature: unified frosted console — accreditation badge + live stats */}
        <div className="ctry-console">
          <div className="ctry-console__badge">
            <div className="ctry-console__badge-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="ctry-console__badge-text">
              <span className="ctry-console__badge-label">Verified</span>
              <span className="ctry-console__badge-name">
                <span className="ctry-console__badge-code">{country.code}</span>
                NMC &amp; WHO Approved
              </span>
            </div>
          </div>

          <div className="ctry-console__stats">
            {statChips.map(({ icon: Icon, label, value }) => (
              <div className="ctry-console__stat" key={label}>
                <Icon size={15} className="ctry-console__stat-icon" />
                <div className="ctry-console__value">{value}</div>
                <div className="ctry-console__statlabel">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ctry-hero {
          position: relative;
          font-family: var(--font-main);
          color: var(--text-dark);
          padding: 110px 24px 96px;
          overflow: visible;
          background: var(--bg-section);
          isolation: isolate;
        }

        .ctry-hero__media {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 0 0 var(--radius-xl) var(--radius-xl);
        }

        .ctry-hero__bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: grayscale(6%) brightness(0.98);
          transform: scale(1.02);
        }

        .ctry-hero__wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 900px 580px at 50% 38%,
              color-mix(in srgb, var(--white) 90%, transparent) 0%,
              color-mix(in srgb, var(--white) 74%, transparent) 38%,
              color-mix(in srgb, var(--bg-section) 55%, transparent) 62%,
              color-mix(in srgb, var(--bg-section) 30%, transparent) 100%
            ),
            linear-gradient(180deg,
              color-mix(in srgb, var(--bg-section) 35%, transparent) 0%,
              transparent 22%,
              transparent 70%,
              color-mix(in srgb, var(--bg-section) 45%, transparent) 100%
            );
        }

        .ctry-hero__spot {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 88% 6%,
            color-mix(in srgb, var(--country-accent) 20%, transparent) 0%,
            transparent 45%
          );
        }

        .ctry-hero__inner {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .ctry-hero__headline {
          font-size: clamp(32px, 4.6vw, 54px);
          font-weight: 800;
          line-height: 1.16;
          letter-spacing: -0.01em;
          color: var(--primary-dark);
          margin: 0 0 18px;
          text-shadow: 0 2px 24px color-mix(in srgb, var(--white) 70%, transparent);
          animation: ctryFadeUp 0.7s ease both;
        }

        .ctry-hero__underline {
          display: block;
          width: 64px;
          height: 4px;
          border-radius: 100px;
          background: var(--gradient-primary);
          margin-bottom: 34px;
          animation: ctryFadeUp 0.7s ease 0.05s both;
        }

        .ctry-hero__cta-row {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          animation: ctryFadeUp 0.7s ease 0.12s both;
        }

        .cta-primary, .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.92rem;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: var(--transition);
        }

        .cta-primary {
          background: var(--primary-dark);
          color: var(--white);
          box-shadow: var(--shadow-md);
        }
        .cta-primary:hover {
          background: var(--primary);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }

        .cta-secondary {
          background: color-mix(in srgb, var(--white) 88%, transparent);
          border: 1px solid color-mix(in srgb, var(--country-accent) 20%, var(--border));
          color: var(--primary-dark);
          backdrop-filter: blur(8px);
        }
        .cta-secondary:hover {
          border-color: var(--country-accent);
          color: var(--country-accent);
          transform: translateY(-3px);
        }

        /* ===== Signature console: accreditation badge + stat row ===== */
        .ctry-console {
          position: relative;
          width: 100%;
          max-width: 700px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 22px;
          background: color-mix(in srgb, var(--white) 94%, transparent);
          border: 1px solid color-mix(in srgb, var(--white) 96%, transparent);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: var(--radius-xl);
          box-shadow:
            0 20px 60px color-mix(in srgb, var(--primary-dark) 18%, transparent),
            0 8px 24px color-mix(in srgb, var(--primary-dark) 8%, transparent);
          padding: 24px 28px;
          animation: ctryFadeUp 0.7s ease 0.2s both;
        }

        .ctry-console::before {
          content: "";
          position: absolute;
          top: 0;
          left: 24px;
          right: 24px;
          height: 3px;
          border-radius: 0 0 4px 4px;
          background: var(--gradient-primary);
        }

        .ctry-console__badge {
          display: flex;
          align-items: center;
          gap: 13px;
          flex: 0 0 auto;
          min-width: 0;
          max-width: 220px;
          padding-right: 20px;
          border-right: 1px solid var(--border);
          box-sizing: border-box;
        }

        .ctry-console__badge-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: color-mix(in srgb, var(--accent-green) 16%, transparent);
          color: var(--accent-green);
        }

        .ctry-console__badge-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
          min-width: 0;
        }

        .ctry-console__badge-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--accent-green);
        }

        .ctry-console__badge-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-medium);
          line-height: 1.4;
        }

        .ctry-console__badge-code {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: var(--primary);
          background: var(--primary-light);
          border-radius: var(--radius-sm);
          padding: 2px 6px;
          margin-right: 6px;
          line-height: 1;
        }

        .ctry-console__stats {
          display: flex;
          flex: 1 1 0%;
          min-width: 0;
        }

        .ctry-console__stat {
          flex: 1 1 0%;
          min-width: 0;
          text-align: center;
          padding: 0 8px;
          box-sizing: border-box;
        }

        .ctry-console__stat:not(:first-child) {
          border-left: 1px solid var(--border);
        }

        .ctry-console__stat-icon {
          color: var(--country-accent);
          margin-bottom: 6px;
        }

        .ctry-console__value {
          font-size: 19px;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
        }

        .ctry-console__statlabel {
          font-size: 10.5px;
          font-weight: 500;
          color: var(--text-light);
          margin-top: 3px;
          line-height: 1.3;
          overflow-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
        }

        @keyframes ctryFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .ctry-hero { padding: 84px 18px 70px; }

          .ctry-console {
            flex-direction: column;
            gap: 18px;
            padding: 22px 20px;
          }

          .ctry-console__badge {
            width: 100%;
            max-width: none;
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding-right: 0;
            padding-bottom: 16px;
            justify-content: center;
            text-align: center;
          }
          .ctry-console__badge-text { text-align: center; }

          .ctry-console__stats { width: 100%; flex-wrap: wrap; }
          .ctry-console__stat { flex: 1 1 40%; margin-bottom: 12px; }
          .ctry-console__stat:nth-child(odd) { border-left: none; }

          .cta-primary, .cta-secondary { justify-content: center; width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ctry-hero__headline, .ctry-hero__underline, .ctry-hero__cta-row, .ctry-console {
            animation: none; opacity: 1; transform: none;
          }
          .cta-primary:hover, .cta-secondary:hover { transform: none; }
        }
      `}</style>
    </section>
  );
};

export default CountryHero;