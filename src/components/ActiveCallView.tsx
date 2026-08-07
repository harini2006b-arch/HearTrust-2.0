import React, { useState, useEffect, useRef } from "react";
import { CallScript, TranscriptLine, CallStatus, CallType } from "../types";
import { PRESET_SCRIPTS } from "../data";


import { translations, localizedThreatKeywords, LanguageCode } from "../translations";

interface ActiveCallViewProps {
  onEndCall: (finalRisk: number, finalDeepfake: number, transcript: TranscriptLine[], forceImmunize?: boolean) => void;
  onTriggerEmergencyMode: () => void;
  dialedDigits?: string;
  currentLanguage: LanguageCode;
  callMedium: CallType;
  isAutoPilotActive?: boolean;
  guardianRoute?: "FAMILY" | "PRECINCT" | "WARDEN" | "AUTONOMOUS";
}

export default function ActiveCallView({ onEndCall, onTriggerEmergencyMode, dialedDigits, currentLanguage, callMedium, isAutoPilotActive = false, guardianRoute = "FAMILY" }: ActiveCallViewProps) {


  // Elderly Auto-Pilot 5-state simulation engine
  const [simulationState, setSimulationState] = useState<"IDLE" | "CALL_CONNECTED" | "AI_ANALYSIS" | "INTERCEPT_ACTIVE" | "TERMINATED">("IDLE");
  const [typedWordsCount, setTypedWordsCount] = useState(0);

  const fullText = "Dad, it's Ramesh. I changed my number. I'm arrested, send ₹50,000 right now or they will lock me up!";
  const words = fullText.split(" ");

  useEffect(() => {
    if (!isAutoPilotActive) return;

    // Reset states
    setSimulationState("CALL_CONNECTED");
    setScamRisk(10);
    setDeepfakeScore(5);
    setTypedWordsCount(0);

    // Typewriter effect interval
    const typewriterInterval = setInterval(() => {
      setTypedWordsCount(prev => {
        if (prev < words.length) {
          return prev + 1;
        } else {
          clearInterval(typewriterInterval);
          return prev;
        }
      });
    }, 220); // ~220ms per word

    // Step 2: Fire AI Analytics Models (1.5 second delay)
    const t2 = setTimeout(() => {
      setSimulationState("AI_ANALYSIS");
      setScamRisk(95);
      setDeepfakeScore(99);
    }, 1500);

    // Step 3: Trigger Overrides & Guardian Bridge Handoff (3.0 second mark)
    const t3 = setTimeout(() => {
      setSimulationState("INTERCEPT_ACTIVE");
      
      // Native SpeechSynthesis trigger
      try {
        let textToSpeak = "This is a cloned voice, please hang up immediately!";
        if (guardianRoute === "AUTONOMOUS") {
          textToSpeak = "This line is protected by Hear Trust A I. Please state your certified government verification I D or relationship P I N to continue.";
        }
        const speech = new SpeechSynthesisUtterance(textToSpeak);
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech);
      } catch (e) {
        console.error("SpeechSynthesis error:", e);
      }
    }, 3000);

    // Step 4: Autonomous Lockdown Local Carrier Drop (6.0 second mark, only in Autonomous Mode)
    let t4: any = null;
    if (guardianRoute === "AUTONOMOUS") {
      t4 = setTimeout(() => {
        setSimulationState("TERMINATED");
      }, 6500);
    }

    return () => {
      clearInterval(typewriterInterval);
      clearTimeout(t2);
      clearTimeout(t3);
      if (t4) clearTimeout(t4);
    };
  }, [isAutoPilotActive, guardianRoute]);

  const handleForceDisconnectClick = () => {
    setSimulationState("TERMINATED");
  };

  // Allow user to select a script for simulation
  const [selectedScriptId, setSelectedScriptId] = useState(PRESET_SCRIPTS[0].id);
  const currentScript = PRESET_SCRIPTS.find(s => s.id === selectedScriptId) || PRESET_SCRIPTS[0];

  // Custom dial configurations
  const [customCallerName, setCustomCallerName] = useState("");
  const [customCallerNum, setCustomCallerNum] = useState("");

  // Simulation states
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([
    { speaker: "system", text: "Active Guard Secure Call Intercept Initiated." }
  ]);
  const [scamRisk, setScamRisk] = useState(10);
  const [deepfakeScore, setDeepfakeScore] = useState(5);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Judge manual speech override states
  const [customPhraseText, setCustomPhraseText] = useState("");
  const [customWarningLabel, setCustomWarningLabel] = useState("");
  const [customWarningDesc, setCustomWarningDesc] = useState("");

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Microphone Speech Recognition states
  const [isMicActive, setIsMicActive] = useState(false);
  const [isInjectingSpeechMicActive, setIsInjectingSpeechMicActive] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Clean raw speech engine on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const startSpeechRecognition = () => {
    setSpeechError(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError("Speech recognition API is not supported in this browser. Please use Google Chrome or Safari.");
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = false;
      
      const langMapping: Record<LanguageCode, string> = {
        en: "en-IN",
        ta: "ta-IN",
        ml: "ml-IN",
        hi: "hi-IN",
        te: "te-IN"
      };
      rec.lang = langMapping[currentLanguage] || "en-IN";

      rec.onstart = () => {
        setIsMicActive(true);
        const micStartMsg = currentLanguage === "ta" ? "🎙️ நேரடி மைக்ரோஃபோன் ஸ்கேன் தொடங்கியது. மோசடி அச்சுறுத்தல்களைப் பகுப்பாய்வு செய்யப் பேசவும்!" :
                            currentLanguage === "ml" ? "🎙️ തത്സമയ മൈക്രോഫോൺ സ്കാനിംഗ് ആരംഭിച്ചു. തട്ടിപ്പുകൾ വിശകലനം ചെയ്യാൻ സംസാരിക്കുക!" :
                            currentLanguage === "hi" ? "🎙️ लाइव माइक्रोफोन स्कैन शुरू हो गया है। धोखाधड़ी का विश्लेषण करने के लिए बोलें!" :
                            currentLanguage === "te" ? "🎙️ లైవ్ మైక్రోఫోన్ స్కాన్ ప్రారంభించబడింది. మోసాలను విశ్లేషించడానికి మాట్లాడండి!" :
                            "🎙️ Live Microphone Scan Started. Talk real words to analyze scam risk!";
        setTranscript(prev => [
          ...prev,
          { speaker: "system", text: micStartMsg }
        ]);
      };

      rec.onresult = (event: any) => {
        const lastResultIndex = event.results.length - 1;
        const speechOutput = event.results[lastResultIndex][0].transcript;
        if (speechOutput && speechOutput.trim()) {
          handleInjectSpeech(speechOutput.trim());
        }
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        if (e.error === "not-allowed") {
          setSpeechError("Microphone permission denied. Please grant permission in your browser.");
        } else {
          setSpeechError(`Microphone connection inactive: ${e.error}`);
        }
        setIsMicActive(false);
      };

      rec.onend = () => {
        setIsMicActive(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err: any) {
      setSpeechError("Failed to initialize system microphone. Ensure permissions are set.");
      setIsMicActive(false);
    }
  };


  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      recognitionRef.current = null;
    }
    setIsMicActive(false);
    const micStopMsg = currentLanguage === "ta" ? "🎙️ நேரடி மைக்ரோஃபோன் ஸ்கேன் துண்டிக்கப்பட்டது." :
                       currentLanguage === "ml" ? "🎙️ തത്സമയ മൈക്രോഫോൺ സ്കാനിംഗ് നിർത്തിവെച്ചു." :
                       currentLanguage === "hi" ? "🎙️ लाइव माइक्रोफोन स्कैन बंद कर दिया गया है।" :
                       currentLanguage === "te" ? "🎙️ లైవ్ మైక్రోఫోన్ స్కాన్ ఆపివేయబడింది." :
                       "🎙️ Live Microphone Scan Disconnected.";
    setTranscript(prev => [
      ...prev,
      { speaker: "system", text: micStopMsg }
    ]);
  };


  const toggleMicAnalysis = () => {
    if (isMicActive) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  // Handle dial speed codes
  useEffect(() => {
    if (dialedDigits) {
      if (dialedDigits === "555") {
        setSelectedScriptId("bank-impostor");
        setCustomCallerName("🏦 Suspicious Bank Clearance");
        setCustomCallerNum("+1 (555) 012-3456");
      } else if (dialedDigits === "777") {
        setSelectedScriptId("grandkid-voice-clone");
        setCustomCallerName("👶 Urgent Family Clone");
        setCustomCallerNum("+1 (305) 881-9921");
      } else if (dialedDigits === "123") {
        setSelectedScriptId("irs-threat");
        setCustomCallerName("🏛️ IRS Agent Miller");
        setCustomCallerNum("+1 (202) 555-0100");
      } else if (dialedDigits === "911") {
        // Handled by App state, but fallback to physical critical intercept
        setCustomCallerName("🚨 High Threat Intimidation");
        setCustomCallerNum("+1 (911) 993-4112");
        setScamRisk(95);
        setDeepfakeScore(45);
        setShowWarning(true);
      } else {
        setCustomCallerName("Custom Sandbox Call");
        setCustomCallerNum(dialedDigits);
        setTranscript([
          { speaker: "system", text: `Secure Call Intercept: Active Guard scanning dial endpoint ${dialedDigits}...` }
        ]);
      }
    }
  }, [dialedDigits]);

  // Reset simulation when selected script changes (if not custom dialed)
  useEffect(() => {
    if (!dialedDigits || ["555", "777", "123", "911"].includes(dialedDigits)) {
      setCurrentLineIndex(0);
      setIsPlaying(false);
      setTranscript([
        { speaker: "system", text: `Secure Call Intercept: Active Guard scanning ${currentScript.name}...` }
      ]);
      setScamRisk(12);
      setDeepfakeScore(8);
      setShowWarning(false);
      setCustomWarningLabel("");
      setCustomWarningDesc("");
    }
  }, [selectedScriptId, dialedDigits]);

  // Handle auto playing line-by-line simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentLineIndex < currentScript.lines.length) {
          triggerNextLine();
        } else {
          setIsPlaying(false);
        }
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentLineIndex, selectedScriptId]);

  // Scroll to bottom of transcripts
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const triggerNextLine = () => {
    if (currentLineIndex >= currentScript.lines.length) return;

    const line = currentScript.lines[currentLineIndex];
    
    // Add line to live transcription
    setTranscript(prev => [
      ...prev,
      {
        speaker: line.speaker,
        text: line.text,
        isSuspicious: line.isSuspicious
      }
    ]);

    // Update risk gauges based on scam indicators
    if (line.isSuspicious) {
      const stepValue = currentScript.scamRiskMax / currentScript.lines.filter(l => l.isSuspicious).length;
      setScamRisk(prev => Math.min(Math.round(prev + stepValue), currentScript.scamRiskMax));
      
      const cloneScoreStep = currentScript.deepfakeScoreMax / currentScript.lines.filter(l => l.isSuspicious).length;
      setDeepfakeScore(prev => Math.min(Math.round(prev + cloneScoreStep), currentScript.deepfakeScoreMax));
      
      // Flash threat alert warnings if risk goes over 50%
      setShowWarning(true);
    } else {
      setScamRisk(prev => Math.min(prev + 5, 25));
    }

    setCurrentLineIndex(prev => prev + 1);
  };

  // Context-aware classifier distinguishing friendly conversation from actual scam coercion
  const checkThreatContext = (textLower: string, lang: LanguageCode) => {
    // Action verbs / demands
    const demandWords: Record<LanguageCode, string[]> = {
      en: ["need", "give", "verify", "send", "transfer", "share", "enter", "provide", "require", "demand", "ask", "pay", "wire", "deposit", "card number", "password", "pin", "otp", "ssn"],
      ta: ["தாருங்கள்", "கொடுங்கள்", "தேவை", "அனுப்புங்கள்", "பகிர்வு", "சரிபார்க்கவும்", "அனுப்பு", "பகிர்", "கடவுச்சொல்", "கடவுச்சொல்லை", "பின்"],
      ml: ["തരിക", "നൽകുക", "വേണം", "അയക്കുക", "ഷെയർ", "വെരിഫൈ", "അയക്കൂ", "പാസ്‌വേഡ്", "പിൻ"],
      hi: ["दें", "दे", "भेजें", "स्थानांतरित", "साझा", "सत्यापित", "चाहिए", "पासवर्ड", "पिन"],
      te: ["ఇవ్వండి", "పంపిణి", "పంపండి", "షేర్", "వెరిఫై", "కావాలి", "పాస్‌వర్డ్", "పిన్"]
    };

    // Friendly / Informational / Safety patterns that override and clear threat
    const positiveOverrides: Record<LanguageCode, string[]> = {
      en: ["good morning", "hello", "how are you", "love my", "work at", "thanks", "thank you", "going to", "sitting", "regular", "normal", "meeting", "friend"],
      ta: ["காலை வணக்கம்", "வணக்கம்", "நலம்", "அன்பு", "வேலை செய்கிறேன்", "நன்றி", "செல்கிறேன்", "அமர்ந்திருக்கிறேன்", "சந்திப்பு", "நண்பர்"],
      ml: ["സുപ്രഭാതം", "ഹലോ", "സുഖമാണോ", "സ്നേഹിക്കുന്നു", "ജോലി ചെയ്യുന്നു", "നന്ദി", "പോകുന്നു", "ഇരിക്കുന്നു", "കൂടിക്കാഴ്ച", "കൂട്ടുകാരൻ"],
      hi: ["शुभ प्रभात", "नमस्ते", "कैसे हो", "प्यार", "काम करता हूँ", "धन्यवाद", "जा रहा हूँ", "बैठा हूँ", "बैठक", "दोस्त"],
      te: ["శుభోదయం", "నమస్తే", "ఎలా ఉన్నారు", "ప్రేమిస్తున్నాను", "పని చేస్తున్నాను", "ధన్యవాదాలు", "వెళ్తున్నాను", "కూర్చున్నాను", "సమావేశం", "స్నేహితుడు"]
    };

    const demands = demandWords[lang] || demandWords.en;
    const overrides = positiveOverrides[lang] || positiveOverrides.en;

    // If text contains positive overrides, lower threat likelihood
    const hasOverride = overrides.some(w => textLower.includes(w.toLowerCase()));
    if (hasOverride) {
      return { matchesBank: false, matchesClone: false, matchesGov: false, matchesStalk: false };
    }

    // Check Bank: requires BOTH a financial asset word and a demand/action word
    const hasBankAsset = ["pin", "password", "otp", "ssn", "card", "account", "social security", "security number",
                          "பின்", "கடவுச்சொல்", "கணக்கு", "அட்டை", "ஓடிபி",
                          "പിൻ", "പാസ്‌വേഡ്", "അക്കൗണ്ട്", "കാർഡ്", "ഒടിപി",
                          "पिन", "पासवर्ड", "खाता", "कार्ड", "ओटीपी",
                          "పిన్", "పాస్‌వర్డ్", "ఖాతా", "కార్డ్", "ఓటీపీ"].some(w => textLower.includes(w));
    const hasDemand = demands.some(w => textLower.includes(w));
    const matchesBank = hasBankAsset && hasDemand;

    // Check Clone: requires term of family member AND an emergency term
    const hasFamilyTerm = ["grandma", "grandpa", "son", "daughter", "kid", "family", "mom", "dad", "uncle", "aunt", "nephew", "niece", "grandkid", "grandchild",
                           "பாட்டி", "தாத்தா", "மகன்", "மகள்", "குழந்தை", "அம்மா", "அப்பா", "குடும்ப",
                           "അമ്മൂമ്മ", "അപ്പൂപ്പൻ", "മോൻ", "മോൾ", "കുട്ടി", "അമ്മ", "അച്ഛൻ", "കുടുംബം",
                           "दादी", "दादा", "बेटा", "बेटी", "बच्चा", "माँ", "पिता", "परिवार",
                           "నానమ్మ", "తాతయ్య", "కొడుకు", "కూతురు", "పిల్లవాడు", "అమ్మ", "నాన్న", "కుటుంబం"].some(w => textLower.includes(w));
    const hasEmergencyTerm = ["accident", "jail", "bail", "kidnap", "hospital", "police", "money", "crash", "wire", "pay",
                              "விபத்து", "சிறை", "ஜாமீன்", "கடத்தல்", "மருத்துவமனை", "போலீஸ்", "பணம்",
                              "അപകടം", "ജയിൽ", "ജാമ്യം", "തട്ടിക്കൊണ്ടുപോകൽ", "ആശുപത്രി", "പോലീസ്", "പണം",
                              "दुर्घटना", "जेल", "जमानत", "अपहरण", "अस्पताल", "पुलिस", "पैसा", "पैसे",
                              "ప్రమాదం", "జైలు", "బెయిల్", "కిడ్నాప్", "ఆసుపత్రి", "పోలీసు", "డబ్బులు", "డబ్బు"].some(w => textLower.includes(w));
    const matchesClone = hasFamilyTerm && hasEmergencyTerm;

    // Check Gov: requires gov agency terms AND threat/coercion terms (arrest, warrant, deport, pay, gift card)
    const hasGovTerm = ["irs", "agent", "officer", "police", "authority", "government", "federal", "court", "lawyer", "judge",
                        "வருமான வரி", "அதிகாரி", "போலீஸ்", "அரசு",
                        "നികുതി", "ഓഫീസർ", "പോലീസ്", "സർക്കാർ",
                        "टैक्स", "अधिकारी", "पुलिस", "सरकार",
                        "టాక్స్", "అధికారి", "పోలీసు", "ప్రభుత్వం"].some(w => textLower.includes(w));
    const hasGovCoercion = ["arrest", "warrant", "jail", "prison", "gift card", "pay", "fine", "deport", "seize", "block",
                            "கைது", "வாரண்ட்", "அபராதம்", "பணம்",
                            "അറസ്റ്റ്", "വാറണ്ട്", "അപരാധം", "പണം",
                            "गिरफ्तार", "गिरफ्तारी", "वारंट", "जुर्माना", "पैसा",
                            "అరెస్ట్", "వారెంట్", "జరిమానా", "డబ్బులు"].some(w => textLower.includes(w));
    const matchesGov = hasGovTerm && hasGovCoercion;

    // Check Stalk: requires stalking keywords with high severity terms
    const hasLocationTerm = ["outside", "house", "door", "window", "watching", "photos", "leak",
                             "வெளியே", "வீடு", "கதவு", "கண்காணிக்கிறேன்", "புகைப்படம்", "புகைப்படங்களை",
                             "புറത്ത്", "വീട്", "വാതിൽ", "ഫോട്ടോ", "ഫോട്ടോകൾ",
                             "बाहर", "घर", "दरवाजा", "फोटो", "तस्वीर",
                             "బయట", "ఇల్లు", "తలుపు", "ఫోటో", "ఫోటోలు"].some(w => textLower.includes(w));
    const hasHostileTerm = ["watch", "kill", "harm", "stalk", "leak", "unsafe", "destroy", "post", "expose",
                            "கொலை", "கொன்றுவிடுவேன்", "வெளியிடுவேன்", "ஆபத்து", "துன்புறுத்தல்",
                            "கொல்லും", "ലീക്ക്", "അപകടം", "വേട്ടയാടൽ",
                            "मार", "जान से मार", "लीक", "खतरा",
                            "చంపేస్తా", "చంపుతా", "లీక్", "ప్రమాదం", "വേధింపు"].some(w => textLower.includes(w));
    const matchesStalk = hasLocationTerm && hasHostileTerm;

    return { matchesBank, matchesClone, matchesGov, matchesStalk };
  };

  // Live parsing engine for custom user speech input
  const handleInjectSpeech = (phraseText: string) => {
    if (!phraseText.trim()) return;

    // Trigger simulated Mic On symbol
    setIsInjectingSpeechMicActive(true);
    setTimeout(() => {
      setIsInjectingSpeechMicActive(false);
    }, 1800);

    const textLower = phraseText.toLowerCase();
    
    let label = "";
    let desc = "";
    let isSuspicious = false;
    let targetRisk = 12;
    let targetDeepfake = 8;

    const { matchesBank, matchesClone, matchesGov, matchesStalk } = checkThreatContext(textLower, currentLanguage);

    // Direct parser matching based on localized voice queries
    if (matchesBank) {
      label = currentLanguage === "ta" ? "தனிப்பட்ட வங்கி மோசடி அச்சுறுத்தல்" :
              currentLanguage === "ml" ? "ബാങ്ക് വിവര ചോർച്ചാ ഭീഷണി" :
              currentLanguage === "hi" ? "बैंक धोखाधड़ी का खतरा" :
              currentLanguage === "te" ? "బ్యాంక్ మోసం ముప్పు" :
              "PII Bank Forgery Solicitations";
      desc = currentLanguage === "ta" ? "அழைப்பாளர் உங்கள் வங்கி கடவுச்சொல் அல்லது கார்டு எண்ணைக் கேட்கிறார். வங்கிகள் ஒருபோதும் தொலைபேசி வாயிலாக கடவுச்சொற்களைக் கேட்காது." :
             currentLanguage === "ml" ? "വിളിക്കുന്നയാൾ നിങ്ങളുടെ ബാങ്ക് പാസ്‌വേഡോ കാർഡ് നമ്പറോ ആവശ്യപ്പെടുന്നു. ബാങ്കുകൾ ഫോൺ വഴി വിവരങ്ങൾ ചോദിക്കാറില്ല." :
             currentLanguage === "hi" ? "कॉलर आपके बैंक पासवर्ड या कार्ड विवरण मांग रहा है। बैंक कभी भी फोन पर पासवर्ड नहीं मांगते।" :
             currentLanguage === "te" ? "కాలర్ మీ బ్యాంక్ పాస్‌వర్డ్ లేదా కార్డు వివరాలు అడుగుతున్నారు. బ్యాంకులు ఫోన్ ద్వారా పాస్‌వర్డ్ అడగవు." :
             "The caller is attempting to secure online banking passcodes or request wire transfers. Actual bank clearing services never demand credentials via voice calls.";
      isSuspicious = true;
      targetRisk = 92;
      targetDeepfake = 78;
    } else if (matchesClone) {
      label = currentLanguage === "ta" ? "செயற்கை குரல் ஆள்மாறாட்டம்" :
              currentLanguage === "ml" ? "കൃത്രിമ ശബ്ദ അനുകരണം" :
              currentLanguage === "hi" ? "कृत्रिम आवाज प्रतिरूपण" :
              currentLanguage === "te" ? "వాయిస్ క్లోనింగ్ మోసం" :
              "Auditory Vocal Clone / Extortion";
      desc = currentLanguage === "ta" ? "நரம்பியல் பகுப்பாய்வு இந்த குரல் 99% செயற்கையாக உருவாக்கப்பட்ட குரல் என்று கண்டறிந்துள்ளது. மோசடி செய்பவர்கள் உறவினர்களின் குரலைப் போலியாகப் பயன்படுத்துகின்றனர்." :
             currentLanguage === "ml" ? "ഈ ശബ്ദം ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ് വഴി നിർമ്മിച്ചതാണെന്ന് സ്കാനർ കണ്ടെത്തിയിരിക്കുന്നു. ബന്ധുക്കളുടെ ശബ്ദം ഇവർ അനുകരിക്കുന്നു." :
             currentLanguage === "hi" ? "स्कैनर ने पाया है कि यह आवाज कृत्रिम रूप से बनाई गई है। धोखेबाज रिश्तेदारों की आवाज का अनुकरण करते हैं।" :
             currentLanguage === "te" ? "ఈ వాయిస్ కృత్రిమంగా సృష్టించబడినదని స్కానర్ గుర్తించింది. మోసగాళ్లు బంధువుల గొంతును అనుకరిస్తారు." :
             "Acoustic neural evaluation matched synthetic AI audio generation waves with 99% certainty. Extortionists leverage clone models of relatives.";
      isSuspicious = true;
      targetRisk = 98;
      targetDeepfake = 99;
    } else if (matchesGov) {
      label = currentLanguage === "ta" ? "அரசு அதிகாரி போல் நடித்தல்" :
              currentLanguage === "ml" ? "സർക്കാർ ഉദ്യോഗസ്ഥൻ ചമയൽ" :
              currentLanguage === "hi" ? "सरकारी अधिकारी का प्रतिरूपण" :
              currentLanguage === "te" ? "ప్రభుత్వ అధికారి వలె నటించడం" :
              "Government Authority Impersonation";
      desc = currentLanguage === "ta" ? "அழைப்பாளர் அரசு வரித்துறை அதிகாரி என கூறி கைது செய்வதாக மிரட்டுகிறார். அரசு அதிகாரிகள் ஒருபோதும் தொலைபேசியில் பணம் கேட்க மாட்டார்கள்." :
             currentLanguage === "ml" ? "ടാക്സ് ഓഫീസർ ആണെന്ന് പറഞ്ഞ് അറസ്റ്റ് ഭീഷണിപ്പെടുത്തുന്നു. ഉദ്യോഗസ്ഥർ ഫോൺ വഴി പണം ആവശ്യപ്പെടാറില്ല." :
             currentLanguage === "hi" ? "टैक्स अधिकारी बनकर गिरफ्तारी की धमकी दे रहे हैं। सरकारी एजेंसियां फोन पर तुरंत पैसे नहीं मांगतीं।" :
             currentLanguage === "te" ? "టాక్స్ అధికారి అని చెప్పి అరెస్ట్ చేస్తామని బెదిరిస్తున్నారు. ప్రభుత్వ సంస్థలు ఫోన్ ద్వారా డబ్బులు అడగవు." :
             "Caller claims to represent internal federal bureaus, ordering immediate payment via retail gift cards. Federal agencies mandate physical letters and never command instant phone fees.";
      isSuspicious = true;
      targetRisk = 89;
      targetDeepfake = 32;
    } else if (matchesStalk) {
      label = currentLanguage === "ta" ? "அச்சுறுத்தல் / துன்புறுத்தல் எச்சரிக்கை" :
              currentLanguage === "ml" ? "ശാരീരിക സുരക്ഷാ ഭീഷണി" :
              currentLanguage === "hi" ? "शारीरिक सुरक्षा या ब्लैकमेल का खतरा" :
              currentLanguage === "te" ? "శారీరక భద్రత లేదా వేధింపుల ముప్పు" :
              "Extremist Stalker / Harassment Threat";
      desc = currentLanguage === "ta" ? "உங்கள் தனிப்பட்ட பாதுகாப்புக்கு அச்சுறுத்தல் கண்டறியப்பட்டுள்ளது. அவசர போலீஸ் உதவியைப் பெற பரிந்துரைக்கிறோம்." :
             currentLanguage === "ml" ? "നിങ്ങളുടെ സുരക്ഷയ്ക്ക് ഭീഷണി കണ്ടെത്തിയിരിക്കുന്നു. അടിയന്തിര പോലീസ് സഹായം തേടാൻ നിർദ്ദേശിക്കുന്നു." :
             currentLanguage === "hi" ? "आपकी सुरक्षा को खतरा है। तुरंत पुलिस सहायता या आपातकालीन बटन का उपयोग करें।" :
             currentLanguage === "te" ? "మీ భద్రతకు ప్రమాదం పొంచి ఉంది. వెంటనే పోలీసుల సహాయం కోరాలని సూచిస్తున్నాము." :
             "Hostile threat targeting physical safety or online identity theft. Recommending activation of direct tactical rescue/police dispatches.";
      isSuspicious = true;
      targetRisk = 100;
      targetDeepfake = 42;
    }

    setTranscript(prev => [
      ...prev,
      { speaker: "caller", text: phraseText, isSuspicious }
    ]);

    if (isSuspicious) {
      setScamRisk(targetRisk);
      setDeepfakeScore(targetDeepfake);
      setCustomWarningLabel(label);
      setCustomWarningDesc(desc);
      setShowWarning(true);
    } else {
      // General non-threatening sentence
      setScamRisk(prev => Math.max(10, prev - 5));
      setDeepfakeScore(prev => Math.max(5, prev - 2));
    }
  };

  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInjectSpeech(customPhraseText);
    setCustomPhraseText("");
  };

  const currentRiskStatus = () => {
    if (scamRisk < 40) return { label: currentLanguage === "ta" ? "குறைவு" : currentLanguage === "ml" ? "കുറവ്" : currentLanguage === "hi" ? "कम" : currentLanguage === "te" ? "తక్కువ" : "LOW", color: "text-emerald-safe" };
    if (scamRisk < 75) return { label: currentLanguage === "ta" ? "நடுத்தரம்" : currentLanguage === "ml" ? "മധ്യം" : currentLanguage === "hi" ? "मध्यम" : currentLanguage === "te" ? "మధ్యమం" : "MEDIUM", color: "text-amber-500" };
    return { label: currentLanguage === "ta" ? "அதி அபாய எச்சரிக்கை" : currentLanguage === "ml" ? "അപകട നില" : currentLanguage === "hi" ? "उच्च खतरा" : currentLanguage === "te" ? "ఎక్కువ ప్రమాదం" : "HIGH THREAT", color: "text-crimson-error" };
  };

  const getDeepfakeAnalysis = () => {
    if (deepfakeScore < 30) return { label: currentLanguage === "ta" ? "உண்மை குரல்" : currentLanguage === "ml" ? "മനുഷ്യ ശബ്ദം" : currentLanguage === "hi" ? "मानव आवाज" : currentLanguage === "te" ? "మనుష్య గొంతు" : "Likely Human", color: "text-emerald-safe", icon: "verified_user" };
    if (deepfakeScore < 70) return { label: currentLanguage === "ta" ? "சந்தேகத்திற்குரிய குரல்" : currentLanguage === "ml" ? "സംശയാസ്പദ ശബ്ദം" : currentLanguage === "hi" ? "संदिग्ध आवाज" : currentLanguage === "te" ? "అనుమానాస్పద గొంతు" : "Suspicious Voice", color: "text-amber-500", icon: "gpp_maybe" };
    return { label: currentLanguage === "ta" ? "AI செயற்கை குரல்" : currentLanguage === "ml" ? "AI കൃത്രിമ ശബ്ദം" : currentLanguage === "hi" ? "एआई कृत्रिम आवाज" : currentLanguage === "te" ? "AI సృష్టించిన గొంతు" : "AI Synth Clone", color: "text-crimson-error", icon: "warning" };
  };


  const t = translations[currentLanguage];

  if (isAutoPilotActive) {
    const localWhispers: Record<LanguageCode, string> = {
      en: "This is a cloned voice, please hang up immediately!",
      ta: "இது போலியான குரல், உடனே போனை வையுங்கள்!",
      te: "ఇది నకిలీ వాయిస్, వెంటనే ఫోన్ పెట్టేయండి!",
      hi: "यह एक नकली आवाज है, तुरंत फोन काट दें!",
      ml: "ഇത് വ്യാജ ശബ്ദമാണ്, ദയവായി ഫോൺ ഉടൻ കട്ട് ചെയ്യുക!"
    };
    
    const whisperText = localWhispers[currentLanguage] || localWhispers.en;

    // Header class based on state
    let headerClass = "bg-white/40 border-white/50 text-slate-700";
    let headerText = "ELDERLY AUTO-PILOT SHIELD: MONITORING BACKGROUND AUDIO";
    if (simulationState === "AI_ANALYSIS") {
      headerClass = "bg-indigo-500/10 border-indigo-500/30 text-indigo-700 animate-pulse";
      headerText = "ELDERLY AUTO-PILOT SHIELD: ANALYZING AUDIO PATTERNS";
    } else if (simulationState === "INTERCEPT_ACTIVE") {
      headerClass = "animate-pulse-red border-red-500/30 text-red-800";
      headerText = "🚨 ELDERLY AUTO-PILOT SHIELD ACTIVE - Grandfather Link Connected";
    } else if (simulationState === "TERMINATED") {
      headerClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-800";
      headerText = "🔒 ELDERLY PROTECTION SECURED - CALL TERMINATED";
    }

    return (
      <div className="max-w-md mx-auto py-4 px-3.5 space-y-4 relative font-sans rounded-3xl bg-gradient-to-b from-indigo-100/40 via-purple-50/40 to-pink-100/40 border border-white/50 shadow-inner overflow-visible pb-8">
        
        {/* SVG Network Background Connections Mesh (Purple/Indigo Theme) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.22] pointer-events-none rounded-3xl" xmlns="http://www.w3.org/2000/svg">
          {/* Connection Lines */}
          <line x1="15%" y1="12%" x2="25%" y2="40%" stroke="#4f46d4" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="85%" y1="18%" x2="75%" y2="48%" stroke="#4f46d4" strokeWidth="1" />
          <line x1="25%" y1="40%" x2="75%" y2="48%" stroke="#4f46d4" strokeWidth="1" />
          <line x1="25%" y1="40%" x2="35%" y2="72%" stroke="#4f46d4" strokeWidth="1.5" />
          <line x1="75%" y1="48%" x2="80%" y2="85%" stroke="#ba1a1a" strokeWidth="1" />
          <line x1="35%" y1="72%" x2="80%" y2="85%" stroke="#4f46d4" strokeWidth="1.2" strokeDasharray="4,2" />

          {/* Interactive Nodes */}
          <circle cx="15%" cy="12%" r="5" fill="#818cf8" />
          <circle cx="15%" cy="12%" r="10" fill="none" stroke="#818cf8" strokeWidth="1" className="animate-pulse" />
          
          <circle cx="85%" cy="18%" r="6" fill="#4f46d4" />
          <circle cx="85%" cy="18%" r="12" fill="none" stroke="#4f46d4" strokeWidth="1.2" className="animate-pulse" />

          <circle cx="25%" cy="40%" r="5" fill="#818cf8" />
          
          <circle cx="75%" cy="48%" r="7" fill="#ba1a1a" />
          <circle cx="75%" cy="48%" r="14" fill="none" stroke="#ba1a1a" strokeWidth="1.5" className="animate-pulse" />

          <circle cx="35%" cy="72%" r="6" fill="#4f46d4" />
          <circle cx="35%" cy="72%" r="12" fill="none" stroke="#4f46d4" strokeWidth="1" className="animate-pulse" />

          <circle cx="80%" cy="85%" r="5" fill="#818cf8" />
        </svg>
        <style>{`
          @keyframes pulseRed {
            0%, 100% { background-color: rgba(225, 29, 72, 0.1); box-shadow: 0 0 8px rgba(225, 29, 72, 0.2); }
            50% { background-color: rgba(225, 29, 72, 0.2); box-shadow: 0 0 16px rgba(225, 29, 72, 0.4); }
          }
          .animate-pulse-red {
            animation: pulseRed 1.2s infinite;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.04);
          }
          .glass-inner-light {
            background: rgba(255, 255, 255, 0.35);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.5);
          }
          @keyframes danceBar {
            0%, 100% { transform: scaleY(0.15); }
            50% { transform: scaleY(1); }
          }
          .bar-anim {
            animation: danceBar 1s ease-in-out infinite;
            transform-origin: bottom;
          }
        `}</style>
        
        {/* Dynamic Header Block */}
        <div className={`rounded-2xl p-3.5 shadow-sm text-center backdrop-blur-md border transition-all duration-500 ${headerClass}`}>
          <p className="text-[10px] font-mono font-black tracking-widest uppercase flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-xs">shield</span>
            {headerText}
          </p>
        </div>

        {/* --- DEVICE 1: SENIOR PHONE MATRIX --- */}
        <div className="glass-card rounded-2xl p-4 space-y-3 relative overflow-hidden transition-all duration-300">
          <div className="flex justify-between items-center border-b border-white/40 pb-2">
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              DEVICE: SENIOR PHONE
            </span>
            <span className="bg-emerald-600/10 text-emerald-700 border border-emerald-600/20 text-[8px] font-mono px-2 py-0.5 rounded font-black tracking-wider animate-pulse">
              LIVE SECURE
            </span>
          </div>

          <div className="text-center pt-1">
            <p className="text-sm font-headline font-black text-navy-dark">
              {simulationState === "TERMINATED" ? (
                <span className="text-rose-600 font-extrabold">❌ CALL TERMINATED REMOTELY BY GUARDIAN</span>
              ) : (
                <span><span className="material-symbols-outlined text-[14px] align-middle mr-1 text-indigo-600" style={{ fontVariationSettings: "'FILL' 1" }}>elderly</span>Grandfather's Phone ➜ Connected • Unknown Caller (+91 9845X 23410)</span>
              )}
            </p>
          </div>

          {/* Neural Score Gauges */}
          <div className="grid grid-cols-2 gap-3.5 glass-inner-light p-3 rounded-xl transition-all duration-300">
            <div className="text-center space-y-1">
              <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase">BERT Extortion Parser</span>
              <div className="text-lg font-headline font-black text-rose-600 transition-all duration-500">
                {simulationState === "CALL_CONNECTED" ? "0%" : `${scamRisk}% Risk`}
              </div>
              <span className="text-[7.5px] font-mono text-slate-500 block">
                {simulationState !== "CALL_CONNECTED" ? "Flags: [arrested, send money]" : "Analyzing semantic tokens..."}
              </span>
            </div>
            
            <div className="text-center space-y-1">
              <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase">LCNN Spectrogram Clone</span>
              <div className="text-lg font-headline font-black text-rose-600 transition-all duration-500">
                {simulationState === "CALL_CONNECTED" ? "0%" : `${deepfakeScore}% Deepfake`}
              </div>
              <span className="text-[7.5px] font-mono text-slate-500 block">
                {simulationState !== "CALL_CONNECTED" ? "Match: Ramesh Clone" : "Analyzing spectrogram phase..."}
              </span>
            </div>
          </div>

          {/* AI Engine Status Badges */}
          <div className="flex flex-wrap gap-1.5 justify-center select-none pt-1">
            <span className={`text-[8.5px] font-mono font-bold px-2 py-0.5 rounded-full border backdrop-blur-xs transition-all duration-500 ${
              simulationState !== "CALL_CONNECTED" 
                ? "bg-indigo-500/10 text-indigo-800 border-white shadow-[0_0_8px_rgba(99,102,241,0.2)] opacity-100" 
                : "bg-white/20 text-slate-400 border-white/20 opacity-45"
            }`}>
              <span className="material-symbols-outlined text-[11px] align-middle mr-1 text-indigo-700">psychology</span>BERT Semantic Classifier Active
            </span>
            <span className={`text-[8.5px] font-mono font-bold px-2 py-0.5 rounded-full border backdrop-blur-xs transition-all duration-500 ${
              simulationState !== "CALL_CONNECTED" 
                ? "bg-violet-500/10 text-violet-800 border-white shadow-[0_0_8px_rgba(139,92,246,0.2)] opacity-100" 
                : "bg-white/20 text-slate-400 border-white/20 opacity-45"
            }`}>
              <span className="material-symbols-outlined text-[11px] align-middle mr-1 text-violet-700">graphic_eq</span>LCNN Spectrogram Classifier Active
            </span>
          </div>

          {/* Spectrogram Waveform Animation (Dark Purple Theme) */}
          {simulationState !== "TERMINATED" && (
            <div className="flex items-end justify-center gap-1.5 h-14 bg-violet-100/25 border border-white/50 rounded-xl p-2.5 relative select-none">
              <span className="text-[8px] font-mono text-indigo-950 absolute left-4 top-2 font-black uppercase tracking-wider">
                <span className="material-symbols-outlined text-[11px] align-middle mr-1 text-indigo-900">analytics</span>LCNN Spectrogram Phase Analysis:
              </span>
              <div className="flex items-end gap-1 h-7 pb-0.5">
                <div className="w-1 h-5 bg-violet-900 rounded bar-anim" style={{ animationDelay: '0.1s', animationDuration: '0.8s' }}></div>
                <div className="w-1 h-5 bg-indigo-900 rounded bar-anim" style={{ animationDelay: '0.3s', animationDuration: '1.2s' }}></div>
                <div className="w-1 h-5 bg-violet-950 rounded bar-anim" style={{ animationDelay: '0.5s', animationDuration: '0.9s' }}></div>
                <div className="w-1 h-5 bg-indigo-950 rounded bar-anim" style={{ animationDelay: '0.2s', animationDuration: '1.1s' }}></div>
                <div className="w-1 h-5 bg-violet-900 rounded bar-anim" style={{ animationDelay: '0.6s', animationDuration: '0.7s' }}></div>
                <div className="w-1 h-5 bg-indigo-900 rounded bar-anim" style={{ animationDelay: '0.4s', animationDuration: '1.3s' }}></div>
                <div className="w-1 h-5 bg-violet-950 rounded bar-anim" style={{ animationDelay: '0.1s', animationDuration: '1.0s' }}></div>
                <div className="w-1 h-5 bg-indigo-950 rounded bar-anim" style={{ animationDelay: '0.7s', animationDuration: '0.9s' }}></div>
                <div className="w-1 h-5 bg-violet-900 rounded bar-anim" style={{ animationDelay: '0.3s', animationDuration: '1.2s' }}></div>
                <div className="w-1 h-5 bg-indigo-900 rounded bar-anim" style={{ animationDelay: '0.5s', animationDuration: '0.8s' }}></div>
              </div>
            </div>
          )}

          {/* Audio Stream Terminal Typewriter */}
          <div className="bg-white/40 backdrop-blur-sm border border-white/50 text-navy-dark rounded-xl p-2.5 font-sans text-xs space-y-1.5 relative min-h-[72px] flex flex-col justify-start">
            <span className="text-[8px] font-mono text-slate-500 uppercase">Grandfather Phone Audio Stream:</span>
            {simulationState === "TERMINATED" ? (
              <p className="italic text-rose-600 font-extrabold text-center py-2 select-none animate-pulse">
                [ CONNECTION SILENCED • COVERT OVERRIDE ACTIVE ]
              </p>
            ) : (
              <p className="italic leading-relaxed text-navy-dark">
                {words.slice(0, typedWordsCount).map((word, i) => {
                  const isSpecial = word.includes("Ramesh") || word.includes("arrested") || word.includes("₹50,000") || word.includes("50,000");
                  return (
                    <span key={i} className={isSpecial ? "text-rose-600 font-extrabold underline" : "text-navy-dark"}>
                      {word}{" "}
                    </span>
                  );
                })}
              </p>
            )}
          </div>

          {/* Audio Override Engine (In-Ear Native Intercept) */}
          {(simulationState === "INTERCEPT_ACTIVE") && (
            <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 rounded-xl p-3.5 space-y-2 animate-fade-in backdrop-blur-xs">
              <div className="flex justify-between items-center text-[9px] font-mono font-black text-emerald-700 uppercase">
                <span>🔊 In-Ear Native Intercept Active</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="text-xs font-sans font-black leading-normal italic text-emerald-800">
                "{whisperText}"
              </p>
              <p className="text-[8px] font-mono text-emerald-600">
                Action: Automated AI translation whispering directly into senior's earpiece.
              </p>
            </div>
          )}
        </div>

        {/* --- HEARTRUST SYNC BRIDGE PANEL --- */}
        <div className="glass-card rounded-2xl p-3.5 space-y-2.5 font-mono text-[9px] text-indigo-950">
          <div className="flex justify-between items-center border-b border-white/50 pb-2">
            <span className="font-extrabold uppercase tracking-widest text-indigo-900">
              <span className="material-symbols-outlined text-[12px] align-middle mr-1.5 text-indigo-600" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>REAL-TIME SYNC BRIDGE
            </span>
            <span className="bg-indigo-500/10 text-indigo-700 border border-indigo-200/50 px-2 py-0.5 rounded font-black">
              LATENCY: 28ms
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[8px]">
            <div className="bg-white/30 p-2 rounded border border-white/40 space-y-1">
              <p className="font-black text-emerald-700"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 align-middle"></span>WEBSOCKETS (SOCKET.IO)</p>
              <p className="text-slate-600">Link: wss://engine.heartrust.org</p>
              <p className="text-slate-600">Status: Client Bridge Connected</p>
            </div>
            
            <div className="bg-white/30 p-2 rounded border border-white/40 space-y-1">
              <p className="font-black text-emerald-700"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 align-middle"></span>FIREBASE REALTIME DB</p>
              <p className="text-slate-600">Path: /calls/grandfather/state</p>
              <p className="text-slate-600">Listener: Reactive Mutation On</p>
            </div>
          </div>

          {/* Sync Packets Logger terminal */}
          <div className="bg-white/20 p-2 rounded-lg border border-white/40 space-y-1 max-h-[85px] overflow-y-auto leading-normal">
            <p className="text-indigo-800/80 border-b border-white/40 pb-1 font-bold text-[8px] uppercase">Live Protocol Data Events Log:</p>
            
            {/* Stage 1 logs */}
            {simulationState !== "IDLE" && (
              <div className="text-slate-700 select-text font-bold">
                [0.0s] [Firebase] State sync: <span className="text-amber-700 font-bold">callStatus="CALL_CONNECTED"</span>
              </div>
            )}
            
            {/* Stage 2 logs */}
            {(simulationState === "AI_ANALYSIS" || simulationState === "INTERCEPT_ACTIVE" || simulationState === "TERMINATED") && (
              <>
                <div className="text-indigo-800 select-text font-bold">
                  [1.5s] [Firebase] Data sync: <span className="text-rose-600 font-extrabold">deepfakeScore=99%</span>
                </div>
                <div className="text-indigo-800 select-text font-bold">
                  [1.5s] [Firebase] Data sync: <span className="text-rose-600 font-extrabold">scamRisk=95%</span>
                </div>
              </>
            )}

            {/* Stage 3 logs */}
            {(simulationState === "INTERCEPT_ACTIVE" || simulationState === "TERMINATED") && (
              <>
                <div className="text-emerald-700 select-text font-bold">
                  [3.0s] [WS] Broadcast: <span className="text-emerald-700 font-bold">native_earpiece_whisper</span> payload
                </div>
                <div className="text-pink-700 select-text font-bold">
                  [3.0s] [WS] Emit: <span className="text-pink-700 font-bold">handshake_alert</span> to Son Node (latency 12ms)
                </div>
                <div className="text-slate-600 select-text font-bold">
                  [3.0s] [Firebase] Set path: /calls/grandfather/transcript {"→"} sync
                </div>
              </>
            )}

            {/* Stage 4 / Terminated logs */}
            {simulationState === "TERMINATED" && (
              <>
                <div className="text-rose-600 select-text font-black animate-pulse">
                  [User Click] [WS] Emit: <span className="text-rose-600 font-bold animate-pulse">force_disconnect</span> {"→"} Father Node
                </div>
                <div className="text-emerald-700 select-text font-black">
                  [Terminated] [Firebase] Path update: <span className="text-emerald-700 font-bold">callStatus="TERMINATED"</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* --- DEVICE 2: REMOTE GUARDIAN/AUTHORITY MATRIX --- */}
        {guardianRoute === "AUTONOMOUS" ? (
          <div 
            className={`glass-card rounded-2xl p-4 space-y-3 relative overflow-hidden transition-all duration-500 border border-emerald-500/35 shadow-lg animate-fade-in`}
          >
            <div className="flex justify-between items-center border-b border-white/40 pb-2">
              <div>
                <p className="text-[9px] font-mono font-bold text-emerald-700 uppercase tracking-widest">Self-Healing Diagnostic Mode</p>
                <h4 className="text-xs font-headline font-black text-navy-dark mt-1">
                  <span className="material-symbols-outlined text-[14px] align-middle mr-1 text-emerald-600 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  Autonomous AI Self-Healing Shield
                </h4>
              </div>
              <div className="bg-emerald-600/15 text-emerald-700 border border-emerald-500/20 text-[8px] font-mono px-2 py-0.5 rounded font-black tracking-wider animate-pulse">
                SHIELD ACTIVE
              </div>
            </div>

            <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20 space-y-2 text-[10px] text-left">
              <p className="font-bold text-emerald-800 uppercase tracking-wide text-[8px] font-mono">🛡️ Self-Healing Execution Log:</p>
              <ul className="space-y-1.5 font-mono text-[9px] text-emerald-950 leading-normal">
                <li className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>[0.0s] Extortion threat ingestion starting</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>[1.5s] BERT flagged risk score 95% - Deepfake 99%</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${simulationState === "INTERCEPT_ACTIVE" || simulationState === "TERMINATED" ? "bg-emerald-500" : "bg-slate-300 animate-pulse"}`}></span>
                  <span className={simulationState === "INTERCEPT_ACTIVE" || simulationState === "TERMINATED" ? "font-bold text-emerald-800" : "text-slate-500"}>
                    [3.0s] Intercept: Challenger bot deployed & warning whispered
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${simulationState === "TERMINATED" ? "bg-emerald-500" : "bg-slate-300 animate-pulse"}`}></span>
                  <span className={simulationState === "TERMINATED" ? "font-bold text-emerald-800" : "text-slate-500"}>
                    [6.0s] Carrier drop: Line dropped locally. Scammer hung up
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${simulationState === "TERMINATED" ? "bg-emerald-500" : "bg-slate-300 animate-pulse"}`}></span>
                  <span className={simulationState === "TERMINATED" ? "font-bold text-emerald-800" : "text-slate-500"}>
                    [6.5s] Log generated: Fingerprint #FPR-9821 filed to Community Shield
                  </span>
                </li>
              </ul>
            </div>

            {simulationState !== "TERMINATED" ? (
              <div className="bg-amber-500/5 text-amber-800 border border-amber-500/25 rounded-xl p-3 text-[10px] space-y-1.5 text-center">
                <p className="font-bold">⏳ Running AI Intercept Challenge...</p>
                <p className="text-[9px] text-amber-700 italic">"This line is protected by HearTrust AI. Please state your relationship PIN..."</p>
              </div>
            ) : (
              <button
                onClick={() => {
                  onEndCall(95, 99, [
                    { speaker: "system", text: "🚨 AUTONOMOUS LOCKDOWN EXECUTED BY SELF-HEALING ENGINE." },
                    { speaker: "system", text: "🔒 Local Carrier line dropped. Precinct reports generated." }
                  ], true);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-headline font-black text-sm py-2.5 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 border border-emerald-500 animate-pulse"
              >
                <span className="material-symbols-outlined text-base">verified</span>
                Close & Run Community Immunization
              </button>
            )}

            <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-600 bg-white/35 backdrop-blur-xs p-2 rounded border border-white/50">
              <span className="flex items-center gap-1">
                {simulationState === "TERMINATED" ? (
                  <span className="text-emerald-700 font-black">✅ Carrier Line Drop Executed</span>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    AI Intercept Monitor Active
                  </>
                )}
              </span>
              <span>Self-Healing Engine Active</span>
            </div>
          </div>
        ) : (
          <div 
            className={`glass-card rounded-2xl p-4 space-y-3 relative overflow-hidden transition-all duration-500 ${
              simulationState === "INTERCEPT_ACTIVE" || simulationState === "TERMINATED"
                ? "border-red-500/40 opacity-100 filter-none"
                : "border-white/20 opacity-50 pointer-events-none filter grayscale select-none"
            }`}
          >
            {/* Adaptive layout definitions */}
            {(() => {
              let guardianTitle = "Son's Control Panel";
              let guardianDeviceLabel = "Device: Guardian Phone Link";
              let nodeAuthorityText = "Target: Grandfather Device | Cloned Speaker: Ramesh (Son)";
              let forceDisconnectText = "[📞 Force Disconnect Call]";
              let bridgeLabel = "Guardian Bridge Connected";
              let iconName = "supervised_user_circle";

              if (guardianRoute === "PRECINCT") {
                guardianTitle = "Precinct Security Dashboard";
                guardianDeviceLabel = "👮 Precinct Route Command Hub (Link 112)";
                nodeAuthorityText = "Target: Grandfather Device | Node Authority: Bangalore Central Precinct";
                forceDisconnectText = "[👮 Precinct Override Drop Call]";
                bridgeLabel = "Precinct Bridge Connected";
                iconName = "local_police";
              } else if (guardianRoute === "WARDEN") {
                guardianTitle = "Warden Security Console";
                guardianDeviceLabel = "🏘️ Neighborhood Safety Warden HUD";
                nodeAuthorityText = "Target: Grandfather Device | Node Authority: Block C Security Desk";
                forceDisconnectText = "[🏘️ Warden Override Drop Call]";
                bridgeLabel = "Warden Bridge Connected";
                iconName = "home_work";
              }

              return (
                <>
                  <div className="flex justify-between items-start relative z-10 border-b border-white/40 pb-2">
                    <div>
                      <p className="text-[9px] font-mono font-bold text-indigo-700 uppercase tracking-widest">{guardianDeviceLabel}</p>
                      <h4 className="text-xs font-headline font-black text-navy-dark mt-1">
                        <span className="material-symbols-outlined text-[14px] align-middle mr-1 text-indigo-600" style={{ fontVariationSettings: "'FILL' 1" }}>{iconName}</span>
                        {guardianTitle}
                      </h4>
                    </div>
                    
                    {(simulationState === "INTERCEPT_ACTIVE" || simulationState === "TERMINATED") && (
                      <div className="bg-red-600/10 text-red-700 border border-red-500/20 text-[8px] font-mono px-2 py-0.5 rounded font-black tracking-wider animate-pulse">
                        CRISIS INTERCEPT ACTION REQUIRED
                      </div>
                    )}
                  </div>

                  {/* Transmitted Transcript Stream */}
                  <div className="bg-white/35 backdrop-blur-xs p-2.5 rounded-xl border border-white/50 space-y-2 relative z-10 min-h-[72px]">
                    <p className="text-[8px] font-mono text-indigo-800 uppercase tracking-wide">Live Transmitted Transcript (500ms Delay):</p>
                    {simulationState === "TERMINATED" ? (
                      <p className="italic text-rose-600 font-black text-center py-2 animate-pulse text-xs">
                        ❌ CALL TERMINATED REMOTELY BY GUARDIAN
                      </p>
                    ) : (
                      <p className="text-xs italic text-navy-dark leading-relaxed font-sans">
                        {words.slice(0, Math.max(0, typedWordsCount - 2)).map((word, i) => {
                          const isSpecial = word.includes("Ramesh") || word.includes("arrested") || word.includes("₹50,000") || word.includes("50,000");
                          return (
                            <span key={i} className={isSpecial ? "text-rose-600 font-extrabold underline" : "text-navy-dark"}>
                              {word}{" "}
                            </span>
                          );
                        })}
                      </p>
                    )}
                    <div className="mt-1.5 pt-1.5 border-t border-white/40 flex justify-between text-[8px] font-mono text-slate-500">
                      <span>{nodeAuthorityText.split(" | ")[0]}</span>
                      <span>{nodeAuthorityText.split(" | ")[1]}</span>
                    </div>
                  </div>

                  {/* Force Disconnect Button */}
                  <div className="space-y-3 relative z-10 pt-1">
                    {simulationState !== "TERMINATED" ? (
                      <button
                        onClick={handleForceDisconnectClick}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-headline font-black text-sm py-2.5 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 border border-red-500"
                      >
                        <span className="material-symbols-outlined text-base">phone_disabled</span>
                        {forceDisconnectText}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onEndCall(95, 99, [
                            { speaker: "system", text: `🚨 REMOTE FORCE DISCONNECT SIGNAL SENT FROM ${guardianTitle.toUpperCase()}.` },
                            { speaker: "system", text: "🔒 Call Terminated safely." }
                          ], true);
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-headline font-black text-sm py-2.5 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 border border-emerald-500 animate-pulse"
                      >
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        Close & Run P2P Intercept
                      </button>
                    )}

                    {/* Bottom Channels */}
                    <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-600 bg-white/35 backdrop-blur-xs p-2 rounded border border-white/50">
                      <span className="flex items-center gap-1">
                        {simulationState === "TERMINATED" ? (
                          <span className="text-emerald-700 font-black">✅ {bridgeLabel}</span>
                        ) : (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            {bridgeLabel}
                          </>
                        )}
                      </span>
                      <span>
                        {simulationState === "TERMINATED" ? (
                          <span className="text-emerald-700 font-black">✅ P2P Channel Active</span>
                        ) : (
                          "P2P Channel Active"
                        )}
                      </span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto py-4 space-y-6">
      
      {/* Script Selector Box */}
      <div className="bg-white rounded-xl p-4 border border-container-high shadow-xs">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">
          {t.activeCallScenarioLabel}
        </label>
        <div className="flex gap-2">
          {PRESET_SCRIPTS.map(s => {
            const scriptIcon = s.id === "bank-impostor" ? "account_balance" : s.id === "grandkid-voice-clone" ? "record_voice_over" : "gavel";
            return (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`flex-1 text-xs py-2.5 px-2 rounded-lg font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  selectedScriptId === s.id
                    ? "bg-primary-indigo text-white border-primary-indigo shadow-xs"
                    : "bg-surface text-text-primary border-container-high hover:bg-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-sm">{scriptIcon}</span>
                {s.id === "bank-impostor" ? t.activeCallScenario1 : s.id === "grandkid-voice-clone" ? t.activeCallScenario2 : t.activeCallScenario3}
              </button>
            );
          })}
        </div>
      </div>


      {/* Unknown Caller Header */}
      <div className="flex flex-col items-center text-center py-2">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-container-medium shadow-md">
            <img 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              src={currentScript.avatarUrl} 
              alt={currentScript.name} 
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 ${callMedium === "whatsapp" ? "bg-emerald-500" : callMedium === "sms" ? "bg-amber-500" : "bg-primary-indigo"} text-white p-2 rounded-full shadow-md animate-pulse`}>
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {callMedium === "whatsapp" ? "call" : callMedium === "sms" ? "sms" : "call"}
            </span>
          </div>
        </div>
        
        <h2 className="font-headline text-2xl font-extrabold text-navy-dark">
          {customCallerName || currentScript.name}
        </h2>
        <p className="font-mono text-xs text-text-secondary font-medium mt-1">
          {customCallerNum || currentScript.number} • {currentScript.location}
        </p>

        <span className={`inline-flex items-center gap-1 px-3 py-1 mt-2 text-[10px] font-black uppercase font-mono text-white rounded-full ${
          callMedium === "whatsapp" ? "bg-emerald-500" : callMedium === "sms" ? "bg-amber-500" : "bg-primary-indigo"
        } shadow-xs`}>
          <span className="material-symbols-outlined text-[12px] font-bold">
            {callMedium === "whatsapp" ? "call" : callMedium === "sms" ? "sms" : "call"}
          </span>
          {callMedium === "whatsapp" ? t.reportMediumWhatsapp : callMedium === "sms" ? t.reportMediumSms : callMedium === "other" ? t.reportMediumOther : t.reportMediumVoice}
        </span>
      </div>


      {/* AI Analyzing Status Bar */}
      <div className="bg-container-low rounded-xl p-4 border border-container-high flex items-center justify-between overflow-hidden relative shadow-xs">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-indigo to-transparent animate-scan"></div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1 h-6 items-center">
            <div className="w-1 bg-primary-indigo rounded-full animate-wave" style={{ animationDelay: "0s" }}></div>
            <div className="w-1 bg-primary-indigo rounded-full animate-wave" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-1 bg-primary-indigo rounded-full animate-wave" style={{ animationDelay: "0.4s" }}></div>
            <div className="w-1 bg-primary-indigo rounded-full animate-wave" style={{ animationDelay: "0.1s" }}></div>
          </div>
          <span className="font-headline text-sm text-primary-indigo font-extrabold uppercase tracking-widest">
            {t.activeCallAnalyzing}
          </span>
        </div>
        
        <div className="bg-primary-indigo/10 px-3 py-1 rounded-full border border-primary-indigo/20">
          <span className="font-sans text-xs font-semibold text-primary-indigo">
            {t.activeCallListening}
          </span>
        </div>
      </div>

      {/* 🎙️ PROTOTYPE MIC CALL SCAN CARD FOR LIVE JUDGES DEMONSTRATION */}
      <div className="bg-gradient-to-br from-white to-container-low p-5 rounded-2xl border-2 border-primary-indigo shadow-md space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline text-[15px] font-extrabold text-navy-dark flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 text-[10px] font-sans font-bold bg-primary-indigo text-white rounded-md uppercase tracking-wider">
                {t.activeCallLiveDemo}
              </span>
              Linguistic Mic Interceptor
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              {t.activeCallMicDesc}
            </p>
          </div>
          <span className="material-symbols-outlined text-primary-indigo text-2xl font-black animate-pulse">
            sensors
          </span>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center justify-between bg-white text-xs p-3 rounded-xl border border-container-high">
          <div className="flex items-center gap-2 select-none">
            <span className={`material-symbols-outlined text-[15px] ${(isMicActive || isInjectingSpeechMicActive) ? "text-red-500 animate-pulse" : "text-text-muted"}`}>
              {(isMicActive || isInjectingSpeechMicActive) ? "mic" : "mic_off"}
            </span>
            <span className={`font-mono font-bold ${(isMicActive || isInjectingSpeechMicActive) ? "text-red-500 animate-pulse" : "text-text-muted"}`}>
              {(isMicActive || isInjectingSpeechMicActive) ? (isInjectingSpeechMicActive ? "INGESTING INJECTED AUDIO..." : t.activeCallMicActive) : t.activeCallMicInactive}
            </span>
          </div>
          <button
            onClick={toggleMicAnalysis}
            className={`px-4 py-2 rounded-lg font-headline font-semibold text-xs transition-transform active:scale-95 text-white ${
              isMicActive 
                ? "bg-crimson-error hover:bg-crimson-error/90" 
                : "bg-primary-indigo hover:bg-primary-indigo/95 shadow-sm"
            }`}
          >
            {isMicActive ? t.activeCallMicTurnOff : t.activeCallMicTurnOn}
          </button>
        </div>

        {speechError && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 font-mono flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">error</span>
            {speechError}
          </div>
        )}

        {/* Spoken script guides with click-to-copy/suggest */}
        <div className="bg-white/80 rounded-xl p-3 border border-container-high/60 space-y-2 text-[11px]">
          <p className="font-bold text-navy-dark uppercase tracking-wider text-center flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary-indigo font-bold">record_voice_over</span>
            {t.activeCallWhatToSay}
          </p>
          
          <div className="space-y-2 font-sans text-xs">
            <div className="p-2 bg-container-low rounded-lg border-l-4 border-red-500">
              <span className="font-bold text-red-600 block text-[10px] uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">warning</span>
                BANK SCAM TRACE WORD:
              </span>
              <p className="italic text-navy-dark">"{t.activeCallThreatBank}"</p>
            </div>
            
            <div className="p-2 bg-container-low rounded-lg border-l-4 border-amber-500">
              <span className="font-bold text-amber-600 block text-[10px] uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">record_voice_over</span>
                AUDITORY CLONE CLASSIFIER:
              </span>
              <p className="italic text-navy-dark">"{t.activeCallThreatClone}"</p>
            </div>
            
            <div className="p-2 bg-container-low rounded-lg border-l-4 border-primary-indigo">
              <span className="font-bold text-primary-indigo block text-[10px] uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">gavel</span>
                GOVERNMENT AUTHORITY EXTRUSION:
              </span>
              <p className="italic text-navy-dark">"{t.activeCallThreatGov}"</p>
            </div>
 
            <div className="p-2 bg-container-low rounded-lg border-l-4 border-emerald-safe">
              <span className="font-bold text-emerald-safe block text-[10px] uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-emerald-safe">forum</span>
                NORMAL CALL CHATTER:
              </span>
              <p className="italic text-navy-dark">"{t.activeCallNormalChat}"</p>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-text-muted italic text-center text-rose-600/90 font-bold flex items-center justify-center gap-1 select-none">
          <span className="material-symbols-outlined text-[13px] text-rose-500 font-bold">security</span>
          {t.activeCallSandboxNotice}
        </p>

      </div>

      {/* Threat Metrics grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Scam Risk Gauge */}
        <div className="bg-white rounded-xl p-4 border border-container-high shadow-xs flex flex-col justify-between h-32">
          <div>
            <h3 className="text-xs font-bold text-text-secondary tracking-wider uppercase mb-2">
              {t.activeCallRiskGauge}
            </h3>
            <div className="relative w-full h-2 bg-container-medium rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-safe via-amber-400 to-crimson-error rounded-full transition-all duration-500"
                style={{ width: `${scamRisk}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <span className={`font-headline text-xl font-black ${currentRiskStatus().color}`}>
              {currentRiskStatus().label}
            </span>
            <span className="font-mono text-sm text-text-secondary font-bold">
              {scamRisk}%
            </span>
          </div>
        </div>

        {/* Deepfake Score */}
        <div className="bg-white rounded-xl p-4 border border-container-high shadow-xs flex flex-col justify-between h-32">
          <div>
            <h3 className="text-xs font-bold text-text-secondary tracking-wider uppercase mb-2">
              {t.activeCallDeepfakeAudit}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className={`material-symbols-outlined text-[18px] font-bold ${getDeepfakeAnalysis().color}`}>
                {getDeepfakeAnalysis().icon}
              </span>
              <span className={`font-headline text-xs font-bold ${getDeepfakeAnalysis().color}`}>
                {getDeepfakeAnalysis().label}
              </span>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <span className="font-headline text-3xl font-black text-navy-dark">
              {deepfakeScore}
            </span>
            <span className="font-mono text-xs text-text-secondary font-bold">
              / 100
            </span>
          </div>
        </div>
      </div>

      {/* Live Transcription Box */}
      <div className="bg-white rounded-xl border border-container-high shadow-sm overflow-hidden flex flex-col h-64">
        <div className="px-4 py-3 border-b border-container-high bg-container-low flex justify-between items-center">
          <h3 className="font-headline text-xs font-extrabold text-navy-dark uppercase tracking-wider">
            {t.activeCallTranscriptTitle}
          </h3>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-crimson-error animate-pulse"></span>
            <span className="text-[10px] font-bold text-crimson-error uppercase font-mono">{t.activeCallRecording}</span>
          </div>
        </div>


        {/* Transcript snippets list */}
        <div className="p-4 space-y-3.5 overflow-y-auto flex-1 font-sans text-sm">
          {transcript.map((line, idx) => {
            if (line.speaker === "system") {
              return (
                <div key={idx} className="text-center">
                  <span className="inline-block bg-container-medium/75 text-navy-dark/80 text-[10px] font-bold px-2.5 py-1 rounded-md font-mono border border-container-high">
                    {line.text}
                  </span>
                </div>
              );
            }

            const isCaller = line.speaker === "caller";
            return (
              <div 
                key={idx} 
                className={`pl-3 border-l-4 transition-all duration-300 ${
                  line.isSuspicious 
                    ? "border-crimson-error bg-crimson-error/5 py-1.5 rounded-r-lg" 
                    : isCaller 
                      ? "border-amber-400" 
                      : "border-primary-indigo"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${line.isSuspicious ? 'text-crimson-error' : isCaller ? 'text-amber-500' : 'text-primary-indigo'}`}>
                    {isCaller ? line.isSuspicious ? "Caller • Suspicious phrase match" : "Caller" : "You (Me)"}
                  </span>
                  {line.isSuspicious && (
                    <span className="material-symbols-outlined text-xs text-crimson-error animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                      warning
                    </span>
                  )}
                </div>
                <p className={`italic ${line.isSuspicious ? 'text-crimson-error font-medium' : isCaller ? 'text-navy-dark' : 'text-text-secondary'}`}>
                  "{line.text}"
                </p>
              </div>
            );
          })}
          <div ref={transcriptEndRef} />
        </div>

        {/* Mini Simulator controls inside transcript box */}
        <div className="bg-container-low p-2 border-t border-container-high flex gap-2 justify-between">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentLineIndex >= currentScript.lines.length}
            className={`flex-1 text-xs py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-2.5 transition-all ${
              currentLineIndex >= currentScript.lines.length
                ? "bg-container-high text-text-muted"
                : isPlaying
                  ? "bg-amber-400 text-navy-dark"
                  : "bg-emerald-safe text-white shadow-xs"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
            {isPlaying ? "Pause" : "Auto Play Script"}
          </button>

          <button
            onClick={triggerNextLine}
            disabled={currentLineIndex >= currentScript.lines.length || isPlaying}
            className="bg-primary-indigo text-white text-xs font-bold py-2 px-3 rounded-lg hover:bg-primary-indigo/90 disabled:opacity-50 transition-all flex items-center gap-1"
          >
            Next Line 
            <span className="material-symbols-outlined text-[16px]">skip_next</span>
          </button>
        </div>
      </div>

      {/* JUDGES INTERACTIVE VOICE INJECTOR & PARSING PANEL */}
      <div className="bg-white rounded-xl border border-container-high p-5 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-container-low pb-2">
          <div>
            <h3 className="font-headline text-sm font-extrabold text-navy-dark flex items-center gap-2">
              {t.activeCallInjectTitle}
              {isInjectingSpeechMicActive && (
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 animate-pulse select-none">
                  <span className="material-symbols-outlined text-[12px] animate-ping" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                  MIC ON
                </span>
              )}
            </h3>
            <p className="text-[11px] text-text-secondary mt-0.5">
              {t.activeCallInjectDesc}
            </p>
          </div>
          <span className="material-symbols-outlined text-emerald-safe text-lg font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
            settings_voice
          </span>
        </div>

        {/* Quick Click Threat Buttons */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-amber-500 font-bold">bolt</span>
            {t.activeCallInjectLabelQuick}
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleInjectSpeech(t.activeCallThreatBank)}
              className="text-[10px] py-1.5 px-2.5 rounded-lg bg-container-low border border-container-high hover:bg-red-400/10 hover:text-red-700 font-bold flex items-center gap-1.5 text-navy-dark transition-all select-none"
            >
              <span className="material-symbols-outlined text-[14px]">account_balance</span>
              {t.activeCallScenario1}
            </button>
            <button
              onClick={() => handleInjectSpeech(t.activeCallThreatClone)}
              className="text-[10px] py-1.5 px-2.5 rounded-lg bg-container-low border border-container-high hover:bg-red-400/10 hover:text-red-700 font-bold flex items-center gap-1.5 text-navy-dark transition-all select-none"
            >
              <span className="material-symbols-outlined text-[14px]">record_voice_over</span>
              {t.activeCallScenario2}
            </button>
            <button
              onClick={() => handleInjectSpeech(t.activeCallThreatGov)}
              className="text-[10px] py-1.5 px-2.5 rounded-lg bg-container-low border border-container-high hover:bg-red-400/10 hover:text-red-700 font-bold flex items-center gap-1.5 text-navy-dark transition-all select-none"
            >
              <span className="material-symbols-outlined text-[14px]">gavel</span>
              {t.activeCallScenario3}
            </button>
            <button
              onClick={() => handleInjectSpeech(currentLanguage === "ta" ? "நாங்கள் உங்கள் வீட்டை வெளியே இருந்து கண்காணித்து வருகிறோம். புகைப்படங்களை வெளியிடுவோம்." :
                                               currentLanguage === "ml" ? "ഞങ്ങൾ നിങ്ങളുടെ വീട് നിരീക്ഷിക്കുന്നു. ഫോട്ടോകൾ ലീക്ക് ചെയ്യും." :
                                               currentLanguage === "hi" ? "हम बाहर से आपके घर पर नज़र रख रहे हैं। हम फोटो लीक कर देंगे।" :
                                               currentLanguage === "te" ? "మేము మీ ఇంటిని బయట నుండి గమనిస్తున్నాము. ఫోటోలు లీక్ చేస్తాము." :
                                               "We are watching your house from outside. Do not try to run or notify police, or we leak the photos.")}
              className="text-[10px] py-1.5 px-2.5 rounded-lg bg-container-low border border-container-high hover:bg-red-400/10 hover:text-red-700 font-bold flex items-center gap-1.5 text-navy-dark transition-all select-none"
            >
              <span className="material-symbols-outlined text-[14px]">warning</span>
              {currentLanguage === "ta" ? "துன்புறுத்தல்" : currentLanguage === "ml" ? "വേട്ടയാടൽ" : currentLanguage === "hi" ? "उत्पीड़न" : currentLanguage === "te" ? "వేధింపు" : "Harassment"}
            </button>
            <button
              onClick={() => handleInjectSpeech(t.activeCallNormalChat)}
              className="text-[10px] py-1.5 px-2.5 rounded-lg bg-container-low border border-container-high hover:bg-emerald-500/10 hover:text-emerald-700 font-bold flex items-center gap-1.5 text-navy-dark transition-all select-none"
            >
              <span className="material-symbols-outlined text-[14px] text-emerald-500 font-bold">forum</span>
              {currentLanguage === "ta" ? "சாதாரண உரையாடல்" : currentLanguage === "ml" ? "സാധാരണ സംഭാഷണം" : currentLanguage === "hi" ? "सामान्य बातचीत" : currentLanguage === "te" ? "సాధారణ సంభాషణ" : "Normal Conversation"}
            </button>
          </div>
        </div>

        {/* Typing Input */}
        <form onSubmit={handleCustomFormSubmit} className="space-y-2 pt-1 border-t border-container-low/40">
          <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-primary-indigo font-bold">keyboard</span>
            {t.activeCallInjectLabelType}
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t.activeCallInjectPlaceholder}
              value={customPhraseText}
              onChange={(e) => setCustomPhraseText(e.target.value)}
              className="flex-1 bg-container-low border border-container-high rounded-xl text-xs px-3 py-2.5 text-navy-dark outline-hidden focus:border-primary-indigo"
            />
            <button
              type="submit"
              className="bg-primary-indigo text-white font-headline text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary-indigo/90 active:scale-95 transition-all text-center"
            >
              {t.activeCallInjectBtn}
            </button>
          </div>
          <p className="text-[9px] text-text-muted italic">
            {t.activeCallInjectNote}
          </p>
        </form>
      </div>

      {/* Threat Alert Banner (Conditional) */}
      {showWarning && (
        <div className="bg-crimson-error/10 text-crimson-error p-4 rounded-xl flex gap-3.5 items-start border border-crimson-error/20 animate-fade-in">
          <span className="material-symbols-outlined text-crimson-error font-extrabold fill-current animate-bounce shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <div>
            <p className="font-headline text-sm font-extrabold text-crimson-error">
              {customWarningLabel || currentScript.warningLabel || "PII Request Security Alert"}
            </p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              {customWarningDesc || currentScript.warningDescription || "The caller is asking for verification credentials. Decline or click trigger emergency to activate safeguarding."}
            </p>
            <button 
              onClick={onTriggerEmergencyMode}
              className="mt-3 bg-crimson-error text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-sm hover:bg-crimson-error/90 active:scale-95 transition-all flex items-center gap-1"
            >
              {currentLanguage === "ta" ? "அவசரகால பாதுகாப்பைத் தொடங்கு" :
               currentLanguage === "ml" ? "അടിയന്തിര സുരക്ഷ ആരംഭിക്കുക" :
               currentLanguage === "hi" ? "आपातकालीन सुरक्षा शुरू करें" :
               currentLanguage === "te" ? "అత్యవసర రక్షణ ప్రారంభించు" :
               "Trigger Emergency Protocol"}
              <span className="material-symbols-outlined text-xs">local_police</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Call Action Controls Bar */}
      <div className="bg-white border border-container-high rounded-2xl p-4 flex justify-around items-center shadow-md">
        {/* Mute Button */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="flex flex-col items-center gap-1 select-none active:scale-95 transition-transform group"
        >
          <div className={`w-12 h-12 rounded-full border border-container-high flex items-center justify-center transition-colors ${isMuted ? 'bg-crimson-error text-white border-crimson-error' : 'bg-container-low text-navy-dark group-hover:bg-container-medium'}`}>
            <span className="material-symbols-outlined text-xl">
              {isMuted ? "mic_off" : "mic"}
            </span>
          </div>
          <span className="text-[11px] font-bold text-text-secondary">
            {isMuted ? t.activeCallMuted : t.activeCallMute}
          </span>
        </button>

        {/* End Call Button (Primary) */}
        <button 
          onClick={() => onEndCall(scamRisk, deepfakeScore, transcript)}
          className="flex flex-col items-center gap-1 select-none group"
        >
          <div className="w-16 h-16 rounded-full bg-crimson-error flex items-center justify-center shadow-lg hover:bg-crimson-error/90 active:scale-90 transition-all">
            <span className="material-symbols-outlined text-white text-[32px] rotate-[135deg]" style={{ fontVariationSettings: "'FILL' 1" }}>
              call_end
            </span>
          </div>
          <span className="text-xs font-bold text-crimson-error mt-1 uppercase tracking-wider font-headline">
            {t.activeCallEnd}
          </span>
        </button>

        {/* Record Evidence Button */}
        <button 
          onClick={() => setIsRecording(!isRecording)}
          className="flex flex-col items-center gap-1 select-none active:scale-95 transition-transform group"
        >
          <div className={`w-12 h-12 rounded-full border border-container-high flex items-center justify-center transition-colors ${isRecording ? 'bg-amber-400 text-navy-dark border-amber-400 animate-pulse' : 'bg-container-low text-navy-dark group-hover:bg-container-medium'}`}>
            <span className="material-symbols-outlined text-xl">
              {isRecording ? "fiber_manual_record" : "radio_button_checked"}
            </span>
          </div>
          <span className="text-[11px] font-bold text-text-secondary">
            {isRecording ? t.activeCallRecordingActive : t.activeCallRecord}
          </span>
        </button>
      </div>

    </div>
  );
}

