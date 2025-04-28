// src/pages/Musicians.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Musician {
  id: number;
  name: string;
  instrument: string;
  bio: string;
  image: string;
}

export const Musicians = () => {
  const musicians: Musician[] = [
    // Example data - would come from API/database
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-playfair text-[#1a237e] mb-8">Current Season Musicians</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {musicians.map((musician) => (
          <Card key={musician.id}>
            <img
              src={musician.image}
              alt={musician.name}
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-xl font-playfair text-[#1a237e] mb-2">{musician.name}</h3>
              <p className="text-[#2ec4b6] mb-4">{musician.instrument}</p>
              <p className="text-sm">{musician.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};