import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu, X, ChevronDown, ChevronRight, ChevronLeft, UserPlus, Sparkles,
  Target, CheckCircle, Wallet, BarChart2, Globe,
  ArrowRight, Zap, GraduationCap, Phone, Stethoscope,
} from "lucide-react";
import logo from "../../assets/images/logo.png";

// NOTE: adjust these two import paths to match where the files actually live
// in your project (they were referenced as indianCourses.js / categoryData.js).
import { courseCategories } from "../../Data/indianCourses";
import { categoryData } from "../../Data/categoryData";

/* =========================================
   DATA
========================================= */

const AI_ROUTES = [
  "/ai-tools", "/ai-course-match", "/eligibility-checker",
  "/budget-calculator", "/compare-colleges", "/country-fit-quiz",
];

const NAV_LINKS_LEFT = [
  { to: "/",        label: "Home",    exact: true },
  { to: "/about",   label: "About"               },
  { to: "/courses", label: "Courses"             },
];

// ── MBBS Abroad added here — it will now automatically render in the
// desktop nav (mapped below) since it lives in NAV_LINKS_RIGHT.
const NAV_LINKS_RIGHT = [
  { to: "/study-destination", label: "StudyDestination" },
  { to: "/accommodation",     label: "Accommodation"    },
  { to: "/mbbs-abroad",       label: "MBBS Abroad"      },
];

const ALL_SIMPLE_LINKS = [...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT];

// AI sub-tools only (no /ai-tools page link here — handled separately)
const AI_ITEMS = [
  { to: "/ai-course-match",     label: "AICourseMatch",       desc: "Find your ideal university",       Icon: Target,      accent: "#31B978", bg: "rgba(49,185,120,0.12)",  num: "01" },
  { to: "/eligibility-checker", label: "Eligibility Checker", desc: "Check your admission chances",     Icon: CheckCircle, accent: "#6D53A3", bg: "rgba(109,83,163,0.12)", num: "02" },
  { to: "/budget-calculator",   label: "Budget Calculator",   desc: "Plan your education finances",     Icon: Wallet,      accent: "#F8941F", bg: "rgba(248,148,31,0.12)", num: "03" },
  { to: "/compare-colleges",    label: "Compare Colleges",    desc: "Side-by-side university analysis", Icon: BarChart2,   accent: "#39C0FA", bg: "rgba(57,192,250,0.12)", num: "04" },
  { to: "/country-fit-quiz",    label: "Country Fit Quiz",    desc: "Discover your best study country", Icon: Globe,       accent: "#F92596", bg: "rgba(249,37,150,0.12)", num: "05" },
];

// Hover-intent timing — tuned for natural mouse movement
const OPEN_DELAY   = 60;   // ms before opening on enter (avoids accidental flicks)
const CLOSE_DELAY  = 220;  // ms before closing on leave (survives the gap + diagonal moves)
const CAT_SWITCH_DELAY = 60; // ms debounce when sweeping across category rows

function getActiveLink(pathname) {
  if (AI_ROUTES.includes(pathname)) return "__ai__";
  if (pathname === "/study-india" || pathname.startsWith("/study-india/")) return "__study__";
  const match = [...ALL_SIMPLE_LINKS, { to: "/contact" }].find((item) =>
    item.exact ? pathname === item.to : pathname.startsWith(item.to)
  );
  return match ? match.to : null;
}

