export interface CityData {
  city: string;
  state: string;
  aqi: number;
  temperature: number;
  windSpeed: number;
  humidity: number;
  latitude: number;
  longitude: number;
}

export async function parseCitiesCSV(): Promise<CityData[]> {
  try {
    const response = await fetch('/src/data/cities.csv');
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        city: values[0],
        state: values[1],
        aqi: Number(values[2]),
        temperature: Number(values[3]),
        windSpeed: Number(values[4]),
        humidity: Number(values[5]),
        latitude: Number(values[6]),
        longitude: Number(values[7])
      };
    });
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}