import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useOrderStore } from '../stores/orderStore';

const { FiTrendingUp, FiDollarSign, FiShoppingCart, FiUsers, FiCalendar } = FiIcons;

const Analytics = () => {
  const { orders } = useOrderStore();
  const [timeRange, setTimeRange] = useState('7d');

  // Generate sample data for charts
  const salesData = [
    { name: 'Mon', sales: 1200, orders: 12 },
    { name: 'Tue', sales: 1900, orders: 19 },
    { name: 'Wed', sales: 800, orders: 8 },
    { name: 'Thu', sales: 1600, orders: 16 },
    { name: 'Fri', sales: 2100, orders: 21 },
    { name: 'Sat', sales: 1800, orders: 18 },
    { name: 'Sun', sales: 1400, orders: 14 },
  ];

  const productData = [
    { name: 'Digital Marketing Course', value: 65, color: '#0ea5e9' },
    { name: 'Premium T-Shirt', value: 25, color: '#22c55e' },
    { name: 'Consultation', value: 10, color: '#f59e0b' },
  ];

  const conversionData = [
    { name: 'Landing Page Views', value: 1200 },
    { name: 'Add to Cart', value: 480 },
    { name: 'Checkout Started', value: 320 },
    { name: 'Orders Completed', value: 240 },
  ];

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const conversionRate = 20; // Sample conversion rate

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" className="flex items-center space-x-2">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-success-600 mt-1">+12.5% from last month</p>
            </div>
            <div className="p-3 bg-success-50 rounded-full">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              <p className="text-xs text-success-600 mt-1">+8.2% from last month</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-full">
              <SafeIcon icon={FiShoppingCart} className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900">${averageOrderValue.toFixed(2)}</p>
              <p className="text-xs text-success-600 mt-1">+3.1% from last month</p>
            </div>
            <div className="p-3 bg-warning-50 rounded-full">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
              <p className="text-xs text-success-600 mt-1">+2.3% from last month</p>
            </div>
            <div className="p-3 bg-error-50 rounded-full">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-error-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Product Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={conversionData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Products */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
        <div className="space-y-4">
          {productData.map((product, index) => (
            <div key={product.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                </div>
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full" 
                    style={{ width: `${product.value}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{product.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default Analytics;