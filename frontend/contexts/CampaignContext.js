// Optivana Frontend - Campaign Context
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/api';
import { useStore } from './StoreContext';

// Create context
const CampaignContext = createContext();

// Provider component
export const CampaignProvider = ({ children }) => {
  const { currentStore } = useStore();
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch campaigns when store changes
  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!currentStore) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await apiService.campaigns.getAll(currentStore.id);
        setCampaigns(response.data);
        
        // Reset current campaign when store changes
        setCurrentCampaign(null);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError('Failed to load campaigns. Please try again.');
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [currentStore]);

  // Create a new campaign
  const createCampaign = async (campaignData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.campaigns.create({
        ...campaignData,
        storeId: currentStore.id
      });
      setCampaigns([...campaigns, response.data]);
      setCurrentCampaign(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a campaign
  const updateCampaign = async (id, campaignData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.campaigns.update(id, campaignData);
      
      // Update campaigns list
      setCampaigns(campaigns.map(campaign => 
        campaign.id === id ? response.data : campaign
      ));
      
      // Update current campaign if it's the one being updated
      if (currentCampaign && currentCampaign.id === id) {
        setCurrentCampaign(response.data);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update campaign.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a campaign
  const deleteCampaign = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await apiService.campaigns.delete(id);
      
      // Remove from campaigns list
      const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
      setCampaigns(updatedCampaigns);
      
      // If current campaign is deleted, set to null
      if (currentCampaign && currentCampaign.id === id) {
        setCurrentCampaign(null);
      }
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete campaign.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Launch a campaign
  const launchCampaign = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.campaigns.launch(id);
      
      // Update campaigns list
      setCampaigns(campaigns.map(campaign => 
        campaign.id === id ? response.data : campaign
      ));
      
      // Update current campaign if it's the one being launched
      if (currentCampaign && currentCampaign.id === id) {
        setCurrentCampaign(response.data);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to launch campaign.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Pause a campaign
  const pauseCampaign = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.campaigns.pause(id);
      
      // Update campaigns list
      setCampaigns(campaigns.map(campaign => 
        campaign.id === id ? response.data : campaign
      ));
      
      // Update current campaign if it's the one being paused
      if (currentCampaign && currentCampaign.id === id) {
        setCurrentCampaign(response.data);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to pause campaign.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get campaign variants
  const getCampaignVariants = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.campaigns.getVariants(id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get campaign variants.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Scale campaign variants
  const scaleCampaignVariants = async (id, variantIds) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.campaigns.scaleVariants(id, variantIds);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to scale campaign variants.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set current campaign
  const selectCampaign = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setCurrentCampaign(campaign);
      return true;
    }
    return false;
  };

  // Context value
  const value = {
    campaigns,
    currentCampaign,
    loading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    launchCampaign,
    pauseCampaign,
    getCampaignVariants,
    scaleCampaignVariants,
    selectCampaign
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
};

// Custom hook to use campaign context
export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};

export default CampaignContext;
