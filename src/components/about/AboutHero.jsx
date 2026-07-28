import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Users, GraduationCap, Globe2, Clock } from "lucide-react";
import aboutHeroImg from "../../assets/images/about_hero.png";

const journey = [
  { year: "2015", milestone: "Founded in Coimbatore" },
  { year: "2018", milestone: "50+ University Partners" },
  { year: "2021", milestone: "Launched Study India Desk" },
  { year: "2024", milestone: "5,000+ Students Guided" },
];

const stats = [
  { label: "Students Guided", value: "5,000+", icon: Users },
  { label: "Universities", value: "250+", icon: GraduationCap },
  { label: "Countries", value: "15+", icon: Globe2 },
  { label: "Years Experience", value: "10+", icon: Clock },
];

export default function AboutHero() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const btnRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % journey.length);
    }, 3400);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const current = journey[index];

  const handleMagnetMove = (e) => {
    if (prefersReducedMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  };
  const handleMagnetLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "translate(0, 0)";
  };

  return (
    <section className="abt-hero">
      <img
        src={aboutHeroImg}
        alt=""
        loading="eager"
        fetchpriority="high"
        className="abt-hero__bg"
      />
      <div className="abt-hero__overlay" />
      <div className="abt-hero__scrim" />

      <div className="abt-hero__inner">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="abt-hero__crumbs"
        >
          <a href="/" className="abt-hero__crumb-link">Home</a>
          <span className="abt-hero__crumb-sep">/</span>
          <span className="abt-hero__crumb-current">About Us</span>
        </motion.nav>

        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="abt-hero__badge"
        >
          <Award size={14} className="abt-hero__badge-icon" />
          About Your Campus Edu
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="abt-hero__title"
        >
          A Decade of <span className="abt-hero__title-accent">Shaping Global Leaders</span>
        </motion.h1>

        <div className="abt-hero__rule" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="abt-hero__subtext"
        >
          We help ambitious students discover the right universities, courses,
          scholarships, and global opportunities through expert guidance and
          personalized support at every step of their journey — at home or abroad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="abt-hero__cta-row"
        >
          <button
            ref={btnRef}
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            className="abt-hero__btn abt-hero__btn--primary"
          >
            Meet Our Team
            <ArrowRight size={16} className="abt-hero__btn-arrow" />
          </button>
          <button className="abt-hero__btn abt-hero__btn--ghost">
            Our Journey
          </button>
        </motion.div>

        {/* slim single-line rotating timeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="abt-hero__ticker"
        >
          <span className="abt-hero__ticker-dot" />
          <span className="abt-hero__ticker-label">Our Journey</span>
          <span className="abt-hero__ticker-divider" />
          <AnimatePresence mode="wait">
            <motion.span
              key={current.year + current.milestone}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="abt-hero__ticker-text"
            >
              <b>{current.year}</b> — {current.milestone}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="abt-hero__stats"
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="abt-hero__stat">
              <Icon size={17} className="abt-hero__stat-icon" />
              <div className="abt-hero__stat-text">
                <span className="abt-hero__stat-value">{value}</span>
                <span className="abt-hero__stat-label">{label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .abt-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
          padding: 7rem 1.5rem;
          font-family: var(--font-main);
        }

        .abt-hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* image stays clearly visible — the medium wash below carries contrast */
          filter: brightness(0.92) saturate(0.95);
        }

        /* medium, fully opaque purple wash from your theme — no transparency,
           no near-black darkening, just a solid mid-tone tint over the photo */
        .abt-hero__overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--primary) 75%, transparent) 0%,
    color-mix(in srgb, var(--primary) 65%, transparent) 45%,
    color-mix(in srgb, var(--primary-dark) 45%, transparent) 100%
  );

  mix-blend-mode: normal;
}

        /* centered scrim so the text block sits on a slightly deeper, calm
           patch of the same medium tone, regardless of what's behind it */
        .abt-hero__scrim {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            62% 56% at 50% 46%,
            color-mix(in srgb, var(--primary-dark) 42%, var(--primary) 58%) 0%,
            transparent 100%
          );
          mix-blend-mode: multiply;
          opacity: 0.75;
        }

        .abt-hero__inner {
          position: relative;
          z-index: 1;
          margin: 0 auto;
          width: 100%;
          max-width: 46rem;
          text-align: center;
        }

        .abt-hero__crumbs {
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .abt-hero__crumb-link {
          color: var(--text-white);
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
        }
        .abt-hero__crumb-sep {
          color: color-mix(in srgb, var(--text-white) 60%, var(--primary-dark));
          font-size: 0.8rem;
        }
        .abt-hero__crumb-current {
          color: color-mix(in srgb, var(--text-white) 82%, var(--primary-dark));
          font-size: 0.8rem;
        }

        .abt-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          background: var(--primary-light);
          border-left: 3px solid var(--secondary);
          color: var(--primary-dark);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: var(--shadow-sm);
        }
        .abt-hero__badge-icon {
          color: var(--secondary);
        }

        .abt-hero__title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--text-white);
        }
        .abt-hero__title-accent {
          background-image: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .abt-hero__rule {
          width: 64px;
          height: 3px;
          margin: 1.75rem auto 0;
          background: var(--gradient-primary);
        }

        .abt-hero__subtext {
          margin: 1.5rem auto 0;
          max-width: 34rem;
          color: color-mix(in srgb, var(--text-white) 92%, var(--primary-dark));
          font-size: 1rem;
          line-height: 1.8;
        }

        .abt-hero__cta-row {
          margin-top: 2.25rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .abt-hero__btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 1.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-weight: 600;
          font-family: var(--font-main);
          border: none;
          cursor: pointer;
          transition: var(--transition);
        }
        .abt-hero__btn--primary {
          background: var(--gradient-primary);
          color: var(--text-white);
          box-shadow: var(--shadow-md);
          transition: transform 0.15s ease-out;
        }
        .abt-hero__btn-arrow {
          transition: transform 0.25s ease;
        }
        .abt-hero__btn--primary:hover .abt-hero__btn-arrow {
          transform: translateX(3px);
        }
        .abt-hero__btn--ghost {
          background: var(--bg-main);
          border: 1px solid var(--border);
          color: var(--primary-dark);
        }
        .abt-hero__btn--ghost:hover {
          background: var(--primary-light);
        }

        .abt-hero__ticker {
          margin: 2.5rem auto 0;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-sm);
          background: var(--gradient-secondary);
          border: 1px solid color-mix(in srgb, var(--accent-green) 30%, transparent);
          max-width: 100%;
          box-shadow: var(--shadow-md);
        }
        .abt-hero__ticker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-green);
          flex-shrink: 0;
          animation: abt-pulse 1.6s ease-in-out infinite;
        }
        @keyframes abt-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .abt-hero__ticker-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--text-white) 55%, transparent);
          flex-shrink: 0;
        }
        .abt-hero__ticker-divider {
          width: 1px;
          height: 14px;
          background: color-mix(in srgb, var(--text-white) 18%, transparent);
          flex-shrink: 0;
        }
        .abt-hero__ticker-text {
          font-size: 0.85rem;
          color: var(--text-white);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .abt-hero__ticker-text b {
          color: var(--accent-green);
        }

        .abt-hero__stats {
          margin: 2.5rem auto 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem 1rem;
          max-width: 40rem;
          padding: 1.25rem 1rem;
          border-radius: var(--radius-md);
          background: var(--bg-main);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
        }
        @media (min-width: 640px) {
          .abt-hero__stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .abt-hero__stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          border-top: 2px solid transparent;
          transition: var(--transition);
        }
        .abt-hero__stat:hover {
          border-top-color: var(--accent-green);
          background: var(--primary-light);
        }
        .abt-hero__stat-icon {
          color: var(--secondary);
          flex-shrink: 0;
        }
        .abt-hero__stat-text {
          text-align: left;
        }
        .abt-hero__stat-value {
          display: block;
          color: var(--primary-dark);
          font-size: 1.2rem;
          font-weight: 700;
        }
        .abt-hero__stat-label {
          display: block;
          color: var(--text-medium);
          font-size: 0.7rem;
          font-weight: 500;
        }

        @media (prefers-reduced-motion: reduce) {
          .abt-hero__ticker-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}