// src/lib/store.ts
import { create } from 'zustand';
import { CartItem } from './types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  removeItems: (indices: number[]) => void;
  clearCart: () => void;
  total: () => number;
  expirationTime: number | null;
  setExpirationTime: (time: number | null) => void;
  timeRemaining: () => number | null;
  isLoaded: boolean;
  canAddTicket: (concertId: number, ticketType: 'adult' | 'student') => boolean;
  getTicketCount: (concertId: number, ticketType: 'adult' | 'student') => number;
  updateTicketQuantity: (concertId: number, ticketType: 'adult' | 'student', newQuantity: number) => void;
}

const CART_STORAGE_KEY = 'mcmf_cart';
const CART_EXPIRATION_KEY = 'mcmf_cart_expiration';
const CART_EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
const MAX_TICKETS_PER_TYPE = 4;

export const useCart = create<CartStore>((set, get) => {
  // Load cart from localStorage on initialization
  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedExpiration = localStorage.getItem(CART_EXPIRATION_KEY);
      
      if (savedCart && savedExpiration) {
        const expirationTime = parseInt(savedExpiration);
        const now = Date.now();
        
        if (now < expirationTime) {
          return {
            items: JSON.parse(savedCart),
            expirationTime,
            isLoaded: true
          };
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
    
    return {
      items: [],
      expirationTime: null,
      isLoaded: true
    };
  };

  // Save cart to localStorage
  const saveCart = (items: CartItem[], expirationTime: number | null) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      if (expirationTime) {
        localStorage.setItem(CART_EXPIRATION_KEY, expirationTime.toString());
      } else {
        localStorage.removeItem(CART_EXPIRATION_KEY);
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Initialize cart from localStorage
  const { items, expirationTime, isLoaded } = loadCart();

  // Check for expiration on page load
  if (expirationTime) {
    const now = Date.now();
    if (now >= expirationTime) {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_EXPIRATION_KEY);
    }
  }

  return {
    items,
    expirationTime,
    isLoaded,
    addItem: (item) => {
      // Check ticket limit for concert tickets
      if (item.type === 'ticket' && item.id && item.ticketType) {
        const currentCount = get().getTicketCount(item.id, item.ticketType);
        if (currentCount >= MAX_TICKETS_PER_TYPE) {
          return; // Don't add if limit reached
        }
      }

      const now = Date.now();
      const newExpirationTime = now + CART_EXPIRATION_TIME;
      
      set((state) => {
        const newItems = [...state.items, item];
        saveCart(newItems, newExpirationTime);
        return { 
          items: newItems,
          expirationTime: newExpirationTime
        };
      });
    },
    removeItem: (index) => {
      set((state) => {
        const newItems = state.items.filter((_, i) => i !== index);
        saveCart(newItems, state.expirationTime);
        return { items: newItems };
      });
    },
    removeItems: (indices) => {
      set((state) => {
        const newItems = state.items.filter((_, i) => !indices.includes(i));
        saveCart(newItems, state.expirationTime);
        return { items: newItems };
      });
    },
    clearCart: () => {
      set({ items: [], expirationTime: null });
      saveCart([], null);
    },
    total: () => get().items.reduce((sum, item) => sum + item.price, 0),
    setExpirationTime: (time) => {
      set({ expirationTime: time });
      if (time) {
        localStorage.setItem(CART_EXPIRATION_KEY, time.toString());
      } else {
        localStorage.removeItem(CART_EXPIRATION_KEY);
      }
    },
    timeRemaining: () => {
      const { expirationTime } = get();
      if (!expirationTime) return null;
      
      const now = Date.now();
      const remaining = expirationTime - now;
      
      if (remaining <= 0) {
        get().clearCart();
        return null;
      }
      
      return remaining;
    },
    canAddTicket: (concertId: number, ticketType: 'adult' | 'student') => {
      return get().getTicketCount(concertId, ticketType) < MAX_TICKETS_PER_TYPE;
    },
    getTicketCount: (concertId: number, ticketType: 'adult' | 'student') => {
      return get().items.filter(
        item => item.type === 'ticket' && item.id === concertId && item.ticketType === ticketType
      ).length;
    },
    updateTicketQuantity: (concertId: number, ticketType: 'adult' | 'student', newQuantity: number) => {
      if (newQuantity < 0 || newQuantity > MAX_TICKETS_PER_TYPE) return;

      set((state) => {
        // Remove all tickets of this type
        const otherItems = state.items.filter(
          item => !(item.type === 'ticket' && item.id === concertId && item.ticketType === ticketType)
        );

        // Add new quantity of tickets
        const ticketItems = state.items.filter(
          item => item.type === 'ticket' && item.id === concertId && item.ticketType === ticketType
        );

        if (ticketItems.length > 0) {
          const ticketTemplate = ticketItems[0];
          const newItems = [
            ...otherItems,
            ...Array(newQuantity).fill(ticketTemplate)
          ];
          saveCart(newItems, state.expirationTime);
          return { items: newItems };
        }

        return state;
      });
    }
  };
});