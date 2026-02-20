
import React, { createContext, useContext, useReducer } from 'react';
import { toast } from "sonner";

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: string;
  artist: {
    name: string;
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        toast.info("Item already in cart");
        return state;
      }

      const newItem = { ...action.payload, quantity: 1 };
      const newTotal = state.total + parseFloat(action.payload.price.replace(/[₹,]/g, ''));

      toast.success("Added to cart");
      return {
        items: [...state.items, newItem],
        total: newTotal
      };
    }
    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      const newTotal = itemToRemove
        ? state.total - (parseFloat(itemToRemove.price.replace(/[₹,]/g, '')) * itemToRemove.quantity)
        : state.total;

      toast.info("Removed from cart");
      return {
        items: state.items.filter(item => item.id !== action.payload),
        total: newTotal
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const newItems = state.items.map(item => {
        if (item.id === id) {
          const oldTotal = parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity;
          const newTotal = parseFloat(item.price.replace(/[₹,]/g, '')) * quantity;
          state.total = state.total - oldTotal + newTotal;
          return { ...item, quantity };
        }
        return item;
      });

      return {
        items: newItems,
        total: state.total
      };
    }
    case 'CLEAR_CART':
      toast.success("Cart cleared");
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

