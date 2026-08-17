import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Wallet,
  Languages,
  Stethoscope,
  ShieldCheck,
  FileCheck2,
} from "lucide-react";
import { whyMbbsAbroadPoints } from "../../Data/mbbsAbroadData";

const icons = {
  BadgeCheck,
  Wallet,
  Languages,
  Stethoscope,
  ShieldCheck,
  FileCheck2,
};

// Theme accent tokens matching your CSS variables
const accentColors = [
  "var(--accent-blue)",
  "var(--primary)",
  "var(--extra-purple)",
  "var(--accent-pink)",
  "var(--secondary)",
  "var(--accent-green)",
];

const WhyMbbsAbroad = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="why-mbbs">
      {/* Header Section */}
      <div className="why-mbbs__header">
        <span className="why-mbbs__eyebrow">Why Choose MBBS Abroad</span>
        <h2 className="why-mbbs__title">
          A world-class medical degree that fits{" "}
          <span className="highlight">your budget</span>
        </h2>
        <p className="why-mbbs__subtitle">
          Everything that matters to Indian parents — recognition, safety, and cost —
          rigorously checked before we shortlist a single university.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="why-mbbs__grid">
        {whyMbbsAbroadPoints.map((point, index) => {
          const Icon = icons[point.icon] || BadgeCheck;
          const accent = accentColors[index % accentColors.length];

          return (
            <motion.div
              key={point.title || index}
              className="why-mbbs__card-wrapper"
              initial={reduceMotion ? {} : { opacity: 0, y: 25 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="why-mbbs__card" style={{ "--card-accent": accent }}>
                {/* Top Accent Pill */}
                <div className="why-mbbs__card-top">
                  <div className="why-mbbs__icon-box">
                    <Icon size={24} />
                  </div>
                  <span className="why-mbbs__step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="why-mbbs__card-content">
                  <h3 className="why-mbbs__card-title">{point.title}</h3>
                  <p className="why-mbbs__card-desc">{point.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scoped CSS Styles */}
      <style>{`
        .why-mbbs {
          position: relative;
          padding: clamp(3.5rem, 7vw, 6rem) 1.5rem;
          background: var(--bg-main);
          max-width: 1240px;
          margin: 0 auto;
          font-family: var(--font-main);
        }

        /* ===== Header ===== */
        .why-mbbs__header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto clamp(2.5rem, 5vw, 4rem);
        }

        .why-mbbs__eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          background: var(--primary-light);
          padding: 6px 16px;
          border-radius: var(--radius-xl);
          margin-bottom: 1rem;
        }

        .why-mbbs__title {
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 700;
          color: var(--text-dark);
          margin: 0 0 1rem;
          line-height: 1.25;
        }

        .why-mbbs__title .highlight {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .why-mbbs__subtitle {
          color: var(--text-medium);
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.6;
          margin: 0;
        }

        /* ===== Grid Layout ===== */
        .why-mbbs__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .why-mbbs__card-wrapper {
          display: flex;
          height: 100%;
        }

        /* ===== Card Design ===== */
        .why-mbbs__card {
          position: relative;
          width: 100%;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-sm);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease;
          overflow: hidden;
        }

        .why-mbbs__card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-accent);
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }

        .why-mbbs__card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-md);
          border-color: rgba(109, 83, 163, 0.25);
        }

        /* Top Header inside Card */
        .why-mbbs__card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
        }

        .why-mbbs__icon-box {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          background: var(--bg-light);
          color: var(--card-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .why-mbbs__card:hover .why-mbbs__icon-box {
          background: var(--card-accent);
          color: var(--white);
        }

        .why-mbbs__step-number {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-light);
          opacity: 0.5;
        }

        /* Typography Inside Card */
        .why-mbbs__card-content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .why-mbbs__card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0 0 0.65rem;
          line-height: 1.35;
        }

        .why-mbbs__card-desc {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--text-medium);
          margin: 0;
        }

        /* ===== Responsive Breakpoints ===== */
        @media (max-width: 1024px) {
          .why-mbbs__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .why-mbbs__grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .why-mbbs__card {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyMbbsAbroad;