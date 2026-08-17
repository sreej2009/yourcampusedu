// University listings for each MBBS-abroad country.
// Keyed by country slug to match countryDetails.js.
//
// `logo` — just drop your downloaded logo image into
// /public/assets/universities/ and update the path here.
// This consultancy only offers MBBS abroad, so every card carries
// a single "MBBS" tag plus the medium of instruction.

export const universitiesByCountry = {
  georgia: [
    {
      name: "Tbilisi State Medical University",
      city: "Tbilisi",
      established: 1918,
      fees: "₹24L (Full Course)",
      intake: "Sept",
      language: "English",
      logo: "/assets/universities/tbilisi-state-medical.png",
    },
    {
      name: "David Tvildiani Medical University",
      city: "Tbilisi",
      established: 1990,
      fees: "₹26L (Full Course)",
      intake: "Sept",
      language: "English",
      logo: "/assets/universities/david-tvildiani.png",
    },
    {
      name: "Batumi Shota Rustaveli State University",
      city: "Batumi",
      established: 1945,
      fees: "₹19L (Full Course)",
      intake: "Sept",
      language: "English",
      logo: "/assets/universities/batumi-state.png",
    },
  ],

  uzbekistan: [
    {
      name: "Tashkent Medical Academy",
      city: "Tashkent",
      established: 1919,
      fees: "₹20L (Full Course)",
      intake: "Sept",
      language: "English",
      logo: "/assets/universities/tashkent-medical.png",
    },
    {
      name: "Samarkand State Medical University",
      city: "Samarkand",
      established: 1930,
      fees: "₹17L (Full Course)",
      intake: "Sept",
      language: "English",
      logo: "/assets/universities/samarkand-state.png",
    },
    {
      name: "Bukhara State Medical Institute",
      city: "Bukhara",
      established: 1990,
      fees: "₹16L (Full Course)",
      intake: "Sept",
      language: "English",
      logo: "/assets/universities/bukhara-state.png",
    },
  ],

  tajikistan: [
    {
      name: "Avicenna Tajik State Medical University",
      city: "Dushanbe",
      established: 1939,
      fees: "₹15L (Full Course)",
      intake: "Sept",
      language: "English",
      logo: "/assets/universities/avicenna-tajik.png",
    },
    {
      name: "Khujand State University Medical Faculty",
      city: "Khujand",
      established: 1932,
      fees: "₹14L (Full Course)",
      intake: "Sept",
      language: "English",
      logo: "/assets/universities/khujand-state.png",
    },
  ],
};

export const getUniversitiesBySlug = (slug) => universitiesByCountry[slug] ?? [];