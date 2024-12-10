import React, { useState } from 'react';
import { Users, BarChart2, Settings, LogOut } from 'lucide-react';
import { EmployeeList } from './EmployeeList';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminStats } from './AdminStats';
import { AdminSettings } from './AdminSettings';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState('employees');

  const renderContent = () => {
    switch (currentView) {
      case 'employees':
        return <EmployeeList />;
      case 'stats':
        return <AdminStats />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <EmployeeList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onLogout={onBack} />
      <div className="flex">
        <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}