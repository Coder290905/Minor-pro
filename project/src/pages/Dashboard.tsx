import React, { useState, useEffect } from 'react';
import AQIGauge from '../components/AQIGauge';
import { getAQILevel } from '../data/airQualityData';
import { Clock, MapPin, Calendar, Wind, ThermometerSun, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { CityData, parseCitiesCSV } from '../utils/csvParser';

const Dashboard: React.FC = () => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const loadCities = async () => {
      const cityData = await parseCitiesCSV();
      setCities(cityData);
      setSelectedCity(cityData[0]); // Set first city as default
    };
    loadCities();
  }, []);

  const filteredCities = cities.filter(city => 
    city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to get current date in readable format
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString(undefined, options);
  };
  
  // Function to get current time
  const getCurrentTime = () => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date().toLocaleTimeString(undefined, options);
  };

  if (!selectedCity) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const aqiLevel = getAQILevel(selectedCity.aqi);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content - Left Side (3 columns) */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Air Quality Dashboard</h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center">
                <MapPin size={18} className="mr-1 text-blue-700" />
                <span>{selectedCity.city}, {selectedCity.state}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-1 text-blue-700" />
                <span>{getCurrentDate()}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-1 text-blue-700" />
                <span>Last updated: {getCurrentTime()}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <AQIGauge aqi={selectedCity.aqi} />
          </div>

          {/* Weather Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Current Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-gray-700">
                  <ThermometerSun size={20} className="mr-2 text-blue-600" />
                  <span>Temperature</span>
                </div>
                <span className="font-medium">{selectedCity.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-gray-700">
                  <Wind size={20} className="mr-2 text-blue-600" />
                  <span>Wind Speed</span>
                </div>
                <span className="font-medium">{selectedCity.windSpeed} mph</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Humidity</span>
                </div>
                <span className="font-medium">{selectedCity.humidity}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* City Selection - Right Side (1 column) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Select City</h2>
            
            {/* Search Input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>

            {/* City List */}
            <div className="max-h-[500px] overflow-y-auto">
              {filteredCities.map((city) => (
                <button
                  key={`${city.city}-${city.state}`}
                  onClick={() => setSelectedCity(city)}
                  className={`w-full text-left p-4 rounded-lg mb-2 transition-all ${
                    selectedCity.city === city.city
                      ? 'bg-blue-100 text-blue-900'
                      : 'hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{city.city}</div>
                      <div className="text-sm text-gray-500">{city.state}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-sm font-medium ${
                      getAQILevel(city.aqi).color.replace('text-', 'bg-') + '/20'
                    }`}>
                      AQI: {city.aqi}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Tips Card */}
          <div 
            className="mt-6 rounded-xl shadow-md p-6 text-white"
            style={{ backgroundColor: aqiLevel.color }}
          >
            <h2 className="text-xl font-bold mb-3">Air Quality Tips</h2>
            <div className="space-y-3">
              <p className="flex items-start">
                <span className="mr-2">•</span>
                {selectedCity.aqi > 100 ? 
                  "Limit outdoor activities, especially if you have respiratory issues." :
                  "Air quality is suitable for outdoor activities."
                }
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                {selectedCity.aqi > 150 ?
                  "Keep windows closed to prevent outdoor air pollution from entering your home." :
                  "It's a good time to ventilate your home by opening windows."
                }
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                {selectedCity.aqi > 100 ?
                  "Consider using an air purifier indoors." :
                  "Regular indoor ventilation is recommended."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;