"use client";

import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

const STREAMLIT_URL = "https://scam-evo-frontend-vercel-app.streamlit.app/";

export default function Page() {
  return (
    <main>
      <Hero streamlitUrl={STREAMLIT_URL} />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
