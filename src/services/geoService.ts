import axios from 'axios';

interface GeoLocation {
  latitude: number;
  longitude: number;
}

const cache: Record<string, GeoLocation> = {};

export async function getLocationFromIP(ip: string): Promise<GeoLocation> {
  if (cache[ip]) {
    return cache[ip];
  }

  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const location = {
      latitude: response.data.latitude,
      longitude: response.data.longitude
    };
    cache[ip] = location;
    return location;
  } catch (error) {
    console.error('Error fetching IP location:', error);
    // Return a random location as fallback
    return {
      latitude: (Math.random() * 180) - 90,
      longitude: (Math.random() * 360) - 180
    };
  }
}