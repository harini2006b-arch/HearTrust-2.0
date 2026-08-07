import React, { useState } from "react";
import { LanguageCode } from "../translations";

interface HeaderProps {
  appName: string;
  onNavigateHome: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

const LANGUAGES: { code: LanguageCode; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
];

export default function Header({ 
  appName, 
  onNavigateHome, 
  currentPage, 
  onNavigate, 
  currentLanguage, 
  onLanguageChange 
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeLanguage = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  const handleSelectLanguage = (code: LanguageCode) => {
    onLanguageChange(code);
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-white border-b border-container-high shadow-sm">
      <div 
        className="flex items-center gap-3 cursor-pointer select-none group" 
        onClick={onNavigateHome}
      >
        <span className="material-symbols-outlined text-primary-indigo text-3xl font-bold group-hover:scale-105 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
          shield_with_heart
        </span>
        <h1 className="font-headline text-2xl font-extrabold text-navy-dark tracking-tight">
          {appName}
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        {currentPage === "ACTIVE_PROTECTION" && (
          <div className="hidden sm:flex items-center gap-2 bg-emerald-safe/10 border border-emerald-safe/20 px-3 py-1 rounded-full">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-safe animate-pulse"></span>
            <span className="font-mono text-[10px] font-bold text-emerald-safe uppercase tracking-wider">
              Active Protection
            </span>
          </div>
        )}
        {currentPage === "EMERGENCY" && (
          <div className="flex items-center gap-2 bg-crimson-error/15 border border-crimson-error/30 px-3 py-1.5 rounded-full animate-pulse">
            <span className="material-symbols-outlined text-sm text-crimson-error" style={{ fontVariationSettings: "'FILL' 1" }}>
              emergency
            </span>
            <span className="font-mono text-[10px] font-bold text-crimson-error uppercase tracking-widest">
              Live Threat
            </span>
          </div>
        )}

        {/* Multilingual Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-headline bg-container-low text-primary-indigo hover:bg-container-medium transition-colors border border-primary-indigo/10 active:scale-95 transition-transform select-none"
            title="Switch Language"
          >
            <span className="material-symbols-outlined text-base">translate</span>
            <span>{activeLanguage.nativeLabel}</span>
            <span className="material-symbols-outlined text-[14px]">
              {isDropdownOpen ? "arrow_drop_up" : "arrow_drop_down"}
            </span>
          </button>

          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-40 bg-white border border-container-high rounded-xl shadow-lg py-1.5 z-50 animate-fade-in font-headline">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between hover:bg-container-low transition-colors ${
                      currentLanguage === lang.code 
                        ? "text-primary-indigo bg-primary-indigo/5" 
                        : "text-navy-dark"
                    }`}
                  >
                    <span>{lang.nativeLabel}</span>
                    <span className="text-[10px] font-mono font-medium opacity-60">({lang.label})</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        <button 
          onClick={() => onNavigate("settings")}
          className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:bg-container-low transition-colors"
          title="Account Settings"
        >
          <span className="material-symbols-outlined text-2xl">account_circle</span>
        </button>
      </div>
    </header>
  );
}

