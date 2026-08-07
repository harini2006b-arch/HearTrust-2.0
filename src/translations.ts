export interface TranslationSchema {
  navProtect: string;
  navHistory: string;
  navWomenSafe: string;
  navReport: string;
  navSettings: string;
  
  heroBadge: string;
  heroTitle: string;
  heroTitleSpan: string;
  heroDesc: string;
  heroStartBtn: string;
  heroDemoBtn: string;
  heroNotice: string;
  
  howItWorksTitle: string;
  howItWorksStep1Title: string;
  howItWorksStep1Desc: string;
  howItWorksStep2Title: string;
  howItWorksStep2Desc: string;
  howItWorksStep3Title: string;
  howItWorksStep3Desc: string;
  howItWorksStep4Title: string;
  howItWorksStep4Desc: string;
  howItWorksStep5Title: string;
  howItWorksStep5Desc: string;
  
  dashboardSafeScore: string;
  dashboardOptimal: string;
  dashboardConditional: string;
  dashboardDeficient: string;
  dashboardOverallProtection: string;
  dashboardActiveScanning: string;
  dashboardKeypadTitle: string;
  dashboardKeypadDesc: string;
  dashboardKeypadGuide: string;
  dashboardLaunchBtn: string;
  dashboardCoreHealth: string;
  dashboardHealthActive: string;
  dashboardHealthUpdated: string;
  dashboardHealthSyncing: string;
  dashboardRecentHistory: string;
  dashboardCallsTracked: string;
  
  activeCallScenarioLabel: string;
  activeCallScenario1: string;
  activeCallScenario2: string;
  activeCallScenario3: string;
  activeCallAnalyzing: string;
  activeCallListening: string;
  activeCallLiveDemo: string;
  activeCallMicDesc: string;
  activeCallMicActive: string;
  activeCallMicInactive: string;
  activeCallMicTurnOff: string;
  activeCallMicTurnOn: string;
  activeCallWhatToSay: string;
  activeCallThreatBank: string;
  activeCallThreatClone: string;
  activeCallThreatGov: string;
  activeCallNormalChat: string;
  activeCallSandboxNotice: string;
  activeCallRiskGauge: string;
  activeCallDeepfakeAudit: string;
  activeCallTranscriptTitle: string;
  activeCallRecording: string;
  activeCallMute: string;
  activeCallMuted: string;
  activeCallEnd: string;
  activeCallRecord: string;
  activeCallRecordingActive: string;
  activeCallInjectTitle: string;
  activeCallInjectDesc: string;
  activeCallInjectLabelQuick: string;
  activeCallInjectLabelType: string;
  activeCallInjectPlaceholder: string;
  activeCallInjectBtn: string;
  activeCallInjectNote: string;
  
  womenSafetyTitle: string;
  womenSafetyBadge: string;
  womenSafetyDesc: string;
  womenSafetySelectScenario: string;
  womenSafetyLaunchBtn: string;
  womenSafetyThreatDetected: string;
  womenSafetyStressIndex: string;
  womenSafetyDefenseMatrix: string;
  womenSafetySOSBtn: string;
  womenSafetyPoliceDispatched: string;
  womenSafetyGpsBroadcast: string;
  womenSafetyDeterrentsTitle: string;
  womenSafetyDeterrentsDesc: string;
  womenSafetyDeterrentDoorbell: string;
  womenSafetyDeterrentDog: string;
  womenSafetyDeterrentMale: string;
  womenSafetyStealthTitle: string;
  womenSafetyStealthDesc: string;
  womenSafetyStealthBtn: string;
  womenSafetyStealthOverlay: string;
  
  reportTitle: string;
  reportDesc: string;
  reportPrivacyTitle: string;
  reportPrivacyDesc: string;
  reportLabelPhone: string;
  reportLabelMedium: string;
  reportMediumVoice: string;
  reportMediumWhatsapp: string;
  reportMediumSms: string;
  reportMediumOther: string;
  reportLabelContext: string;
  reportPlaceholderContext: string;
  reportLabelUpload: string;
  reportUploadHint: string;
  reportSubmitBtn: string;
  reportSuccessTitle: string;
  reportSuccessDesc: string;
  reportSuccessBtn: string;
  
  settingsTitle: string;
  settingsDesc: string;
  settingsNeuralConfig: string;
  settingsNeuralToggle: string;
  settingsNeuralToggleDesc: string;
  settingsSensitivity: string;
  settingsSensitivityDesc: string;
  settingsPrivacyHeader: string;
  settingsPrivacyToggle: string;
  settingsPrivacyToggleDesc: string;
  settingsMaintenance: string;
  settingsClearHistoryBtn: string;
  settingsResetDatabaseBtn: string;
  settingsLogoutBtn: string;
  settingsDatabaseSync: string;
  
  historyTitle: string;
  historyDesc: string;
  historyNoLogs: string;
  historyNoLogsDesc: string;
  historyInitiateBtn: string;

  onboardingCtaTitle: string;
  onboardingCtaDesc: string;
  onboardingCtaBtn: string;
  
  featuresTitle: string;
  features1Title: string;
  features1Desc: string;
  features2Title: string;
  features2Desc: string;
  features3Title: string;
  features3Desc: string;
}

export type LanguageCode = "en" | "ta" | "ml" | "hi" | "te";

