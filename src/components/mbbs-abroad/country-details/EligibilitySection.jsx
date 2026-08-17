import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  ClipboardCheck,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";

const EligibilitySection = ({ country }) => {
  const reduceMotion = useReducedMotion();

  const steps = [
    { icon: GraduationCap, label: "Academic Score (10+2)", value: country.eligibility.academic },
    { icon: ClipboardCheck, label: "NEET Qualification", value: country.eligibility.neet },
    { icon: CalendarClock, label: "Minimum Age", value: country.eligibility.age },
  ];

  return (
    <section className="eligibility" style={{ "--country-accent": country.accent }}>
      <div className="eligibility__inner">
        {/* Header */}
        <div className="eligibility__header">
          <span className="eligibility__eyebrow">
            <span className="eligibility__eyebrow-dot" />
            MBBS Abroad Eligibility
          </span>
          <h2 className="eligibility__title">
            Do you qualify for MBBS in{" "}
            <span className="eligibility__title-accent">{country.name}</span>?
          </h2>
          <p className="eligibility__subtitle">
            Three requirements to check before you apply for MBBS in {country.name}.
          </p>
        </div>

        {/* Requirement stepper */}
        <div className="eligibility__stepper">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <motion.div
                className="eligibility__step"
                initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
              >
                <span className="eligibility__step-node">
                  <step.icon size={20} strokeWidth={2.2} />
                  <span className="eligibility__step-number">{String(index + 1).padStart(2, "0")}</span>
                </span>
                <span className="eligibility__step-label">{step.label}</span>
                <span className="eligibility__step-value">{step.value}</span>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="eligibility__step-connector" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Documents checklist */}
        <motion.div
          className="eligibility__checklist-card"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.35 }}
        >
          <div className="eligibility__checklist-header">
            <h3>MBBS Application Checklist</h3>
            <p>Documents required to apply for MBBS in {country.name}</p>
          </div>

          <div className="eligibility__checklist-list">
            {country.eligibility.documents.map((doc) => (
              <div className="eligibility__checklist-row" key={doc}>
                <span className="eligibility__checklist-row-left">
                  <CheckCircle2 size={16} strokeWidth={2.4} />
                  <span>{doc}</span>
                </span>
                <span className="eligibility__checklist-tag">Required</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .eligibility {
          padding: clamp(3.5rem, 7vw, 5.5rem) 1.5rem;
          background: var(--primary-light);
          font-family: var(--font-main);
        }

        .eligibility__inner {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ============ Header ============ */
        .eligibility__header {
          text-align: center;
          max-width: 560px;
          margin: 0 auto clamp(3rem, 6vw, 4rem);
        }

        .eligibility__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: clamp(0.78rem, 1.3vw, 0.85rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--country-accent);
          background: color-mix(in srgb, var(--country-accent) 10%, var(--bg-main));
          border: 1px solid color-mix(in srgb, var(--country-accent) 28%, transparent);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1rem;
        }

        .eligibility__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--country-accent);
        }

        .eligibility__title {
          font-size: clamp(1.9rem, 3.4vw, 2.6rem);
          font-weight: 700;
          color: var(--primary-dark);
          line-height: 1.25;
          margin: 0 0 0.75rem;
        }

        .eligibility__title-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .eligibility__subtitle {
          font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          color: var(--text-medium);
          margin: 0;
        }

        /* ============ Stepper ============ */
        .eligibility__stepper {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: clamp(2.75rem, 5.5vw, 3.5rem);
        }

        .eligibility__step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.6rem;
        }

        .eligibility__step-node {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--country-accent) 12%, var(--bg-main));
          border: 2px solid color-mix(in srgb, var(--country-accent) 45%, transparent);
          color: var(--country-accent);
        }

        .eligibility__step-number {
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--white);
          background: var(--country-accent);
          border: 2px solid var(--primary-light);
        }

        .eligibility__step-label {
          font-size: clamp(0.82rem, 1.3vw, 0.9rem);
          font-weight: 700;
          color: var(--text-dark);
        }

        .eligibility__step-value {
          display: inline-flex;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
          background: color-mix(in srgb, var(--country-accent) 8%, var(--bg-main));
          border: 1px solid color-mix(in srgb, var(--country-accent) 22%, var(--border));
          font-size: clamp(0.82rem, 1.2vw, 0.9rem);
          font-weight: 600;
          color: var(--text-dark);
        }

        .eligibility__step-connector {
          flex: 1;
          height: 2px;
          align-self: flex-start;
          margin-top: 27px;
          border-radius: 2px;
          background: linear-gradient(90deg, color-mix(in srgb, var(--country-accent) 55%, transparent), color-mix(in srgb, var(--country-accent) 15%, transparent));
        }

        /* ============ Checklist card ============ */
        .eligibility__checklist-card {
          padding: clamp(1.75rem, 3vw, 2.25rem);
          border-radius: var(--radius-lg);
          background: var(--bg-main);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }

        .eligibility__checklist-header {
          margin-bottom: 1rem;
        }

        .eligibility__checklist-header h3 {
          font-size: clamp(1.05rem, 1.6vw, 1.15rem);
          font-weight: 700;
          color: var(--text-dark);
          margin: 0 0 0.25rem;
        }

        .eligibility__checklist-header p {
          font-size: clamp(0.82rem, 1.2vw, 0.88rem);
          color: var(--text-light);
          margin: 0;
        }

        .eligibility__checklist-list {
          display: flex;
          flex-direction: column;
        }

        .eligibility__checklist-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.9rem 0.6rem;
          border-bottom: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
          border-radius: var(--radius-sm);
        }

        .eligibility__checklist-row:last-child {
          border-bottom: none;
        }

        .eligibility__checklist-row:nth-child(even) {
          background: color-mix(in srgb, var(--country-accent) 4%, transparent);
        }

        .eligibility__checklist-row-left {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: clamp(0.88rem, 1.3vw, 0.96rem);
          font-weight: 600;
          color: var(--text-dark);
        }

        .eligibility__checklist-row-left svg {
          flex-shrink: 0;
          color: var(--country-accent);
        }

        .eligibility__checklist-tag {
          flex-shrink: 0;
          font-size: clamp(0.68rem, 1vw, 0.72rem);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-light);
          background: var(--bg-section);
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-sm);
        }

        /* ============ Responsiveness ============ */
        @media (max-width: 640px) {
          .eligibility__stepper {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
          }

          .eligibility__step {
            flex-direction: row;
            text-align: left;
            gap: 1rem;
          }

          .eligibility__step-connector {
            display: none;
          }

          .eligibility__step-label,
          .eligibility__step-value {
            display: block;
          }
        }

        @media (max-width: 420px) {
          .eligibility__checklist-row {
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};

export default EligibilitySection;