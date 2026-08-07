import React, { useState, useEffect } from "react";
import { CallLog, CallType } from "../types";
import { translations, LanguageCode } from "../translations";

interface ThreatNode {
  id: string;
  nameKey: string;
  x: number; // percent left
  y: number; // percent top
  threatType: string;
  count: number;
  status: "BLOCKED" | "INTERCEPTING" | "MONITORING";
  color: string;
}

const INITIAL_NODES: ThreatNode[] = [
  { id: "delhi", nameKey: "nodeDelhi", x: 45, y: 32, threatType: "IRS Tax Scam Impersonation", count: 342, status: "INTERCEPTING", color: "#F59E0B" },
  { id: "mumbai", nameKey: "nodeMumbai", x: 26, y: 58, threatType: "AI Voice Clone Extortion", count: 489, status: "BLOCKED", color: "#EF4444" },
  { id: "bengaluru", nameKey: "nodeBengaluru", x: 38, y: 78, threatType: "Credit Card Fraud Solicitation", count: 512, status: "BLOCKED", color: "#10B981" },
  { id: "chennai", nameKey: "nodeChennai", x: 45, y: 80, threatType: "Verification Token Theft", count: 219, status: "MONITORING", color: "#3B82F6" },
  { id: "kolkata", nameKey: "nodeKolkata", x: 74, y: 48, threatType: "Customs Arrest Impersonation", count: 182, status: "INTERCEPTING", color: "#F59E0B" }
];

const mapTranslations: Record<LanguageCode, Record<string, string>> = {
  en: {
    threatWatchTitle: "Real-time Global Threat Watch",
    threatWatchDesc: "Our collaborative cloud graph blocks voice clone attacks globally.",
    livePrefectsBadge: "LIVE OPERATIONS HUD",
    totalIntercepts: "Intercepts Blocked Today",
    activeNodes: "Active Nodes Online",
    telemetryTitle: "LIVE SHIELD GATEWAY DATASTREAM",
    nodeDelhi: "Delhi Regional Hub",
    nodeMumbai: "Mumbai Security Node",
    nodeBengaluru: "Bengaluru Core Interceptor",
    nodeChennai: "Chennai Telemetry Unit",
    nodeKolkata: "Kolkata Network Node",
    nodeUser: "Your Device Node (Live)",
    statusIntercepting: "INTERCEPTING SCAM",
    statusSecuring: "MONITORING SECURE",
    closeBtn: "CLOSE MAP OPERATIONS"
  },
  ta: {
    threatWatchTitle: "நிகழ்நேர உலகளாவிய அச்சுறுத்தல் கண்காணிப்பு",
    threatWatchDesc: "எங்கள் கிளவுட் நெட்வொர்க் உலகளவில் குரல் ஆள்மாறாட்ட மோசடிகளைத் தடுக்கிறது.",
    livePrefectsBadge: "நேரடி வரைபடம்",
    totalIntercepts: "இன்று தடுக்கப்பட்ட மோசடிகள்",
    activeNodes: "செயலில் உள்ள பாதுகாப்பு முனைகள்",
    telemetryTitle: "நேரடி தரவு பாதுகாப்பு ஒளிபரப்பு",
    nodeDelhi: "டெல்லி பாதுகாப்பு மையம்",
    nodeMumbai: "மும்பை பாதுகாப்பு முனை",
    nodeBengaluru: "பெங்களூரு முதன்மை தடுப்பு மையம்",
    nodeChennai: "சென்னை தரவு அலகு",
    nodeKolkata: "கொல்கத்தா பிணைய முனை",
    nodeUser: "உங்கள் சாதனம் (நேரடி)",
    statusIntercepting: "மோசடி தடுக்கப்படுகிறது",
    statusSecuring: "பாதுகாப்பாக கண்காணிக்கப்படுகிறது",
    closeBtn: "வரைபடத்தை மூடுக"
  },
  ml: {
    threatWatchTitle: "തത്സമയ ആഗോള ഭീഷണി നിരീക്ഷണം",
    threatWatchDesc: "ഞങ്ങളുടെ സുരക്ഷിത ക്ലൗഡ് ശൃംഖല ലോകമെമ്പാടുമുള്ള വോയ്സ് ക്ലോണിംഗ് തടയുന്നു.",
    livePrefectsBadge: "ലൈവ് മാപ്പ്",
    totalIntercepts: "ഇന്ന് തടഞ്ഞ തട്ടിപ്പുകൾ",
    activeNodes: "സജീവമായ സെക്യൂരിറ്റി നോഡുകൾ",
    telemetryTitle: "തത്സമയ സുരക്ഷാ ഡാറ്റാ സ്ട്രീം",
    nodeDelhi: "ഡൽഹി റീജിയണൽ ഹബ്",
    nodeMumbai: "മുംബൈ സെക്യൂരിറ്റി നോഡ്",
    nodeBengaluru: "ബെംഗളൂരു കോർ ഇന്റർസെപ്റ്റർ",
    nodeChennai: "ചെന്നൈ ടെലിമെട്രി യൂണിറ്റ്",
    nodeKolkata: "കൊൽക്കത്ത നെറ്റ്വർക്ക് നോഡ്",
    nodeUser: "നിങ്ങളുടെ ഉപകരണം (ലൈവ്)",
    statusIntercepting: "തട്ടിപ്പ് തടയുന്നു",
    statusSecuring: "സുരക്ഷിതമായി നിരീക്ഷിക്കുന്നു",
    closeBtn: "മാപ്പ് അടയ്ക്കുക"
  },
  hi: {
    threatWatchTitle: "वास्तविक समय वैश्विक खतरा निगरानी",
    threatWatchDesc: "हमारा सहयोगात्मक क्लाउड ग्राफ़ वैश्विक स्तर पर आवाज क्लोन हमलों को रोकता है।",
    livePrefectsBadge: "लाइव ऑपरेशंस नक्शा",
    totalIntercepts: "आज विफल किए गए धोखे",
    activeNodes: "सक्रिय सुरक्षा नोड्स ऑनलाइन",
    telemetryTitle: "लाइव सुरक्षा डेटा प्रवाह",
    nodeDelhi: "दिल्ली क्षेत्रीय केंद्र",
    nodeMumbai: "मुंबई सुरक्षा नोड",
    nodeBengaluru: "बेंगलुरु कोर इंटरसेप्टर",
    nodeChennai: "चेन्नई टेलीमेट्री इकाई",
    nodeKolkata: "कोलकाता नेटवर्क नोड",
    nodeUser: "आपका उपकरण (लाइव)",
    statusIntercepting: "धोखाधड़ी को रोकना",
    statusSecuring: "सुरक्षित निगरानी",
    closeBtn: "मानचित्र बंद करें"
  },
  te: {
    threatWatchTitle: "రియల్ టైమ్ గ్లోబల్ థ్రెట్ వాచ్",
    threatWatchDesc: "మా క్లౌడ్ నెట్‌వర్క్ ప్రపంచవ్యాప్తంగా వాయిస్ క్లోనింగ్ ముప్పులను అడ్డుకుంటుంది.",
    livePrefectsBadge: "లైవ్ మ్యాప్ ఆపరేషన్స్",
    totalIntercepts: "ఈరోజు నిలిపివేసిన మోసాలు",
    activeNodes: "కనెక్ట్ అయిన సెక్యూరిటీ నోడ్స్",
    telemetryTitle: "లైవ్ సెక్యూరిటీ డేటా స్ట్రీమ్",
    nodeDelhi: "ఢిల్లీ ప్రాంతీయ కేంద్రం",
    nodeMumbai: "ముంబై సెక్యూరిటీ నోడ్",
    nodeBengaluru: "బెంగళూరు కోర్ ఇంటర్‌సెప్టర్",
    nodeChennai: "చెన్నై టెలిమెట్రీ యూనిట్",
    nodeKolkata: "కోల్‌కతా నెట్‌వర్క్ నోడ్",
    nodeUser: "మీ పరికరం (లైవ్)",
    statusIntercepting: "మోసం అడ్డగింపు",
    statusSecuring: "సురక్షిత పర్యవేక్షణ",
    closeBtn: "మ్యాప్ మూసివేయి"
  }
};

