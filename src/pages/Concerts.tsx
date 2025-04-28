// src/pages/Concerts.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '@/lib/store';

interface Concert {
  id: number;
  title: string;
  date: string;
  venue: string;
  description: string;
}

const TICKET_TYPES = [
  { type: 'adult', price: 30, label: 'Adult ($30)' },
  { type: 'student', price: 10, label: 'Student ($10)' }
];

export const Concerts = () => {
  const { addItem, canAddTicket, getTicketCount } = useCart();
  const [selectedQuantities, setSelectedQuantities] = React.useState<{ [key: number]: number }>({});
  const [selectedTypes, setSelectedTypes] = React.useState<{ [key: number]: string }>({});

  const concerts: Concert[] = [
    {
      id: 1,
      title: "Beethoven's Ninth Symphony",
      date: "June 15, 2024",
      venue: "Maui Arts & Cultural Center",
      description: "Experience the power and beauty of Beethoven's masterpiece, featuring the Maui Symphony Orchestra and Chorus."
    },
    {
      id: 2,
      title: "Mozart's Requiem",
      date: "June 22, 2024",
      venue: "Maui Arts & Cultural Center",
      description: "A moving performance of Mozart's final work, conducted by Maestro John Smith."
    },
    {
      id: 3,
      title: "Tchaikovsky's Nutcracker Suite",
      date: "June 29, 2024",
      venue: "Maui Arts & Cultural Center",
      description: "A special summer performance of this beloved holiday classic."
    }
  ];

  const handleQuantityChange = (concertId: number, value: string) => {
    const quantity = parseInt(value);
    const type = selectedTypes[concertId] || 'adult';
    const currentCount = getTicketCount(concertId, type as 'adult' | 'student');
    const maxAllowed = Math.min(4 - currentCount, 4);
    
    setSelectedQuantities(prev => ({
      ...prev,
      [concertId]: Math.min(quantity, maxAllowed)
    }));
  };

  const handleTypeChange = (concertId: number, value: string) => {
    setSelectedTypes(prev => ({
      ...prev,
      [concertId]: value
    }));
    // Reset quantity to 1 when changing type
    setSelectedQuantities(prev => ({
      ...prev,
      [concertId]: 1
    }));
  };

  const handleAddToCart = (concert: Concert) => {
    const quantity = selectedQuantities[concert.id] || 1;
    const type = selectedTypes[concert.id] || 'adult';
    const ticketType = TICKET_TYPES.find(t => t.type === type);
    
    if (ticketType) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          type: 'ticket',
          id: concert.id,
          price: ticketType.price,
          concertTitle: concert.title,
          ticketType: type as 'adult' | 'student'
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <section>
        <h1 className="text-4xl font-playfair text-[#1a237e] mb-8">Concert Program</h1>
        
        <div className="space-y-6">
          {concerts.map((concert) => (
            <Card key={concert.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-playfair text-[#1a237e] mb-2">{concert.title}</h2>
                    <p className="text-muted-foreground mb-4">{concert.date} at {concert.venue}</p>
                    <p className="text-muted-foreground">{concert.description}</p>
                  </div>
                  
                  <div className="sm:w-64 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ticket Type</label>
                      <select
                        value={selectedTypes[concert.id] || 'adult'}
                        onChange={(e) => handleTypeChange(concert.id, e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        {TICKET_TYPES.map((type) => (
                          <option key={type.type} value={type.type}>
                            {type.label} ({getTicketCount(concert.id, type.type as 'adult' | 'student')}/4)
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <select
                        value={selectedQuantities[concert.id] || 1}
                        onChange={(e) => handleQuantityChange(concert.id, e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        {[1, 2, 3, 4].map((num) => {
                          const type = selectedTypes[concert.id] || 'adult';
                          const currentCount = getTicketCount(concert.id, type as 'adult' | 'student');
                          const maxAllowed = Math.min(4 - currentCount, 4);
                          return (
                            <option 
                              key={num} 
                              value={num}
                              disabled={num > maxAllowed}
                            >
                              {num}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    
                    <Button 
                      onClick={() => handleAddToCart(concert)}
                      className="bg-[#1a237e] hover:bg-[#2ec4b6] mt-2 w-full"
                      disabled={!canAddTicket(concert.id, (selectedTypes[concert.id] || 'adult') as 'adult' | 'student')}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};