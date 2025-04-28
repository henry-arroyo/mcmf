import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from '@/lib/store';
import { Trash2, Check, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { CheckoutModal } from './CheckoutModal';

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface GroupedTicket {
  concertId: number;
  concertTitle: string;
  ticketType: 'adult' | 'student';
  price: number;
  quantity: number;
}

export const CartSidebar = ({ open, onOpenChange }: CartSidebarProps) => {
  const { items, removeItem, removeItems, clearCart, total, timeRemaining, updateTicketQuantity } = useCart();
  const [remainingTime, setRemainingTime] = React.useState<number | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);

  // Update remaining time every second
  React.useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      const remaining = timeRemaining();
      setRemainingTime(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [open, timeRemaining]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((_, index) => index));
    }
  };

  const handleSelectItem = (index: number) => {
    setSelectedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleBulkDelete = () => {
    removeItems(selectedItems);
    setSelectedItems([]);
  };

  // Group tickets by concert and type
  const groupedTickets = React.useMemo(() => {
    const tickets: GroupedTicket[] = [];
    const donations = items.filter(item => item.type === 'donation');

    // Group tickets
    items.forEach(item => {
      if (item.type === 'ticket' && item.id && item.ticketType && item.concertTitle) {
        const existingTicket = tickets.find(
          t => t.concertId === item.id && t.ticketType === item.ticketType
        );

        if (existingTicket) {
          existingTicket.quantity++;
        } else {
          tickets.push({
            concertId: item.id,
            concertTitle: item.concertTitle,
            ticketType: item.ticketType,
            price: item.price,
            quantity: 1
          });
        }
      }
    });

    return { tickets, donations };
  }, [items]);

  return (
    <div className="relative">
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => onOpenChange(false)}
        />
      )}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent 
          side="right" 
          className="w-[400px] sm:w-[540px]"
        >
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            {remainingTime !== null && (
              <p className="text-sm text-muted-foreground">
                Items expire in {formatTime(remainingTime)}
              </p>
            )}
          </SheetHeader>
          
          <div className="mt-8 flex flex-col gap-4 px-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty</p>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedItems.length === items.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm text-muted-foreground">
                      Select All
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {selectedItems.length > 0 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleBulkDelete}
                      >
                        Delete Selected
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={clearCart}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>

                {/* Grouped Tickets */}
                {groupedTickets.tickets.map((ticket) => (
                  <div key={`${ticket.concertId}-${ticket.ticketType}`} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{ticket.concertTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {ticket.ticketType === 'student' ? 'Student' : 'Adult'} Ticket
                        </p>
                      </div>
                      <p className="font-medium">${ticket.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateTicketQuantity(ticket.concertId, ticket.ticketType, ticket.quantity - 1)}
                          disabled={ticket.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{ticket.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateTicketQuantity(ticket.concertId, ticket.ticketType, ticket.quantity + 1)}
                          disabled={ticket.quantity >= 4}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-medium">
                        ${(ticket.price * ticket.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Donations */}
                {groupedTickets.donations.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Donation</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">${total().toFixed(2)}</p>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={() => setCheckoutOpen(true)}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutModal 
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
      />
    </div>
  );
}; 