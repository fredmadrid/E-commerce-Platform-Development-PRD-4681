import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useOrderStore } from '../stores/orderStore';
import { useProductStore } from '../stores/productStore';
import { useSalesPageStore } from '../stores/salesPageStore';

const { FiDollarSign, FiShoppingCart, FiTrendingUp, FiUsers } = FiIcons;

const Dashboard = () => {
  const { orders, getTotalRevenue } = useOrderStore();
  const { products } = useProductStore();
  const { salesPages } = useSalesPageStore();

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${getTotalRevenue().toLocaleString()}`,
      icon: FiDollarSign,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      title: 'Total Orders',
      value: orders.length.toString(),
      icon: FiShoppingCart,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      title: 'Active Products',
      value: products.filter(p => p.status === 'active').length.toString(),
      icon: FiTrendingUp,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      change: '+3.1%',
      changeType: 'positive',
    },
    {
      title: 'Sales Pages',
      value: salesPages.length.toString(),
      icon: FiUsers,
      color: 'text-error-600',
      bgColor: 'bg-error-50',
      change: '+5.7%',
      changeType: 'positive',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back! Here's what's happening with your store.
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiShoppingCart} className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.productName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${order.amount}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'completed' 
                    ? 'bg-success-100 text-success-800'
                    : 'bg-warning-100 text-warning-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default Dashboard;