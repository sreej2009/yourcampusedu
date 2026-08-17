/**
 * quizMatchEngine.js
 * Client-side scoring engine for the Education Fit Quiz.
 * No API calls — ranks real countries from `countryDetails.js` against the
 * student's 10 quiz answers using a weighted rules engine.
 */

import { destinations, origin } from "./countryDetails";

/* ─── Classify each country into a cost/profile tier via its tagline ───
 * (countryDetails.js groups every country's tagline into one of 4 fixed
 * strings, so this is a reliable, cheap way to bucket them.) */
function getTier(country) {
  switch (country.tagline) {
    case "Established academic reputation with a comfortable cost-to-quality balance.":
      return "established";
    case "Low-to-no tuition public universities, strong research culture.":
      return "lowTuition";
    case "A niche, small-scale study option within the Schengen area.":
      return "niche";
    default:
      return "affordable";
  }
}

/* ─── Deterministic tie-breaker so same-tier countries with identical
 * placeholder stats don't always resolve in the same alphabetical order ─── */
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/* ─── Weight tables — how much each answer favours each tier ─── */
const BUDGET_WEIGHTS = {
  "Very budget-conscious":             { affordable: 18, lowTuition: 20, established: 0,  niche: -6 },
  "Moderate budget with loan option":  { affordable: 12, lowTuition: 14, established: 10, niche: -2 },
  "Comfortable, budget flexible":      { affordable: 6,  lowTuition: 8,  established: 16, niche: 4  },
  "Seeking free/low-cost tuition":     { affordable: 10, lowTuition: 22, established: -4, niche: -6 },
};

const CAREER_WEIGHTS = {
  "Strong PR / immigration pathway":              { affordable: 4, lowTuition: 16, established: 8,  niche: -4 },
  "Prestige and academic ranking":                { affordable: 2, lowTuition: 6,  established: 18, niche: 0  },
  "Return to India with global experience":       { affordable: 8, lowTuition: 8,  established: 10, niche: 0  },
  "Highest earning potential":                    { affordable: 4, lowTuition: 10, established: 14, niche: -2 },
};

const WORKSTYLE_WEIGHTS = {
  "Must work part-time to fund studies": { affordable: 10, lowTuition: 8,  established: 0,  niche: -4 },
  "Part-time work is a bonus":           { affordable: 4,  lowTuition: 4,  established: 4,  niche: 0  },
  "No need to work part-time":           { affordable: 0,  lowTuition: 2,  established: 6,  niche: 4  },
  "Post-study work visa is the priority":{ affordable: 2,  lowTuition: 14, established: 6,  niche: -6 },
};

const DURATION_WEIGHTS = {
  "1-year intensive program":       { affordable: 2, lowTuition: 6,  established: 8,  niche: 0  },
  "2-year Master's program":        { affordable: 4, lowTuition: 10, established: 10, niche: 0  },
  "3-4 year Bachelor's program":    { affordable: 8, lowTuition: 2,  established: 2,  niche: 0  },
  "PhD or long-term research track":{ affordable: 0, lowTuition: 12, established: 6,  niche: -2 },
};

const RISK_WEIGHTS = {
  "High adaptability, embraces challenges":    { affordable: 8, lowTuition: 4,  established: 0,  niche: 6  },
  "Prefers structured support systems":        { affordable: 0, lowTuition: 6,  established: 10, niche: -4 },
  "Moderate adaptability":                     { affordable: 4, lowTuition: 4,  established: 4,  niche: 0  },
  "Wants existing Indian community support":   { affordable: 2, lowTuition: 8,  established: 10, niche: -8 },
};

const LIFESTYLE_WEIGHTS = {
  "Safety and security":        { affordable: 0, lowTuition: 10, established: 8,  niche: 2  },
  "Cultural diversity":         { affordable: 4, lowTuition: 4,  established: 10, niche: -2 },
  "Nature and outdoor access":  { affordable: 0, lowTuition: 12, established: 2,  niche: 4  },
  "Nightlife and entertainment":{ affordable: 4, lowTuition: 0,  established: 10, niche: -4 },
};

