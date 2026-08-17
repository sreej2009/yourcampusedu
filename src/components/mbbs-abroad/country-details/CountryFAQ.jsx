import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Sparkles, ArrowUpRight } from "lucide-react";

const faqsBySlug = {
  georgia: [
    {
      question: "Are Georgian medical universities NMC approved?",
      answer:
        "Yes, all universities we place students in appear on the current NMC-approved list for MBBS abroad, and the degree is recognised for FMGE eligibility on return to India.",
    },
    {
      question: "What is the medium of instruction in Georgia?",
      answer:
        "All MBBS programmes for international students are taught fully in English, from first-year anatomy through final-year clinical rotations.",
    },
    {
      question: "Is hostel accommodation available on campus?",
      answer:
        "Yes, all partner universities offer on-campus or university-affiliated hostels with Indian food messes nearby, so settling in is straightforward from week one.",
    },
    {
      question: "How does Georgia compare to Uzbekistan on cost?",
      answer:
        "Georgia sits at a slightly higher fee band than Uzbekistan, reflecting its EU-aligned teaching standards and shorter flight connectivity — most students weigh this against budget priorities.",
    },
    {
      question: "Can I get direct flights home during breaks?",
      answer:
        "Tbilisi connects to Delhi and Mumbai with one-stop options, making semester breaks and emergency travel home manageable within a day.",
    },
  ],

  uzbekistan: [
    {
      question: "Is an entrance exam required in Uzbekistan?",
      answer:
        "No, admission is direct based on academic marks and a qualifying NEET score — there is no separate university entrance test to prepare for.",
    },
    {
      question: "How safe is Uzbekistan for Indian students?",
      answer:
        "Uzbekistan is regarded as one of the safer Central Asian countries, with a low crime rate and dedicated international student support cells on most campuses.",
    },
    {
      question: "Can I visit home during holidays?",
      answer:
        "Yes, direct flights connect Tashkent to Delhi and Mumbai, making trips home during semester breaks straightforward and affordable.",
    },
    {
      question: "Why do so many Indian students choose Uzbekistan?",
      answer:
        "The combination of decades-old, government-affiliated medical universities and one of the lowest costs of living among MBBS-abroad destinations keeps demand consistently high.",
    },
    {
      question: "Are clinical rotations done inside the university?",
      answer:
        "Most partner universities are directly attached to teaching hospitals, so clinical exposure happens on or adjacent to campus rather than at a separate placement site.",
    },
  ],

  tajikistan: [
    {
      question: "Is Tajikistan's MBBS degree recognised by NMC?",
      answer:
        "Yes, our partner universities in Tajikistan are on the current NMC-approved list for MBBS abroad, with the same recognition pathway as our other partner countries.",
    },
    {
      question: "Why is Tajikistan cheaper than Georgia or Uzbekistan?",
      answer:
        "Lower tuition and living costs in Tajikistan bring the total course cost down, while course structure, duration, and recognition remain equivalent to our other destinations.",
    },
    {
      question: "Is IELTS or TOEFL required for admission?",
      answer:
        "No, there is no English proficiency test required for MBBS admission in Tajikistan — teaching is in English from day one regardless.",
    },
    {
      question: "What does the direct admission process involve?",
      answer:
        "Admission is confirmed on document verification alone, with no entrance exam or interview, which typically shortens the time between application and offer letter.",
    },
    {
      question: "Are hostels safe for international students?",
      answer:
        "Dedicated international student blocks come with 24/7 security and Indian mess facilities, separate from general local student housing.",
    },
  ],
};

const defaultFaqs = [
  {
    question: "What are the basic eligibility requirements to study here?",
    answer:
      "Most programs require a minimum academic score from your previous qualification, along with proof of English proficiency where applicable. Specific requirements vary by course and institution — our Eligibility Checker gives you a personalized breakdown in minutes.",
  },
  {
    question: "How much should I budget for tuition and living costs?",
    answer:
      "Costs vary widely by city and institution type. As a rough range, expect tuition plus living expenses to fall between mid-range and premium bands depending on your course and lifestyle. Use our Budget Calculator for a number tailored to your target program.",
  },
  {
    question: "Can international or out-of-state students apply directly?",
    answer:
      "Yes — most institutions accept direct applications alongside a valid entrance score or portfolio, depending on the course. Some programs also offer bridge or foundation intakes if you're transitioning from a different curriculum.",
  },
  {
    question: "What scholarship and financial aid options are available?",
    answer:
      "Merit-based scholarships, need-based aid, and course-specific grants are commonly available. Our team can match you against active scholarship windows based on your academic profile and target intake.",
  },
  {
    question: "How long does the admission process typically take?",
    answer:
      "From application to offer letter, most students see a decision within a few weeks, though this depends on the institution's intake cycle. Starting early gives you more room for document verification and visa or hostel planning if needed.",
  },
];

