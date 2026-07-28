import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BadgeCheck,
  Wallet,
  Award,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

const buildReasons = (countryName) => [
  {
    icon: GraduationCap,
    title: "World-Class Education",
    description: `Study inside campuses ranked among the world's best, taught by faculty active at the top of their fields in ${countryName}.`,
    color: "var(--primary)",
    iconBg: "var(--gradient-secondary)",
  },
  {
    icon: BadgeCheck,
    title: "Globally Recognized Degrees",
    description:
      "Qualifications that carry weight with recruiters everywhere — not just within the country you studied in.",
    color: "var(--accent-blue)",
    iconBg: "linear-gradient(135deg, var(--accent-blue) 0%, var(--info) 100%)",
  },
  {
    icon: Wallet,
    title: "Affordable Living",
    description:
      "Student housing, transit passes and campus meal plans that keep monthly costs predictable and manageable.",
    color: "var(--extra-orange)",
    iconBg: "linear-gradient(135deg, var(--extra-orange) 0%, var(--warning) 100%)",
  },
  {
    icon: Award,
    title: "Scholarships & Grants",
    description:
      "Merit and need-based funding available to international students, often covering a significant share of tuition.",
    color: "var(--accent-green)",
    iconBg: "linear-gradient(135deg, var(--accent-green) 0%, var(--success) 100%)",
  },
  {
    icon: ShieldCheck,
    title: "Safe Student Environment",
    description: `Low-crime campus towns and dedicated international student support offices across ${countryName}.`,
    color: "var(--secondary)",
    iconBg: "linear-gradient(135deg, var(--secondary) 0%, var(--danger) 100%)",
  },
  {
    icon: Briefcase,
    title: "Excellent Career Opportunities",
    description:
      "Post-study work rights and strong graduate hiring pipelines that turn a degree into a real career start.",
    color: "var(--accent-pink)",
    iconBg: "linear-gradient(135deg, var(--accent-pink) 0%, var(--extra-purple) 100%)",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyChooseCountry({ countryName = "this country" }) {
  const reasons = buildReasons(countryName);

  return (
    <section className="why-choose">
      <div className="why-choose__inner">
        <motion.div
          className="why-choose__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
      
          <h2 className="why-choose__title">
            Why Choose <span className="why-choose__title-accent">{countryName}</span> ?
          </h2>
          <p className="why-choose__subtitle">
            Everything that makes this destination worth the flight — academics,
            cost of living and what happens after graduation.
          </p>
        </motion.div>

        <motion.div
          className="why-choose__list"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reasons.map(({ icon: Icon, title, description, color, iconBg }, index) => {
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={title}
                className="why-choose__item"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  className="why-choose__icon-container"
                  style={{ background: iconBg }}
                  variants={{
                    hover: { y: -4, rotate: -4, transition: { duration: 0.3, ease: "easeOut" } },
                  }}
                >
                  <Icon size={28} color="var(--white)" strokeWidth={2} />
                  <div className="why-choose__step-badge" style={{ background: color }}>
                    {stepNumber}
                  </div>
                </motion.div>

                <div className="why-choose__content-box" style={{ "--item-color": color }}>
                  <h3 className="why-choose__item-title">{title}</h3>
                  <p className="why-choose__item-description">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .why-choose {
          background-color: var(--primary-light);
          padding: clamp(3rem, 7vw, 5rem) clamp(1rem, 3vw, 2rem);
          font-family: var(--font-main);
        }

        .why-choose__inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .why-choose__header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto clamp(2rem, 5vw, 3.5rem);
        }

        .why-choose__eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--primary);
          background: var(--bg-main);
          padding: 0.4rem 0.9rem;
          border-radius: 50px;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          box-shadow: var(--shadow-sm);
        }

        .why-choose__title {
          font-size: clamp(2rem, 3.8vw, 2.8rem);
          font-weight: 700;
          color: var(--text-dark);
          margin: 0 0 0.8rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .why-choose__title-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .why-choose__subtitle {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-medium);
          margin: 0;
        }

        .why-choose__list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        .why-choose__item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .why-choose__icon-container {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--shadow-md);
          position: relative;
        }

        .why-choose__step-badge {
          position: absolute;
          top: -12px;
          left: -12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--white);
          border: 2px solid var(--bg-main);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .why-choose__content-box {
          border-radius: var(--radius-lg);
          background-color: var(--bg-main);
          padding: 1.8rem;
          border: 1px solid var(--border);
          border-top: 3px solid var(--item-color);
          transition: var(--transition);
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .why-choose__content-box:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .why-choose__item-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-dark);
          margin: 0 0 0.6rem;
          line-height: 1.3;
        }

        .why-choose__item-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-medium);
          margin: 0;
        }

        @media (max-width: 991px) {
          .why-choose__list {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 575px) {
          .why-choose__item {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
          }

          .why-choose__icon-container {
            width: 68px;
            height: 68px;
          }

          .why-choose__step-badge {
            top: -8px;
            left: auto;
            right: -8px;
            width: 26px;
            height: 26px;
            font-size: 0.75rem;
          }

          .why-choose__content-box {
            padding: 1.4rem;
            width: 100%;
          }

          .why-choose__item-title {
            font-size: 1.1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-choose * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}