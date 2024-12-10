import React from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-900 to-black flex flex-col items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: "linear" }}
          className="mb-4"
        >
          <Truck className="w-20 h-20 text-white" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold text-white mb-4"
        >
          EDC
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-2xl text-white font-light"
        >
          Logistic Team
        </motion.div>
      </motion.div>
    </motion.div>
  );
}