const CountryFAQ = ({ country }) => {
  const faqs = faqsBySlug[country?.slug] ?? defaultFaqs;
  const name = country?.name || "your destination";

  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const toggle = (index) => setOpenIndex((current) => (current === index ? -1 : index));

  return (
    <section className="country-faq">
      <div className="country-faq__orb country-faq__orb--one" aria-hidden="true" />
      <div className="country-faq__orb country-faq__orb--two" aria-hidden="true" />
      <div className="country-faq__grid" aria-hidden="true" />

      <div className="country-faq__inner">
        <div className="country-faq__header">
          <span className="country-faq__eyebrow">
            <Sparkles size={14} />
            Frequently asked
          </span>
          <h2 className="country-faq__title">
            Everything about <span className="country-faq__title-accent">{name}</span>, answered
          </h2>
          <p className="country-faq__subtitle">
            Five questions students ask us most before applying — still have one of your own?
          </p>
        </div>

        <div className="country-faq__spine">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`country-faq__row ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <span className="country-faq__ghost-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="country-faq__node">
                  <span className="country-faq__node-dot" />
                </span>

                <div className="country-faq__card">
                  <button
                    className="country-faq__question"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="country-faq__question-text">{faq.question}</span>
                    <span className="country-faq__icon-wrap">
                      <Plus size={16} className="country-faq__icon" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="country-faq__answer-wrap"
                        initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? {} : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="country-faq__answer">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        <div className="country-faq__footer">
          <p className="country-faq__footer-text">Still have questions we haven't covered?</p>
          <a href="/contact" className="country-faq__cta">
            <span>Talk to a counselor</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .country-faq {
          position: relative;
          overflow: hidden;
          padding: clamp(4rem, 8vw, 7rem) 1.5rem;
          background: linear-gradient(180deg, var(--primary-light) 0%, var(--bg-main) 100%);
        }

        .country-faq__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.35;
          pointer-events: none;
        }

        .country-faq__orb--one {
          width: 340px;
          height: 340px;
          top: -60px;
          right: -80px;
          background: var(--accent-blue);
        }

        .country-faq__orb--two {
          width: 260px;
          height: 260px;
          bottom: 10%;
          left: -100px;
          background: var(--accent-green);
        }

        .country-faq__grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(color-mix(in srgb, var(--primary) 18%, transparent) 1px, transparent 1px);
          background-size: 26px 26px;
          -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent);
          mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent);
          pointer-events: none;
        }

        .country-faq__inner {
          position: relative;
          max-width: 780px;
          margin: 0 auto;
        }

        .country-faq__header {
          text-align: center;
          margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
        }

        .country-faq__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary);
          background: color-mix(in srgb, var(--bg-main) 70%, transparent);
          border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
          backdrop-filter: blur(6px);
        }

        .country-faq__title {
          font-family: var(--font-main);
          font-size: clamp(1.9rem, 3.6vw, 2.5rem);
          font-weight: 700;
          line-height: 1.25;
          color: var(--text-dark);
          margin: 0 0 0.85rem;
        }

        .country-faq__title-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .country-faq__subtitle {
          font-size: 0.95rem;
          color: var(--text-medium);
          margin: 0;
        }

        .country-faq__spine {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .country-faq__spine::before {
          content: "";
          position: absolute;
          top: 0.9rem;
          bottom: 0.9rem;
          left: 1.6rem;
          width: 2px;
          background: linear-gradient(
            180deg,
            transparent,
            color-mix(in srgb, var(--primary) 30%, transparent) 10%,
            color-mix(in srgb, var(--primary) 30%, transparent) 90%,
            transparent
          );
        }

        .country-faq__row {
          position: relative;
          display: grid;
          grid-template-columns: 3.2rem 1fr;
          align-items: start;
        }

        .country-faq__ghost-number {
          position: absolute;
          left: 0;
          top: -1.1rem;
          font-family: var(--font-main);
          font-size: 3.4rem;
          font-weight: 700;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px color-mix(in srgb, var(--primary) 28%, transparent);
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }

        .country-faq__row.is-open .country-faq__ghost-number {
          -webkit-text-stroke: 1px color-mix(in srgb, var(--primary) 55%, transparent);
        }

        .country-faq__node {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          padding-top: 1.55rem;
        }

        .country-faq__node-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--bg-main);
          border: 2px solid color-mix(in srgb, var(--primary) 45%, transparent);
          transition: var(--transition);
        }

        .country-faq__row.is-open .country-faq__node-dot {
          background: var(--gradient-primary);
          border-color: transparent;
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 15%, transparent);
        }

        .country-faq__card {
          position: relative;
          z-index: 1;
          border-radius: var(--radius-lg);
          background: color-mix(in srgb, var(--bg-main) 88%, transparent);
          border: 1px solid var(--border);
          backdrop-filter: blur(10px);
          overflow: hidden;
          transition: var(--transition);
        }

        .country-faq__row.is-open .country-faq__card {
          border-color: color-mix(in srgb, var(--primary) 35%, transparent);
          box-shadow: var(--shadow-md);
        }

        .country-faq__question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.2rem 1.4rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-main);
        }

        .country-faq__question-text {
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.5;
          color: var(--text-dark);
        }

        .country-faq__icon-wrap {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--primary-light);
          transition: var(--transition);
        }

        .country-faq__row.is-open .country-faq__icon-wrap {
          background: var(--gradient-primary);
        }

        .country-faq__icon {
          color: var(--primary);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .country-faq__row.is-open .country-faq__icon {
          color: var(--text-white);
          transform: rotate(45deg);
        }

        .country-faq__answer-wrap {
          overflow: hidden;
        }

        .country-faq__answer {
          margin: 0;
          padding: 0 1.4rem 1.4rem;
          font-size: 0.92rem;
          line-height: 1.75;
          color: var(--text-medium);
        }

        .country-faq__footer {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          text-align: center;
        }

        .country-faq__footer-text {
          font-size: 0.9rem;
          color: var(--text-medium);
          margin: 0 0 1rem;
        }

        .country-faq__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.6rem;
          border-radius: var(--radius-md);
          background: var(--gradient-secondary);
          color: var(--text-white);
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
        }

        .country-faq__cta:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 560px) {
          .country-faq__row {
            grid-template-columns: 2.2rem 1fr;
          }

          .country-faq__spine::before {
            left: 1.1rem;
          }

          .country-faq__ghost-number {
            font-size: 2.4rem;
            top: -0.7rem;
          }

          .country-faq__node {
            padding-top: 1.3rem;
          }

          .country-faq__question {
            padding: 1rem 1.1rem;
          }

          .country-faq__answer {
            padding: 0 1.1rem 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default CountryFAQ;