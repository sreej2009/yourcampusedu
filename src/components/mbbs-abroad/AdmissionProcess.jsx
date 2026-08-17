import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  ShieldCheck,
  Globe2,
  FileCheck2,
  BadgeCheck,
  Plane,
  Home,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// Each step is tied to a token from theme.css — the color arc moves from
// --accent-green (departure) through the blues/indigo to --primary-dark
// (arrival), so the palette itself narrates the journey. No new hex values.
const defaultAdmissionSteps = [
  {
    step: 1,
    gateLabel: "Counselling",
    title: "Free Expert Counselling",
    description:
      "Connect with senior education consultants to map out your academic goals, budget preferences, and career aspirations in top foreign medical universities.",
    icon: MessageCircle,
    colorVar: "--accent-green",
  },
  {
    step: 2,
    gateLabel: "Eligibility",
    title: "Eligibility & NEET Verification",
    description:
      "We verify your 12th standard PCB scores along with your NEET qualification status to ensure full compliance with NMC and international guidelines.",
    icon: ShieldCheck,
    colorVar: "--accent-blue",
  },
  {
    step: 3,
    gateLabel: "University",
    title: "Country & University Selection",
    description:
      "Shortlist WHO & NMC-recognized medical universities across Russia, Uzbekistan, Georgia, Kazakhstan, or the Philippines matching your budget and lifestyle.",
    icon: Globe2,
    colorVar: "--info",
  },
  {
    step: 4,
    gateLabel: "Documents",
    title: "Application & Document Submission",
    description:
      "Our team handles transcript translations, apostille attestation, and seamless application filings directly with university admission boards.",
    icon: FileCheck2,
    colorVar: "--extra-indigo",
  },
  {
    step: 5,
    gateLabel: "Admission",
    title: "Admission Letter & Fee Confirmation",
    description:
      "Receive your official university admission letter within 7–10 working days and pay tuition fees directly to the university's official account.",
    icon: BadgeCheck,
    colorVar: "--primary",
  },
  {
    step: 6,
    gateLabel: "Visa",
    title: "Student Visa & Travel Arrangements",
    description:
      "Enjoy 100% visa approval guidance, embassy interview prep, group flight bookings, and foreign exchange assistance prior to departure.",
    icon: Plane,
    colorVar: "--extra-purple",
  },
  {
    step: 7,
    gateLabel: "Arrival",
    title: "Arrival, Hostel Check-in & Enrollment",
    description:
      "Our local Indian representative receives you at the airport and assists with registration, campus tour, hostel allocation, and settling in.",
    icon: Home,
    colorVar: "--primary-dark",
  },
];

// How much EXTRA scroll distance (in vh) is allocated PER TRANSITION
// between steps — not per step. The track height is therefore
// (steps - 1) * segmentVh + 100vh (the +100vh is just the one viewport
// needed to hold the pinned stage). This means the pin releases the
// instant the last step becomes active instead of dragging on for a
// whole extra segment of empty scrolling — that trailing segment was
// the source of the dead space under the section.
const SEGMENT_VH_DESKTOP = 70;
const SEGMENT_VH_MOBILE = 46;
const MOBILE_BREAKPOINT = 640;

