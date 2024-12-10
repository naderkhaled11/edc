import React from 'react';
import { Users, Briefcase, BarChart2, Settings, Shield } from 'lucide-react';

interface AdminSidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function AdminSidebar({ currentView, setCurrentView }: AdminSidebarProps) {
  const menuItems = [
    { id: 'employees', icon: Users, label: 'Employees' },
    { id: 'tasks', icon: Briefcase, label: 'Tasks' },
    { id: 'reports', icon: BarChart2, label: 'Reports' },
    { id: 'permissions', icon: Shield, label: 'Permissions' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-8">
        <div className="px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg mb-2 ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}