import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useProductStore = create((set, get) => ({
  products: [
    {
      id: '1',
      name: 'Digital Marketing Course',
      type: 'digital',
      price: 297,
      description: 'Complete digital marketing course with 50+ lessons',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Premium T-Shirt',
      type: 'physical',
      price: 39.99,
      description: 'High-quality cotton t-shirt with custom design',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
  ],
  
  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: uuidv4(), createdAt: new Date().toISOString() }]
  })),
  
  updateProduct: (id, updates) => set((state) => ({
    products: state.products.map(product => 
      product.id === id ? { ...product, ...updates } : product
    )
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(product => product.id !== id)
  })),
  
  getProduct: (id) => {
    const state = get();
    return state.products.find(product => product.id === id);
  },
}));