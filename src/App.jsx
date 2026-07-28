import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import AITools from "./pages/AITools";
import AICourseMatch from "./pages/AICourseMatch";
import EligibilityChecker from "./pages/EligibilityChecker";
import BudgetCalculator from "./pages/BudgetCalculator";
import CompareColleges from "./pages/CompareColleges";
import CountryFitQuiz from "./pages/CountryFitQuiz";
import StudyDestination from "./pages/StudyDestination";
import Contact from "./pages/Contact";
import StudyIndia from "./pages/StudyIndia";
import CategoryPage from "./pages/study-india/CategoryPage";
import CourseDetails from "./pages/study-india/CourseDetails";
import CitySelection from "./pages/study-india/CitySelection";
import CollegeList from "./pages/study-india/CollegeList";
import CountryDetails from "./pages/CountryDetails";

function App() {
  const location = useLocation();

  // ✅ FIX: scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/ai-course-match" element={<AICourseMatch />}/>
        <Route path="/eligibility-checker" element={<EligibilityChecker />}/>
        <Route path="/budget-calculator" element={<BudgetCalculator />} />
        <Route path="/compare-colleges" element={<CompareColleges />} />
        <Route path="/country-fit-quiz" element={<CountryFitQuiz />} />
        <Route path="/study-destination" element={<StudyDestination/>} />
        <Route path="/study-destination/:countryId" element={<CountryDetails />}/>
        <Route path="/contact" element={<Contact/>} />   
        <Route path="/study-india" element={<StudyIndia />} />
        <Route path="/study-india/:categoryId" element={<CategoryPage />} />
        <Route path="/study-india/:categoryId/:courseSlug" element={<CourseDetails />} />
        <Route path="/study-india/:categoryId/:courseSlug/:stateId" element={<CitySelection />}/>
        <Route path="/study-india/colleges/:stateId/:cityId" element={<CollegeList />}/>

      </Routes>

      <Footer />
    </>
  );
}

export default App;