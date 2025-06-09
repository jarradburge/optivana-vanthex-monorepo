// Optivana Frontend - Store Context
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/api';
import { useAuth } from './AuthContext';

// Create context
const StoreContext = createContext();

// Provider component
export const StoreProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [stores, setStores] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stores when authenticated
  useEffect(() => {
    const fetchStores = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await apiService.stores.getAll();
        setStores(response.data);
        
        // Set current store to the first one if not already set
        if (response.data.length > 0 && !currentStore) {
          setCurrentStore(response.data[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stores:', err);
        setError('Failed to load stores. Please try again.');
        setLoading(false);
      }
    };

    fetchStores();
  }, [isAuthenticated, currentStore]);

  // Create a new store
  const createStore = async (storeData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.stores.create(storeData);
      setStores([...stores, response.data]);
      setCurrentStore(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create store.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a store
  const updateStore = async (id, storeData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.stores.update(id, storeData);
      
      // Update stores list
      setStores(stores.map(store => 
        store.id === id ? response.data : store
      ));
      
      // Update current store if it's the one being updated
      if (currentStore && currentStore.id === id) {
        setCurrentStore(response.data);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update store.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a store
  const deleteStore = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await apiService.stores.delete(id);
      
      // Remove from stores list
      const updatedStores = stores.filter(store => store.id !== id);
      setStores(updatedStores);
      
      // If current store is deleted, set to first available or null
      if (currentStore && currentStore.id === id) {
        setCurrentStore(updatedStores.length > 0 ? updatedStores[0] : null);
      }
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete store.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Switch current store
  const switchStore = (storeId) => {
    const store = stores.find(s => s.id === storeId);
    if (store) {
      setCurrentStore(store);
      return true;
    }
    return false;
  };

  // Get store performance
  const getStorePerformance = async (id, timeframe = '7d') => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.stores.getPerformance(id, timeframe);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get store performance.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    stores,
    currentStore,
    loading,
    error,
    createStore,
    updateStore,
    deleteStore,
    switchStore,
    getStorePerformance
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

// Custom hook to use store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export default StoreContext;
