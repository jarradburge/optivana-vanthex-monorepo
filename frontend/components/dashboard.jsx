// Optivana Frontend - Dashboard Component
import React, { useState, useEffect } from 'react';
import { MetricCard } from './metric-card';
import { LineChart, BarChart } from './charts';
import { Alert } from './alert';

export const Dashboard = ({ storeId }) => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [timeframe, setTimeframe] = useState('7d');
  const [error, setError] = useState(null);
  
  // Fetch store data
  useEffect(() => {
    // In a real implementation, this would fetch from API
    const fetchStore = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          // Mock data
          const mockStore = {
            id: storeId,
            name: 'Luxury Lifestyle Store',
            domain: 'luxurylifestyle.store',
            status: 'active',
            mode: 'autonomous',
            performance: {
              revenue: 12500,
              profit: 4800,
              roas: 3.2,
              conversionRate: 4.5
            },
            products: 24,
            campaigns: 8,
            recentActivity: [
              { id: 1, type: 'campaign_launch', message: 'New campaign launched for Summer Collection', timestamp: '2025-05-26T10:30:00Z' },
              { id: 2, type: 'product_added', message: 'New product added: Premium Fitness Watch', timestamp: '2025-05-25T14:45:00Z' },
              { id: 3, type: 'performance_alert', message: 'Campaign "Tech Gadgets" exceeding ROAS targets', timestamp: '2025-05-24T09:15:00Z' }
            ],
            topProducts: [
              { id: 'prod_1', name: 'Premium Fitness Watch', revenue: 3200, profit: 1280, roas: 4.2 },
              { id: 'prod_2', name: 'Luxury Sunglasses', revenue: 2800, profit: 1120, roas: 3.8 },
              { id: 'prod_3', name: 'Designer Backpack', revenue: 2100, profit: 840, roas: 3.5 }
            ],
            performanceData: {
              revenue: [2100, 2400, 2200, 2800, 3000, 3500, 3700],
              profit: [840, 960, 880, 1120, 1200, 1400, 1480],
              roas: [2.8, 3.0, 2.9, 3.2, 3.3, 3.5, 3.6],
              conversionRate: [3.8, 4.0, 3.9, 4.2, 4.3, 4.5, 4.6]
            },
            channelPerformance: {
              facebook: { spend: 1200, revenue: 3600, roas: 3.0 },
              instagram: { spend: 800, revenue: 2800, roas: 3.5 },
              tiktok: { spend: 1000, revenue: 4000, roas: 4.0 },
              google: { spend: 500, revenue: 1500, roas: 3.0 }
            }
          };
          
          setStore(mockStore);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load store data');
        setLoading(false);
      }
    };
    
    fetchStore();
  }, [storeId, timeframe]);
  
  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading store data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4">
        <Alert 
          variant="destructive" 
          title="Error" 
          description={error} 
          action={{ label: 'Retry', onClick: () => window.location.reload() }}
        />
      </div>
    );
  }
  
  if (!store) {
    return (
      <div className="p-4">
        <Alert 
          variant="warning" 
          title="Store Not Found" 
          description="The requested store could not be found." 
        />
      </div>
    );
  }
  
  // Prepare data for charts
  const performanceChartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        name: 'Revenue',
        data: store.performanceData.revenue
      },
      {
        name: 'Profit',
        data: store.performanceData.profit
      }
    ]
  };
  
  const channelChartData = {
    labels: Object.keys(store.channelPerformance),
    datasets: [
      {
        name: 'ROAS',
        data: Object.values(store.channelPerformance).map(channel => channel.roas)
      },
      {
        name: 'Revenue',
        data: Object.values(store.channelPerformance).map(channel => channel.revenue)
      }
    ]
  };
  
  return (
    <div className="dashboard">
      {/* Store Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{store.name}</h1>
            <p className="text-gray-500">{store.domain}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              store.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-1.5 ${
                store.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></span>
              {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {store.mode.charAt(0).toUpperCase() + store.mode.slice(1)} Mode
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Revenue" 
            value={`$${store.performance.revenue.toLocaleString()}`}
            trend={12}
            description="Total revenue in selected period"
          />
          <MetricCard 
            title="Profit" 
            value={`$${store.performance.profit.toLocaleString()}`}
            trend={15}
            description="Total profit in selected period"
          />
          <MetricCard 
            title="ROAS" 
            value={`${store.performance.roas.toFixed(1)}x`}
            trend={8}
            description="Return on ad spend"
          />
          <MetricCard 
            title="Conversion Rate" 
            value={`${store.performance.conversionRate.toFixed(1)}%`}
            trend={5}
            description="Percentage of visitors who convert"
          />
        </div>
      </div>
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Revenue & Profit</h2>
              <div className="flex space-x-2">
                {['7d', '30d', '90d'].map((tf) => (
                  <button
                    key={tf}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeframe === tf
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTimeframeChange(tf)}
                  >
                    {tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : '90 Days'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4">
            <LineChart 
              data={performanceChartData}
              xAxis={performanceChartData.labels}
              series={performanceChartData.datasets}
              height={300}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Channel Performance</h2>
          </div>
          <div className="p-4">
            <BarChart 
              data={channelChartData}
              xAxis={channelChartData.labels}
              series={channelChartData.datasets}
              height={300}
            />
          </div>
        </div>
      </div>
      
      {/* Top Products */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Top Performing Products</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROAS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {store.topProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.profit.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.roas.toFixed(1)}x</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {store.recentActivity.map((activity) => (
              <li key={activity.id} className="p-4">
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activity.type === 'campaign_launch' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'product_added' ? 'bg-green-100 text-green-600' :
                    activity.type === 'performance_alert' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type === 'campaign_launch' ? '📢' :
                     activity.type === 'product_added' ? '📦' :
                     activity.type === 'performance_alert' ? '📈' : '📝'}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
