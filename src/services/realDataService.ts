import axios from 'axios';
import { io } from 'socket.io-client';
import { DataService, Attack, SystemMetrics } from './types';
import { API_CONFIG } from '../config/constants';

export class RealDataService implements DataService {
  private socket: any;
  private attackCallbacks: ((attack: Attack) => void)[] = [];
  private metricsCallbacks: ((metrics: SystemMetrics) => void)[] = [];

  constructor() {
    this.initializeWebSocket();
    this.startAttackSimulation(); // Temporary until we have real attack data
  }

  private initializeWebSocket() {
    this.socket = io(API_CONFIG.SYSTEM_METRICS_WS_URL);

    this.socket.on('metrics', (data: SystemMetrics) => {
      this.metricsCallbacks.forEach(callback => callback(data));
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  private async checkIPReputation(ip: string): Promise<any> {
    try {
      const response = await axios.get(`${API_CONFIG.ABUSEIPDB_BASE_URL}/check`, {
        params: { ipAddress: ip },
        headers: {
          'Key': API_CONFIG.ABUSEIPDB_API_KEY,
          'Accept': 'application/json'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error checking IP reputation:', error);
      return null;
    }
  }

  // Temporary method to simulate attacks until we have real attack data
  private startAttackSimulation() {
    setInterval(async () => {
      const ip = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
      const ipData = await this.checkIPReputation(ip);
      
      const attack: Attack = {
        id: `attack-${Date.now()}`,
        timestamp: new Date(),
        sourceIP: ip,
        attackType: ipData?.usageType || 'Unknown',
        severity: this.calculateSeverity(ipData?.abuseConfidenceScore || 0),
        port: Math.floor(Math.random() * 65535),
        protocol: ['TCP', 'UDP', 'HTTP', 'HTTPS'][Math.floor(Math.random() * 4)],
        status: 'detected'
      };

      this.attackCallbacks.forEach(callback => callback(attack));
    }, 5000);
  }

  private calculateSeverity(abuseConfidenceScore: number): Attack['severity'] {
    if (abuseConfidenceScore >= 80) return 'high';
    if (abuseConfidenceScore >= 40) return 'medium';
    return 'low';
  }

  async getInitialAttacks(): Promise<Attack[]> {
    // In a real implementation, you would fetch historical attack data from your backend
    return [];
  }

  subscribeToAttacks(callback: (attack: Attack) => void): () => void {
    this.attackCallbacks.push(callback);
    return () => {
      this.attackCallbacks = this.attackCallbacks.filter(cb => cb !== callback);
    };
  }

  async getSystemMetrics(): Promise<SystemMetrics> {
    // Initial metrics
    return {
      cpuUsage: 0,
      memoryUsage: 0,
      networkTraffic: 0,
      activeConnections: 0
    };
  }

  subscribeToMetrics(callback: (metrics: SystemMetrics) => void): () => void {
    this.metricsCallbacks.push(callback);
    return () => {
      this.metricsCallbacks = this.metricsCallbacks.filter(cb => cb !== callback);
    };
  }
}