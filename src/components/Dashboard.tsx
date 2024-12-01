import React from 'react';
import { Activity, Cpu, Database, Network, Shield, AlertTriangle } from 'lucide-react';
import { RealDataService } from '../services/realDataService';
import { useDataService } from '../hooks/useDataService';
import { useMetricsHistory } from '../hooks/useMetricsHistory';
import { MetricsCard } from './MetricsCard';
import { AttackList } from './AttackList';
import { ThreatMap } from './ThreatMap';

const dataService = new RealDataService();

export const Dashboard: React.FC = () => {
  const { attacks, metrics } = useDataService(dataService);
  const metricsHistory = useMetricsHistory(metrics);

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-cyan-500" />
            <div>
              <h1 className="text-xl font-bold">CyberSentry</h1>
              <p className="text-sm text-gray-400">Honeypot Monitoring System</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="System Load"
            value={metrics.cpuUsage}
            unit="%"
            icon={<Cpu className="h-6 w-6 text-cyan-500" />}
            trend={metrics.cpuUsage > 75 ? 'up' : 'down'}
            color="#06B6D4"
            history={metricsHistory}
            dataKey="cpuUsage"
          />
          <MetricsCard
            title="Memory Usage"
            value={metrics.memoryUsage}
            unit="%"
            icon={<Database className="h-6 w-6 text-purple-500" />}
            trend={metrics.memoryUsage > 80 ? 'up' : 'down'}
            color="#A855F7"
            history={metricsHistory}
            dataKey="memoryUsage"
          />
          <MetricsCard
            title="Network Traffic"
            value={metrics.networkTraffic}
            unit="Mb/s"
            icon={<Network className="h-6 w-6 text-green-500" />}
            trend="up"
            color="#22C55E"
            history={metricsHistory}
            dataKey="networkTraffic"
          />
          <MetricsCard
            title="Active Threats"
            value={attacks.filter(a => a.severity === 'high').length}
            unit=""
            icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
            trend={attacks.filter(a => a.severity === 'high').length > 5 ? 'up' : 'down'}
            color="#EF4444"
            history={metricsHistory}
            dataKey="activeConnections"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ThreatMap attacks={attacks} />
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="h-5 w-5 text-cyan-500 mr-2" />
              System Status
            </h2>
            <div className="space-y-4">
              {Object.entries({
                'Firewall': 'Active',
                'IDS/IPS': 'Monitoring',
                'Threat Detection': 'Enhanced',
                'Last Scan': new Date().toLocaleTimeString()
              }).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-400">{key}</span>
                  <span className="text-cyan-500">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AttackList attacks={attacks} />
      </div>
    </div>
  );
};