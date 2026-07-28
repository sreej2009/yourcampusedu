// src/data/universitiesData.js
// Top-universities lookup for the Country Details page, keyed by the same
// country slug used in countryDetails.js. Each university links out to
// /study-abroad/university/:universitySlug.
//
// `logo` uses a generated initials avatar as a placeholder — swap for real
// university crests from src/assets/images/universities/ when available.

const logo = (initials) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&background=6d53a3&color=fff&bold=true&size=128&font-size=0.38`;

const universitiesData = {
  usa: [
    {
      slug: "mit",
      name: "Massachusetts Institute of Technology",
      city: "Cambridge, MA",
      qsRanking: 1,
      tuition: "₹52L /yr",
      logo: logo("MIT"),
    },
    {
      slug: "stanford-university",
      name: "Stanford University",
      city: "Stanford, CA",
      qsRanking: 3,
      tuition: "₹54L /yr",
      logo: logo("SU"),
    },
    {
      slug: "university-of-michigan",
      name: "University of Michigan",
      city: "Ann Arbor, MI",
      qsRanking: 44,
      tuition: "₹40L /yr",
      logo: logo("UM"),
    },
    {
      slug: "arizona-state-university",
      name: "Arizona State University",
      city: "Tempe, AZ",
      qsRanking: 213,
      tuition: "₹28L /yr",
      logo: logo("ASU"),
    },
  ],
  uk: [
    {
      slug: "university-of-oxford",
      name: "University of Oxford",
      city: "Oxford",
      qsRanking: 3,
      tuition: "₹38L /yr",
      logo: logo("OX"),
    },
    {
      slug: "imperial-college-london",
      name: "Imperial College London",
      city: "London",
      qsRanking: 6,
      tuition: "₹41L /yr",
      logo: logo("ICL"),
    },
    {
      slug: "university-of-manchester",
      name: "University of Manchester",
      city: "Manchester",
      qsRanking: 34,
      tuition: "₹30L /yr",
      logo: logo("UoM"),
    },
    {
      slug: "university-of-edinburgh",
      name: "University of Edinburgh",
      city: "Edinburgh",
      qsRanking: 27,
      tuition: "₹32L /yr",
      logo: logo("UoE"),
    },
  ],
  canada: [
    {
      slug: "university-of-toronto",
      name: "University of Toronto",
      city: "Toronto, ON",
      qsRanking: 21,
      tuition: "₹30L /yr",
      logo: logo("UofT"),
    },
    {
      slug: "university-of-british-columbia",
      name: "University of British Columbia",
      city: "Vancouver, BC",
      qsRanking: 34,
      tuition: "₹29L /yr",
      logo: logo("UBC"),
    },
    {
      slug: "mcgill-university",
      name: "McGill University",
      city: "Montreal, QC",
      qsRanking: 30,
      tuition: "₹27L /yr",
      logo: logo("McGill"),
    },
    {
      slug: "university-of-waterloo",
      name: "University of Waterloo",
      city: "Waterloo, ON",
      qsRanking: 112,
      tuition: "₹25L /yr",
      logo: logo("UW"),
    },
  ],
  australia: [
    {
      slug: "university-of-melbourne",
      name: "University of Melbourne",
      city: "Melbourne, VIC",
      qsRanking: 13,
      tuition: "₹32L /yr",
      logo: logo("UniMelb"),
    },
    {
      slug: "university-of-sydney",
      name: "University of Sydney",
      city: "Sydney, NSW",
      qsRanking: 18,
      tuition: "₹33L /yr",
      logo: logo("USyd"),
    },
    {
      slug: "unsw-sydney",
      name: "UNSW Sydney",
      city: "Sydney, NSW",
      qsRanking: 19,
      tuition: "₹31L /yr",
      logo: logo("UNSW"),
    },
    {
      slug: "monash-university",
      name: "Monash University",
      city: "Melbourne, VIC",
      qsRanking: 37,
      tuition: "₹29L /yr",
      logo: logo("Monash"),
    },
  ],
  germany: [
    {
      slug: "technical-university-of-munich",
      name: "Technical University of Munich",
      city: "Munich",
      qsRanking: 28,
      tuition: "₹4L /yr",
      logo: logo("TUM"),
    },
    {
      slug: "rwth-aachen",
      name: "RWTH Aachen University",
      city: "Aachen",
      qsRanking: 87,
      tuition: "₹3L /yr",
      logo: logo("RWTH"),
    },
    {
      slug: "heidelberg-university",
      name: "Heidelberg University",
      city: "Heidelberg",
      qsRanking: 87,
      tuition: "₹3L /yr",
      logo: logo("HU"),
    },
  ],
  ireland: [
    {
      slug: "trinity-college-dublin",
      name: "Trinity College Dublin",
      city: "Dublin",
      qsRanking: 87,
      tuition: "₹22L /yr",
      logo: logo("TCD"),
    },
    {
      slug: "university-college-dublin",
      name: "University College Dublin",
      city: "Dublin",
      qsRanking: 126,
      tuition: "₹21L /yr",
      logo: logo("UCD"),
    },
    {
      slug: "university-of-galway",
      name: "University of Galway",
      city: "Galway",
      qsRanking: 274,
      tuition: "₹19L /yr",
      logo: logo("UG"),
    },
  ],
  newzealand: [
    {
      slug: "university-of-auckland",
      name: "University of Auckland",
      city: "Auckland",
      qsRanking: 68,
      tuition: "₹22L /yr",
      logo: logo("UoA"),
    },
    {
      slug: "university-of-otago",
      name: "University of Otago",
      city: "Dunedin",
      qsRanking: 206,
      tuition: "₹20L /yr",
      logo: logo("Otago"),
    },
    {
      slug: "victoria-university-of-wellington",
      name: "Victoria University of Wellington",
      city: "Wellington",
      qsRanking: 241,
      tuition: "₹19L /yr",
      logo: logo("VUW"),
    },
  ],
  singapore: [
    {
      slug: "national-university-of-singapore",
      name: "National University of Singapore",
      city: "Singapore",
      qsRanking: 8,
      tuition: "₹24L /yr",
      logo: logo("NUS"),
    },
    {
      slug: "nanyang-technological-university",
      name: "Nanyang Technological University",
      city: "Singapore",
      qsRanking: 12,
      tuition: "₹23L /yr",
      logo: logo("NTU"),
    },
    {
      slug: "singapore-management-university",
      name: "Singapore Management University",
      city: "Singapore",
      qsRanking: 511,
      tuition: "₹20L /yr",
      logo: logo("SMU"),
    },
  ],
};

export default universitiesData;