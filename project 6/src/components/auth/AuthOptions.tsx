import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Shield } from 'lucide-react';

interface AuthOptionsProps {
  onAdminClick: () => void;
  onRegisterClick: () => void;
  onLoginClick: () => void;
}

export function AuthOptions({ onAdminClick, onRegisterClick, onLoginClick }: AuthOptionsProps) {
  const options = [
    {
      icon: LogIn,
      title: 'Login',
      description: 'Access your account',
      onClick: onLoginClick,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: UserPlus,
      title: 'Register',
      description: 'Create new account',
      onClick: onRegisterClick,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: Shield,
      title: 'Admin',
      description: 'Administrative access',
      onClick: onAdminClick,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to EDC Logistics</h2>
          <p className="text-gray-600">Please select an option to continue</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={option.onClick}
                className="w-full h-full text-left"
              >
                <div className="h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                  <div className={`${option.color} p-6 flex justify-center transition-colors`}>
                    <option.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}