// Builds a stable, unique slug for a course, matching CourseExplorer's
// slugify exactly — e.g. "B.Tech Computer Science" -> "b-tech-computer-science"
function slugifyCourse(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* =========================================
   MOBILE DRAWER — slide-panel transition variants
========================================= */

const panelVariants = {
  enter: (dir) => ({ x: dir > 0 ? "36px" : "-36px", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-36px" : "36px", opacity: 0 }),
};

/* =========================================
   STYLES
========================================= */

const styles = `
  /* ─── RESET ──────────────────────────────── */
  .nb * { box-sizing: border-box; }

  /* ─── HEADER SHELL ───────────────────────── */
  .nb {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 999;
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border-bottom: 1px solid rgba(109,83,163,0.08);
    transition: background 0.35s ease, box-shadow 0.35s ease;
  }
  .nb.scrolled {
    background: rgba(255,255,255,0.97);
    box-shadow: 0 1px 0 rgba(109,83,163,0.06), 0 4px 32px rgba(36,20,79,0.06);
  }

  /* ─── INNER ─────────────────────────────── */
  .nb__inner {
    max-width: 1320px;
    margin: auto;
    height: 74px;
    padding: 0 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  /* ─── LOGO ──────────────────────────────── */
  .nb__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }
  .nb__logoWrap {
    position: relative;
    width: 88px;
    height: 78px;
    border-radius: 20px;
    background: var(--gradient-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(109,83,163,0.30);
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
    overflow: hidden;
  }
  .nb__logoWrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(140deg, rgba(255,255,255,0.22) 0%, transparent 55%);
    pointer-events: none;
    z-index: 1;
    border-radius: 20px;
  }
  .nb__logoRing {
    position: absolute;
    inset: -3px;
    border-radius: 23px;
    background: conic-gradient(from 0deg, #31B978 0%, #6D53A3 45%, #39C0FA 75%, #31B978 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: nbSpin 3.5s linear infinite paused;
  }
  @keyframes nbSpin { to { transform: rotate(360deg); } }
  .nb__logo:hover .nb__logoRing { opacity: 1; animation-play-state: running; }
  .nb__logo:hover .nb__logoWrap {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 10px 36px rgba(109,83,163,0.38);
  }
  .nb__logoImg {
    height: 58px;
    width: auto;
    object-fit: contain;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15));
  }

  /* ─── DESKTOP NAV ────────────────────────── */
  .nb__desktop {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
    justify-content: center;
  }

  /* ─── NAV LINK ───────────────────────────── */
  .nb__link {
    position: relative;
    padding: 8px 15px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-medium);
    text-decoration: none;
    font-family: var(--font-main);
    white-space: nowrap;
    letter-spacing: 0.05px;
    isolation: isolate;
    transition: color 0.2s ease;
  }
  .nb__link::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: var(--primary-light);
    transform: scale(0.85);
    opacity: 0;
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
    z-index: -1;
  }
  .nb__link:hover::before, .nb__link.active::before {
    transform: scale(1);
    opacity: 1;
  }
  .nb__link:hover, .nb__link.active { color: var(--primary); }
  .nb__link::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 18px;
    height: 2px;
    border-radius: 99px;
    background: var(--gradient-primary);
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
    transform-origin: center;
  }
  .nb__link.active::after { transform: translateX(-50%) scaleX(1); }
  .nb__link:hover::after  { transform: translateX(-50%) scaleX(1); }

  /* ─── SEPARATOR ──────────────────────────── */
  .nb__sep {
    width: 1px;
    height: 18px;
    background: linear-gradient(to bottom, transparent, rgba(109,83,163,0.15), transparent);
    margin: 0 6px;
    flex-shrink: 0;
  }

  /* ─── AI TRIGGER ─────────────────────────── */
  .nb__aiWrap {
    position: relative;
    padding-bottom: 14px;
    margin-bottom: -14px;
  }

  .nb__aiBtn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 15px;
    border-radius: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-medium);
    font-family: var(--font-main);
    white-space: nowrap;
    letter-spacing: 0.05px;
    isolation: isolate;
    transition: color 0.2s ease;
  }
  .nb__aiBtn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: var(--primary-light);
    transform: scale(0.85);
    opacity: 0;
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
    z-index: -1;
  }
  .nb__aiBtn:hover::before, .nb__aiBtn.active::before {
    transform: scale(1);
    opacity: 1;
  }
  .nb__aiBtn:hover, .nb__aiBtn.active { color: var(--primary); }
  .nb__aiBtn::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 18px;
    height: 2px;
    border-radius: 99px;
    background: var(--gradient-primary);
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
    transform-origin: center;
  }
  .nb__aiBtn.active::after, .nb__aiBtn:hover::after {
    transform: translateX(-50%) scaleX(1);
  }

  .nb__badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 7px;
    border-radius: 99px;
    background: var(--gradient-primary);
    color: #fff;
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 1.6;
    position: relative;
    z-index: 1;
    box-shadow: 0 2px 8px rgba(49,185,120,0.3);
  }
  .nb__chevron {
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
    flex-shrink: 0;
    color: var(--text-light);
    position: relative;
    z-index: 1;
  }
  .nb__chevron.open { transform: rotate(180deg); }

  /* ─── DROPDOWN (AI) ──────────────────────── */
  .nb__dropdown {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    width: 380px;
    background: #fff;
    border: 1px solid rgba(109,83,163,0.09);
    border-radius: 22px;
    padding: 10px;
    box-shadow:
      0 0 0 1px rgba(109,83,163,0.04),
      0 8px 20px rgba(36,20,79,0.07),
      0 24px 56px rgba(36,20,79,0.11);
    transform-origin: top center;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(-50%) translateY(-8px) scale(0.96);
    transition:
      opacity 0.18s ease,
      transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
      visibility 0s linear 0.22s;
  }
  .nb__dropdown.nb__dropdown--open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0) scale(1);
    transition:
      opacity 0.2s ease,
      transform 0.26s cubic-bezier(0.34,1.56,0.64,1),
      visibility 0s linear 0s;
  }

  .nb__ddHead {
    display: flex;
    align-items: center;
    padding: 8px 10px 10px;
    margin-bottom: 4px;
  }
  .nb__ddHeadLeft {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .nb__ddHeadIcon {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: var(--gradient-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .nb__ddHeadTitle {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--text-dark);
    font-family: var(--font-main);
    letter-spacing: -0.1px;
  }
  .nb__ddHeadSub {
    font-size: 10px;
    color: var(--text-light);
    font-family: var(--font-main);
  }

  .nb__ddDivider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(109,83,163,0.08), transparent);
    margin: 0 4px 8px;
  }

  .nb__ddList { display: flex; flex-direction: column; gap: 2px; }

  .nb__ddItem {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 14px;
    text-decoration: none;
    overflow: hidden;
    isolation: isolate;
    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
    cursor: pointer;
  }
  .nb__ddItem::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    background: var(--primary-light);
    transform: translateX(-105%);
    transition: transform 0.32s cubic-bezier(0.77,0,0.18,1);
    z-index: -1;
  }
  .nb__ddItem:hover::before { transform: translateX(0); }
  .nb__ddItem.active::before { transform: translateX(0); background: rgba(109,83,163,0.10); }

  .nb__ddItem::after {
    content: '';
    position: absolute;
    left: 0;
    top: 22%;
    bottom: 22%;
    width: 2.5px;
    border-radius: 99px;
    background: var(--item-accent, var(--primary));
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1) 0.04s;
    z-index: 1;
  }
  .nb__ddItem:hover::after  { transform: scaleY(1); }
  .nb__ddItem.active::after { transform: scaleY(1); }
  .nb__ddItem:hover { transform: translateX(4px); }

  .nb__ddIconBox {
    width: 38px;
    height: 38px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
  }
  .nb__ddItem:hover .nb__ddIconBox {
    transform: rotate(-7deg) scale(1.1);
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
  }

  .nb__ddContent {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    z-index: 1;
    min-width: 0;
  }
  .nb__ddLabel {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-dark);
    font-family: var(--font-main);
    line-height: 1.3;
    transition: color 0.18s ease;
  }
  .nb__ddItem:hover .nb__ddLabel,
  .nb__ddItem.active .nb__ddLabel { color: var(--primary); }
  .nb__ddDesc {
    font-size: 11px;
    color: var(--text-light);
    font-family: var(--font-main);
    margin-top: 1px;
    line-height: 1.35;
  }

  .nb__ddArrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 8px;
    background: transparent;
    color: rgba(109,83,163,0.2);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 0.2s ease, transform 0.24s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease, color 0.2s ease;
  }
  .nb__ddItem:hover .nb__ddArrow {
    opacity: 1;
    transform: translateX(0);
    background: rgba(109,83,163,0.09);
    color: var(--primary);
  }

  .nb__ddFooter {
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(109,83,163,0.06) 0%, rgba(49,185,120,0.06) 100%);
    border: 1px solid rgba(109,83,163,0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.24s ease;
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }
  .nb__ddFooter::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-secondary);
    opacity: 0;
    transition: opacity 0.28s ease;
    z-index: -1;
    border-radius: 14px;
  }
  .nb__ddFooter:hover::before { opacity: 1; }
  .nb__ddFooterLeft {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .nb__ddFooterIcon {
    width: 32px; height: 32px;
    border-radius: 9px;
    background: var(--gradient-secondary);
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    flex-shrink: 0;
    transition: background 0.24s ease;
  }
  .nb__ddFooter:hover .nb__ddFooterIcon { background: rgba(255,255,255,0.20); }
  .nb__ddFooterTitle {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--text-dark);
    font-family: var(--font-main);
    transition: color 0.2s ease;
  }
  .nb__ddFooterSub {
    font-size: 10px;
    color: var(--text-light);
    font-family: var(--font-main);
    margin-top: 1px;
    display: block;
    transition: color 0.2s ease;
  }
  .nb__ddFooter:hover .nb__ddFooterTitle,
  .nb__ddFooter:hover .nb__ddFooterSub { color: #fff; }
  .nb__ddFooterBtn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 14px;
    border-radius: 8px;
    background: var(--gradient-secondary);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    font-family: var(--font-main);
    white-space: nowrap;
    border: none;
    pointer-events: none;
    flex-shrink: 0;
    transition: background 0.24s ease;
  }
  .nb__ddFooter:hover .nb__ddFooterBtn {
    background: rgba(255,255,255,0.22);
  }

  /* ─── STUDY INDIA TRIGGER ────────────────── */
  .nb__studyWrap {
    position: relative;
    padding-bottom: 14px;
    margin-bottom: -14px;
  }
  .nb__studyBtn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 15px;
    border-radius: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-medium);
    font-family: var(--font-main);
    white-space: nowrap;
    letter-spacing: 0.05px;
    isolation: isolate;
    transition: color 0.2s ease;
  }
  .nb__studyBtn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: var(--primary-light);
    transform: scale(0.85);
    opacity: 0;
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
    z-index: -1;
  }
  .nb__studyBtn:hover::before, .nb__studyBtn.active::before {
    transform: scale(1);
    opacity: 1;
  }
  .nb__studyBtn:hover, .nb__studyBtn.active { color: var(--primary); }
  .nb__studyBtn::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 18px;
    height: 2px;
    border-radius: 99px;
    background: var(--gradient-primary);
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
    transform-origin: center;
  }
  .nb__studyBtn.active::after, .nb__studyBtn:hover::after {
    transform: translateX(-50%) scaleX(1);
  }

  /* ─── STUDY INDIA MEGA DROPDOWN ──────────── */
  .nb__studyDropdown {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    width: 640px;
    max-width: 90vw;
    display: flex;
    background: var(--bg-main);
    border: 1px solid color-mix(in srgb, var(--primary) 9%, transparent);
    border-radius: var(--radius-lg);
    padding: 10px;
    gap: 4px;
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--primary) 4%, transparent),
      var(--shadow-md),
      var(--shadow-lg);
    transform-origin: top center;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(-50%) translateY(-8px) scale(0.96);
    transition:
      opacity 0.18s ease,
      transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
      visibility 0s linear 0.22s;
  }
  .nb__studyDropdown.nb__studyDropdown--open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0) scale(1);
    transition:
      opacity 0.2s ease,
      transform 0.26s cubic-bezier(0.34,1.56,0.64,1),
      visibility 0s linear 0s;
  }

  .nb__studyCats {
    width: 236px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 380px;
    overflow-y: auto;
    padding-right: 4px;
  }
  .nb__studyCatItem {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    width: 100%;
    isolation: isolate;
    transition: background 0.2s ease;
  }
  .nb__studyCatItem::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: color-mix(in srgb, var(--cat-accent) 10%, var(--primary-light));
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: -1;
  }
  .nb__studyCatItem:hover::before,
  .nb__studyCatItem.active::before { opacity: 1; }
  .nb__studyCatLabel {
    flex: 1;
    font-size: 12.5px;
    font-weight: 700;
    color: var(--text-dark);
    font-family: var(--font-main);
    line-height: 1.3;
  }
  .nb__studyCatItem:hover .nb__studyCatLabel,
  .nb__studyCatItem.active .nb__studyCatLabel { color: var(--primary); }
  .nb__studyCatCount {
    font-size: 10px;
    font-weight: 700;
    color: var(--text-light);
    background: var(--bg-light);
    padding: 2px 7px;
    border-radius: 99px;
    flex-shrink: 0;
  }
  .nb__studyCatArrow {
    color: var(--text-light);
    flex-shrink: 0;
    opacity: 0;
    transform: translateX(-3px);
    transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
  }
  .nb__studyCatItem:hover .nb__studyCatArrow,
  .nb__studyCatItem.active .nb__studyCatArrow {
    opacity: 1;
    transform: translateX(0);
    color: var(--primary);
  }

  .nb__studyDivider2 {
    width: 1px;
    align-self: stretch;
    background: linear-gradient(to bottom, transparent, var(--border), transparent);
    flex-shrink: 0;
  }

  .nb__studyCourses {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 4px 4px 4px 12px;
  }
  .nb__studyCourseHead { padding: 4px 4px 8px; }
  .nb__studyCourseHeadTitle {
    display: block;
    font-size: 12.5px;
    font-weight: 700;
    color: var(--text-dark);
    font-family: var(--font-main);
  }
  .nb__studyCourseHeadSub {
    font-size: 10.5px;
    color: var(--text-light);
    font-family: var(--font-main);
  }
  .nb__studyCourseList {
    display: flex;
    flex-direction: column;
    gap: 1px;
    max-height: 260px;
    overflow-y: auto;
    padding-right: 2px;
  }
  .nb__studyCourseItem {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 7px 8px;
    border-radius: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: background 0.18s ease;
  }
  .nb__studyCourseItem:hover { background: var(--primary-light); }
  .nb__studyCourseContent { display: flex; flex-direction: column; min-width: 0; }
  .nb__studyCourseName {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-dark);
    font-family: var(--font-main);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .nb__studyCourseItem:hover .nb__studyCourseName { color: var(--primary); }
  .nb__studyCourseMeta {
    font-size: 10px;
    color: var(--text-light);
    font-family: var(--font-main);
  }
  .nb__studyCourseFooter {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px;
    border-radius: 11px;
    border: none;
    background: var(--gradient-secondary);
    color: var(--white);
    font-size: 11.5px;
    font-weight: 700;
    font-family: var(--font-main);
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .nb__studyCourseFooter:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }

  /* ─── ACTIONS ────────────────────────────── */
  .nb__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .nb__enquire {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 9px 18px;
    border-radius: 11px;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary);
    background: var(--primary-light);
    border: 1.5px solid rgba(109,83,163,0.12);
    text-decoration: none;
    font-family: var(--font-main);
    white-space: nowrap;
    isolation: isolate;
    position: relative;
    overflow: hidden;
    transition: color 0.25s ease, border-color 0.25s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease;
  }
  .nb__enquire::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--primary);
    transform: translateY(102%);
    transition: transform 0.28s cubic-bezier(0.77,0,0.18,1);
    z-index: -1;
  }
  .nb__enquire:hover::before { transform: translateY(0); }
  .nb__enquire:hover {
    color: #fff;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .nb__signup {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 10px 22px;
    border-radius: 11px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: var(--gradient-secondary);
    text-decoration: none;
    font-family: var(--font-main);
    white-space: nowrap;
    box-shadow: 0 6px 20px rgba(109,83,163,0.26);
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    isolation: isolate;
  }
  .nb__signup::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -80%;
    width: 50%;
    height: 200%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,0.22), transparent);
    transform: skewX(-20deg);
    transition: left 0.5s ease;
    pointer-events: none;
  }
  .nb__signup:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 12px 32px rgba(109,83,163,0.36);
    color: #fff;
  }
  .nb__signup:hover::after { left: 150%; }
  .nb__signup:active { transform: scale(0.97); }

  /* ─── HAMBURGER ──────────────────────────── */
  .nb__menuBtn {
    display: none;
    width: 44px;
    height: 44px;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    background: transparent;
    color: var(--primary);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.22s ease;
  }
  .nb__menuBtn:hover { background: var(--primary-light); border-color: rgba(109,83,163,0.26); }

  /* =====================================================
     MOBILE DRAWER — premium slide-in panel w/ drill-down
  ===================================================== */

  .nbm__overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: color-mix(in srgb, #150a2e 58%, transparent);
    backdrop-filter: blur(3px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.32s ease;
  }
  .nbm__overlay.open { opacity: 1; pointer-events: auto; }

  .nbm__drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    width: min(408px, 100vw);
    background: var(--white, #fff);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.19,1,0.22,1);
    box-shadow: -18px 0 60px rgba(20,10,50,0.20);
  }
  .nbm__drawer.open { transform: translateX(0); }

  .nbm__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .nbm__headerLogo { display: flex; align-items: center; gap: 10px; }
  .nbm__headerLogoImg { height: 32px; width: auto; object-fit: contain; }
  .nbm__headerTitle { font-size: 13.5px; font-weight: 800; color: var(--text-dark); font-family: var(--font-main); letter-spacing: -0.1px; }
  .nbm__closeBtn {
    width: 38px; height: 38px;
    border-radius: 11px;
    border: 1.5px solid var(--border);
    background: transparent;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-medium);
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
  .nbm__closeBtn:hover { background: var(--primary-light); color: var(--primary); border-color: transparent; }

  .nbm__body {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .nbm__panel {
    position: absolute;
    inset: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 14px 16px 24px;
  }

  .nbm__backRow {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 6px 16px;
    cursor: pointer;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }
  .nbm__backIcon {
    width: 30px; height: 30px;
    border-radius: 9px;
    background: var(--primary-light);
    display: flex; align-items: center; justify-content: center;
    color: var(--primary);
    flex-shrink: 0;
  }
  .nbm__backText { display: flex; flex-direction: column; }
  .nbm__backLabel { font-size: 13.5px; font-weight: 700; color: var(--text-dark); font-family: var(--font-main); }
  .nbm__backSub { font-size: 10.5px; color: var(--text-light); font-family: var(--font-main); }

  .nbm__sectionLabel {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-light);
    padding: 14px 6px 8px;
    font-family: var(--font-main);
  }
  .nbm__sectionLabel:first-child { padding-top: 2px; }

  .nbm__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 14px 12px;
    border-radius: 13px;
    text-decoration: none;
    font-size: 15px;
    font-weight: 650;
    color: var(--text-dark);
    font-family: var(--font-main);
    transition: background 0.18s ease, color 0.18s ease;
  }
  .nbm__link:hover, .nbm__link:active, .nbm__link.active { background: var(--primary-light); color: var(--primary); }
  .nbm__linkDot { width: 6px; height: 6px; border-radius: 50%; background: var(--gradient-primary); flex-shrink: 0; }

  /* Split row: left side is a real navigable Link, right side is a
     separate button that drills into the sub-panel. This mirrors the
     desktop behavior where clicking the label itself navigates. */
  .nbm__expandRow {
    display: flex;
    align-items: stretch;
    gap: 6px;
    border-radius: 14px;
    background: var(--bg-light);
    width: 100%;
    margin-bottom: 4px;
    overflow: hidden;
    transition: background 0.18s ease;
  }
  .nbm__expandRow.active { background: var(--primary-light); }
  .nbm__expandMain {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
    padding: 13px 8px 13px 12px;
    text-decoration: none;
    transition: background 0.18s ease;
  }
  .nbm__expandMain:hover, .nbm__expandMain:active { background: color-mix(in srgb, var(--primary) 8%, transparent); }
  .nbm__expandIcon {
    width: 38px; height: 38px;
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    background: var(--gradient-secondary);
    color: #fff;
    flex-shrink: 0;
  }
  .nbm__expandText { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; }
  .nbm__expandTitle {
    font-size: 15px; font-weight: 700; color: var(--text-dark);
    font-family: var(--font-main);
    display: flex; align-items: center; gap: 6px;
  }
  .nbm__expandSub { font-size: 11px; color: var(--text-light); font-family: var(--font-main); margin-top: 1px; }
  .nbm__expandChevronBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    flex-shrink: 0;
    border: none;
    background: transparent;
    color: var(--text-light);
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease;
  }
  .nbm__expandChevronBtn:hover, .nbm__expandChevronBtn:active { background: color-mix(in srgb, var(--primary) 10%, transparent); color: var(--primary); }

  .nbm__miniBadge {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 2px 7px; border-radius: 99px;
    background: var(--gradient-primary);
    color: #fff; font-size: 8.5px; font-weight: 700; letter-spacing: 0.5px;
  }

  .nbm__viewAll {
    display: flex; align-items: center; gap: 12px;
    padding: 13px; border-radius: 14px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, transparent) 0%, color-mix(in srgb, var(--secondary, var(--primary)) 8%, transparent) 100%);
    border: 1px dashed color-mix(in srgb, var(--primary) 24%, transparent);
    text-decoration: none;
    margin-bottom: 12px;
    transition: background 0.2s ease;
  }
  .nbm__viewAll:hover, .nbm__viewAll:active { background: var(--primary-light); }
  .nbm__viewAllIcon {
    width: 34px; height: 34px; border-radius: 10px;
    background: var(--gradient-secondary);
    display: flex; align-items: center; justify-content: center;
    color: #fff; flex-shrink: 0;
  }
  .nbm__viewAllText { flex: 1; min-width: 0; }
  .nbm__viewAllTitle { font-size: 13.5px; font-weight: 700; color: var(--primary); font-family: var(--font-main); display: block; }
  .nbm__viewAllSub { font-size: 10.5px; color: var(--text-light); font-family: var(--font-main); }

  .nbm__catRow {
    display: flex; align-items: stretch; gap: 4px;
    border-radius: 13px;
    border: 1px solid var(--border); background: #fff;
    width: 100%; margin-bottom: 6px;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  .nbm__catRow:focus-within { border-color: transparent; }
  .nbm__catLink {
    display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;
    padding: 13px 4px 13px 12px;
    text-decoration: none;
    transition: background 0.2s ease;
  }
  .nbm__catLink:hover, .nbm__catLink:active { background: var(--primary-light); }
  .nbm__catDot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-accent, var(--primary)); flex-shrink: 0; }
  .nbm__catText { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .nbm__catName { font-size: 14px; font-weight: 700; color: var(--text-dark); font-family: var(--font-main); }
  .nbm__catCount { font-size: 11px; color: var(--text-light); font-family: var(--font-main); }
  .nbm__catChevronBtn {
    display: flex; align-items: center; justify-content: center;
    width: 44px; flex-shrink: 0;
    border: none; background: transparent;
    color: var(--text-light); cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .nbm__catChevronBtn:hover, .nbm__catChevronBtn:active { background: var(--primary-light); color: var(--primary); }

  .nbm__courseItem {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 13px 12px; border-radius: 13px;
    text-decoration: none; margin-bottom: 4px;
    border: 1px solid var(--border);
    transition: all 0.2s ease;
  }
  .nbm__courseItem:hover, .nbm__courseItem:active { background: var(--primary-light); border-color: transparent; }
  .nbm__courseName { font-size: 13.5px; font-weight: 650; color: var(--text-dark); font-family: var(--font-main); display: block; }
  .nbm__courseMeta { font-size: 11px; color: var(--text-light); font-family: var(--font-main); margin-top: 2px; }

  .nbm__catFooterBtn {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 14px; border-radius: 13px;
    border: none; background: var(--gradient-secondary); color: #fff;
    font-weight: 700; font-size: 13.5px; font-family: var(--font-main);
    width: 100%; margin-top: 6px; cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .nbm__catFooterBtn:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }

  .nbm__aiItem {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 12px; border-radius: 14px;
    text-decoration: none; margin-bottom: 6px;
    border: 1px solid var(--border);
    transition: all 0.2s ease;
  }
  .nbm__aiItem:hover, .nbm__aiItem:active, .nbm__aiItem.active { background: var(--primary-light); border-color: transparent; }
  .nbm__aiIcon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .nbm__aiContent { flex: 1; min-width: 0; }
  .nbm__aiName { font-size: 14.5px; font-weight: 700; color: var(--text-dark); font-family: var(--font-main); display: block; }
  .nbm__aiDesc { font-size: 11.5px; color: var(--text-light); font-family: var(--font-main); margin-top: 1px; }
  .nbm__aiArrow { color: var(--text-light); flex-shrink: 0; }

  .nbm__footer {
    flex-shrink: 0;
    padding: 14px 18px calc(14px + env(safe-area-inset-bottom, 0px));
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #fff;
  }
  .nbm__ctaPrimary {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 15px; border-radius: 13px;
    background: var(--gradient-secondary); color: #fff;
    font-size: 15px; font-weight: 700; font-family: var(--font-main);
    text-decoration: none; border: none; cursor: pointer;
    box-shadow: 0 8px 22px color-mix(in srgb, var(--primary) 30%, transparent);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .nbm__ctaPrimary:active { transform: scale(0.98); }
  .nbm__ctaSecondary {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 14px; border-radius: 13px;
    background: var(--primary-light); color: var(--primary);
    font-size: 14px; font-weight: 700; font-family: var(--font-main);
    text-decoration: none;
    border: 1.5px solid color-mix(in srgb, var(--primary) 20%, transparent);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .nbm__ctaSecondary:hover { background: var(--primary); color: #fff; border-color: transparent; }

  /* ─── RESPONSIVE ─────────────────────────── */
  @media (max-width: 1060px) {
    .nb__desktop { display: none; }
    .nb__actions  { display: none; }
    .nb__menuBtn  { display: flex; }
    .nb__inner    { height: 68px; padding: 0 18px; }
  }
  @media (max-width: 480px) {
    .nb__logoWrap { width: 70px; height: 70px; border-radius: 18px; }
    .nb__logoImg  { height: 52px; }
    .nb__inner    { padding: 0 14px; }
    .nbm__drawer  { width: 100vw; box-shadow: none; }
  }
`;

/* =========================================
   COMPONENT
========================================= */

export default function Navbar() {
  const location = useLocation();
  const navigate  = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [aiOpen, setAiOpen]     = useState(false);

  // Study India mega-menu state (desktop)
  const [studyOpen, setStudyOpen]           = useState(false);
  const [studyActiveCat, setStudyActiveCat] = useState(courseCategories[0]?.id || null);

  // Mobile drawer state — stack-based drill-down navigation
  const [mobileOpen, setMobileOpen] = useState(false);
  const [panelStack, setPanelStack] = useState([{ key: "root" }]);
  const [navDirection, setNavDirection] = useState(1);

  const dropdownRef = useRef(null);
  const openTimer    = useRef(null);
  const closeTimer   = useRef(null);

  const studyDropdownRef = useRef(null);
  const studyOpenTimer   = useRef(null);
  const studyCloseTimer  = useRef(null);
  const catSwitchTimer   = useRef(null);

  const activeLink  = getActiveLink(location.pathname);
  const isAiActive    = activeLink === "__ai__";
  const isStudyActive = activeLink === "__study__";

  const currentPanel = panelStack[panelStack.length - 1];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Desktop AI hover-intent ── */
  const clearTimers = useCallback(() => {
    if (openTimer.current)  { clearTimeout(openTimer.current);  openTimer.current  = null; }
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);
  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(() => setAiOpen(true), OPEN_DELAY);
  }, [clearTimers]);
  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setAiOpen(false), CLOSE_DELAY);
  }, [clearTimers]);
  const closeImmediately = useCallback(() => {
    clearTimers();
    setAiOpen(false);
  }, [clearTimers]);

  /* ── Desktop Study India hover-intent ── */
  const clearStudyTimers = useCallback(() => {
    if (studyOpenTimer.current)  { clearTimeout(studyOpenTimer.current);  studyOpenTimer.current  = null; }
    if (studyCloseTimer.current) { clearTimeout(studyCloseTimer.current); studyCloseTimer.current = null; }
  }, []);
  const scheduleStudyOpen = useCallback(() => {
    clearStudyTimers();
    studyOpenTimer.current = setTimeout(() => setStudyOpen(true), OPEN_DELAY);
  }, [clearStudyTimers]);
  const scheduleStudyClose = useCallback(() => {
    clearStudyTimers();
    studyCloseTimer.current = setTimeout(() => setStudyOpen(false), CLOSE_DELAY);
  }, [clearStudyTimers]);
  const closeStudyImmediately = useCallback(() => {
    clearStudyTimers();
    setStudyOpen(false);
  }, [clearStudyTimers]);

  const handleCatHover = useCallback((id) => {
    if (catSwitchTimer.current) clearTimeout(catSwitchTimer.current);
    catSwitchTimer.current = setTimeout(() => setStudyActiveCat(id), CAT_SWITCH_DELAY);
  }, []);

  useEffect(() => {
    if (studyOpen) {
      const match = location.pathname.match(/^\/study-india\/([^/]+)/);
      if (match && courseCategories.some((c) => c.id === match[1])) {
        setStudyActiveCat(match[1]);
      }
    }
  }, [studyOpen, location.pathname]);

  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) closeImmediately();
      if (studyDropdownRef.current && !studyDropdownRef.current.contains(e.target)) closeStudyImmediately();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [closeImmediately, closeStudyImmediately]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") {
        closeImmediately();
        closeStudyImmediately();
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [closeImmediately, closeStudyImmediately]);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setPanelStack([{ key: "root" }]);
    closeImmediately();
    closeStudyImmediately();
  }, [location.pathname, closeImmediately, closeStudyImmediately]);

  useEffect(() => () => {
    clearTimers();
    clearStudyTimers();
    if (catSwitchTimer.current) clearTimeout(catSwitchTimer.current);
  }, [clearTimers, clearStudyTimers]);

  const closeAll = () => {
    setMobileOpen(false);
    setPanelStack([{ key: "root" }]);
    closeImmediately();
    closeStudyImmediately();
  };

  const handleNavTo = (to) => {
    closeImmediately();
    closeStudyImmediately();
    navigate(to);
  };

  const handleTriggerClick = () => {
    clearTimers();
    if (aiOpen) {
      setAiOpen(false);
    } else {
      setAiOpen(true);
      navigate("/ai-tools");
    }
  };

  const handleStudyTriggerClick = () => {
    clearStudyTimers();
    if (studyOpen) {
      setStudyOpen(false);
    } else {
      setStudyOpen(true);
      navigate("/study-india");
    }
  };

  const activeCatMeta = courseCategories.find((c) => c.id === studyActiveCat);
  const activeCatData = studyActiveCat ? categoryData[studyActiveCat] : null;

  /* ── Mobile drawer navigation helpers ── */
  const pushPanel = (entry) => {
    setNavDirection(1);
    setPanelStack((s) => [...s, entry]);
  };
  const popPanel = () => {
    setNavDirection(-1);
    setPanelStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  };
  const closeMobile = () => {
    setMobileOpen(false);
    setPanelStack([{ key: "root" }]);
  };
  const openMobile = () => {
    setPanelStack([{ key: "root" }]);
    setMobileOpen(true);
  };

  const drilledCatId = currentPanel.key === "studyCat" ? currentPanel.catId : null;
  const drilledCatMeta = drilledCatId ? courseCategories.find((c) => c.id === drilledCatId) : null;
  const drilledCatData = drilledCatId ? categoryData[drilledCatId] : null;

  return (
    <>
      <style>{styles}</style>

      <header className={`nb${scrolled ? " scrolled" : ""}`}>
        <div className="nb__inner">

          {/* LOGO */}
          <Link to="/" className="nb__logo" aria-label="Home">
            <div className="nb__logoWrap">
              <div className="nb__logoRing" aria-hidden="true" />
              <img
                src={logo}
                alt="Your Campus Edu"
                className="nb__logoImg"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          </Link>

          {/* DESKTOP NAV — unchanged */}
          <nav className="nb__desktop" aria-label="Main navigation">

            {NAV_LINKS_LEFT.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`nb__link${activeLink === to ? " active" : ""}`}>
                {label}
              </Link>
            ))}

            <span className="nb__sep" aria-hidden="true" />

            <div
              className="nb__studyWrap"
              ref={studyDropdownRef}
              onMouseEnter={scheduleStudyOpen}
              onMouseLeave={scheduleStudyClose}
            >
              <button
                className={`nb__studyBtn${isStudyActive || studyOpen ? " active" : ""}`}
                onClick={handleStudyTriggerClick}
                aria-expanded={studyOpen}
                aria-haspopup="true"
              >
                <span style={{ position: "relative", zIndex: 1 }}>StudyIndia</span>
                <ChevronDown size={13}
                  className={`nb__chevron${studyOpen ? " open" : ""}`}
                  aria-hidden="true" />
              </button>

              <div
                className={`nb__studyDropdown${studyOpen ? " nb__studyDropdown--open" : ""}`}
                role="menu"
                onMouseEnter={scheduleStudyOpen}
                onMouseLeave={scheduleStudyClose}
              >
                <div className="nb__studyCats">
                  {courseCategories.map((cat) => {
                    const isActiveCat = studyActiveCat === cat.id;
                    return (
                      <button
                        key={cat.id}
                        role="menuitem"
                        className={`nb__studyCatItem${isActiveCat ? " active" : ""}`}
                        style={{ "--cat-accent": `var(${cat.accent})`, border: "none" }}
                        onMouseEnter={() => handleCatHover(cat.id)}
                        onFocus={() => setStudyActiveCat(cat.id)}
                        onClick={() => handleNavTo(`/study-india/${cat.id}`)}
                      >
                        <span className="nb__studyCatLabel">{cat.category}</span>
                        <span className="nb__studyCatCount">{cat.courseCount}</span>
                        <ChevronRight size={13} className="nb__studyCatArrow" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>

                <div className="nb__studyDivider2" aria-hidden="true" />

                <div className="nb__studyCourses">
                  {activeCatMeta && activeCatData && (
                    <>
                      <div className="nb__studyCourseHead">
                        <span className="nb__studyCourseHeadTitle">{activeCatMeta.category} Courses</span>
                        <span className="nb__studyCourseHeadSub">
                          {activeCatData.courses.length} programs available
                        </span>
                      </div>

                      <div className="nb__studyCourseList">
                        {activeCatData.courses.map((course) => (
                          <button
                            key={course.name}
                            role="menuitem"
                            className="nb__studyCourseItem"
                            style={{ border: "none" }}
                            onClick={() =>
                              handleNavTo(
                                `/study-india/${activeCatMeta.id}/${slugifyCourse(course.name)}`
                              )
                            }
                          >
                            <span className="nb__studyCourseContent">
                              <span className="nb__studyCourseName">{course.name}</span>
                              <span className="nb__studyCourseMeta">{course.duration} • {course.level}</span>
                            </span>
                          </button>
                        ))}
                      </div>

                      <button
                        className="nb__studyCourseFooter"
                        style={{ border: "none" }}
                        onClick={() => handleNavTo(`/study-india/${activeCatMeta.id}`)}
                      >
                        View all {activeCatMeta.category} courses <ArrowRight size={12} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <span className="nb__sep" aria-hidden="true" />

            {/* ── This map now renders StudyDestination, Accommodation, AND MBBS Abroad automatically ── */}
            {NAV_LINKS_RIGHT.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`nb__link${activeLink === to ? " active" : ""}`}>
                {label}
              </Link>
            ))}

            <span className="nb__sep" aria-hidden="true" />

            <div
              className="nb__aiWrap"
              ref={dropdownRef}
              onMouseEnter={scheduleOpen}
              onMouseLeave={scheduleClose}
            >
              <button
                className={`nb__aiBtn${isAiActive || aiOpen ? " active" : ""}`}
                onClick={handleTriggerClick}
                aria-expanded={aiOpen}
                aria-haspopup="true"
              >
                <span style={{ position: "relative", zIndex: 1 }}>AI Tools</span>
                <span className="nb__badge"><Sparkles size={8} />AI</span>
                <ChevronDown size={13}
                  className={`nb__chevron${aiOpen ? " open" : ""}`}
                  aria-hidden="true" />
              </button>

              <div
                className={`nb__dropdown${aiOpen ? " nb__dropdown--open" : ""}`}
                role="menu"
                onMouseEnter={scheduleOpen}
                onMouseLeave={scheduleClose}
              >
                <div className="nb__ddHead">
                  <div className="nb__ddHeadLeft">
                    <div className="nb__ddHeadIcon">
                      <Sparkles size={14} />
                    </div>
                    <div>
                      <div className="nb__ddHeadTitle">AI-Powered Tools</div>
                      <div className="nb__ddHeadSub">5 smart tools for your journey</div>
                    </div>
                  </div>
                </div>

                <div className="nb__ddDivider" />

                <div className="nb__ddList">
                  {AI_ITEMS.map(({ to, label, desc, Icon, accent, bg }) => (
                    <button
                      key={to}
                      role="menuitem"
                      className={`nb__ddItem${location.pathname === to ? " active" : ""}`}
                      style={{ "--item-accent": accent, border: "none", width: "100%", textAlign: "left" }}
                      onClick={() => handleNavTo(to)}
                    >
                      <div className="nb__ddIconBox" style={{ background: bg }}>
                        <Icon size={18} color={accent} strokeWidth={2} />
                      </div>
                      <div className="nb__ddContent">
                        <span className="nb__ddLabel">{label}</span>
                        <span className="nb__ddDesc">{desc}</span>
                      </div>
                      <span className="nb__ddArrow" aria-hidden="true">
                        <ArrowRight size={13} />
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  className="nb__ddFooter"
                  onClick={() => handleNavTo("/contact")}
                  style={{ width: "100%", border: "none", textAlign: "left" }}
                >
                  <div className="nb__ddFooterLeft">
                    <div className="nb__ddFooterIcon">
                      <Sparkles size={14} />
                    </div>
                    <div>
                      <div className="nb__ddFooterTitle">Not sure where to start?</div>
                      <span className="nb__ddFooterSub">Book a free counselling session</span>
                    </div>
                  </div>
                  <div className="nb__ddFooterBtn">
                    <ArrowRight size={11} /> Free Session
                  </div>
                </button>
              </div>
            </div>

            <span className="nb__sep" aria-hidden="true" />

            <Link to="/contact"
              className={`nb__link${activeLink === "/contact" ? " active" : ""}`}>
              Contact
            </Link>

          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="nb__actions">
            <Link to="/contact" className="nb__enquire">Enquire</Link>
            <Link to="/signup" className="nb__signup">
              <UserPlus size={14} />
              Sign Up
            </Link>
          </div>

          {/* HAMBURGER */}
          <button
            className="nb__menuBtn"
            onClick={openMobile}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={21} />
          </button>

        </div>
      </header>

      {/* ── MOBILE DRAWER ─────────────────────── */}
      <div
        className={`nbm__overlay${mobileOpen ? " open" : ""}`}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={`nbm__drawer${mobileOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="nbm__header">
          <div className="nbm__headerLogo">
            <img src={logo} alt="Your Campus Edu" className="nbm__headerLogoImg"
              onError={(e) => { e.target.style.display = "none"; }} />
            <span className="nbm__headerTitle">Your Campus Edu</span>
          </div>
          <button className="nbm__closeBtn" onClick={closeMobile} aria-label="Close menu">
            <X size={19} />
          </button>
        </div>

        <div className="nbm__body">
          <AnimatePresence initial={false} custom={navDirection} mode="wait">

            {/* ── ROOT PANEL ── */}
            {currentPanel.key === "root" && (
              <motion.div
                key="root"
                className="nbm__panel"
                custom={navDirection}
                variants={panelVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="nbm__sectionLabel">Navigation</span>
                {NAV_LINKS_LEFT.map(({ to, label }) => (
                  <Link key={to} to={to} onClick={closeMobile}
                    className={`nbm__link${activeLink === to ? " active" : ""}`}>
                    {label}
                    {activeLink === to && <span className="nbm__linkDot" aria-hidden="true" />}
                  </Link>
                ))}

                <span className="nbm__sectionLabel">Explore</span>

                <div className={`nbm__expandRow${isStudyActive ? " active" : ""}`}>
                  <Link to="/study-india" onClick={closeMobile} className="nbm__expandMain">
                    <div className="nbm__expandIcon"><GraduationCap size={18} /></div>
                    <div className="nbm__expandText">
                      <span className="nbm__expandTitle">Study India</span>
                      <span className="nbm__expandSub">{courseCategories.length} categories</span>
                    </div>
                  </Link>
                  <button
                    className="nbm__expandChevronBtn"
                    onClick={() => pushPanel({ key: "study" })}
                    aria-label="Browse Study India categories"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <Link to="/study-destination" onClick={closeMobile}
                  className={`nbm__link${activeLink === "/study-destination" ? " active" : ""}`}>
                  StudyDestination
                  {activeLink === "/study-destination" && <span className="nbm__linkDot" aria-hidden="true" />}
                </Link>

                <Link to="/accommodation" onClick={closeMobile}
                  className={`nbm__link${activeLink === "/accommodation" ? " active" : ""}`}>
                  Accommodation
                  {activeLink === "/accommodation" && <span className="nbm__linkDot" aria-hidden="true" />}
                </Link>

                {/* ── MBBS Abroad added to mobile drawer here ── */}
                <Link to="/mbbs-abroad" onClick={closeMobile}
                  className={`nbm__link${activeLink === "/mbbs-abroad" ? " active" : ""}`}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Stethoscope size={16} style={{ flexShrink: 0 }} />
                    MBBS Abroad
                  </span>
                  {activeLink === "/mbbs-abroad" && <span className="nbm__linkDot" aria-hidden="true" />}
                </Link>

                <div className={`nbm__expandRow${isAiActive ? " active" : ""}`}>
                  <Link to="/ai-tools" onClick={closeMobile} className="nbm__expandMain">
                    <div className="nbm__expandIcon"><Sparkles size={18} /></div>
                    <div className="nbm__expandText">
                      <span className="nbm__expandTitle">
                        AI Tools <span className="nbm__miniBadge">AI</span>
                      </span>
                      <span className="nbm__expandSub">5 smart tools</span>
                    </div>
                  </Link>
                  <button
                    className="nbm__expandChevronBtn"
                    onClick={() => pushPanel({ key: "ai" })}
                    aria-label="Browse AI Tools"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <span className="nbm__sectionLabel">Support</span>
                <Link to="/contact" onClick={closeMobile}
                  className={`nbm__link${activeLink === "/contact" ? " active" : ""}`}>
                  Contact
                  {activeLink === "/contact" && <span className="nbm__linkDot" aria-hidden="true" />}
                </Link>
              </motion.div>
            )}

            {/* ── STUDY INDIA CATEGORY LIST ── */}
            {currentPanel.key === "study" && (
              <motion.div
                key="study"
                className="nbm__panel"
                custom={navDirection}
                variants={panelVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <button className="nbm__backRow" onClick={popPanel}>
                  <div className="nbm__backIcon"><ChevronLeft size={16} /></div>
                  <div className="nbm__backText">
                    <span className="nbm__backLabel">Study India</span>
                    <span className="nbm__backSub">Back to menu</span>
                  </div>
                </button>

                <Link to="/study-india" onClick={closeMobile} className="nbm__viewAll">
                  <div className="nbm__viewAllIcon"><GraduationCap size={16} /></div>
                  <div className="nbm__viewAllText">
                    <span className="nbm__viewAllTitle">View All Study India</span>
                    <span className="nbm__viewAllSub">Browse every category</span>
                  </div>
                  <ArrowRight size={15} style={{ color: "var(--primary)", flexShrink: 0 }} />
                </Link>

                {courseCategories.map((cat) => (
                  <div key={cat.id} className="nbm__catRow">
                    <Link
                      to={`/study-india/${cat.id}`}
                      onClick={closeMobile}
                      className="nbm__catLink"
                    >
                      <span className="nbm__catDot" style={{ "--cat-accent": `var(${cat.accent})` }} />
                      <span className="nbm__catText">
                        <span className="nbm__catName">{cat.category}</span>
                        <span className="nbm__catCount">{cat.courseCount} courses</span>
                      </span>
                    </Link>
                    <button
                      className="nbm__catChevronBtn"
                      onClick={() => pushPanel({ key: "studyCat", catId: cat.id })}
                      aria-label={`View ${cat.category} courses`}
                    >
                      <ChevronRight size={17} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* ── STUDY INDIA — COURSES FOR ONE CATEGORY ── */}
            {currentPanel.key === "studyCat" && drilledCatMeta && drilledCatData && (
              <motion.div
                key={`studyCat-${drilledCatId}`}
                className="nbm__panel"
                custom={navDirection}
                variants={panelVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <button className="nbm__backRow" onClick={popPanel}>
                  <div className="nbm__backIcon"><ChevronLeft size={16} /></div>
                  <div className="nbm__backText">
                    <span className="nbm__backLabel">{drilledCatMeta.category}</span>
                    <span className="nbm__backSub">{drilledCatData.courses.length} programs available</span>
                  </div>
                </button>

                {drilledCatData.courses.map((course) => (
                  <Link
                    key={course.name}
                    to={`/study-india/${drilledCatId}/${slugifyCourse(course.name)}`}
                    onClick={closeMobile}
                    className="nbm__courseItem"
                  >
                    <span>
                      <span className="nbm__courseName">{course.name}</span>
                      <span className="nbm__courseMeta">{course.duration} • {course.level}</span>
                    </span>
                    <ArrowRight size={14} style={{ color: "var(--text-light)", flexShrink: 0 }} />
                  </Link>
                ))}

                <button
                  className="nbm__catFooterBtn"
                  onClick={() => handleNavTo(`/study-india/${drilledCatId}`)}
                >
                  View all {drilledCatMeta.category} courses <ArrowRight size={13} />
                </button>
              </motion.div>
            )}

            {/* ── AI TOOLS ── */}
            {currentPanel.key === "ai" && (
              <motion.div
                key="ai"
                className="nbm__panel"
                custom={navDirection}
                variants={panelVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <button className="nbm__backRow" onClick={popPanel}>
                  <div className="nbm__backIcon"><ChevronLeft size={16} /></div>
                  <div className="nbm__backText">
                    <span className="nbm__backLabel">AI Tools</span>
                    <span className="nbm__backSub">Back to menu</span>
                  </div>
                </button>

                <Link to="/ai-tools" onClick={closeMobile} className="nbm__viewAll">
                  <div className="nbm__viewAllIcon"><Zap size={16} /></div>
                  <div className="nbm__viewAllText">
                    <span className="nbm__viewAllTitle">View All AI Tools</span>
                    <span className="nbm__viewAllSub">Explore the full AI suite</span>
                  </div>
                  <ArrowRight size={15} style={{ color: "var(--primary)", flexShrink: 0 }} />
                </Link>

                {AI_ITEMS.map(({ to, label, desc, Icon, accent, bg }) => (
                  <Link key={to} to={to} onClick={closeMobile}
                    className={`nbm__aiItem${location.pathname === to ? " active" : ""}`}>
                    <div className="nbm__aiIcon" style={{ background: bg }}>
                      <Icon size={19} color={accent} strokeWidth={2} />
                    </div>
                    <div className="nbm__aiContent">
                      <span className="nbm__aiName">{label}</span>
                      <span className="nbm__aiDesc">{desc}</span>
                    </div>
                    <ArrowRight size={15} className="nbm__aiArrow" />
                  </Link>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="nbm__footer">
          <Link to="/signup" onClick={closeMobile} className="nbm__ctaPrimary">
            <UserPlus size={16} /> Sign Up Free
          </Link>
          <Link to="/contact" onClick={closeMobile} className="nbm__ctaSecondary">
            <Phone size={14} /> Book Free Counselling
          </Link>
        </div>
      </aside>
    </>
  );
} 