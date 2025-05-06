import React, { useEffect, useState } from 'react';
import { AQILevel, getAQILevel } from '../data/airQualityData';

interface AQIGaugeProps {
  aqi: number;
}

const AQIGauge: React.FC<AQIGaugeProps> = ({ aqi }) => {
  const [level, setLevel] = useState<AQILevel>(getAQILevel(aqi));
  const [animatedAQI, setAnimatedAQI] = useState(0);

  const clampedAQI = Math.max(0, Math.min(500, aqi));

  const calculateRotation = (value: number): number => {
    return (value / 500) * 180 - 90;
  };

  useEffect(() => {
    setLevel(getAQILevel(clampedAQI));
    let start: number | null = null;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.round(easedProgress * clampedAQI);
      setAnimatedAQI(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [clampedAQI]);

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Air Quality Index</h2>

      <div className="relative w-full h-48 mt-4">
        <div className="absolute inset-0 h-24 overflow-hidden rounded-t-full">
          <div className="h-48 w-full absolute bottom-0 bg-gradient-to-r from-green-500 via-yellow-400 via-orange-500 via-red-500 to-purple-800"></div>
        </div>

        <div className="absolute bottom-0 w-full flex justify-between px-4 text-xs font-medium text-gray-700">
          {[0, 100, 200, 300, 400, 500].map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>

        <div
          className="absolute bottom-0 left-1/2 w-1 h-28 bg-gray-800 rounded-t-full origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${calculateRotation(animatedAQI)}deg)` }}
          aria-hidden="true"
        >
          <div className="w-4 h-4 rounded-full bg-gray-800 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 w-24 h-24 rounded-full bg-white border-4 flex items-center justify-center shadow-lg"
          style={{ borderColor: level.color }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: level.color }}>{animatedAQI}</div>
            <div className="text-xs font-semibold" style={{ color: level.color }}>{level.category}</div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold mb-2" style={{ color: level.color }}>{level.category} Air Quality</h3>
        <p className="text-gray-700 mb-2">{level.description}</p>
        <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: hexToRgba(level.color, 0.2) }}>
          <h4 className="font-semibold mb-1 text-gray-800">Health Advice:</h4>
          <p className="text-gray-700">{level.health}</p>
        </div>
      </div>
    </div>
  );
};

export default AQIGauge;