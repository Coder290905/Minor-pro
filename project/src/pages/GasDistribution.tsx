import React from 'react';
import GasPieChart from '../components/GasPieChart';
import { gases } from '../data/airQualityData';
import { BarChart, PieChart, TrendingUp, ArrowUpDown, AlertTriangle } from 'lucide-react';

const GasDistribution: React.FC = () => {
  // Calculate total percentage to ensure it adds up to 100%
  const totalPercentage = gases.reduce((total, gas) => total + gas.percentage, 0);
  
  // Calculate most prevalent gas
  const mostPrevalent = [...gases].sort((a, b) => b.percentage - a.percentage)[0];
  
  // Calculate most hazardous gas (based on ppm/safeLimit ratio)
  const mostHazardous = [...gases].sort((a, b) => (b.ppm / b.safeLimit) - (a.ppm / a.safeLimit))[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Gas Distribution</h1>
        <p className="text-gray-600">
          Visual breakdown of air pollutants and their relative concentrations.
        </p>
      </div>

      <GasPieChart gases={gases} />
      
      {/* Key Insights */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Composition */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
            <div className="flex items-center mb-4">
              <PieChart size={24} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Total Composition</h3>
            </div>
            <div className="text-3xl font-bold text-blue-900 mb-2">{totalPercentage}%</div>
            <p className="text-gray-700">
              Total measured pollutants in the air sample. The remainder consists primarily of nitrogen, oxygen, and trace gases.
            </p>
          </div>
          
          {/* Most Prevalent Gas */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
            <div className="flex items-center mb-4">
              <BarChart size={24} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Most Prevalent</h3>
            </div>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: mostPrevalent.color }}
              ></div>
              <div className="text-xl font-bold text-gray-800">{mostPrevalent.name} ({mostPrevalent.formula})</div>
            </div>
            <div className="text-3xl font-bold text-blue-900 mt-2 mb-2">{mostPrevalent.percentage}%</div>
            <p className="text-gray-700">
              The most abundant pollutant in the current air sample.
            </p>
          </div>
          
          {/* Most Hazardous Gas */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-orange-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Highest Risk</h3>
            </div>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: mostHazardous.color }}
              ></div>
              <div className="text-xl font-bold text-gray-800">{mostHazardous.name} ({mostHazardous.formula})</div>
            </div>
            <div className="text-3xl font-bold text-orange-600 mt-2 mb-2">
              {(mostHazardous.ppm / mostHazardous.safeLimit).toFixed(1)}x
            </div>
            <p className="text-gray-700">
              {(mostHazardous.ppm > mostHazardous.safeLimit) ? 
                `Exceeds safe limit by ${((mostHazardous.ppm / mostHazardous.safeLimit - 1) * 100).toFixed(0)}%` : 
                `At ${((mostHazardous.ppm / mostHazardous.safeLimit) * 100).toFixed(0)}% of safe limit`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Historical Trends */}
      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <TrendingUp size={24} className="text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Historical Trends</h2>
        </div>
        
        <div className="space-y-6">
          {gases.map(gas => (
            <div key={gas.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: gas.color }}
                  ></div>
                  <span className="font-medium text-gray-800">{gas.name} ({gas.formula})</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">30-day trend:</span>
                  <span className={`flex items-center ${Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.random() > 0.5 ? 
                      <ArrowUpDown className="w-4 h-4 mr-1" /> : 
                      <TrendingUp className="w-4 h-4 mr-1" />
                    }
                    {(Math.random() * 20 - 10).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Trend visualization */}
              <div className="h-12 bg-gray-100 rounded-md overflow-hidden relative">
                {/* Generate random trend line */}
                <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path
                    d={`M0,10 ${Array.from({ length: 20 }, (_, i) => 
                      `L${i * 5},${10 + Math.sin(i * 0.5) * 5 + (Math.random() * 3 - 1.5)}`
                    ).join(' ')}`}
                    fill="none"
                    stroke={gas.color}
                    strokeWidth="1.5"
                  />
                </svg>
                
                {/* Month markers */}
                <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-500 px-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GasDistribution;