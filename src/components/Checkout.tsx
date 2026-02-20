
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { IndianRupee } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
}

export const Checkout = ({ open, onClose }: CheckoutProps) => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with a payment gateway
    // For now, we'll just show a success message
    toast.success("Order placed successfully!");
    dispatch({ type: 'CLEAR_CART' });
    onClose();
    navigate('/marketplace');
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Checkout</DrawerTitle>
        </DrawerHeader>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" required />
            </div>
            
            <div>
              <Label htmlFor="address">Shipping Address</Label>
              <Input id="address" required />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Order Summary</h3>
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <span>{item.title} (x{item.quantity})</span>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  <span>{(parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between py-2 font-medium border-t mt-2">
              <span>Total</span>
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4" />
                <span>{state.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </form>

        <DrawerFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Place Order
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Back to Cart
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

