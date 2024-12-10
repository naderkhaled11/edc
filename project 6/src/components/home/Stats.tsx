import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Box, Building2, Users2 } from 'lucide-react';

export function Stats() {
  const stats = [
    { icon: Globe2, value: '50+', label: 'Countries Served' },
    { icon: Box, value: '1M+', label: 'Deliveries Completed' },
    { icon: Building2, value: '100+', label: 'Warehouses' },
    { icon: Users2, value: '10K+', label: 'Happy Clients' },
  ];

  return (
    <div className="bg-blue-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-300" />
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}