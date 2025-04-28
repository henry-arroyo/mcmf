// src/pages/Donate.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from '@/lib/store';

const DONATION_TIERS = [
  { amount: 100, name: "Friend", description: "Support our educational programs" },
  { amount: 250, name: "Patron", description: "Help bring world-class musicians to Maui" },
  { amount: 500, name: "Benefactor", description: "Ensure the future of classical music in Maui" },
];

export const Donate = () => {
  const { addItem } = useCart();
  const [customAmount, setCustomAmount] = React.useState("");

  const handleCustomDonation = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0) {
      addItem({ type: 'donation', price: amount });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-playfair text-[#1a237e] mb-8">Support the Festival</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {DONATION_TIERS.map((tier) => (
          <Card key={tier.name}>
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-playfair text-[#1a237e] mb-2">{tier.name}</h3>
              <p className="text-3xl text-[#2ec4b6] mb-4">${tier.amount}</p>
              <p className="mb-6">{tier.description}</p>
              <Button 
                onClick={() => addItem({ type: 'donation', price: tier.amount })}
                className="bg-[#1a237e] hover:bg-[#2ec4b6]"
              >
                Donate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-playfair text-[#1a237e] mb-4">Custom Donation Amount</h3>
          <div className="flex gap-4">
            <Input
              type="number"
              min="1"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount"
              className="max-w-[200px]"
            />
            <Button 
              onClick={handleCustomDonation}
              className="bg-[#1a237e] hover:bg-[#2ec4b6]"
            >
              Donate Custom Amount
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};