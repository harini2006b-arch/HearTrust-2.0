import React, { useState, useEffect, useRef } from "react";
import { LanguageCode } from "../translations";

interface AuthProps {
  onAuthSuccess: (userData: {
    name: string;
    email: string;
    contact: string;
    emergencyContact: string;
    policeStation: string;
    stationCoords: string;
  }) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

const authTranslations: Record<LanguageCode, Record<string, string>> = {
  en: {
    tabRegister: "Sign Up (Register Profile)",
    tabLogin: "Existing Officer Login",
    titleRegister: "Officer Profile Registration",
    descRegister: "Establish your local encrypted security profile to activate automatic fraud interception and live backup sync.",
    titleLogin: "Officer Security Access",
    descLogin: "Log in with your existing security profile to continue automated intercepts.",
    fieldName: "Full Officer Name",
    fieldEmail: "Secure Email Address",
    fieldPassword: "Security Access Password",
    fieldContact: "Primary Phone Number",
    fieldEmergency: "Emergency Secondary Contact",
    fieldStation: "Affiliated Indian Police Station",
    searchStationPlaceholder: "Search station by name or city...",
    stationName: "Station Name",
    stationAddress: "Address",
    stationPhone: "Phone",
    btnRegister: "Register and Request OTP",
    btnLogin: "Login to Security Profile",
    otpTitle: "Verification Required",
    otpDesc: "A secure verification code has been dispatched to your terminal.",
    otpVerifyBtn: "Verify Profile",
    otpResendBtn: "Resend Code",
    scanTitle: "System Security Sweep",
    scanAnalyzing: "Scrutinizing Profile Security...",
    scanVulnerable: "UNENCRYPTED PROFILE",
    scanVulnerableDesc: "Establish a profile immediately to secure your communications.",
    scanSecure: "SECURED PROFILE CALIBRATED",
    scanProgress: "Processing cryptographic key configuration..."
  },
  ta: {
    tabRegister: "பதிவு செய்க (சுயவிவரம்)",
    tabLogin: "உள்ளீட்டு அதிகாரி உள்நுழைவு",
    titleRegister: "அதிகாரி சுயவிவரப் பதிவு",
    descRegister: "அழைப்பு மோசடி தடுப்பு மற்றும் நேரடி காப்பு ஒத்திசைவை செயல்படுத்த உங்கள் உள்ளூர் சுயவிவரத்தை உருவாக்கவும்.",
    titleLogin: "அதிகாரி பாதுகாப்பு அணுகல்",
    descLogin: "தானியங்கி மோசடி தடுப்பைத் தொடர உங்கள் சுயவிவரத்தில் உள்நுழையவும்.",
    fieldName: "அதிகாரியின் முழு பெயர்",
    fieldEmail: "மின்னஞ்சல் முகவரி",
    fieldPassword: "பாதுகாப்பு கடவுச்சொல்",
    fieldContact: "முதன்மையான தொலைபேசி எண்",
    fieldEmergency: "அவசரகால தொடர்பு எண்",
    fieldStation: "இணைக்கப்பட்ட காவல் நிலையம்",
    searchStationPlaceholder: "நிலைய பெயர் அல்லது ஊர் மூலம் தேடுக...",
    stationName: "நிலையத்தின் பெயர்",
    stationAddress: "முகவரி",
    stationPhone: "தொலைபேசி",
    btnRegister: "பதிவு செய்து OTP கேட்கவும்",
    btnLogin: "பாதுகாப்பு சுயவிவரத்தில் உள்நுழைக",
    otpTitle: "சரிபார்ப்பு தேவை",
    otpDesc: "பாதுகாப்பான சரிபார்ப்புக் குறியீடு உங்கள் சாதனத்திற்கு அனுப்பப்பட்டுள்ளது.",
    otpVerifyBtn: "சுயவிவரத்தை சரிபார்",
    otpResendBtn: "குறியீட்டை மீண்டும் அனுப்பு",
    scanTitle: "கணினி பாதுகாப்பு பகுப்பாய்வு",
    scanAnalyzing: "சுயவிவர பாதுகாப்பை பகுப்பாய்வு செய்கிறது...",
    scanVulnerable: "பாதுகாப்பற்ற சுயவிவரம்",
    scanVulnerableDesc: "உங்கள் தகவல்தொடர்புகளைப் பாதுகாக்க சுயவிவரத்தை உடனடியாக உருவாக்கவும்.",
    scanSecure: "பாதுகாக்கப்பட்ட சுயவிவரம் தயாராக உள்ளது",
    scanProgress: "பாதுகாப்பு விசைகளை கட்டமைக்கிறது..."
  },
  ml: {
    tabRegister: "രജിസ്റ്റർ ചെയ്യുക",
    tabLogin: "ലോഗിൻ ചെയ്യുക",
    titleRegister: "ഓഫീസർ പ്രൊഫൈൽ രജിസ്ട്രേഷൻ",
    descRegister: "തട്ടിപ്പ് തടയലും തത്സമയ ബാക്കപ്പും സജീവമാക്കാൻ നിങ്ങളുടെ സുരക്ഷിത പ്രൊഫൈൽ സൃഷ്ടിക്കുക.",
    titleLogin: "ഓഫീസർ സുരക്ഷാ പ്രവേശനം",
    descLogin: "നിങ്ങളുടെ നിലവിലുള്ള സുരക്ഷാ പ്രൊഫൈലിലേക്ക് ലോഗിൻ ചെയ്യുക.",
    fieldName: "ഓഫീസറുടെ പേര്",
    fieldEmail: "ഇമെയിൽ വിലാസം",
    fieldPassword: "സുരക്ഷാ പാസ്‌വേഡ്",
    fieldContact: "ഫോൺ നമ്പർ",
    fieldEmergency: "അടിയന്തിര ഫോൺ നമ്പർ",
    fieldStation: "പോലീസ് സ്റ്റേഷൻ",
    searchStationPlaceholder: "സ്റ്റേഷൻ പേര് അല്ലെങ്കിൽ നഗരം തിരയുക...",
    stationName: "സ്റ്റേഷൻ പേര്",
    stationAddress: "വിലാസം",
    stationPhone: "ഫോൺ",
    btnRegister: "രജിസ്റ്റർ ചെയ്ത് OTP അഭ്യർത്ഥിക്കുക",
    btnLogin: "സുരക്ഷാ പ്രൊഫൈലിൽ ലോഗിൻ ചെയ്യുക",
    otpTitle: "പരിശോധന ആവശ്യമാണ്",
    otpDesc: "ഒരു സുരക്ഷിത കോഡ് നിങ്ങളുടെ ഫോണിലേക്ക് അയച്ചിട്ടുണ്ട്.",
    otpVerifyBtn: "പ്രൊഫൈൽ സ്ഥിരീകരിക്കുക",
    otpResendBtn: "കോഡ് വീണ്ടും അയക്കുക",
    scanTitle: "സിസ്റ്റം സെക്യൂരിറ്റി സ്കാൻ",
    scanAnalyzing: "പ്രൊഫൈൽ സുരക്ഷ പരിശോധിക്കുന്നു...",
    scanVulnerable: "സുരക്ഷിതമല്ലാത്ത പ്രൊഫൈൽ",
    scanVulnerableDesc: "കമ്മ്യൂണിക്കേഷൻ സുരക്ഷിതമാക്കാൻ ഉടൻ പ്രൊഫൈൽ സ്ഥാപിക്കുക.",
    scanSecure: "സുരക്ഷിത പ്രൊഫൈൽ ക്രമീകരിച്ചു",
    scanProgress: "ക്രിപ്റ്റോഗ്രാഫിക് കീകൾ സജ്ജമാക്കുന്നു..."
  },
  hi: {
    tabRegister: "पंजीकरण (नया प्रोफाइल)",
    tabLogin: "अधिकारी लॉगिन",
    titleRegister: "अधिकारी प्रोफाइल पंजीकरण",
    descRegister: "स्वचालन धोखाधड़ी इंटरसेप्ट और लाइव सिंक सक्रिय करने के लिए अपना प्रोफाइल स्थापित करें।",
    titleLogin: "अधिकारी सुरक्षा पहुंच",
    descLogin: "स्वचालित इंटरसेप्ट जारी रखने के लिए अपने सुरक्षा प्रोफाइल में लॉगिन करें।",
    fieldName: "अधिकारी का पूरा नाम",
    fieldEmail: "सुरक्षित ईमेल पता",
    fieldPassword: "सुरक्षा पासवर्ड",
    fieldContact: "प्राथमिक फोन नंबर",
    fieldEmergency: "आपातकालीन संपर्क नंबर",
    fieldStation: "संबद्ध पुलिस स्टेशन",
    searchStationPlaceholder: "नाम या शहर से स्टेशन खोजें...",
    stationName: "थाने का नाम",
    stationAddress: "पता",
    stationPhone: "फ़ोन",
    btnRegister: "पंजीकरण करें और ओटीपी मांगें",
    btnLogin: "सुरक्षा प्रोफाइल में लॉगिन करें",
    otpTitle: "सत्यापन आवश्यक",
    otpDesc: "आपके मोबाइल पर एक सुरक्षा सत्यापन कोड भेजा गया है।",
    otpVerifyBtn: "प्रोफाइल सत्यापित करें",
    otpResendBtn: "कोड पुनः भेजें",
    scanTitle: "प्रणाली सुरक्षा जांच",
    scanAnalyzing: "प्रोफ़ाइल सुरक्षा की जांच की जा रही है...",
    scanVulnerable: "असुरक्षित प्रोफाइल",
    scanVulnerableDesc: "संचार को सुरक्षित करने के लिए तुरंत एक प्रोफाइल स्थापित करें।",
    scanSecure: "सुरक्षित प्रोफ़ाइल कैलिब्रेट की गई",
    scanProgress: "सुरक्षा कुंजी कॉन्फ़िगर की जा रही है..."
  },
  te: {
    tabRegister: "రిజిస్టర్ చేయండి (కొత్త ప్రొఫైల్)",
    tabLogin: "అధికారి లాగిన్",
    titleRegister: "అధికారి ప్రొఫైల్ రిజిస్ట్రేషన్",
    descRegister: "ఆటోమేటిక్ వాయిస్ రక్షణ మరియు లైవ్ బ్యాకప్ ప్రారంభించడానికి మీ ప్రొఫైల్‌ను సృష్టించండి.",
    titleLogin: "అధికారి భద్రతా ప్రవేశం",
    descLogin: "రక్షణను కొనసాగించడానికి మీ భద్రతా ప్రొఫైల్‌కు లాగిన్ అవ్వండి.",
    fieldName: "అధికారి పూర్తి పేరు",
    fieldEmail: "సురక్షిత ఇమెయిల్",
    fieldPassword: "భద్రతా పాస్‌వర్డ్",
    fieldContact: "ప్రాథమిక ఫోన్ నంబర్",
    fieldEmergency: "అత్యవసర కాంటాక్ట్ నంబర్",
    fieldStation: "సంబంధిత పోలీస్ స్టేషన్",
    searchStationPlaceholder: "పేరు లేదా నగరం ద్వారా పోలీస్ స్టేషన్ వెతకండి...",
    stationName: "పోలీస్ స్టేషన్ పేరు",
    stationAddress: "చిరునామా",
    stationPhone: "ఫోన్",
    btnRegister: "నమోదు చేసి OTP కోసం అభ్యర్థించండి",
    btnLogin: "రక్షణ ప్రొఫైల్‌కు లాగిన్ అవ్వండి",
    otpTitle: "ధృవీకరణ అవసరం",
    otpDesc: "మీ పరికరానికి ఒక సురక్షిత కోడ్ పంపబడింది.",
    otpVerifyBtn: "ప్రొఫైల్ ధృవీకరించు",
    otpResendBtn: "కోడ్ మళ్లీ పంపు",
    scanTitle: "సిస్టమ్ భద్రతా తనిఖీ",
    scanAnalyzing: "ప్రొఫైల్ భద్రతను విశ్లేషిస్తోంది...",
    scanVulnerable: "అసురక్షిత ప్రొఫైల్",
    scanVulnerableDesc: "మీ కమ్యూనికేషన్లను రక్షించుకోవడానికి వెంటనే ప్రొఫైల్ సృష్టించండి.",
    scanSecure: "సురక్షిత ప్రొఫైల్ సిద్ధమైంది",
    scanProgress: "సెక్యూరిటీ కీలను సిద్ధం చేస్తోంది..."
  }
};

interface IndianPoliceStation {
  name: string;
  city: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
  phone: string;
  x?: number;
  y?: number;
}

const PRESET_STATIONS: IndianPoliceStation[] = [
  { name: "Koramangala Precinct HQ", city: "Bengaluru", address: "80 Feet Rd, Koramangala 6th Block, Bengaluru, Karnataka 560095", distance: "0.8 km away", lat: 12.9376, lng: 77.6244, phone: "080-22942566", x: 15, y: 20 },
  { name: "HSR Layout Police Sub-Station", city: "Bengaluru", address: "24th Main Rd, HSR Layout, Sector 2, Bengaluru, Karnataka 560102", distance: "2.1 km away", lat: 12.9116, lng: 77.6389, phone: "080-22943486", x: 38, y: 68 },
  { name: "Connaught Place Police Station", city: "Delhi", address: "Baba Kharak Singh Rd, Hanuman Lane, Connaught Place, New Delhi 110001", distance: "1.2 km away", lat: 28.6289, lng: 77.2154, phone: "011-23348003", x: 55, y: 30 },
  { name: "Lodhi Road Emergency Station", city: "Delhi", address: "Lodhi Rd, Gokalpuri, Lodi Colony, New Delhi 110003", distance: "2.5 km away", lat: 28.5912, lng: 77.2289, phone: "011-24690629", x: 76, y: 75 },
  { name: "Madiwala Police Precinct", city: "Bengaluru", address: "Hosur Rd, Madiwala, Bengaluru, Karnataka 560068", distance: "3.4 km away", lat: 12.9226, lng: 77.6174, phone: "080-22942548", x: 90, y: 45 },
  { name: "Colaba Security Division", city: "Mumbai", address: "Colaba Causeway, Apollo Bandar, Mumbai, Maharashtra 400001", distance: "1.5 km away", lat: 18.9218, lng: 72.8315, phone: "022-22852882", x: 25, y: 55 },
  { name: "Andheri West Police Station", city: "Mumbai", address: "D.N. Nagar, Link Rd, Andheri West, Mumbai, Maharashtra 400053", distance: "2.9 km away", lat: 19.1293, lng: 72.8344, phone: "022-26322754", x: 62, y: 15 },
  { name: "Park Street Police Precinct", city: "Kolkata", address: "Park St, Mullick Bazar, Beniapukur, Kolkata, West Bengal 700016", distance: "1.1 km away", lat: 22.5485, lng: 88.3585, phone: "033-22849005", x: 48, y: 80 }
];

// Helper to calculate distance on Earth's surface (Haversine formula)
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


export default function AuthView({ onAuthSuccess, currentLanguage, onLanguageChange }: AuthProps) {
  const t = authTranslations[currentLanguage];

  // Navigation tabs within AuthView
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("REGISTER");
  const [step, setStep] = useState<"FORM" | "OTP">("FORM");

  // Form Fields Values
  const [name, setName] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [selectedStation, setSelectedStation] = useState<IndianPoliceStation>(PRESET_STATIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [otpSentText, setOtpSentText] = useState("");

  // OTP Verification Stage State
  const [enteredOtp, setEnteredOtp] = useState<string[]>(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Animation Sequence states (matching real-time call scan telemetry)
  const [scanProgress, setScanProgress] = useState(0); // 0 to 100 percentage
  const [hasCompletedScan, setHasCompletedScan] = useState(false);
  const [activeAlertState, setActiveAlertState] = useState<"ANALYZING" | "ALERT" | "SECURE">("ANALYZING");
  const [isPhoneVibrating, setIsPhoneVibrating] = useState(true);

  // Map Interactive States
  const [mapZoom, setMapZoom] = useState(13);
  const [isGpsScanning, setIsGpsScanning] = useState(false);
  const [gpsScanNote, setGpsScanNote] = useState("");

  // Scan pulse wave states
  const [audioWaves, setAudioWaves] = useState<{ id: number; height: number; color: string }[]>([]);

  // Simulation speed timer for call scan
  useEffect(() => {
    if (hasCompletedScan) return;

    const scanTimer = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 1.2;
        if (next >= 100) {
          clearInterval(scanTimer);
          setHasCompletedScan(true);
          setActiveAlertState("SECURE");
          setIsPhoneVibrating(false);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(scanTimer);
  }, [hasCompletedScan]);

  // Handle active analysis flags and voice simulation wave triggers
  useEffect(() => {
    if (scanProgress < 40) {
      setActiveAlertState("ANALYZING");
    } else if (scanProgress >= 40 && scanProgress < 85) {
      setActiveAlertState("ALERT");
    } else {
      setActiveAlertState("SECURE");
    }

    // Emit live wave heights
    if (Math.round(scanProgress) % 3 === 0 && scanProgress < 100) {
      setAudioWaves((prev) => {
        const newWave = {
          id: Date.now() + Math.random(),
          height: Math.floor(Math.random() * 24) + 8,
          color: scanProgress < 40 ? "#FBBF24" : (scanProgress < 85 ? "#EF4444" : "#10B981")
        };
        return [...prev.slice(-18), newWave];
      });
    }
  }, [scanProgress]);

  // Handle auto position detection with real Geolocation & IP fallback
  const handleAutoDetectPoliceStation = () => {
    setIsGpsScanning(true);
    setGpsScanNote("📡 Requesting device coordinate handshake...");

    const findAndSetClosestStation = (userLat: number, userLng: number, source: "GPS" | "IP") => {
      let closest = PRESET_STATIONS[0];
      let minDistance = Infinity;
      
      PRESET_STATIONS.forEach(station => {
        const dist = getDistance(userLat, userLng, station.lat, station.lng);
        if (dist < minDistance) {
          minDistance = dist;
          closest = station;
        }
      });
      
      setSelectedStation({
        ...closest,
        distance: `${minDistance.toFixed(1)} km away`
      });
      setIsGpsScanning(false);
      setGpsScanNote(`📍 Synced closest precinct via ${source}: ${closest.name}`);
      setTimeout(() => setGpsScanNote(""), 4500);
    };

    const fallbackToIp = () => {
      setGpsScanNote("📡 GPS access unavailable. Querying IP location telemetry...");
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
          if (data.latitude && data.longitude) {
            findAndSetClosestStation(data.latitude, data.longitude, "IP");
          } else {
            fallbackToDefault();
          }
        })
        .catch(() => {
          fallbackToDefault();
        });
    };

    const fallbackToDefault = () => {
      const defaultStation = PRESET_STATIONS[0];
      setSelectedStation(defaultStation);
      setIsGpsScanning(false);
      setGpsScanNote("⚠️ Location services timed out. Defaulted to Koramangala HQ.");
      setTimeout(() => setGpsScanNote(""), 4500);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          findAndSetClosestStation(latitude, longitude, "GPS");
        },
        (error) => {
          fallbackToIp();
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      fallbackToIp();
    }
  };

  // Switch tabs between Login & Register with clean presets to help judges
  const handleSwitchTab = (mode: "LOGIN" | "REGISTER") => {
    setAuthMode(mode);
    setStep("FORM");
    setOtpError("");
    if (mode === "LOGIN") {
      setEmail("demo.judge@hearttrust.in");
      setPassword("********");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  // Form submit trigger
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "REGISTER") {
      if (!name.trim() || !email.trim() || !contact.trim() || !emergencyContact.trim()) {
        alert("Please fill in all registration fields to set up Voice Guard.");
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        alert("Please enter both email and password.");
        return;
      }
    }

    const formattedNum = contact ? contact : "+91 98765 43210";
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpSentText(`We have dispatched a security 4-digit token to your encrypted channel ${formattedNum}. (For Demo: Enter "${code}")`);
    setStep("OTP");
  };

  // Verify secret OTP codes
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = enteredOtp.join("");
    if (otpString.length < 4) {
      setOtpError("Verify secret passcode: Enter the complete 4-digit code.");
      return;
    }

    if (otpString !== generatedOtp) {
      setOtpError("Authentication failed: Invalid security token code.");
      return;
    }

    setIsVerifying(true);
    setOtpError("");

    setTimeout(() => {
      setIsVerifying(false);
      
      const payloadName = name.trim() ? name.trim() : "Demo Officer Judge";
      const payloadEmail = email.trim() ? email.trim() : "demo.judge@hearttrust.in";
      const payloadContact = contact.trim() ? contact.trim() : "+91 98450 11223";
      const payloadEmergency = emergencyContact.trim() ? emergencyContact.trim() : "+91 99000 91100";
      
      onAuthSuccess({
        name: payloadName,
        email: payloadEmail,
        contact: payloadContact,
        emergencyContact: payloadEmergency,
        policeStation: selectedStation.name,
        stationCoords: `${selectedStation.lat.toFixed(4)}° N, ${selectedStation.lng.toFixed(4)}° E`
      });
    }, 1200);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const cleanVal = val.slice(-1);
    const updated = [...enteredOtp];
    updated[index] = cleanVal;
    setEnteredOtp(updated);

    if (cleanVal !== "" && index < 3) {
      const nextInput = document.getElementById(`otp-val-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Filter Indian Police stations based on user queries
  const filteredStations = PRESET_STATIONS.filter((station) => {
    const q = searchQuery.toLowerCase();
    return (
      station.name.toLowerCase().includes(q) ||
      station.city.toLowerCase().includes(q) ||
      station.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-slate-50 text-slate-800 overflow-y-auto select-none font-sans">
      
      {/* Visual System Styles */}
      <style>{`
        @keyframes phoneRingPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
          50% { transform: scale(1.02); box-shadow: 0 0 25px rgba(239, 68, 68, 0.45); }
        }
        @keyframes pulseGridRadar {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
        @keyframes laserScanVertical {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes spinnerRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes callPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .phone-shake {
          animation: phoneRingPulse 1s infinite ease-in-out;
        }
        .laser-scanner {
          animation: laserScanVertical 3s infinite linear;
        }
        .custom-radar-grid {
          animation: pulseGridRadar 4s infinite ease-in-out;
        }
        .custom-spinner-call {
          animation: spinnerRotate 1s infinite linear;
        }
        .icon-pulse-call {
          animation: callPulse 1s infinite ease-in-out;
        }
      `}</style>
      <div className={`relative w-full overflow-hidden transition-all duration-700 ease-in-out shrink-0 ${
        hasCompletedScan ? "h-52 md:h-56" : "h-80 sm:h-96"
      } bg-gradient-to-b from-[#090b21] via-[#0D1137] to-[#121643] border-b border-white/5`}>
        
        {/* Radar Scanning Background Grid */}
        <div className="absolute inset-0 custom-radar-grid bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {/* Ambient background rays */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none"></div>

        {/* HEADER STATUS BADGE */}
        <div className="absolute top-4 left-4 z-20 bg-[#161b4a] border border-white/10 rounded-full px-3 py-1 text-[10px] font-mono flex items-center gap-1.5 text-indigo-200 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {t.scanTitle}: <span className="text-white font-extrabold capitalize">{activeAlertState}</span>
        </div>

        {/* LANGUAGE SELECT DROPDOWN FOR PRE-LOGIN ACCESSIBILITY */}
        <div className="absolute top-4 right-4 z-30 flex items-center">
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
            className="bg-[#161b4a] border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white outline-hidden cursor-pointer select-none"
          >
            <option value="en">English (US)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="ml">മലയാളം (Malayalam)</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
        </div>

        {/* INTERACTIVE COMPOSITE CARICATURE: PERSON CALLING THROUGH PHONE */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-2xl w-full justify-center">
            
            {/* PERSON CARICATURE INTERACTION */}
            <div className="relative shrink-0 flex flex-col items-center">
              {/* Circular high-tech caller dashboard scanner */}
              <div className="relative w-24 h-24 flex items-center justify-center select-none">
                
                {/* Outer rotating dashboard grid rings */}
                <div className="absolute inset-0 rounded-full border border-indigo-500/10 border-dashed animate-[spin_30s_linear_infinite] pointer-events-none"></div>
                <div className="absolute inset-2 rounded-full border border-indigo-400/20 border-dashed animate-[spin_12s_linear_infinite_reverse] pointer-events-none"></div>
                
                {/* Dynamic Alert Scanner Glow */}
                <div className={'absolute -inset-1.5 rounded-full border-2 transition-all duration-700 ease-out opacity-60 ' + (
                  activeAlertState === "ALERT" 
                    ? "border-rose-500/80 animate-ping shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                    : (activeAlertState === "SECURE" ? "border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-amber-500/50 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.3)]")
                )}></div>

                {/* Inner core capsule avatar wrapper */}
                <div className={'relative w-18 h-18 rounded-full bg-[#0d123b]/95 border flex items-center justify-center shadow-xl overflow-hidden transition-all duration-500 ' + (
                  activeAlertState === "ALERT" 
                    ? "border-rose-500/50 shadow-rose-950/40" 
                    : (activeAlertState === "SECURE" ? "border-emerald-500/40 shadow-emerald-950/20" : "border-indigo-500/40")
                )}>
                  {/* Glow background matches alert state */}
                  <div className={'absolute inset-0 opacity-10 transition-colors duration-500 ' + (
                    activeAlertState === "ALERT" ? "bg-rose-500" : (activeAlertState === "SECURE" ? "bg-emerald-500" : "bg-indigo-500")
                  )}></div>

                  {/* High-fidelity Vector Phone/Caller Silhouette */}
                  <svg viewBox="0 0 24 24" className={'w-9 h-9 transition-colors duration-500 ' + (
                    activeAlertState === "ALERT" 
                      ? "text-rose-400" 
                      : (activeAlertState === "SECURE" ? "text-emerald-400" : "text-indigo-300")
                  )} fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                  {/* Mini scan sweep overlay */}
                  <div className={'absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-1000 ' + (
                    activeAlertState === "ALERT" ? "bg-rose-400/80" : "bg-indigo-400/80"
                  ) + ' animate-bounce'}></div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-black uppercase text-indigo-300 mt-2.5 tracking-wider">{t.incomingCaller}</span>
            </div>

            {/* REAL-TIME ENCRYPTED SCAM WARNING DIAGNOSIS PANEL (THE PHONE SIMULATOR) */}
            <div className={'phone-shake relative w-68 rounded-2xl border transition-all duration-500 ease-out p-4 flex flex-col justify-between overflow-hidden ' + (
              activeAlertState === "ALERT" 
                ? "border-rose-500 bg-[#120512] shadow-[0_0_25px_rgba(239,68,68,0.3)]" 
                : (activeAlertState === "SECURE" ? "border-emerald-500 bg-[#040e0b] shadow-[0_0_25px_rgba(16,185,129,0.3)]" : "border-indigo-500/40 bg-[#080c26] shadow-[0_0_20px_rgba(99,102,241,0.2)]")
            )}>
              {/* Laser scanner grid overlay indicating analysis */}
              {activeAlertState === "ALERT" && (
                <div className="absolute inset-x-0 h-0.5 bg-rose-500/60 laser-scanner z-10"></div>
              )}

              {/* Dynamic Caller Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                <div>
                  <p className="text-[9px] text-indigo-300 font-mono tracking-widest uppercase">Unverified Call</p>
                  <p className="text-xs font-black text-white tracking-tight mt-0.5">
                    {activeAlertState === "ALERT" ? "🚨 WARNING: +91 9421-SCAM" : "+91 9321-0021"}
                  </p>
                </div>
                <div className="text-right">
                  <span className={'text-[8.5px] font-mono px-2 py-0.5 rounded-full font-black uppercase tracking-wider ' + (
                    activeAlertState === "ALERT" 
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse" 
                      : (activeAlertState === "SECURE" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30")
                  )}>
                    {scanProgress.toFixed(0)}% Analyzed
                  </span>
                </div>
              </div>

              {/* LIVE SOUNDWAVE HARMONIC DISPLAY (Acoustic oscilloscope) */}
              <div className="h-16 flex items-center justify-center gap-1 my-3 bg-black/60 rounded-xl p-2.5 relative overflow-hidden border border-white/5">
                {/* Oscilloscope Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none"></div>
                {/* Glass Glare Overlay */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                <span className="absolute top-1 left-2 text-[6px] font-mono text-white/30 tracking-widest pointer-events-none">AUDIO SPECTRUM SCANNER</span>

                {audioWaves.map((wave, idx) => (
                  <div
                    key={wave.id + idx}
                    style={{ 
                      height: wave.height + 'px',
                      backgroundColor: wave.color,
                      boxShadow: '0 0 10px ' + wave.color + '60'
                    }}
                    className="w-1.5 rounded-full transition-all duration-150 relative z-10"
                  ></div>
                ))}
                {audioWaves.length === 0 && (
                  <p className="text-[9px] font-mono text-indigo-300 animate-pulse relative z-10">Initializing acoustic security capture...</p>
                )}
              </div>

              {/* REAL-TIME SCAM ANALYSIS FOOTER WARNING */}
              <div className="space-y-1">
                {activeAlertState === "ANALYZING" && (
                  <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2 text-yellow-300">
                    <span className="material-symbols-outlined text-sm font-black animate-spin">sync_saved_locally</span>
                    <span className="text-[9.5px] font-mono truncate">{t.scanAnalyzing}</span>
                  </div>
                )}
                
                {activeAlertState === "ALERT" && (
                  <div className="p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm font-black text-rose-400">warning</span>
                      <span className="text-[9.5px] font-black uppercase tracking-wider text-rose-400">Scam Impersonator Identified</span>
                    </div>
                    <p className="text-[8px] leading-tight text-rose-300/80 font-mono">Synthesized Voice Clone detected. Do not share financial tokens.</p>
                  </div>
                )}

                {activeAlertState === "SECURE" && (
                  <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm font-black text-emerald-400" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_good</span>
                      <span className="text-[9.5px] font-black uppercase tracking-wider text-emerald-400">Shield Guard Success</span>
                    </div>
                    <p className="text-[8.5px] leading-tight text-emerald-300/80 font-mono">Fraud neutralized. Encrypted database synchronized.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* LOWER AUTH CARD CONTAINER (Forms & Maps) */}
      <div className="flex-1 max-w-lg mx-auto w-full p-5 flex flex-col justify-start pt-6 md:pt-10 relative z-25">
        
        {/* HEARTRUST BRAND LOGO & TITLE */}
        <div className="flex flex-col items-center justify-center mb-6 text-center select-none">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30 border border-indigo-400/30 overflow-hidden mb-2.5">
            {/* Ambient inner glow */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_80%)] pointer-events-none"></div>
            {/* Audio wave combined with shield concept */}
            <div className="flex items-center gap-0.5 z-10">
              <span className="w-1.5 h-5 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
              <span className="material-symbols-outlined text-[20px] text-emerald-400 font-bold mx-0.5">
                gpp_good
              </span>
              <span className="w-1.5 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
              <span className="w-1.5 h-5 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></span>
            </div>
          </div>
          <h1 className="font-sans text-2xl font-black tracking-tight text-slate-800 font-headline">
            HearTrust
          </h1>
          <p className="text-[10px] text-indigo-600 font-bold tracking-wider font-mono uppercase mt-1">
            PROTECTING VOICES IN REAL-TIME
          </p>
        </div>

        {/* TAB TOGGLE: LOGIN VS REGISTER */}
        {step === "FORM" && (
          <div className="flex bg-slate-200/80 p-1 rounded-xl border border-slate-300 mb-5 relative">
            <button
              onClick={() => handleSwitchTab("REGISTER")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-headline font-bold transition-all relative z-10 ${
                authMode === "REGISTER" 
                  ? "bg-primary-indigo text-white shadow-sm font-black" 
                  : "text-slate-600 hover:text-slate-900 font-bold"
              }`}
            >
              {t.tabRegister}
            </button>
            <button
              onClick={() => handleSwitchTab("LOGIN")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-headline font-bold transition-all relative z-10 ${
                authMode === "LOGIN" 
                  ? "bg-primary-indigo text-white shadow-sm font-black" 
                  : "text-slate-600 hover:text-slate-900 font-bold"
              }`}
            >
              {t.tabLogin}
            </button>
          </div>
        )}

        {/* MAIN REGISTRATION & LOGIN PANEL (STYLISH CLEAN WHITE THEME) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          
          {/* Subtle decorative scanner bar running behind card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/10 overflow-hidden">
            <div className="h-full bg-linear-to-r from-transparent via-indigo-500 to-transparent w-1/3 grid-scanner-line relative"></div>
          </div>

          {isVerifying ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center select-none animate-pulse">
              
              <div className="relative flex items-center justify-center w-28 h-28">
                {/* Rotating ring spinner frame */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent custom-spinner-call"></div>
                
                {/* Inner pulsing badge containing call icon */}
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 icon-pulse-call shadow-md">
                  <span className="material-symbols-outlined text-3xl font-black">
                    call
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="inline-block px-2.5 py-1 text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md uppercase tracking-wider animate-pulse">
                  Verifying Security Token
                </span>
                <h3 className="font-headline text-base font-black text-slate-900 tracking-tight">
                  ESTABLISHING SECURE GATEWAY
                </h3>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-normal">
                  Matching credentials & validating telemetry signature...
                  <br />
                  <span className="text-emerald-600 font-extrabold font-mono mt-1.5 block">Decrypting shield configuration...</span>
                </p>
              </div>

            </div>
          ) : step === "FORM" ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="text-center pb-3 border-b border-slate-100">
                <h2 className="font-headline text-lg font-black text-slate-900 flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-primary-indigo font-bold">policy</span>
                  {authMode === "REGISTER" ? t.titleRegister : t.titleLogin}
                </h2>
                <p className="sky-subtitle text-[11px] text-slate-500 mt-1">
                  {authMode === "REGISTER" ? t.descRegister : t.descLogin}
                </p>
              </div>

              {/* User Name - Register Mode Only */}
              {authMode === "REGISTER" && (
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-slate-600">
                    {t.fieldName}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <span className="material-symbols-outlined text-sm">person</span>
                    </span>
                    <input
                      id="input_user_name"
                      type="text"
                      required
                      placeholder="e.g. inspector_amruta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-primary-indigo focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Username / Email Field */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-slate-600">
                  {authMode === "LOGIN" ? t.fieldName : t.fieldEmail}
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <span className="material-symbols-outlined text-sm">
                      {authMode === "LOGIN" ? "person" : "alternate_email"}
                    </span>
                  </span>
                  <input
                    id="input_email"
                    type="text"
                    required
                    placeholder={authMode === "LOGIN" ? "Enter your user name" : "name@agency.gov.in"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-primary-indigo focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Access Password */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-slate-600">
                  {t.fieldPassword}
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <span className="material-symbols-outlined text-sm">enhanced_encryption</span>
                  </span>
                  <input
                    id="input_password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-primary-indigo focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Register-only details: Mobile and Nearest Police Station Matcher */}
              {authMode === "REGISTER" && (
                <>
                  {/* Mobile, emergency numbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-slate-600">
                        {t.fieldContact}
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[11px] font-bold text-slate-500 font-mono">
                          +91
                        </span>
                        <input
                          id="input_phone"
                          type="tel"
                          required
                          placeholder="9876543210"
                          value={contact}
                          onChange={(e) => setContact(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="w-full pl-11 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-primary-indigo focus:bg-white transition-colors font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-slate-600">
                        {t.fieldEmergency}
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-rose-500 font-black">
                          <span className="material-symbols-outlined text-sm">emergency</span>
                        </span>
                        <input
                          id="input_emergency_phone"
                          type="tel"
                          required
                          placeholder="9900012234"
                          value={emergencyContact}
                          onChange={(e) => setEmergencyContact(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-primary-indigo focus:bg-white transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* NEAREST POLICE STATION LOCATOR WITH MOCK MAP API */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-slate-600">
                        📍 {t.fieldStation}
                      </label>
                      
                      <button
                        type="button"
                        onClick={handleAutoDetectPoliceStation}
                        disabled={isGpsScanning}
                        className="text-[9px] font-mono text-emerald-600 font-extrabold flex items-center gap-1 border border-emerald-500/20 bg-emerald-50 px-2 py-0.5 rounded-md hover:bg-emerald-100 active:scale-95 transition-all select-none"
                      >
                        <span className={`material-symbols-outlined text-[10px] font-black ${isGpsScanning ? "animate-spin" : "animate-pulse"}`}>
                          my_location
                        </span>
                        {isGpsScanning ? "Detecting GPS..." : "Auto Geolocation"}
                      </button>
                    </div>

                    {gpsScanNote && (
                      <p className="text-[10px] text-center text-indigo-600 animate-pulse bg-slate-50 p-1.5 rounded-lg font-mono border border-slate-100">
                        {gpsScanNote}
                      </p>
                    )}

                    {/* ACTIVE HIGH-TECH VECTOR MAP LOCATOR COMPONENT */}
                    <div className="relative h-28 bg-[#090C22] rounded-xl border border-slate-300 overflow-hidden flex flex-col justify-between p-2">
                      {/* Scanner Radar sweeping line overlay */}
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500/10 border-b border-indigo-400/25 grid animate-pulse"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,transparent_60%)]"></div>

                      {/* Simple high contrast grid map lines */}
                      <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 opacity-15 pointer-events-none">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div key={i} className="border-[0.5px] border-indigo-300"></div>
                        ))}
                      </div>

                      {/* Vector Interactive Pins representing stations */}
                      <div className="absolute inset-0 z-10">
                        {PRESET_STATIONS.map((station) => {
                          const isChosen = selectedStation.name === station.name;
                          return (
                            <div
                              key={station.name}
                              className="absolute cursor-pointer p-1 -m-1"
                              style={{ left: `${station.x || 50}%`, top: `${station.y || 50}%` }}
                              onClick={() => setSelectedStation(station)}
                            >
                              <span 
                                className={`material-symbols-outlined text-xs transition-all duration-300 ${
                                  isChosen ? "text-rose-500 text-[14px] font-semibold animate-bounce" : "text-indigo-400 hover:text-white"
                                  }`}
                                style={{ fontVariationSettings: isChosen ? "'FILL' 1" : undefined }}
                              >
                                local_police
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Map diagnostic overlays */}
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="text-[8px] font-mono font-bold bg-[#141846] text-indigo-300 border border-white/5 py-0.5 px-1.5 rounded-sm">
                          RADAR LAT: 12.93° N • LNG: 77.62° E
                        </span>
                        <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 px-1 rounded">
                          SIGNAL COMPLIANT
                        </span>
                      </div>

                      {/* Map Selection HUD */}
                      <div className="relative z-10 bg-[#070a1f]/90 border border-white/10 rounded-lg p-2 flex justify-between items-center text-xs">
                        <div className="min-w-0">
                          <p className="font-extrabold text-white text-[11px] truncate">{selectedStation.name}</p>
                          <p className="text-[10px] text-indigo-300 truncate">{selectedStation.address}</p>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-mono font-black shrink-0 ml-2">
                          {selectedStation.distance}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Manual precinct selector filter */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 pointer-events-none">
                          <span className="material-symbols-outlined text-sm">search</span>
                        </span>
                        <input
                          type="text"
                          placeholder={t.searchStationPlaceholder}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-7.5 pr-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-900 placeholder-slate-400 font-mono focus:outline-hidden focus:border-primary-indigo"
                        />
                      </div>
                    </div>

                    {/* Filtered Preset Station List */}
                    {searchQuery.trim() && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg max-h-24 overflow-y-auto p-1.5 space-y-1 font-mono text-[10px]">
                        {filteredStations.length === 0 ? (
                          <p className="text-center text-slate-400 py-2">No regional stations matched query.</p>
                        ) : (
                          filteredStations.map((st) => (
                            <div
                              key={st.name}
                              onClick={() => {
                                setSelectedStation(st);
                                setSearchQuery("");
                              }}
                              className="p-1 px-2 hover:bg-indigo-50 rounded cursor-pointer flex justify-between text-slate-700 hover:text-slate-950"
                            >
                              <span>🏢 {st.name} ({st.city})</span>
                              <span className="font-bold text-emerald-600">{st.distance}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-primary-indigo hover:bg-primary-indigo/95 text-white font-headline font-bold text-xs py-3.5 rounded-xl transition-all active:scale-98 shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <span className="material-symbols-outlined text-sm font-black">
                  vpn_key
                </span>
                {authMode === "REGISTER" ? t.btnRegister : t.btnLogin}
              </button>

              {/* Demo quick authorization card */}
              <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-indigo-400/20 text-center font-mono text-[10px] text-slate-600">
                ✨ Quick Sandbox Tip: Click the {authMode === "REGISTER" ? "secure setup" : "authorize"} button above to instantly unlock the full simulator dashboard.
              </div>

            </form>
          ) : (
            /* OTP VERIFICATION SECURE PANEL (STYLISH CLEAN WHITE THEME) */
            <form onSubmit={handleOtpSubmit} className="space-y-5 text-center py-2">
              
              <div className="flex justify-center items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50/10 border border-emerald-200 flex items-center justify-center text-emerald-600 animate-pulse">
                  <span className="material-symbols-outlined text-2xl font-black">
                    sms
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-headline text-lg font-black text-slate-900">
                  {t.otpTitle}
                </h3>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-normal">
                  {otpSentText || t.otpDesc}
                </p>
              </div>

              {/* Character security broadcast ticker */}
              <div className="bg-slate-55 border border-slate-200 p-2 rounded-lg text-[9px] font-mono text-emerald-600 animate-pulse">
                📲 SMS BROADCASTED STREAM: HearTrust verification token dispatch successful.
              </div>

              {/* Grid Inputs for OTP */}
              <div className="flex justify-center gap-3">
                {enteredOtp.map((val, idx) => (
                  <input
                    key={idx}
                    id={`otp-val-${idx}`}
                    type="text"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-14 text-center text-lg font-extrabold bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-primary-indigo focus:outline-hidden text-slate-900 font-mono transition-colors focus:bg-white"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-[10px] text-rose-500 font-mono font-bold">
                  ⚠️ {otpError}
                </p>
              )}

              {/* Verification Button controls */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-headline font-bold text-xs py-3.5 rounded-xl transition-all active:scale-98 shadow-sm flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">filter_tilt_shift</span>
                      ESTABLISHING SECURE CONNECTION...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm font-bold">verified_user</span>
                      {t.otpVerifyBtn}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("FORM")}
                  className="text-xs text-slate-500 hover:text-slate-800 underline font-mono block mx-auto py-1"
                >
                  ← Modify registration details
                </button>
              </div>

              {/* Quick tip code display to speed up testing */}
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[9.5px] text-slate-600">
                💡 Demo passcode: Enter the generated 4-digit token <span className="text-emerald-600 font-black">"{generatedOtp || "----"}"</span> to instantly unlock core credentials.
              </div>

            </form>
          )}

        </div>

      </div>

      {/* FOOTER */}
      <div className="py-4 text-center text-[10px] text-slate-400 font-mono border-t border-slate-200 bg-white shrink-0">
        🔒 Authorized by Regional India Cyber-Security Department • Sandbox Security Layer Enabled
      </div>

    </div>
  );
}
