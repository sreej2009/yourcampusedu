import { useRef } from "react";
import { motion } from "framer-motion";
import { PlaneTakeoff, ChevronDown } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function CountryHero({ country }) {
  const mediaRef = useRef(null);

  const handleExplore = () => {
    const target = document.getElementById("universities");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePointerMove = (e) => {
    const el = mediaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <section className="country-hero" onMouseMove={handlePointerMove}>
      <div className="country-hero__media" ref={mediaRef} aria-hidden="true">
        <motion.img
          src={country.heroImage}
          alt=""
          className="country-hero__img"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="country-hero__scrim" />
        <div className="country-hero__grain" />
        <div className="country-hero__spotlight" />
      </div>

      <motion.div
        className="country-hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="country-hero__eyebrow" variants={rise}>
          <span className="country-hero__flag">{country.flag}</span>
          <span className="country-hero__gate">{country.gate}</span>
          <span className="country-hero__dot" />
          <span>STUDY ABROAD</span>
        </motion.div>

        <motion.h1 className="country-hero__title" variants={rise}>
          Study in <span className="country-hero__title-accent">{country.name}</span>
        </motion.h1>

        <motion.p className="country-hero__desc" variants={rise}>
          {country.description}
        </motion.p>

        <motion.div className="country-hero__actions" variants={rise}>
          <motion.button
            type="button"
            className="country-hero__cta"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleExplore}
          >
            <span>Explore Universities</span>
            <PlaneTakeoff size={18} strokeWidth={2.2} />
          </motion.button>

          <button type="button" className="country-hero__cta-ghost" onClick={handleExplore}>
            View requirements
          </button>
        </motion.div>
      </motion.div>

      

      <style>{`
        .country-hero {
          position: relative;
          min-height: 640px;
          display: flex;   
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          border-radius: 0 0 var(--radius-xl) var(--radius-xl);
          isolation: isolate;
        }

        .country-hero__media {
          position: absolute;
          inset: 0;
          z-index: -1;
          --mx: 50%;
          --my: 40%;
        }

        .country-hero__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .country-hero__scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--primary-dark) 34%, transparent) 0%, color-mix(in srgb, var(--primary-dark) 54%, transparent) 55%, color-mix(in srgb, var(--primary-dark) 76%, transparent) 100%),
            linear-gradient(100deg, color-mix(in srgb, var(--primary-dark) 50%, transparent) 0%, transparent 62%);
        }

        .country-hero__grain {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--accent-green) 16%, transparent) 0%, transparent 42%),
            radial-gradient(circle at 88% 82%, color-mix(in srgb, var(--extra-purple) 20%, transparent) 0%, transparent 48%);
        }

        .country-hero__spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(420px circle at var(--mx) var(--my), color-mix(in srgb, var(--white) 14%, transparent) 0%, transparent 68%);
          transition: background-position 0.1s ease-out;
          pointer-events: none;
        }

        .country-hero__content {
          position: relative;
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          padding: clamp(4.5rem, 11vw, 7rem) clamp(1.25rem, 4vw, 2.5rem) clamp(4rem, 9vw, 5.5rem);
          color: var(--text-white);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .country-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-main);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: color-mix(in srgb, var(--text-white) 82%, transparent);
          background: color-mix(in srgb, var(--white) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--white) 24%, transparent);
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          margin-bottom: 1.6rem;
        }

        .country-hero__flag {
          font-size: 1.1rem;
          line-height: 1;
        }

        .country-hero__gate {
          color: var(--accent-green);
          font-weight: 700;
        }

        .country-hero__dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--white) 50%, transparent);
        }

        .country-hero__title {
          font-family: var(--font-main);
          font-weight: 700;
          font-size: clamp(2.4rem, 6vw, 4.25rem);
          line-height: 1.08;
          margin: 0 0 1.2rem;
          letter-spacing: -0.02em;
        }

        .country-hero__title-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .country-hero__desc {
          font-family: var(--font-main);
          font-size: clamp(0.98rem, 1.5vw, 1.12rem);
          line-height: 1.7;
          color: color-mix(in srgb, var(--text-white) 88%, transparent);
          max-width: 560px;
          margin: 0 0 2.4rem;
        }

        .country-hero__actions {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .country-hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-white);
          background: var(--gradient-primary);
          border: none;
          padding: 1rem 1.85rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          transition: var(--transition);
        }

        .country-hero__cta:hover {
          box-shadow: 0 18px 40px color-mix(in srgb, var(--primary) 45%, transparent);
        }

        .country-hero__cta-ghost {
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 0.92rem;
          color: var(--text-white);
          background: transparent;
          border: none;
          border-bottom: 1px solid color-mix(in srgb, var(--white) 45%, transparent);
          padding: 0.3rem 0;
          cursor: pointer;
          transition: var(--transition);
        }

        .country-hero__cta-ghost:hover {
          border-color: var(--accent-green);
          color: var(--accent-green);
        }

        .country-hero__scroll {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: color-mix(in srgb, var(--text-white) 70%, transparent);
        }

        @media (max-width: 560px) {
          .country-hero {
            min-height: 560px;
          }
          .country-hero__actions {
            flex-direction: column;
            align-items: stretch;
          }
          .country-hero__cta {
            justify-content: center;
          }
          .country-hero__cta-ghost {
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .country-hero * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}