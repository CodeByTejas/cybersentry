import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Globe } from 'lucide-react';
import { Attack } from '../types';
import { getLocationFromIP } from '../services/geoService';
import 'leaflet/dist/leaflet.css';

interface ThreatMapProps {
  attacks: Attack[];
}

interface AttackLocation extends Attack {
  lat: number;
  lng: number;
}

export const ThreatMap: React.FC<ThreatMapProps> = ({ attacks }) => {
  const [attacksWithLocation, setAttacksWithLocation] = useState<AttackLocation[]>([]);
  const highSeverityCount = attacks.filter(a => a.severity === 'high').length;

  useEffect(() => {
    const fetchLocations = async () => {
      const locatedAttacks = await Promise.all(
        attacks.map(async (attack) => {
          const location = await getLocationFromIP(attack.sourceIP);
          return {
            ...attack,
            lat: location.latitude,
            lng: location.longitude
          };
        })
      );
      setAttacksWithLocation(locatedAttacks);
    };

    fetchLocations();
  }, [attacks]);

  const getSeverityColor = (severity: Attack['severity']) => {
    const colors = {
      low: '#FCD34D',
      medium: '#F97316',
      high: '#EF4444'
    };
    return colors[severity];
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Globe className="h-5 w-5 text-cyan-500 mr-2" />
        Global Threat Map
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Active Threats</span>
          <span className="text-red-500 font-semibold">{highSeverityCount}</span>
        </div>
        <div className="h-[400px] bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {attacksWithLocation.map((attack) => (
              <CircleMarker
                key={attack.id}
                center={[attack.lat, attack.lng]}
                radius={attack.severity === 'high' ? 8 : 6}
                fillColor={getSeverityColor(attack.severity)}
                color={getSeverityColor(attack.severity)}
                weight={2}
                opacity={0.8}
                fillOpacity={0.4}
              >
                <Popup className="bg-gray-800 text-white border-gray-700">
                  <div className="p-2">
                    <h3 className="font-semibold">{attack.attackType}</h3>
                    <p className="text-sm">IP: {attack.sourceIP}</p>
                    <p className="text-sm">Protocol: {attack.protocol}</p>
                    <p className="text-sm">Port: {attack.port}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};