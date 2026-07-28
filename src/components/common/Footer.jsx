import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Globe,
  GraduationCap,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

/* =========================================
   DATA
========================================= */

const quickLinks = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Courses", link: "/courses" },
  { label: "Study India", link: "/study-india" },
  { label: "StudyDestination", link: "/study-destination" },
  { label: "Contact", link: "/contact" },
];

const aiTools = [
  { label: "AI Course Match", link: "/ai-course-match" },
  { label: "Eligibility Checker", link: "/eligibility-checker" },
  { label: "Budget Calculator", link: "/budget-calculator" },
  { label: "Compare Colleges", link: "/compare-colleges" },
  { label: "Country Fit Quiz", link: "/country-fit-quiz" },
];

/* =========================================
   COMPONENT
========================================= */

const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden bg-[var(--primary-dark)] text-white">

      {/* =========================================
          BACKGROUND EFFECTS
      ========================================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-160px] left-[-160px] w-[360px] h-[360px] rounded-full bg-[var(--primary)] opacity-20 blur-[130px]" />

        <div className="absolute bottom-[-160px] right-[-160px] w-[360px] h-[360px] rounded-full bg-[var(--accent-blue)] opacity-20 blur-[130px]" />

      </div>

      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="relative z-10">

        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 py-16 sm:py-20">

          {/* GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 lg:gap-14">

            {/* =========================================
                BRAND SECTION
            ========================================= */}

            <div className="xl:col-span-2 pr-0 xl:pr-10">

              {/* LOGO */}

              <Link
                to="/"
                className="inline-flex items-center"
              >
                <img
                  src={logo}
                  alt="Your Campus Edu"
                  className="h-[70px] sm:h-[78px] w-auto object-contain"
                />
              </Link>

              {/* DESCRIPTION */}

              <p className="mt-7 text-white/70 leading-[1.9] max-w-xl text-[15px] sm:text-[16px]">

                Your trusted AI-powered platform for studying abroad.
                Explore universities, compare countries, calculate
                budgets, and build your international future with confidence.

              </p>

              {/* STATS */}

              <div className="flex flex-wrap gap-4 mt-8">

                <div className="min-w-[150px] px-5 py-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

                  <div className="flex items-center gap-2 mb-2">

                    <GraduationCap
                      size={18}
                      className="text-[var(--primary)]"
                    />

                    <span className="font-semibold text-white text-lg">
                      500+
                    </span>

                  </div>

                  <p className="text-sm text-white/60">
                    Universities
                  </p>

                </div>

                <div className="min-w-[150px] px-5 py-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

                  <div className="flex items-center gap-2 mb-2">

                    <Globe
                      size={18}
                      className="text-[var(--accent-blue)]"
                    />

                    <span className="font-semibold text-white text-lg">
                      25+
                    </span>

                  </div>

                  <p className="text-sm text-white/60">
                    Countries
                  </p>

                </div>

              </div>

              {/* SOCIALS */}

              <div className="flex items-center flex-wrap gap-4 mt-8">

                <a
                  href="/"
                  className="group w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 transition-all duration-300 hover:-translate-y-1 hover:border-transparent"
                >
                  <FaInstagram
                    size={17}
                    className="text-white/70 group-hover:text-white"
                  />
                </a>

                <a
                  href="/"
                  className="group w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0077B5] transition-all duration-300 hover:-translate-y-1 hover:border-transparent"
                >
                  <FaLinkedinIn
                    size={16}
                    className="text-white/70 group-hover:text-white"
                  />
                </a>

                <a
                  href="/"
                  className="group w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 hover:-translate-y-1 hover:border-transparent"
                >
                  <FaYoutube
                    size={17}
                    className="text-white/70 group-hover:text-white"
                  />
                </a>

                <a
                  href="/"
                  className="group w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 hover:-translate-y-1 hover:border-transparent"
                >
                  <FaFacebookF
                    size={16}
                    className="text-white/70 group-hover:text-white"
                  />
                </a>

              </div>

            </div>

            {/* =========================================
                QUICK LINKS
            ========================================= */}

            <div>

              <h3 className="text-[22px] font-semibold mb-7">
                Quick Links
              </h3>

              <div className="flex flex-col gap-5">

                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.link}
                    className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 w-fit"
                  >

                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />

                    <span className="group-hover:translate-x-1 transition-all duration-300 text-[16px]">

                      {item.label}

                    </span>

                  </Link>
                ))}

              </div>

            </div>

            {/* =========================================
                AI TOOLS
            ========================================= */}

            <div>

              <div className="flex items-center gap-2 mb-7">

                <h3 className="text-[22px] font-semibold">
                  AI Tools
                </h3>

                <div className="px-2 py-1 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent-blue)] text-[9px] font-bold tracking-[1px]">

                  AI

                </div>

              </div>

              <div className="flex flex-col gap-5">

                {aiTools.map((item) => (
                  <Link
                    key={item.label}
                    to={item.link}
                    className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 w-fit"
                  >

                    <Sparkles
                      size={13}
                      className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                    />

                    <span className="group-hover:translate-x-1 transition-all duration-300 text-[16px]">

                      {item.label}

                    </span>

                  </Link>
                ))}

              </div>

            </div>

            {/* =========================================
                CONTACT
            ========================================= */}

            <div>

              <h3 className="text-[22px] font-semibold mb-7">
                Contact
              </h3>

              <div className="flex flex-col gap-6">

                {/* ADDRESS */}

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">

                    <MapPin size={18} />

                  </div>

                  <div>

                    <p className="text-sm text-white/40 mb-1">
                      Office
                    </p>

                    <p className="text-white/70 leading-relaxed text-[16px]">

                      2nd FLOOR, Classic Towers, SB, D.R.1270BCD, Trichy Rd, Race Course, Coimbatore, Tamil Nadu 641018

                    </p>

                  </div>

                </div>

                {/* PHONE */}

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">

                    <Phone size={18} />

                  </div>

                  <div>

                    <p className="text-sm text-white/40 mb-1">
                      Phone
                    </p>

                    <a
                      href="tel:+918680888184"
                      className="text-white/70 hover:text-white transition-all text-[16px]"
                    >
                      +91 8680888184
                    </a>
<p />
                     
                    <a
                      href="tel:+918680888185"
                      className="text-white/70 hover:text-white transition-all text-[16px]"
                    >
                      +91 8680888185
                    </a>

                  </div>

                </div>

                {/* EMAIL */}

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">

                    <Mail size={18} />

                  </div>

                  <div>

                    <p className="text-sm text-white/40 mb-1">
                      Email
                    </p>

                    <a
                      href="mailto:info@yourcampusedu.com"
                      className="text-white/70 hover:text-white transition-all text-[16px] break-all"
                    >
                      info@yourcampusedu.com
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          BOTTOM BAR
      ========================================= */}

      <div className="border-t border-white/10 relative z-10">

        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 py-6">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

            <p className="text-sm text-white/50 text-center lg:text-left leading-relaxed">

              © 2026 Your Campus Edu. All rights reserved.

            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/50">

              <Link
                to="/privacy-policy"
                className="hover:text-white transition-all"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="hover:text-white transition-all"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/cookies"
                className="hover:text-white transition-all"
              >
                Cookies
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;