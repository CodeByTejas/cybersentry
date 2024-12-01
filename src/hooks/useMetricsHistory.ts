import { useState, useEffect } from 'react';
import { SystemMetrics } from '../types';

const MAX_HISTORY_LENGTH = 20;

export function useMetricsHistory(currentMetrics: SystemMetrics | null) {
  const [history, setHistory] = useState<SystemMetrics[]>([]);

  useEffect(() => {
    if (currentMetrics) {
      setHistory(prev => {
        const newHistory = [...prev, { ...currentMetrics, timestamp: Date.now() }];
        return newHistory.slice(-MAX_HISTORY_LENGTH);
      });
    }
  }, [currentMetrics]);

  return history;
}