import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  TrendingUp,
  Star,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";
import heroImg from "../../assets/images/hero.png";

/* ─────────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.72,
    delay,
    ease: [0.16, 1, 0.3, 1],
  },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.6,
    delay,
  },
});

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const BULLETS = [
  "AI-powered university matching in minutes",
  "Scholarships, visa & SOP guidance included",
  "Expert counsellors from top global institutions",
];

const TRUST_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100",
];

const DESTINATIONS = [
  {
    flag: "🇨🇦",
    name: "Canada",
    color: "rgba(255, 0, 0, 0.08)",
  },

  {
    flag: "🇬🇧",
    name: "United Kingdom",
    color: "rgba(0, 60, 255, 0.08)",
  },

  {
    flag: "🇦🇺",
    name: "Australia",
    color: "rgba(255, 170, 0, 0.08)",
  },

  {
    flag: "🇺🇸",
    name: "United States",
    color: "rgba(0, 80, 255, 0.08)",
  },

  {
    flag: "🇩🇪",
    name: "Germany",
    color: "rgba(255, 180, 0, 0.08)",
  },

  {
    flag: "🇮🇪",
    name: "Ireland",
    color: "rgba(49,185,120,0.10)",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function HeroSection() {
  return (
    <>
      <style>{`

        .hs {
          position: relative;
          overflow: hidden;
          padding: 86px 0 70px;

          background:
            radial-gradient(circle at top left, rgba(109,83,163,0.10), transparent 30%),
            radial-gradient(circle at bottom right, rgba(49,185,120,0.08), transparent 28%),
            linear-gradient(
              180deg,
              #faf8ff 0%,
              #f8f7ff 30%,
              #ffffff 100%
            );

          font-family: var(--font-main);
        }

        /* glow */

        .hs__glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hs__glow::before,
        .hs__glow::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
        }

        .hs__glow::before {
          width: 340px;
          height: 340px;
          top: -120px;
          left: -80px;
          background: rgba(109,83,163,0.13);
        }

        .hs__glow::after {
          width: 320px;
          height: 320px;
          bottom: -100px;
          right: -60px;
          background: rgba(49,185,120,0.11);
        }

        /* WRAP */

        .hs__wrap {
          position: relative;
          z-index: 2;

          width: 100%;
          max-width: 1280px;

          margin: 0 auto;
          padding: 0 42px;

          display: grid;
          grid-template-columns: 1.02fr 0.98fr;
          align-items: start;

          gap: 48px;
          box-sizing: border-box;
        }

        /* LEFT */

        .hs__left {
          max-width: 610px;
          padding-top: 12px;
        }

        /* TAG */

        .hs__tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          padding: 7px 16px 7px 8px;

          border-radius: 999px;

          background: rgba(109,83,163,0.08);

          border: 1px solid rgba(109,83,163,0.13);

          margin-bottom: 24px;

          backdrop-filter: blur(10px);
        }

        .hs__tag-icon {
          width: 26px;
          height: 26px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--gradient-primary);

          color: white;

          flex-shrink: 0;
        }

        .hs__tag-text {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;

          color: var(--primary);

          font-family: var(--font-main);
        }

        .hs__pulse {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: var(--accent-green);

          position: relative;

          flex-shrink: 0;
        }

        .hs__pulse::after {
          content: "";

          position: absolute;
          inset: -4px;

          border-radius: inherit;

          background: rgba(49,185,120,0.25);

          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }

          100% {
            transform: scale(2.3);
            opacity: 0;
          }
        }

        /* HEADING */

        .hs__title {
          margin: 0;

          font-size: clamp(38px, 4.8vw, 64px);
          line-height: 1.04;
          letter-spacing: -2.4px;
          font-weight: 800;

          color: var(--text-dark);

          font-family: var(--font-main);
        }

        .hs__accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* DESC */

        .hs__desc {
          margin-top: 24px;

          font-size: 15.5px;
          line-height: 1.9;

          color: var(--text-light);

          max-width: 540px;
        }

        .hs__desc strong {
          color: var(--text-dark);
          font-weight: 700;
        }

        /* BULLETS */

        .hs__bullets {
          display: flex;
          flex-direction: column;
          gap: 11px;

          margin-top: 24px;
        }

        .hs__bullet {
          display: flex;
          align-items: center;
          gap: 10px;

          font-size: 13.5px;
          font-weight: 500;

          color: var(--text-medium);
        }

        .hs__check {
          width: 20px;
          height: 20px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(49,185,120,0.10);

          color: var(--accent-green);

          flex-shrink: 0;
        }

        /* BUTTONS */

        .hs__actions {
          display: flex;
          align-items: center;
          gap: 14px;

          margin-top: 34px;

          flex-wrap: wrap;
        }

        .hs__btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          padding: 15px 28px;

          border-radius: 18px;

          text-decoration: none;

          font-size: 14px;
          font-weight: 700;

          color: white;

          background: var(--gradient-primary);

          box-shadow:
            0 14px 34px rgba(109,83,163,0.22),
            0 8px 18px rgba(109,83,163,0.16);

          position: relative;
          overflow: hidden;

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .hs__btn-primary:hover {
          transform: translateY(-4px);

          box-shadow:
            0 20px 44px rgba(109,83,163,0.28),
            0 12px 24px rgba(49,185,120,0.18);
        }

        .hs__arrow {
          width: 30px;
          height: 30px;

          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(255,255,255,0.14);

          transition: transform 0.28s ease;
        }

        .hs__btn-primary:hover .hs__arrow {
          transform: translateX(4px);
        }

        /* SECONDARY BUTTON */

        .hs__btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 15px 26px;

          border-radius: 18px;

          text-decoration: none;

          font-size: 14px;
          font-weight: 700;

          color: white;

          background: #151515;

          border: 1px solid rgba(255,255,255,0.06);

          box-shadow:
            0 12px 30px rgba(0,0,0,0.16);

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .hs__btn-secondary:hover {
          transform: translateY(-4px);

          background: var(--gradient-primary);

          box-shadow:
            0 18px 40px rgba(109,83,163,0.24),
            0 10px 22px rgba(49,185,120,0.16);
        }

        /* TRUST */

        .hs__trust {
          display: flex;
          align-items: center;
          gap: 16px;

          margin-top: 34px;

          flex-wrap: wrap;
        }

        .hs__avatars {
          display: flex;
          align-items: center;
        }

        .hs__avatar {
          width: 38px;
          height: 38px;

          border-radius: 50%;

          overflow: hidden;

          border: 2px solid white;

          margin-left: -10px;

          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        }

        .hs__avatar:first-child {
          margin-left: 0;
        }

        .hs__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hs__trust-count {
          font-size: 13px;
          font-weight: 800;

          color: var(--text-dark);
        }

        .hs__trust-sub {
          font-size: 11px;

          color: var(--text-light);

          margin-top: 2px;
        }

        .hs__sep {
          width: 1px;
          height: 28px;

          background: var(--border);
        }

        .hs__stars {
          display: flex;
          align-items: center;
          gap: 2px;

          color: #ffb545;
        }

        .hs__stars-val {
          margin-left: 6px;

          font-size: 12.5px;
          font-weight: 800;

          color: var(--text-dark);
        }

        .hs__stars-meta {
          font-size: 11px;
          color: var(--text-light);

          margin-top: 2px;
        }

        /* RIGHT */

        .hs__right {
          position: relative;
          margin-top: -6px;
        }

        .hs__img-frame {
          position: relative;

          overflow: hidden;

          border-radius: 34px;

          aspect-ratio: 16 / 11;

          background: white;

          border: 1px solid rgba(109,83,163,0.08);

          box-shadow:
            0 30px 80px rgba(36,20,79,0.10),
            0 10px 24px rgba(36,20,79,0.05);
        }

        .hs__img-frame::before {
          content: "";

          position: absolute;
          top: 0;
          left: 0;
          right: 0;

          height: 4px;

          background: var(--gradient-primary);

          z-index: 4;
        }

        .hs__img-frame::after {
          content: "";

          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to top,
              rgba(18,18,18,0.24),
              transparent 46%
            );

          z-index: 1;
        }

        .hs__img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          display: block;

          transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }

        .hs__img-frame:hover .hs__img {
          transform: scale(1.04);
        }

        /* MATCH */

        .hs__match {
          position: absolute;
          top: 16px;
          right: 16px;

          z-index: 5;

          display: inline-flex;
          align-items: center;
          gap: 7px;

          padding: 8px 14px;

          border-radius: 999px;

          background: rgba(49,185,120,0.94);

          color: white;

          backdrop-filter: blur(12px);

          box-shadow: 0 10px 24px rgba(49,185,120,0.25);
        }

        .hs__match-text {
          font-size: 12px;
          font-weight: 800;
        }

        /* UNIVERSITY */

        .hs__uni {
          position: absolute;
          left: 18px;
          bottom: 18px;

          z-index: 5;

          display: flex;
          align-items: center;
          gap: 12px;

          padding: 12px 14px;

          border-radius: 20px;

          background: rgba(255,255,255,0.92);

          backdrop-filter: blur(16px);

          border: 1px solid rgba(255,255,255,0.6);

          box-shadow: 0 10px 24px rgba(36,20,79,0.12);
        }

        .hs__uni-icon {
          width: 40px;
          height: 40px;

          border-radius: 14px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--gradient-primary);

          color: white;

          flex-shrink: 0;
        }

        .hs__uni-title {
          font-size: 13px;
          font-weight: 800;

          color: var(--text-dark);

          line-height: 1.2;
        }

        .hs__uni-sub {
          font-size: 11px;

          color: var(--text-light);

          margin-top: 3px;
        }

        /* COUNTRIES */

        .hs__countries {
          position: relative;

          display: flex;
          flex-wrap: wrap;

          gap: 12px;

          margin-top: 18px;

          padding: 18px;

          border-radius: 26px;

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.78),
              rgba(255,255,255,0.55)
            );

          border: 1px solid rgba(109,83,163,0.08);

          backdrop-filter: blur(16px);

          box-shadow:
            0 16px 40px rgba(36,20,79,0.05);

          overflow: hidden;
        }

        .hs__country {
          position: relative;

          display: inline-flex;
          align-items: center;
          gap: 9px;

          padding: 11px 15px;

          border-radius: 999px;

          background: white;

          border: 1px solid rgba(109,83,163,0.08);

          font-size: 12.5px;
          font-weight: 700;

          color: var(--text-dark);

          transition:
            transform 0.28s ease,
            border-color 0.28s ease,
            box-shadow 0.28s ease;
        }

        .hs__country:hover {
          transform: translateY(-4px);

          border-color: rgba(109,83,163,0.18);

          box-shadow:
            0 10px 22px rgba(36,20,79,0.08);
        }

        .hs__flag-wrap {
          width: 28px;
          height: 28px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          font-size: 15px;
        }

        .hs__country-name {
          white-space: nowrap;
        }

        /* RESPONSIVE */

        @media (max-width: 920px) {

          .hs {
            padding: 70px 0 54px;
          }

          .hs__wrap {
            grid-template-columns: 1fr;
            gap: 42px;
            padding: 0 22px;
          }

          .hs__left {
            max-width: 100%;
          }

          .hs__right {
            width: 100%;
            max-width: 680px;
            margin: 0 auto;
          }
        }

        @media (max-width: 680px) {

          .hs {
            padding: 56px 0 46px;
          }

          .hs__wrap {
            padding: 0 18px;
            gap: 34px;
          }

          .hs__title {
            font-size: 42px;
            line-height: 1.08;
            letter-spacing: -1.8px;
          }

          .hs__desc {
            font-size: 14px;
          }

          .hs__actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hs__btn-primary,
          .hs__btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hs__sep {
            display: none;
          }

          .hs__country {
            font-size: 11.5px;
            padding: 8px 12px;
          }
        }

      `}</style>

      <section className="hs">
        <div className="hs__glow" />

        <div className="hs__wrap">
          {/* LEFT */}

          <div className="hs__left">
            <motion.div {...fadeUp(0)}>
              <div className="hs__tag">
                <span className="hs__tag-icon">
                  <Sparkles size={12} />
                </span>

                <span className="hs__tag-text">Global Education Platform</span>

                <span className="hs__pulse" />
              </div>
            </motion.div>

            <motion.h1 className="hs__title" {...fadeUp(0.06)}>
              Your Gateway to a <br />
              <span className="hs__accent">Smartest</span> Education <br />
              Platform
            </motion.h1>

            <motion.p className="hs__desc" {...fadeUp(0.13)}>
              Your Campus helps ambitious students discover the
              <strong> right universities</strong>, secure
              <strong> scholarships</strong>, and navigate
              <strong> admissions & visas</strong> with expert guidance and
              AI-powered precision.
            </motion.p>

            <motion.div className="hs__bullets" {...fadeUp(0.18)}>
              {BULLETS.map((item) => (
                <div className="hs__bullet" key={item}>
                  <span className="hs__check">
                    <CheckCircle2 size={12} strokeWidth={2.6} />
                  </span>

                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div className="hs__actions" {...fadeUp(0.24)}>
              <Link to="/contact" className="hs__btn-primary">
                <span>Start Matching Free</span>

                <span className="hs__arrow">
                  <ArrowRight size={15} />
                </span>
              </Link>

              <Link to="/about" className="hs__btn-secondary">
                See How It Works
              </Link>
            </motion.div>

            <motion.div className="hs__trust" {...fadeIn(0.42)}>
              <div className="hs__avatars">
                {TRUST_AVATARS.map((src, i) => (
                  <div className="hs__avatar" key={i}>
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>

              <div>
                <div className="hs__trust-count">10,000+ Students</div>

                <div className="hs__trust-sub">
                  Trusted across India & beyond
                </div>
              </div>

              <div className="hs__sep" />

              <div>
                <div className="hs__stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}

                  <span className="hs__stars-val">4.9</span>
                </div>

                <div className="hs__stars-meta">2,400+ verified reviews</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}

          <motion.div
            className="hs__right"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="hs__img-frame">
              <img
                src={heroImg}
                alt="Students studying abroad"
                className="hs__img"
              />

              <div className="hs__match">
                <TrendingUp size={13} />

                <span className="hs__match-text">96% Match Found</span>
              </div>

              <div className="hs__uni">
                <div className="hs__uni-icon">
                  <GraduationCap size={16} />
                </div>

                <div>
                  <div className="hs__uni-title">AI-Matched University</div>

                  <div className="hs__uni-sub">
                    Western University · Canada 🇨🇦
                  </div>
                </div>
              </div>
            </div>

            <div className="hs__countries">
              {DESTINATIONS.map(({ flag, name, color }) => (
                <div className="hs__country" key={name}>
                  <span className="hs__flag-wrap" style={{ background: color }}>
                    {flag}
                  </span>

                  <span className="hs__country-name">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}