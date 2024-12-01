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