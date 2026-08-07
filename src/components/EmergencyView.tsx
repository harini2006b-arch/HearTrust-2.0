import React, { useState, useEffect } from "react";
import { LanguageCode } from "../translations";

interface EmergencyViewProps {
  onCancelEmergency: () => void;
  currentLanguage: LanguageCode;
  currentUser?: {
    name: string;
    policeStation: string;
    stationCoords?: string;
  } | null;
}

const emergencyTranslations: Record<LanguageCode, Record<string, string>> = {
  en: {
    threatDetected: "THREAT DETECTED",
    threatDesc: "Active hostility or intimidation detected via neural-voice analysis. Protocol 7-Beta actively engaged on your terminal.",
    activeMeasures: "Active Protective Measures",
    recordingEvidence: "RECORDING EVIDENCE",
    encryptedCloudSync: "Encrypted Cloud Sync Live",
    geolocating: "GEO-LOCATING",
    precinctNotified: "Precinct Notified",
    neuralScanning: "NEURAL ANALYSIS ENGINE VERIFYING",
    directConnect: "Direct Connect to Police",
    dispatchConnecting: "DISPATCH CONNECTING NOW...",
    initiatingLink: "Initiating secure link in",
    seconds: "seconds...",
    lineVerified: "LINE VERIFIED SECURE",
    tapToConnect: "TAP TO CONNECT INSTANTLY",
    womensSafetyTitle: "Women's Safety Mode",
    womensSafetyDesc: "Prioritizes instant telemetry routing to specialized enforcement officers trained in cyber-intimidation response.",
    protocolStatus: "PROTOCOL TARGET STATUS",
    enhancedDispatch: "ENHANCED DISPATCH",
    standardDispatch: "STANDARD DISPATCH",
    silentRecording: "Silent Recording",
    dimmedRecording: "Screen dimmed. Recording actively...",
    dimScreenRecord: "Dim screen, record local audio",
    broadcastLocation: "Broadcast Location",
    activeBroadcast: "Active broadcast to standard contacts",
    broadcastGPS: "Broadcast GPS telemetry",
    panicAlarm: "PANIC ALARM PROTOCOL",
    deterrentStrobe: "Immediate 110dB Audio deterrent strobe",
    strobeTriggered: "🚨 INTENSE DETERRENT STROBE TRIGGERED! TRANSMITTING 110dB SIGNAL.",
    deactivateEmergency: "De-activate Emergency Mode"
  },
  ta: {
    threatDetected: "அச்சுறுத்தல் கண்டறியப்பட்டது",
    threatDesc: "குரல் பகுப்பாய்வு மூலம் செயலில் உள்ள மிரட்டல் கண்டறியப்பட்டுள்ளது. பாதுகாப்பு நெறிமுறை 7-பீட்டா செயல்படுகிறது.",
    activeMeasures: "செயலில் உள்ள பாதுகாப்பு நடவடிக்கைகள்",
    recordingEvidence: "சான்று பதிவு செய்யப்படுகிறது",
    encryptedCloudSync: "பாதுகாப்பான கிளவுட் ஒத்திசைவு நேரடி",
    geolocating: "இருப்பிடத் தேடல்",
    precinctNotified: "காவல் நிலையத்திற்கு அறிவிக்கப்பட்டது",
    neuralScanning: "குரல் பகுப்பாய்வு இயந்திரம் சரிபார்க்கிறது",
    directConnect: "போலீஸ் உடன் நேரடி தொடர்பு",
    dispatchConnecting: "அவசரத் தொடர்பு இணைக்கப்படுகிறது...",
    initiatingLink: "இணைப்பு துவங்குகிறது இன்னும்",
    seconds: "வினாடிகளில்...",
    lineVerified: "தொடர்பு பாதுகாப்பானது",
    tapToConnect: "இப்போதே இணைக்க தட்டவும்",
    womensSafetyTitle: "பெண்கள் பாதுகாப்பு முறை",
    womensSafetyDesc: "சைபர் மிரட்டல் தடுப்பில் பயிற்சி பெற்ற சிறப்பு அதிகாரிகளுக்கு நேரடித் தகவலை அனுப்புகிறது.",
    protocolStatus: "நெறிமுறை இலக்கு நிலை",
    enhancedDispatch: "மேம்படுத்தப்பட்ட உதவி",
    standardDispatch: "சாதாரண உதவி",
    silentRecording: "சத்தமில்லா பதிவு",
    dimmedRecording: "திரை அணைக்கப்பட்டது. பதிவு செய்யப்படுகிறது...",
    dimScreenRecord: "திரையை அணைத்து, உள்ளூர் ஆடியோவைப் பதிவுசெய்",
    broadcastLocation: "இருப்பிடத்தைப் பரப்பு",
    activeBroadcast: "தொடர்புகளுக்கு நேரடி இருப்பிடம் அனுப்பப்படுகிறது",
    broadcastGPS: "ஜிபிஎஸ் டெலிமெட்ரியை ஒளிபரப்பு",
    panicAlarm: "அவசரகால அலாரம் நெறிமுறை",
    deterrentStrobe: "உடனடி 110dB ஒலியுடன் கூடிய எச்சரிக்கை",
    strobeTriggered: "🚨 எச்சரிக்கை அலாரம் இயக்கப்பட்டது! 110dB சிக்னல் பரப்பப்படுகிறது.",
    deactivateEmergency: "அவசரகால முறையை ரத்து செய்க"
  },
  ml: {
    threatDetected: "ഭീഷണി കണ്ടെത്തപ്പെട്ടു",
    threatDesc: "വോയ്സ് വിശകലനത്തിലൂടെ ഭീഷണി കണ്ടെത്തപ്പെട്ടു. സുരക്ഷാ പ്രോട്ടോക്കോൾ 7-ബീറ്റാ സജീവമാക്കിയിരിക്കുന്നു.",
    activeMeasures: "അടിയന്തിര സുരക്ഷാ നടപടികൾ",
    recordingEvidence: "തെളിവ് റെക്കോർഡിംഗ്",
    encryptedCloudSync: "എൻക്രിപ്റ്റഡ് ക്ലൗഡ് സമന്വയം തത്സമയം",
    geolocating: "ലൊക്കേഷൻ കണ്ടെത്തുന്നു",
    precinctNotified: "സ്റ്റേഷൻ അറിയിപ്പ് നൽകി",
    neuralScanning: "ന്യൂറൽ വിശകലന എഞ്ചിൻ പരിശോധിക്കുന്നു",
    directConnect: "പോലീസുമായി നേരിട്ടുള്ള ബന്ധം",
    dispatchConnecting: "കണക്ഷൻ സ്ഥാപിക്കുന്നു...",
    initiatingLink: "സുരക്ഷിത ലിങ്ക് ആരംഭിക്കുന്നു",
    seconds: "സെക്കൻഡുകളിൽ...",
    lineVerified: "സുരക്ഷിതമായ കണക്ഷൻ",
    tapToConnect: "ഉടൻ ബന്ധിപ്പിക്കാൻ ടാപ്പ് ചെയ്യുക",
    womensSafetyTitle: "സ്ത്രീ സുരക്ഷാ മോഡ്",
    womensSafetyDesc: "സൈബർ ഭീഷണികൾ നേരിടാൻ പരിശീലനം ലഭിച്ച പ്രത്യേക ഉദ്യോഗസ്ഥർക്ക് ലൊക്കേഷൻ വിവരങ്ങൾ നൽകുന്നു.",
    protocolStatus: "പ്രോട്ടോക്കോൾ ലക്ഷ്യ നില",
    enhancedDispatch: "കൂടുതൽ സുരക്ഷാ സഹായം",
    standardDispatch: "സാധാരണ സഹായം",
    silentRecording: "നിശബ്ദ റെക്കോർഡിംഗ്",
    dimmedRecording: "സ്ക്രീൻ മങ്ങി. റെക്കോർഡ് ചെയ്യുന്നു...",
    dimScreenRecord: "സ്ക്രീൻ മങ്ങിക്കുക, ലോക്കൽ ഓഡിയോ റെക്കോർഡ് ചെയ്യുക",
    broadcastLocation: "ലൊക്കേഷൻ പങ്കിടുക",
    activeBroadcast: "കോൺടാക്റ്റുകളിലേക്ക് തത്സമയം പങ്കിടുന്നു",
    broadcastGPS: "ജി.പി.എസ് വിവരങ്ങൾ പങ്കിടുക",
    panicAlarm: "പാനിക് അലാറം പ്രോട്ടോക്കോൾ",
    deterrentStrobe: "110dB ശബ്ദ അലാറം ഉടൻ പ്രവർത്തിക്കും",
    strobeTriggered: "🚨 പാനിക് അലാറം സജീവമാക്കി! 110dB ശബ്ദം പുറപ്പെടുവിക്കുന്നു.",
    deactivateEmergency: "എമർജൻസി മോഡ് അവസാനിപ്പിക്കുക"
  },
  hi: {
    threatDetected: "खतरा पाया गया",
    threatDesc: "आवाज विश्लेषण के माध्यम से खतरे का पता चला है। आपातकालीन प्रोटोकॉल 7-बीटा सक्रिय है।",
    activeMeasures: "सक्रिय सुरक्षा उपाय",
    recordingEvidence: "साक्ष्य रिकॉर्डिंग",
    encryptedCloudSync: "एन्क्रिप्टेड क्लाउड सिंक लाइव",
    geolocating: "भौगोलिक स्थिति का पता लगाना",
    precinctNotified: "थाने को सूचित किया गया",
    neuralScanning: "न्यूरल विश्लेषण इंजन सत्यापित कर रहा है",
    directConnect: "पुलिस से सीधा संपर्क",
    dispatchConnecting: "कनेक्शन स्थापित किया जा रहा है...",
    initiatingLink: "सुरक्षित लिंक शुरू हो रहा है",
    seconds: "सेकंड में...",
    lineVerified: "लाइन सुरक्षित सत्यापित है",
    tapToConnect: "तुरंत कनेक्ट करने के लिए टैप करें",
    womensSafetyTitle: "महिला सुरक्षा मोड",
    womensSafetyDesc: "साइबर-उत्पीड़न प्रतिक्रिया में प्रशिक्षित विशेष कानून प्रवर्तन अधिकारियों को तत्काल रूटिंग देता है।",
    protocolStatus: "प्रोटोकॉल लक्ष्य स्थिति",
    enhancedDispatch: "उन्नत पुलिस बल",
    standardDispatch: "सामान्य पुलिस बल",
    silentRecording: "मौन रिकॉर्डिंग",
    dimmedRecording: "स्क्रीन बंद है। रिकॉर्डिंग जारी है...",
    dimScreenRecord: "स्क्रीन बंद करें, स्थानीय ऑडियो रिकॉर्ड करें",
    broadcastLocation: "लोकेशन साझा करें",
    activeBroadcast: "संपर्कों को लाइव लोकेशन भेजी जा रही है",
    broadcastGPS: "जीपीएस टेलीमेट्री प्रसारित करें",
    panicAlarm: "पैनिक अलार्म प्रोटोकॉल",
    deterrentStrobe: "तत्काल 110dB ऑडियो अलार्म",
    strobeTriggered: "🚨 मौन अलार्म सक्रिय! 110dB सिग्नल प्रसारित हो रहा है।",
    deactivateEmergency: "आपातकालीन मोड बंद करें"
  },
  te: {
    threatDetected: "ప్రమాదం కనుగొనబడింది",
    threatDesc: "వాయిస్ విశ్లేషణ ద్వారా చట్టవిరుద్ధ బెదిరింపు గుర్తించబడింది. ఎమర్జెన్సీ ప్రోటోకాల్ 7-బీటా ప్రారంభించబడింది.",
    activeMeasures: "యాక్టివ్ అత్యवసర చర్యలు",
    recordingEvidence: "రికార్డింగ్ సాక్ష్యాలు",
    encryptedCloudSync: "ఎన్‌క్రిప్టెడ్ క్లౌడ్ సింక్ లైవ్",
    geolocating: "లొకేషన్ గుర్తింపు",
    precinctNotified: "పోలీస్ స్టేషన్ అలర్ట్ అయింది",
    neuralScanning: "వాయిస్ విశ్లేషణ వ్యవస్థ తనిఖీ చేస్తోంది",
    directConnect: "పోలీసులకు నేరుగా కాల్ చేయి",
    dispatchConnecting: "కనెక్షన్ అనుసంధానించబడుతోంది...",
    initiatingLink: "సురక్షిత లింక్ ప్రారంభమవుతోంది",
    seconds: "సెకన్లలో...",
    lineVerified: "కనెక్షన్ సురक्षितంగా నిర్ధారించబడింది",
    tapToConnect: "వెంటనే కనెక్ట్ అవ్వడానికి నొక్కండి",
    womensSafetyTitle: "మహిళల రక్షణ మోడ్",
    womensSafetyDesc: "సైబర్ బెదిరింపు నివారణలో శిక్షణ పొందిన ప్రత్యేక అధికారులకు నేరుగా సమాచారాన్ని చేరవేస్తుంది.",
    protocolStatus: "ప్రోటోకాల్ లక్ష్య స్థితి",
    enhancedDispatch: "అదనపు రక్షణ బృందం",
    standardDispatch: "సాధారణ రక్షణ బృందం",
    silentRecording: "సైలెంట్ రికార్డింగ్",
    dimmedRecording: "స్క్రీన్ ఆఫ్ చేయబడింది. రికార్డింగ్ రన్ అవుతోంది...",
    dimScreenRecord: "స్క్రీన్ ఆఫ్ చేసి, ఆడియో రికార్డ్ చేయి",
    broadcastLocation: "లొకేషన్ షేర్ చేయి",
    activeBroadcast: "కాంటాక్ట్‌లకు నేరుగా లొకేషన్ పంపబడుతోంది",
    broadcastGPS: "జీపీఎస్ సమాచారాన్ని ప్రసారం చేయి",
    panicAlarm: "పానిక్ అలారం ప్రోటోకాల్",
    deterrentStrobe: "వెంటనే 110dB తీవ్రమైన ఆడియో అలారం",
    strobeTriggered: "🚨 పానిక్ అలారం యాక్టివేట్ అయింది! 110dB ఆడియో రన్ అవుతోంది.",
    deactivateEmergency: "అత్యవసర మోడ్‌ను రద్దు చేయి"
  }
};