interface DashboardViewProps {
  logs: CallLog[];
  onSelectLog: (log: CallLog) => void;
  onNavigateToReport: () => void;
  onInitiateMockCall: (dialedNumberOrScript?: string, callMedium?: CallType) => void;
  currentLanguage: LanguageCode;
  isElderlyAutoPilotActive?: boolean;
  onToggleElderlyAutoPilot?: () => void;
  shouldAutoImmunizeMap?: boolean;
  onResetAutoImmunize?: () => void;
  guardianRoute?: "FAMILY" | "PRECINCT" | "WARDEN" | "AUTONOMOUS";
  onSetGuardianRoute?: (route: "FAMILY" | "PRECINCT" | "WARDEN" | "AUTONOMOUS") => void;
}

export default function DashboardView({ 
  logs, 
  onSelectLog, 
  onNavigateToReport, 
  onInitiateMockCall, 
  currentLanguage,
  isElderlyAutoPilotActive = false,
  onToggleElderlyAutoPilot,
  shouldAutoImmunizeMap = false,
  onResetAutoImmunize,
  guardianRoute = "FAMILY",
  onSetGuardianRoute
}: DashboardViewProps) {

  // Keypad dialer local state
  const [dialedDigits, setDialedDigits] = useState("");
  const [selectedMedium, setSelectedMedium] = useState<CallType>(CallType.VOICE);

  // High-fidelity Live Threat Map states
  const [nodes, setNodes] = useState<ThreatNode[]>(INITIAL_NODES);
  const [interceptsCount, setInterceptsCount] = useState(1482);
  const [showExpandedMapModal, setShowExpandedMapModal] = useState(false);
  const [activeHoverNode, setActiveHoverNode] = useState<ThreatNode | null>(null);

  // Neighbor Nodes for Collaborative Intercept Simulator
  interface NeighborNode {
    id: string;
    name: string;
    x: number;
    y: number;
    status: "VULNERABLE" | "PROTECTED";
  }

  const [neighbors, setNeighbors] = useState<NeighborNode[]>([
    { id: "neighbor-1", name: "Peer Node Alpha (Pixel 8)", x: 30, y: 70, status: "VULNERABLE" },
    { id: "neighbor-2", name: "Peer Node Beta (iPhone 15)", x: 44, y: 69, status: "VULNERABLE" },
    { id: "neighbor-3", name: "Peer Node Gamma (Galaxy S24)", x: 33, y: 81, status: "VULNERABLE" },
    { id: "neighbor-4", name: "Peer Node Delta (OnePlus 12)", x: 42, y: 82, status: "VULNERABLE" }
  ]);
  const [selectedNeighbor, setSelectedNeighbor] = useState<NeighborNode | null>(null);
  const [isInterceptSimulating, setIsInterceptSimulating] = useState(false);
  const [isRippleActive, setIsRippleActive] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "System online. High-contrast vector grid calibrated.",
    "Monitoring incoming voice data streams across India.",
    "Securing active terminals in Koramangala HQ.",
    "Connected to collaborative defense node network."
  ]);

  // Live Location Sync states
  const [isAutoDetectActive, setIsAutoDetectActive] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSource, setLocationSource] = useState<"GPS" | "IP" | "DEFAULT" | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number; city: string; region: string } | null>(null);

  const detectLocation = () => {
    setIsLocating(true);
    
    // 1. Try Browser Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({
            lat: latitude,
            lng: longitude,
            city: "User Shield Terminal",
            region: "GPS Precise Fix"
          });
          setLocationSource("GPS");
          setIsLocating(false);
          
          setTelemetryLogs(prev => [
            `[${new Date().toLocaleTimeString()}] GPS: Local terminal sync completed successfully.`,
            ...prev
          ]);
        },
        (error) => {
          // 2. Geolocation denied/failed -> Fallback to IP Geolocation API
          setTelemetryLogs(prev => [
            `[${new Date().toLocaleTimeString()}] GPS: Geolocation denied/unavailable. Syncing IP...`,
            ...prev
          ]);
          fallbackToIpGeolocation();
        },
        { timeout: 6000, enableHighAccuracy: true }
      );
    } else {
      fallbackToIpGeolocation();
    }
  };

  const fallbackToIpGeolocation = () => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        if (data.latitude && data.longitude) {
          setUserCoords({
            lat: data.latitude,
            lng: data.longitude,
            city: data.city || "Network Node",
            region: data.region || "IP Lookup"
          });
          setLocationSource("IP");
          setTelemetryLogs(prev => [
            `[${new Date().toLocaleTimeString()}] IP: Geolocated terminal to ${data.city || "Local Net"}, ${data.region || "IN"} via network.`,
            ...prev
          ]);
        } else {
          useDefaultCoordsFallback();
        }
        setIsLocating(false);
      })
      .catch(() => {
        useDefaultCoordsFallback();
        setIsLocating(false);
      });
  };

  const useDefaultCoordsFallback = () => {
    // Default to Bengaluru Koramangala
    setUserCoords({
      lat: 12.9376,
      lng: 77.6244,
      city: "Koramangala, Bengaluru",
      region: "Pre-Configured Safe Node"
    });
    setLocationSource("DEFAULT");
    setTelemetryLogs(prev => [
      `[${new Date().toLocaleTimeString()}] MAP: Synced to static demonstration override.`,
      ...prev
    ]);
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const projectCoords = (lat: number, lng: number) => {
    const latMax = 36.0;
    const latMin = 6.0;
    const lngMin = 66.0;
    const lngMax = 99.0;
    
    let x = ((lng - lngMin) / (lngMax - lngMin)) * 100;
    let y = ((latMax - lat) / (latMax - latMin)) * 100;
    
    // Clamp to keep it safe inside visual SVG grid
    x = Math.max(8, Math.min(92, x));
    y = Math.max(8, Math.min(92, y));
    
    return { x, y };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Tick up total intercepts count
      setInterceptsCount(prev => prev + 1);

      // Randomly update one of the nodes to simulate activity
      setNodes(prevNodes => {
        const randomIndex = Math.floor(Math.random() * prevNodes.length);
        return prevNodes.map((n, idx) => {
          if (idx === randomIndex) {
            const statusOptions: Array<"BLOCKED" | "INTERCEPTING" | "MONITORING"> = ["BLOCKED", "INTERCEPTING", "MONITORING"];
            const nextStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
            const color = nextStatus === "BLOCKED" ? "#EF4444" : (nextStatus === "INTERCEPTING" ? "#F59E0B" : "#10B981");
            return {
              ...n,
              count: n.count + Math.floor(Math.random() * 2) + 1,
              status: nextStatus,
              color
            };
          }
          return n;
        });
      });

      // Add a dynamic telemetry log entry
      const randomNode = INITIAL_NODES[Math.floor(Math.random() * INITIAL_NODES.length)];
      const threats = ["Voice Impersonator blocked", "Fake authority spoof blocked", "Phishing request rejected", "Deepfake clone match failed"];
      const threat = threats[Math.floor(Math.random() * threats.length)];
      const timestamp = new Date().toLocaleTimeString();
      setTelemetryLogs(prev => [
        `[${timestamp}] ${randomNode.id.toUpperCase()}: ${threat} (Shield active)`,
        ...prev.slice(0, 8)
      ]);

    }, 5000);

    return () => clearInterval(interval);
  }, []);
  // Auto-Pilot return trigger: open map and immunize
  useEffect(() => {
    if (shouldAutoImmunizeMap) {
      // 1. Open the Map Modal
      setShowExpandedMapModal(true);
      
      // 2. Trigger the collaborative intercept timeline
      handleTriggerCollaborativeIntercept();
      
      // 3. Reset the trigger back to false
      if (onResetAutoImmunize) {
        onResetAutoImmunize();
      }
    }
  }, [shouldAutoImmunizeMap]);
  // Trigger simulated P2P voice clone fingerprint distribution
  const handleTriggerCollaborativeIntercept = () => {
    setIsInterceptSimulating(true);
    
    setTelemetryLogs(prev => [
      `[${new Date().toLocaleTimeString()}] [SYSTEM]: Capturing local audio parameters...`,
      ...prev
    ]);

    setTimeout(() => {
      setIsRippleActive(true);
      setTelemetryLogs(prev => [
        `[${new Date().toLocaleTimeString()}] [SYSTEM]: Audio Fingerprint #FPR-9821 generated. Broadcasting payload to nearby cells...`,
        ...prev
      ]);
    }, 1500);

    setTimeout(() => {
      setIsRippleActive(false);
      setNeighbors(prev => prev.map(n => ({ ...n, status: "PROTECTED" })));
      setSelectedNeighbor(prev => prev ? { ...prev, status: "PROTECTED" } : null);
      
      setTelemetryLogs(prev => [
        `[${new Date().toLocaleTimeString()}] [SYSTEM]: Network Immunized. 4 neighboring devices updated successfully.`,
        ...prev
      ]);
      setIsInterceptSimulating(false);
    }, 3000);
  };

  // Test scam attack vector simulation on neighbor node
  const handleTestScamOnNeighbor = (n: NeighborNode) => {
    if (n.status === "VULNERABLE") {
      setTelemetryLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ALERT: Testing attack vector on ${n.name}. Scam bypassed firewall! Device Vulnerable.`,
        ...prev
      ]);
      alert(`⚠️ Test Scam Call Dialed to ${n.name}!\n\nScammer successfully connected. The call bypassed native firewall because the vocal clone fingerprint has not been distributed yet.`);
    } else {
      setTelemetryLogs(prev => [
        `[${new Date().toLocaleTimeString()}] SECURE: Scammer call to ${n.name} intercepted! Blocked via Peer-to-Peer Shared Fingerprint #FPR-9821.`,
        ...prev
      ]);
      alert(`🛡️ Threat Neutralized!\n\nIncoming scam call was successfully BLOCKED on ${n.name} using the shared P2P voice clone fingerprint.`);
    }
  };

  const handlePressKeypadDigit = (digit: string) => {
    if (dialedDigits.length < 15) {
      setDialedDigits(prev => prev + digit);
    }
  };

  const handleTriggerKeypadCall = () => {
    onInitiateMockCall(dialedDigits || "Unknown", selectedMedium);
  };


  // Calculate dynamic average safe score
  // If the log list is empty default to 98
  const averageSafeScore = logs.length > 0 
    ? Math.round(logs.reduce((acc, curr) => acc + (100 - curr.scamRisk), 0) / logs.length)
    : 98;

  const getScoreRating = (val: number) => {
    if (val >= 80) return { label: translations[currentLanguage].dashboardOptimal, color: "text-emerald-safe" };
    if (val >= 50) return { label: translations[currentLanguage].dashboardConditional, color: "text-amber-500" };
    return { label: translations[currentLanguage].dashboardDeficient, color: "text-crimson-error" };
  };


  const t = translations[currentLanguage];

  return (
    <div className="max-w-md mx-auto space-y-6 pb-6">
      {/* Dynamic Security Score Card */}
      <section className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-primary-indigo to-[#3335b3] text-white shadow-md flex flex-col items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center relative">
            {/* Spinning decorative gauge border */}
            <div className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-white border-t-transparent animate-spin" style={{ animationDuration: "3.5s" }}></div>
            
            <span className="font-headline text-5xl font-black text-white">
              {averageSafeScore}
            </span>
            <span className="text-[10px] font-bold tracking-widest bg-primary-indigo text-white px-2.5 py-0.5 rounded-full absolute -bottom-2.5 whitespace-nowrap shadow-xs uppercase font-mono">
              {t.dashboardSafeScore}
            </span>
          </div>
          
          <p className="mt-8 font-sans text-base text-white/90 text-center text-balance">
            {t.dashboardOverallProtection} <span className="font-black underline decoration-emerald-safe underline-offset-4">{getScoreRating(averageSafeScore).label}</span>
          </p>
          <p className="text-[11px] font-medium text-container-high/80 mt-1 font-mono">
            {t.dashboardActiveScanning}
          </p>
        </div>
      </section>

      {/* Interactive Keypad Dialer Card (Judges Demo Booster) */}
      <section className="bg-white p-5 rounded-2xl border border-container-high shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-container-low pb-2">
          <div>
            <h3 className="font-headline text-sm font-extrabold text-navy-dark">
              {t.dashboardKeypadTitle}
            </h3>
            <p className="text-[11px] text-text-secondary mt-0.5">
              {t.dashboardKeypadDesc}
            </p>
          </div>
          <span className="material-symbols-outlined text-primary-indigo text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            dialpad
          </span>
        </div>

        {/* Input Bar Display */}
        <div className="relative">
          <input
            type="text"
            readOnly
            value={dialedDigits}
            placeholder="Dial number or code..."
            className="w-full text-center font-headline text-2xl font-black tracking-widest text-navy-dark bg-container-low py-3 rounded-xl border border-container-medium placeholder:text-text-muted/50 outline-hidden"
          />
          {dialedDigits.length > 0 && (
            <button
              onClick={() => setDialedDigits(prev => prev.slice(0, -1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-navy-dark p-1.5 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">backspace</span>
            </button>
          )}
        </div>

        {/* 3x4 Numeric Keypad Circular Button Grid */}
        <div className="grid grid-cols-3 gap-y-3 gap-x-6 max-w-[280px] mx-auto pt-1">
          {[
            { num: "1", alpha: "⚡ FAST" },
            { num: "2", alpha: "BANK" },
            { num: "3", alpha: "MIMIC" },
            { num: "4", alpha: "GHI" },
            { num: "5", alpha: "IRS" },
            { num: "6", alpha: "STALK" },
            { num: "7", alpha: "PQRS" },
            { num: "8", alpha: "TUV" },
            { num: "9", alpha: "WXYZ" },
            { num: "*", alpha: "" },
            { num: "0", alpha: "+" },
            { num: "#", alpha: "" },
          ].map((key, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePressKeypadDigit(key.num)}
              className="w-12 h-12 rounded-full bg-container-low font-headline text-lg font-black text-navy-dark hover:bg-primary-indigo/10 hover:text-primary-indigo active:scale-90 transition-all flex flex-col items-center justify-center border border-container-high/40 select-none mx-auto"
            >
              <span className="leading-none">{key.num}</span>
              {key.alpha && (
                <span className="text-[7px] font-bold text-text-muted font-sans leading-none mt-0.5">
                  {key.alpha}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Call Speed Dial Guide Box */}
        <div className="bg-container-low/60 rounded-xl p-3 border border-container-high/50 text-[10px] space-y-1.5 font-mono">
          <p className="font-bold text-navy-dark text-center">{t.dashboardKeypadGuide}</p>
          <div className="grid grid-cols-2 gap-1 text-text-secondary">
            <button onClick={() => setDialedDigits("555")} className="text-left hover:text-primary-indigo hover:font-bold">⭐ <span className="underline">555</span>: Bank Scam</button>
            <button onClick={() => setDialedDigits("777")} className="text-left hover:text-primary-indigo hover:font-bold">⭐ <span className="underline">777</span>: Auditory Mimic</button>
            <button onClick={() => setDialedDigits("123")} className="text-left hover:text-primary-indigo hover:font-bold">⭐ <span className="underline">123</span>: IRS Agent Mock</button>
            <button onClick={() => setDialedDigits("911")} className="text-left hover:text-primary-indigo hover:font-bold">⭐ <span className="underline">911</span>: Tactical Emergency</button>
          </div>
        </div>

        {/* Call Medium Selector Chips */}
        <div className="space-y-2 py-1 select-none">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block text-center">
            {t.reportLabelMedium}
          </label>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              { type: CallType.VOICE, label: t.reportMediumVoice, icon: "phone" },
              { type: CallType.WHATSAPP, label: t.reportMediumWhatsapp, icon: "call" },
              { type: CallType.SMS, label: t.reportMediumSms, icon: "sms" },
              { type: CallType.OTHER, label: t.reportMediumOther, icon: "chat" }
            ].map(item => (
              <button
                key={item.type}
                type="button"
                onClick={() => setSelectedMedium(item.type)}
                className={`py-1.5 px-3 rounded-full border text-[10px] font-bold tracking-wide transition-all select-none flex items-center gap-1 ${
                  selectedMedium === item.type
                    ? "bg-primary-indigo text-white border-primary-indigo shadow-xs"
                    : "bg-surface text-text-primary border-container-high hover:bg-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-[12px] font-bold">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Elderly Auto-Pilot Mode Toggle */}
        <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-xl my-2">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-indigo-600 text-lg animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
              elderly
            </span>
            <div className="text-left">
              <p className="text-xs font-black text-navy-dark uppercase font-headline">Elderly Auto-Pilot Intercept</p>
              <p className="text-[9px] text-text-secondary leading-tight mt-0.5 text-balance">Enables automated remote guardian intercept</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onToggleElderlyAutoPilot}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 focus:outline-none ${isElderlyAutoPilotActive ? "bg-indigo-600" : "bg-container-high"}`}
          >
            <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${isElderlyAutoPilotActive ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Guardian Node Telemetry Routing Selector */}
        {isElderlyAutoPilotActive && (
          <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl my-2.5 space-y-2.5 text-left animate-fade-in shadow-xs">
            <label className="text-[11px] font-headline font-black text-indigo-900 uppercase block tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-indigo-700" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              Guardian Telemetry Routing:
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-[11.5px]">
              <button
                type="button"
                onClick={() => onSetGuardianRoute && onSetGuardianRoute("FAMILY")}
                className={`py-2 px-2.5 rounded-xl border font-black flex items-center justify-center gap-1 transition-all select-none ${guardianRoute === "FAMILY" ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-navy-dark border-container-high hover:bg-slate-50"}`}
              >
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>supervised_user_circle</span>
                Family Node
              </button>
              <button
                type="button"
                onClick={() => onSetGuardianRoute && onSetGuardianRoute("PRECINCT")}
                className={`py-2 px-2.5 rounded-xl border font-black flex items-center justify-center gap-1 transition-all select-none ${guardianRoute === "PRECINCT" ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-navy-dark border-container-high hover:bg-slate-50"}`}
              >
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_police</span>
                Local Precinct
              </button>
              <button
                type="button"
                onClick={() => onSetGuardianRoute && onSetGuardianRoute("WARDEN")}
                className={`py-2 px-2.5 rounded-xl border font-black flex items-center justify-center gap-1 transition-all select-none ${guardianRoute === "WARDEN" ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-navy-dark border-container-high hover:bg-slate-50"}`}
              >
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>home_work</span>
                Complex Warden
              </button>
              <button
                type="button"
                onClick={() => onSetGuardianRoute && onSetGuardianRoute("AUTONOMOUS")}
                className={`py-2 px-2.5 rounded-xl border font-black flex items-center justify-center gap-1 transition-all select-none ${guardianRoute === "AUTONOMOUS" ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-navy-dark border-container-high hover:bg-slate-50"}`}
              >
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                Autonomous AI
              </button>
            </div>
          </div>
        )}

        {/* Dial green trigger button */}
        <button
          onClick={handleTriggerKeypadCall}
          className="w-full bg-emerald-safe hover:bg-emerald-safe/95 text-white py-3.5 rounded-xl font-headline font-bold text-base flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-md"
        >
          <span className="material-symbols-outlined text-[20px] animate-pulse">phone_in_talk</span>
          {t.dashboardLaunchBtn}
        </button>
      </section>

      {/* Security Health Checklist */}
      <section>
        <h2 className="font-headline text-[17px] font-extrabold text-navy-dark mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-safe text-lg font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
            health_and_safety
          </span>
          {t.dashboardCoreHealth}
        </h2>
        
        <div className="space-y-2.5">
          {/* Item 1 */}
          <div className="p-4 bg-white rounded-xl border border-container-high flex items-center justify-between border-l-4 border-emerald-safe shadow-xs">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-safe text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <div>
                <p className="text-xs font-extrabold text-navy-dark uppercase tracking-wider font-headline">AI Fraud Detection</p>
                <p className="text-[11px] text-text-secondary font-medium">Listening on local virtual loop</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-emerald-safe px-2.5 py-1 bg-emerald-safe/10 rounded-full font-mono uppercase">
              {t.dashboardHealthActive}
            </span>
          </div>

          {/* Item 2 */}
          <div className="p-4 bg-white rounded-xl border border-container-high flex items-center justify-between border-l-4 border-emerald-safe shadow-xs">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-safe text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <div>
                <p className="text-xs font-extrabold text-navy-dark uppercase tracking-wider font-headline">Database Integrity</p>
                <p className="text-[11px] text-text-secondary font-medium">Updated to v14.2 (Secure sync)</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-emerald-safe px-2.5 py-1 bg-emerald-safe/10 rounded-full font-mono uppercase">
              {t.dashboardHealthUpdated}
            </span>
          </div>

          {/* Item 3 */}
          <div className="p-4 bg-white rounded-xl border border-container-high flex items-center justify-between border-l-4 border-primary-indigo shadow-xs">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-indigo text-xl animate-spin" style={{ animationDuration: "4s" }}>
                sync
              </span>
              <div>
                <p className="text-xs font-extrabold text-navy-dark uppercase tracking-wider font-headline">Cloud Backup Protocol</p>
                <p className="text-[11px] text-text-secondary font-medium">Verifying reported logs sync</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-primary-indigo px-2.5 py-1 bg-primary-indigo/10 rounded-full font-mono uppercase">
              {t.dashboardHealthSyncing}
            </span>
          </div>
        </div>
      </section>

      {/* Quick Action: Report a Scam */}
      <section>
        <button 
          onClick={onNavigateToReport}
          className="w-full py-4 bg-crimson-error text-white font-headline text-base font-bold rounded-xl shadow-sm hover:bg-crimson-error/95 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            report
          </span>
          {t.reportTitle}
        </button>
      </section>

      {/* Recent Protected Calls List */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-headline text-[17px] font-extrabold text-navy-dark flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-indigo">
              history
            </span>
            {t.dashboardRecentHistory}
          </h2>
          <span className="font-mono text-xs text-text-muted font-bold">
            {logs.length} {t.dashboardCallsTracked}
          </span>
        </div>


        <div className="space-y-3">
          {logs.map((log) => {
            const isWarning = log.status === "WARNING";
            const isTrusted = log.status === "TRUSTED";
            
            return (
              <div 
                key={log.id}
                onClick={() => onSelectLog(log)}
                className={`flex items-center gap-4 p-4 bg-white rounded-xl border transition-all cursor-pointer hover:bg-container-low hover:border-primary-indigo shadow-xs ${
                  isWarning 
                    ? "border-crimson-error/40 bg-crimson-error/3 hover:bg-crimson-error/5" 
                    : "border-container-high"
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                  isWarning 
                    ? "bg-crimson-error/15 text-crimson-error" 
                    : isTrusted 
                      ? "bg-emerald-safe/10 text-emerald-safe" 
                      : "bg-container-low text-text-secondary"
                }`}>
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: isWarning ? "'FILL' 1" : undefined }}>
                    {isWarning ? "call_end" : isTrusted ? "contact_phone" : "person"}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-headline text-sm font-extrabold text-navy-dark truncate">
                    {log.caller}
                  </p>
                  <p className="text-[11px] text-text-secondary font-medium font-mono mt-0.5">
                    {log.time} • {log.duration}
                  </p>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-0.5">
                  <div className={`flex items-center gap-0.5 font-headline text-xs font-extrabold ${isWarning ? 'text-crimson-error' : 'text-emerald-safe'}`}>
                    <span className="material-symbols-outlined text-[13px] font-black" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {isWarning ? "warning" : "verified_user"}
                    </span>
                    <span>{log.status}</span>
                  </div>
                  <span className="text-[10px] text-text-muted font-medium">
                    {log.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Trust Threat Map operations portal */}
      <section>
        {(() => {
          const mt = mapTranslations[currentLanguage] || mapTranslations.en;
          
          // Map real lat/lng coordinates to SVG map coordinate percentages
          const userNode = userCoords && isAutoDetectActive ? {
            id: "user",
            nameKey: "nodeUser",
            x: projectCoords(userCoords.lat, userCoords.lng).x,
            y: projectCoords(userCoords.lat, userCoords.lng).y,
            threatType: `${userCoords.city} (${userCoords.region})`,
            count: interceptsCount - 1420 > 0 ? interceptsCount - 1420 : 62,
            status: "MONITORING" as const,
            color: "#A78BFA" // bright violet
          } : null;

          const visibleNodes = userNode ? [userNode, ...nodes] : nodes;
          
          return (
            <>
              <div 
                onClick={() => setShowExpandedMapModal(true)}
                className="relative h-48 rounded-xl overflow-hidden border border-container-high shadow-xs group cursor-pointer"
              >
                {/* Visual Map Canvas Grid */}
                <div className="absolute inset-0 bg-[#070b24] flex items-center justify-center select-none transition-colors duration-300">
                  {/* High-tech grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                  
                  {/* SVG connection lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
                    <line x1="45%" y1="32%" x2="26%" y2="58%" stroke="rgba(99,102,241,0.4)" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="45%" y1="32%" x2="74%" y2="48%" stroke="rgba(99,102,241,0.4)" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="26%" y1="58%" x2="38%" y2="78%" stroke="rgba(99,102,241,0.4)" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="38%" y1="78%" x2="45%" y2="80%" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" />
                    <line x1="45%" y1="80%" x2="74%" y2="48%" stroke="rgba(99,102,241,0.4)" strokeWidth="1" strokeDasharray="3,3" />
                    
                    {/* Live connection lines from user location */}
                    {userNode && (
                      <>
                        <line x1={`${userNode.x}%`} y1={`${userNode.y}%`} x2="38%" y2="78%" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" />
                        <line x1={`${userNode.x}%`} y1={`${userNode.y}%`} x2="26%" y2="58%" stroke="rgba(167,139,250,0.3)" strokeWidth="1" strokeDasharray="2,2" />
                      </>
                    )}
                    
                    {/* Animated laser scan lines */}
                    <line x1="0" y1="35%" x2="100%" y2="35%" stroke="rgba(16,185,129,0.15)" strokeWidth="3" className="animate-pulse" />
                  </svg>

                  {/* Pulsing City nodes */}
                  {visibleNodes.map(node => (
                    <div
                      key={node.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <span 
                        className={`absolute inline-flex h-4 w-4 rounded-full opacity-35 ${node.id === "user" ? "animate-bounce" : "animate-ping"}`}
                        style={{ backgroundColor: node.color }}
                      ></span>
                      <span 
                        className={`relative inline-flex rounded-full shadow-xs border border-white/20 ${node.id === "user" ? "h-3.5 w-3.5" : "h-2 w-2"}`}
                        style={{ backgroundColor: node.color }}
                      ></span>
                    </div>
                  ))}
                </div>

                {/* Overlay Text Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-[#070b24]/40 to-transparent flex items-end p-4 pointer-events-none">
                  <div>
                    <p className="text-white font-headline text-sm font-extrabold flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-safe opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-safe"></span>
                      </span>
                      {mt.threatWatchTitle}
                    </p>
                    <p className="text-white/70 text-[11px] font-medium mt-0.5 leading-relaxed">
                      {mt.threatWatchDesc}
                    </p>
                  </div>
                </div>

                {/* Interactive Ticker Badge */}
                <div className="absolute top-4 right-4 bg-crimson-error text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest animate-pulse font-mono shadow-md">
                  {mt.livePrefectsBadge}
                </div>
              </div>

              {/* Dynamic Operations HUD modal */}
              {showExpandedMapModal && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-[#090d26] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col h-[520px] max-h-full">
                    
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0c1236]">
                      <div>
                        <h3 className="font-headline text-base font-black text-white flex items-center gap-2">
                          <span className="material-symbols-outlined text-rose-500 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                            security
                          </span>
                          {mt.threatWatchTitle}
                        </h3>
                        <p className="text-[11px] text-indigo-300 font-sans mt-0.5">{mt.threatWatchDesc}</p>
                      </div>
                      
                      <button 
                        onClick={() => setShowExpandedMapModal(false)}
                        className="text-slate-400 hover:text-white bg-white/5 p-1.5 rounded-lg active:scale-95 transition-all flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#070b20]">
                      
                      {/* Left: Graphic SVG Canvas */}
                      <div className="flex-1 bg-[#050718] relative overflow-hidden flex items-center justify-center p-4 min-h-[220px]">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        
                        <svg className="absolute inset-0 w-full h-full">
                          <line x1="45%" y1="32%" x2="26%" y2="58%" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
                          <line x1="45%" y1="32%" x2="74%" y2="48%" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
                          <line x1="26%" y1="58%" x2="38%" y2="78%" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
                          <line x1="38%" y1="78%" x2="45%" y2="80%" stroke="rgba(99,102,241,0.4)" strokeWidth="2.5" />
                          <line x1="45%" y1="80%" x2="74%" y2="48%" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" strokeDasharray="5,5" />
                          
                          {/* Live connection lines from user location */}
                          {userNode && (
                            <>
                              <line x1={`${userNode.x}%`} y1={`${userNode.y}%`} x2="38%" y2="78%" stroke="rgba(167,139,250,0.7)" strokeWidth="2.5" />
                              <line x1={`${userNode.x}%`} y1={`${userNode.y}%`} x2="26%" y2="58%" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
                            </>
                          )}
                          
                          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(239,68,68,0.2)" strokeWidth="4" className="animate-pulse" />
                        </svg>

                        <style>{`
                          @keyframes rippleScale {
                            0% { transform: translate(-50%, -50%) scale(0.1); opacity: 1; }
                            100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
                          }
                          .animate-ripple-wave {
                            animation: rippleScale 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
                          }
                        `}</style>

                        {/* Ripple visual broadcast overlay */}
                        {isRippleActive && userNode && (
                          <div
                            className="absolute border-2 border-violet-500 rounded-full pointer-events-none animate-ripple-wave z-20"
                            style={{
                              left: `${userNode.x}%`,
                              top: `${userNode.y}%`,
                              width: '180px',
                              height: '180px',
                              boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                            }}
                          />
                        )}

                        {visibleNodes.map(node => (
                          <div
                            key={node.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            onMouseEnter={() => setActiveHoverNode(node)}
                            onMouseLeave={() => setActiveHoverNode(null)}
                          >
                            <span 
                              className={`absolute inline-flex rounded-full opacity-35 ${node.id === "user" ? "h-8 w-8 animate-bounce bg-violet-400" : "h-6 w-6 animate-ping"}`}
                              style={{ backgroundColor: node.id === "user" ? undefined : node.color }}
                            ></span>
                            <span 
                              className={`relative inline-flex rounded-full shadow-lg border-2 group-hover:scale-110 transition-transform ${node.id === "user" ? "h-5 w-5 border-violet-300" : "h-3.5 w-3.5 border-white/40"}`}
                              style={{ backgroundColor: node.color }}
                            ></span>
                            
                            <span className="mt-1 px-1 py-0.5 rounded bg-black/60 border border-white/5 text-[8px] font-mono font-bold text-indigo-200">
                              {node.id === "user" ? mt.nodeUser.split(" ")[0] : mt[node.nameKey].split(" ")[0]} ({node.count})
                            </span>
                          </div>
                        ))}

                        {/* Render nearby neighbor nodes */}
                        {userNode && neighbors.map(n => (
                          <div
                            key={n.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-15 group transition-transform hover:scale-110"
                            style={{ left: `${n.x}%`, top: `${n.y}%` }}
                            onClick={() => setSelectedNeighbor(n)}
                          >
                            {n.status === "VULNERABLE" ? (
                              <>
                                <span className="absolute inline-flex h-5 w-5 rounded-full bg-amber-500/35 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-white/40 shadow-[0_0_8px_#F59E0B]"></span>
                              </>
                            ) : (
                              <>
                                <span className="absolute inline-flex h-5 w-5 rounded-full bg-cyan-500/20 animate-pulse"></span>
                                <span className="material-symbols-outlined text-cyan-400 text-xs font-black drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                  shield
                                </span>
                              </>
                            )}
                            
                            <span className="mt-1 px-1 py-0.2 rounded bg-black/75 border border-white/5 text-[7px] font-mono text-slate-300">
                              {n.name.split(" ")[2]}
                            </span>
                          </div>
                        ))}

                        {/* Floating Detail Card for Selected Neighbor Node */}
                        {selectedNeighbor && (
                          <div className="absolute top-4 left-4 z-30 bg-[#0b0e2b]/95 border border-indigo-500/40 rounded-xl p-4 text-white font-mono text-[9px] shadow-2xl w-52 space-y-3 animate-fade-in select-none">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-extrabold text-[10px] text-indigo-200">{selectedNeighbor.name}</p>
                                <p className="text-[8px] text-slate-400 mt-0.5">Zipcode Zone: IN-KA-560</p>
                              </div>
                              <button 
                                onClick={() => setSelectedNeighbor(null)} 
                                className="text-slate-400 hover:text-white"
                              >
                                <span className="material-symbols-outlined text-[14px]">close</span>
                              </button>
                            </div>
                            
                            <div className="bg-black/40 p-2 rounded-lg border border-white/5 space-y-1">
                              <div className="flex justify-between items-center text-[8.5px]">
                                <span>Status:</span>
                                <span className={`font-black uppercase text-[8px] ${selectedNeighbor.status === "VULNERABLE" ? "text-amber-400" : "text-cyan-400"}`}>
                                  {selectedNeighbor.status}
                                </span>
                              </div>
                              <p className="text-[8px] text-slate-300 leading-normal">
                                {selectedNeighbor.status === "VULNERABLE" 
                                  ? "⚠️ Status: Vulnerable. Incoming deepfake call will bypass native firewall."
                                  : "🛡️ Status: Protected. Call from Scammer Blocked via Peer-to-Peer Shared Fingerprint."}
                              </p>
                            </div>

                            <button
                              onClick={() => handleTestScamOnNeighbor(selectedNeighbor)}
                              className="w-full bg-[#12163b] hover:bg-[#1a2055] border border-white/10 text-white font-mono text-[8.5px] py-1.5 px-2 rounded-lg active:scale-95 transition-all text-center flex items-center justify-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[11px]">phone_callback</span>
                              Test Simulated Scam Call
                            </button>
                          </div>
                        )}

                        {/* Hover Information Tooltip tag */}
                        {activeHoverNode && (
                          <div 
                            className="absolute z-20 bg-[#0c133a] border border-indigo-400/50 rounded-xl p-3 text-white font-mono text-[9px] shadow-2xl w-44 pointer-events-none animate-fade-in"
                            style={{ left: `${activeHoverNode.x}%`, top: `${activeHoverNode.y - 16}%` }}
                          >
                            <p className="font-extrabold text-[11px] text-emerald-400">
                              {activeHoverNode.id === "user" ? mt.nodeUser : mt[activeHoverNode.nameKey]}
                            </p>
                            <p className="text-white/80 mt-1 text-[8.5px] leading-tight">Threat: {activeHoverNode.threatType}</p>
                            {activeHoverNode.id !== "user" && (
                              <p className="text-white/60 mt-0.5 text-[8.5px]">Counter: {activeHoverNode.count} blocked</p>
                            )}
                            <div className="mt-2 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeHoverNode.color }}></span>
                              <p className="font-bold text-[8.5px] uppercase" style={{ color: activeHoverNode.color }}>{activeHoverNode.status}</p>
                            </div>
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 bg-[#0a0d2a]/95 border border-white/10 rounded p-1.5 font-mono text-[8px] text-indigo-300 leading-normal">
                          🔒 SECURED BRIDGE ROUTING ONLINE
                          <br />
                          ACTIVE HUBS CALIBRATED: {visibleNodes.length}
                        </div>
                      </div>

                      {/* Right: Telemetry stream logs & Location Sync Panel */}
                      <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-white/10 bg-[#090c24] flex flex-col p-4">
                        
                        {/* 1. GEOLOCATION CONTROLS PANEL */}
                        <div className="mb-4 pb-4 border-b border-white/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-black uppercase text-violet-400 tracking-wider">
                              GPS GEOLOCATION SYNC
                            </span>
                            
                            {/* Toggle Switch */}
                            <button
                              onClick={() => setIsAutoDetectActive(!isAutoDetectActive)}
                              className={`relative inline-flex h-4 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 focus:outline-hidden ${
                                isAutoDetectActive ? "bg-violet-500" : "bg-white/10"
                              }`}
                            >
                              <span className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                                isAutoDetectActive ? "translate-x-4.5" : "translate-x-0"
                              }`} />
                            </button>
                          </div>

                          {/* Geolocation Status Card */}
                          <div className="bg-[#0b1030] p-2.5 rounded-lg border border-white/5 space-y-1.5">
                            {isLocating ? (
                              <div className="flex items-center gap-1.5 text-violet-400 font-mono text-[9px] animate-pulse">
                                <span className="material-symbols-outlined text-xs animate-spin">my_location</span>
                                <span>🛰️ SCANNING TERMINAL COORDS...</span>
                              </div>
                            ) : !isAutoDetectActive ? (
                              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[9px]">
                                <span className="material-symbols-outlined text-xs">public</span>
                                <span>GEO-SOURCE: GLOBAL OVERRIDE</span>
                              </div>
                            ) : (
                              <div className="space-y-1 text-slate-300 font-mono text-[8.5px]">
                                <div className="flex justify-between items-center text-[9px] font-black text-violet-300">
                                  <span>SOURCE: {locationSource} DETECT</span>
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                </div>
                                {userCoords && (
                                  <>
                                    <p className="text-white font-extrabold">{userCoords.city}</p>
                                    <p className="text-[8px] text-slate-400">{userCoords.region}</p>
                                    <p className="text-[8px] font-mono text-emerald-400 bg-emerald-950/20 px-1 py-0.5 rounded w-fit mt-1">
                                      {userCoords.lat.toFixed(4)}° N • {userCoords.lng.toFixed(4)}° E
                                    </p>
                                  </>
                                )}
                              </div>
                            )}

                            {isAutoDetectActive && (
                              <button
                                onClick={detectLocation}
                                disabled={isLocating}
                                className="w-full mt-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-950 text-white font-mono text-[8.5px] py-1.5 px-2 rounded-md font-bold transition-all active:scale-95 flex items-center justify-center gap-1"
                              >
                                <span className="material-symbols-outlined text-[10px]">refresh</span>
                                SYNC LIVE LOCATION
                              </button>
                            )}
                          </div>
                        </div>

                        {/* 2. Telemetry stream logs */}
                        <h4 className="text-[10px] font-mono font-black uppercase text-indigo-400 tracking-wider mb-2 border-b border-white/5 pb-1">
                          {mt.telemetryTitle}
                        </h4>
                        
                        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[9px] text-slate-300 leading-normal pr-1 max-h-[140px] md:max-h-none">
                          {telemetryLogs.map((log, idx) => (
                            <div key={idx} className="p-1.5 rounded bg-[#0b1030] border border-white/5 select-text hover:bg-indigo-950/20">
                              {log}
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-center text-white">
                          <div className="p-2 bg-[#0c143d] rounded-lg border border-white/5">
                            <p className="text-[8px] text-indigo-300 font-mono font-bold uppercase">{mt.totalIntercepts}</p>
                            <p className="text-base font-headline font-black text-rose-400 mt-1">{interceptsCount}</p>
                          </div>
                          <div className="p-2 bg-[#0c143d] rounded-lg border border-white/5">
                            <p className="text-[8px] text-indigo-300 font-mono font-bold uppercase">{mt.activeNodes}</p>
                            <p className="text-base font-headline font-black text-emerald-400 mt-1">{visibleNodes.length}</p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Footer controls */}
                    <div className="p-3 border-t border-white/10 bg-[#070921] flex justify-end gap-3.5">
                      {/* Flag Collaborative Intercept Button */}
                      {userNode && (
                        <button
                          onClick={handleTriggerCollaborativeIntercept}
                          disabled={isInterceptSimulating}
                          className={`px-4 py-2 rounded-xl text-xs font-headline font-bold transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5 ${
                            isInterceptSimulating
                              ? "bg-slate-700 text-slate-400 cursor-not-allowed animate-pulse"
                              : "bg-rose-600 hover:bg-rose-500 text-white"
                          }`}
                        >
                          <span className={`material-symbols-outlined text-sm ${isInterceptSimulating ? "animate-spin" : "animate-pulse"}`}>
                            {isInterceptSimulating ? "sync" : "cell_tower"}
                          </span>
                          {isInterceptSimulating ? "Immunizing..." : "Flag Collaborative Intercept"}
                        </button>
                      )}

                      <button
                        onClick={() => setShowExpandedMapModal(false)}
                        className="bg-primary-indigo hover:bg-primary-indigo/90 text-white px-4 py-2 rounded-xl text-xs font-headline font-bold transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        {mt.closeBtn}
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </>
          );
        })()}
      </section>
    </div>
  );
}