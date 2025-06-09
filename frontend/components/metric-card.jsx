// Optivana Frontend - MetricCard Component
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from './icons';

export const MetricCard = ({ title, value, trend, description }) => {
  const isTrendPositive = trend > 0;
  const isTrendNegative = trend < 0;
  const trendValue = Math.abs(trend);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        
        {trend !== 0 && (
          <div className={`flex items-center px-2 py-1 rounded-full text-xs ${
            isTrendPositive ? 'bg-green-100 text-green-800' : 
            isTrendNegative ? 'bg-red-100 text-red-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {isTrendPositive && <ArrowUpIcon className="w-3 h-3 mr-1" />}
            {isTrendNegative && <ArrowDownIcon className="w-3 h-3 mr-1" />}
            {trendValue}%
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      )}
    </div>
  );
};

// Using imported icons from ./icons.jsx
