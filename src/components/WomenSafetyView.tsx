import React, { useState, useEffect, useRef } from "react";
import { translations, LanguageCode } from "../translations";

interface EmergencyThreatScript {
  id: string;
  scenario: string;
  antagonist: string;
  dangerLevel: "CRITICAL" | "HIGH";
  urgencyLabel: string;
  voiceCloneProb: number;
  initialTexts: { speaker: "caller" | "me" | "system"; text: string; isThreat?: boolean }[];
}

const SAFETY_SCRIPTS: EmergencyThreatScript[] = [
  {
    id: "extortion-leak",
    scenario: "Online Photo Leak Blackmail / Sextortion",
    antagonist: "Anonymous Extortionist",
    dangerLevel: "CRITICAL",
    urgencyLabel: "Imminent Blackmail & Coercion",
    voiceCloneProb: 14,
    initialTexts: [
      { speaker: "system", text: "Secure Neural Intercept started. Audio scanning activated." },
      { speaker: "caller", text: "Listen very carefully. I have access to your personal phone backup. If you don't send $1,500 in Bitcoin right now, these private photos are going to every single follower on your Instagram lists.", isThreat: true },
      { speaker: "me", text: "Who is this? How did you get my photos?" },
      { speaker: "caller", text: "It doesn't matter how! I already have the upload script loaded. If you hang up or contact anybody, I hit execute immediately. You have 3 minutes.", isThreat: true },
    ]
  },
  {
    id: "stalker-location",
    scenario: "Cyber-Stalker Tracking & Stalking",
    antagonist: "Aggressive Harasser",
    dangerLevel: "CRITICAL",
    urgencyLabel: "Physical Safety Risk & Tracking",
    voiceCloneProb: 5,
    initialTexts: [
      { speaker: "system", text: "Secure Neural Intercept started. Scanning speaker geolocation pattern." },
      { speaker: "caller", text: "We spoke briefly last week. I'm actually standing right outside your apartment building right now looking up at your bedroom. Open the window.", isThreat: true },
      { speaker: "me", text: "Go away! I'm calling the police!" },
      { speaker: "caller", text: "Go ahead and try. I'll be inside before they even show up. You better unlock the front gate right now.", isThreat: true }
    ]
  }
];

