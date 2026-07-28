// src/data/countryDetails.js
// Per-country content for the Country Details page (/study-abroad/:countrySlug).
// Keyed by the same `id` used in studyDestination.js so navigation from the
// Study Destinations page/world map drops straight into the right record.

const countryDetails = {
  usa: {
    id: "usa",
    code: "USA",
    flag: "🇺🇸",
    name: "United States",
    gate: "GATE 01",
    heroImage:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1920&auto=format&fit=crop",
    description:
      "Home to over 4,000 accredited campuses, the US offers the widest range of majors on earth — from Ivy League research labs to specialist STEM schools. Optional Practical Training extends every degree into real work experience.",
    quickStats: {
      topUniversities: "150+",
      internationalStudents: "1M+",
      avgTuition: "₹35–55L /yr",
      popularIntake: "Fall (Aug–Sep)",
    },
  },
  uk: {
    id: "uk",
    code: "UK",
    flag: "🇬🇧",
    name: "United Kingdom",
    gate: "GATE 02",
    heroImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1920&auto=format&fit=crop",
    description:
      "One-year Master's programmes mean less time out of the workforce and lower total spend, without trading down on prestige — centuries-old institutions sit alongside modern research powerhouses across every major city.",
    quickStats: {
      topUniversities: "130+",
      internationalStudents: "600K+",
      avgTuition: "₹28–42L /yr",
      popularIntake: "Sept / Jan",
    },
  },
  canada: {
    id: "canada",
    code: "CAN",
    flag: "🇨🇦",
    name: "Canada",
    gate: "GATE 03",
    heroImage:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1920&auto=format&fit=crop",
    description:
      "Post-Graduation Work Permits of up to three years and a clear route to PR make Canada the most settle-friendly gate on this board — paired with tuition well below US and UK equivalents.",
    quickStats: {
      topUniversities: "100+",
      internationalStudents: "800K+",
      avgTuition: "₹22–35L /yr",
      popularIntake: "Fall / Winter",
    },
  },
  australia: {
    id: "australia",
    code: "AUS",
    flag: "🇦🇺",
    name: "Australia",
    gate: "GATE 04",
    heroImage:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1920&auto=format&fit=crop",
    description:
      "Ranked campuses in Sydney, Melbourne and Brisbane pair with a two-to-four-year post-study work visa — one of the most generous on offer — and a student community that already runs 700,000 strong.",
    quickStats: {
      topUniversities: "90+",
      internationalStudents: "700K+",
      avgTuition: "₹25–38L /yr",
      popularIntake: "Feb / July",
    },
  },
  germany: {
    id: "germany",
    code: "GER",
    flag: "🇩🇪",
    name: "Germany",
    gate: "GATE 05",
    heroImage:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1920&auto=format&fit=crop",
    description:
      "Public universities charge little to no tuition even for international students, and engineering degrees here carry weight at Bosch, Siemens and every automotive floor in Europe.",
    quickStats: {
      topUniversities: "120+",
      internationalStudents: "400K+",
      avgTuition: "₹8–18L /yr",
      popularIntake: "Oct / April",
    },
  },
  ireland: {
    id: "ireland",
    code: "IRL",
    flag: "🇮🇪",
    name: "Ireland",
    gate: "GATE 06",
    heroImage:
      "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=1920&auto=format&fit=crop",
    description:
      "Europe's tech capital — Google, Meta and Stripe all run their EU headquarters from Dublin, putting graduates a short commute from the campuses that feed them.",
    quickStats: {
      topUniversities: "40+",
      internationalStudents: "35K+",
      avgTuition: "₹20–30L /yr",
      popularIntake: "Sept / Jan",
    },
  },
  newzealand: {
    id: "newzealand",
    code: "NZ",
    flag: "🇳🇿",
    name: "New Zealand",
    gate: "GATE 07",
    heroImage:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=1920&auto=format&fit=crop",
    description:
      "Small class sizes and a calm, predictable visa process make New Zealand a low-stress route into a Western degree — with post-study work rights attached to almost every qualification.",
    quickStats: {
      topUniversities: "25+",
      internationalStudents: "80K+",
      avgTuition: "₹20–30L /yr",
      popularIntake: "Feb / July",
    },
  },
  singapore: {
    id: "singapore",
    code: "SGP",
    flag: "🇸🇬",
    name: "Singapore",
    gate: "GATE 08",
    heroImage:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1920&auto=format&fit=crop",
    description:
      "Four hours from Coimbatore and home to Asia's highest-ranked campuses, Singapore puts a globally respected degree within a short flight and a familiar time zone.",
    quickStats: {
      topUniversities: "30+",
      internationalStudents: "50K+",
      avgTuition: "₹18–28L /yr",
      popularIntake: "Jan / Aug",
    },
  },
};

export default countryDetails;