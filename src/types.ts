export enum CallStatus {
  IDLE = "IDLE",
  INCOME_CALL = "INCOME_CALL",
  ACTIVE_PROTECTION = "ACTIVE_PROTECTION",
  EMERGENCY = "EMERGENCY",
}

export enum CallType {
  VOICE = "voice",
  WHATSAPP = "whatsapp",
  SMS = "sms",
  OTHER = "other",
}

export interface CallLog {
  id: string;
  caller: string;
  number: string;
  time: string;
  duration: string;
  status: "SAFE" | "WARNING" | "TRUSTED";
  label: string;
  transcript: TranscriptLine[];
  scamRisk: number;
  deepfakeScore: number;
}

export interface TranscriptLine {
  speaker: "caller" | "me" | "system";
  text: string;
  isSuspicious?: boolean;
}

export interface ScamReport {
  id: string;
  number: string;
  callType: CallType;
  details: string;
  fileName?: string;
  timestamp: string;
}

export interface CallScript {
  id: string;
  name: string;
  number: string;
  location: string;
  avatarUrl: string;
  lines: { text: string; speaker: "caller" | "me"; isSuspicious?: boolean }[];
  scamRiskMax: number;
  deepfakeScoreMax: number;
  warningLabel?: string;
  warningDescription?: string;
}


