import React from 'react';
import { Truck, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EDC</span>
              <span className="text-blue-600 font-medium">Logistics</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#" active>Home</NavLink>
              <NavLink href="#">Services</NavLink>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Get Quote
              </button>
            </div>
            <div className="md:hidden">
              <Menu className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`text-gray-700 hover:text-blue-600 transition-colors ${
        active ? 'text-blue-600' : ''
      }`}
    >
      {children}
    </a>
  );
}