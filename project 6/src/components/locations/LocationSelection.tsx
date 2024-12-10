import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const locations = [
  {
    id: 'abu-rudeis',
    name: 'Abu Rudeis',
    description: 'South Sinai Governorate'
  },
  {
    id: 'siwa',
    name: 'Siwa',
    description: 'Matrouh Governorate'
  },
  {
    id: 'port-said',
    name: 'Port Said',
    description: 'Port Said Governorate'
  },
  {
    id: 'karama',
    name: 'Karama',
    description: 'Eastern Desert'
  }
];

interface LocationSelectionProps {
  onSelect: (locationId: string) => void;
}

export function LocationSelection({ onSelect }: LocationSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Location</h2>
          <p className="text-gray-600">Choose your work location to continue</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {locations.map((location, index) => (
            <motion.button
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(location.id)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left w-full"
            >
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.name}</h3>
                  <p className="text-gray-600">{location.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}