export const translations: Record<LanguageCode, TranslationSchema> = {
  en: {
    navProtect: "Protect",
    navHistory: "History",
    navWomenSafe: "Women Safe",
    navReport: "Report",
    navSettings: "Settings",
    heroBadge: "ADVANCED NEURAL AI PROTECTION",
    heroTitle: "Real-Time AI Protection Against ",
    heroTitleSpan: "Voice Scams",
    heroDesc: "Stop AI deepfake impersonations, caller fraud, and emergency financial extortion before they happen. Our military-grade local neural engine listens continuously for your active security.",
    heroStartBtn: "Launch Active Guard Dashboard",
    heroDemoBtn: "Try Live Call Demo",
    heroNotice: "🔒 No permissions required for basic virtual sandbox simulation.",
    howItWorksTitle: "How It Works",
    howItWorksStep1Title: "Call Identification",
    howItWorksStep1Desc: "HearTrust integrates directly with your phone's dialer to intercept incoming calls from unknown numbers.",
    howItWorksStep2Title: "Neural Analysis",
    howItWorksStep2Desc: "Our AI scans the voice signature for synthetic artifacts and cross-references speech patterns with known scam databases.",
    howItWorksStep3Title: "Instant Mitigation",
    howItWorksStep3Desc: "If a scam is detected, HearTrust alerts you instantly and provides options to terminate or track the caller securely.",
    howItWorksStep4Title: "Multi-Authority Telemetry Routing",
    howItWorksStep4Desc: "Binds secure voice extortion telemetry packets to pre-registered network nodes (Family Nodes, Regional Precincts via direct 112 HUD Links, or Safety Wardens) using real-time WebSockets and Firebase RTDB Bridges.",
    howItWorksStep5Title: "Autonomous AI Self-Healing Shield",
    howItWorksStep5Desc: "Activates when no human guardian is online. Engages an automated speech synthesis bot challenge requesting PIN credentials, performs local carrier line drops, and files threat fingerprints to precinct databases.",
    dashboardSafeScore: "SAFE SCORE",
    dashboardOptimal: "Optimal",
    dashboardConditional: "Conditional",
    dashboardDeficient: "Deficient! High Risk",
    dashboardOverallProtection: "Your overall protection is currently",
    dashboardActiveScanning: "Active Scanning: Calibrated 4 minutes ago",
    dashboardKeypadTitle: "Judges' Sandbox Dialer Keypad",
    dashboardKeypadDesc: "Enter any speed-dial code or phone number to simulate a real-time call scan:",
    dashboardKeypadGuide: "🎯 SIMULATOR DEMO GUIDE FOR JUDGES:",
    dashboardLaunchBtn: "Launch Voice Intercept Call",
    dashboardCoreHealth: "Security Core Health",
    dashboardHealthActive: "Active",
    dashboardHealthUpdated: "Updated",
    dashboardHealthSyncing: "Syncing",
    dashboardRecentHistory: "Recent Guard History",
    dashboardCallsTracked: "calls tracked",
    activeCallScenarioLabel: "Select Active Scenario Context",
    activeCallScenario1: "Bank Fraud",
    activeCallScenario2: "Kid Mimic",
    activeCallScenario3: "IRS Miller",
    activeCallAnalyzing: "AI ANALYZING...",
    activeCallListening: "Listening for patterns",
    activeCallLiveDemo: "Linguistic Mic Interceptor",
    activeCallMicDesc: "Speak real-time phrases into your mic (with your friend) to test local threat categorization:",
    activeCallMicActive: "🔴 LIVE MIC SCAN ACTIVE",
    activeCallMicInactive: "⚪ MIC INTERCEPT DISCONNECTED",
    activeCallMicTurnOff: "Turn Off Mic",
    activeCallMicTurnOn: "Start Live Mic Scan",
    activeCallWhatToSay: "🇮🇳 WHAT TO SAY INTO YOUR MICROPHONE:",
    activeCallThreatBank: "I need your online account password and credit card pin number.",
    activeCallThreatClone: "Grandma help me, kid was cloned, I had an accident.",
    activeCallThreatGov: "Representing IRS agent, arrest warrant is issued.",
    activeCallNormalChat: "Good morning! Let's arrange our meeting in Bangalore.",
    activeCallSandboxNotice: "🛡️ Sandbox Protection: No police or external emergency dispatches will trigger in this mode.",
    activeCallRiskGauge: "SCAM RISK STAT",
    activeCallDeepfakeAudit: "DEEPFAKE AUDIT",
    activeCallTranscriptTitle: "Live Speech Transcript",
    activeCallRecording: "RECORDING LIVE",
    activeCallMute: "Mute",
    activeCallMuted: "Muted",
    activeCallEnd: "End Call",
    activeCallRecord: "Record",
    activeCallRecordingActive: "Recording",
    activeCallInjectTitle: "Judges' Real-Time Speech Injector",
    activeCallInjectDesc: "Simulate caller speaking by typing or clicking threat statements below:",
    activeCallInjectLabelQuick: "Quick-inject verbal threats:",
    activeCallInjectLabelType: "Type a custom sentence for the caller:",
    activeCallInjectPlaceholder: "e.g. Give me your account pin code...",
    activeCallInjectBtn: "Inject Speech",
    activeCallInjectNote: "Try words like: \"pin\", \"password\", \"bank\", \"arrest\", \"warrant\", \"cloned\", \"grandma\", \"leak\", \"outside\".",
    womenSafetyTitle: "Women's Safety Portal",
    womenSafetyBadge: "Sextortion & Harassment Shield",
    womenSafetyDesc: "Prototype simulation designed to demonstrate military-grade emergency deterrents and direct legal/police dispatch pipelines for women facing stalking, intimidation, or photo-leak blackmail.",
    womenSafetySelectScenario: "Select Threat Scenario for Judge Demo",
    womenSafetyLaunchBtn: "Launch Active Crisis Shield Simulator",
    womenSafetyThreatDetected: "CRISIS THREAT DETECTED",
    womenSafetyStressIndex: "ACOUSTIC STRESS INDEX",
    womenSafetyDefenseMatrix: "🚨 TACTICAL DEFENSE MATRIX (LIVE EMERGENCY TOOLS)",
    womenSafetySOSBtn: "CONFIRM INSTANT DISPATCH TO POLICE (SOS)",
    womenSafetyPoliceDispatched: "Police Dispatched",
    womenSafetyGpsBroadcast: "GPS BROADCAST LIVE",
    womenSafetyDeterrentsTitle: "🔊 CORE DETERRENT SOUNDBOARD (FORCE-MULTIPLIERS)",
    womenSafetyDeterrentsDesc: "Emits synthetic local context audio to startle and deter stalkers or extorters, forcing them to disengage immediately.",
    womenSafetyDeterrentDoorbell: "Ring Smart Doorbell",
    womenSafetyDeterrentDog: "Simulate Guard Dog",
    womenSafetyDeterrentMale: "Synthesize Male Voice",
    womenSafetyStealthTitle: "Silent Screen Camouflage",
    womenSafetyStealthDesc: "Turns the screen black, fake-locking the phone so the predator doesn't suspect live recording or GPS relaying.",
    womenSafetyStealthBtn: "Activate Stealth Screen",
    womenSafetyStealthOverlay: "TAP RANDOMLY ANYWHERE TO END BLACK SCREEN AND DISCLOSE LOGS",
    reportTitle: "Report a Scam",
    reportDesc: "Your input saves countless other family members and community seniors. All reports are immediately anonymized and shared securely.",
    reportPrivacyTitle: "Military-Grade Privacy Guaranteed",
    reportPrivacyDesc: "We employ AES-256 local field encryption to guard any identifiers you specify.",
    reportLabelPhone: "SUSPICIOUS PHONE NUMBER",
    reportLabelMedium: "CALL MEDIUM TYPE",
    reportMediumVoice: "Voice Call",
    reportMediumWhatsapp: "WhatsApp",
    reportMediumSms: "SMS Text",
    reportMediumOther: "Other Channels",
    reportLabelContext: "SCAM CONTEXT DETAILS",
    reportPlaceholderContext: "What claim was made? (e.g. they pretended to be an IRS agent requiring Apple gift cards under threat of arrest...)",
    reportLabelUpload: "UPLOAD SPAM RECORDING (OPTIONAL)",
    reportUploadHint: "Supports MP3, WAV, or AAC (Max 10MB)",
    reportSubmitBtn: "Submit Secure Scam Report",
    reportSuccessTitle: "Report Submitted",
    reportSuccessDesc: "Thank you for contributing to community safety! Our automated telemetry network has updated the spam graph registry with the specified parameters.",
    reportSuccessBtn: "Return to Dashboard",
    settingsTitle: "System Settings",
    settingsDesc: "Configure HearTrust's local neural engine thresholds, cloud sync graphs, and virtual sandbox simulation parameters.",
    settingsNeuralConfig: "Neural Engine Configuration",
    settingsNeuralToggle: "On-Device Acoustic Scan",
    settingsNeuralToggleDesc: "Enables high-resolution local frequency diagnostics (Edge AI).",
    settingsSensitivity: "Telemetry Sensitivity Trigger",
    settingsSensitivityDesc: "Adjusts the tolerance limit before active alerts are emitted during transcribed intercepts.",
    settingsPrivacyHeader: "Privacy & Trusted Contacts",
    settingsPrivacyToggle: "Federated Threat Graph Sync",
    settingsPrivacyToggleDesc: "Anonymously submit detected pattern models to reinforce core protective metrics globally.",
    settingsMaintenance: "Database System Maintenance",
    settingsClearHistoryBtn: "Clear Recent History List",
    settingsResetDatabaseBtn: "Reset Sandbox Simulated Database Logs",
    settingsLogoutBtn: "Logout of Security Profile",
    settingsDatabaseSync: "SYSTEM DATABASE SUCCESSFULLY SYNCHRONIZED.",
    historyTitle: "Historical Logs",
    historyDesc: "Inspect transcript analysis logs, deepfake scores, and threat classifications for all calls monitored by Active Guard.",
    historyNoLogs: "No Monitored Calls Found",
    historyNoLogsDesc: "Initiate call demos or file scam reports to populate security graphs.",
    historyInitiateBtn: "Initiate Simulator Call",
    onboardingCtaTitle: "Secure Your Digital Voice Today",
    onboardingCtaDesc: "Join 50,000+ proactive users who count on HearTrust to safeguard their phone calls from voice clonal extortion.",
    onboardingCtaBtn: "Get Protected Now",
    featuresTitle: "Key Protection Features",
    features1Title: "Deepfake Detection",
    features1Desc: "Advanced acoustic analysis to identify AI-generated or cloned voice segments with 99.9% real-time pattern accuracy.",
    features2Title: "Multilingual Support",
    features2Desc: "Active threat protection across Tamil, English, Malayalam, Hindi, and Telugu, keeping your family safe regardless of the caller's dialect.",
    features3Title: "Privacy-First Edge AI",
    features3Desc: "All audio analysis occurs locally on your virtual device. We never record, store, or transmit your private call data."
  },
  ta: {
    navProtect: "பாதுகாப்பு",
    navHistory: "வரலாறு",
    navWomenSafe: "பெண்கள் பாதுகாப்பு",
    navReport: "புகார் செய்",
    navSettings: "அமைப்புகள்",
    heroBadge: "மேம்பட்ட நரம்பியல் செயற்கை நுண்ணறிவு பாதுகாப்பு",
    heroTitle: "குரல் மோசடிகளுக்கு எதிரான நிகழ்நேர ",
    heroTitleSpan: "AI பாதுகாப்பு",
    heroDesc: "AI டீப்ஃபேக் ஆள்மாறாட்டங்கள், அழைப்பாளர் மோசடி மற்றும் அவசர நிதி மிரட்டல்கள் நடப்பதற்கு முன்பே அவற்றைத் தடுக்கவும். எங்களின் ராணுவத் தரம் வாய்ந்த நரம்பியல் இயந்திரம் உங்கள் பாதுகாப்பைக் கண்காணிக்கிறது.",
    heroStartBtn: "செயலில் உள்ள பாதுகாப்பு டாஷ்போர்டு",
    heroDemoBtn: "நேரடி அழைப்பு டெமோவை முயற்சிக்கவும்",
    heroNotice: "விர்ச்சுவல் சாண்ட்பாக்ஸ் உருவகப்படுத்துதலுக்கு அனுமதிகள் எதுவும் தேவையல்லை.",
    howItWorksTitle: "இது எப்படி செயல்படுகிறது",
    howItWorksStep1Title: "அழைப்பு கண்டறிதல்",
    howItWorksStep1Desc: "தெரியாத எண்களில் இருந்து வரும் அழைப்புகளை இடைமறிக்க ஹியர்ட்ரஸ்ட் உங்கள் தொலைபேசியின் டயலருடன் நேரடியாக இணைகிறது.",
    howItWorksStep2Title: "நரம்பியல் பகுப்பாய்வு",
    howItWorksStep2Desc: "எங்கள் AI செயற்கை குரல்களை ஸ்கேன் செய்கிறது மற்றும் அறியப்பட்ட மோசடி தரவுத்தளங்களுடன் பேச்சு வடிவங்களை ஒப்பிடுகிறது.",
    howItWorksStep3Title: "உடனடி தணிப்பு",
    howItWorksStep3Desc: "ஒரு மோசடி கண்டறியப்பட்டால், ஹியர்ட்ரஸ்ட் உடனடியாக உங்களை எச்சரிக்கும் மற்றும் அழைப்பை துண்டிக்க வழிகளை வழங்குகிறது.",
    howItWorksStep4Title: "பல அதிகார டெலிமெட்ரி வழித்தடம்",
    howItWorksStep4Desc: "WebSockets மற்றும் Firebase RTDB மூலம் குடும்பத்தினரின் மொபைல், காவல் நிலையம் (112 HUD இணைப்பு) அல்லது பாதுகாப்பு வார்டன் ஆகியவற்றுடன் பாதுகாப்பு தரவை இணைக்கிறது.",
    howItWorksStep5Title: "தன்னாட்சி AI சுய-குணப்படுத்தும் கேடயம்",
    howItWorksStep5Desc: "பாதுகாவலர் இல்லாத போது, தானியங்கி குரல் சவால் மூலம் அடையாள எண்ணைக் கேட்கிறது, அழைப்பைத் துண்டிக்கிறது மற்றும் அச்சுறுத்தல் பதிவை தரவுத்தளத்தில் பதிவேற்றுகிறது.",
    dashboardSafeScore: "பாதுகாப்பு மதிப்பெண்",
    dashboardOptimal: "சிறந்தது",
    dashboardConditional: "நிபனனைக்குட்பட்டது",
    dashboardDeficient: "ஆபத்தானது! அதிக ஆபத்து",
    dashboardOverallProtection: "உங்கள் ஒட்டுமொத்த பாதுகாப்பு தற்போது",
    dashboardActiveScanning: "செயலில் உள்ள ஸ்கேனிங்: 4 நிமிடங்களுக்கு முன் சரிபார்க்கப்பட்டது",
    dashboardKeypadTitle: "மோசடி அழைப்பு உருவகப்படுத்துதல் விசைப்பலகை",
    dashboardKeypadDesc: "அழைப்பு ஸ்கேனை உருவகப்படுத்த ஏதேனும் குறியீடு அல்லது தொலைபேசி எண்ணை உள்ளிடவும்:",
    dashboardKeypadGuide: "🎯 நடுவர்களுக்கான டெமோ வழிகாட்டி:",
    dashboardLaunchBtn: "குரல் இடைமறிப்பு அழைப்பைத் தொடங்கவும்",
    dashboardCoreHealth: "பாதுகாப்பு ஆரோக்கியம்",
    dashboardHealthActive: "செயலில் உள்ளது",
    dashboardHealthUpdated: "புதுப்பிக்கப்பட்டது",
    dashboardHealthSyncing: "ஒத்திசைக்கப்படுகிறது",
    dashboardRecentHistory: "சமீபத்திய பாதுகாப்பு வரலாறு",
    dashboardCallsTracked: "அழைப்புகள் கண்காணிக்கப்பட்டன",
    activeCallScenarioLabel: "செயலில் உள்ள சூழலைத் தேர்ந்தெடுக்கவும்",
    activeCallScenario1: "வங்கி மோசடி",
    activeCallScenario2: "குரல் போலி",
    activeCallScenario3: "வரி மோசடி",
    activeCallAnalyzing: "AI பகுப்பாய்வு செய்கிறது...",
    activeCallListening: "குரல் வடிவங்களை கவனிக்கிறது",
    activeCallLiveDemo: "குரல் கண்காணிப்பான்",
    activeCallMicDesc: "உள்ளூர் அச்சுறுத்தல் வகைப்பாட்டைச் சோதிக்க உங்கள் மைக்ரோஃபோனில் பேசவும்:",
    activeCallMicActive: "நேரடி மைக்ரோஃபோன் ஸ்கேன் செயலில் உள்ளது",
    activeCallMicInactive: "மைக்ரோஃபோன் துண்டிக்கப்பட்டுள்ளது",
    activeCallMicTurnOff: "மைக்கை அணைக்கவும்",
    activeCallMicTurnOn: "நேரடி மைக் ஸ்கேனைத் தொடங்கவும்",
    activeCallWhatToSay: "மைக்ரோஃபோனில் என்ன பேச வேண்டும்:",
    activeCallThreatBank: "எனக்கு உங்கள் வங்கி கணக்கு கடவுச்சொல் மற்றும் கிரெடிட் கார்டு பின் எண் தேவை.",
    activeCallThreatClone: "பாட்டி எனக்கு உதவுங்கள், விபத்து நடந்துவிட்டது, பணம் அனுப்ப வேண்டும்.",
    activeCallThreatGov: "நான் வருமான வரித் துறையிலிருந்து பேசுகிறேன், உங்களுக்கு கைது வாரண்ட் உள்ளது.",
    activeCallNormalChat: "காலை வணக்கம்! பெங்களூரில் நமது சந்திப்பை ஏற்பாடு செய்வோம்.",
    activeCallSandboxNotice: "🛡️ சாண்ட்பாக்ஸ் பாதுகாப்பு: இந்த முறையில் போலீஸ் அல்லது அவசர சேவைகள் எதுவும் தூண்டப்படாது.",
    activeCallRiskGauge: "மோசடி ஆபத்து அளவு",
    activeCallDeepfakeAudit: "டீப்ஃபேக் தணிக்கை",
    activeCallTranscriptTitle: "நேரடி பேச்சு உரை",
    activeCallRecording: "நேரடி பதிவு",
    activeCallMute: "ஒலி அடக்கு",
    activeCallMuted: "ஒலி அடக்கப்பட்டது",
    activeCallEnd: "அழைப்பை முடி",
    activeCallRecord: "பதிவு செய்",
    activeCallRecordingActive: "பதிவு செய்யப்படுகிறது",
    activeCallInjectTitle: "நிகழ்நேர பேச்சு உள்ளீடு",
    activeCallInjectDesc: "மிரட்டல் வாக்கியங்களை தட்டச்சு செய்து அல்லது கிளிக் செய்து அழைப்பாளர் பேசுவதை உருவகப்படுத்தவும்:",
    activeCallInjectLabelQuick: "விரைவான மிரட்டல் வாக்கியங்கள்:",
    activeCallInjectLabelType: "அழைப்பாளருக்கான வாக்கியத்தை தட்டச்சு செய்யவும்:",
    activeCallInjectPlaceholder: "எ.கா. உங்கள் வங்கி பின் குறியீட்டை கொடுங்கள்...",
    activeCallInjectBtn: "பேச்சை உள்ளீடு செய்",
    activeCallInjectNote: "\"பின்\", \"கடவுச்சொல்\", \"வங்கி\", \"கைது\", \"வழக்கு\", \"பாட்டி\", \"மிரட்டல்\" போன்ற வார்த்தைகளைப் பயன்படுத்தவும்.",
    womenSafetyTitle: "பெண்கள் பாதுகாப்பு மையம்",
    womenSafetyBadge: "மிரட்டல் மற்றும் துன்புறுத்தல் தடுப்பு",
    womenSafetyDesc: "துன்புறுத்தல் அல்லது புகைப்படங்கள் வெளியிடும் மிரட்டல்களை எதிர்கொள்ளும் பெண்களுக்கான அவசர பாதுகாப்பு வழிமுறைகளின் டெமோ.",
    womenSafetySelectScenario: "ஆபத்து உருவகப்படுத்துதலைத் தேர்ந்தெடுக்கவும்",
    womenSafetyLaunchBtn: "செயலில் உள்ள பாதுகாப்பு முறையைத் தொடங்கவும்",
    womenSafetyThreatDetected: "ஆபத்து கண்டறியப்பட்டது",
    womenSafetyStressIndex: "குரல் மன அழுத்த குறியீடு",
    womenSafetyDefenseMatrix: "🚨 அவசரகால பாதுகாப்பு கருவிகள் (நேரடி)",
    womenSafetySOSBtn: "போலீசாருக்கு உடனடி தகவல் அனுப்பவும் (SOS)",
    womenSafetyPoliceDispatched: "போலீஸ் அனுப்பப்பட்டது",
    womenSafetyGpsBroadcast: "GPS நேரடி ஒளிபரப்பு",
    womenSafetyDeterrentsTitle: "🔊 அவசரகால ஒலி எமுலேட்டர்",
    womenSafetyDeterrentsDesc: "துன்புறுத்துபவர்களை திசைதிருப்ப செயற்கையான குரல்கள் அல்லது ஒலிகளை ஒலிக்கச் செய்கிறது.",
    womenSafetyDeterrentDoorbell: "அழைப்பு மணியை ஒலிக்க செய்",
    womenSafetyDeterrentDog: "நாய் குரைப்பதை ஒலிக்க செய்",
    womenSafetyDeterrentMale: "ஆண் குரலை ஒலிக்க செய்",
    womenSafetyStealthTitle: "மறைமுகத் திரை காமஃபிளாஜ்",
    womenSafetyStealthDesc: "தொலைபேசி பூட்டப்பட்டிருப்பதாகக் காட்ட திரையை கருமையாக்குகிறது, ஆனால் பின்னணியில் ரெக்கார்டிங் மற்றும் ஜி.பி.எஸ் தொடர்ந்து இயங்கும்.",
    womenSafetyStealthBtn: "மறைமுகத் திரையை இயக்கு",
    womenSafetyStealthOverlay: "மறைமுகத் திரையை அணைக்க எங்கு வேண்டுமானாலும் தட்டவும்",
    reportTitle: "மோசடி புகார் செய்",
    reportDesc: "உங்கள் புகார் பல முதியவர்களையும் குடும்பங்களையும் காப்பாற்றும். அனைத்து புகார்களும் அநாமதேயமாக்கப்பட்டு பாதுகாப்பாகப் பகிரப்படும்.",
    reportPrivacyTitle: "ராணுவத் தர பாதுகாப்பு உறுதி",
    reportPrivacyDesc: "உங்கள் தனிப்பட்ட விவரங்களைப் பாதுகாக்க AES-256 உள்ளூர் குறியாக்கத்தைப் பயன்படுத்துகிறோம்.",
    reportLabelPhone: "சந்தேகத்திற்குரிய தொலைபேசி எண்",
    reportLabelMedium: "அழைப்பு ஊடகம்",
    reportMediumVoice: "குரல் அழைப்பு",
    reportMediumWhatsapp: "வாட்ஸ்அப்",
    reportMediumSms: "முறிஞ்செய்தி (SMS)",
    reportMediumOther: "இதர ஊடகங்கள்",
    reportLabelContext: "விவரங்கள்",
    reportPlaceholderContext: "என்ன மோசடி மிரட்டல் விடுக்கப்பட்டது? (எ.கா. கைது செய்யப்போவதாக கூறி பரிசு அட்டைகள் கேட்டனர்...)",
    reportLabelUpload: "ஆடியோ பதிவை பதிவேற்றவும் (விருப்பத்தேர்வு)",
    reportUploadHint: "ஆதரவு வடிவங்கள்: MP3, WAV, அல்லது AAC (அதிகபட்சம் 10MB)",
    reportSubmitBtn: "பாதுகாப்பான புகாரைச் சமர்ப்பிக்கவும்",
    reportSuccessTitle: "புகார் சமர்ப்பிக்கப்பட்டது",
    reportSuccessDesc: "சமூகப் பாதுகாப்பிற்கு பங்களித்தமைக்கு நன்றி! எங்கள் பாதுகாப்பு நெட்வொர்க் மோசடி எண்களின் பட்டியலைப் புதுப்பித்துள்ளது.",
    reportSuccessBtn: "டாஷ்போர்டுக்குத் திரும்பு",
    settingsTitle: "கணினி அமைப்புகள்",
    settingsDesc: "உள்ளூர் நரம்பியல் இயந்திரத்தின் உணர்திறன் மற்றும் கிளவுட் ஒத்திசைவு அமைப்புகளை இங்கே கட்டமைக்கலாம்.",
    settingsNeuralConfig: "நரம்பியல் இயந்திர கட்டமைப்பு",
    settingsNeuralToggle: "சாதனத்திலேயே ஒலி பகுப்பாய்வு",
    settingsNeuralToggleDesc: "உள்ளூர் அதிர்வெண் கண்டறிதலை செயல்படுத்துகிறது (Edge AI).",
    settingsSensitivity: "எச்சரிக்கை தூண்டுதல் உணர்திறன்",
    settingsSensitivityDesc: "செயற்கை எச்சரிக்கைகள் வெளியிடப்படும் ஆபத்து அளவை சரிசெய்கிறது.",
    settingsPrivacyHeader: "தனியுரிமை & தொடர்புகள்",
    settingsPrivacyToggle: "உலகளாவிய அச்சுறுத்தல் வரைபட ஒத்திசைவு",
    settingsPrivacyToggleDesc: "உலகளாவிய பாதுகாப்பை வலுப்படுத்த கண்டறியப்பட்ட வடிவங்களை அநாமதேயமாக ஒத்திசைக்கிறது.",
    settingsMaintenance: "தரவுத்தள பராமரிப்பு",
    settingsClearHistoryBtn: "சமீபத்திய வரலாற்றை அழி",
    settingsResetDatabaseBtn: "உருவகப்படுத்துதல் தரவுத்தளத்தை மீட்டமை",
    settingsLogoutBtn: "பாதுகாப்பு சுயவிவரத்திலிருந்து வெளியேறு",
    settingsDatabaseSync: "கணினி தரவுத்தளம் வெற்றிகரமாக ஒத்திசைக்கப்பட்டது.",
    historyTitle: "பாதுகாப்பு வரலாற்றுப் பதிவுகள்",
    historyDesc: "செயலில் உள்ள பாதுகாப்பு முறையினால் கண்காணிக்கப்பட்ட அனைத்து அழைப்புகளின் விவரங்களையும் உரைப்பதிவுகளையும் ஆராயுங்கள்.",
    historyNoLogs: "பாதுகாக்கப்பட்ட அழைப்புகள் எதுவும் இல்லை",
    historyNoLogsDesc: "வரலாற்றுப் பட்டியலை நிரப்ப மோசடி அழைப்பு உருவகப்படுத்துதலைத் தொடங்கவும் அல்லது புகார்களைச் சமர்ப்பிக்கவும்.",
    historyInitiateBtn: "அழைப்பு உருவகப்படுத்துதலைத் தொடங்குக",
    onboardingCtaTitle: "இன்றே உங்கள் குரலைப் பாதுகாத்திடுங்கள்",
    onboardingCtaDesc: "குரல் நகல் மோசடியில் இருந்து தங்கள் தொலைபேசி அழைப்புகளைப் பாதுகாக்க ஹியர்ட்ரஸ்ட்டை நம்பும் 50,000+ செயலில் உள்ள பயனர்களுடன் இணையுங்கள்.",
    onboardingCtaBtn: "இப்போதே பாதுகாப்பு பெற்றிடுங்கள்",
    featuresTitle: "முக்கிய பாதுகாப்பு அம்சங்கள்",
    features1Title: "டீப்ஃபேக் கண்டறிதல்",
    features1Desc: "99.9% நிகழ்நேர துல்லியத்துடன் AI-உருவாக்கிய அல்லது நகலெடுக்கப்பட்ட குரல்களைக் கண்டறிய மேம்பட்ட ஒலி பகுப்பாய்வு.",
    features2Title: "பன்மொழி ஆதரவு",
    features2Desc: "தமிழ், ஆங்கிலம், மலையாளம், இந்தி மற்றும் தெலுங்கு மொழிகளில் செயலில் உள்ள மோசடி பாதுகாப்பு.",
    features3Title: "தனியுரிமை சார்ந்த எட்ஜ் AI",
    features3Desc: "அனைத்து ஆடியோ பகுப்பாய்வுகளும் உங்கள் சாதனத்திலேயே உள்ளூரில் நடக்கும். நாங்கள் உங்கள் அழைப்புத் தரவைச் சேமிப்பதோ பரப்புவதோ இல்லை."
  },
  ml: {
    navProtect: "സുരക്ഷ",
    navHistory: "ചരിത്രം",
    navWomenSafe: "സ്ത്രീ സുരക്ഷ",
    navReport: "റിപ്പോർട്ട്",
    navSettings: "ക്രമീകരണങ്ങൾ",
    heroBadge: "അഡ്വാൻസ്ഡ് ന്യൂറൽ AI സുരക്ഷ",
    heroTitle: "ഫോൺ തട്ടിപ്പുകൾക്കെതിരെ തത്സമയ ",
    heroTitleSpan: "AI സംരക്ഷണം",
    heroDesc: "ശബ്ദ അനുകരണങ്ങളും ഫോൺ തട്ടിപ്പുകളും സാമ്പത്തിക ഭീഷണികളും ഉണ്ടാകുന്നതിന് മുൻപ് തന്നെ തടയുക. ഞങ്ങളുടെ അത്യാധുനിക ന്യൂറൽ എൻജിൻ നിങ്ങളുടെ സുരക്ഷ ഉറപ്പാക്കുന്നു.",
    heroStartBtn: "സുരക്ഷാ ഡാഷ്‌ബോർഡ് തുറക്കുക",
    heroDemoBtn: "ലൈവ് കോൾ ഡെമോ പരീക്ഷിക്കുക",
    heroNotice: "🔒 സാൻഡ്‌ബോക്‌സ് ഡെമോയ്ക്ക് പ്രത്യേക അനുമതികൾ ആവശ്യമില്ല.",
    howItWorksTitle: "പ്രവർത്തന രീതി",
    howItWorksStep1Title: "விளിക്കുന്നയാളെ തിരിച്ചറിയൽ",
    howItWorksStep1Desc: "അപരിചിതമായ നമ്പറുകളിൽ നിന്നുള്ള കോളുകൾ തത്സമയം നിരീക്ഷിക്കാൻ ഹിയർട്രസ്റ്റ് ഫോൺ ഡയലറുമായി നേരിട്ട് ബന്ധിപ്പിക്കുന്നു.",
    howItWorksStep2Title: "Neural Analysis",
    howItWorksStep2Desc: "ഞങ്ങളുടെ AI ശബ്ദത്തിലെ കൃത്രിമത്വം കണ്ടെത്തുകയും തട്ടിപ്പ് ഡാറ്റാബേസുകളുമായി ഒത്തുനോക്കുകയും ചെയ്യുന്നു.",
    howItWorksStep3Title: "Instant Mitigation",
    howItWorksStep3Desc: "തട്ടിപ്പ് കണ്ടെത്തിയാൽ ഹിയർട്രസ്റ്റ് ഉടൻ മുന്നറിയിപ്പ് നൽകുകയും കോൾ വിച്ഛേദിക്കാൻ സഹായിക്കുകയും ചെയ്യുന്നു.",
    howItWorksStep4Title: "മൾട്ടി-അതോറിറ്റി ടെലിമെട്രി റൂട്ടിംഗ്",
    howItWorksStep4Desc: "WebSockets, Firebase RTDB എന്നിവ വഴി കുടുംബാംഗങ്ങൾ, പോലീസ് സ്റ്റേഷൻ (112 HUD ലിങ്ക്) അല്ലെങ്കിൽ സെക്യൂരിറ്റി വാർഡൻ എന്നിവരിലേക്ക് തത്സമയ സുരക്ഷാ ഡാറ്റ എത്തിക്കുന്നു.",
    howItWorksStep5Title: "സ്വയം പ്രവർത്തിക്കുന്ന AI പ്രതിരോധ ഷീൽഡ്",
    howItWorksStep5Desc: "ഗാർഡിയൻ ലഭ്യമല്ലാത്തപ്പോൾ, ഒരു ഓട്ടോമേറ്റഡ് വോയ്സ് ബോട്ട് വഴി വെരിഫിക്കേഷൻ കോഡ് ആവശ്യപ്പെടുന്നു, കോൾ വിച്ഛേദിക്കുന്നു, ഒപ്പം പോലീസ് ഡാറ്റാബേസിലേക്ക് റിപ്പോർട്ട് സമർപ്പിക്കുന്നു.",
    dashboardSafeScore: "സുരക്ഷാ സ്കോർ",
    dashboardOptimal: "മികച്ചത്",
    dashboardConditional: "പരിമിതം",
    dashboardDeficient: "അപകടകരം! ഉയർന്ന റിസ്ക്",
    dashboardOverallProtection: "നിങ്ങളുടെ മൊത്തത്തിലുള്ള സുരക്ഷ നിലവിൽ",
    dashboardActiveScanning: "തത്സമയ സ്കാനിംഗ് സജീവമാണ്",
    dashboardKeypadTitle: "മോക്ക് കോൾ ഡയലർ കീപാഡ്",
    dashboardKeypadDesc: "സ്കാനിംഗ് പരിശോധിക്കാൻ ഒരു കോഡ് അല്ലെങ്കിൽ ഫോൺ നമ്പർ ഡയൽ ചെയ്യുക:",
    dashboardKeypadGuide: "🎯 ജഡ്ജസ് ഡെമോ ഗൈഡ്:",
    dashboardLaunchBtn: "ശബ്ദ സ്കാൻ കോൾ ആരംഭിക്കുക",
    dashboardCoreHealth: "സിസ്റ്റം ആരോഗ്യനില",
    dashboardHealthActive: "സജീവം",
    dashboardHealthUpdated: "അപ്ഡേറ്റ് ചെയ്തത്",
    dashboardHealthSyncing: "സിങ്ക് ചെയ്യുന്നു",
    dashboardRecentHistory: "സമീപകാല സുരക്ഷാ ചരിത്രം",
    dashboardCallsTracked: "വിളികൾ നിരീക്ഷിച്ചു",
    activeCallScenarioLabel: "കോൾ സാഹചര്യം തിരഞ്ഞെടുക്കുക",
    activeCallScenario1: "ബാങ്ക് തട്ടിപ്പ്",
    activeCallScenario2: "ശബ്ദ അനുകരണം",
    activeCallScenario3: "നികുതി തട്ടിപ്പ്",
    activeCallAnalyzing: "AI വിശകലനം ചെയ്യുന്നു...",
    activeCallListening: "ശബ്ദ പാറ്റേണുകൾ ശ്രദ്ധിക്കുന്നു",
    activeCallLiveDemo: "വോയ്സ് ഇന്റർസെപ്റ്റർ",
    activeCallMicDesc: "ഭീഷണി പാറ്റേണുകൾ പരിശോധിക്കാൻ മൈക്രോഫോണിൽ സംസാരിക്കുക:",
    activeCallMicActive: "🔴 ലൈവ് മൈക്ക് സ്കാൻ സജീവമാണ്",
    activeCallMicInactive: "⚪ മൈക്ക് കണക്ഷൻ വിച്ഛേദിക്കപ്പെട്ടു",
    activeCallMicTurnOff: "മൈക്ക് ഓഫ് ചെയ്യുക",
    activeCallMicTurnOn: "ലൈവ് മൈക്ക് സ്കാൻ തുടങ്ങുക",
    activeCallWhatToSay: "🇮🇳 മൈക്കിൽ പറയേണ്ട കാര്യങ്ങൾ:",
    activeCallThreatBank: "എനിക്ക് നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ട് പാസ്‌വേഡും കാർഡ് പിൻ നമ്പറും ആവശ്യമുണ്ട്.",
    activeCallThreatClone: "അമ്മൂമ്മേ എന്നെ സഹായിക്കൂ, എനിക്ക് അപകടം പറ്റി, പണം അയക്കണം.",
    activeCallThreatGov: "ഞാൻ ടാക്സ് ഓഫീസിൽ നിന്നാണ് വിളിക്കുന്നത്, നിങ്ങൾക്ക് അറസ്റ്റ് വാറണ്ട് ഉണ്ട്.",
    activeCallNormalChat: "സുപ്രഭാതം! നമുക്ക് ബാംഗ്ലൂരിൽ കൂടിക്കാഴ്ച ഏർപ്പാടാക്കാം.",
    activeCallSandboxNotice: "🛡️ സാൻഡ്‌ബോക്‌സ് സുരക്ഷ: ഈ മോഡിൽ പോലീസ് സഹായം നേരിട്ട് ലഭ്യമല്ല.",
    activeCallRiskGauge: "തട്ടിപ്പ് സാധ്യത നില",
    activeCallDeepfakeAudit: "ഡീപ്ഫേക്ക് പരിശോധന",
    activeCallTranscriptTitle: "സംഭാഷണം",
    activeCallRecording: "ലൈവ് റെക്കോർഡിംഗ്",
    activeCallMute: "ശബ്ദം നിശബ്ദമാക്കുക",
    activeCallMuted: "നിശബ്ദമാക്കി",
    activeCallEnd: "കോൾ അവസാനിപ്പിക്കുക",
    activeCallRecord: "റെക്കോർഡ്",
    activeCallRecordingActive: "റെക്കോർഡിംഗ്",
    activeCallInjectTitle: "ലൈവ് സ്പീച്ച് ഇഞ്ചക്റ്റർ",
    activeCallInjectDesc: "അപരന്റെ സംഭാഷണം അനുകരിക്കാൻ താഴെയുള്ള വാക്യങ്ങൾ ഉപയോഗിക്കുക:",
    activeCallInjectLabelQuick: "പെട്ടെന്നുള്ള ഭീഷണി വാക്യങ്ങൾ:",
    activeCallInjectLabelType: "പറയേണ്ട വാചകം ടൈപ്പ് ചെയ്യുക:",
    activeCallInjectPlaceholder: "ഉദാഹരണത്തിന്: നിങ്ങളുടെ പിൻ നമ്പർ തരിക...",
    activeCallInjectBtn: "സ്പീച്ച് ചേർക്കുക",
    activeCallInjectNote: "\"പിൻ\", \"പാസ്‌വേഡ്\", \"ബാങ്ക്\", \"അറസ്റ്റ്\", \"വാറണ്ട്\", \"പണം\" തുടങ്ങിയ വാക്കുകൾ പരീക്ഷിക്കുക.",
    womenSafetyTitle: "സ്ത്രീ സുരക്ഷാ പോർട്ടൽ",
    womenSafetyBadge: "ബ്ലാക്ക്മെയിൽ & ഹരാസ്‌മെന്റ് പ്രതിരോധം",
    womenSafetyDesc: "ഭീഷണികളും ബ്ലാക്ക്മെയിലുകളും നേരിടുന്ന സ്ത്രീകൾക്കായുള്ള അത്യാധുനിക സുരക്ഷാ സിമുലേറ്റർ.",
    womenSafetySelectScenario: "ഭീഷണി സാഹചര്യം തിരഞ്ഞെടുക്കുക",
    womenSafetyLaunchBtn: "ക്രൈസിസ് പ്രൊട്ടക്ഷൻ ആരംഭിക്കുക",
    womenSafetyThreatDetected: "ഭീഷണി കണ്ടെത്തി",
    womenSafetyStressIndex: "ശബ്ദ സമ്മർദ്ദം",
    womenSafetyDefenseMatrix: "🚨 തത്സമയ പ്രതിരോധ ഉപകരണങ്ങൾ",
    womenSafetySOSBtn: "പോലീസിനെ ഉടൻ വിവരം അറിയിക്കുക (SOS)",
    womenSafetyPoliceDispatched: "പോലീസ് സഹായം അയച്ചു",
    womenSafetyGpsBroadcast: "ജി.പി.എസ് തത്സമയം ലഭ്യമാണ്",
    womenSafetyDeterrentsTitle: "🔊 പ്രത്യാക്രമണ ശബ്ദങ്ങൾ",
    womenSafetyDeterrentsDesc: "വിളിക്കുന്നയാളെ പരിഭ്രാന്തനാക്കാൻ വിവിധ ശബ്ദങ്ങൾ കൃത്രിമമായി കേൾപ്പിക്കുന്നു.",
    womenSafetyDeterrentDoorbell: "ഡോർബെൽ മുഴക്കുക",
    womenSafetyDeterrentDog: "കാവൽ നായയുടെ ശബ്ദം",
    womenSafetyDeterrentMale: "പുരുഷ ശബ്ദം",
    womenSafetyStealthTitle: "നിശബ്ദ സ്ക്രീൻ മാസ്ക്",
    womenSafetyStealthDesc: "ഫോൺ ലോക്ക് ആണെന്ന് തോന്നിപ്പിക്കാൻ സ്ക്രീൻ പൂർണ്ണമായും കറുപ്പിക്കുന്നു. റെക്കോർഡിംഗ് തുടരും.",
    womenSafetyStealthBtn: "സ്റ്റെൽത്ത് സ്ക്രീൻ ഓൺ ചെയ്യുക",
    womenSafetyStealthOverlay: "സാധാരണ സ്ക്രീനിലേക്ക് മടങ്ങാൻ എവിടെയെങ്കിലും തൊടുക",
    reportTitle: "തട്ടിപ്പ് റിപ്പോർട്ട് ചെയ്യുക",
    reportDesc: "നിങ്ങളുടെ റിപ്പോർട്ട് മറ്റുള്ളവർക്ക് സുരക്ഷയേകും. എല്ലാ വിവരങ്ങളും അതീവ രഹസ്യമായി സൂക്ഷിക്കും.",
    reportPrivacyTitle: "സുരക്ഷയും സ്വകാര്യതയും",
    reportPrivacyDesc: "വിവരങ്ങൾ സുരക്ഷിതമാക്കാൻ ഞങ്ങൾ AES-256 എൻക്രിപ്ഷൻ ഉപയോഗിക്കുന്നു.",
    reportLabelPhone: "സംശയമുള്ള ഫോൺ നമ്പർ",
    reportLabelMedium: "കോൾ മീഡിയം",
    reportMediumVoice: "ശബ്ദ കോൾ",
    reportMediumWhatsapp: "വാട്സാപ്പ്",
    reportMediumSms: "എസ്.എം.എസ് (SMS)",
    reportMediumOther: "മറ്റു ചാനലുകൾ",
    reportLabelContext: "തട്ടിപ്പ് വിവരങ്ങൾ",
    reportPlaceholderContext: "അവർ എന്താണ് പറഞ്ഞത്? (ഉദാഹരണത്തിന്: അറസ്റ്റ് ഭീഷണിപ്പെടുത്തി പണം ആവശ്യപ്പെട്ടു...)",
    reportLabelUpload: "ഓഡിയോ റെക്കോർഡിംഗ് അപ്‌ലോഡ് ചെയ്യുക (ഓപ്ഷണൽ)",
    reportUploadHint: "പിന്തുണയ്ക്കുന്നവ: MP3, WAV, AAC (പരമാവധി 10MB)",
    reportSubmitBtn: "റിപ്പോർട്ട് സമർപ്പിക്കുക",
    reportSuccessTitle: "റിപ്പോർട്ട് വിജയകരം",
    reportSuccessDesc: "സഹായത്തിന് നന്ദി! ഞങ്ങളുടെ സിസ്റ്റം ഈ നമ്പർ തട്ടിപ്പ് ഡാറ്റാബേസിലേക്ക് ചേർത്തു.",
    reportSuccessBtn: "ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക",
    settingsTitle: "ക്രമീകരണങ്ങൾ",
    settingsDesc: "സുരക്ഷാ എൻജിന്റെ സെൻസിറ്റിവിറ്റിയും ക്ലൗഡ് സമന്വയവും ഇവിടെ ക്രമീകരിക്കാം.",
    settingsNeuralConfig: "ന്യൂറൽ എൻജിൻ ക്രമീകരണം",
    settingsNeuralToggle: "ഓൺ-ഡിവൈസ് വോയ്സ് സ്കാനിംഗ്",
    settingsNeuralToggleDesc: "ഫോണിൽ തന്നെ ശബ്ദ വിശകലനം നടത്തുന്നു (Edge AI).",
    settingsSensitivity: "അലേർട്ട് സെൻസിറ്റിവിറ്റി",
    settingsSensitivityDesc: "എത്ര ശതമാനം റിസ്ക് ഉണ്ടായാൽ മുന്നറിയിപ്പ് തരണമെന്ന് നിശ്ചയിക്കുന്നു.",
    settingsPrivacyHeader: "സ്വകാര്യത",
    settingsPrivacyToggle: "ഗ്ലോബൽ അലേർട്ട് സിൻക്",
    settingsPrivacyToggleDesc: "തട്ടിപ്പ് കണ്ടെത്തലുകൾ അജ്ഞാതമായി ക്ലൗഡിലേക്ക് അപ്‌ലോഡ് ചെയ്യുക.",
    settingsMaintenance: "ഡാറ്റാബേസ് പരിപാലനം",
    settingsClearHistoryBtn: "ചരിത്രം ഇല്ലാതാക്കുക",
    settingsResetDatabaseBtn: "സിസ്റ്റം റീസെറ്റ് ചെയ്യുക",
    settingsLogoutBtn: "പ്രൊഫൈലിൽ നിന്ന് ലോഗൗട്ട് ചെയ്യുക",
    settingsDatabaseSync: "സിസ്റ്റം ഡാറ്റാബേസ് വിജയകരമായി സിങ്ക് ചെയ്തു.",
    historyTitle: "സുരക്ഷാ ചരിത്രരേഖകൾ",
    historyDesc: "ആക്റ്റീവ് ഗാർഡ് നിരീക്ഷിച്ച എല്ലാ കോളുകളുടെയും വിവരങ്ങളും ശബ്ദലേഖനങ്ങളും പരിശോധിക്കുക.",
    historyNoLogs: "വിവരങ്ങൾ ലഭ്യമല്ല",
    historyNoLogsDesc: "സിമുലേറ്റർ കോളുകൾ ആരംഭിക്കുകയോ തട്ടിപ്പ് റിപ്പോർട്ട് സമർപ്പിക്കുകയോ ചെയ്യുക.",
    historyInitiateBtn: "സിമുലേറ്റർ കോൾ ആരംഭിക്കുക",
    onboardingCtaTitle: "ഇന്നേ നിങ്ങളുടെ ശബ്ദം സുരക്ഷിതമാക്കൂ",
    onboardingCtaDesc: "വോയ്സ് ക്ലോൺ തട്ടിപ്പുകളിൽ നിന്ന് തങ്ങളുടെ ഫോൺ കോളുകളെ സംരക്ഷിക്കാൻ ഹിയർട്രസ്റ്റിനെ വിശ്വസിക്കുന്ന 50,000+ സജീവ ഉപയോക്താക്കൾക്കൊപ്പം ചേരൂ.",
    onboardingCtaBtn: "ഇപ്പോൾ തന്നെ സംരക്ഷണം നേടൂ",
    featuresTitle: "പ്രധാന സുരക്ഷാ ഫീച്ചറുകൾ",
    features1Title: "ഡീപ്ഫേക്ക് കണ്ടെത്തൽ",
    features1Desc: "99.9% തത്സമയ പാറ്റേൺ കൃത്യതയോടെ AI നിർമ്മിത അല്ലെങ്കിൽ ക്ലോൺ ചെയ്ത ശബ്ദങ്ങളെ തിരിച്ചറിയാൻ വിപുലമായ ശബ്ദ വിശകലനം.",
    features2Title: "ബഹുഭാഷാ പിന്തുണ",
    features2Desc: "തമിഴ്, ഇംഗ്ലീഷ്, മലയാളം, ഹിന്ദി, തെലുങ്ക് ഭാഷകളിൽ തത്സമയ സ്കാം സംരക്ഷണം ലഭ്യമാണ്.",
    features3Title: "സ്വകാര്യതയ്ക്കും മുൻഗണന നൽകുന്ന എഡ്ജ് AI",
    features3Desc: "എല്ലാ ഓഡിയോ വിശകലനങ്ങളും നിങ്ങളുടെ ഫോണിൽ തന്നെ പ്രാദേശികമായി നടക്കുന്നു. ഞങ്ങൾ നിങ്ങളുടെ ഡാറ്റ സൂക്ഷിക്കുകയോ കൈമാറുകയോ ചെയ്യുന്നില്ല."
  },
  hi: {
    navProtect: "सुरक्षा",
    navHistory: "इतिहास",
    navWomenSafe: "महिला सुरक्षा",
    navReport: "रिपोर्ट करें",
    navSettings: "सेटिंग्स",
    heroBadge: "उन्नत तंत्रिका एआई सुरक्षा",
    heroTitle: "वॉयस स्कैम के खिलाफ वास्तविक समय ",
    heroTitleSpan: "AI सुरक्षा",
    heroDesc: "एआई डीपफेक प्रतिरूपण, कॉलर धोखाधड़ी और आपातकालीन वित्तीय जबरन वसूली को होने से पहले रोकें। हमारा सैन्य-ग्रेड स्थानीय तंत्रिका इंजन लगातार आपकी सुरक्षा की निगरानी करता है।",
    heroStartBtn: "सक्रिय सुरक्षा डैशबोर्ड खोलें",
    heroDemoBtn: "लाइव कॉल डेमो आज़माएं",
    heroNotice: "🔒 बुनियादी सैंडबॉक्स सिमुलेशन के लिए किसी अनुमति की आवश्यकता नहीं है।",
    howItWorksTitle: "यह कैसे काम करता है",
    howItWorksStep1Title: "कॉल पहचान",
    howItWorksStep1Desc: "अज्ञात नंबरों से आने वाली कॉल को रोकने के लिए हियरट्रस्ट सीधे आपके फोन डायलर से एकीकृत होता है।",
    howItWorksStep2Title: "न्यूरल विश्लेषण",
    howItWorksStep2Desc: "हमारा एआई कृत्रिम आवाज की पहचान के लिए वॉयस सिग्नेचर को स्कैन करता है और ज्ञात स्कैम डेटाबेस से इसकी तुलना करता है।",
    howItWorksStep3Title: "त्वरित निवारण",
    howItWorksStep3Desc: "यदि कोई घोटाला पाया जाता है, तो हियरट्रस्ट आपको तुरंत सचेत करता है और कॉल को समाप्त करने के विकल्प प्रदान करता है।",
    howItWorksStep4Title: "बहु-प्राधिकरण टेलीमेट्री रूटिंग",
    howItWorksStep4Desc: "WebSockets और Firebase RTDB पुलों का उपयोग करके सुरक्षा डेटा को परिवार के सदस्यों, स्थानीय पुलिस स्टेशन (112 HUD लिंक) या सुरक्षा वार्डन से जोड़ता है।",
    howItWorksStep5Title: "स्वायत्त AI स्व-उपचार शील्ड",
    howItWorksStep5Desc: "अभिभावक के अनुपलब्ध होने पर, एक स्वचालित वॉयस बॉट सुरक्षा चुनौती शुरू करता है, कॉल को स्थानीय स्तर पर काटता है, और पुलिस डेटाबेस में रिपोर्ट दर्ज करता है।",
    dashboardSafeScore: "सुरक्षा स्कोर",
    dashboardOptimal: "उत्कृष्ट",
    dashboardConditional: "संतोषजनक",
    dashboardDeficient: "असुरक्षित! उच्च जोखिम",
    dashboardOverallProtection: "आपकी समग्र सुरक्षा वर्तमान में",
    dashboardActiveScanning: "सक्रिय स्कैनिंग: 4 मिनट पहले जांचा गया",
    dashboardKeypadTitle: "सैंडबॉक्स डायलर कीपैड",
    dashboardKeypadDesc: "कॉल स्कैन का अनुकरण करने के लिए कोई भी स्पीड-डायल कोड या फोन नंबर दर्ज करें:",
    dashboardKeypadGuide: "🎯 निर्णायकों के लिए डेमो गाइड:",
    dashboardLaunchBtn: "वॉयस इंटरसेप्ट कॉल शुरू करें",
    dashboardCoreHealth: "सुरक्षा स्वास्थ्य",
    dashboardHealthActive: "सक्रिय",
    dashboardHealthUpdated: "अपडेटेड",
    dashboardHealthSyncing: "सिंक हो रहा है",
    dashboardRecentHistory: "हालिया सुरक्षा इतिहास",
    dashboardCallsTracked: "कॉल ट्रैक किए गए",
    activeCallScenarioLabel: "सक्रिय परिदृश्य संदर्भ चुनें",
    activeCallScenario1: "बैंक धोखाधड़ी",
    activeCallScenario2: "आवाज की नकल",
    activeCallScenario3: "टैक्स स्कैम",
    activeCallAnalyzing: "एआई विश्लेषण कर रहा है...",
    activeCallListening: "पैटर्न सुन रहा है",
    activeCallLiveDemo: "वॉयस इंटरसेप्टर",
    activeCallMicDesc: "जोखिम वर्गीकरण का परीक्षण करने के लिए अपने माइक्रोफ़ोन में बोलें:",
    activeCallMicActive: "🔴 लाइव माइक स्कैन सक्रिय है",
    activeCallMicInactive: "⚪ माइक कनेक्शन डिस्कनेक्ट हो गया है",
    activeCallMicTurnOff: "माइक बंद करें",
    activeCallMicTurnOn: "लाइव माइक स्कैन शुरू करें",
    activeCallWhatToSay: "🇮🇳 माइक्रोफ़ोन में क्या बोलना है:",
    activeCallThreatBank: "मुझे आपके ऑनलाइन खाते का पासवर्ड और क्रेडिट कार्ड पिन नंबर चाहिए।",
    activeCallThreatClone: "दादी मेरी मदद करो, कार दुर्घटना हो गई है, तुरंत पैसे भेजने होंगे।",
    activeCallThreatGov: "मैं आयकर विभाग से बोल रहा हूँ, आपके खिलाफ अरेस्ट वारंट जारी हुआ है।",
    activeCallNormalChat: "शुभ प्रभात! आइए बेंगलुरु में अपनी बैठक की व्यवस्था करें।",
    activeCallSandboxNotice: "🛡️ सैंडबॉक्स सुरक्षा: इस मोड में कोई पुलिस या आपातकालीन सेवा सक्रिय नहीं होगी।",
    activeCallRiskGauge: "घोटाला जोखिम दर",
    activeCallDeepfakeAudit: "डीपफेक ऑडिट",
    activeCallTranscriptTitle: "लाइव बातचीत प्रतिलेख",
    activeCallRecording: "लाइव रिकॉर्डिंग",
    activeCallMute: "म्यूट",
    activeCallMuted: "म्यूट किया गया",
    activeCallEnd: "कॉल समाप्त करें",
    activeCallRecord: "रिकॉर्ड करें",
    activeCallRecordingActive: "रिकॉर्डिंग",
    activeCallInjectTitle: "लाइव स्पीच इंजेक्टर",
    activeCallInjectDesc: "संदिग्ध वाक्य टाइप करके या क्लिक करके कॉलर की बातचीत का अनुकरण करें:",
    activeCallInjectLabelQuick: "त्वरित संदिग्ध वाक्य:",
    activeCallInjectLabelType: "कॉलर के लिए एक वाक्य टाइप करें:",
    activeCallInjectPlaceholder: "जैसे: मुझे अपना बैंक पिन कोड दें...",
    activeCallInjectBtn: "स्पीच इंजेक्ट करें",
    activeCallInjectNote: "\"पिन\", \"पासवर्ड\", \"बैंक\", \"गिरफ्तार\", \"वारंट\", \"दादी\", \"पैसा\" जैसे शब्दों का प्रयोग करें।",
    womenSafetyTitle: "महिला सुरक्षा पोर्टल",
    womenSafetyBadge: "ब्लैकमेल और उत्पीड़न निवारण",
    womenSafetyDesc: "ब्लैकमेल, धमकी या उत्पीड़न का सामना करने वाली महिलाओं के लिए आपातकालीन सुरक्षा उपकरणों का सिमुलेशन।",
    womenSafetySelectScenario: "परीक्षण के लिए खतरा परिदृश्य चुनें",
    womenSafetyLaunchBtn: "सक्रिय संकट सुरक्षा मोड शुरू करें",
    womenSafetyThreatDetected: "संकट खतरा पाया गया",
    womenSafetyStressIndex: "शब्दात्मक तनाव सूचकांक",
    womenSafetyDefenseMatrix: "🚨 आपातकालीन सुरक्षा प्रणाली (लाइव)",
    womenSafetySOSBtn: "पुलिस को तुरंत सूचित करें (SOS)",
    womenSafetyPoliceDispatched: "पुलिस सहायता भेजी गई",
    womenSafetyGpsBroadcast: "GPS लाइव प्रसारण सक्रिय है",
    womenSafetyDeterrentsTitle: "🔊 आपातकालीन ध्वनि एम्यूलेटर",
    womenSafetyDeterrentsDesc: "परेशान करने वालों को डराने के लिए कृत्रिम आवाजें या ध्वनियां बजाता है।",
    womenSafetyDeterrentDoorbell: "स्मार्ट डोरबेल बजाएं",
    womenSafetyDeterrentDog: "गार्ड डॉग की आवाज",
    womenSafetyDeterrentMale: "पुरुष आवाज उत्पन्न करें",
    womenSafetyStealthTitle: "साइलेंट स्क्रीन छलावरण",
    womenSafetyStealthDesc: "फोन को लॉक दिखाने के लिए स्क्रीन को पूरी तरह काला कर देता है, लेकिन रिकॉर्डिंग और जीपीएस चालू रहता है।",
    womenSafetyStealthBtn: "स्टेल्थ स्क्रीन चालू करें",
    womenSafetyStealthOverlay: "नियमित स्क्रीन पर वापस जाने के लिए कहीं भी टैप करें",
    reportTitle: "घोटाले की रिपोर्ट करें",
    reportDesc: "आपकी रिपोर्ट अनगिनत लोगों को बचा सकती है। सभी रिपोर्ट तुरंत अनाम कर दी जाती हैं और सुरक्षित रूप से साझा की जाती हैं।",
    reportPrivacyTitle: "सैन्य-ग्रेड गोपनीयता की गारंटी",
    reportPrivacyDesc: "आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए हम स्थानीय एईएस-256 एन्क्रिप्शन का उपयोग करते हैं।",
    reportLabelPhone: "संदिग्ध फोन नंबर",
    reportLabelMedium: "कॉल का माध्यम",
    reportMediumVoice: "वॉयस कॉल",
    reportMediumWhatsapp: "व्हाट्सएप",
    reportMediumSms: "एसएमएस टेक्स्ट",
    reportMediumOther: "अन्य माध्यम",
    reportLabelContext: "धोखाधड़ी का विवरण",
    reportPlaceholderContext: "उन्होंने क्या दावा किया? (जैसे: गिरफ्तारी की धमकी देकर उपहार कार्ड मांगे...)",
    reportLabelUpload: "कॉल रिकॉर्डिंग अपलोड करें (वैकल्पिक)",
    reportUploadHint: "समर्थित प्रारूप: MP3, WAV, या AAC (अधिकतम 10MB)",
    reportSubmitBtn: "सुरक्षित रिपोर्ट सबमिट करें",
    reportSuccessTitle: "Report Submitted",
    reportSuccessDesc: "योगदान के लिए धन्यवाद! हमारे सुरक्षा नेटवर्क ने स्कैम डेटाबेस को अपडेट कर दिया है।",
    reportSuccessBtn: "डैशबोर्ड पर लौटें",
    settingsTitle: "सिस्टम सेटिंग्स",
    settingsDesc: "सुरक्षा इंजन की संवेदनशीलता और क्लाउड सिंक सेटिंग्स को यहाँ प्रबंधित करें।",
    settingsNeuralConfig: "तंत्रिका इंजन विन्यास",
    settingsNeuralToggle: "डिवाइस पर वॉयस स्कैनिंग",
    settingsNeuralToggleDesc: "स्थानीय रूप से आवृत्ति विश्लेषण सक्षम करता है (Edge AI)।",
    settingsSensitivity: "अलर्ट संवेदनशीलता सीमा",
    settingsSensitivityDesc: "धोखाधड़ी का अलर्ट जारी करने की संवेदनशीलता तय करता है।",
    settingsPrivacyHeader: "गोपनीयता",
    settingsPrivacyToggle: "वैश्विक थ्रेट ग्राफ़ सिंक",
    settingsPrivacyToggleDesc: "सुरक्षा मजबूत करने के लिए अज्ञात रूप से पैटर्न को सिंक करता है।",
    settingsMaintenance: "डेटाबेस रखरखाव",
    settingsClearHistoryBtn: "हालिया इतिहास हटाएं",
    settingsResetDatabaseBtn: "सिमुलेशन डेटाबेस रीसेट करें",
    settingsLogoutBtn: "सुरक्षा प्रोफ़ाइल से लॉगआउट करें",
    settingsDatabaseSync: "सिस्टम डेटाबेस सफलतापूर्वक सिंक हो गया है।",
    historyTitle: "सुरक्षित कॉल इतिहास",
    historyDesc: "कॉल सुरक्षा प्रणाली द्वारा विश्लेषित की गई सभी कॉलों के प्रतिलेख और खतरे के इतिहास का विश्लेषण करें।",
    historyNoLogs: "कोई सुरक्षित कॉल नहीं मिली",
    historyNoLogsDesc: "सुरक्षा लॉग को सक्रिय करने के लिए सिमुलेटर कॉल चलाएं या रिपोर्ट फॉर्म सबमिट करें।",
    historyInitiateBtn: "सिम्युलेटर कॉल शुरू करें",
    onboardingCtaTitle: "अपनी डिजिटल आवाज़ आज ही सुरक्षित करें",
    onboardingCtaDesc: "50,000+ सक्रिय उपयोगकर्ताओं से जुड़ें जो वॉयस क्लोनिंग जबरन वसूली से अपनी कॉल को सुरक्षित रखने के लिए हियरट्रस्ट पर भरोसा करते हैं।",
    onboardingCtaBtn: "अभी सुरक्षा प्राप्त करें",
    featuresTitle: "प्रमुख सुरक्षा सुविधाएँ",
    features1Title: "डीपफेक पहचान",
    features1Desc: "99.9% वास्तविक समय पैटर्न सटीकता के साथ एआई-जनरेटेड या क्लोन किए गए वॉयस सेगमेंट की पहचान करने के लिए उन्नत ध्वनिक विश्लेषण।",
    features2Title: "बहुभाषी सहायता",
    features2Desc: "तमिल, अंग्रेजी, मलयालम, हिंदी और तेलुगु भाषाओं में सक्रिय कॉल सुरक्षा उपलब्ध है।",
    features3Title: "गोपनीयता-प्रथम एज एआई",
    features3Desc: "सभी ऑडियो विश्लेषण आपके डिवाइस पर स्थानीय रूप से होते हैं। हम कभी भी आपका व्यक्तिगत कॉल डेटा स्टोर या ट्रांसफर नहीं करते हैं।"
  },
  te: {
    navProtect: "రక్షణ",
    navHistory: "చరిత్ర",
    navWomenSafe: "మహిళా రక్షణ",
    navReport: "ఫిర్యాదు",
    navSettings: "సెట్టింగ్స్",
    heroBadge: "అధునాతన న్యూరల్ AI రక్షణ",
    heroTitle: "వాయిస్ స్కామ్‌లపై నిజ-సమయ ",
    heroTitleSpan: "AI రక్షణ",
    heroDesc: "AI డీప్‌ఫేక్ ఫోర్జరీలు, కాలర్ మోసాలు మరియు అత్యవసర ఆర్థిక బెదిరింపులను జరగకముందే అడ్డుకోండి. మా సైనిక-స్థాయి న్యూరల్ ఇంజన్ మీ రక్షణను పర్యవేక్షిస్తుంది.",
    heroStartBtn: "యాక్టివ్ ప్రొటెక్షన్ డాష్‌బోర్డ్",
    heroDemoBtn: "లైవ్ కాల్ డెమోను ప్రయత్నించండి",
    heroNotice: "🔒 ప్రాథమిక వర్చువల్ శాండ్‌బాక్స్ సిమ్యులేషన్ కోసం అనుమతులు అవసరం లేదు.",
    howItWorksTitle: "ఇది ఎలా పనిచేస్తుంది",
    howItWorksStep1Title: "Call Identification",
    howItWorksStep1Desc: "తెలియని నంబర్ల నుండి వచ్చే కాల్స్ అడ్డుకోవడానికి హీయర్‌ట్రస్ట్ నేరుగా మీ ఫోన్ డయలర్‌తో అనుసంధానం అవుతుంది.",
    howItWorksStep2Title: "Neural Analysis",
    howItWorksStep2Desc: "మా AI కృత్రిమ వాయిస్‌ల గుర్తింపు కోసం వాయిస్ సిగ్నేచర్‌ను స్కాన్ చేస్తుంది మరియు స్కామ్ డేటాబేస్‌లతో పోల్చి చూస్తుంది.",
    howItWorksStep3Title: "Instant Mitigation",
    howItWorksStep3Desc: "ఒకవేళ మోసం గుర్తిస్తే, హీయర్‌ట్రస్ట్ వెంటనే మిమ్మల్ని హెచ్చరిస్తుంది మరియు కాల్ కట్ చేసే మార్గాలను చూపుతుంది.",
    howItWorksStep4Title: "మల్టీ-అథారిటీ టెలిమెట్రీ రూటింగ్",
    howItWorksStep4Desc: "WebSockets మరియు Firebase RTDB వంతెనల ద్వారా భద్రతా డేటాను కుటుంబ సభ్యులు, పోలీస్ స్టేషన్ (112 HUD లింక్) లేదా సెక్యూరిటీ వార్డెన్లకు చేరవేస్తుంది.",
    howItWorksStep5Title: "స్వయంప్రతిపత్త AI సెల్ఫ్-హీలింగ్ షీల్డ్",
    howItWorksStep5Desc: "గార్డియన్ అందుబాటులో లేనప్పుడు, ఆటోమేటెడ్ వాయిస్ బాట్ ద్వారా పిన్ ధృవీకరణను కోరుతుంది, కాల్‌ను నిలిపివేస్తుంది మరియు పోలీస్ డేటాబేస్‌కు నివేదికను పంపుతుంది.",
    dashboardSafeScore: "రక్షణ స్కోరు",
    dashboardOptimal: "అత్యుత్తమం",
    dashboardConditional: "నిబంధనలతో కూడినది",
    dashboardDeficient: "అపాయకరం! ఎక్కువ రిస్క్",
    dashboardOverallProtection: "మీ మొత్తం రక్షణ ప్రస్తుతం",
    dashboardActiveScanning: "యాక్టివ్ స్కాన్: 4 నిమిషాల క్రితం తనిఖీ చేయబడింది",
    dashboardKeypadTitle: "శాండ్‌బాక్స్ డయలర్ కీప్యాడ్",
    dashboardKeypadDesc: "కాల్ స్కాన్ అనుకరించడానికి ఏదైనా స్పీడ్-డయల్ కోడ్ లేదా ఫోన్ నంబర్ నమోదు చేయండి:",
    dashboardKeypadGuide: "🎯 జడ్జీల డెమో గైడ్:",
    dashboardLaunchBtn: "వాయిస్ స్కాన్ కాల్ ప్రారంభించండి",
    dashboardCoreHealth: "సిస్టమ్ ఆరోగ్యం",
    dashboardHealthActive: "యాక్టివ్",
    dashboardHealthUpdated: "అప్‌డేట్ చేయబడింది",
    dashboardHealthSyncing: "సింక్ అవుతోంది",
    dashboardRecentHistory: "ఇటీవలి రక్షణ చరిత్ర",
    dashboardCallsTracked: "కాల్స్ పర్యవేక్షించబడ్డాయి",
    activeCallScenarioLabel: "యాక్టివ్ కాల్ సందర్భాన్ని ఎంచుకోండి",
    activeCallScenario1: "బ్యాంక్ మోసం",
    activeCallScenario2: "వాయిస్ క్లోనింగ్",
    activeCallScenario3: "పన్ను మోసం",
    activeCallAnalyzing: "AI విశ్లేషిస్తోంది...",
    activeCallListening: "వాయిస్ ప్యాటర్స్ గమనిస్తోంది",
    activeCallLiveDemo: "వాయిస్ ఇంటర్‌సెప్టర్",
    activeCallMicDesc: "రిస్క్ వర్గీకరణను పరీక్షించడానికి మీ మైక్రోఫోన్‌లో మాట్లాడండి:",
    activeCallMicActive: "🔴 లైవ్ మైక్ స్కాన్ యాక్టివ్‌గా ఉంది",
    activeCallMicInactive: "⚪ మైక్ కనెక్షన్ డిస్‌కనెక్ట్ అయింది",
    activeCallMicTurnOff: "మైక్ ఆపివేయండి",
    activeCallMicTurnOn: "లైవ్ మైక్ స్కాన్ ప్రారంభించండి",
    activeCallWhatToSay: "🇮🇳 మైక్‌లో మాట్లాడవలసిన వాక్యాలు:",
    activeCallThreatBank: "నాకు మీ ఆన్‌లైన్ బ్యాంకింగ్ పాస్‌వర్డ్ మరియు కార్డ్ పిన్ నంబర్ అవసరం.",
    activeCallThreatClone: "నానమ్మ నన్ను కాపాడు, కార్ యాక్సిడెంట్ అయింది, వెంటనే డబ్బులు పంపాలి.",
    activeCallThreatGov: "నేను ఇన్కమ్ టాక్స్ డిపార్ట్‌మెంట్ నుండి మాట్లాడుతున్నాను, మీపై అరెస్ట్ వారెంట్ ఉంది.",
    activeCallNormalChat: "శుభోదయం! బెంగళూరులో మన సమావేశాన్ని ఏర్పాటు చేద్దాం.",
    activeCallSandboxNotice: "🛡️ శాండ్‌బాక్స్ రక్షణ: ఈ మోడ్‌లో పోలీసులు లేదా అత్యవసర సేవలు స్పందించవు.",
    activeCallRiskGauge: "స్కామ్ రిస్క్ రేటు",
    activeCallDeepfakeAudit: "డీప్‌ఫేక్ ఆడిట్",
    activeCallTranscriptTitle: "లైవ్ సంభాషణ ప్రతిలేఖనం",
    activeCallRecording: "లైవ్ రికార్డింగ్",
    activeCallMute: "మ్యూట్",
    activeCallMuted: "మ్యూట్ చేయబడింది",
    activeCallEnd: "కాల్ ముగించండి",
    activeCallRecord: "రికార్డ్",
    activeCallRecordingActive: "రికార్డింగ్",
    activeCallInjectTitle: "Live Speech Injector",
    activeCallInjectDesc: "కాలర్ మాట్లాడే విధానాన్ని అనుకరించడానికి కింది వాక్యాలను టైప్ చేయండి లేదా క్లిక్ చేయండి:",
    activeCallInjectLabelQuick: "త్వరిత బెదిరింపు వాక్యాలు:",
    activeCallInjectLabelType: "కాలర్ కోసం ఒక వాక్యం టైప్ చేయండి:",
    activeCallInjectPlaceholder: "ఉదా: మీ బ్యాంక్ పిన్ నంబర్ ఇవ్వండి...",
    activeCallInjectBtn: "స్పీచ్ ఇంజెక్ట్ చేయి",
    activeCallInjectNote: "\"పిన్\", \"పాస్‌వర్డ్\", \"బ్యాంక్\", \"అరెస్ట్\", \"వారెంట్\", \"నానమ్మ\", \"డబ్బులు\" వంటి పదాలను ప్రయత్నించండి.",
    womenSafetyTitle: "మహిళా రక్షణ పోర్టల్",
    womenSafetyBadge: "బ్లాక్‌మెయిల్ & వేధింపుల నిరోధకం",
    womenSafetyDesc: "బ్లాక్‌మెయిల్, బెదిరింపులు లేదా వేధింపులను ఎదుర్కొనే మహిళల కోసం అత్యవసర రక్షణ సాధనాల సిమ్యులేషన్.",
    womenSafetySelectScenario: "పరీక్ష కోసం ప్రమాద సందర్భాన్ని ఎంచుకోండి",
    womenSafetyLaunchBtn: "యాక్టివ్ క్రైసిస్ ప్రొటెక్షన్ ప్రారంభించు",
    womenSafetyThreatDetected: "ప్రమాదం కనుగొనబడింది",
    womenSafetyStressIndex: "వాయిస్ స్ట్రెస్ ఇండెక్స్",
    womenSafetyDefenseMatrix: "🚨 అత్యవసర రక్షణ వ్యవస్థ (లైవ్)",
    womenSafetySOSBtn: "పోలీసులకు వెంటనే సమాచారం ఇవ్వండి (SOS)",
    womenSafetyPoliceDispatched: "పోలీసు సహాయం పంపబడింది",
    womenSafetyGpsBroadcast: "GPS లైవ్ బ్రాడ్‌కాస్ట్ యాక్టివ్‌గా ఉంది",
    womenSafetyDeterrentsTitle: "🔊 అత్యవసర శబ్దాల ఎములేటర్",
    womenSafetyDeterrentsDesc: "వేధించే వారిని భయపెట్టడానికి కృత్రిమ శబ్దాలను ప్లే చేస్తుంది.",
    womenSafetyDeterrentDoorbell: "స్మార్ట్ డోర్‌బెల్ రింగ్ చేయి",
    womenSafetyDeterrentDog: "గార్డ్ డాగ్ అరుపులు",
    womenSafetyDeterrentMale: "మగ వాయిస్ సృష్టించు",
    womenSafetyStealthTitle: "サイレントスクリーン迷彩",
    womenSafetyStealthDesc: "ఫోన్ లాక్ అయినట్లు చూపించడానికి స్క్రీన్‌ను నల్లగా మారుస్తుంది, కానీ రికార్డింగ్ మరియు జీపీఎస్ కొనసాగుతాయి.",
    womenSafetyStealthBtn: "స్టెల్త్ స్క్రీన్ ఆన్ చేయి",
    womenSafetyStealthOverlay: "సాధారణ స్క్రీన్‌కు తిరిగి రావడానికి ఎక్కడైనా ట్యాప్ చేయండి",
    reportTitle: "మోసాలపై ఫిర్యాదు చేయి",
    reportDesc: "మీ ఫిర్యాదు ఎంతోమంది ప్రాణాలను కాపాడుతుంది. అన్ని ఫిర్యాదులు అనామకంగా మరియు సురక్షితంగా ఉంచబడతాయి.",
    reportPrivacyTitle: "మిలిటరీ-గ్రేడ్ భద్రత హామీ",
    reportPrivacyDesc: "మీ వ్యక్తిగత వివరాలను రక్షించడానికి మేము స్థానిక AES-256 ఎన్‌క్రిప్షన్ ఉపయోగిస్తాము.",
    reportLabelPhone: "అనుమానాస్పద ఫోన్ నంబర్",
    reportLabelMedium: "కాల్ మాధ్యమం",
    reportMediumVoice: "వాయిస్ కాల్",
    reportMediumWhatsapp: "వాట్సాప్",
    reportMediumSms: "SMS టెక్స్ట్",
    reportMediumOther: "ఇతర మార్గాలు",
    reportLabelContext: "స్కామ్ వివరాలు",
    reportPlaceholderContext: "వారు ఏమని బెదిరించారు? (ఉదా: అరెస్ట్ వారెంట్ ఉందని చెప్పి గిఫ్ట్ కార్డులు అడిగారు...)",
    reportLabelUpload: "కాల్ రికార్డింగ్ అప్‌లోడ్ చేయి (ఆప్షనల్)",
    reportUploadHint: "అనుకూల ఫార్మాట్లు: MP3, WAV, లేదా AAC (గరిష్టంగా 10MB)",
    reportSubmitBtn: "సురక్షిత ఫిర్యాదును సబ్మిట్ చేయి",
    reportSuccessTitle: "Report Submitted",
    reportSuccessDesc: "సహాయం చేసినందుకు ధನ್ಯవాదాలు! మా రక్షణ నెట్‌వర్క్ స్కామ్ నంబర్ల జాబితాను అప్‌డేట్ చేసింది.",
    reportSuccessBtn: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు",
    settingsTitle: "సిస్టమ్ సెట్టింగ్స్",
    settingsDesc: "రక్షణ ఇంజన్ యొక్క సెన్సిటివిటీ మరియు క్లౌഡ് సింక్ సెట్టింగులను ఇక్కడ మార్చవచ్చు.",
    settingsNeuralConfig: "న్యూరల్ ఇంజన్ కాన్ఫిగరేషన్",
    settingsNeuralToggle: "ఫోన్‌లోనే వాయిస్ స్కాన్",
    settingsNeuralToggleDesc: "స్థానిక ఫ్రీక్వెన్సీ విశ్లేషణను అనుమతిస్తుంది (Edge AI).",
    settingsSensitivity: "అలర్ట్ సెన్సిటివిటీ పరిమితి",
    settingsSensitivityDesc: "స్కామ్ అలర్ట్ జారీ చేయడానికి కావలసిన శాతాన్ని నిర్ణయిస్తుంది.",
    settingsPrivacyHeader: "గోప్యత & నమ్మకమైన కాంటాక్ట్స్",
    settingsPrivacyToggle: "గ్లోబల్ థ్రెట్ గ్రాఫ్ సింక్",
    settingsPrivacyToggleDesc: "భద్రతను బలోపేతం చేయడానికి అనామకంగా ప్యాటర్న్లను సింక్ చేస్తుంది.",
    settingsMaintenance: "డేటాబేస్ నిర్వహణ",
    settingsClearHistoryBtn: "ఇటీవలి చరిత్రను తొలగించు",
    settingsResetDatabaseBtn: "సిమ్యులేషన్ డేటాబేస్ రీసెట్ చేయి",
    settingsLogoutBtn: "రక్షణ ప్రొఫైల్ నుండి లాగౌట్ అవ్వు",
    settingsDatabaseSync: "సిస్టమ్ డేటాబేస్ విజయవంతంగా సింక్ చేయబడింది.",
    historyTitle: "సురక్షిత కాల్ చరిత్ర",
    historyDesc: "యాక్టివ్ గార్డ్ పర్యవేక్షించిన అన్ని కాల్స్ వివరాలను, వ్రాతపూర్వక సంభాషణలను తనిఖీ చేయండి.",
    historyNoLogs: "ఏ కాల్స్ లభించలేదు",
    historyNoLogsDesc: "జాబితా నింపడానికి మోక్ కాల్స్ లేదా రిపోర్ట్ ఫారమ్ సబ్మిట్ చేయండి.",
    historyInitiateBtn: "సిమ్యులేటర్ కాల్ ప్రారంభించు",
    onboardingCtaTitle: "ఈరోజే మీ వాయిస్‌ని సురక్షితం చేసుకోండి",
    onboardingCtaDesc: "వాయిస్ క్లోనింగ్ దోపిడీల నుండి తమ కాల్స్‌ని రక్షించుకోవడానికి హీయర్‌ట్రస్ట్‌పై ఆధారపడే 50,000+ యాక్టివ్ యూజర్లతో చేరండి.",
    onboardingCtaBtn: "ఇప్పుడే రక్షణ పొందండి",
    featuresTitle: "ముఖ్యమైన రక్షణ ఫీచర్లు",
    features1Title: "డీప్‌ఫేక్ గుర్తింపు",
    features1Desc: "99.9% నిజ-సమయ ప్యాటర్న్ ఖచ్చితత్వంతో AI-సృష్టించిన లేదా క్లోన్ చేసిన వాయిస్ ముక్కలను గుర్తించడానికి అధునాతన అకౌస్టిక్ విశ్లేషణ.",
    features2Title: "బహుభాషా మద్దతు",
    features2Desc: "తమిళం, ఇంగ్లీష్, మలయాళం, హిందీ మరియు తెలుగు భాషలలో యాక్టివ్ కాల్ రక్షణ అందుబాటులో ఉంది.",
    features3Title: "ప్రైవసీ-ఫస్ట్ ఎడ్జ్ AI",
    features3Desc: "అన్ని ఆడియో విశ్లేషణలు మీ పరికరంలోనే స్థానికంగా జరుగుతాయి. మేము మీ కాల్ డేటాను ఎప్పుడూ రికార్డ్ చేయము లేదా బదిలీ చేయము."
  }
};

