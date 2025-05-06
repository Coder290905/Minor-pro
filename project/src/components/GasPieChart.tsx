import React from 'react';
import { Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';
import { Gas } from '../data/airQualityData';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

interface GasPieChartProps {
  gases: Gas[];
}

const GasPieChart: React.FC<GasPieChartProps> = ({ gases }) => {
  // Prepare data for the pie chart
  const data = {
    labels: gases.map(gas => `${gas.name} (${gas.formula})`),
    datasets: [
      {
        data: gases.map(gas => gas.percentage),
        backgroundColor: gases.map(gas => gas.color),
        borderColor: gases.map(gas => gas.color),
        borderWidth: 1,
        hoverOffset: 15,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 14,
            family: "'Inter', 'system-ui', sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const formattedValue = value.toFixed(1);
            return `${label}: ${formattedValue}%`;
          }
        }
      },
      title: {
        display: true,
        text: 'Air Composition Breakdown',
        font: {
          size: 18,
          weight: 'bold' as const,
          family: "'Inter', 'system-ui', sans-serif",
        },
        padding: {
          top: 10,
          bottom: 30
        },
        color: '#1E3A8A',
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Chart */}
        <div className="w-full md:w-2/3 h-96">
          <Pie data={data} options={options} />
        </div>
        
        {/* Legend with details */}
        <div className="w-full md:w-1/3 bg-blue-50 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Gas Composition Details</h3>
          <div className="space-y-4">
            {gases.map(gas => (
              <div key={gas.id} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: gas.color }}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{gas.name} ({gas.formula})</span>
                    <span className="font-bold text-blue-900">{gas.percentage}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${gas.percentage}%`,
                        backgroundColor: gas.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Additional information */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Understanding Air Composition</h3>
        <p className="text-gray-700 mb-4">
          The chart above shows the relative distribution of harmful gases and particulates in the air. 
          These pollutants can significantly impact air quality and have various health effects depending on their concentration.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Did you know?</h4>
          <p className="text-gray-700">
            While natural air contains primarily nitrogen (78%) and oxygen (21%), the chart above focuses on the distribution of pollutants 
            that affect air quality. Even at small concentrations (measured in parts per million), these pollutants can have significant 
            health impacts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GasPieChart;