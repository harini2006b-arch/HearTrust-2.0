import React, { useState, useEffect } from "react";
import { CallStatus, CallLog, TranscriptLine, ScamReport, CallType } from "./types";
import { INITIAL_CALL_LOGS } from "./data";
import { translations, LanguageCode } from "./translations";


// Component imports
import Header from "./components/Header";
import OnboardingView from "./components/OnboardingView";
import ActiveCallView from "./components/ActiveCallView";
import DashboardView from "./components/DashboardView";
import EmergencyView from "./components/EmergencyView";
import ReportFormView from "./components/ReportFormView";
import SettingsView from "./components/SettingsView";
import ActiveLogDetail from "./components/ActiveLogDetail";
import WomenSafetyView from "./components/WomenSafetyView";
import AuthView from "./components/AuthView";

export default function App() {
  // Multilingual localization state
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem("hearttrust_lang") as LanguageCode) || "en";
  });

  const handleLanguageChange = (lang: LanguageCode) => {
    localStorage.setItem("hearttrust_lang", lang);
    setCurrentLanguage(lang);
  };

  // User Authentication & Preserving Profile state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("hearttrust_auth") === "true";
  });
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem("hearttrust_user");
    return saved ? JSON.parse(saved) : null;
  });


  const handleAuthSuccess = (userData: any) => {
    localStorage.setItem("hearttrust_auth", "true");
    localStorage.setItem("hearttrust_user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("hearttrust_auth");
    localStorage.removeItem("hearttrust_user");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setShowMarketingLanding(true);
  };

  // Navigation & Interactive States
  const [showMarketingLanding, setShowMarketingLanding] = useState(true);
  const [currentNavigationTab, setCurrentNavigationTab] = useState<string>("protect");
  
  // Call status
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.IDLE);
  
  // Database states
  const [logs, setLogs] = useState<CallLog[]>(INITIAL_CALL_LOGS);
  const [allReports, setAllReports] = useState<ScamReport[]>([]);
  const [activeCallMedium, setActiveCallMedium] = useState<CallType>(CallType.VOICE);
  
  // Highlighting Log Detail overlay
  const [selectedDetailedLog, setSelectedDetailedLog] = useState<CallLog | null>(null);

  // Dialer input memory for judges' demo speed codes
  const [dialedDigits, setDialedDigits] = useState<string>("");

  // Splash Screen State
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Elderly Auto-Pilot states for custom 4-stage crisis flow
  const [isElderlyAutoPilotActive, setIsElderlyAutoPilotActive] = useState(false);
  const [shouldAutoImmunizeMap, setShouldAutoImmunizeMap] = useState(false);
  const [guardianRoute, setGuardianRoute] = useState<"FAMILY" | "PRECINCT" | "WARDEN" | "AUTONOMOUS">("FAMILY");

  // Trigger Incoming Call Simulation
  const handleInitiateSandboxCall = (dialedNumberOrScript?: any, type: CallType = CallType.VOICE) => {
    setActiveCallMedium(type);
    if (dialedNumberOrScript && typeof dialedNumberOrScript === "string") {
      setDialedDigits(dialedNumberOrScript);
      
      // Speed dial 911 -> Redirect directly to the specialized Women's Safety Crisis View
      if (dialedNumberOrScript === "911") {
        setCurrentNavigationTab("womensafe");
        setShowMarketingLanding(false);
        setCallStatus(CallStatus.IDLE);
        return;
      }
    } else {
      setDialedDigits("");
    }
    setCallStatus(CallStatus.ACTIVE_PROTECTION);
    setShowMarketingLanding(false);
  };

  // Close simulation / Save to History Logs
  const handleEndCall = (finalRisk: number, finalDeepfake: number, transcript: TranscriptLine[], forceImmunize?: boolean) => {
    // Generate new Call Log dynamically based on active scam simulation
    const code = Math.floor(Math.random() * 9000) + 1000;
    const isHighThreat = finalRisk >= 60;
    
    let mediumLabel = "";
    if (activeCallMedium === CallType.WHATSAPP) {
      mediumLabel = "WhatsApp";
    } else if (activeCallMedium === CallType.SMS) {
      mediumLabel = "SMS";
    } else if (activeCallMedium === CallType.OTHER) {
      mediumLabel = "Other Channel";
    } else {
      mediumLabel = "Voice Call";
    }

    const newLogItem: CallLog = {
      id: "log-" + Date.now(),
      caller: isHighThreat ? `${mediumLabel} Scam Blocked` : `${mediumLabel} Caller`,
      number: `+1 (555) 012-${code}`,
      time: "Just Now",
      duration: "1m 32s",
      status: isHighThreat ? "WARNING" : "SAFE",
      label: isHighThreat ? `${mediumLabel} Fraud Attempt Blocked` : `AI Verified ${mediumLabel}`,
      transcript: transcript,
      scamRisk: finalRisk,
      deepfakeScore: finalDeepfake
    };

    setLogs(prev => [newLogItem, ...prev]);
    setCallStatus(CallStatus.IDLE);
    setCurrentNavigationTab("protect");
    if (forceImmunize) {
      setShouldAutoImmunizeMap(true);
    }
  };


  // Trigger Crisis Mode
  const handleTriggerEmergency = () => {
    setCallStatus(CallStatus.EMERGENCY);
  };

  // Cancel Crisis Mode
  const handleCancelEmergency = () => {
    setCallStatus(CallStatus.ACTIVE_PROTECTION);
  };

  // Handle reporting form submission
  const handleAddNewReportInput = (report: ScamReport) => {
    setAllReports(prev => [report, ...prev]);
    
    // Add reported scam directly into history database list for supreme fidelity!
    const appendReportAsLogItem: CallLog = {
      id: "report-log-" + Date.now(),
      caller: "Reported: " + report.number,
      number: report.number,
      time: report.timestamp,
      duration: "Report Submitted",
      status: "WARNING",
      label: report.callType === CallType.VOICE ? "Voice Scam Report" : "SMS/App Scam",
      transcript: [
        { speaker: "system", text: "Reported Context: " + report.details },
        { speaker: "system", text: report.fileName ? "Attached Audio: " + report.fileName : "No attachment specified" }
      ],
      scamRisk: 99,
      deepfakeScore: 90
    };
    
    setLogs(prev => [appendReportAsLogItem, ...prev]);
  };

  // Clear log logs database
  const handleClearHistory = () => {
    setLogs([]);
  };

  // Reset database defaults
  const handleResetDatabase = () => {
    setLogs(INITIAL_CALL_LOGS);
    setAllReports([]);
  };

  const handleStartProtectionClick = () => {
    setShowMarketingLanding(false);
    setCurrentNavigationTab("protect");
  };

  if (!isAuthenticated) {
    return (
      <AuthView 
        onAuthSuccess={handleAuthSuccess} 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  if (showSplashScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 font-sans">
        <style>{`
          @keyframes drawLogo {
            0% { opacity: 0; transform: scale(0.85); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes slideInText {
            0% { opacity: 0; letter-spacing: -2px; filter: blur(4px); }
            100% { opacity: 1; letter-spacing: normal; filter: blur(0); }
          }
          .animate-draw-logo {
            animation: drawLogo 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-text-glow {
            animation: slideInText 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes waveVertical {
            0%, 100% { height: 6px; }
            50% { height: 20px; }
          }
          .splash-wave-bar {
            animation: waveVertical 1s ease-in-out infinite;
          }
        `}</style>
        
        {/* Logo and Brand Title Wrapper */}
        <div className="flex items-center gap-6 animate-draw-logo max-w-md px-4 select-none">
          
          {/* Recreated Logo SVG */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            
            {/* Left Soundwaves */}
            <div className="absolute left-[-22px] flex items-center gap-0.5 h-6">
              <div className="w-[2.5px] h-[6px] bg-[#7928ca] rounded-full splash-wave-bar" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-[2.5px] h-[14px] bg-[#7928ca] rounded-full splash-wave-bar" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-[2.5px] h-[18px] bg-[#7928ca] rounded-full splash-wave-bar" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-[2.5px] h-[12px] bg-[#7928ca] rounded-full splash-wave-bar" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-[2.5px] h-[6px] bg-[#7928ca] rounded-full splash-wave-bar" style={{ animationDelay: '0.4s' }}></div>
            </div>

            {/* Main Shield & Ear Vector */}
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Left Shield Half (Black) */}
              <path d="M 50 10 L 15 20 C 15 50, 30 75, 50 85 Z" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Right Shield Half (Purple) */}
              <path d="M 50 10 L 85 20 C 85 50, 70 75, 50 85 Z" stroke="#7928ca" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Ear Silhouette inside shield */}
              <path d="M 50 30 C 40 30, 35 38, 35 48 C 35 58, 42 62, 42 66 C 42 70, 50 72, 50 72 M 50 36 C 45 36, 42 41, 42 48 C 42 55, 47 57, 47 62" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

              {/* Padlock at bottom tip of shield */}
              <rect x="42" y="72" width="16" height="12" rx="3" fill="#7928ca" />
              <path d="M 45 72 V 68 C 45 64, 55 64, 55 68 V 72" stroke="#7928ca" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="50" cy="78" r="1.5" fill="#ffffff" />
            </svg>

            {/* Right Neural Nodes Overlay */}
            <div className="absolute right-[-24px] w-8 h-12 flex flex-col justify-between items-start">
              <div className="flex items-center">
                <div className="w-4 h-[1.5px] bg-[#7928ca]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#7928ca]"></div>
              </div>
              <div className="flex items-center ml-2">
                <div className="w-2 h-[1.5px] bg-[#7928ca]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#7928ca]"></div>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-[1.5px] bg-[#7928ca]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#7928ca]"></div>
              </div>
            </div>

          </div>

          {/* Right Brand Text details */}
          <div className="text-left animate-text-glow space-y-1">
            <h1 className="font-headline text-5xl font-black tracking-tight leading-none flex items-center">
              <span className="text-black">Hear</span>
              <span className="text-[#7928ca]">Trust</span>
            </h1>
            
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="h-[1.5px] w-6 bg-[#7928ca]/60"></div>
              <p className="text-[10px] font-headline font-black text-navy-dark uppercase tracking-widest whitespace-nowrap">
                Hear the Truth. <span className="text-[#7928ca]">Trust the Voice.</span>
              </p>
              <div className="h-[1.5px] w-6 bg-[#7928ca]/60"></div>
            </div>
          </div>

        </div>

        {/* Loading Spinner at the bottom */}
        <div className="absolute bottom-16 flex flex-col items-center gap-2">
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest animate-pulse">Initializing Cyber Shield...</span>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light text-navy-dark flex flex-col font-sans">
      
      {/* Dynamic Header Component */}
      <Header 
        appName="HearTrust" 
        onNavigateHome={() => setShowMarketingLanding(true)}
        currentPage={callStatus}
        onNavigate={(page) => {
          setShowMarketingLanding(false);
          setCurrentNavigationTab(page);
        }}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Canvas Area */}
      <main className="flex-1 pt-20 pb-28 px-6 max-w-5xl mx-auto w-full">
        
        {/* Onboarding Presentation Hero Mode */}
        {showMarketingLanding && callStatus === CallStatus.IDLE && (
          <OnboardingView 
            onStartProtection={handleStartProtectionClick}
            onInitiateDemo={handleInitiateSandboxCall}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Dashboard Protect Screen Tab */}
        {!showMarketingLanding && callStatus === CallStatus.IDLE && currentNavigationTab === "protect" && (
          <DashboardView 
            logs={logs}
            onSelectLog={(log) => setSelectedDetailedLog(log)}
            onNavigateToReport={() => setCurrentNavigationTab("report")}
            onInitiateMockCall={handleInitiateSandboxCall}
            currentLanguage={currentLanguage}
            isElderlyAutoPilotActive={isElderlyAutoPilotActive}
            onToggleElderlyAutoPilot={() => setIsElderlyAutoPilotActive(!isElderlyAutoPilotActive)}
            shouldAutoImmunizeMap={shouldAutoImmunizeMap}
            onResetAutoImmunize={() => setShouldAutoImmunizeMap(false)}
            guardianRoute={guardianRoute}
            onSetGuardianRoute={setGuardianRoute}
          />
        )}

        {/* Call Guard Mode (Screen 2) */}
        {callStatus === CallStatus.ACTIVE_PROTECTION && (
          <ActiveCallView 
            dialedDigits={dialedDigits}
            onEndCall={handleEndCall}
            onTriggerEmergencyMode={handleTriggerEmergency}
            currentLanguage={currentLanguage}
            callMedium={activeCallMedium}
            isAutoPilotActive={isElderlyAutoPilotActive}
            guardianRoute={guardianRoute}
          />
        )}


        {/* Emergency Live Threat Mode (Screen 4) */}
        {callStatus === CallStatus.EMERGENCY && (
          <EmergencyView 
            onCancelEmergency={handleCancelEmergency}
            currentLanguage={currentLanguage}
            currentUser={currentUser}
          />
        )}

        {/* Women's Safety & Extremist Harassment Threat View */}
        {!showMarketingLanding && callStatus === CallStatus.IDLE && currentNavigationTab === "womensafe" && (
          <WomenSafetyView 
            currentLanguage={currentLanguage}
          />
        )}

        {/* Audit Logs list History tab */}
        {!showMarketingLanding && callStatus === CallStatus.IDLE && currentNavigationTab === "history" && (
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <h2 className="font-headline text-3xl font-extrabold text-navy-dark tracking-tight">
                {translations[currentLanguage].historyTitle}
              </h2>
              <p className="text-sm font-sans text-text-secondary mt-1 max-w-sm">
                {translations[currentLanguage].historyDesc}
              </p>
            </div>

            {logs.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-2xl border border-container-high shadow-xs">
                <span className="material-symbols-outlined text-4xl text-text-muted mb-2">
                  folder_open
                </span>
                <p className="font-bold text-navy-dark">{translations[currentLanguage].historyNoLogs}</p>
                <p className="text-xs text-text-secondary mt-1">{translations[currentLanguage].historyNoLogsDesc}</p>
                <button
                  onClick={handleInitiateSandboxCall}
                  className="mt-4 bg-primary-indigo text-white text-xs font-bold py-2 px-4 rounded-xl"
                >
                  {translations[currentLanguage].historyInitiateBtn}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log) => {
                  const isWarning = log.status === "WARNING";
                  const isTrusted = log.status === "TRUSTED";
                  return (
                    <div 
                      key={log.id}
                      onClick={() => setSelectedDetailedLog(log)}
                      className={`flex items-center gap-4 p-4 bg-white rounded-xl border cursor-pointer hover:bg-container-low hover:border-primary-indigo transition-all shadow-xs ${
                        isWarning ? "border-crimson-error/40 bg-crimson-error/3" : "border-container-high"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isWarning ? "bg-crimson-error/15 text-crimson-error" : isTrusted ? "bg-emerald-safe/10 text-emerald-safe" : "bg-container-low text-text-secondary"
                      }`}>
                        <span className="material-symbols-outlined text-base">
                          {isWarning ? "call_end" : isTrusted ? "contact_phone" : "person"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-navy-dark truncate text-sm">{log.caller}</p>
                        <p className="text-[11px] text-text-secondary font-mono mt-0.5">{log.time} • {log.number}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-black block font-headline ${isWarning ? 'text-crimson-error font-extrabold' : 'text-emerald-safe'}`}>
                          {log.status}
                        </span>
                        <span className="text-[10px] text-text-muted mt-0.5 block">{log.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Report a Scam Screen Form View (Screen 5) */}
        {!showMarketingLanding && callStatus === CallStatus.IDLE && currentNavigationTab === "report" && (
          <ReportFormView 
            onSubmitReport={handleAddNewReportInput}
            onNavigateHome={() => setCurrentNavigationTab("protect")}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Settings view block */}
        {!showMarketingLanding && callStatus === CallStatus.IDLE && currentNavigationTab === "settings" && (
          <SettingsView 
            onClearHistory={handleClearHistory}
            onResetDatabase={handleResetDatabase}
            logsCount={logs.length}
            onLogout={handleLogout}
            currentLanguage={currentLanguage}
          />
        )}


      </main>

      {/* Dynamic Detailed Log Modal Selector overlay */}
      {selectedDetailedLog && (
        <ActiveLogDetail 
          log={selectedDetailedLog} 
          onClose={() => setSelectedDetailedLog(null)}
          currentLanguage={currentLanguage}
        />
      )}


      {/* FIXED BOTTOM APPLICATION NAVIGATION TAB BAR BAR FROM SCREEN SCREEN 1 */}
      {callStatus === CallStatus.IDLE && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-white/95 backdrop-blur-md border-t border-container-high shadow-lg rounded-t-2xl">
          
          {/* Protect Tab */}
          <button 
            onClick={() => {
              setShowMarketingLanding(false);
              setCurrentNavigationTab("protect");
            }}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all select-none ${
              !showMarketingLanding && currentNavigationTab === "protect"
                ? "text-primary-indigo font-extrabold bg-primary-indigo/10"
                : "text-text-secondary hover:text-primary-indigo"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: !showMarketingLanding && currentNavigationTab === "protect" ? "'FILL' 1" : undefined }}>
              security
            </span>
            <span className="text-[11px] font-bold font-headline mt-0.5 tracking-tight">
              {translations[currentLanguage].navProtect}
            </span>
          </button>

          {/* History Tab */}
          <button 
            onClick={() => {
              setShowMarketingLanding(false);
              setCurrentNavigationTab("history");
            }}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all select-none ${
              !showMarketingLanding && currentNavigationTab === "history"
                ? "text-primary-indigo font-extrabold bg-primary-indigo/10"
                : "text-text-secondary hover:text-primary-indigo"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: !showMarketingLanding && currentNavigationTab === "history" ? "'FILL' 1" : undefined }}>
              history
            </span>
            <span className="text-[11px] font-bold font-headline mt-0.5 tracking-tight">
              {translations[currentLanguage].navHistory}
            </span>
          </button>

          {/* Women Safe Tab */}
          <button 
            onClick={() => {
              setShowMarketingLanding(false);
              setCurrentNavigationTab("womensafe");
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all select-none ${
              !showMarketingLanding && currentNavigationTab === "womensafe"
                ? "text-crimson-error font-extrabold bg-crimson-error/10"
                : "text-text-secondary hover:text-crimson-error"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: !showMarketingLanding && currentNavigationTab === "womensafe" ? "'FILL' 1" : undefined }}>
              female
            </span>
            <span className="text-[11px] font-bold font-headline mt-0.5 tracking-tight">
              {translations[currentLanguage].navWomenSafe}
            </span>
          </button>

          {/* Report Tab */}
          <button 
            onClick={() => {
              setShowMarketingLanding(false);
              setCurrentNavigationTab("report");
            }}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all select-none ${
              !showMarketingLanding && currentNavigationTab === "report"
                ? "text-primary-indigo font-extrabold bg-primary-indigo/10"
                : "text-text-secondary hover:text-primary-indigo"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: !showMarketingLanding && currentNavigationTab === "report" ? "'FILL' 1" : undefined }}>
              campaign
            </span>
            <span className="text-[11px] font-bold font-headline mt-0.5 tracking-tight">
              {translations[currentLanguage].navReport}
            </span>
          </button>

          {/* Settings Tab */}
          <button 
            onClick={() => {
              setShowMarketingLanding(false);
              setCurrentNavigationTab("settings");
            }}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all select-none ${
              !showMarketingLanding && currentNavigationTab === "settings"
                ? "text-primary-indigo font-extrabold bg-primary-indigo/10"
                : "text-text-secondary hover:text-primary-indigo"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: !showMarketingLanding && currentNavigationTab === "settings" ? "'FILL' 1" : undefined }}>
              settings
            </span>
            <span className="text-[11px] font-bold font-headline mt-0.5 tracking-tight">
              {translations[currentLanguage].navSettings}
            </span>

          </button>

        </nav>
      )}

    </div>
  );
}
