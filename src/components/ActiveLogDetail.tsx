import React from "react";
import { CallLog } from "../types";
import { LanguageCode } from "../translations";

interface ActiveLogDetailProps {
  log: CallLog;
  onClose: () => void;
  currentLanguage: LanguageCode;
}

export default function ActiveLogDetail({ log, onClose, currentLanguage }: ActiveLogDetailProps) {
  const isWarning = log.status === "WARNING";
  const isTrusted = log.status === "TRUSTED";

  const labels = {
    scamRisk: currentLanguage === "ta" ? "பதிவு செய்யப்பட்ட மோசடி அபாயம்" :
              currentLanguage === "ml" ? "രേഖപ്പെടുത്തിയ തട്ടിപ്പ് സാധ്യത" :
              currentLanguage === "hi" ? "रिकॉर्ड किया गया जोखिम" :
              currentLanguage === "te" ? "రికార్డ్ చేయబడిన మోసం ప్రమాదం" :
              "RECORDED SCAM RISK",
    deepfake: currentLanguage === "ta" ? "AI குரல் அச்சுறுத்தல் குறியீடு" :
              currentLanguage === "ml" ? "കൃത്രിമ ശബ്ദ സ്കോർ" :
              currentLanguage === "hi" ? "कृत्रिम आवाज स्कोर" :
              currentLanguage === "te" ? "కృత్రిమ వాయిస్ స్కోర్" :
              "DEEPFAKE SCORE",
    transcript: currentLanguage === "ta" ? "பகுப்பாய்வு செய்யப்பட்ட அழைப்பு உரை" :
                currentLanguage === "ml" ? "വിശകലനം ചെയ്ത സംഭാഷണം" :
                currentLanguage === "hi" ? "रिकॉर्ड किया गया बातचीत का पाठ" :
                currentLanguage === "te" ? "రికార్డ్ చేయబడిన సంభాషణ" :
                "Captured Scanned Audio Transcript",
    returnBtn: currentLanguage === "ta" ? "வரலாற்றுப் பதிவுகளுக்குத் திரும்பு" :
               currentLanguage === "ml" ? "ചരിത്രത്തിലേക്ക് മടങ്ങുക" :
               currentLanguage === "hi" ? "इतिहास पर वापस लौटें" :
               currentLanguage === "te" ? "తిరిగి వెళ్ళండి" :
               "Return to History Logs",
    caller: currentLanguage === "ta" ? "அழைப்பாளர்" :
            currentLanguage === "ml" ? "വിളിച്ചയാൾ" :
            currentLanguage === "hi" ? "कॉलर" :
            currentLanguage === "te" ? "కాలర్" :
            "Caller",
    you: currentLanguage === "ta" ? "நீங்கள்" :
         currentLanguage === "ml" ? "നിങ്ങൾ" :
         currentLanguage === "hi" ? "आप" :
         currentLanguage === "te" ? "మీరు" :
         "You (Me)",
    empty: currentLanguage === "ta" ? "அழைப்பு உரை எதுவும் கிடைக்கவில்லை." :
           currentLanguage === "ml" ? "സംഭാഷണം ലഭ്യമല്ല." :
           currentLanguage === "hi" ? "कोई पाठ उपलब्ध नहीं है।" :
           currentLanguage === "te" ? "సంభాషణ అందుబాటులో లేదు." :
           "No telemetry transcript available."
  };

  return (
    <div className="fixed inset-0 z-[100] bg-navy-dark/75 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative block animate-fade-in border border-container-medium">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-navy-dark w-8 h-8 rounded-full hover:bg-container-low transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Title Call Metadata */}
        <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-container-low">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
            isWarning 
              ? "bg-crimson-error/15 text-crimson-error" 
              : isTrusted 
                ? "bg-emerald-safe/10 text-emerald-safe" 
                : "bg-container-low text-text-primary"
          }`}>
            <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: isWarning ? "'FILL' 1" : undefined }}>
              {isWarning ? "call_end" : isTrusted ? "contact_phone" : "person"}
            </span>
          </div>
          <div>
            <h3 className="font-headline text-lg font-extrabold text-navy-dark leading-tight">
              {log.caller}
            </h3>
            <p className="text-xs text-text-secondary font-medium font-mono">
              {log.number} • {log.time}
            </p>
          </div>
        </div>

        {/* Threat Indicators Audit */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 bg-container-low rounded-xl border border-container-high text-center">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
              {labels.scamRisk}
            </span>
            <span className={`font-headline text-xl font-black ${isWarning ? 'text-crimson-error' : 'text-emerald-safe'}`}>
              {log.scamRisk}% {isWarning ? (currentLanguage === "ta" ? "அதிகம்" : currentLanguage === "ml" ? "കൂടുതൽ" : currentLanguage === "hi" ? "उच्च" : currentLanguage === "te" ? "ఎక్కువ" : "HIGH") : (currentLanguage === "ta" ? "குறைவு" : currentLanguage === "ml" ? "കുറവ്" : currentLanguage === "hi" ? "कम" : currentLanguage === "te" ? "తక్కువ" : "LOW")}
            </span>
          </div>

          <div className="p-3 bg-container-low rounded-xl border border-container-high text-center">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
              {labels.deepfake}
            </span>
            <span className="font-headline text-xl font-black text-navy-dark">
              {log.deepfakeScore}/100
            </span>
          </div>
        </div>

        {/* Transcript Log list */}
        <div className="space-y-3 mb-5">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            {labels.transcript}
          </h4>
          
          <div className="max-h-56 overflow-y-auto border border-container-high rounded-xl p-3 bg-container-low/40 space-y-3.5 font-sans text-xs">
            {log.transcript && log.transcript.length > 0 ? (
              log.transcript.map((line, idx) => {
                if (line.speaker === "system") {
                  return (
                    <div key={idx} className="text-center font-mono opacity-60 italic">
                      [{line.text}]
                    </div>
                  );
                }
                const isCaller = line.speaker === "caller";
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] font-extrabold uppercase ${isCaller ? 'text-amber-500 font-headline' : 'text-primary-indigo font-headline'}`}>
                        {isCaller ? labels.caller : labels.you}
                      </span>
                    </div>
                    <p className={`italic ${line.isSuspicious ? "text-crimson-error bg-crimson-error/5 border-l-2 border-crimson-error pl-1.5" : "text-navy-dark"}`}>
                      "{line.text}"
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-text-muted text-center italic py-2">
                {labels.empty}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-navy-dark text-white hover:bg-navy-dark/90 active:scale-95 transition-all font-headline font-bold text-sm py-3 rounded-xl shadow-xs"
        >
          {labels.returnBtn}
        </button>

      </div>
    </div>
  );
}

