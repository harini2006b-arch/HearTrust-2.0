import React from "react";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import { translations, LanguageCode } from "../translations";

interface OnboardingProps {
  onStartProtection: () => void;
  onInitiateDemo: () => void;
  currentLanguage: LanguageCode;
}

export default function OnboardingView({ onStartProtection, onInitiateDemo, currentLanguage }: OnboardingProps) {
  const t = translations[currentLanguage];

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-12">
      
      {/* Hero Presentation Block */}
      <section className="relative pt-6 pb-4 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 opacity-20 w-64 h-64 blur-3xl bg-primary-indigo/35 rounded-full"></div>
        <div className="absolute -left-10 top-20 -z-10 opacity-20 w-80 h-80 blur-3xl bg-emerald-safe/20 rounded-full"></div>

        <div className="flex flex-col lg:flex-row items-center gap-12 w-full">
          {/* Hero text */}
          <div className="flex-1 min-w-0 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-indigo/10 border border-primary-indigo/20 w-fit mx-auto lg:mx-0">
              <span className="material-symbols-outlined text-[18px] text-primary-indigo font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              <span className="font-mono text-xs font-bold text-primary-indigo tracking-wider uppercase">
                {t.heroBadge}
              </span>
            </div>

            <h1 className={`font-headline font-black text-navy-dark ${
              currentLanguage === "en" 
                ? "text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight" 
                : "text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.35] tracking-normal"
            }`}>
              {t.heroTitle}<span className="text-primary-indigo">{t.heroTitleSpan}</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button 
                onClick={onStartProtection}
                className="bg-primary-indigo text-white font-headline font-bold text-base py-4 px-8 rounded-xl shadow-md hover:bg-primary-indigo/90 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {t.heroStartBtn}
                <span className="material-symbols-outlined font-black">arrow_forward</span>
              </button>
              
              <button 
                onClick={onInitiateDemo}
                className="bg-navy-dark text-white font-headline font-bold text-sm py-4 px-6 rounded-xl hover:bg-navy-dark/95 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                {t.heroDemoBtn}
                <span className="material-symbols-outlined text-base">phone_in_talk</span>
              </button>
            </div>

            <p className="text-xs text-text-muted font-bold text-center lg:text-left mt-2">
              {t.heroNotice}
            </p>
          </div>

          {/* Hero visual: Gorgeous simulated smartphone mockup */}
          <div className="flex-1 min-w-0 flex justify-center relative w-full max-w-sm">
            
            {/* Phone Container */}
            <div className="w-[280px] aspect-[9/16] bg-navy-dark rounded-[2.5rem] p-3 shadow-2xl relative overflow-hidden border-[6px] border-container-high/60">
              
              {/* Screen Content */}
              <div className="w-full h-full bg-[#f8f9ff] rounded-[2rem] p-4 flex flex-col items-center justify-between">
                
                {/* Smartphone ear speaker */}
                <div className="w-12 h-1 bg-container-high rounded-full mt-2"></div>
                
                {/* Core alert shield design centered */}
                <div className="flex flex-col items-center gap-2 mt-4 flex-1 justify-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-indigo/10 border-2 border-primary-indigo shield-glow animate-pulse">
                    <span className="material-symbols-outlined text-primary-indigo text-3xl font-black">
                      security
                    </span>
                  </div>

                  <div className="text-center mt-3">
                    <p className="font-headline text-lg font-black text-navy-dark">Active Guard</p>
                    <p className="font-mono text-[11px] font-bold text-emerald-safe uppercase tracking-wider animate-pulse">
                      Monitoring Call...
                    </p>
                  </div>

                  {/* Waveform bars */}
                  <div className="flex items-end gap-1 h-8 mt-4">
                    <div className="w-1.5 bg-primary-indigo rounded-full animate-wave h-4" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1.5 bg-primary-indigo rounded-full animate-wave h-7" style={{ animationDelay: "0.3s" }}></div>
                    <div className="w-1.5 bg-primary-indigo rounded-full animate-wave h-3" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-1.5 bg-primary-indigo rounded-full animate-wave h-5" style={{ animationDelay: "0.5s" }}></div>
                    <div className="w-1.5 bg-primary-indigo rounded-full animate-wave h-2" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>

                <div className="text-center mb-2">
                  <span className="text-[9px] font-bold text-text-muted font-mono uppercase tracking-widest bg-container-low border border-container-high px-2 py-0.5 rounded">
                    HEARTTRUST v14.2
                  </span>
                </div>
              </div>
            </div>

            {/* Float warning tag overlay (Screen 1) */}
            <div className="absolute -right-4 top-1/4 bg-white border border-container-high shadow-lg px-4 py-3 rounded-xl flex items-center gap-2.5 animate-bounce">
              <span className="material-symbols-outlined text-crimson-error font-extrabold" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
              <span className="font-headline text-xs font-extrabold text-navy-dark uppercase tracking-wide">
                Scam Detected
              </span>
            </div>
            
          </div>
        </div>
      </section>

      {/* Step by step visualization block */}
      <HowItWorks currentLanguage={currentLanguage} />

      {/* Key features grid block */}
      <Features currentLanguage={currentLanguage} />

      {/* CTA promo footer section */}
      <section className="pb-6">
        <div className="bg-gradient-to-r from-primary-indigo to-[#3033cc] rounded-3xl p-8 text-center relative overflow-hidden shadow-md">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="40" id="grid_onboarding" patternUnits="userSpaceOnUse" width="40">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
                </pattern>
              </defs>
              <rect fill="url(#grid_onboarding)" height="100%" width="100%"></rect>
            </svg>
          </div>
          
          <h2 className="font-headline text-2xl sm:text-3xl font-black text-white mb-3 relative z-10">
            {t.onboardingCtaTitle}
          </h2>
          
          <p className="font-sans text-sm text-container-low max-w-lg mx-auto mb-8 relative z-10 leading-relaxed">
            {t.onboardingCtaDesc}
          </p>
          
          <button 
            onClick={onStartProtection}
            className="bg-white text-primary-indigo font-headline font-bold text-sm py-4 px-8 rounded-xl shadow-lg hover:bg-container-low active:scale-95 transition-all relative z-10"
          >
            {t.onboardingCtaBtn}
          </button>
        </div>
      </section>

    </div>
  );
}