const FIELD_TIER_WEIGHTS = {
  "Technology and engineering":    { affordable: 10, lowTuition: 16, established: 4,  niche: -4 },
  "Business and finance":          { affordable: 12, lowTuition: 4,  established: 16, niche: 0  },
  "Healthcare and life sciences":  { affordable: 16, lowTuition: 6,  established: 4,  niche: -2 },
  "Creative and humanities fields":{ affordable: 0,  lowTuition: 0,  established: 12, niche: 14 },
};

const FIELD_KEYWORDS = {
  "Technology and engineering":     ["Computer Science", "Engineering"],
  "Business and finance":           ["Business", "Finance"],
  "Healthcare and life sciences":   ["Medicine"],
  "Creative and humanities fields": ["Design", "Liberal Arts", "Diplomacy", "Hospitality"],
};

const WATCH_OUT = {
  affordable:  "Rankings are still building compared to Western Europe — double-check accreditation for your specific field.",
  established: "Higher cost of living than the tuition figure alone suggests — budget for housing and daily expenses too.",
  lowTuition:  "Low tuition doesn't mean low cost — factor in proof-of-funds requirements and cold-climate living costs.",
  niche:       "Very limited seats and programme choice — only worth it if a specific course is an exact match.",
  india:       "Entrance exams are highly competitive and seats at top institutes are limited.",
};

function scoreDestination(country, answers) {
  const tier = getTier(country);
  let score = 60;

  const applyWeights = (table, answerKey) => {
    const w = table[answers[answerKey]];
    if (w && typeof w[tier] === "number") score += w[tier];
  };

  applyWeights(BUDGET_WEIGHTS, "budgetComfort");
  applyWeights(CAREER_WEIGHTS, "careerPriority");
  applyWeights(WORKSTYLE_WEIGHTS, "workStyle");
  applyWeights(DURATION_WEIGHTS, "duration");
  applyWeights(RISK_WEIGHTS, "riskComfort");
  applyWeights(LIFESTYLE_WEIGHTS, "lifestylePriority");

  const fieldTierWeights = FIELD_TIER_WEIGHTS[answers.fieldType];
  if (fieldTierWeights && typeof fieldTierWeights[tier] === "number") {
    score += fieldTierWeights[tier];
  }
  const fieldKeywords = FIELD_KEYWORDS[answers.fieldType];
  if (fieldKeywords && country.topFields?.some((f) => fieldKeywords.includes(f))) {
    score += 6;
  }

  // small deterministic variety so identical-tier countries don't tie forever
  score += hashString(country.id + JSON.stringify(answers)) % 7;

  return Math.min(99, Math.max(60, score));
}

function scoreIndia(answers) {
  let score = 55;
  if (answers.careerPriority === "Return to India with global experience") score += 30;
  if (answers.budgetComfort === "Very budget-conscious") score += 12;
  if (answers.budgetComfort === "Seeking free/low-cost tuition") score += 10;
  if (answers.riskComfort === "Wants existing Indian community support") score += 15;
  if (answers.riskComfort === "Prefers structured support systems") score += 8;
  if (answers.socialStyle === "Small close-knit friend groups") score += 4;
  if (answers.workStyle === "No need to work part-time") score += 4;
  score += hashString("india" + JSON.stringify(answers)) % 5;
  return Math.min(99, Math.max(40, score));
}

function buildReason(country, answers, tier) {
  const tierPhrase = {
    affordable:  "an affordable, fast-growing English-taught system",
    established: "a well-ranked, established higher-education system",
    lowTuition:  "low-to-no tuition public universities and strong post-study work rights",
    niche:       "a small but focused programme selection",
  }[tier];

  const fields = country.topFields?.slice(0, 2).join(" and ") || "its core programmes";

  return `You leaned toward ${answers.careerPriority?.toLowerCase()} on a ${answers.budgetComfort?.toLowerCase()} budget — ${country.name} offers ${tierPhrase}, with strengths in ${fields}.`;
}

