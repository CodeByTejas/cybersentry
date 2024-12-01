export interface DataService {
  getInitialAttacks(): Promise<Attack[]>;
  subscribeToAttacks(callback: (attack: Attack) => void): () => void;
  getSystemMetrics(): Promise<SystemMetrics>;
  subscribeToMetrics(callback: (metrics: SystemMetrics) => void): () => void;
}

export interface Attack {
  id: string;
  timestamp: Date;
  sourceIP: string;
  attackType: string;
  severity: 'low' | 'medium' | 'high';
  port: number;
  protocol: string;
  status: 'blocked' | 'detected' | 'investigating';
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkTraffic: number;
  activeConnections: number;
}