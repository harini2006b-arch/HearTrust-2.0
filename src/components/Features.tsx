import React from "react";
import { translations, LanguageCode } from "../translations";

interface FeaturesProps {
  currentLanguage: LanguageCode;
}

export default function Features({ currentLanguage }: FeaturesProps) {
  const t = translations[currentLanguage];

  const cards = [
    {
      icon: "settings_voice",
      title: t.features1Title,
      desc: t.features1Desc,
      bgColor: "bg-container-low/60",
      iconColor: "text-primary-indigo",
      darkTheme: false
    },
    {
      icon: "language",
      title: t.features2Title,
      desc: t.features2Desc,
      bgColor: "bg-emerald-safe/5",
      iconColor: "text-emerald-safe",
      darkTheme: false
    },
    {
      icon: "encrypted",
      title: t.features3Title,
      desc: t.features3Desc,
      bgColor: "bg-navy-dark",
      iconColor: "text-primary-indigo",
      darkTheme: true
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="font-headline text-3xl font-extrabold text-navy-dark mb-8 text-center md:text-left">
        {t.featuresTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div 
            key={i} 
            className={`p-6 rounded-2xl border flex flex-col gap-5 shadow-sm hover:translate-y-[-4px] transition-all duration-300 ${
              card.darkTheme 
                ? "bg-navy-dark text-white border-navy-dark" 
                : "bg-white text-navy-dark border-container-high"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.darkTheme ? 'bg-white/10' : 'bg-container-low'}`}>
              <span className={`material-symbols-outlined text-2xl font-bold ${card.iconColor}`}>
                {card.icon}
              </span>
            </div>
            
            <div>
              <h4 className="font-headline text-lg font-bold mb-2">
                {card.title}
              </h4>
              <p className={`font-sans text-sm leading-relaxed ${card.darkTheme ? 'text-container-high' : 'text-text-secondary'}`}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