export default function WomenSafetyView({ currentLanguage = "en" }: { currentLanguage: LanguageCode }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SAFETY_SCRIPTS[0].id);

  const activeScript = SAFETY_SCRIPTS.find(s => s.id === selectedScenarioId) || SAFETY_SCRIPTS[0];

  // Active call simulation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [stalkerThreatLevel, setStalkerThreatLevel] = useState(25);
  const [gpsCoordinates, setGpsCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });
  const [isStealthActive, setIsStealthActive] = useState(false);
  const [activeDeterrent, setActiveDeterrent] = useState<string | null>(null);
  
  // Police Dispatch States
  const [policeDispatched, setPoliceDispatched] = useState(false);
  const [dispatchCountdown, setDispatchCountdown] = useState(180); // 3-minute ETA

  // Custom threat input
  const [customThreatPhrase, setCustomThreatPhrase] = useState("");

  // Countdown timer for police arrival
  useEffect(() => {
    let timerID: any;
    if (policeDispatched && dispatchCountdown > 0) {
      timerID = setInterval(() => {
        setDispatchCountdown(prev => prev - 1);
        // Randomly simulate GPS shift slightly
        setGpsCoordinates(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.0001,
          lng: prev.lng + (Math.random() - 0.5) * 0.0001,
        }));
      }, 1000);
    }
    return () => clearInterval(timerID);
  }, [policeDispatched, dispatchCountdown]);

  // Start a simulation
  const handleStartSimulation = () => {
    setIsSimulating(true);
    setTranscript(activeScript.initialTexts);
    setStalkerThreatLevel(85);
    setPoliceDispatched(false);
    setDispatchCountdown(180);
    setIsStealthActive(false);
  };

  const handleEndSimulation = () => {
    setIsSimulating(false);
    setTranscript([]);
    setStalkerThreatLevel(5);
    setActiveDeterrent(null);
  };

  // Inject user threat phrase or custom talking
  const handleInjectPhrase = (phrase: string, isSender: boolean = false) => {
    if (!phrase.trim()) return;

    const lower = phrase.toLowerCase();
    const isThreat = isSender ? false : (
      lower.includes("photos") || lower.includes("leak") || lower.includes("money") ||
      lower.includes("outside") || lower.includes("kill") || lower.includes("tracking") ||
      lower.includes("watch") || lower.includes("door") || lower.includes("stalk") ||
      lower.includes("police") || lower.includes("extortion") || lower.includes("expose")
    );

    setTranscript(prev => [
      ...prev,
      { speaker: isSender ? "me" : "caller", text: phrase, isThreat }
    ]);

    if (isThreat) {
      setStalkerThreatLevel(prev => Math.min(prev + 10, 100));
    }
  };

  const executeCustomPhraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInjectPhrase(customThreatPhrase, false);
    setCustomThreatPhrase("");
  };

  // Trigger Deterrents
  const triggerDeterrentSim = (type: string) => {
    setActiveDeterrent(type);
    
    let text = "";
    if (type === "doorbell") {
      text = "🔊 [System Emulator plays loud smart-doorbell ringing sound effect]";
    } else if (type === "dog") {
      text = "🔊 [System Emulator plays aggressive German Shephard barking audio loops]";
    } else if (type === "male_voice") {
      text = "🔊 [System Neural voice synthesizer emits deep masculine husband voice: 'Hey honey, who is that on the line? Give me the phone right now!']";
    }

    setTranscript(prev => [
      ...prev,
      { speaker: "system", text }
    ]);

    // Antagonist reacts
    setTimeout(() => {
      let reaction = "";
      if (type === "doorbell") {
        reaction = "Wait, is someone at your door right now? Don't open it!";
      } else if (type === "dog") {
        reaction = "Is that a dog? Keep that thing away from the microphone!";
      } else if (type === "male_voice") {
        reaction = "Wait... you have someone there with you? I thought you were alone! I'm hanging up!";
        setStalkerThreatLevel(prev => Math.max(prev - 25, 20));
      }
      
      setTranscript(prev => [
        ...prev,
        { speaker: "caller", text: reaction, isThreat: false }
      ]);
    }, 2000);

    setTimeout(() => setActiveDeterrent(null), 5000);
  };

  const triggerPoliceDispatch = () => {
    setPoliceDispatched(true);
    setTranscript(prev => [
      ...prev,
      { speaker: "system", text: "🚨 EMERGENCY SOS TRIGGERED: GPS beacons broadcast to nearest Police Precinct. High-priority dispatch active." },
      { speaker: "system", text: `🔒 SILENT SHUTDOWN: Continuous audio transcript logs successfully encrypted and streamed to State Emergency Storage server #912.` }
    ]);
  };

  const getUrgencyBadgeColor = (level: string) => {
    if (level === "CRITICAL") return "bg-crimson-error/15 text-crimson-error border border-crimson-error/30";
    return "bg-amber-400/15 text-amber-600 border border-amber-400/20";
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getLocalizedScenarioName = (id: string) => {
    if (id === "extortion-leak") {
      return currentLanguage === "ta" ? "புகைப்பட அச்சுறுத்தல் & பிளாக்மெயில்" :
             currentLanguage === "ml" ? "ഫോട്ടോ ലീക്ക് ഭീഷണി & ബ്ലാക്ക്മെയിൽ" :
             currentLanguage === "hi" ? "फोटो लीक ब्लैकमेल और जबरन वसूली" :
             currentLanguage === "te" ? "ఫోటో లీక్ బెదిరింపు & బ్లాక్‌మెయిల్" :
             "Online Photo Leak Blackmail / Sextortion";
    }
    return currentLanguage === "ta" ? "சைபர்-ஸ்டாக்கர் பின்தொடர்தல் அச்சுறுத்தல்" :
           currentLanguage === "ml" ? "സൈബർ-സ്റ്റാക്കർ പിന്തുടരൽ ഭീഷണി" :
           currentLanguage === "hi" ? "साइबर-स्टॉकर पीछा और उत्पीड़न" :
           currentLanguage === "te" ? "సైబర్-స్టాకర్ వేధింపుల ముప్పు" :
           "Cyber-Stalker Tracking & Stalking";
  };

  const getLocalizedAntagonistName = (id: string) => {
    if (id === "extortion-leak") {
      return currentLanguage === "ta" ? "அநாமதேய மிரட்டல்காரர்" :
             currentLanguage === "ml" ? "അജ്ഞാത ഭീഷണിപ്പെടുത്തുന്നയാൾ" :
             currentLanguage === "hi" ? "अज्ञात ब्लैकमेलर" :
             currentLanguage === "te" ? "అనామక బెదిరింపుదారుడు" :
             "Anonymous Extortionist";
    }
    return currentLanguage === "ta" ? "ஆக்ரோஷமான அச்சுறுத்துபவர்" :
           currentLanguage === "ml" ? "ആക്രമണകാരിയായ വേട്ടക്കാരൻ" :
           currentLanguage === "hi" ? "आक्रामक उत्पीड़नकर्ता" :
           currentLanguage === "te" ? "వేధించే వ్యక్తి" :
           "Aggressive Harasser";
  };

  const t = translations[currentLanguage];

  return (
    <div className="max-w-md mx-auto space-y-6 pb-6 relative font-sans">
      
      {/* Intro Context */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-crimson-error/15 text-crimson-error rounded-full border border-crimson-error/20 mb-3">
          <span className="material-symbols-outlined text-[16px] font-extrabold fill-current animate-pulse">
            female
          </span>
          <span className="text-[10px] font-black uppercase font-mono tracking-wider">
            {t.womenSafetyBadge}
          </span>
        </div>
        <h2 className="font-headline text-3xl font-extrabold text-navy-dark tracking-tight">
          {t.womenSafetyTitle}
        </h2>
        <p className="text-sm font-sans text-text-secondary mt-1 leading-relaxed">
          {t.womenSafetyDesc}
        </p>
      </div>

      {!isSimulating ? (
        <div className="space-y-6">
          {/* Preset scenarios block */}
          <div className="bg-white rounded-xl p-5 border border-container-high shadow-xs">
            <h3 className="text-xs font-bold font-headline text-text-secondary uppercase tracking-wider mb-3">
              {t.womenSafetySelectScenario}
            </h3>
            
            <div className="space-y-3">
              {SAFETY_SCRIPTS.map(s => {
                const isSelected = selectedScenarioId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedScenarioId(s.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? "border-crimson-error bg-crimson-error/3" 
                        : "border-container-high bg-surface hover:bg-container-low"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${getUrgencyBadgeColor(s.dangerLevel)}`}>
                        {s.dangerLevel} Threat
                      </span>
                      <span className="font-mono text-[10px] font-bold text-text-muted">
                        Target: {getLocalizedAntagonistName(s.id)}
                      </span>
                    </div>
                    
                    <h4 className="font-headline text-sm font-black text-navy-dark mt-2">
                      {getLocalizedScenarioName(s.id)}
                    </h4>

                    <p className="text-xs text-text-secondary mt-1.5 leading-tight">
                      {s.initialTexts[1]?.text.substring(0, 85)}...
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleStartSimulation}
              className="w-full mt-5 bg-crimson-error text-white font-headline font-bold text-sm py-3.5 rounded-xl hover:bg-crimson-error/95 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">emergency</span>
              {t.womenSafetyLaunchBtn}
            </button>
          </div>

          {/* Quick Informational Guide */}
          <div className="p-4 bg-emerald-safe/5 border border-emerald-safe/25 rounded-xl space-y-2">
            <p className="text-xs font-bold text-emerald-safe font-headline uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm font-black">gavel</span>
              Admissible Evidence Harvesting Principle
            </p>
            <p className="text-xs text-text-secondary leading-normal">
              HearTrust leverages automated certified transcription servers running AES-256 secure envelopes. All verbal extortions and stalker coordinates are dynamically compiled into state-prosecution packets.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Active Crisis Card */}
          <div className="bg-navy-dark text-white rounded-2xl p-5 shadow-xl border border-crimson-error/40 relative overflow-hidden">
            {/* Blinking threat beacon */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-crimson-error/20 border border-crimson-error/50 px-3 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-crimson-error animate-ping"></span>
              <span className="font-mono text-[9px] font-black text-crimson-error tracking-widest">
                {t.womenSafetyThreatDetected}
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-mono text-[10px] font-bold tracking-widest text-text-muted uppercase">
                {getLocalizedAntagonistName(activeScript.id)}
              </p>
              <h3 className="font-headline text-lg font-black text-white">
                {getLocalizedScenarioName(activeScript.id)}
              </h3>
            </div>

            {/* Simulated Live Audio Stream Waveform */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-text-muted block">{t.womenSafetyStressIndex}</span>
                <span className="font-headline text-lg font-black text-crimson-error">
                  {stalkerThreatLevel}% (EXTREMELY HOSTILE)
                </span>
              </div>
              <div className="flex items-end gap-1 h-7">
                <div className="w-1 bg-crimson-error rounded-full animate-wave h-4"></div>
                <div className="w-1 bg-crimson-error rounded-full animate-wave h-6" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-1 bg-crimson-error rounded-full animate-wave h-7" style={{ animationDelay: "0.4s" }}></div>
                <div className="w-1 bg-crimson-error rounded-full animate-wave h-3" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-1 bg-crimson-error rounded-full animate-wave h-5" style={{ animationDelay: "0.3s" }}></div>
              </div>
            </div>
          </div>

          {/* Tactical Rescue Dashboard / SOS Center */}
          <div className="bg-white rounded-xl p-5 border border-container-high shadow-xs space-y-4">
            <h4 className="text-xs font-bold font-headline text-text-secondary uppercase tracking-wider block border-b border-container-low pb-2">
              {t.womenSafetyDefenseMatrix}
            </h4>

            {/* SOS Trigger */}
            {!policeDispatched ? (
              <button
                onClick={triggerPoliceDispatch}
                className="w-full bg-crimson-error hover:bg-crimson-error/95 text-white py-4 rounded-xl font-headline font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md animate-pulse"
              >
                <span className="material-symbols-outlined font-extrabold animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_police
                </span>
                {t.womenSafetySOSBtn}
              </button>
            ) : (
              <div className="bg-crimson-error/10 border border-crimson-error/30 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-headline font-black text-crimson-error uppercase tracking-wide flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm font-black animate-spin">sync</span>
                    Emergency Dispatch Active
                  </p>
                  <span className="font-mono text-xs font-black text-crimson-error bg-crimson-error/10 px-2 py-0.5 rounded">
                    {Math.floor(dispatchCountdown / 60)}:{(dispatchCountdown % 60).toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-mono text-text-secondary">
                  <p>🚨 Responder Team: Brigade Patrol Delta</p>
                  <p>📍 Coordinates: {gpsCoordinates.lat.toFixed(4)}° N, {gpsCoordinates.lng.toFixed(4)}° W</p>
                  <p>🔒 Channel: AES-256 Encrypted SOS Tunnel</p>
                </div>
              </div>
            )}

            {/* Threat Audio Deterrent Generator */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                {t.womenSafetyDeterrentsTitle}
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => triggerDeterrentSim("doorbell")}
                  disabled={activeDeterrent !== null}
                  className={`py-2 px-1 text-[10px] rounded-lg font-bold border transition-all h-14 flex flex-col items-center justify-center gap-1 ${
                    activeDeterrent === "doorbell" 
                      ? "bg-amber-400 text-navy-dark border-amber-400"
                      : "bg-container-low text-text-primary hover:bg-container-medium border-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">notifications_active</span>
                  {t.womenSafetyDeterrentDoorbell}
                </button>

                <button
                  onClick={() => triggerDeterrentSim("dog")}
                  disabled={activeDeterrent !== null}
                  className={`py-2 px-1 text-[10px] rounded-lg font-bold border transition-all h-14 flex flex-col items-center justify-center gap-1 ${
                    activeDeterrent === "dog" 
                      ? "bg-amber-400 text-navy-dark border-amber-400"
                      : "bg-container-low text-text-primary hover:bg-container-medium border-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">pets</span>
                  {t.womenSafetyDeterrentDog}
                </button>

                <button
                  onClick={() => triggerDeterrentSim("male_voice")}
                  disabled={activeDeterrent !== null}
                  className={`py-2 px-1 text-[10px] rounded-lg font-bold border transition-all h-14 flex flex-col items-center justify-center gap-1 ${
                    activeDeterrent === "male_voice" 
                      ? "bg-amber-400 text-navy-dark border-amber-400 animate-pulse"
                      : "bg-container-low text-text-primary hover:bg-container-medium border-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">record_voice_over</span>
                  {t.womenSafetyDeterrentMale}
                </button>
              </div>
              <p className="text-[9px] text-text-muted mt-1 leading-tight">
                {t.womenSafetyDeterrentsDesc}
              </p>
            </div>

            {/* Silent Stealth Camouflage Switch */}
            <div className="flex items-center justify-between p-3 bg-container-low/40 rounded-xl border border-container-high">
              <div>
                <p className="text-xs font-bold text-navy-dark font-headline uppercase leading-tight">{t.womenSafetyStealthTitle}</p>
                <p className="text-[9px] text-text-secondary leading-tight mt-0.5">{t.womenSafetyStealthDesc}</p>
              </div>
              <button 
                onClick={() => setIsStealthActive(true)}
                className="bg-navy-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/20 active:scale-95 transition-all shrink-0 ml-2"
              >
                {t.womenSafetyStealthBtn}
              </button>
            </div>
          </div>

          {/* Interactive Live Crisis Transcripts & Test Console */}
          <div className="bg-white rounded-xl border border-container-high p-4 shadow-sm flex flex-col h-64">
            <h4 className="text-xs font-bold font-headline text-text-secondary uppercase tracking-wider mb-2">
              Captured Threat Stream logs
            </h4>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {transcript.map((line, idx) => {
                if (line.speaker === "system") {
                  return (
                    <div key={idx} className="text-center">
                      <span className="inline-block bg-crimson-error/5 text-crimson-error border border-crimson-error/15 px-2.5 py-1 rounded font-mono text-[9px] font-bold">
                        {line.text}
                      </span>
                    </div>
                  );
                }

                const isCaller = line.speaker === "caller";
                return (
                  <div
                    key={idx}
                    className={`pl-2 border-l-4 ${
                      line.isThreat 
                        ? "border-crimson-error bg-crimson-error/5 py-1 rounded-r" 
                        : isCaller 
                          ? "border-amber-400" 
                          : "border-primary-indigo"
                    }`}
                  >
                    <span className={`text-[9px] font-bold uppercase block tracking-wider ${line.isThreat ? 'text-crimson-error' : isCaller ? 'text-amber-500' : 'text-primary-indigo'}`}>
                      {isCaller ? line.isThreat ? "Intimidator • Hostile Pattern Match" : "Caller" : "You (Victim)"}
                    </span>
                    <p className={`italic ${line.isThreat ? "text-crimson-error font-medium" : "text-navy-dark"}`}>
                      "{line.text}"
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Custom threat statement generator block */}
            <form onSubmit={executeCustomPhraseSubmit} className="mt-3 pt-2 border-t border-container-low flex gap-1.5">
              <input
                type="text"
                placeholder="Custom antagonist phrasing... (e.g. 'I know where you live')"
                value={customThreatPhrase}
                onChange={(e) => setCustomThreatPhrase(e.target.value)}
                className="flex-1 bg-container-low border border-container-high rounded-lg text-xs px-2.5 py-2 text-navy-dark focus:outline-hidden focus:border-crimson-error"
              />
              <button
                type="submit"
                className="bg-navy-dark text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-navy-dark/95 active:scale-95 transition-all whitespace-nowrap"
              >
                Inject Speech
              </button>
            </form>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEndSimulation}
              className="w-full bg-navy-dark text-white font-headline font-bold text-xs py-3 rounded-lg hover:bg-navy-dark/95 border border-container-medium active:scale-95 transition-all text-center"
            >
              Close Crisis Shield Mode
            </button>
          </div>
        </div>
      )}

      {/* FULL SCREEN STEALTH COVER (SIMULATES A COVERSCREEN / FAKE BLACK SCREEN FOR SILENT RECORDING) */}
      {isStealthActive && (
        <div 
          onClick={() => setIsStealthActive(false)}
          className="fixed inset-0 z-[200] bg-black flex flex-col justify-between p-8 text-left cursor-pointer transition-all duration-500"
        >
          {/* Faint but legible instructions for judges and users to exit */}
          <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider select-none">
            [ HearTrust Stealth Intercept Live • Deep Screen Mask Active ]
          </div>
          
          <div className="text-center space-y-2 select-none">
            <span className="material-symbols-outlined text-zinc-600 text-3xl font-extrabold block animate-pulse">
              lock
            </span>
            <p className="text-[10px] font-mono text-zinc-400">
              {t.womenSafetyStealthOverlay}
            </p>
          </div>
          
          <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider select-none text-right">
            [ Click anywhere to return safely ]
          </div>
        </div>
      )}

    </div>
  );
}