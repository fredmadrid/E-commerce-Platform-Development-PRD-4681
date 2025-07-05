import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiShoppingCart, FiCreditCard, FiDownload, FiSettings, FiLogOut } = FiIcons;

const CustomerPortal = () => {
  const [activeTab, setActiveTab] = useState('orders');

  // Mock customer data
  const customer = {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    joinDate: '2023-01-15',
    totalSpent: 456.98,
    orderCount: 3,
  };

  const orders = [
    {
      id: '1',
      date: '2023-12-01',
      product: 'Digital Marketing Course',
      amount: 297,
      status: 'completed',
      downloadUrl: '#',
    },
    {
      id: '2',
      date: '2023-11-15',
      product: 'Premium T-Shirt',
      amount: 39.99,
      status: 'shipped',
      trackingNumber: '1Z999AA1234567890',
    },
    {
      id: '3',
      date: '2023-10-20',
      product: 'Consultation Call',
      amount: 119.99,
      status: 'completed',
    },
  ];

  const subscriptions = [
    {
      id: '1',
      name: 'Monthly Coaching',
      price: 97,
      nextBilling: '2024-01-01',
      status: 'active',
    },
  ];

  const tabs = [
    { id: 'orders', name: 'Orders', icon: FiShoppingCart },
    { id: 'subscriptions', name: 'Subscriptions', icon: FiCreditCard },
    { id: 'profile', name: 'Profile', icon: FiUser },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'shipped':
        return 'bg-primary-100 text-primary-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.product}</h3>
                    <p className="text-sm text-gray-500">
                      Order #{order.id} • {format(new Date(order.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${order.amount}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {order.downloadUrl && (
                      <Button variant="outline" size="sm">
                        <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                    {order.trackingNumber && (
                      <div className="text-sm text-gray-600">
                        Tracking: <span className="font-mono">{order.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        );
        
      case 'subscriptions':
        return (
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{subscription.name}</h3>
                    <p className="text-sm text-gray-500">
                      Next billing: {format(new Date(subscription.nextBilling), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${subscription.price}/month</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <SafeIcon icon={FiCreditCard} className="w-4 h-4 mr-2" />
                      Update Payment
                    </Button>
                    <Button variant="outline" size="sm">
                      <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    Cancel Subscription
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        );
        
      case 'profile':
        return (
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customer.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline">
                  Update Profile
                </Button>
              </div>
            </div>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Portal</h1>
              <p className="text-gray-600">Welcome back, {customer.name}!</p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <SafeIcon icon={FiLogOut} className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiUser} className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
                <p className="text-gray-600">{customer.email}</p>
              </div>
            </Card>

            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{customer.orderCount}</p>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-full">
                    <SafeIcon icon={FiShoppingCart} className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">${customer.totalSpent}</p>
                  </div>
                  <div className="p-3 bg-success-50 rounded-full">
                    <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-success-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Member Since</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {format(new Date(customer.joinDate), 'MMM yyyy')}
                    </p>
                  </div>
                  <div className="p-3 bg-warning-50 rounded-full">
                    <SafeIcon icon={FiUser} className="w-6 h-6 text-warning-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;