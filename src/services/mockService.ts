import { DataService, Attack, SystemMetrics } from './types';

const generateUniqueId = () => {
  return `attack-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const generateMockAttack = (): Attack => {
  const attackTypes = ['SSH Brute Force', 'SQL Injection', 'Port Scan', 'DDoS'];
  const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS'];
  
  return {
    id: generateUniqueId(),
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    sourceIP: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    attackType: attackTypes[Math.floor(Math.random() * attackTypes.length)],
    severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Attack['severity'],
    port: Math.floor(Math.random() * 65535),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    status: ['blocked', 'detected', 'investigating'][Math.floor(Math.random() * 3)] as Attack['status']
  };
};

const generateSystemMetrics = (): SystemMetrics => ({
  cpuUsage: Math.random() * 100,
  memoryUsage: Math.random() * 100,
  networkTraffic: Math.random() * 1000,
  activeConnections: Math.floor(Math.random() * 100)
});

export class MockDataService implements DataService {
  private metricsInterval: number | null = null;
  private attacksInterval: number | null = null;

  async getInitialAttacks(): Promise<Attack[]> {
    return Array.from({ length: 10 }, () => generateMockAttack());
  }

  subscribeToAttacks(callback: (attack: Attack) => void): () => void {
    this.attacksInterval = window.setInterval(() => {
      callback(generateMockAttack());
    }, 3000);

    return () => {
      if (this.attacksInterval) {
        clearInterval(this.attacksInterval);
      }
    };
  }

  async getSystemMetrics(): Promise<SystemMetrics> {
    return generateSystemMetrics();
  }

  subscribeToMetrics(callback: (metrics: SystemMetrics) => void): () => void {
    this.metricsInterval = window.setInterval(() => {
      callback(generateSystemMetrics());
    }, 3000);

    return () => {
      if (this.metricsInterval) {
        clearInterval(this.metricsInterval);
      }
    };
  }
}