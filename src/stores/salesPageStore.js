import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useSalesPageStore = create((set, get) => ({
  salesPages: [
    {
      id: '1',
      title: 'Digital Marketing Masterclass',
      slug: 'digital-marketing-masterclass',
      template: 'modern',
      status: 'published',
      productId: '1',
      elements: [
        {
          id: 'hero-1',
          type: 'hero',
          content: {
            headline: 'Master Digital Marketing in 30 Days',
            subheadline: 'Transform your business with proven strategies',
            ctaText: 'Get Started Now',
            backgroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop'
          }
        },
        {
          id: 'features-1',
          type: 'features',
          content: {
            title: 'What You\'ll Learn',
            features: [
              'SEO Optimization',
              'Social Media Marketing',
              'Email Marketing',
              'Content Strategy'
            ]
          }
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  
  addSalesPage: (salesPage) => set((state) => ({
    salesPages: [...state.salesPages, { 
      ...salesPage, 
      id: uuidv4(), 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }]
  })),
  
  updateSalesPage: (id, updates) => set((state) => ({
    salesPages: state.salesPages.map(page => 
      page.id === id ? { ...page, ...updates, updatedAt: new Date().toISOString() } : page
    )
  })),
  
  deleteSalesPage: (id) => set((state) => ({
    salesPages: state.salesPages.filter(page => page.id !== id)
  })),
  
  getSalesPage: (id) => {
    const state = get();
    return state.salesPages.find(page => page.id === id);
  },
}));