import React from 'react';
import { Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEmployees } from '../../lib/hooks/useEmployees';

export function AdminStats() {
  const { employees } = useEmployees();

  const stats = [
    {
      name: 'Total Employees',
      value: employees.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Employees',
      value: employees.filter(e => e.status === 'approved').length,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      name: 'Blocked Employees',
      value: employees.filter(e => e.status === 'blocked').length,
      icon: XCircle,
      color: 'bg-red-500',
    },
    {
      name: 'Pending Approval',
      value: employees.filter(e => e.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">System Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}