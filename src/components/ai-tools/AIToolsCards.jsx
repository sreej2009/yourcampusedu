import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  CheckCircle2,
  Wallet,
  BarChart3,
  Globe2,
  ArrowRight,
} from "lucide-react";
import courseMatchImg from "../../assets/images/course-hero.png";
import eligibilityImg from "../../assets/images/courses-hero.avif";
import budgetImg from "../../assets/images/ai.png";
import compareImg from "../../assets/images/ai-tool.png";
import educationFitImg from "../../assets/images/ai-tools-hero.png";

const tools = [
  {
    icon: Brain,
    image: courseMatchImg,
    title: "AI Course Match",
    tag: "Personalized",
    description:
      "Get personalized course and destination recommendations based on your academic profile, scores, and aspirations.",
    accent: "var(--extra-purple)",
    features: ["Personalized Results", "Instant Insights", "Student Friendly"],
    to: "/ai-course-match",
  },
  {
    icon: CheckCircle2,
    image: eligibilityImg,
    title: "Eligibility Checker",
    tag: "Instant",
    description:
      "Know exactly which universities and programs you qualify for — no guesswork, no wasted applications.",
    accent: "var(--accent-green)",
    features: ["Instant Evaluation", "Accurate Criteria", "Global Database"],
    to: "/eligibility-checker",
  },
  {
    icon: Wallet,
    image: budgetImg,
    title: "Budget Calculator",
    tag: "Financial",
    description:
      "Estimate full study costs — tuition, living, travel, and hidden expenses — broken down by country and city.",
    accent: "var(--extra-orange)",
    features: ["Expense Breakdown", "Multi-Currency", "Hidden Cost Alerts"],
    to: "/budget-calculator",
  },
  {
    icon: BarChart3,
    image: compareImg,
    title: "Compare Colleges",
    tag: "Analytics",
    description:
      "Side-by-side university comparisons across fees, rankings, placement rates, and return on investment.",
    accent: "var(--accent-blue)",
    features: ["Side-by-Side View", "ROI Analysis", "Detailed Metrics"],
    to: "/compare-colleges",
  },
  {
    icon: Globe2,
    image: educationFitImg,
    title: "Education Fit Quiz",
    tag: "Discovery",
    description:
      "Answer a few questions and discover which country's education system, culture, and costs suit you best.",
    accent: "var(--accent-pink)",
    features: ["Lifestyle Match", "Budget Alignment", "Top 3 Countries"],
    to: "/country-fit-quiz",
  },
];

