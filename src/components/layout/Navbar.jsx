import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';

const { FiMenu, FiBell, FiSearch, FiChevronDown } = FiIcons;

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50"
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <SafeIcon icon={FiMenu} className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="relative">
          <SafeIcon icon={FiSearch} className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;