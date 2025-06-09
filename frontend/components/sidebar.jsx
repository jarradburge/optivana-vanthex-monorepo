// Optivana Frontend - Sidebar Component
import React from 'react';
import { 
  HomeIcon, 
  BeakerIcon, 
  ShoppingBagIcon, 
  MegaphoneIcon, 
  CogIcon 
} from './icons';

export const Sidebar = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'test-to-print', label: 'Test to Print', icon: BeakerIcon },
    { id: 'products', label: 'Products', icon: ShoppingBagIcon },
    { id: 'campaigns', label: 'Campaigns', icon: MegaphoneIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Optivana</h1>
        <p className="text-sm text-gray-500">VANTHEX AI Engine</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center px-4 py-3 text-sm rounded-lg w-full ${
              currentView === item.id
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="font-medium">OP</span>
          </div>
          <div>
            <p className="text-sm font-medium">Optivana Pro</p>
            <p className="text-xs text-gray-500">Autonomous Mode</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
