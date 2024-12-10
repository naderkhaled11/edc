import React from 'react';
import { Truck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-4">
            <Truck className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">EDC</span>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center w-full">
            <p className="mb-4">© {new Date().getFullYear()} EDC Logistics. All rights reserved.</p>
            <div className="mt-8 flex flex-col items-center">
              <p className="text-gray-400 text-sm mb-2">Under the supervision of</p>
              <p className="text-gray-200 text-lg font-serif mb-1">Director of Logistics Department</p>
              <div className="relative mt-4 mb-2">
                <p className="font-['Dancing_Script'] text-3xl text-blue-400 transform -rotate-6 relative">
                  m.EAMD SAID
                </p>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-blue-400/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}