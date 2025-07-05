import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useSalesPageStore } from '../stores/salesPageStore';
import { useProductStore } from '../stores/productStore';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiCopy, FiSettings } = FiIcons;

const SalesPages = () => {
  const { salesPages, addSalesPage, deleteSalesPage } = useSalesPageStore();
  const { products } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    productId: '',
    template: 'modern',
    status: 'draft',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const salesPageData = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      elements: [],
    };

    addSalesPage(salesPageData);
    toast.success('Sales page created successfully!');
    
    setIsModalOpen(false);
    setFormData({
      title: '',
      productId: '',
      template: 'modern',
      status: 'draft',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sales page?')) {
      deleteSalesPage(id);
      toast.success('Sales page deleted successfully!');
    }
  };

  const copyPageUrl = (page) => {
    const url = `${window.location.origin}/#/checkout/${page.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Page URL copied to clipboard!');
  };

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and professional design' },
    { id: 'bold', name: 'Bold', description: 'High-impact design for conversions' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and focused layout' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales Pages</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Create Page</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salesPages.map((page) => {
          const product = products.find(p => p.id === page.productId);
          
          return (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden" hover>
                <div className="aspect-video bg-gradient-to-br from-primary-50 to-primary-100 relative flex items-center justify-center">
                  <div className="text-center">
                    <SafeIcon icon={FiEye} className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-sm text-primary-600 font-medium">{page.template} Template</p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      page.status === 'published' 
                        ? 'bg-success-100 text-success-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                      {page.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{page.title}</h3>
                  
                  {product && (
                    <div className="flex items-center space-x-2 mb-4">
                      <SafeIcon icon={FiSettings} className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{product.name}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Link to={`/sales-pages/builder/${page.id}`}>
                        <Button variant="ghost" size="sm">
                          <SafeIcon icon={FiEdit} className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyPageUrl(page)}
                      >
                        <SafeIcon icon={FiCopy} className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(page.id)}
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4 text-error-500" />
                      </Button>
                    </div>
                    
                    <Link to={`/checkout/${page.id}`}>
                      <Button size="sm">
                        <SafeIcon icon={FiEye} className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({
            title: '',
            productId: '',
            template: 'modern',
            status: 'draft',
          });
        }}
        title="Create New Sales Page"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <select
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template
            </label>
            <div className="grid grid-cols-1 gap-3">
              {templates.map((template) => (
                <label
                  key={template.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.template === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={formData.template === template.id}
                    onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                    className="sr-only"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Sales Page
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default SalesPages;