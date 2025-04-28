// src/pages/InMemoriam.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const InMemoriam = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-playfair text-[#1a237e] mb-8">In Memoriam</h1>
      
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src="/director.jpg"
              alt="Music Director"
              className="w-full md:w-1/3 h-auto rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-playfair text-[#1a237e] mb-4">[Director Name]</h2>
              <p className="text-[#2ec4b6] mb-4">[Years of Service]</p>
              <div className="prose max-w-none">
                <p>
                  Tribute content about the late Music Director would go here...
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};