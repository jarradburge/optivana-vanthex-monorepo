// Optivana Frontend - Test to Print Panel Component
import React, { useState, useEffect } from 'react';
import { Alert } from './alert';
import { MetricCard } from './metric-card';
import { ComparisonChart, BarChart } from './charts';

export const TestToPrintPanel = ({ campaignId }) => {
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [error, setError] = useState(null);
  
  // Fetch campaign data
  useEffect(() => {
    // In a real implementation, this would fetch from API
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          // Mock data
          const mockCampaign = {
            id: campaignId,
            name: 'Summer Collection Launch',
            platform: 'facebook',
            status: 'active',
            budget: {
              daily: 50,
              total: 1500,
              spent: 450
            },
            performance: {
              impressions: 45000,
              clicks: 2250,
              ctr: 5.0,
              conversions: 112,
              conversionRate: 4.98,
              costPerConversion: 4.02,
              revenue: 5600,
              roas: 12.44
            },
            variants: [
              {
                id: 'var_1',
                name: 'Lifestyle Focus',
                status: 'active',
                creativeType: 'image',
                creativeUrl: 'https://example.com/creative1.jpg',
                headline: 'Transform Your Summer Style',
                performance: {
                  impressions: 15000,
                  clicks: 900,
                  ctr: 6.0,
                  conversions: 54,
                  conversionRate: 6.0,
                  costPerConversion: 2.78,
                  revenue: 2700,
                  roas: 18.0
                }
              },
              {
                id: 'var_2',
                name: 'Product Focus',
                status: 'active',
                creativeType: 'image',
                creativeUrl: 'https://example.com/creative2.jpg',
                headline: 'Summer Essentials You Need',
                performance: {
                  impressions: 15000,
                  clicks: 750,
                  ctr: 5.0,
                  conversions: 30,
                  conversionRate: 4.0,
                  costPerConversion: 7.5,
                  revenue: 1500,
                  roas: 6.67
                }
              },
              {
                id: 'var_3',
                name: 'Emotional Appeal',
                status: 'active',
                creativeType: 'video',
                creativeUrl: 'https://example.com/creative3.mp4',
                headline: 'Feel Confident This Summer',
                performance: {
                  impressions: 15000,
                  clicks: 600,
                  ctr: 4.0,
                  conversions: 28,
                  conversionRate: 4.67,
                  costPerConversion: 5.36,
                  revenue: 1400,
                  roas: 8.33
                }
              }
            ]
          };
          
          setCampaign(mockCampaign);
          setVariants(mockCampaign.variants);
          setSelectedVariants([mockCampaign.variants[0].id, mockCampaign.variants[1].id]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load campaign data');
        setLoading(false);
      }
    };
    
    fetchCampaign();
  }, [campaignId]);
  
  // Handle variant selection
  const handleVariantSelect = (variantId) => {
    setSelectedVariants(prev => {
      if (prev.includes(variantId)) {
        return prev.filter(id => id !== variantId);
      } else {
        return [...prev, variantId];
      }
    });
  };
  
  // Handle scaling action
  const handleScale = async () => {
    if (selectedVariants.length === 0) {
      setError('Please select at least one variant to scale');
      return;
    }
    
    try {
      // In a real implementation, this would call the API
      console.log('Scaling variants:', selectedVariants);
      
      // Show success message
      setError(null);
      alert('Scaling initiated for selected variants');
    } catch (err) {
      setError('Failed to scale variants');
    }
  };
  
  // Handle pause action
  const handlePause = async () => {
    if (selectedVariants.length === 0) {
      setError('Please select at least one variant to pause');
      return;
    }
    
    try {
      // In a real implementation, this would call the API
      console.log('Pausing variants:', selectedVariants);
      
      // Show success message
      setError(null);
      alert('Selected variants paused successfully');
    } catch (err) {
      setError('Failed to pause variants');
    }
  };
  
  // Generate new variants
  const handleGenerateVariants = async () => {
    try {
      // In a real implementation, this would call the API
      console.log('Generating new variants');
      
      // Show success message
      setError(null);
      alert('New variants are being generated');
    } catch (err) {
      setError('Failed to generate new variants');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign data...</p>
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
  
  if (!campaign) {
    return (
      <div className="p-4">
        <Alert 
          variant="warning" 
          title="Campaign Not Found" 
          description="The requested campaign could not be found." 
        />
      </div>
    );
  }
  
  // Prepare data for charts
  const comparisonData = variants.map(variant => ({
    name: variant.name,
    roas: variant.performance.roas,
    ctr: variant.performance.ctr,
    conversionRate: variant.performance.conversionRate,
    costPerConversion: variant.performance.costPerConversion
  }));
  
  const performanceMetrics = [
    'roas',
    'ctr',
    'conversionRate',
    'costPerConversion'
  ];
  
  return (
    <div className="test-to-print-panel">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
        <p className="text-gray-500">Test, analyze, and scale your best performing ad variants</p>
      </div>
      
      {/* Campaign Overview */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="ROAS" 
            value={`${campaign.performance.roas.toFixed(2)}x`}
            trend={15}
            description="Return on ad spend"
          />
          <MetricCard 
            title="Conversion Rate" 
            value={`${campaign.performance.conversionRate.toFixed(2)}%`}
            trend={8}
            description="Percentage of clicks that convert"
          />
          <MetricCard 
            title="Cost Per Conversion" 
            value={`$${campaign.performance.costPerConversion.toFixed(2)}`}
            trend={-12}
            description="Average cost per conversion"
          />
          <MetricCard 
            title="Total Revenue" 
            value={`$${campaign.performance.revenue.toFixed(2)}`}
            trend={22}
            description="Total revenue generated"
          />
        </div>
      </div>
      
      {/* Variant Comparison */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Variant Comparison</h2>
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
              onClick={handleGenerateVariants}
            >
              Generate New Variants
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <ComparisonChart 
              data={comparisonData}
              metrics={performanceMetrics}
              height={350}
            />
          </div>
        </div>
      </div>
      
      {/* Variant List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Ad Variants</h2>
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleScale}
              disabled={selectedVariants.length === 0}
            >
              Scale Selected
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePause}
              disabled={selectedVariants.length === 0}
            >
              Pause Selected
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-primary border-gray-300 rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVariants(variants.map(v => v.id));
                      } else {
                        setSelectedVariants([]);
                      }
                    }}
                    checked={selectedVariants.length === variants.length}
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROAS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conv. Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost/Conv.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {variants.map((variant) => (
                <tr 
                  key={variant.id}
                  className={selectedVariants.includes(variant.id) ? 'bg-blue-50' : ''}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-primary border-gray-300 rounded"
                      checked={selectedVariants.includes(variant.id)}
                      onChange={() => handleVariantSelect(variant.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{variant.name}</div>
                        <div className="text-sm text-gray-500">{variant.headline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{variant.performance.roas.toFixed(2)}x</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{variant.performance.ctr.toFixed(2)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{variant.performance.conversionRate.toFixed(2)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${variant.performance.costPerConversion.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      variant.status === 'active' ? 'bg-green-100 text-green-800' :
                      variant.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      variant.status === 'winner' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {variant.status.charAt(0).toUpperCase() + variant.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
