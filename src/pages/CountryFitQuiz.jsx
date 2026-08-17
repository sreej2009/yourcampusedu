import { useState, useRef } from "react";
import { getQuizMatch } from "../data/quizMatchEngine";

import QuizHero      from "../components/country-fit-quiz/QuizHero";
import QuizQuestions from "../components/country-fit-quiz/QuizQuestions";
import QuizResult    from "../components/country-fit-quiz/QuizResult";
import QuizLoading   from "../components/country-fit-quiz/QuizLoading";
import QuizCTA       from "../components/country-fit-quiz/QuizCTA";

/* ─── Page ─── */
export default function EducationFitQuiz() {
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [hasResult, setHasResult] = useState(false);

  const resultRef = useRef(null);

  const handleComplete = (answers) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setHasResult(false);

    // No backend — matching runs entirely client-side against countryDetails.js.
    // The delay just lets QuizLoading's steps play out (6 steps x 600ms) instead
    // of snapping straight to the result.
    setTimeout(() => {
      try {
        const data = getQuizMatch(answers);
        setResult(data);
        setHasResult(true);
      } catch (err) {
        console.error("Quiz match error:", err);
        setError("Something went wrong while matching your answers. Please try again.");
      } finally {
        setLoading(false);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }, 3600);
  };

  const handleReset = () => {
    setResult(null);
    setHasResult(false);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <QuizHero />

      {!hasResult && !loading && !error && (
        <QuizQuestions onComplete={handleComplete} />
      )}

      {loading && <QuizLoading />}

      <div ref={resultRef}>
        {error && !loading && (
          <section style={{ fontFamily: "var(--font-main)", padding: "64px 24px", background: "var(--bg-light)", textAlign: "center" }}>
            <div style={{ maxWidth: "500px", margin: "0 auto", background: "#fff", border: "1px solid #ffc8c8", borderRadius: "var(--radius-lg)", padding: "36px 40px", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#fff1f1", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-dark)", marginBottom: "8px" }}>Something went wrong</h3>
              <p style={{ color: "var(--text-medium)", fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>{error}</p>
              <button onClick={handleReset}
                style={{ padding: "12px 28px", borderRadius: "var(--radius-md)", border: "none", background: "var(--gradient-secondary)", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "var(--font-main)", cursor: "pointer" }}>
                Try Again
              </button>
            </div>
          </section>
        )}

        {!loading && hasResult && (
          <QuizResult result={result} onReset={handleReset} />
        )}
      </div>

      <QuizCTA />
    </>
  );
}