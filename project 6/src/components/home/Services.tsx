import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Ship, Plane, Package, BarChart3, Shield } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Truck,
      title: 'Ground Transport',
      description: 'Reliable road freight solutions across the continent'
    },
    {
      icon: Ship,
      title: 'Ocean Freight',
      description: 'International shipping with global port coverage'
    },
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'Express air cargo services worldwide'
    },
    {
      icon: Package,
      title: 'Warehousing',
      description: 'State-of-the-art storage facilities'
    },
    {
      icon: BarChart3,
      title: 'Supply Chain',
      description: 'End-to-end supply chain management'
    },
    {
      icon: Shield,
      title: 'Cargo Insurance',
      description: 'Comprehensive cargo protection services'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to your business needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <service.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}