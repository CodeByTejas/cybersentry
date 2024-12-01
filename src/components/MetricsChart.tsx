import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemMetrics } from '../types';

interface MetricsChartProps {
  data: SystemMetrics[];
  dataKey: keyof SystemMetrics;
  color: string;
  unit: string;
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ data, dataKey, color, unit }) => {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" hide />
        <YAxis hide domain={['auto', 'auto']} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '0.375rem',
          }}
          labelStyle={{ color: '#9CA3AF' }}
          itemStyle={{ color: '#E5E7EB' }}
          formatter={(value: number) => [`${value.toFixed(1)}${unit}`, '']}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};