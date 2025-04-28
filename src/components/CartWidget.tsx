// src/components/CartWidget.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/store';
import { CartSidebar } from './CartSidebar';

export const CartWidget = () => {
  const { items } = useCart();
  const [open, setOpen] = React.useState(false);
  const itemCount = items.length;

  return (
    <>
      <Button
        variant="ghost"
        className="relative text-white hover:text-[#ffd700]"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#2ec4b6] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </Button>
      <CartSidebar open={open} onOpenChange={setOpen} />
    </>
  );
};