const ARCHETYPES = {
  "Strong PR / immigration pathway":        { emoji: "🛂", title: "The Settler-Strategist" },
  "Prestige and academic ranking":          { emoji: "🏆", title: "The Prestige Seeker" },
  "Return to India with global experience": { emoji: "🌏", title: "The Global Bridge-Builder" },
  "Highest earning potential":              { emoji: "💰", title: "The ROI Maximizer" },
};

function buildArchetype(answers) {
  const base = ARCHETYPES[answers.careerPriority] || { emoji: "🎯", title: "The Determined Explorer" };
  return {
    emoji: base.emoji,
    title: base.title,
    description: `You're drawn to ${answers.fieldType?.toLowerCase()}, prioritise ${answers.careerPriority?.toLowerCase()}, and describe your budget as ${answers.budgetComfort?.toLowerCase()}.`,
    traits: [answers.careerPriority, answers.fieldType, answers.riskComfort, answers.lifestylePriority].filter(Boolean),
  };
}

function buildInsights(answers) {
  const list = [];
  if (answers.pace && answers.lifestylePriority) {
    list.push(`You want daily life to feel "${answers.pace.toLowerCase()}" while prioritising ${answers.lifestylePriority.toLowerCase()} — that says as much about where you'll settle as any ranking does.`);
  }
  if (answers.socialStyle) {
    list.push(`Your answer on socialising — "${answers.socialStyle.toLowerCase()}" — matters just as much as academics for how fast you'll adjust abroad.`);
  }
  if (answers.riskComfort) {
    list.push(`You described your comfort with new environments as "${answers.riskComfort.toLowerCase()}", which shapes how much built-in support you'll want before you land.`);
  }
  if (answers.climate) {
    list.push(`A preference for "${answers.climate.toLowerCase()}" is worth taking seriously — weather affects day-to-day mood more than most students expect.`);
  }
  return list;
}

const NEXT_STEPS = [
  { step: "Shortlist 2-3 programmes", detail: "Pick specific courses at your top-matched destinations and compare entry requirements side by side." },
  { step: "Check eligibility & English proficiency needs", detail: "Confirm IELTS/TOEFL requirements and academic prerequisites for each shortlisted programme." },
  { step: "Book a free counselling session", detail: "Talk to a counsellor to stress-test this shortlist against your real budget and timeline." },
];

/* ─── Main entry point ─── */
export function getQuizMatch(answers) {
  const scored = destinations
    // drop micro-states with no real international student population —
    // same guidance already flagged in countryDetails.js
    .filter((c) => c.visaRate !== "N/A")
    .map((c) => {
      const tier = getTier(c);
      return {
        country: c.name,
        flag: c.flag,
        matchScore: scoreDestination(c, answers),
        reason: buildReason(c, answers, tier),
        strengths: [
          `${c.quickStats.topUniversities} universities to choose from`,
          `${c.quickStats.internationalStudents} international students`,
          `Typical visa success rate: ${c.visaRate}`,
        ],
        watchOut: WATCH_OUT[tier],
      };
    });

  scored.push({
    country: "India (Domestic)",
    flag: origin.flag,
    matchScore: scoreIndia(answers),
    reason: `You leaned toward ${answers.careerPriority?.toLowerCase()} — staying in India keeps you close to family, cuts costs, and skips the visa process entirely.`,
    strengths: ["Most affordable option overall", "Close to family and support systems", "No visa process or relocation risk"],
    watchOut: WATCH_OUT.india,
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);

  return {
    archetype: buildArchetype(answers),
    destinations: scored.slice(0, 4),
    insights: buildInsights(answers),
    nextSteps: NEXT_STEPS,
  };
}