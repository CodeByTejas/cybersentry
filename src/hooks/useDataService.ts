import { useState, useEffect } from 'react';
import { DataService, Attack, SystemMetrics } from '../services';

export function useDataService(service: DataService) {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

  useEffect(() => {
    // Load initial data
    service.getInitialAttacks().then(initialAttacks => {
      setAttacks(initialAttacks);
    });

    service.getSystemMetrics().then(initialMetrics => {
      setMetrics(initialMetrics);
    });

    // Subscribe to updates
    const unsubscribeAttacks = service.subscribeToAttacks(newAttack => {
      setAttacks(prev => [newAttack, ...prev.slice(0, 9)]);
    });

    const unsubscribeMetrics = service.subscribeToMetrics(newMetrics => {
      setMetrics(newMetrics);
    });

    return () => {
      unsubscribeAttacks();
      unsubscribeMetrics();
    };
  }, [service]);

  return { attacks, metrics };
}