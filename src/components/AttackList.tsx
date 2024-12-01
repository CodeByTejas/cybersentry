import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Attack } from '../types';

interface AttackListProps {
  attacks: Attack[];
}

export const AttackList: React.FC<AttackListProps> = ({ attacks }) => {
  const getSeverityColor = (severity: Attack['severity']) => {
    const colors = {
      low: 'bg-yellow-900/30 text-yellow-500',
      medium: 'bg-orange-900/30 text-orange-500',
      high: 'bg-red-900/30 text-red-500'
    };
    return colors[severity];
  };

  const getStatusColor = (status: Attack['status']) => {
    const colors = {
      blocked: 'bg-green-900/30 text-green-500',
      detected: 'bg-blue-900/30 text-blue-500',
      investigating: 'bg-purple-900/30 text-purple-500'
    };
    return colors[status];
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold flex items-center">
          <Shield className="h-5 w-5 text-cyan-500 mr-2" />
          Threat Activity
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {attacks.map((attack) => (
              <tr key={attack.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {attack.timestamp.toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                  {attack.sourceIP}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    {attack.attackType}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getSeverityColor(attack.severity)}`}>
                    {attack.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(attack.status)}`}>
                    {attack.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};