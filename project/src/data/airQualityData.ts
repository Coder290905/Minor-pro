// Air quality data for the dashboard

export interface Gas {
  id: string;
  name: string;
  formula: string;
  ppm: number;
  percentage: number;
  hazards: string[];
  safeLimit: number; // in ppm
  color: string;
}

export const gases: Gas[] = [
  {
    id: "o3",
    name: "Ozone",
    formula: "O₃",
    ppm: 0.07,
    percentage: 15,
    hazards: [
      "Respiratory issues",
      "Lung damage with prolonged exposure",
      "Decreased lung function"
    ],
    safeLimit: 0.07,
    color: "#60A5FA" // blue
  },
  {
    id: "co",
    name: "Carbon Monoxide",
    formula: "CO",
    ppm: 5.2,
    percentage: 25,
    hazards: [
      "Reduces oxygen delivery to organs",
      "Headaches and dizziness",
      "Fatal at high concentrations"
    ],
    safeLimit: 9,
    color: "#F87171" // red
  },
  {
    id: "no2",
    name: "Nitrogen Dioxide",
    formula: "NO₂",
    ppm: 0.06,
    percentage: 20,
    hazards: [
      "Inflammation of airways",
      "Increased asthma attacks",
      "Reduced lung function"
    ],
    safeLimit: 0.1,
    color: "#FBBF24" // yellow
  },
  {
    id: "so2",
    name: "Sulfur Dioxide",
    formula: "SO₂",
    ppm: 0.03,
    percentage: 10,
    hazards: [
      "Irritation of eyes and respiratory system",
      "Aggravates asthma",
      "Can cause acid rain"
    ],
    safeLimit: 0.075,
    color: "#34D399" // green
  },
  {
    id: "pm25",
    name: "Particulate Matter",
    formula: "PM2.5",
    ppm: 15.5,
    percentage: 30,
    hazards: [
      "Penetrates deep into lungs",
      "Cardiovascular and respiratory diseases",
      "Premature death in people with heart or lung disease"
    ],
    safeLimit: 12,
    color: "#A78BFA" // purple
  }
];

// AQI (Air Quality Index) data
export interface AQILevel {
  range: [number, number];
  category: string;
  description: string;
  color: string;
  health: string;
}

export const aqiLevels: AQILevel[] = [
  {
    range: [0, 50],
    category: "Good",
    description: "Air quality is satisfactory, and air pollution poses little or no risk.",
    color: "#10B981", // green
    health: "Minimal to no health risks."
  },
  {
    range: [51, 100],
    category: "Moderate",
    description: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
    color: "#FBBF24", // yellow
    health: "Unusually sensitive people should consider reducing prolonged outdoor exertion."
  },
  {
    range: [101, 150],
    category: "Unhealthy for Sensitive Groups",
    description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    color: "#F97316", // orange
    health: "People with respiratory or heart disease, the elderly and children should limit prolonged outdoor exertion."
  },
  {
    range: [151, 200],
    category: "Unhealthy",
    description: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
    color: "#EF4444", // red
    health: "Everyone should limit prolonged outdoor exertion; sensitive groups should avoid outdoor activities."
  },
  {
    range: [201, 300],
    category: "Very Unhealthy",
    description: "Health alert: The risk of health effects is increased for everyone.",
    color: "#7C3AED", // purple
    health: "Everyone should avoid outdoor physical activities; sensitive groups should remain indoors."
  },
  {
    range: [301, 500],
    category: "Hazardous",
    description: "Health warning of emergency conditions: everyone is more likely to be affected.",
    color: "#991B1B", // dark red
    health: "Everyone should avoid all outdoor activities; sensitive groups should remain indoors and keep activity levels low."
  }
];

export const currentAQI = 87; // Example AQI value in the moderate range

export function getAQILevel(aqi: number): AQILevel {
  return aqiLevels.find(level => aqi >= level.range[0] && aqi <= level.range[1]) || aqiLevels[0];
}