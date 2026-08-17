import React from "react";
import { GraduationCap, ArrowRight } from "lucide-react";
import heroBg from "../../assets/images/mbbsabroad_hero.png";

function MbbsHero() {
  return (
    <section className="mh-root">

      {/* Background image + overlay wash (matches AIToolsHero) */}
      <div className="mh-photo" style={{ backgroundImage: `url(${heroBg})` }} role="presentation" />
      <div className="mh-wash" />

      <div className="mh-shell">

        {/* ── Left Content ── */}
        <div className="mh-left">
          <div className="mh-badge">
            <GraduationCap size={14} className="mh-badge-icon" />
            <span>MBBS Abroad Programme</span>
          </div>

          <h1 className="mh-headline">
            MBBS Abroad,
            <span className="mh-hl-accent">Without Donation</span>
          </h1>

          <p className="mh-sub">
            Direct admission to NMC-approved universities in Georgia,
            Uzbekistan and Tajikistan — on your NEET score alone.
          </p>

          <div className="mh-actions">
            <a href="#top-countries" className="mh-btn-primary">
              <span>Explore Countries</span>
              <ArrowRight size={18} className="mh-btn-arrow" />
            </a>
            <a href="#mbbs-cta" className="mh-btn-secondary">
              <span>Talk to a Counsellor</span>
            </a>
          </div>

          <div className="mh-stats">
            <div className="mh-stat">
              <h3>8+</h3>
              <p>Partner Universities</p>
            </div>
            <div className="mh-stat">
              <h3>100%</h3>
              <p>NMC Approved</p>
            </div>
            <div className="mh-stat">
              <h3>1200+</h3>
              <p>Students Placed</p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .mh-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 96px 24px 90px;
          overflow: hidden;
          background: var(--bg-section);
          font-family: var(--font-main);
          color: var(--text-dark);
          box-sizing: border-box;
          isolation: isolate;
        }

        .mh-photo {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 1;
          z-index: 0;
        }

        .mh-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              135deg,
              rgba(248,245,255,0.65) 0%,
              rgba(243,238,255,0.55) 50%,
              rgba(255,255,255,0.45) 100%
            );
          z-index: 1;
        }

        .mh-shell {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
        }

        /* ── Left column ── */
        .mh-left {
          display: flex;
          flex-direction: column;
          animation: mhFadeUp 0.7s ease both;
        }

        .mh-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          padding: 8px 18px;
          margin-bottom: 16px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary-dark);
        }
        .mh-badge-icon { color: var(--secondary); }

        .mh-headline {
          margin: 0 0 20px;
          font-size: clamp(2.1rem, 4vw, 3.4rem);
          line-height: 1.18;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--primary-dark);
          display: flex;
          flex-direction: column;
        }
        .mh-hl-accent {
          margin-top: 4px;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mh-sub {
          font-size: clamp(0.92rem, 1.3vw, 1.04rem);
          color: var(--text-medium);
          line-height: 1.75;
          max-width: 480px;
          margin: 0 0 32px;
          font-weight: 400;
        }

        .mh-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .mh-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--primary-dark);
          color: var(--white);
          padding: 16px 32px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.92rem;
          text-decoration: none;
          letter-spacing: 0.01em;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
        }
        .mh-btn-primary:hover {
          transform: translateY(-3px);
          background: var(--primary);
          box-shadow: var(--shadow-lg);
        }
        .mh-btn-arrow { transition: transform 0.25s ease; }
        .mh-btn-primary:hover .mh-btn-arrow { transform: translateX(3px); }

        .mh-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.7);
          color: var(--primary-dark);
          padding: 15px 28px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.92rem;
          text-decoration: none;
          letter-spacing: 0.01em;
          border: 1px solid var(--border);
          transition: var(--transition);
        }
        .mh-btn-secondary:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-3px);
        }

        .mh-stats {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 40px;
          margin-top: 56px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }
        .mh-stat h3 {
          margin: 0;
          font-size: 1.9rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--primary-dark);
        }
        .mh-stat p {
          margin: 4px 0 0;
          font-size: 0.85rem;
          color: var(--text-light);
        }

        @keyframes mhFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════ */

        @media (max-width: 980px) {
          .mh-root {
            padding: 80px 24px 72px;
            align-items: flex-start;
          }
          .mh-shell {
            grid-template-columns: 1fr;
          }

          .mh-sub { max-width: 100%; }
          .mh-stats { gap: 28px; margin-top: 44px; }
        }

        @media (max-width: 600px) {
          .mh-root { padding: 64px 18px 60px; }

          .mh-badge { font-size: 0.68rem; padding: 7px 14px; }

          .mh-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .mh-btn-primary,
          .mh-btn-secondary {
            justify-content: center;
            padding: 15px 24px;
          }

          .mh-stats {
            gap: 16px;
            margin-top: 36px;
            padding-top: 24px;
          }
          .mh-stat h3 { font-size: 1.55rem; }
          .mh-stat p  { font-size: 0.78rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mh-left {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default MbbsHero;