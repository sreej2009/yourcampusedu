// Central data for the MBBS Abroad landing page.
// Country-specific deep-dive content lives in countryDetails.js and universitiesData.js.

export const mbbsCountries = [
  {
    slug: "georgia",
    name: "Georgia",
    code: "GE",
    accent: "var(--accent-blue)",
    tagline: "Europe's gateway to affordable MBBS",
    fees: "₹18L – ₹28L",
    duration: "6 Years",
    medium: "English",
    neet: "NEET Qualified",
    // Route strip: nearest Indian hub -> destination capital airport (IATA codes)
    originCode: "CJB",
    destCode: "TBS",
    destCity: "Tbilisi",
    // Drop a photo at src/assets/countries/georgia.jpg (see getCountryImage in TopCountries.jsx)
    image: "georgia",
    highlights: ["NMC & WHO Approved", "No Donation, No Capitation Fee", "European Clinical Exposure"],
  },
  {
    slug: "uzbekistan",
    name: "Uzbekistan",
    code: "UZ",
    accent: "var(--accent-green)",
    tagline: "Central Asia's trusted medical hub",
    fees: "₹15L – ₹22L",
    duration: "5+1 Years",
    medium: "English",
    neet: "NEET Qualified",
    originCode: "CJB",
    destCode: "TAS",
    destCity: "Tashkent",
    image: "uzbekistan",
    highlights: ["NMC & WHO Approved", "Lowest Living Cost", "Large Indian Student Community"],
  },
  {
    slug: "tajikistan",
    name: "Tajikistan",
    code: "TJ",
    accent: "var(--extra-orange)",
    tagline: "Budget-friendly with direct admission",
    fees: "₹12L – ₹18L",
    duration: "5+1 Years",
    medium: "English",
    neet: "NEET Qualified",
    originCode: "CJB",
    destCode: "DYU",
    destCity: "Dushanbe",
    image: "tajikistan",
    highlights: ["NMC & WHO Approved", "No IELTS/TOEFL Required", "Direct Admission, No Entrance Test"],
  },
];

export const whyMbbsAbroadPoints = [
  {
    icon: "BadgeCheck",
    title: "NMC & WHO Recognised",
    description: "Every university we recommend is listed with the National Medical Commission and WHO, so your degree is valid for practice in India.",
  },
  {
    icon: "Wallet",
    title: "No Donation or Capitation Fee",
    description: "Admission is on merit and NEET score alone — total course cost is a fraction of private colleges in India.",
  },
  {
    icon: "Languages",
    title: "English-Medium Instruction",
    description: "All MBBS programmes are taught entirely in English, with no local language requirement for admission.",
  },
  {
    icon: "Stethoscope",
    title: "Early Clinical Exposure",
    description: "Hospital postings and practical training begin from the early years, ahead of many Indian curricula.",
  },
  {
    icon: "ShieldCheck",
    title: "Safe for Indian Students",
    description: "Established Indian student communities, dedicated hostels, and Indian food options across all our partner campuses.",
  },
  {
    icon: "FileCheck2",
    title: "FMGE / NExT Ready",
    description: "Curriculum and mentoring are aligned to India's licensing exam so you graduate ready to practise back home.",
  },
];

export const admissionSteps = [
  {
    step: 1,
    title: "Free Counselling & Country Shortlist",
    description: "Share your NEET score and budget — we shortlist the right country and university for you.",
  },
  {
    step: 2,
    title: "Document Verification",
    description: "10th, 12th mark sheets, NEET scorecard and passport are checked against the university's admission list.",
  },
  {
    step: 3,
    title: "University Application & Offer Letter",
    description: "We submit your application directly to the university and secure your official offer letter.",
  },
  {
    step: 4,
    title: "Visa Processing",
    description: "Our team prepares your student visa file and schedules your embassy appointment.",
  },
  {
    step: 5,
    title: "Departure & Onboarding",
    description: "Pre-departure briefing, flight booking assistance, and airport pickup on arrival at campus.",
  },
];

export const mbbsFaqs = [
  {
    question: "Is an MBBS degree from Georgia, Uzbekistan or Tajikistan valid in India?",
    answer: "Yes. All universities we work with are recognised by the National Medical Commission (NMC) and listed with the WHO, which is the requirement for a foreign MBBS degree to be valid for practice in India after clearing the FMGE/NExT exam.",
  },
  {
    question: "What NEET score do I need for MBBS abroad?",
    answer: "You need a qualifying NEET score as per NMC norms. Unlike Indian private colleges, admission abroad is not merit-rank dependent — a qualifying score is generally sufficient for direct admission.",
  },
  {
    question: "How much does MBBS abroad cost compared to India?",
    answer: "Total cost including tuition and living expenses typically ranges from ₹12L to ₹28L for the full course, against ₹60L–₹1.2Cr at private medical colleges in India.",
  },
  {
    question: "Do I need to clear IELTS or TOEFL?",
    answer: "No. None of our partner universities require an English proficiency test for MBBS admission — instruction is in English from day one.",
  },
  {
    question: "Can I practise in India after graduating abroad?",
    answer: "Yes, after clearing the FMGE (soon to be NExT) licensing exam, which is mandatory for all foreign medical graduates before registering to practise in India.",
  },
];