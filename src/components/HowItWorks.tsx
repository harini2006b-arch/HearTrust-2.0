import React from "react";
import callIntercept from "../../assets/call_intercept.jpg";
import neuralVoiceScan from "../../assets/neural_voice_scan.jpg";
import cyberShieldDefense from "../../assets/cyber_shield_defense.jpg";
import secureTelemetryRouting from "../../assets/secure_telemetry_routing.jpg";
import autonomousAiShield from "../../assets/autonomous_ai_shield.jpg";
import { translations, LanguageCode } from "../translations";

interface HowItWorksProps {
  currentLanguage: LanguageCode;
}

export default function HowItWorks({ currentLanguage }: HowItWorksProps) {
  const t = translations[currentLanguage];

  const steps = [
    {
      number: "1",
      title: t.howItWorksStep1Title,
      desc: t.howItWorksStep1Desc,
      imageUrl: callIntercept
    },
    {
      number: "2",
      title: t.howItWorksStep2Title,
      desc: t.howItWorksStep2Desc,
      imageUrl: neuralVoiceScan
    },
    {
      number: "3",
      title: t.howItWorksStep3Title,
      desc: t.howItWorksStep3Desc,
      imageUrl: cyberShieldDefense
    },
    {
      number: "4",
      title: t.howItWorksStep4Title,
      desc: t.howItWorksStep4Desc,
      imageUrl: secureTelemetryRouting
    },
    {
      number: "5",
      title: t.howItWorksStep5Title,
      desc: t.howItWorksStep5Desc,
      imageUrl: autonomousAiShield
    }
  ];

  return (
    <section className="bg-container-low py-16 px-6 md:px-12 rounded-3xl mb-12">
      <h2 className="font-headline text-3xl font-extrabold text-navy-dark mb-10 text-center md:text-left">
        {t.howItWorksTitle}
      </h2>
      <div className="space-y-12 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6">
            <div className="relative flex md:flex-col items-center shrink-0 w-10">
              <div className="w-10 h-10 rounded-full bg-primary-indigo text-white flex items-center justify-center font-bold z-10 text-lg shadow-md shrink-0">
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-0.5 bg-container-high absolute top-10 left-1/2 -translate-x-1/2 h-36 mt-2"></div>
              )}
            </div>
            
            <div className="flex-1 w-full min-w-0">
              <h3 className="font-headline text-xl font-bold text-navy-dark mb-2">
                {step.title}
              </h3>
              <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed mb-4">
                {step.desc}
              </p>
              
              <div className="rounded-2xl overflow-hidden border border-container-high shadow-sm relative group bg-white aspect-video">
                <img 
                  src={step.imageUrl} 
                  referrerPolicy="no-referrer"
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/10 to-transparent"></div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
