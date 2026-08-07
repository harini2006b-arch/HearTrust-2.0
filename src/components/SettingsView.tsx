import React, { useState } from "react";
import { translations, LanguageCode } from "../translations";

interface SettingsViewProps {
  onClearHistory: () => void;
  onResetDatabase: () => void;
  logsCount: number;
  onLogout?: () => void;
  currentLanguage: LanguageCode;
}

export default function SettingsView({ onClearHistory, onResetDatabase, logsCount, onLogout, currentLanguage }: SettingsViewProps) {
  const [useLocalVoiceEngine, setUseLocalVoiceEngine] = useState(true);
  const [scamAlertThreshold, setScamAlertThreshold] = useState(70);
  const [realtimeCloudSync, setRealtimeCloudSync] = useState(true);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const handleResetData = () => {
    onResetDatabase();
    setShowNotificationPopup(true);
    setTimeout(() => setShowNotificationPopup(false), 3000);
  };

  const handleClear = () => {
    onClearHistory();
    setShowNotificationPopup(true);
    setTimeout(() => setShowNotificationPopup(false), 3000);
  };

  const t = translations[currentLanguage];

  return (
    <div className="max-w-md mx-auto space-y-6 pb-6">
      
      <div>
        <h2 className="font-headline text-3xl font-extrabold text-navy-dark tracking-tight">
          {t.settingsTitle}
        </h2>
        <p className="text-sm font-sans text-text-secondary mt-1 leading-relaxed">
          {t.settingsDesc}
        </p>
      </div>

      {/* AI Processing Settings */}
      <section className="bg-white rounded-xl border border-container-high p-5 shadow-xs space-y-4">
        <h3 className="font-headline text-sm font-extrabold text-navy-dark border-b border-container-low pb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary-indigo text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            settings_voice
          </span>
          {t.settingsNeuralConfig}
        </h3>

        {/* Toggle 1 */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-bold text-navy-dark uppercase font-headline">{t.settingsNeuralToggle}</p>
            <p className="text-[10px] text-text-secondary mt-0.5 leading-tight max-w-xs">{t.settingsNeuralToggleDesc}</p>
          </div>
          <button 
            type="button"
            onClick={() => setUseLocalVoiceEngine(!useLocalVoiceEngine)}
            className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${useLocalVoiceEngine ? "bg-primary-indigo" : "bg-container-high"}`}
          >
            <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${useLocalVoiceEngine ? 'translate-x-4.5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Ranger Slider */}
        <div className="space-y-1.5 py-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-navy-dark uppercase font-headline">{t.settingsSensitivity}</span>
            <span className="font-mono font-bold text-primary-indigo">{scamAlertThreshold}%</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="95" 
            value={scamAlertThreshold}
            onChange={(e) => setScamAlertThreshold(Number(e.target.value))}
            className="w-full h-1.5 bg-container-medium rounded-lg appearance-none cursor-pointer accent-primary-indigo"
          />
          <p className="text-[10px] text-text-muted">{t.settingsSensitivityDesc}</p>
        </div>
      </section>

      {/* Cloud Security Settings */}
      <section className="bg-white rounded-xl border border-container-high p-5 shadow-xs space-y-4">
        <h3 className="font-headline text-sm font-extrabold text-navy-dark border-b border-container-low pb-2 flex items-center gap-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>
          <span className="material-symbols-outlined text-emerald-safe text-lg">
            verified_user
          </span>
          {t.settingsPrivacyHeader}
        </h3>

        {/* Toggle 2 */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-bold text-navy-dark uppercase font-headline">{t.settingsPrivacyToggle}</p>
            <p className="text-[10px] text-text-secondary mt-0.5 leading-tight max-w-xs">{t.settingsPrivacyToggleDesc}</p>
          </div>
          <button 
            type="button"
            onClick={() => setRealtimeCloudSync(!realtimeCloudSync)}
            className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${realtimeCloudSync ? "bg-emerald-safe" : "bg-container-high"}`}
          >
            <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${realtimeCloudSync ? 'translate-x-4.5' : 'translate-x-0'}`} />
          </button>
        </div>
      </section>

      {/* Sandbox & History Controls */}
      <section className="bg-white rounded-xl border border-container-high p-5 shadow-xs space-y-4">
        <h3 className="font-headline text-sm font-extrabold text-navy-dark border-b border-container-low pb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-crimson-error text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            delete_forever
          </span>
          {t.settingsMaintenance}
        </h3>

        <div className="space-y-3 pt-1">
          <button
            onClick={handleClear}
            disabled={logsCount === 0}
            className="w-full bg-container-low text-crimson-error hover:bg-crimson-error/5 disabled:opacity-50 transition-colors py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 border border-crimson-error/15"
          >
            <span className="material-symbols-outlined text-[16px]">clear_all</span>
            {currentLanguage === "ta" ? "சமீபத்திய வரலாற்றை அழி (" + logsCount + ")" : currentLanguage === "ml" ? "സമീപകാല ചരിത്രം മായ്ക്കുക (" + logsCount + ")" : currentLanguage === "hi" ? "हालिया इतिहास साफ़ करें (" + logsCount + ")" : currentLanguage === "te" ? "ఇటీవలి చరిత్రను తొలగించు (" + logsCount + ")" : "Clear Recent History List (" + logsCount + ")"}
          </button>

          <button
            onClick={handleResetData}
            className="w-full bg-navy-dark text-white hover:bg-navy-dark/95 transition-all py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            {t.settingsResetDatabaseBtn}
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full bg-linear-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transition-all py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              {t.settingsLogoutBtn}
            </button>
          )}
        </div>
      </section>

      {/* Dynamic QR Code Network Sync Card */}
      <section className="bg-white rounded-xl border border-container-high p-5 shadow-xs space-y-4 text-center">
        <h3 className="font-headline text-sm font-extrabold text-navy-dark border-b border-container-low pb-2 flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-violet-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            qr_code_2
          </span>
          {currentLanguage === "ta" ? "கைபேசி ஒத்திசைவு (QR குறியீடு)" :
           currentLanguage === "ml" ? "മൊബൈൽ സമന്വയം (QR കോഡ്)" :
           currentLanguage === "hi" ? "मोबाइल सिंक (QR कोड)" :
           currentLanguage === "te" ? "మొబైల్ సింక్ (QR కోడ్)" :
           "Mobile Dashboard Sync (QR)"}
        </h3>
        
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shadow-inner">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=http://10.205.176.50:3000" 
              alt="HearTrust App QR Code" 
              className="w-44 h-44 object-contain"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold text-slate-500">LOCAL ADDRESS:</p>
            <p className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg">
              http://10.205.176.50:3000
            </p>
          </div>
          <p className="text-[10px] text-text-muted max-w-xs mx-auto leading-relaxed">
            {currentLanguage === "ta" ? "உங்கள் கைபேசியில் கேமராவை திறந்து இந்த குறியீட்டை ஸ்கேன் செய்வதன் மூலம் HearTrust செயலியை நேரடியாக இயக்கலாம் (இரு சாதனங்களும் ஒரே வைஃபை வலையமைப்பில் இருக்க வேண்டும்)." :
             currentLanguage === "ml" ? "നിങ്ങളുടെ ഫോണിലെ ക്യാമറ ഉപയോഗിച്ച് ഈ ക്യുആർ കോഡ് സ്കാൻ ചെയ്ത് HearTrust മൊബൈലിൽ തുറക്കുക (രണ്ട് ഉപകരണങ്ങളും ഒരേ വൈഫൈ നെറ്റ്‌വർക്കിലായിരിക്കണം)." :
             currentLanguage === "hi" ? "अपने फोन के कैमरे से इस QR कोड को स्कैन करके HearTrust को मोबाइल पर खोलें (दोनों डिवाइस एक ही वाई-फाई नेटवर्क से जुड़े होने चाहिए)।" :
             currentLanguage === "te" ? "మీ ఫోన్ కెమెరాతో ఈ QR కోడ్‌ను స్కాన్ చేయడం ద్వారా HearTrust మొబైల్‌లో తెరవండి (రెండు పరికరాలు ఒకే వై-ఫై నెట్‌వర్క్‌లో ఉండాలి)." :
             "Scan this QR code with your phone camera to instantly run HearTrust on your mobile browser (requires both devices to be on the same Wi-Fi network)."}
          </p>
        </div>
      </section>

      {/* Dynamic alerts bubble */}
      {showNotificationPopup && (
        <div className="bg-emerald-safe text-white text-xs font-bold font-mono text-center p-3 rounded-lg animate-fade-in shadow-md">
          {currentLanguage === "ta" ? "✓ கணினி தரவுத்தளம் வெற்றிகரமாக ஒத்திசைக்கப்பட்டது." : currentLanguage === "ml" ? "✓ സിസ്റ്റം ഡാറ്റാബേസ് വിജയകരമായി സമന്വയിപ്പിച്ചു." : currentLanguage === "hi" ? "✓ सिस्टम डेटाबेस सफलतापूर्वक सिंक्रनाइज़ हो गया।" : currentLanguage === "te" ? "✓ సిస్టమ్ డేటాబేస్ విజయవంతంగా సమకాలీకరించబడింది." : "✓ SYSTEM DATABASE SUCCESSFULLY SYNCHRONIZED."}
        </div>
      )}

      {/* Device Info credits footer */}
      <div className="text-center text-text-muted space-y-1">
        <p className="text-[10px] font-bold font-mono uppercase tracking-widest">HearTrust Guard v14.2 Active</p>
        <p className="text-[9px] font-medium leading-relaxed">
          Constructed in accordance with modern Fortress Protocols secure standards.
        </p>
      </div>

    </div>
  );
}