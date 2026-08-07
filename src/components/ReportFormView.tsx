import React, { useState, useRef } from "react";
import { CallType, ScamReport } from "../types";
import { translations, LanguageCode } from "../translations";


interface ReportFormProps {
  onSubmitReport: (newReport: ScamReport) => void;
  onNavigateHome: () => void;
  currentLanguage: LanguageCode;
}

export default function ReportFormView({ onSubmitReport, onNavigateHome, currentLanguage }: ReportFormProps) {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [callType, setCallType] = useState<CallType>(CallType.VOICE);
  const [details, setDetails] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidAudio(file)) {
        setUploadedFile(file);
      } else {
        alert("Please upload a valid audio file (MP3, WAV, or AAC) up to 10MB.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isValidAudio(file)) {
        setUploadedFile(file);
      } else {
        alert("Please upload a valid audio file (MP3, WAV, or AAC).");
      }
    }
  };

  const isValidAudio = (file: File) => {
    const validTypes = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/x-wav", "audio/aac", "audio/m4a", "audio/x-m4a"];
    const isAudioType = validTypes.includes(file.type) || file.name.endsWith(".mp3") || file.name.endsWith(".wav") || file.name.endsWith(".aac");
    const isUnderSize = file.size <= 10 * 1024 * 1024; // 10MB
    return isAudioType && isUnderSize;
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct new reported scam log
    const report: ScamReport = {
      id: "report-" + Date.now(),
      number: phoneNumber || "Unknown / Hidden",
      callType,
      details: details || "No descriptions specified.",
      fileName: uploadedFile ? uploadedFile.name : undefined,
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    onSubmitReport(report);
    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setPhoneNumber("");
    setCallType(CallType.VOICE);
    setDetails("");
    setUploadedFile(null);
    setShowSuccessModal(false);
    onNavigateHome();
  };

  const t = translations[currentLanguage];

  return (
    <div className="max-w-md mx-auto space-y-6 pb-6 relative">
      
      {/* Intro Greetings */}
      <div className="mb-4">
        <h2 className="font-headline text-3xl font-extrabold text-navy-dark tracking-tight">
          {t.reportTitle}
        </h2>
        <p className="text-sm font-sans text-text-secondary mt-2 leading-relaxed">
          {t.reportDesc}
        </p>
      </div>

      {/* Trust privacy badge layout */}
      <div className="bg-emerald-safe/5 border border-emerald-safe/25 rounded-xl p-4 flex gap-3.5 items-start">
        <span className="material-symbols-outlined text-emerald-safe text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
          verified_user
        </span>
        <div>
          <p className="text-xs font-bold text-emerald-safe font-headline uppercase tracking-wider">
            {t.reportPrivacyTitle}
          </p>
          <p className="text-xs text-text-secondary mt-0.5 leading-tight">
            {t.reportPrivacyDesc}
          </p>
        </div>
      </div>


      {/* Interactive Form */}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Phone number input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block" htmlFor="phone">
            {t.reportLabelPhone}
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">
              call
            </span>
            <input 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-container-high rounded-xl font-sans text-sm outline-hidden focus:border-primary-indigo focus:ring-2 focus:ring-primary-indigo/20 transition-all placeholder:text-text-muted/65"
              id="phone" 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
        </div>

        {/* Call type choices chips */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
            {t.reportLabelMedium}
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { type: CallType.VOICE, label: t.reportMediumVoice },
              { type: CallType.WHATSAPP, label: t.reportMediumWhatsapp },
              { type: CallType.SMS, label: t.reportMediumSms },
              { type: CallType.OTHER, label: t.reportMediumOther }
            ].map(item => (
              <button
                key={item.type}
                type="button"
                onClick={() => setCallType(item.type)}
                className={`py-2 px-4 rounded-full border text-xs font-bold tracking-wide transition-all select-none ${
                  callType === item.type
                    ? "bg-primary-indigo text-white border-primary-indigo shadow-xs"
                    : "bg-surface text-text-primary border-container-high hover:bg-container-low"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Details text area */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block" htmlFor="details">
            {t.reportLabelContext}
          </label>
          <textarea 
            className="w-full p-4 bg-white border border-container-high rounded-xl font-sans text-sm outline-hidden focus:border-primary-indigo focus:ring-2 focus:ring-primary-indigo/20 transition-all placeholder:text-text-muted/60 resize-none"
            id="details" 
            rows={4}
            value={details}
            placeholder={t.reportPlaceholderContext}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>

        {/* Upload Audio File segment (Combines Drag Drop and manual click picker!) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
            {t.reportLabelUpload}
          </label>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />

          <div
            onClick={handleContainerClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer ${
              isDragging 
                ? "border-primary-indigo bg-primary-indigo/5 scale-102"
                : uploadedFile 
                  ? "border-emerald-safe bg-emerald-safe/3" 
                  : "border-container-high bg-container-low/50 hover:bg-container-low"
            }`}
          >
            <span className={`material-symbols-outlined text-4xl mb-2 transition-transform duration-300 ${uploadedFile ? 'text-emerald-safe scale-110' : 'text-primary-indigo'}`}>
              {uploadedFile ? "verified" : "cloud_upload"}
            </span>
            
            <p className="text-xs font-bold font-headline text-navy-dark text-center">
              {uploadedFile 
                ? `${currentLanguage === "ta" ? "வெற்றிகரமாக பதிவேற்றப்பட்டது: " : currentLanguage === "ml" ? "വിജയകരമായി ലോഡ് ചെയ്തു: " : currentLanguage === "hi" ? "सफलतापूर्वक लोड किया गया: " : currentLanguage === "te" ? "విజయవంతంగా లోడ్ చేయబడింది: " : "Successfully loaded: "}${uploadedFile.name}` 
                : (currentLanguage === "ta" ? "பதிவேற்ற தட்டவும் அல்லது இழுத்து விடவும்" : currentLanguage === "ml" ? "ഫയൽ തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക" : currentLanguage === "hi" ? "अपलोड करने के लिए टैप करें या खींचें" : currentLanguage === "te" ? "అప్‌లోడ్ చేయడానికి ట్యాప్ చేయండి" : "Tap to select or drag & drop audio here")
              }
            </p>
            <p className="text-[10px] text-text-muted text-center mt-1">
              {uploadedFile 
                ? `${Math.round(uploadedFile.size / 1024)} KB` 
                : t.reportUploadHint
              }
            </p>
          </div>
        </div>

        {/* Submit action button */}
        <button 
          type="submit"
          className="w-full bg-primary-indigo text-white font-headline text-base font-bold py-4 rounded-xl shadow-md hover:bg-primary-indigo/95 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            report
          </span>
          {t.reportSubmitBtn}
        </button>

        {/* Privacy disclaimer */}
        <div className="text-center pt-2">
          <p className="text-[11px] font-bold text-text-muted flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-sm font-extrabold text-emerald-safe">
              lock
            </span>
            {currentLanguage === "ta" ? "உங்கள் புகார்கள் தானாகவே குறியாக்கம் செய்யப்படுகின்றன." : currentLanguage === "ml" ? "നിങ്ങളുടെ റിപ്പോർട്ടുകൾ എൻക്രിപ്റ്റ് ചെയ്തതാണ്." : currentLanguage === "hi" ? "आपकी रिपोर्ट स्वचालित रूप से एन्क्रिप्ट की जाती है।" : currentLanguage === "te" ? "మీ ఫిర్యాదు ఆటోమేటిక్‌గా ఎన్‌క్రిప్ట్ చేయబడుతుంది." : "Your report is automatically encrypted & verified."}
          </p>
        </div>
      </form>

      {/* HIGHEST FIDELITY SUCCESS POPUP CONVERTED FROM THE HTML SCREEN 5 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] bg-navy-dark/75 flex items-center justify-center p-6 transition-opacity duration-300">
          <div className="bg-white rounded-2xl w-full max-w-sm p-8 text-center shadow-2xl scale-100 transition-transform duration-300 transform">
            <div className="w-20 h-20 bg-emerald-safe/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-emerald-safe font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            
            <h3 className="font-headline text-2xl font-black text-navy-dark mb-2">
              {t.reportSuccessTitle}
            </h3>
            
            <p className="text-xs text-text-secondary leading-relaxed mb-8">
              {t.reportSuccessDesc}
            </p>
            
            <button 
              onClick={resetForm}
              className="w-full bg-primary-indigo text-white font-headline font-bold text-sm py-4 rounded-xl hover:bg-primary-indigo/90 active:scale-95 transition-all"
            >
              {t.reportSuccessBtn}
            </button>
          </div>
        </div>
      )}


    </div>
  );
}

