// Optivana Frontend - Mock API Service for Production
// This service provides mock data when the backend API is not available

const mockData = {
  // Mock user data
  user: {
    id: 'demo-user-1',
    name: 'Demo User',
    email: 'demo@optivana.com',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00.000Z'
  },
  
  // Mock store data
  stores: [
    {
      id: 'store_1',
      name: 'Luxury Lifestyle Store',
      url: 'https://luxury-lifestyle.optivana.store',
      status: 'active',
      performance: {
        revenue: 12580,
        orders: 142,
        conversion: 3.2,
        traffic: 4500
      }
    }
  ],
  
  // Mock product data
  products: [
    {
      id: 'product_1',
      storeId: 'store_1',
      name: 'Premium Wellness Package',
      description: 'Complete wellness solution for modern lifestyles',
      price: 89.99,
      cost: 32.50,
      status: 'active',
      inventory: 250,
      images: ['https://via.placeholder.com/500x500?text=Premium+Wellness+Package']
    },
    {
      id: 'product_2',
      storeId: 'store_1',
      name: 'Smart Home Automation Kit',
      description: 'Transform your home with intelligent automation',
      price: 199.99,
      cost: 85.00,
      status: 'active',
      inventory: 120,
      images: ['https://via.placeholder.com/500x500?text=Smart+Home+Kit']
    }
  ],
  
  // Mock campaign data
  campaigns: [
    {
      id: 'campaign_1',
      storeId: 'store_1',
      name: 'Summer Wellness Promotion',
      status: 'active',
      budget: 1000,
      spent: 450,
      roas: 2.8,
      impressions: 28000,
      clicks: 1200,
      conversions: 85,
      variants: [
        {
          id: 'variant_1',
          name: 'Emotional Appeal',
          performance: { impressions: 14000, clicks: 700, conversions: 52, roas: 3.1 }
        },
        {
          id: 'variant_2',
          name: 'Feature Focus',
          performance: { impressions: 14000, clicks: 500, conversions: 33, roas: 2.4 }
        }
      ]
    }
  ],
  
  // Mock system alerts
  alerts: [
    {
      id: 'alert_1',
      type: 'success',
      message: 'Campaign "Summer Wellness Promotion" is performing well with 3.1 ROAS',
      read: false,
      createdAt: '2025-05-30T10:30:00.000Z'
    },
    {
      id: 'alert_2',
      type: 'info',
      message: 'New product trend detected in your niche',
      read: true,
      createdAt: '2025-05-29T14:15:00.000Z'
    }
  ]
};

