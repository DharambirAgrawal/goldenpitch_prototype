export type DetectionMode = 'home' | 'outdoor' | 'vehicle' | 'baby';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export type DetectionStatus = 'active' | 'idle';

export type ObjectType = 
  | 'person_walking'
  | 'person_running'
  | 'vehicle_car'
  | 'vehicle_bike'
  | 'vehicle_motorcycle'
  | 'vehicle_scooter'
  | 'animal'
  | 'static_object'
  | 'unknown';

export type Direction = 'front' | 'right' | 'back' | 'left';

export type RiskLevel = 'safe' | 'caution' | 'danger';

export interface DetectionEvent {
  id: string;
  timestamp: Date;
  distance: number; // in meters
  direction: Direction;
  zone: number; // 0-359 degrees
  mode: DetectionMode;
  objectType: ObjectType;
  confidence: number; // 0-100% AI confidence
  speed?: number; // m/s, for moving objects
  riskLevel: RiskLevel;
  timeToContact?: number; // seconds
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
  batteryLevel: number; // 0-100%
  isCharging: boolean;
  theme: 'auto' | 'light' | 'dark';
  alertSound: string; // sound file name
  vehicleType?: 'car' | 'motorcycle' | 'scooter' | 'bicycle';
}

export interface AppState {
  connectionStatus: ConnectionStatus;
  detectionStatus: DetectionStatus;
  settings: Settings;
  currentDetection: DetectionEvent | null;
  recentDetections: DetectionEvent[];
}
