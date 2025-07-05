import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useOrderStore = create((set, get) => ({
  orders: [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      productName: 'Digital Marketing Course',
      amount: 297,
      status: 'completed',
      paymentMethod: 'credit_card',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: '2',
      customerName: 'Mike Chen',
      customerEmail: 'mike@example.com',
      productName: 'Premium T-Shirt',
      amount: 39.99,
      status: 'pending',
      paymentMethod: 'paypal',
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
  ],
  
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, { 
      ...order, 
      id: uuidv4(), 
      createdAt: new Date().toISOString(),
    }]
  })),
  
  updateOrder: (id, updates) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === id ? { ...order, ...updates } : order
    )
  })),
  
  getOrder: (id) => {
    const state = get();
    return state.orders.find(order => order.id === id);
  },
  
  getOrdersByStatus: (status) => {
    const state = get();
    return state.orders.filter(order => order.status === status);
  },
  
  getTotalRevenue: () => {
    const state = get();
    return state.orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.amount, 0);
  },
}));