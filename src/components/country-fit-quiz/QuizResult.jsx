import { Link } from "react-router-dom";
import { RotateCcw, Crown, ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { destinations as allDestinations } from "../../Data/countryDetails";

const TIERS = [
  { min: 85, label: "Excellent Match", color: "var(--accent-green)" },
  { min: 65, label: "Good Match", color: "var(--primary)" },
  { min: 0, label: "Fair Match", color: "var(--warning)" },
];

function tierFor(score) {
  return TIERS.find((t) => score >= t.min);
}

// The quiz engine's result objects don't carry the same `id` used by
// countryDetails.js / the WorldMap routes, so resolve it here by
// matching on country name (then flag, then a slugified name) instead
// of trusting a dest.id that likely doesn't exist.
function resolveCountryId(dest) {
  if (dest.id) return dest.id;
  const match = allDestinations.find(
    (d) =>
      d.name?.toLowerCase() === dest.country?.toLowerCase() ||
      (dest.flag && d.flag === dest.flag)
  );
  return match?.id || dest.country?.toLowerCase().replace(/\s+/g, "");
}

/* ─── Single boarding-pass destination card (lean) ─── */
function DestinationPass({ dest, rank }) {
  const isTop = rank === 0;
  const countryId = resolveCountryId(dest);
  const code = dest.code || dest.country?.slice(0, 3).toUpperCase();
  const tier = tierFor(dest.matchScore);

  return (
    <div className={`qr-pass ${isTop ? "is-top" : ""}`}>
      {isTop && (
        <div className="qr-pass__crown">
          <Crown size={12} /> Top Match
        </div>
      )}

      <div className="qr-pass__route-line">
        GATE {String(rank + 1).padStart(2, "0")} · IND → {code}
      </div>

      <div className="qr-pass__top">
        <div className="qr-pass__id">
          <span className="qr-pass__flag">{dest.flag}</span>
          <h3 className="qr-pass__name">{dest.country}</h3>
        </div>
        <div className="qr-pass__match" style={{ color: tier.color }}>
          <span className="qr-pass__match-score">{dest.matchScore}%</span>
          <span className="qr-pass__match-label">{tier.label}</span>
        </div>
      </div>

      {dest.strengths?.length > 0 && (
        <div className="qr-pass__points">
          {dest.strengths.slice(0, 2).map((s, i) => (
            <div key={i} className="qr-pass__point">
              <CheckCircle size={15} className="qr-pass__point-icon" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}

      <Link to={`/study-destination/${countryId}`} className="qr-pass__cta">
        <span>Explore {dest.country}</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default function QuizResult({ result = null, onReset }) {
  if (!result) return null;

  const destinations = result.destinations || [];

  return (
    <section className="qr">
      <div className="qr__inner">
        <div className="qr__head">
          <span className="qr__eyebrow">YOUR RESULTS</span>
          <h2 className="qr__title">Your Best-Fit Destinations</h2>
          <p className="qr__sub">Ranked by how your answers matched each country.</p>
        </div>

        <div className="qr__grid">
          {destinations.map((dest, i) => (
            <DestinationPass key={dest.country || i} dest={dest} rank={i} />
          ))}
        </div>

        {result.insights?.length > 0 && (
          <div className="qr-panel">
            <h3 className="qr-panel__title">What Your Answers Reveal</h3>
            <div className="qr-panel__list">
              {result.insights.map((insight, i) => (
                <div key={i} className="qr-panel__row">
                  <ChevronRight size={16} className="qr-panel__row-icon" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.nextSteps?.length > 0 && (
          <div className="qr-panel">
            <h3 className="qr-panel__title">Your Next Steps</h3>
            <div className="qr-panel__steps">
              {result.nextSteps.map((ns, i) => (
                <div key={i} className="qr-panel__step">
                  <span className="qr-panel__step-num">{i + 1}</span>
                  <span>{ns.step || ns}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="qr__reset-row">
          <button onClick={onReset} className="qr__reset">
            <RotateCcw size={16} /> Retake the quiz
          </button>
        </div>
      </div>

      <style>{`
        .qr {
          position: relative;
          background: var(--bg-section);
          padding: 5rem 1.5rem;
          font-family: var(--font-main);
        }

        .qr__inner {
          max-width: 1180px;
          margin: 0 auto;
        }

        .qr__head {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3rem;
        }

        .qr__eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--primary);
          margin-bottom: 0.9rem;
        }

        .qr__title {
          font-size: clamp(1.9rem, 3.8vw, 2.6rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-dark);
          margin: 0 0 0.6rem;
        }

        .qr__sub {
          color: var(--text-light);
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0;
        }

        .qr__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        /* ===== Lean boarding-pass card ===== */
        .qr-pass {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: var(--bg-main);
          box-shadow: var(--shadow-sm);
          padding: 1.5rem;
          transition: var(--transition);
        }

        .qr-pass:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: color-mix(in srgb, var(--primary) 30%, var(--border));
        }

        .qr-pass.is-top {
          border-color: var(--primary);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary) 25%, transparent), var(--shadow-md);
        }

        .qr-pass__crown {
          position: absolute;
          top: -13px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--gradient-primary);
          color: var(--white);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 5px 13px;
          border-radius: 100px;
        }

        .qr-pass__route-line {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-light);
          margin-bottom: 0.9rem;
        }

        .qr-pass__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.1rem;
        }

        .qr-pass__id {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .qr-pass__flag { font-size: 1.9rem; line-height: 1; }

        .qr-pass__name {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0;
        }

        .qr-pass__match {
          text-align: right;
          flex-shrink: 0;
        }

        .qr-pass__match-score {
          display: block;
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.1;
        }

        .qr-pass__match-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .qr-pass__points {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-bottom: 1.3rem;
        }

        .qr-pass__point {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.92rem;
          color: var(--text-medium);
        }

        .qr-pass__point span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .qr-pass__point-icon {
          color: var(--accent-green);
          flex-shrink: 0;
        }

        .qr-pass__cta {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--gradient-primary);
          color: var(--white);
          font-weight: 600;
          font-size: 0.92rem;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
        }

        .qr-pass__cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px color-mix(in srgb, var(--accent-green) 25%, transparent);
        }

        /* ===== Panels: insights + next steps ===== */
        .qr-panel {
          background: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.75rem 1.9rem;
          margin-bottom: 1.25rem;
        }

        .qr-panel__title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0 0 1.1rem;
        }

        .qr-panel__list,
        .qr-panel__steps {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .qr-panel__row,
        .qr-panel__step {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 1rem;
          color: var(--text-medium);
        }

        .qr-panel__row span,
        .qr-panel__step span:last-child {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .qr-panel__row-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        .qr-panel__step-num {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: var(--white);
          font-size: 0.78rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .qr__reset-row {
          text-align: center;
          margin-top: 2rem;
        }

        .qr__reset {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border);
          background: var(--bg-main);
          color: var(--text-medium);
          font-size: 15px;
          font-weight: 600;
          font-family: var(--font-main);
          cursor: pointer;
          transition: var(--transition);
        }

        .qr__reset:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        @media (max-width: 560px) {
          .qr__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}