function AIToolsCards() {
  const navigate = useNavigate();

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{
        fontFamily: "var(--font-main)",
        background: "var(--bg-light)",
      }}
    >
      <style>{`
        /* ===== Modern Fluid Background System ===== */
        .aitools-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .aitools-blob-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          top: -200px;
          left: -150px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--primary) 12%, transparent) 0%, transparent 70%);
          filter: blur(60px);
        }

        .aitools-blob-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          bottom: -150px;
          right: -100px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent-blue) 10%, transparent) 0%, transparent 70%);
          filter: blur(60px);
        }

        /* ===== Alternating Row Card Core ===== */
        .aitool-row {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--bg-main);
          border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
          border-radius: var(--radius-xl);
          box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.02), var(--shadow-sm);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .aitool-row {
            flex-direction: row;
            min-height: 240px;
          }
          .aitool-row--alternate {
            flex-direction: row-reverse;
          }
        }

        .aitool-row:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--card-accent) 35%, var(--border));
          box-shadow: 0 24px 48px -12px color-mix(in srgb, var(--card-accent) 14%, transparent),
                      0 4px 12px -2px rgba(0, 0, 0, 0.02);
        }

        /* Ambient Card Background Wash on Hover */
        .aitool-row__wash {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 90% 50%, color-mix(in srgb, var(--card-accent) 4%, transparent) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        .aitool-row:hover .aitool-row__wash {
          opacity: 1;
        }

        /* Dynamic Left/Right Accent Line */
        .aitool-row__accent-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--card-accent);
          transform: scaleY(0.3);
          opacity: 0.6;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          z-index: 5;
        }
        
        .aitool-row:not(.aitool-row--alternate) .aitool-row__accent-line { left: 0; transform-origin: center left; }
        .aitool-row.aitool-row--alternate .aitool-row__accent-line { right: 0; transform-origin: center right; }

        .aitool-row:hover .aitool-row__accent-line {
          transform: scaleY(1);
          opacity: 1;
        }

        /* ===== Image Engine Module ===== */
        .aitool-row__image-wrap {
          position: relative;
          flex-shrink: 0;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 10;
        }

        @media (min-width: 768px) {
          .aitool-row__image-wrap {
            width: clamp(220px, 20vw, 280px);
            aspect-ratio: auto;
          }
        }

        .aitool-row__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(0.1) brightness(0.96);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
        }

        .aitool-row:hover .aitool-row__image {
          transform: scale(1.05);
          filter: grayscale(0) brightness(1);
        }

        /* Conditional Image Overlays for Smooth Blending */
        .aitool-row__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, var(--bg-main) 100%);
          z-index: 2;
        }

        @media (min-width: 768px) {
          .aitool-row:not(.aitool-row--alternate) .aitool-row__image-overlay {
            background: linear-gradient(to right, transparent 40%, var(--bg-main) 100%);
          }
          .aitool-row--alternate .aitool-row__image-overlay {
            background: linear-gradient(to left, transparent 40%, var(--bg-main) 100%);
          }
        }

        /* Counter Step Index Badge */
        .aitool-row__badge {
          position: absolute;
          top: 18px;
          left: 18px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
          background: var(--card-accent);
          box-shadow: 0 4px 14px color-mix(in srgb, var(--card-accent) 35%, transparent);
          z-index: 4;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .aitool-row:hover .aitool-row__badge {
          transform: translateY(-2px);
        }

        /* ===== Layout Structural Content Architecture ===== */
        .aitool-row__content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 32px;
          justify-content: center;
          z-index: 2;
        }

        .aitool-row__meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .aitool-row__icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: color-mix(in srgb, var(--card-accent) 8%, var(--bg-main));
          color: var(--card-accent);
          border: 1px solid color-mix(in srgb, var(--card-accent) 15%, transparent);
          transition: background 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .aitool-row:hover .aitool-row__icon-wrap {
          transform: scale(1.05);
          background: color-mix(in srgb, var(--card-accent) 14%, var(--bg-main));
        }

        .aitool-row__tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--card-accent);
        }

        .aitool-row__title {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.25;
          color: var(--text-dark);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .aitool-row__desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--text-medium);
          margin: 0;
          max-width: 620px;
        }

        /* Horizontally Aligned Detail Pills */
        .aitool-row__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .aitool-row__pill {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 100px;
          background: color-mix(in srgb, var(--border) 25%, var(--bg-light));
          border: 1px solid var(--border);
          color: var(--text-medium);
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }

        .aitool-row__pill:hover {
          background: color-mix(in srgb, var(--card-accent) 6%, var(--bg-main));
          border-color: color-mix(in srgb, var(--card-accent) 30%, var(--border));
          color: var(--card-accent);
        }

        /* ===== Call To Action Section Block ===== */
        .aitool-row__cta-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 24px 32px;
          border-top: 1px solid var(--border);
          z-index: 2;
        }

        @media (min-width: 768px) {
          .aitool-row__cta-wrap {
            border-top: none;
            justify-content: center;
            padding: 0 40px;
          }
          .aitool-row:not(.aitool-row--alternate) .aitool-row__cta-wrap {
            border-left: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
          }
          .aitool-row--alternate .aitool-row__cta-wrap {
            border-right: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
          }
        }

        .aitool-row__cta {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          flex-direction: row;
        }

        @media (min-width: 768px) {
          .aitool-row__cta {
            flex-direction: column;
            gap: 10px;
          }
        }

        .aitool-row__cta-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--border) 40%, var(--bg-light));
          border: 1px solid var(--border);
          color: var(--text-medium);
          transition: background 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .aitool-row:hover .aitool-row__cta-icon {
          background: var(--card-accent);
          border-color: var(--card-accent);
          color: #ffffff;
          transform: scale(1.05);
        }

        .aitool-row:not(.aitool-row--alternate):hover .aitool-row__cta-icon {
          transform: translateX(2px) scale(1.05);
        }
        .aitool-row--alternate:hover .aitool-row__cta-icon {
          transform: translateX(-2px) scale(1.05);
        }

        .aitool-row__cta-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-medium);
          transition: color 0.3s;
          white-space: nowrap;
        }

        .aitool-row:hover .aitool-row__cta-label {
          color: var(--card-accent);
        }

        @media (prefers-reduced-motion: reduce) {
          .aitool-row, .aitool-row * {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Layered Organic Blurs */}
      <div className="aitools-ambient-glow">
        <div className="aitools-blob-1" />
        <div className="aitools-blob-2" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[1]">

        {/* Section Header */}
        <div className="mb-20 text-center">
          <span
            className="inline-block text-xs font-bold tracking-[0.18em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{
              background: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            AI-Powered Tools
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: "var(--text-dark)" }}
          >
            Everything you need for{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              smarter decisions
            </span>
          </h2>
          <p
            className="mt-5 text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-medium)" }}
          >
            From eligibility checks to budget planning — every AI tool you need
            to plan your study abroad journey, in one place.
          </p>
        </div>

        {/* Cards Processing Stack */}
        <div className="flex flex-col gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isAlternate = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`aitool-row ${isAlternate ? "aitool-row--alternate" : ""}`}
                style={{ "--card-accent": tool.accent }}
                role="link"
                tabIndex={0}
                onClick={() => navigate(tool.to)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(tool.to);
                  }
                }}
                aria-label={`Open ${tool.title}`}
              >
                <div className="aitool-row__accent-line" />
                <div className="aitool-row__wash" />

                {/* Left/Right Media Block */}
                <div className="aitool-row__image-wrap">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="aitool-row__image"
                    loading="lazy"
                  />
                  <div className="aitool-row__image-overlay" />
                  <div className="aitool-row__badge">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Primary Core Information */}
                <div className="aitool-row__content">
                  <div className="aitool-row__meta">
                    <div className="aitool-row__icon-wrap">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                    <span className="aitool-row__tag">{tool.tag}</span>
                  </div>

                  <h3 className="aitool-row__title">{tool.title}</h3>
                  <p className="aitool-row__desc">{tool.description}</p>

                  <div className="aitool-row__pills">
                    {tool.features.map((feature, i) => (
                      <span key={i} className="aitool-row__pill">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive End Boundary CTA */}
                <div className="aitool-row__cta-wrap">
                  <button
                    className="aitool-row__cta"
                    aria-label={`Explore ${tool.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(tool.to);
                    }}
                  >
                    <span className="aitool-row__cta-icon">
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </span>
                    <span className="aitool-row__cta-label">Explore</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AIToolsCards;