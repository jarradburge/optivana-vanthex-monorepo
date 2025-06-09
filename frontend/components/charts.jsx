// Optivana Frontend - Charts Component
import React from 'react';

export const LineChart = ({ data, xAxis, series, height = 300 }) => {
  // In a real implementation, this would use a charting library like Chart.js or Recharts
  return (
    <div className="chart-container" style={{ height: `${height}px` }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {series.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: getChartColor(index) }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative w-full" style={{ height: `${height - 50}px` }}>
        <div className="chart-placeholder bg-gray-50 rounded-lg w-full h-full flex items-center justify-center">
          <p className="text-gray-400 text-sm">
            Line chart visualization would render here with real data
          </p>
        </div>
        
        {/* Sample data points to show chart structure */}
        <div className="absolute inset-0 p-4">
          <div className="relative w-full h-full">
            {/* This is just a visual representation - in a real implementation, this would be generated from actual data */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M0,80 C20,70 40,20 60,40 S80,60 100,30" 
                fill="none" 
                stroke={getChartColor(0)} 
                strokeWidth="2"
              />
              <path 
                d="M0,90 C30,85 50,60 70,70 S90,75 100,60" 
                fill="none" 
                stroke={getChartColor(1)} 
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
          <div key={index} className="text-xs text-gray-500">{month}</div>
        ))}
      </div>
    </div>
  );
};

export const BarChart = ({ data, xAxis, series, height = 300 }) => {
  // In a real implementation, this would use a charting library like Chart.js or Recharts
  return (
    <div className="chart-container" style={{ height: `${height}px` }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {series.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: getChartColor(index) }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative w-full" style={{ height: `${height - 50}px` }}>
        <div className="chart-placeholder bg-gray-50 rounded-lg w-full h-full flex items-center justify-center">
          <p className="text-gray-400 text-sm">
            Bar chart visualization would render here with real data
          </p>
        </div>
        
        {/* Sample bars to show chart structure */}
        <div className="absolute inset-0 p-4">
          <div className="relative w-full h-full flex items-end justify-around">
            {/* This is just a visual representation - in a real implementation, this would be generated from actual data */}
            {['Facebook', 'Instagram', 'TikTok', 'Google'].map((platform, index) => (
              <div key={index} className="flex flex-col items-center" style={{ width: '20%' }}>
                <div 
                  className="w-full rounded-t-sm" 
                  style={{ 
                    backgroundColor: getChartColor(0),
                    height: `${20 + Math.random() * 50}%`
                  }}
                />
                <div 
                  className="w-full mt-1 rounded-t-sm" 
                  style={{ 
                    backgroundColor: getChartColor(1),
                    height: `${10 + Math.random() * 30}%`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-around mt-2">
        {['Facebook', 'Instagram', 'TikTok', 'Google'].map((platform, index) => (
          <div key={index} className="text-xs text-gray-500">{platform}</div>
        ))}
      </div>
    </div>
  );
};

export const ComparisonChart = ({ data, metrics, height = 300 }) => {
  // In a real implementation, this would use a charting library like Chart.js or Recharts
  return (
    <div className="chart-container" style={{ height: `${height}px` }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: getChartColor(index) }}
              />
              <span className="text-sm text-gray-600">{formatMetricName(metric)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative w-full" style={{ height: `${height - 50}px` }}>
        <div className="chart-placeholder bg-gray-50 rounded-lg w-full h-full flex items-center justify-center">
          <p className="text-gray-400 text-sm">
            Comparison chart visualization would render here with real data
          </p>
        </div>
        
        {/* Sample radar chart to show structure */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 relative">
            {/* This is just a visual representation - in a real implementation, this would be generated from actual data */}
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              {/* Background circles */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Axes */}
              <line x1="50" y1="5" x2="50" y2="95" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="20" y1="20" x2="80" y2="80" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="20" y1="80" x2="80" y2="20" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Data polygon - Variant A */}
              <polygon 
                points="50,15 75,40 65,75 35,75 25,40" 
                fill={`${getChartColor(0)}33`} 
                stroke={getChartColor(0)} 
                strokeWidth="2"
              />
              
              {/* Data polygon - Variant B */}
              <polygon 
                points="50,25 65,45 60,65 40,65 35,45" 
                fill={`${getChartColor(1)}33`} 
                stroke={getChartColor(1)} 
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-around mt-2">
        {data.slice(0, 3).map((item, index) => (
          <div key={index} className="text-xs text-gray-500">{item.name || `Variant ${index + 1}`}</div>
        ))}
      </div>
    </div>
  );
};

// Helper functions
const getChartColor = (index) => {
  const colors = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#ec4899'  // pink-500
  ];
  
  return colors[index % colors.length];
};

const formatMetricName = (metric) => {
  // Convert camelCase to Title Case
  return metric
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};