// Mock API service with methods that return promises with mock data
const mockApiService = {
  // Auth endpoints
  auth: {
    login: (credentials) => {
      console.log('Mock API: Login attempt with', credentials);
      return Promise.resolve({ 
        data: { 
          token: 'mock-jwt-token', 
          user: mockData.user 
        } 
      });
    },
    register: (userData) => {
      console.log('Mock API: Register attempt with', userData);
      return Promise.resolve({ 
        data: { 
          token: 'mock-jwt-token', 
          user: { ...mockData.user, ...userData } 
        } 
      });
    },
    logout: () => {
      console.log('Mock API: Logout');
      localStorage.removeItem('token');
      return Promise.resolve({ data: { success: true } });
    },
    getProfile: () => {
      console.log('Mock API: Get profile');
      return Promise.resolve({ data: mockData.user });
    }
  },
  
  // Store endpoints
  stores: {
    getAll: () => {
      console.log('Mock API: Get all stores');
      return Promise.resolve({ data: mockData.stores });
    },
    getById: (id) => {
      console.log(`Mock API: Get store ${id}`);
      const store = mockData.stores.find(s => s.id === id) || mockData.stores[0];
      return Promise.resolve({ data: store });
    },
    create: (storeData) => {
      console.log('Mock API: Create store', storeData);
      const newStore = { id: `store_${Date.now()}`, ...storeData };
      return Promise.resolve({ data: newStore });
    },
    update: (id, storeData) => {
      console.log(`Mock API: Update store ${id}`, storeData);
      return Promise.resolve({ data: { id, ...storeData } });
    },
    delete: (id) => {
      console.log(`Mock API: Delete store ${id}`);
      return Promise.resolve({ data: { success: true } });
    },
    getPerformance: (id, timeframe) => {
      console.log(`Mock API: Get store performance ${id} for ${timeframe}`);
      const store = mockData.stores.find(s => s.id === id) || mockData.stores[0];
      return Promise.resolve({ data: store.performance });
    }
  },
  
  // Product endpoints
  products: {
    getAll: (storeId) => {
      console.log(`Mock API: Get all products for store ${storeId}`);
      const products = mockData.products.filter(p => p.storeId === storeId);
      return Promise.resolve({ data: products });
    },
    getById: (id) => {
      console.log(`Mock API: Get product ${id}`);
      const product = mockData.products.find(p => p.id === id) || mockData.products[0];
      return Promise.resolve({ data: product });
    },
    create: (productData) => {
      console.log('Mock API: Create product', productData);
      const newProduct = { id: `product_${Date.now()}`, ...productData };
      return Promise.resolve({ data: newProduct });
    },
    update: (id, productData) => {
      console.log(`Mock API: Update product ${id}`, productData);
      return Promise.resolve({ data: { id, ...productData } });
    },
    delete: (id) => {
      console.log(`Mock API: Delete product ${id}`);
      return Promise.resolve({ data: { success: true } });
    },
    discover: (options) => {
      console.log('Mock API: Discover products with options', options);
      return Promise.resolve({ data: mockData.products });
    }
  },
  
  // Campaign endpoints
  campaigns: {
    getAll: (storeId) => {
      console.log(`Mock API: Get all campaigns for store ${storeId}`);
      const campaigns = mockData.campaigns.filter(c => c.storeId === storeId);
      return Promise.resolve({ data: campaigns });
    },
    getById: (id) => {
      console.log(`Mock API: Get campaign ${id}`);
      const campaign = mockData.campaigns.find(c => c.id === id) || mockData.campaigns[0];
      return Promise.resolve({ data: campaign });
    },
    create: (campaignData) => {
      console.log('Mock API: Create campaign', campaignData);
      const newCampaign = { id: `campaign_${Date.now()}`, ...campaignData };
      return Promise.resolve({ data: newCampaign });
    },
    update: (id, campaignData) => {
      console.log(`Mock API: Update campaign ${id}`, campaignData);
      return Promise.resolve({ data: { id, ...campaignData } });
    },
    delete: (id) => {
      console.log(`Mock API: Delete campaign ${id}`);
      return Promise.resolve({ data: { success: true } });
    },
    launch: (id) => {
      console.log(`Mock API: Launch campaign ${id}`);
      return Promise.resolve({ data: { id, status: 'active' } });
    },
    pause: (id) => {
      console.log(`Mock API: Pause campaign ${id}`);
      return Promise.resolve({ data: { id, status: 'paused' } });
    },
    getVariants: (id) => {
      console.log(`Mock API: Get variants for campaign ${id}`);
      const campaign = mockData.campaigns.find(c => c.id === id) || mockData.campaigns[0];
      return Promise.resolve({ data: campaign.variants || [] });
    },
    createVariant: (id, variantData) => {
      console.log(`Mock API: Create variant for campaign ${id}`, variantData);
      const newVariant = { id: `variant_${Date.now()}`, ...variantData };
      return Promise.resolve({ data: newVariant });
    },
    updateVariant: (id, variantId, variantData) => {
      console.log(`Mock API: Update variant ${variantId} for campaign ${id}`, variantData);
      return Promise.resolve({ data: { id: variantId, ...variantData } });
    },
    deleteVariant: (id, variantId) => {
      console.log(`Mock API: Delete variant ${variantId} for campaign ${id}`);
      return Promise.resolve({ data: { success: true } });
    },
    scaleVariants: (id, variantIds) => {
      console.log(`Mock API: Scale variants ${variantIds} for campaign ${id}`);
      return Promise.resolve({ data: { success: true } });
    }
  },
  
  // System endpoints
  system: {
    getAlerts: () => {
      console.log('Mock API: Get system alerts');
      return Promise.resolve({ data: mockData.alerts });
    },
    markAlertRead: (id) => {
      console.log(`Mock API: Mark alert ${id} as read`);
      return Promise.resolve({ data: { id, read: true } });
    },
    getHealth: () => {
      console.log('Mock API: Get system health');
      return Promise.resolve({ data: { status: 'healthy' } });
    }
  }
};

export default mockApiService;
