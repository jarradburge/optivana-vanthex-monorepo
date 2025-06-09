// Optivana Frontend - Header Component
import React, { useState } from 'react';
import { BellIcon, SearchIcon, ChevronDownIcon } from './icons';

export const Header = ({ storeId, onStoreChange }) => {
  const [stores, setStores] = useState([
    { id: 'store_123', name: 'Luxury Lifestyle Store' },
    { id: 'store_456', name: 'Tech Gadgets Hub' },
    { id: 'store_789', name: 'Fitness Essentials' }
  ]);
  
  const [notifications, setNotifications] = useState([
    { id: 'notif_1', title: 'Campaign performing well', type: 'success' },
    { id: 'notif_2', title: 'New trending product detected', type: 'info' },
    { id: 'notif_3', title: 'Budget alert', type: 'warning' }
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStoreSelector, setShowStoreSelector] = useState(false);
  
  const currentStore = stores.find(store => store.id === storeId) || stores[0];
  
  const handleStoreChange = (newStoreId) => {
    onStoreChange(newStoreId);
    setShowStoreSelector(false);
  };
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              onClick={() => setShowStoreSelector(!showStoreSelector)}
            >
              <span className="font-medium">{currentStore.name}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            
            {showStoreSelector && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-2">
                  {stores.map(store => (
                    <button
                      key={store.id}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        store.id === storeId ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleStoreChange(store.id)}
                    >
                      {store.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <SearchIcon className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 outline-none text-sm"
              />
            </div>
          </div>
          
          <div className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="w-5 h-5 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className="p-3 border-b border-gray-100 hover:bg-gray-50"
                      >
                        <div className="flex items-start">
                          <div className={`w-2 h-2 mt-1.5 rounded-full ${getNotificationColor(notification.type)}`} />
                          <div className="ml-3">
                            <p className="text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-500 mt-1">Just now</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-primary p-2 hover:bg-gray-50 rounded-md">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper function for notification color
const getNotificationColor = (type) => {
  switch (type) {
    case 'success': return 'bg-green-500';
    case 'warning': return 'bg-yellow-500';
    case 'error': return 'bg-red-500';
    case 'info':
    default: return 'bg-blue-500';
  }
};
