import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from '@/lib/store';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
  const { items, total, clearCart } = useCart();

  const handleApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      // Handle successful payment
      console.log('Payment completed:', details);
      clearCart();
      onOpenChange(false);
    });
  };

  const handleError = (err: any) => {
    console.error('PayPal error:', err);
  };

  const handleCancel = () => {
    console.log('Payment cancelled');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Order Summary</h3>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.type === 'ticket' ? (
                    `${item.concertTitle} (${item.ticketType === 'student' ? 'Student' : 'Adult'} Ticket)`
                  ) : (
                    'Donation'
                  )}
                </span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <PayPalScriptProvider options={{ 
              clientId: "YOUR_PAYPAL_CLIENT_ID",
              currency: "USD"
            }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: total().toFixed(2)
                        }
                      }
                    ]
                  });
                }}
                onApprove={handleApprove}
                onError={handleError}
                onCancel={handleCancel}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 