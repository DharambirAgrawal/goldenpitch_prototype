import { JourneyLog, DetectionEvent } from '../types';

// Mock journey logs for the past week
export const mockJourneyLogs: JourneyLog[] = [
  {
    id: '1',
    date: new Date(2025, 9, 24, 9, 30),
    duration: 45,
    obstacleCount: 12,
    mode: 'outdoor',
    detections: []
  },
  {
    id: '2',
    date: new Date(2025, 9, 23, 14, 15),
    duration: 30,
    obstacleCount: 8,
    mode: 'outdoor',
    detections: []
  },
  {
    id: '3',
    date: new Date(2025, 9, 23, 8, 0),
    duration: 20,
    obstacleCount: 5,
    mode: 'home',
    detections: []
  },
  {
    id: '4',
    date: new Date(2025, 9, 22, 16, 45),
    duration: 60,
    obstacleCount: 18,
    mode: 'outdoor',
    detections: []
  },
  {
    id: '5',
    date: new Date(2025, 9, 21, 10, 30),
    duration: 25,
    obstacleCount: 7,
    mode: 'home',
    detections: []
  },
  {
    id: '6',
    date: new Date(2025, 9, 20, 13, 0),
    duration: 40,
    obstacleCount: 15,
    mode: 'outdoor',
    detections: []
  },
  {
    id: '7',
    date: new Date(2025, 9, 19, 11, 15),
    duration: 35,
    obstacleCount: 10,
    mode: 'outdoor',
    detections: []
  }
];

// Generate random detection for simulation
export function generateMockDetection(mode: 'home' | 'outdoor'): DetectionEvent {
  const directions = ['front', 'left', 'right', 'front-left', 'front-right'];
  const maxDistance = mode === 'home' ? 5 : 10;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    distance: Math.random() * maxDistance + 0.5,
    direction: directions[Math.floor(Math.random() * directions.length)],
    mode
  };
}

// Audio summary messages for journey logs
export const getAudioSummaryMessage = (log: JourneyLog): string => {
  const date = log.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const time = log.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  
  return `Journey on ${date} at ${time}. Duration: ${log.duration} minutes. ${log.obstacleCount} obstacles detected in ${log.mode} mode.`;
};

export const getTodaySummary = (logs: JourneyLog[]): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayLogs = logs.filter(log => {
    const logDate = new Date(log.date);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === today.getTime();
  });
  
  if (todayLogs.length === 0) {
    return "No journeys recorded today.";
  }
  
  const totalDuration = todayLogs.reduce((sum, log) => sum + log.duration, 0);
  const totalObstacles = todayLogs.reduce((sum, log) => sum + log.obstacleCount, 0);
  
  return `Today's summary: ${todayLogs.length} journey${todayLogs.length > 1 ? 's' : ''}, ${totalDuration} minutes total, ${totalObstacles} obstacles detected.`;
};