import { useRef } from "react";

export default function EmergencyView({ onCancelEmergency, currentLanguage, currentUser }: EmergencyViewProps) {
  const t = emergencyTranslations[currentLanguage] || emergencyTranslations.en;

  // Countdown Timer state
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isConnected, setIsConnected] = useState(false);
  const [womensSafetyMode, setWomensSafetyMode] = useState(true);
  const [showPanicAlert, setShowPanicAlert] = useState(false);
  const [isSilentRecording, setIsSilentRecording] = useState(false);
  const [isLocationBroadcasting, setIsLocationBroadcasting] = useState(false);

  // Web Audio refs for electronic siren generation
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sirenIntervalRef = useRef<any>(null);

  const startPanicAlarmSound = () => {
    try {
      stopPanicAlarmSound(); // Safety clear

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;

      const triggerChime = () => {
        if (!audioCtxRef.current) return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(580, audioCtxRef.current.currentTime);
        
        // Premium decaying envelope
        gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.45);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.55);
      };

      triggerChime();
      sirenIntervalRef.current = setInterval(triggerChime, 750);

    } catch (e) {
      console.error("AudioContext initialization failed:", e);
    }
  };

  const stopPanicAlarmSound = () => {
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
  };

  useEffect(() => {
    let timer: any = null;
    if (secondsLeft > 0 && !isConnected) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsConnected(true);
    }
    return () => clearInterval(timer);
  }, [secondsLeft, isConnected]);

  // Handle audio unmount cleanup
  useEffect(() => {
    return () => {
      stopPanicAlarmSound();
    };
  }, []);

  const handleManualConnect = () => {
    setSecondsLeft(0);
    setIsConnected(true);
  };

  const handlePanicAlarm = () => {
    setShowPanicAlert(true);
    startPanicAlarmSound();
    
    // Auto reset panic alarm notice after 4 seconds
    setTimeout(() => {
      setShowPanicAlert(false);
      stopPanicAlarmSound();
    }, 4000);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-8">
      
      {/* THREAT DETECTED FLASHER BANNER */}
      <section className="overflow-hidden rounded-xl shadow-md">
        <div className="animate-flash-red py-6 px-6 flex flex-col items-center justify-center text-center text-white relative">
          <span className="material-symbols-outlined text-5xl mb-2 animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <h2 className="font-headline text-2xl font-black tracking-wide text-white">
            {t.threatDetected}
          </h2>
          <p className="text-xs opacity-90 max-w-sm mt-1 leading-relaxed">
            {t.threatDesc}
          </p>
        </div>
      </section>

      {/* ACTIVE EMERGENCY MEASURES */}
      <div className="bg-white p-5 rounded-xl border border-container-high flex flex-col gap-4 shadow-xs">
        <h3 className="font-headline text-sm font-extrabold text-navy-dark tracking-wide border-b border-container-low pb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary-indigo text-lg">
            sync_saved_locally
          </span>
          {t.activeMeasures}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-container-low rounded-lg border-l-4 border-primary-indigo flex items-start gap-2">
            <span className="material-symbols-outlined text-primary-indigo animate-pulse text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              mic
            </span>
            <div>
              <p className="text-[10px] font-black text-primary-indigo uppercase">{t.recordingEvidence}</p>
              <p className="text-[10px] text-text-secondary font-mono">{t.encryptedCloudSync}</p>
            </div>
          </div>
          
          <div className="p-3 bg-container-low rounded-lg border-l-4 border-emerald-safe flex items-start gap-2">
            <span className="material-symbols-outlined text-emerald-safe text-lg">
              location_on
            </span>
            <div>
              <p className="text-[10px] font-black text-emerald-safe uppercase">{t.geolocating}</p>
              <p className="text-[10px] text-text-secondary font-mono">
                {currentUser?.policeStation ? `${currentUser.policeStation} ${t.precinctNotified}` : `Precinct 42 ${t.precinctNotified}`}
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Waveform visualizer */}
        <div className="w-full h-20 bg-navy-dark rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="flex items-center gap-1 select-none">
            <div className="w-1 bg-container-high h-4 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-1 bg-[#ff4a4a] h-10 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
            <div className="w-1 bg-primary-indigo h-14 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-1 bg-[#ff4a4a] h-8 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            <div className="w-1 bg-emerald-safe h-12 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
            <div className="w-1 bg-container-high h-4 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }}></div>
          </div>
          <div className="absolute bottom-2 right-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson-error animate-ping"></span>
            <span className="font-mono text-[9px] text-white/60">{t.neuralScanning}</span>
          </div>
        </div>
      </div>

      {/* DIRECT CONNECT POLICE CARD */}
      <div 
        onClick={handleManualConnect}
        className={`group relative overflow-hidden p-6 rounded-xl flex flex-col items-center justify-center transition-all active:scale-98 shadow-md cursor-pointer ${
          isConnected 
            ? "bg-emerald-safe text-white" 
            : "bg-crimson-error text-white"
        }`}
      >
        <span className="material-symbols-outlined text-4xl mb-3 animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
          local_police
        </span>
        <h3 className="font-headline text-lg font-black tracking-wide">
          {t.directConnect}
        </h3>
        
        {isConnected ? (
          <p className="font-sans text-sm font-bold opacity-90 mt-1 uppercase tracking-widest animate-pulse">
            {t.dispatchConnecting}
          </p>
        ) : (
          <p className="font-sans text-sm font-bold opacity-90 mt-1 uppercase tracking-wider">
            {t.initiatingLink} <span className="underline font-black">{secondsLeft}s</span>...
          </p>
        )}
        
        <p className="mt-4 font-mono text-[10px] border border-white/35 px-4 py-1 rounded-full uppercase tracking-widest bg-white/10">
          {isConnected ? t.lineVerified : t.tapToConnect}
        </p>
      </div>

      {/* WOMEN'S SAFETY MODE TOGGLE */}
      <div className="bg-navy-dark text-white p-5 rounded-xl border border-primary-indigo/30 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 shrink-0">
          <span className="material-symbols-outlined text-primary-indigo text-4xl opacity-25">
            woman
          </span>
        </div>
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-primary-indigo/30 rounded-lg">
              <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                health_and_safety
              </span>
            </div>
            <h3 className="font-headline text-sm font-extrabold text-white">
              {t.womensSafetyTitle}
            </h3>
          </div>
          
          <p className="text-container-low text-xs leading-relaxed max-w-xs">
            {t.womensSafetyDesc}
          </p>
          
          <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
              {t.protocolStatus}: <span className={womensSafetyMode ? "text-emerald-safe" : "text-amber-500"}>{womensSafetyMode ? t.enhancedDispatch : t.standardDispatch}</span>
            </span>
            
            <button 
              onClick={() => setWomensSafetyMode(!womensSafetyMode)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${womensSafetyMode ? "bg-[#4edea3]" : "bg-white/20"}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${womensSafetyMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* SPECIALIZED PANIC BENTO BOX CONTROLS */}
      <div className="grid grid-cols-2 gap-4">
        {/* Silent Recording cell */}
        <button 
          onClick={() => setIsSilentRecording(!isSilentRecording)}
          className={`p-4 rounded-xl border flex flex-col gap-2.5 text-left transition-colors ${isSilentRecording ? 'bg-navy-dark text-white border-navy-dark' : 'bg-white border-container-high'}`}
        >
          <span className={`material-symbols-outlined text-2xl ${isSilentRecording ? 'text-primary-indigo' : 'text-primary-indigo'}`}>
            screen_lock_portrait
          </span>
          <div>
            <p className="text-xs font-black uppercase font-headline">{t.silentRecording}</p>
            <p className="text-[10px] leading-tight text-text-secondary mt-0.5">
              {isSilentRecording ? t.dimmedRecording : t.dimScreenRecord}
            </p>
          </div>
        </button>

        {/* Broadcast Live cell */}
        <button 
          onClick={() => setIsLocationBroadcasting(!isLocationBroadcasting)}
          className={`p-4 rounded-xl border flex flex-col gap-2.5 text-left transition-colors ${isLocationBroadcasting ? 'bg-navy-dark text-white border-navy-dark' : 'bg-white border-container-high'}`}
        >
          <span className="material-symbols-outlined text-emerald-safe text-2xl">
            podcasts
          </span>
          <div>
            <p className="text-xs font-black uppercase font-headline">{t.broadcastLocation}</p>
            <p className="text-[10px] leading-tight text-text-secondary mt-0.5">
              {isLocationBroadcasting ? t.activeBroadcast : t.broadcastGPS}
            </p>
          </div>
        </button>

        {/* Panic Alarm Button */}
        <button 
          onClick={handlePanicAlarm}
          className="col-span-2 bg-navy-dark text-white hover:bg-navy-dark/95 active:scale-98 transition-all p-4 rounded-xl flex items-center justify-between border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-crimson-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-crimson-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                touch_app
              </span>
            </div>
            <div className="text-left">
              <p className="font-headline text-xs font-extrabold uppercase text-white">{t.panicAlarm}</p>
              <p className="text-[10px] text-container-high/80 uppercase mt-0.5 font-mono">{t.deterrentStrobe}</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-white">chevron_right</span>
        </button>
      </div>

      {/* Broadcast alert bubble inside panel */}
      {showPanicAlert && (
        <div className="bg-crimson-error p-3.5 text-white text-xs font-bold font-mono text-center rounded-lg animate-pulse uppercase tracking-wider">
          {t.strobeTriggered}
        </div>
      )}

      {/* GPS LIVE TRACKING CARD WITH PRESET ILLUSTRATION */}
      <div className="h-40 rounded-xl overflow-hidden relative border border-container-high shadow-xs">
        <img 
          className="w-full h-full object-cover grayscale opacity-75" 
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg1z_WwJIbL4s-yiTHigks_FvfzWTXvsc3XJbnV1CpdkNiRkwB08LyMrnpLJ7cgbLuQOzWiLDp8rnE5G6mDG2lz8iGNl2_YPWb9GDz38yhlfb1MO3jv_mkLbDLhpXOPy-5E9bVt9_XcONLquh53j-oxvFeohwPQXASS5yRTXdlF5TkJrnb0ov9P9lqCcM7E2PCZMOggc9Nv3nnqNPjHAI_y-j5ivkHsrCGfpTpoNtShbyY70qchb3jmsxOwYGKdzVIQfyPWw3Sw5ym" 
          alt="GPS security coordinate radar tracker grid view"
        />
        <div className="absolute inset-0 bg-primary-indigo/10"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 bg-crimson-error rounded-full animate-ping opacity-75"></div>
          <div className="w-3.5 h-3.5 bg-crimson-error rounded-full"></div>
        </div>
        <div className="absolute bottom-2 left-2 bg-navy-dark/85 px-3 py-1 rounded text-[9px] text-white font-mono font-semibold">
          {currentUser?.stationCoords ? `LAT/LON: ${currentUser.stationCoords} | ACCURACY 1.2M` : "LAT: 12.9376° N | LON: 77.6244° E | ACCURACY 1.2M"}
        </div>
      </div>

      {/* Secure abort mechanism */}
      <button
        onClick={onCancelEmergency}
        className="w-full bg-white border border-primary-indigo text-primary-indigo hover:bg-container-low active:scale-95 transition-all py-3.5 px-4 rounded-xl font-headline font-bold text-sm tracking-wide shadow-xs flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">
          cancel
        </span>
        {t.deactivateEmergency}
      </button>

    </div>
  );
}
