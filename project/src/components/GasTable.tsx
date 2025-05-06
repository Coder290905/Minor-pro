import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Gas } from '../data/airQualityData';

interface GasTableProps {
  gases: Gas[];
}

const GasTable: React.FC<GasTableProps> = ({ gases }) => {
  const [expandedGas, setExpandedGas] = useState<string | null>(null);

  const toggleExpand = (gasId: string) => {
    if (expandedGas === gasId) {
      setExpandedGas(null);
    } else {
      setExpandedGas(gasId);
    }
  };

  const getSafetyStatus = (gas: Gas) => {
    const ratio = gas.ppm / gas.safeLimit;
    if (ratio > 1.5) return { level: 'Dangerous', color: 'bg-red-100 text-red-800' };
    if (ratio > 1) return { level: 'Unsafe', color: 'bg-orange-100 text-orange-800' };
    if (ratio > 0.75) return { level: 'Warning', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'Safe', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Air Composition Analysis</h2>
      
      <div className="overflow-hidden rounded-lg border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-blue-50 p-4 font-medium text-gray-700 border-b border-gray-200">
          <div className="col-span-3 sm:col-span-2">Gas</div>
          <div className="col-span-2 sm:col-span-2">Formula</div>
          <div className="col-span-3 sm:col-span-2">Concentration</div>
          <div className="col-span-3 sm:col-span-2">Status</div>
          <div className="hidden sm:block sm:col-span-3">Hazard Level</div>
          <div className="col-span-1">Details</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {gases.map(gas => {
            const safety = getSafetyStatus(gas);
            
            return (
              <div key={gas.id} className="transition-all duration-300 hover:bg-blue-50/50">
                {/* Main Row */}
                <div className="grid grid-cols-12 p-4 items-center text-gray-800">
                  <div className="col-span-3 sm:col-span-2 font-medium">{gas.name}</div>
                  <div className="col-span-2 sm:col-span-2 font-mono">{gas.formula}</div>
                  <div className="col-span-3 sm:col-span-2">{gas.ppm} ppm</div>
                  <div className="col-span-3 sm:col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${safety.color}`}>
                      {safety.level}
                    </span>
                  </div>
                  <div className="hidden sm:flex sm:col-span-3 items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${Math.min(100, (gas.ppm / gas.safeLimit) * 100)}%`,
                          backgroundColor: gas.color
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button 
                      className="text-blue-600 hover:text-blue-800 transition-colors" 
                      onClick={() => toggleExpand(gas.id)}
                      aria-label={`${expandedGas === gas.id ? 'Collapse' : 'Expand'} details for ${gas.name}`}
                    >
                      {expandedGas === gas.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>
                
                {/* Expanded Content */}
                {expandedGas === gas.id && (
                  <div className="bg-blue-50/50 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <AlertCircle size={18} className="mr-2 text-blue-600" />
                        Potential Hazards
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {gas.hazards.map((hazard, index) => (
                          <li key={index}>{hazard}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Information</h3>
                      <p className="text-gray-700">
                        <span className="font-medium">Safe Limit:</span> {gas.safeLimit} ppm
                      </p>
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium">Current Status:</span> {gas.ppm > gas.safeLimit ? 
                          `${(gas.ppm / gas.safeLimit).toFixed(1)}x above safe limit` : 
                          `Within safe limits (${((gas.ppm / gas.safeLimit) * 100).toFixed(0)}% of limit)`}
                      </p>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="h-4 rounded-full transition-all duration-500 relative"
                            style={{ 
                              width: `${Math.min(100, (gas.ppm / gas.safeLimit) * 100)}%`,
                              backgroundColor: gas.color
                            }}
                          >
                            {gas.ppm / gas.safeLimit > 0.3 && (
                              <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white">
                                {((gas.ppm / gas.safeLimit) * 100).toFixed(0)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GasTable;