import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Logistics Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Global Logistics Solutions for Modern Business
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Streamline your supply chain with EDC Logistics - Your trusted partner in worldwide shipping and logistics
          </p>
          
          <div className="flex justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}