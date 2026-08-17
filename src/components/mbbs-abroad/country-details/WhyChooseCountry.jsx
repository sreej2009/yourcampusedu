import React, { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Monitor, Rocket, BarChart3, Search } from "lucide-react";

// Two-stop gradients built from theme.css accent tokens — one per card
const ACCENT_PALETTE = [
  { from: "var(--accent-green)", to: "var(--extra-indigo)" },
  { from: "var(--extra-orange)", to: "var(--secondary)" },
  { from: "var(--extra-indigo)", to: "var(--extra-purple)" },
  { from: "var(--accent-pink)", to: "var(--extra-purple)" },
];

const DEFAULT_ICONS = [Monitor, Rocket, BarChart3, Search];

const padNumber = (n) => String(n + 1).padStart(2, "0");

const WhyChooseCountry = ({ country }) => {
  const reduceMotion = useReducedMotion();
  const points = country?.whyChoose || [];
  const countryName = country?.name || "It";

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <section className="why-choose-country">
      {/* Background layers */}
      <div className="why-choose-country__bg" aria-hidden="true">
        <div className="why-choose-country__bg-wash" />
        <div className="why-choose-country__bg-grid" />
        <div className="why-choose-country__orb why-choose-country__orb--a" />
        <div className="why-choose-country__orb why-choose-country__orb--b" />
        <div className="why-choose-country__orb why-choose-country__orb--c" />
      </div>

      <div className="why-choose-country__inner">
        {/* Header */}
        <motion.div
          className="why-choose-country__header"
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="why-choose-country__eyebrow">
            <span className="why-choose-country__eyebrow-dot" />
            Why {countryName}
          </span>
          <h2 className="why-choose-country__title">
            What makes{" "}
            <span className="why-choose-country__title-gradient">
              {countryName}
            </span>{" "}
            worth the flight
          </h2>
          <p className="why-choose-country__subtitle">
            Four reasons students choose {countryName} — and keep choosing it.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="why-choose-grid">
          {points.map((point, index) => {
            const accent = ACCENT_PALETTE[index % ACCENT_PALETTE.length];
            const Icon = point.icon || DEFAULT_ICONS[index % DEFAULT_ICONS.length];

            return (
              <motion.div
                key={index}
                className="why-choose-card"
                style={{
                  "--card-from": accent.from,
                  "--card-to": accent.to,
                }}
                onMouseMove={handleMouseMove}
                initial={reduceMotion ? {} : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span className="why-choose-card__ghost-number" aria-hidden="true">
                  {padNumber(index)}
                </span>
                <div className="why-choose-card__spotlight" aria-hidden="true" />
                <div className="why-choose-card__top-bar" />

                <div className="why-choose-card__body">
                  <div className="why-choose-card__icon">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3 className="why-choose-card__title">
                    {point.title || "Lorem Ipsum"}
                  </h3>
                  <p className="why-choose-card__desc">
                    {point.description ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu nullam venenatis gravida zorci."}
                  </p>
                </div>

                <div className="why-choose-card__index-tag">
                  <span>{padNumber(index)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Closer Banner */}
        <motion.div
          className="why-choose-country__closer"
          initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="why-choose-country__closer-text">
            <p>
              Every application starts with a plan — see how{" "}
              <strong>{countryName}</strong> fits yours.
            </p>
          </div>
          <span className="why-choose-country__closer-arrow" aria-hidden="true">
            &rarr;
          </span>
        </motion.div>
      </div>

      <style>{`
        .why-choose-country {
          position: relative;
          overflow: hidden;
          background: var(--bg-main);
          padding: clamp(4rem, 7vw, 6.5rem) 1.5rem;
          font-family: var(--font-main);
        }

        /* ============ Background layers ============ */
        .why-choose-country__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .why-choose-country__bg-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(60% 50% at 15% 0%, var(--primary-light) 0%, transparent 65%),
            radial-gradient(55% 45% at 100% 100%, color-mix(in srgb, var(--accent-blue) 14%, transparent) 0%, transparent 70%),
            linear-gradient(180deg, var(--bg-main) 0%, var(--bg-section) 55%, var(--bg-main) 100%);
        }

        .why-choose-country__bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(color-mix(in srgb, var(--primary) 22%, transparent) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%);
          opacity: 0.5;
        }

        .why-choose-country__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
        }

        .why-choose-country__orb--a {
          width: 320px;
          height: 320px;
          top: -80px;
          left: -60px;
          background: var(--accent-green);
        }

        .why-choose-country__orb--b {
          width: 260px;
          height: 260px;
          bottom: -60px;
          right: -40px;
          background: var(--extra-purple);
        }

        .why-choose-country__orb--c {
          width: 200px;
          height: 200px;
          top: 40%;
          right: 12%;
          background: var(--accent-pink);
          opacity: 0.2;
        }

        /* ============ Inner ============ */
        .why-choose-country__inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header */
        .why-choose-country__header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto clamp(3rem, 5.5vw, 4.5rem);
        }

        .why-choose-country__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: clamp(0.75rem, 1.3vw, 0.85rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary-dark);
          background: color-mix(in srgb, var(--primary-light) 80%, var(--bg-main));
          border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1rem;
        }

        .why-choose-country__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gradient-primary);
        }

        .why-choose-country__title {
          font-size: clamp(2rem, 3.6vw, 2.75rem);
          font-weight: 700;
          color: var(--primary-dark);
          line-height: 1.25;
          margin: 0 0 0.75rem 0;
        }

        .why-choose-country__title-gradient {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .why-choose-country__subtitle {
          font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          color: var(--text-medium);
          margin: 0;
        }

        /* ============ Grid ============ */
        .why-choose-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
          margin-bottom: clamp(2.75rem, 5vw, 4rem);
        }

        /* ============ Card ============ */
        .why-choose-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border-radius: var(--radius-lg);
          background: color-mix(in srgb, var(--bg-main) 88%, transparent);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
          box-shadow: var(--shadow-sm);
          padding: 1.9rem 1.5rem 1.75rem;
          transition: var(--transition);
          --mx: 50%;
          --my: 0%;
        }

        .why-choose-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: color-mix(in srgb, var(--card-from) 45%, var(--border));
        }

        .why-choose-card__top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--card-from), var(--card-to));
        }

        .why-choose-card__spotlight {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            220px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--card-from) 16%, transparent),
            transparent 70%
          );
        }

        .why-choose-card:hover .why-choose-card__spotlight {
          opacity: 1;
        }

        .why-choose-card__ghost-number {
          position: absolute;
          top: -0.4rem;
          right: 0.4rem;
          font-size: clamp(3.25rem, 5.5vw, 4.5rem);
          font-weight: 800;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px color-mix(in srgb, var(--card-from) 35%, transparent);
          z-index: 0;
          user-select: none;
        }

        .why-choose-card__body {
          position: relative;
          z-index: 1;
        }

        .why-choose-card__icon {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          background: linear-gradient(135deg, var(--card-from), var(--card-to));
          box-shadow: var(--shadow-md);
          margin-bottom: 1.1rem;
        }

        .why-choose-card__title {
          font-size: clamp(1rem, 1.4vw, 1.1rem);
          font-weight: 700;
          color: var(--text-dark);
          letter-spacing: 0.01em;
          margin: 0 0 0.55rem 0;
        }

        .why-choose-card__desc {
          font-size: clamp(0.85rem, 1.2vw, 0.92rem);
          line-height: 1.55;
          color: var(--text-medium);
          margin: 0;
        }

        .why-choose-card__index-tag {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          margin-top: 1.25rem;
          padding-top: 0.9rem;
          border-top: 1px dashed color-mix(in srgb, var(--border) 90%, transparent);
          width: 100%;
        }

        .why-choose-card__index-tag span {
          font-size: clamp(0.75rem, 1vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--card-from);
        }

        /* ============ Closer Banner ============ */
        .why-choose-country__closer {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.9rem;
          background: var(--gradient-secondary);
          padding: 1.3rem 2rem;
          border-radius: var(--radius-md);
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        .why-choose-country__closer-text p {
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          font-weight: 600;
          color: var(--text-white);
          margin: 0;
        }

        .why-choose-country__closer-text strong {
          color: var(--text-white);
        }

        .why-choose-country__closer-arrow {
          font-size: clamp(1.1rem, 1.8vw, 1.25rem);
          color: var(--text-white);
          font-weight: 700;
          transition: var(--transition);
        }

        .why-choose-country__closer:hover .why-choose-country__closer-arrow {
          transform: translateX(4px);
        }

        /* ============ Responsiveness ============ */
        @media (max-width: 1024px) {
          .why-choose-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 580px) {
          .why-choose-grid {
            grid-template-columns: 1fr;
          }

          .why-choose-country__closer {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseCountry;