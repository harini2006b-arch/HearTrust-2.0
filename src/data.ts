import { CallScript, CallLog } from "./types";

export const PRESET_SCRIPTS: CallScript[] = [
  {
    id: "bank-impostor",
    name: "Suspicious Bank Security",
    number: "+1 (555) 012-3456",
    location: "New York, NY",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_FoBBQrCDNm93U8sBQs__CDRz7Nz98pCbEdzD5RzaWic_k78uJcxm-9Yn5E2bw74H5c8M-UF_plHVgl_KlHmntp2Dp4DXEjxoi8zhZIHPMCl9ytfQ8Igb5vJB-qTsUyeb8uBjR_I8uEIoxI0f8UZepOHcg3nD1r-0_2HlY9qfB188Nk_ipaFroEuPOgPdaithpILjJ5TIZSUB_ma3lTer5JkVUCSXZE3NTJdy1iDKUNT9cQli-j-yQtrcgtnBXUKJz0CNI_Y--Lfq",
    scamRiskMax: 89,
    deepfakeScoreMax: 94,
    warningLabel: "PII Request & Social Engineering",
    warningDescription: "The caller is asking for sensitive personal authentication codes and full credentials. Authentic financial institutions will never solicit this over incoming calls.",
    lines: [
      {
        speaker: "caller",
        text: "Hello, I am calling from your bank's security department regarding some suspicious activity on your account...",
        isSuspicious: false
      },
      {
        speaker: "me",
        text: "Which bank are you calling from exactly?"
      },
      {
        speaker: "caller",
        text: "We are with Chase & partners main clearing house. There is an active draft of nine hundred dollars being processed.",
        isSuspicious: true
      },
      {
        speaker: "me",
        text: "I didn't authorize any charge."
      },
      {
        speaker: "caller",
        text: "Understood. To reverse this, we need you to verify your full social security number and online banking PIN immediately.",
        isSuspicious: true
      },
      {
        speaker: "me",
        text: "Wait, shouldn't you already have my details if you are Chase?"
      },
      {
        speaker: "caller",
        text: "Sir, this is an automated safety lock request. If you do not verify your SSN right now, you will be liable for all fraudulent activity on this card.",
        isSuspicious: true
      }
    ]
  },
  {
    id: "grandkid-voice-clone",
    name: "Family Member (Urgent Clone)",
    number: "+1 (305) 881-9921",
    location: "Miami, FL",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    scamRiskMax: 98,
    deepfakeScoreMax: 99,
    warningLabel: "Deepfake Synthesized Audio",
    warningDescription: "Highly likely AI voice-cloned model. Acoustic signatures indicate synthetic modulation. Do not transfer funds or give address.",
    lines: [
      {
        speaker: "caller",
        text: "Grandma? Please help me, I am in so much trouble right now. I had a terrible accident...",
        isSuspicious: true
      },
      {
        speaker: "me",
        text: "Oh dear! Who is this? Is this Jimmy?"
      },
      {
        speaker: "caller",
        text: "Yes, it is Jimmy! I'm in a jail holding precinct in Miami, they took my phone and I only have one call. Please don't tell mom.",
        isSuspicious: true
      },
      {
        speaker: "me",
        text: "Your voice sounds a bit strange, Jimmy..."
      },
      {
        speaker: "caller",
        text: "I have a fractured jaw from the steering wheel and my nose is stuffed up, that's why. They need three thousand dollars wired immediately for bail.",
        isSuspicious: true
      },
      {
        speaker: "me",
        text: "What is your father's middle name?"
      },
      {
        speaker: "caller",
        text: "Mom's middle name ... wait, the guard is telling me I have to hang up unless you give the credit card now, please grandma!",
        isSuspicious: true
      }
    ]
  },
  {
    id: "irs-threat",
    name: "IRS Agent Miller",
    number: "+1 (202) 555-0100",
    location: "Washington, DC",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    scamRiskMax: 95,
    deepfakeScoreMax: 32,
    warningLabel: "Government Impersonation",
    warningDescription: "The caller claims representing the Internal Revenue Service and threatens physical deportation or prison. The IRS never requests instant payment via gift cards or phone calls.",
    lines: [
      {
        speaker: "caller",
        text: "This is Agent Miller from the Internal Revenue Service Audit department. This call is being monitored by Federal authorities.",
        isSuspicious: false
      },
      {
        speaker: "me",
        text: "What audit? I filed my taxes on time."
      },
      {
        speaker: "caller",
        text: "Our files show an intentional evasion under code 20A. A warrant for your arrest has been signed by the federal magistrate.",
        isSuspicious: true
      },
      {
        speaker: "caller",
        text: "To defer immediate police citation, you are ordered to resolve the balance of $4,500 over this secure line.",
        isSuspicious: true
      },
      {
        speaker: "me",
        text: "How am I supposed to pay that?"
      },
      {
        speaker: "caller",
        text: "You will go to your nearest target and purchase six five-hundred-dollar Apple gift cards, and read me the security scratch numbers.",
        isSuspicious: true
      }
    ]
  }
];

export const INITIAL_CALL_LOGS: CallLog[] = [
  {
    id: "log-1",
    caller: "Unknown Caller",
    number: "+1 (555) 012-3456",
    time: "Today, 10:45 AM",
    duration: "2m 14s",
    status: "SAFE",
    label: "Chase Bank Inquiry",
    scamRisk: 12,
    deepfakeScore: 8,
    transcript: [
      { speaker: "caller", text: "Hello, calling to request authorization for your local wire transfer to travel company." },
      { speaker: "me", text: "Wait, I canceled that request." },
      { speaker: "caller", text: "Ah, understood. We will void the request right now. Have a lovely day." }
    ]
  },
  {
    id: "log-2",
    caller: "Spam Risk",
    number: "+1 (305) 555-9182",
    time: "Today, 08:20 AM",
    duration: "Blocked",
    status: "WARNING",
    label: "Robocall / Scam",
    scamRisk: 95,
    deepfakeScore: 78,
    transcript: [
      { speaker: "caller", text: "Congratulations! You have been selected to win a free cruise to the Bahamas. Please input your secure credit card..." }
    ]
  },
  {
    id: "log-3",
    caller: "Sarah Johnson",
    number: "+1 (555) 987-6543",
    time: "Yesterday, 18:12 PM",
    duration: "15m 02s",
    status: "TRUSTED",
    label: "In Contacts",
    scamRisk: 2,
    deepfakeScore: 5,
    transcript: [
      { speaker: "caller", text: "Hey! Did you manage to verify the contract papers for the new home?" },
      { speaker: "me", text: "Yes, I signed them and sent it over." },
      { speaker: "caller", text: "Fabulous, I'll talk to you when I hit the subway!" }
    ]
  }
];