const AdmissionProcess = ({ steps = defaultAdmissionSteps }) => {
  const reduceMotion = useReducedMotion();
  const total = steps.length;
  const segments = Math.max(1, total - 1);

  const [active, setActive] = useState(0);
  const [segmentVh, setSegmentVh] = useState(SEGMENT_VH_DESKTOP);

  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const clickScrollRef = useRef(null);
  const clickScrollTimeoutRef = useRef(null);

  const current = steps[active];
  const Icon = current.icon;

  // Recompute per-transition scroll distance on resize (mobile vs desktop).
  useEffect(() => {
    const setBySize = () => {
      setSegmentVh(
        window.innerWidth <= MOBILE_BREAKPOINT
          ? SEGMENT_VH_MOBILE
          : SEGMENT_VH_DESKTOP
      );
    };
    setBySize();
    window.addEventListener("resize", setBySize);
    return () => window.removeEventListener("resize", setBySize);
  }, []);

  // Core scroll -> active step mapping. Progress 0..1 maps directly onto
  // the `segments` transitions (total - 1), so progress === 1 lands
  // exactly on the last step with no leftover scroll room.
  const updateFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || clickScrollRef.current) return;

    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollable = rect.height - vh;

    let progress = scrollable > 0 ? -rect.top / scrollable : 0;
    progress = Math.min(1, Math.max(0, progress));

    const index = Math.min(total - 1, Math.round(progress * segments));
    setActive((prev) => (prev === index ? prev : index));
  }, [total, segments]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        updateFromScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateFromScroll]);

  // Clicking a gate / prev / next scrolls the window to that step's
  // position inside the track, rather than just swapping state.
  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(total - 1, i));
    const scrollable = track.offsetHeight - window.innerHeight;
    const targetProgress = clamped / segments;
    const targetY =
      track.offsetTop +
      Math.max(0, Math.min(scrollable, targetProgress * scrollable));

    clickScrollRef.current = true;
    setActive(clamped);

    window.scrollTo({
      top: targetY,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    if (clickScrollTimeoutRef.current) {
      window.clearTimeout(clickScrollTimeoutRef.current);
    }
    clickScrollTimeoutRef.current = window.setTimeout(() => {
      clickScrollRef.current = false;
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (clickScrollTimeoutRef.current) {
        window.clearTimeout(clickScrollTimeoutRef.current);
      }
    };
  }, []);

  const goPrev = () => goTo(active === 0 ? 0 : active - 1);
  const goNext = () => goTo(active === total - 1 ? total - 1 : active + 1);

  return (
    <section className="admission-process">
      <div className="admission-process__inner">
        {/* Header */}
        <div className="admission-process__header">
          <p className="admission-process__eyebrow">The Journey</p>
          <h2 className="admission-process__title">
            Your path to becoming a doctor abroad
          </h2>
          <p className="admission-process__subtitle">
            From your first consultation to your first day on campus — seven
            gates, one team walking you through every one of them. Scroll to
            move through the journey.
          </p>
        </div>
      </div>

      {/* Scroll-driven track: height scales with the number of transitions
          (steps - 1) so the pin releases the moment the last step is
          reached — no extra segment of scroll after the content stops
          changing, which is what was leaving empty space below the
          section. */}
      <div
        ref={trackRef}
        className="admission-process__scroll-track"
        style={{ height: `calc(100vh + ${segments * segmentVh}vh)` }}
      >
        <div className="admission-process__sticky-stage">
          <div className="admission-process__inner">
            {/* Gate rail */}
            <div
              className="admission-process__rail"
              role="tablist"
              aria-label="Admission process steps"
            >
              <div className="admission-process__rail-track" />
              <div
                className="admission-process__rail-fill"
                style={{
                  width: `${(active / (total - 1)) * 100}%`,
                  transition: reduceMotion ? "none" : "width 0.4s ease",
                }}
              />
              {steps.map((s, i) => (
                <button
                  key={s.step}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`admission-process__gate${
                    i === active ? " is-active" : ""
                  }${i < active ? " is-done" : ""}`}
                  style={{ "--step-color": `var(${s.colorVar})` }}
                  onClick={() => goTo(i)}
                >
                  <span className="admission-process__gate-num">
                    {String(s.step).padStart(2, "0")}
                  </span>
                  <span className="admission-process__gate-label">
                    {s.gateLabel}
                  </span>
                </button>
              ))}
            </div>

            {/* Boarding-pass style detail panel */}
            <div className="admission-process__stage">
              <button
                type="button"
                className="admission-process__nav admission-process__nav--prev"
                onClick={goPrev}
                aria-label="Previous step"
              >
                <ArrowLeft size={18} strokeWidth={2.25} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.step}
                  className="admission-process__panel"
                  style={{ "--step-color": `var(${current.colorVar})` }}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="admission-process__panel-stub">
                    <span className="admission-process__panel-gate">
                      GATE {String(current.step).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </span>
                    <span className="admission-process__panel-status">
                      {active === total - 1 ? "Arrived" : "Boarding"}
                    </span>
                  </div>

                  <div
                    className="admission-process__perforation"
                    aria-hidden="true"
                  />

                  <div className="admission-process__panel-main">
                    <div className="admission-process__icon-box">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <div className="admission-process__panel-copy">
                      <h3 className="admission-process__panel-title">
                        {current.title}
                      </h3>
                      <p className="admission-process__panel-description">
                        {current.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                className="admission-process__nav admission-process__nav--next"
                onClick={goNext}
                aria-label="Next step"
              >
                <ArrowRight size={18} strokeWidth={2.25} />
              </button>
            </div>

            {active < total - 1 && (
              <div className="admission-process__scroll-hint" aria-hidden="true">
                <span>Scroll to continue</span>
                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className="admission-process__scroll-hint-icon"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .admission-process {
          background: var(--bg-section);
          font-family: var(--font-main);
        }

        .admission-process__inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
        }

        /* ---------- Header ---------- */

        .admission-process__header {
          text-align: center;
          max-width: 560px;
          margin: 0 auto;
          padding-top: clamp(3rem, 7vw, 6rem);
          padding-bottom: clamp(1.25rem, 2.5vw, 1.75rem);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .admission-process__eyebrow {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--secondary);
          margin: 0;
        }

        .admission-process__title {
          font-size: clamp(1.65rem, 2.6vw, 2.15rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--primary-dark);
          margin: 0;
        }

        .admission-process__subtitle {
          font-size: 0.98rem;
          line-height: 1.65;
          color: var(--text-medium);
          margin: 0;
        }

        /* ---------- Scroll track / sticky stage ---------- */

        .admission-process__scroll-track {
          position: relative;
        }

        .admission-process__sticky-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(2rem, 6vw, 3.5rem) 0;
        }

        /* ---------- Gate rail ---------- */

        .admission-process__rail {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 0.25rem;
          margin-bottom: clamp(2rem, 4vw, 3rem);
          overflow-x: auto;
          padding: 0.5rem 0.25rem 0.75rem;
          scrollbar-width: none;
        }

        .admission-process__rail::-webkit-scrollbar {
          display: none;
        }

        .admission-process__rail-track,
        .admission-process__rail-fill {
          position: absolute;
          top: 22px;
          left: 0;
          height: 2px;
          border-radius: 2px;
        }

        .admission-process__rail-track {
          width: 100%;
          background: var(--border);
        }

        .admission-process__rail-fill {
          background: var(--gradient-primary);
        }

        .admission-process__gate {
          position: relative;
          z-index: 1;
          flex: 1 0 auto;
          min-width: 76px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: var(--font-main);
        }

        .admission-process__gate-num {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg-main);
          border: 2px solid var(--border);
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          transition: var(--transition);
        }

        .admission-process__gate.is-done .admission-process__gate-num {
          border-color: var(--step-color);
          color: var(--step-color);
          background: color-mix(in srgb, var(--step-color) 10%, white);
        }

        .admission-process__gate.is-active .admission-process__gate-num {
          border-style: solid;
          border-color: var(--step-color);
          background: var(--step-color);
          color: var(--white);
          box-shadow: 0 0 0 5px color-mix(in srgb, var(--step-color) 18%, transparent);
          transform: scale(1.08);
        }

        .admission-process__gate-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-light);
          white-space: nowrap;
          transition: var(--transition);
        }

        .admission-process__gate.is-active .admission-process__gate-label {
          color: var(--step-color);
        }

        /* ---------- Stage ---------- */

        .admission-process__stage {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(0.5rem, 2vw, 1.25rem);
        }

        .admission-process__nav {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-main);
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .admission-process__nav:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        /* ---------- Boarding-pass panel ---------- */

        .admission-process__panel {
          position: relative;
          background: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .admission-process__panel-stub {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.5rem;
          background: color-mix(in srgb, var(--step-color) 10%, white);
        }

        .admission-process__panel-gate {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--step-color);
        }

        .admission-process__panel-status {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--white);
          background: var(--step-color);
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
        }

        .admission-process__perforation {
          position: relative;
          height: 1px;
          background-image: linear-gradient(
            to right,
            var(--border) 0,
            var(--border) 6px,
            transparent 6px,
            transparent 12px
          );
          background-size: 12px 1px;
        }

        .admission-process__perforation::before,
        .admission-process__perforation::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--bg-main);
          transform: translateY(-50%);
        }

        .admission-process__panel-main {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          padding: clamp(1.5rem, 3vw, 2.25rem);
        }

        .admission-process__icon-box {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: color-mix(in srgb, var(--step-color) 14%, white);
          color: var(--step-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admission-process__panel-title {
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          font-weight: 700;
          color: var(--text-dark);
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }

        .admission-process__panel-description {
          font-size: 0.96rem;
          line-height: 1.7;
          color: var(--text-medium);
          margin: 0;
        }

        /* ---------- Scroll hint ---------- */

        .admission-process__scroll-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 1.5rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-light);
          letter-spacing: 0.02em;
        }

        .admission-process__scroll-hint-icon {
          animation: admission-scroll-bounce 1.6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .admission-process__scroll-hint-icon {
            animation: none;
          }
        }

        @keyframes admission-scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        /* ---------- Responsive ---------- */

        @media (max-width: 640px) {
          .admission-process__stage {
            grid-template-columns: 1fr;
          }

          .admission-process__nav {
            display: none;
          }

          .admission-process__panel-main {
            flex-direction: column;
          }

          .admission-process__gate-label {
            display: none;
          }

          .admission-process__gate {
            min-width: 44px;
          }
        }
      `}</style>
    </section>
  );
};

export default AdmissionProcess;