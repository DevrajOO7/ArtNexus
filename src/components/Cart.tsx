
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { IndianRupee, Trash2, Minus, Plus } from 'lucide-react';

interface CartProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart = ({ open, onClose, onCheckout }: CartProps) => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
        </DrawerHeader>
        
        <div className="p-4 space-y-4">
          {state.items.length === 0 ? (
            <p className="text-center text-muted-foreground">Your cart is empty</p>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.artist.name}</p>
                  <div className="flex items-center mt-2">
                    <IndianRupee className="h-4 w-4" />
                    <span>{item.price.replace('₹', '')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        <DrawerFooter>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total:</span>
            <div className="flex items-center text-lg font-medium">
              <IndianRupee className="h-5 w-5" />
              <span>{state.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Button 
              className="w-full" 
              disabled={state.items.length === 0}
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

