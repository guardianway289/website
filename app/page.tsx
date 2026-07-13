"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ActivityCarousel from "@/components/ActivityCarousel";
import TrustBar from "@/components/TrustBar";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import SafetyRings from "@/components/SafetyRings";
import {Features} from "@/components/Features";
import Stats from "@/components/Stats";
import Audiences from "@/components/Audiences";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTAFooter from "@/components/Footer";
import { Comparison } from "@/components/Comparison";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ActivityCarousel />
        <Comparison/>
        {/* <ProblemSolution /> */}
        {/* <HowItWorks /> */}
        {/* <SafetyRings /> */}
        <Features />
        {/* <Stats /> */}
        {/* <Audiences /> */}
        <Testimonials />
        <FAQ />
        <ContactForm/>
        <CTAFooter />
      </main>
    </>
  );
}
