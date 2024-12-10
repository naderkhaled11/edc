import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export function BackButton({ onClick, className = '' }: BackButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center text-gray-600 hover:text-blue-600 transition-colors ${className}`}
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      <span>Back</span>
    </motion.button>
  );
}