import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useUIStore } from '../../stores/uiStore';

const { 
  FiHome, FiPackage, FiFileText, FiShoppingCart, 
  FiUsers, FiBarChart3, FiSettings, FiZap 
} = FiIcons;

const navigation = [
  { name: 'Dashboard', href: '/', icon: FiHome },
  { name: 'Products', href: '/products', icon: FiPackage },
  { name: 'Sales Pages', href: '/sales-pages', icon: FiFileText },
  { name: 'Orders', href: '/orders', icon: FiShoppingCart },
  { name: 'Customers', href: '/customers', icon: FiUsers },
  { name: 'Analytics', href: '/analytics', icon: FiBarChart3 },
  { name: 'Settings', href: '/settings', icon: FiSettings },
];

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen } = useUIStore();

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-16 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiZap} className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-900">SamCart Pro</span>
          )}
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;