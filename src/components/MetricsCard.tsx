import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MetricsChart } from './MetricsChart';
import { SystemMetrics } from '../types';

interface MetricsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  color: string;
  history: SystemMetrics[];
  dataKey: keyof SystemMetrics;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  color,
  history,
  dataKey
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-700/50">{icon}</div>
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-semibold">
              {value.toFixed(1)} {unit}
            </p>
          </div>
        </div>
        {trend && (
          <div className={trend === 'up' ? 'text-red-500' : 'text-green-500'}>
            {trend === 'up' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
          </div>
        )}
      </div>
      <div className="h-[100px]">
        <MetricsChart
          data={history}
          dataKey={dataKey}
          color={color}
          unit={unit}
        />
      </div>
    </div>
  );
};