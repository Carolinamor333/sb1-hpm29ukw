import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../stores/authStore';
import { 
  CubeIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ navigation, bottomNavigation }) {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      {/* Top Section with Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <CubeIcon className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-semibold text-gray-900">ChainBuddy</span>
      </div>

      <div className="flex flex-col h-[calc(100%-4rem)] justify-between">
        {/* Main Navigation */}
        <div className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="px-4 py-4 border-t border-gray-200">
          {/* User Profile Section */}
          <div className="flex items-center px-4 py-3 mb-2">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Bottom Navigation */}
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <item.icon className="h-5 w-5 mr-3 text-gray-400" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3 text-gray-400" />
            <span className="font-medium">Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}