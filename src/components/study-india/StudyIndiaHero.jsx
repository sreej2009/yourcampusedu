import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, GraduationCap, Landmark, Ticket } from "lucide-react";
import heroBackground from "../../assets/images/studyindia_hero.png";

const stats = [
  { label: "Institutes Mapped", value: "1,400+", icon: Landmark },
  { label: "States Covered", value: "28", icon: MapPin },
  { label: "Avg. Cost vs Abroad", value: "72%", icon: GraduationCap },
];

const headlineLines = [
  { text: "Every State.", accent: false },
  { text: "One Campus Search.", accent: true },
];

const lineVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function StudyIndiaHero() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-32"
      style={{ fontFamily: "var(--font-main)" }}
    >
      {/* background image — same treatment as AIToolsHero */}
      <img
        src={heroBackground}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(248,245,255,0.65) 0%, rgba(243,238,255,0.55) 50%, rgba(255,255,255,0.45) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{
            background: "color-mix(in srgb, var(--accent-green) 16%, transparent)",
            color: "var(--primary-dark)",
            border: "1px solid color-mix(in srgb, var(--accent-green) 45%, transparent)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <Ticket size={14} style={{ color: "var(--accent-green)" }} />
          Domestic Admissions Desk
        </motion.span>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)",
            fontWeight: 700,
            lineHeight: 1.14,
            letterSpacing: "-0.01em",
          }}
        >
          {headlineLines.map((line, i) => (
            <motion.span
              key={line.text}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="block"
              style={
                line.accent
                  ? {
                      backgroundImage: "var(--gradient-primary)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }
                  : { color: "var(--primary-dark)" }
              }
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl"
          style={{ color: "var(--text-medium)", fontSize: "1rem", lineHeight: 1.75 }}
        >
          Compare NIRF-ranked colleges, real fee ranges, and placement data
          across every state — built for students who want a world-class
          degree without leaving home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            className="group flex items-center gap-2 rounded-full px-7 py-3.5 transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--gradient-primary)",
              color: "var(--text-white)",
              boxShadow: "var(--shadow-md)",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            Explore Colleges
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            className="rounded-full px-7 py-3.5 transition-colors"
            style={{
              color: "var(--primary-dark)",
              border: "1px solid color-mix(in srgb, var(--primary-dark) 35%, transparent)",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            Take the Fit Quiz
          </button>
        </motion.div>

        {/* stat row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-5"
        >
          {stats.map(({ label, value, icon: Icon }, i) => (
            <div key={label} className="flex items-center gap-3">
              {i !== 0 && (
                <span
                  className="hidden h-8 w-px sm:block"
                  style={{ background: "color-mix(in srgb, var(--primary-dark) 18%, transparent)" }}
                />
              )}
              <Icon size={18} style={{ color: "var(--accent-green)" }} />
              <div className="text-left">
                <span
                  className="block"
                  style={{ color: "var(--primary-dark)", fontSize: "1.25rem", fontWeight: 700 }}
                >
                  {value}
                </span>
                <span
                  className="block"
                  style={{ color: "var(--text-medium)", fontSize: "0.72rem", fontWeight: 500 }}
                >
                  {label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}