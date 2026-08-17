import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Activity } from "lucide-react";
import { mbbsFaqs } from "../../Data/mbbsAbroadData";

const MbbsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const toggle = (index) => setOpenIndex((current) => (current === index ? -1 : index));

  return (
    <section className="mfq">
      <div className="mfq__shell">
        {/* ---------- header ---------- */}
        <div className="mfq__header">
          <p className="mfq__eyebrow">
            <span className="mfq__eyebrow-dot" />
            Admissions Advisory
          </p>
          <h2 className="mfq__title">
            <span className="mfq__title-dark">Questions before you</span>{" "}
            <span className="mfq__title-gradient">apply abroad?</span>
          </h2>
          <p className="mfq__lead">
            Straight answers on eligibility, costs, and country choice —
            everything students ask before starting their MBBS journey.
          </p>
        </div>

        {/* ---------- signature: ecg divider ---------- */}
        <div className="mfq__ecg" aria-hidden="true">
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none">
            <motion.path
              d="M0,30 L360,30 L385,30 L400,8 L415,52 L432,30 L460,30 L480,18 L498,42 L515,30 L1000,30"
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? {} : { pathLength: 0 }}
              whileInView={reduceMotion ? {} : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* ---------- vitals-rail record list ---------- */}
        <div className="mfq__records">
          {mbbsFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const caseId = `MBBS-${String(index + 1).padStart(2, "0")}`;
            return (
              <div className={`mfq__record ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <div className="mfq__rail">
                  <span className="mfq__node">
                    <Activity size={14} />
                  </span>
                </div>

                <div className="mfq__card">
                  <button
                    className="mfq__head"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="mfq__id">{caseId}</span>
                    <span className="mfq__q">{faq.question}</span>
                    <span className="mfq__toggle">
                      <Plus size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="mfq__body"
                        initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? {} : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="mfq__answer">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .mfq {
          padding: clamp(3.5rem, 7vw, 5.5rem) 1.5rem;
          background: var(--primary-light);
        }

        .mfq__shell {
          max-width: 800px;
          margin: 0 auto;
        }

        /* ---------- header ---------- */
        .mfq__header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .mfq__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          margin: 0;
        }

        .mfq__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-green);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-green) 20%, transparent);
        }

        .mfq__title {
          font-size: clamp(2.1rem, 3.9vw, 2.9rem);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .mfq__title-dark {
          color: var(--primary-dark);
        }

        .mfq__title-gradient {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mfq__lead {
          max-width: 520px;
          font-size: 1.08rem;
          line-height: 1.7;
          color: var(--text-medium);
          margin: 0;
        }

        /* ---------- ecg divider ---------- */
        .mfq__ecg {
          width: 100%;
          max-width: 420px;
          height: 34px;
          margin: 0 auto 2.75rem;
        }

        .mfq__ecg svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ---------- vitals rail ---------- */
        .mfq__records {
          display: flex;
          flex-direction: column;
        }

        .mfq__record {
          position: relative;
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 1rem;
        }

        .mfq__rail {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .mfq__rail::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: -1.3rem;
          width: 2px;
          background: repeating-linear-gradient(
            to bottom,
            color-mix(in srgb, var(--primary) 35%, transparent) 0,
            color-mix(in srgb, var(--primary) 35%, transparent) 4px,
            transparent 4px,
            transparent 9px
          );
        }

        .mfq__record:last-child .mfq__rail::before {
          display: none;
        }

        .mfq__node {
          position: relative;
          z-index: 1;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-main);
          border: 1.5px solid var(--border);
          color: var(--text-light);
          transition: var(--transition);
        }

        .mfq__record.is-open .mfq__node {
          border-color: var(--accent-green);
          color: var(--accent-green);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-green) 16%, transparent);
          animation: mfq-pulse 1.8s ease-in-out infinite;
        }

        @keyframes mfq-pulse {
          0%, 100% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-green) 16%, transparent); }
          50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--accent-green) 8%, transparent); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mfq__record.is-open .mfq__node {
            animation: none;
          }
        }

        /* ---------- record card ---------- */
        .mfq__card {
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--bg-main);
          overflow: hidden;
          margin-bottom: 1.15rem;
          transition: var(--transition);
        }

        .mfq__record.is-open .mfq__card {
          border-color: var(--primary);
          box-shadow: var(--shadow-sm);
        }

        .mfq__head {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.15rem 1.4rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-main);
        }

        .mfq__id {
          flex-shrink: 0;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--primary);
          background: var(--primary-light);
          border: 1px solid color-mix(in srgb, var(--primary) 22%, transparent);
          border-radius: var(--radius-sm);
          padding: 0.26rem 0.5rem;
        }

        .mfq__q {
          flex: 1;
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
          color: var(--text-dark);
        }

        .mfq__toggle {
          flex-shrink: 0;
          color: var(--primary);
          transition: transform 0.25s ease;
        }

        .mfq__record.is-open .mfq__toggle {
          transform: rotate(45deg);
        }

        .mfq__body {
          overflow: hidden;
        }

        .mfq__answer {
          margin: 0;
          padding: 0 1.4rem 1.3rem 3.4rem;
          font-size: 1.02rem;
          line-height: 1.75;
          color: var(--text-medium);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 600px) {
          .mfq__q {
            font-size: 1rem;
          }
          .mfq__answer {
            font-size: 0.96rem;
          }
        }

        @media (max-width: 480px) {
          .mfq__record {
            grid-template-columns: 26px 1fr;
            gap: 0.7rem;
          }
          .mfq__node {
            width: 26px;
            height: 26px;
          }
          .mfq__head {
            padding: 1rem 1.1rem;
            gap: 0.75rem;
          }
          .mfq__id {
            font-size: 0.68rem;
            padding: 0.2rem 0.4rem;
          }
          .mfq__answer {
            padding-left: 2.6rem;
          }
        }
      `}</style>
    </section>
  );
};

export default MbbsFAQ;