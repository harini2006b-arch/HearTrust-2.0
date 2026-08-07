# HearTrust 2.0: Official Developer & Architectural Documentation

HearTrust 2.0 is an agentic, multi-layered cyber-security and crisis defense platform designed to protect vulnerable individuals, senior citizens, and women from AI-driven voice cloning scams, digital blackmail, financial fraud, and physical safety threats.

---

## 📖 Table of Contents
1. [Abstract](#1-abstract)
2. [The Problem Statement](#2-the-problem-statement)
3. [The Proposed Solution](#3-the-proposed-solution)
4. [Technology Stack & API Interfaces](#4-technology-stack--api-interfaces)
5. [End-to-End User Experience Walkthrough](#5-end-to-end-user-experience-walkthrough)
6. [Who is the End User and Why](#6-who-is-the-end-user-and-why)
7. [Comprehensive Codebase File Map](#7-comprehensive-codebase-file-map)
8. [Installation & Deployment Guide](#8-installation--deployment-guide)
9. [Future Scope & Improvements](#9-future-scope--improvements)

---

## 1. Abstract

HearTrust 2.0 introduces an intelligent call interception and crisis management framework designed to defend users against modern cyber-threats in real-time. By combining real-time transcript analysis via a fine-tuned BERT semantic parser and voice-cloning detection using Light Convolutional Neural Networks (LCNN), the system intercepts calls, detects deepfake spoofing, and alerts emergency networks. The platform includes local authority geolocating HUD maps, multi-authority telemetry routing, automated self-healing voice challenges, a stealth crisis recorder for women's safety, and a synthesized audio warning chime. Operating fully within a responsive, high-contrast, glassmorphic layout, HearTrust provides continuous protection for vulnerable targets.

---

## 2. The Problem Statement

Traditional call-blocking solutions rely on static blacklists of reported numbers. These fail to address sophisticated voice-based crimes:

* **AI Voice Cloning & Deepfakes:** Scammers capture short audio samples of family members from social media, clone their voices, and call elderly relatives claiming to be in a panic-induced emergency (e.g., arrested, hospitalized) to extort money. Because the voice sounds identical, senior citizens are easily deceived.
* **The Offline Guardian Loophole:** Most security setups rely on a single primary contact. If that person's phone is switched off, out of signal range, or busy, the security pipeline breaks, leaving the senior citizen vulnerable.
* **Cyber-Intimidation and Sextortion:** Aggressive blackmail, location stalking, and online photo leaks target vulnerable demographics (predominantly women). Confronted with hostiles, victims struggle to call emergency dispatch or gather evidence.
* **Visible SOS Warning Risks:** Displaying loud warning prompts or police sirens on a bright screen can trigger extreme reactions from attackers if they are in close physical proximity to the user.

---

## 3. The Proposed Solution

HearTrust 2.0 addresses these problems through a multi-layered defense architecture:

* **Dual-Engine Threat Scan:** Captures call audio and transcribes it on the fly:
  * **BERT Semantic Classifier:** Parses transcripts for threat patterns.
  * **LCNN Spectrogram Classifier:** Inspects voice signatures for vocoder compression and phase misalignments to detect deepfakes.
* **Haversine Geolocation Triangulation:** Integrates HTML5 GPS geolocation and IP-based fallback locators to calculate the spherical distance to nearby police precincts, automatically routing coordinates to the closest station.
* **Multi-Node Telemetry Routing:** Lives streams transcripts and threat data to secondary consoles (Son/Family, Local Precinct 112 Command Desk, or Apartment Safety Warden).
* **Autonomous AI Self-Healing Shield:** If human guardians are unreachable, a voice synthesizer bot challenges the caller to provide a certified PIN, automatically dropping the carrier line if they fail.
* **Stealth Camouflage Crisis Shield:** Disguises the device as turned-off (black screen blackout) during emergency situations, silently recording audio and transmitting coordinate logs.
* **Mild Chime Warning Strobe:** Programmatically synthesizes a gentle, decaying `580Hz` sine-wave warning beep to alert the user that assistance has been dispatched without drawing attention.

---

## 4. Technology Stack & API Interfaces

* **Core Platform:** React.js, TypeScript, Vite
* **Styling & Theme:** Vanilla CSS / TailwindCSS. Glassmorphic containers, black backdrops (`#010102`), neon royal blue (#1F47E8), and electric violet highlights.
* **Browser Web APIs:**
  * **HTML5 Geolocation API:** Live coordinate triangulation (`navigator.geolocation`).
  * **Web Speech API (`SpeechRecognition`):** Translates microphone audio into text.
  * **Web Speech API (`SpeechSynthesis`):** Powers the in-ear warning whispers and the Autonomous bot challenge.
  * **Web Audio API (`AudioContext`):** Generates and shapes sine waves for the panic chime.
* **External APIs & Integrations:**
  * **ipapi.co REST API:** Serves as a fallback locator if GPS permissions are denied.
  * **Haversine Distance Calculator:** Custom implementation for precinct mapping.
  * **Simulated WebSockets & Firebase DB:** Coordinates state sync between the grandfather and guardian panels.

---

## 5. End-to-End User Experience Walkthrough

### Step 1: Initialization & Splash Screen
Upon launching the application, the user sees a 3-second animated splash screen showing the HearTrust split-shield, locking padlock, and vertical soundwaves. The app then transitions to the Authentication Gate.

### Step 2: Adaptive Sign-Up & Radar Mapping
The user registers their profile details. The app requests location access, pinpoints the user on an interactive HUD map, runs the Haversine formula, and binds the account to the closest police precinct. The user enters a generated 4-digit OTP sent via system notifications to log in.

### Step 3: Command Center Overview
The user lands on the dashboard displaying threat logs, saved funds metrics, and a rolling telemetry event stream. 

### Step 4: Activating Call Intercept
The user toggles **Elderly Auto-Pilot Intercept** on and triggers a sandbox call. An incoming call screen shows a live oscilloscope. As the conversation starts, BERT and LCNN analyze the audio. If deepfake signatures or extortion phrases are detected, a voice warning whispers to the user to hang up.

### Step 5: Multi-Authority Routing & AI Bot Challenge
* If the telemetry route is set to **Family**, the call transcript is streamed to the Son's layout.
* If set to **Autonomous AI**, the AI Challenger bot intercepts the call, requesting verification and dropping the line if the caller fails.

### Step 6: Women's Safety Engagement
If the user dials `911` or opens the safety tab, they enter Women's Safety Mode. An Acoustic Stress Index tracks caller hostility. Activating **Stealth Camouflage** turns the screen black, silently recording audio, tracking GPS coordinates, and alerting the closest precinct.

### Step 7: Alarm Dispatch
When the emergency protocol finishes, a gentle, decaying alarm chime plays, confirming that police have been dispatched.

---

## 6. Who is the End User and Why

* **Vulnerable Elderly Citizens:** They are the primary targets of voice-cloned financial scams. The autopilot intercept acts as a silent guardian, blocking threats without requiring technical input from the senior.
* **Women Facing Stalking or Blackmail:** They require secure evidence gathering and silent panic triggers. The stealth camouflage screen and stress index are designed to protect their safety during active confrontations.
* **Family Guardians (Sons/Daughters):** They require real-time alerts when their relatives are targeted, enabling them to remotely intervene or review logs.
* **Local Law Enforcement Officers:** They receive structured, geolocated threat telemetry streams via the direct Precinct dashboard link, enabling rapid response.

---

## 7. Comprehensive Codebase File Map

* [`src/App.tsx`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/App.tsx): Manages the global state, splash screen timing, routing configurations, and active views navigation.
* [`src/components/AuthView.tsx`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/components/AuthView.tsx): Orchestrates registration forms, OTP generation, HTML5 GPS triangulation, and the Haversine Radar station map.
* [`src/components/DashboardView.tsx`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/components/DashboardView.tsx): Renders statistical grids, telemetry tickers, and node routing parameters.
* [`src/components/ActiveCallView.tsx`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/components/ActiveCallView.tsx): Drives incoming call dialogues, oscilloscopes, risk classifiers, and the Autonomous AI speech synthesis challenger.
* [`src/components/WomenSafetyView.tsx`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/components/WomenSafetyView.tsx): Runs cyber-stalking scripts, stealth screen blackouts, and emergency contact dispatches.
* [`src/components/EmergencyView.tsx`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/components/EmergencyView.tsx): Renders the crisis dispatch terminal and hosts the synthesized decaying alert chime sound engine.
* [`src/components/SettingsView.tsx`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/components/SettingsView.tsx): Allows editing profiles, managing database logs, and resetting test parameters.
* [`src/translations.ts`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/translations.ts): Stores the localized translation schemas across English, Hindi, Tamil, Malayalam, and Telugu.
* [`src/index.css`](file:///c:/Users/HARINI_BALAJI/OneDrive/Desktop/Barat%20Hackathon/HearTrust/HearTrust/heartrust2.0/src/index.css): Sets base global scaling to `22px` for high visibility and governs custom pulse and scan animations.

---

## 8. Installation & Deployment Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** (or the port specified in stdout, e.g., `http://localhost:3001`).

---

## 9. Future Scope & Improvements

1. **Carrier-Level Deployment:** Transition the audio interception system to telecommunication gateways (using SIP signaling proxies) to block cloned calls before they reach the handset.
2. **Local Edge AI Inference:** quantized ONNX / TensorFlow Lite model packages running natively on the device to perform offline transcription parsing and deepfake voice scanning.
3. **Cryptographic Voiceprint Ledger:** Implement a secure, hash-based voice registry for family members. Calls from a registered name must match the stored voice hash to bypass challenge filters.
4. **Decentralized Network Immunization:** Share blocked call records, voice hashes, and spoofed caller fingerprints across a peer-to-peer neighborhood mesh network.
