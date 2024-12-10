import React, { useState } from 'react';
import { Search, ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { SiwaSearch } from './SiwaSearch';
import { AddProduct } from './AddProduct';
import { SellProduct } from './SellProduct';

interface LocationDashboardProps {
  locationId: string;
  onBack: () => void;
}

export function LocationDashboard({ locationId, onBack }: LocationDashboardProps) {
  const [activeTab, setActiveTab] = useState('search');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const tabs = [
    { id: 'search', label: 'Search', icon: Search },
    { id: 'sell', label: 'Sell', icon: ShoppingCart },
    { id: 'add', label: 'Add Product', icon: Plus },
  ];

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const renderContent = () => {
    switch (locationId) {
      case 'siwa':
        switch (activeTab) {
          case 'search':
            return <SiwaSearch key={refreshTrigger} />;
          case 'sell':
            return <SellProduct location={locationId} employeeId={1} onSuccess={handleSuccess} />;
          case 'add':
            return <AddProduct location={locationId} onSuccess={handleSuccess} />;
          default:
            return null;
        }
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Select a feature to get started
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Location Header */}
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-bold capitalize">
              {locationId.replace(/-/g, ' ')}
            </h2>
            <p className="text-blue-100">Operations Dashboard</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-4 text-center border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}