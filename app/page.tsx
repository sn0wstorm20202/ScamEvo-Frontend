"use client";

import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import Features from "./components/Features";
import Results from "./components/Results";
import HowItWorks from "./components/HowItWorks";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";
import Credits from "./components/Credits";

const STREAMLIT_URL = "https://scam-evo-frontend-vercel-app.streamlit.app/";

export default function Page() {
  return (
    <main>
      <Hero streamlitUrl={STREAMLIT_URL} />
      <ProblemSolution />
      <Features />
      <Results />
      <HowItWorks />
      <TechStack />
      <Footer />
      <Credits />
    </main>
  );
}