export const localizedThreatKeywords = {
  en: {
    bank: ["pin", "password", "bank", "account", "social security", "ssn", "card", "routing", "wire", "deposit", "otp", "login", "forgery", "money"],
    clone: ["grandma", "accident", "kidnap", "cloned", "jail", "bail", "mimic", "emergency money", "crash", "son"],
    gov: ["irs", "agent", "deportation", "arrest", "warrant", "marshalls", "tax", "gift card", "federal"],
    stalk: ["kill", "watch", "door", "photos", "leak", "house", "outside", "harm", "unsafe", "stalk"]
  },
  ta: {
    bank: ["பின்", "கடவுச்சொல்", "கடவுச்சொல்லை", "வங்கி", "வங்கியிலிருந்து", "கணக்கு", "கணக்கிலிருந்து", "அட்டை", "பணம்", "கடனட்டை", "பணப் பரிமாற்றம்", "வைப்பு", "ஓடிபி", "உள்நுழைவு", "போலி"],
    clone: ["பாட்டி", "விபத்து", "கடத்தல்", "நகல்", "சிறை", "ஜாமீன்", "அவசர பணம்", "மகன்", "மகனை", "பேரன்", "உதவி"],
    gov: ["வருமான வரி", "வரி", "கைது", "கைது வாரண்ட்", "வாரண்ட்", "அதிகாரி", "நடுவர்", "அபராதம்", "பரிசு அட்டை"],
    stalk: ["கொலை", "கொன்றுவிடுவேன்", "கண்காணிக்கிறேன்", "வெளியே", "வெளியிடுவேன்", "புகைப்படம்", "புகைப்படங்களை", "துன்புறுத்தல்", "வீடு", "கதவு", "ஆபத்து"]
  },
  ml: {
    bank: ["പിൻ", "പാസ്‌വേഡ്", "ബാങ്ക്", "അക്കൗണ്ട്", "കാർഡ്", "പണം", "ഡെപ്പോസിറ്റ്", "ഒടിപി", "ലോഗിൻ", "തട്ടിപ്പ്", "പൈസ"],
    clone: ["അമ്മൂമ്മ", "അപകടം", "തട്ടിക്കൊണ്ടുപോകൽ", "അനുകരണം", "ജയിൽ", "ജാമ്യം", "അടിയന്തിര പണം", "മോൻ", "സഹായം"],
    gov: ["നികുതി", "ഓഫീസർ", "അറസ്റ്റ്", "വാറണ്ട്", "അറസ്റ്റ് വാറണ്ട്", "കോടതി", "അപരാധം", "ഗിഫ്റ്റ് കാർഡ്"],
    stalk: ["കൊല്ലും", "ശ്രദ്ധിക്കുന്നു", "പുറത്ത്", "ലീക്ക്", "ഫോട്ടോ", "ഫോട്ടോകൾ", "വീട്", "വാതിൽ", "അപകടം", "വേട്ടയാടൽ"]
  },
  hi: {
    bank: ["पिन", "पासवर्ड", "बैंक", "खाता", "कार्ड", "जमा", "ओटीपी", "लॉगिन", "धोखाधड़ी", "पैसा", "पैसे", "ट्रांसफर"],
    clone: ["दादी", "नानी", "दुर्घटना", "एक्सीडेंट", "अपहरण", "नकल", "जेल", "जमानत", "आपातकालीन पैसा", "बेटा", "मदद"],
    gov: ["टैक्स", "अधिकारी", "गिरफ्तार", "गिरफ्तारी", "वारंट", "कोर्ट", "जुर्माना", "गिफ्ट कार्ड"],
    stalk: ["मार", "जान से मार", "देख रहा", "बाहर", "लीक", "फोटो", "तस्वीर", "घर", "दरवाजा", "खतरा", "पीछा"]
  },
  te: {
    bank: ["పిన్", "పాసయ్యా", "పాస్‌వర్డ్", "బ్యాంక్", "ఖాతా", "కార్డ్", "డిపాజిట్", "ఓటీపీ", "లాగిన్", "ఫోర్జరీ", "డబ్బులు", "డబ్బు"],
    clone: ["నానమ్మ", "అమ్మమ్మ", "యాక్సిడెంట్", "ప్రమాదం", "కిడ్నాప్", "క్లోన్", "జైలు", "బెయిల్", "అత్యవసర డబ్బు", "కొడుకు", "సహాయం"],
    gov: ["టాక్స్", "పన్ను", "అధికారి", "అరెస్ట్", "వారెంట్", "కోర్టు", "జరిమానా", "గిఫ్ట్ కార్డ్"],
    stalk: ["చంపేస్తా", "చంపుతా", "చూస్తున్నా", "బయట", "లీక్", "ఫోటో", "ఫోటోలు", "ఇల్లు", "తలుపు", "ప్రమాదం", "వేధింపు"]
  }
};
