export type DetectionMode = 'home' | 'outdoor';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export type DetectionStatus = 'active' | 'idle';

export interface DetectionEvent {
  id: string;
  timestamp: Date;
  distance: number; // in meters
  direction?: string;
  mode: DetectionMode;
}

export interface JourneyLog {
  id: string;
  date: Date;
  duration: number; // in minutes
  obstacleCount: number;
  mode: DetectionMode;
  detections: DetectionEvent[];
}

export interface Settings {
  mode: DetectionMode;
  audioFeedback: boolean;
  vibrationFeedback: boolean;
  visualIndicator: boolean;
  textToSpeech: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
}

export interface AppState {
  connectionStatus: ConnectionStatus;
  detectionStatus: DetectionStatus;
  settings: Settings;
  currentDetection: DetectionEvent | null;
  recentDetections: DetectionEvent[];
}
