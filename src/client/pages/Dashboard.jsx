import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  BellIcon,
  ChartBarIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  DocumentChartBarIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';
import MobileHeader from '../components/MobileHeader';
import MobileNavigation from '../components/MobileNavigation';
import ChatBot from '../components/chat/ChatBot';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';
import Inventory from '../components/Inventory';
import Suppliers from '../components/Suppliers';
import Reports from '../components/Reports';
import Orders from '../components/Orders';
import Pricing from './Pricing';
import Settings from '../components/Settings';
import Profile from '../components/Profile';

// ... rest of the code remains the same ...

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Existing components */}
      
      {/* Add ChatBot */}
      <ChatBot />
      
      {/* Rest of the existing JSX */}
    </div>
  );
}