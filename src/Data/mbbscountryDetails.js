// Deep-dive content for each MBBS-abroad country page.
// Keyed by slug, matched against the :countrySlug route param.

export const countryDetails = {
  georgia: {
    slug: "georgia",
    name: "Georgia",
    code: "GE",
    capital: "Tbilisi",
    accent: "var(--accent-blue)",
    tagline: "Study MBBS in Georgia",
    heroDescription:
      "A European-recognised medical degree at a fraction of the cost, with modern teaching hospitals and a growing Indian student community across Tbilisi, Kutaisi and Batumi.",
    stats: {
      fees: "₹18L – ₹28L",
      duration: "6 Years",
      medium: "English",
      intake: "September & February",
    },
    whyChoose: [
      { icon: "Landmark", title: "European Standard Education", description: "Curriculum aligned with EU medical education standards and modern simulation labs." },
      { icon: "PlaneTakeoff", title: "Short Flight from India", description: "Direct and one-stop flights from Delhi and Mumbai, roughly 5-6 hours." },
      { icon: "ShieldCheck", title: "Low Crime, High Safety", description: "Georgia consistently ranks among the safest countries in the region for international students." },
      { icon: "Wallet", title: "Affordable Living", description: "Monthly living costs of ₹15,000–₹20,000 including hostel and food." },
    ],
    eligibility: {
      academic: "50% aggregate in PCB in 10+2 (40% for reserved categories)",
      neet: "Qualifying NEET score, as per NMC eligibility norms",
      age: "Minimum 17 years at the time of admission",
      documents: ["10th & 12th Mark Sheets", "NEET Scorecard", "Passport (valid 2+ years)", "Passport-size photographs", "Medical fitness certificate"],
    },
  },

  uzbekistan: {
    slug: "uzbekistan",
    name: "Uzbekistan",
    code: "UZ",
    capital: "Tashkent",
    accent: "var(--accent-green)",
    tagline: "Study MBBS in Uzbekistan",
    heroDescription:
      "One of the most established MBBS-abroad destinations for Indian students, with decades-old medical universities, low fees, and a large existing Indian community in Tashkent and Samarkand.",
    stats: {
      fees: "₹15L – ₹22L",
      duration: "5+1 Years",
      medium: "English",
      intake: "September",
    },
    whyChoose: [
      { icon: "Users", title: "Large Indian Community", description: "Thousands of Indian students already enrolled, with dedicated support networks and Indian eateries." },
      { icon: "Building2", title: "Decades of Legacy", description: "Medical universities established over 80 years ago, with strong government affiliation." },
      { icon: "Wallet", title: "Lowest Cost of Living", description: "Among the most budget-friendly MBBS destinations, with living costs from ₹10,000/month." },
      { icon: "Stethoscope", title: "Hospital-Integrated Campuses", description: "Universities are directly attached to teaching hospitals for hands-on clinical exposure." },
    ],
    eligibility: {
      academic: "50% aggregate in PCB in 10+2 (40% for reserved categories)",
      neet: "Qualifying NEET score, as per NMC eligibility norms",
      age: "Minimum 17 years at the time of admission",
      documents: ["10th & 12th Mark Sheets", "NEET Scorecard", "Passport (valid 2+ years)", "Passport-size photographs", "Medical fitness certificate"],
    },
  },

  tajikistan: {
    slug: "tajikistan",
    name: "Tajikistan",
    code: "TJ",
    capital: "Dushanbe",
    accent: "var(--extra-orange)",
    tagline: "Study MBBS in Tajikistan",
    heroDescription:
      "The most budget-conscious option among our MBBS-abroad destinations, with direct admission, no entrance test, and a curriculum designed around the Indian FMGE syllabus.",
    stats: {
      fees: "₹12L – ₹18L",
      duration: "5+1 Years",
      medium: "English",
      intake: "September",
    },
    whyChoose: [
      { icon: "Wallet", title: "Most Affordable Option", description: "The lowest total course cost among our three partner countries, with no hidden charges." },
      { icon: "FileCheck2", title: "Direct Admission", description: "No entrance exam or interview — admission is confirmed on document verification alone." },
      { icon: "GraduationCap", title: "FMGE-Aligned Curriculum", description: "Coursework is structured with India's licensing exam requirements in mind from year one." },
      { icon: "Home", title: "Dedicated International Hostels", description: "Separate hostel blocks for international students with 24/7 security and Indian mess facilities." },
    ],
    eligibility: {
      academic: "50% aggregate in PCB in 10+2 (40% for reserved categories)",
      neet: "Qualifying NEET score, as per NMC eligibility norms",
      age: "Minimum 17 years at the time of admission",
      documents: ["10th & 12th Mark Sheets", "NEET Scorecard", "Passport (valid 2+ years)", "Passport-size photographs", "Medical fitness certificate"],
    },
  },
};

export const getCountryBySlug = (slug) => countryDetails[slug] ?? null;