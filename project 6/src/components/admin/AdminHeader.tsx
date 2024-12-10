import React from 'react';
import { Bell, Settings, User, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">EDC Admin</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-700">Admin</span>
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}