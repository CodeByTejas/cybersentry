import { Attack, SystemMetrics } from '../types';

const generateUniqueId = () => {
  return `attack-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateMockAttacks = (count: number): Attack[] => {
  const attackTypes = ['SSH Brute Force', 'SQL Injection', 'Port Scan', 'DDoS'];
  const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS'];
  
  return Array.from({ length: count }, () => ({
    id: generateUniqueId(),
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    sourceIP: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    attackType: attackTypes[Math.floor(Math.random() * attackTypes.length)],
    severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Attack['severity'],
    port: Math.floor(Math.random() * 65535),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    status: ['blocked', 'detected', 'investigating'][Math.floor(Math.random() * 3)] as Attack['status']
  }));
};

export const generateSystemMetrics = (): SystemMetrics => ({
  cpuUsage: Math.random() * 100,
  memoryUsage: Math.random() * 100,
  networkTraffic: Math.random() * 1000,
  activeConnections: Math.floor(Math.random() * 100)
});