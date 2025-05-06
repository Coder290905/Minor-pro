import React from 'react';
import GasTable from '../components/GasTable';
import { gases } from '../data/airQualityData';
import { AlertTriangle, Info } from 'lucide-react';

const GasInfo: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Gas Analysis</h1>
        <p className="text-gray-600">
          Detailed information about air pollutants, their concentrations, and health impacts.
        </p>
      </div>

      <GasTable gases={gases} />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Health Impact Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle size={24} className="text-orange-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Health Impacts</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Air pollutants can cause a wide range of health effects, from mild irritation to serious respiratory and cardiovascular problems. 
            Sensitive groups such as children, the elderly, and those with pre-existing conditions are particularly vulnerable.
          </p>
          <div className="space-y-4 mt-6">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800">Short-term Exposure</h3>
              <p className="text-gray-700">Can cause eye irritation, coughing, wheezing, asthma attacks, and reduced lung function.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800">Long-term Exposure</h3>
              <p className="text-gray-700">May lead to chronic respiratory diseases, heart disease, lung cancer, and reduced life expectancy.</p>
            </div>
          </div>
        </div>
        
        {/* Standards and References */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <Info size={24} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Standards & References</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Air quality standards are established by environmental agencies to protect public health. These standards define 
            the maximum allowable concentrations of various pollutants in the air.
          </p>
          <div className="mt-4 space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-blue-800">EPA Standards</h3>
              <p className="text-gray-700 text-sm">
                The United States Environmental Protection Agency sets National Ambient Air Quality Standards (NAAQS) 
                for six principal pollutants.
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-blue-800">WHO Guidelines</h3>
              <p className="text-gray-700 text-sm">
                The World Health Organization provides global air quality guidelines that are often stricter 
                than regional standards.
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-blue-800">EU Directives</h3>
              <p className="text-gray-700 text-sm">
                The European Union has established air quality directives that set legally binding limits for 
                concentrations of major air pollutants.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Understanding Air Quality Measurements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Parts Per Million (PPM)</h3>
            <p className="text-gray-700">
              PPM is a measure of concentration that indicates the number of parts of a substance per million parts of air. 
              It's commonly used for measuring gaseous pollutants.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Air Quality Index (AQI)</h3>
            <p className="text-gray-700">
              AQI is a numerical scale used to communicate how polluted the air is and what associated health effects might be a concern, 
              particularly for sensitive groups.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Exposure Thresholds</h3>
            <p className="text-gray-700">
              Safe exposure limits represent the concentration below which adverse health effects are not expected to occur in the general population, 
              even for sensitive individuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasInfo;