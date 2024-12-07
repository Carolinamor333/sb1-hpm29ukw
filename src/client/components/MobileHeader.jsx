import { useState } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  BellIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

export default function MobileHeader({ onMenuToggle }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <span className="ml-2 text-xl font-semibold text-gray-900">ChainBuddy</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}