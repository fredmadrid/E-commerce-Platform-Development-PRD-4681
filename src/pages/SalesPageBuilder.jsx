import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useSalesPageStore } from '../stores/salesPageStore';
import { v4 as uuidv4 } from 'uuid';

const { FiSave, FiEye, FiPlus, FiSettings, FiType, FiImage, FiVideo, FiGrid, FiTrash2 } = FiIcons;

const elementTypes = [
  { type: 'hero', name: 'Hero Section', icon: FiImage, description: 'Main banner with headline and CTA' },
  { type: 'features', name: 'Features', icon: FiGrid, description: 'Product features list' },
  { type: 'testimonials', name: 'Testimonials', icon: FiType, description: 'Customer testimonials' },
  { type: 'video', name: 'Video', icon: FiVideo, description: 'Embedded video content' },
  { type: 'pricing', name: 'Pricing', icon: FiSettings, description: 'Pricing table' },
];

const SalesPageBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSalesPage, updateSalesPage, addSalesPage } = useSalesPageStore();
  const [page, setPage] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (id) {
      const existingPage = getSalesPage(id);
      if (existingPage) {
        setPage(existingPage);
      }
    } else {
      // Create new page
      const newPage = {
        id: uuidv4(),
        title: 'Untitled Page',
        slug: 'untitled-page',
        template: 'modern',
        status: 'draft',
        elements: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPage(newPage);
    }
  }, [id]);

  const handleSave = () => {
    if (!page) return;
    
    if (id) {
      updateSalesPage(id, page);
      toast.success('Page updated successfully!');
    } else {
      addSalesPage(page);
      toast.success('Page created successfully!');
      navigate(`/sales-pages/builder/${page.id}`);
    }
  };

  const handlePublish = () => {
    if (!page) return;
    
    const updatedPage = { ...page, status: 'published' };
    setPage(updatedPage);
    
    if (id) {
      updateSalesPage(id, updatedPage);
    } else {
      addSalesPage(updatedPage);
    }
    
    toast.success('Page published successfully!');
  };

  const addElement = (elementType) => {
    if (!page) return;
    
    const newElement = {
      id: uuidv4(),
      type: elementType,
      content: getDefaultContent(elementType),
    };
    
    setPage({
      ...page,
      elements: [...page.elements, newElement],
    });
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'hero':
        return {
          headline: 'Your Amazing Product',
          subheadline: 'Transform your life with our revolutionary solution',
          ctaText: 'Get Started Now',
          backgroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
        };
      case 'features':
        return {
          title: 'Amazing Features',
          features: [
            'Feature 1',
            'Feature 2',
            'Feature 3',
            'Feature 4',
          ],
        };
      case 'testimonials':
        return {
          title: 'What Our Customers Say',
          testimonials: [
            {
              name: 'John Doe',
              text: 'This product changed my life!',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
            },
          ],
        };
      case 'video':
        return {
          title: 'Watch Our Demo',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        };
      case 'pricing':
        return {
          title: 'Choose Your Plan',
          price: '$97',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          ctaText: 'Buy Now',
        };
      default:
        return {};
    }
  };

  const updateElement = (elementId, updates) => {
    if (!page) return;
    
    setPage({
      ...page,
      elements: page.elements.map(element =>
        element.id === elementId ? { ...element, content: { ...element.content, ...updates } } : element
      ),
    });
  };

  const removeElement = (elementId) => {
    if (!page) return;
    
    setPage({
      ...page,
      elements: page.elements.filter(element => element.id !== elementId),
    });
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex"
      >
        {/* Left Sidebar - Elements */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Settings</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={page.title}
                    onChange={(e) => setPage({ ...page, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={page.status}
                    onChange={(e) => setPage({ ...page, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Elements</h2>
              <div className="space-y-2">
                {elementTypes.map((elementType) => (
                  <button
                    key={elementType.type}
                    onClick={() => addElement(elementType.type)}
                    className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    <SafeIcon icon={elementType.icon} className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{elementType.name}</div>
                      <div className="text-xs text-gray-500">{elementType.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">{page.title}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                page.status === 'published' 
                  ? 'bg-success-100 text-success-800'
                  : 'bg-warning-100 text-warning-800'
              }`}>
                {page.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/checkout/${page.id}`)}
              >
                <SafeIcon icon={FiEye} className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="secondary"
                onClick={handleSave}
              >
                <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handlePublish}
              >
                Publish
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-soft min-h-96">
                {page.elements.length === 0 ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <SafeIcon icon={FiPlus} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Add elements to start building your page</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {page.elements.map((element) => (
                      <ElementRenderer
                        key={element.id}
                        element={element}
                        onUpdate={(updates) => updateElement(element.id, updates)}
                        onRemove={() => removeElement(element.id)}
                        isSelected={selectedElement === element.id}
                        onSelect={() => setSelectedElement(element.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DndProvider>
  );
};

const ElementRenderer = ({ element, onUpdate, onRemove, isSelected, onSelect }) => {
  const { type, content } = element;

  const renderElement = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="relative h-96 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{content.headline}</h1>
                <p className="text-xl mb-8">{content.subheadline}</p>
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {content.ctaText}
                </button>
              </div>
            </div>
          </div>
        );
      case 'features':
        return (
          <div className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <SafeIcon icon={FiSettings} className="w-6 h-6 text-primary-600" />
                  </div>
                  <p className="font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>
            <div className="max-w-2xl mx-auto">
              {content.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>
            <div className="max-w-2xl mx-auto">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiVideo} className="w-12 h-12 text-gray-400" />
              </div>
            </div>
          </div>
        );
      case 'pricing':
        return (
          <div className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>
            <div className="max-w-md mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary-600 mb-4">{content.price}</div>
                <ul className="space-y-2 mb-6">
                  {content.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-center">
                      <SafeIcon icon={FiSettings} className="w-4 h-4 text-success-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  {content.ctaText}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Unknown element type</div>;
    }
  };

  return (
    <div
      className={`relative group ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
      onClick={onSelect}
    >
      {renderElement()}
      
      {/* Element Controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiTrash2} className="w-4 h-4 text-error-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesPageBuilder;