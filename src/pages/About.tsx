// src/pages/About.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Mission Statement */}
      <section>
        <Card>
          <CardContent className="p-8">
            <h2 className="text-3xl font-playfair text-[#1a237e] mb-4">Our Mission</h2>
            <p className="text-lg">
              To enrich the cultural life of Maui through exceptional classical music
              performances and educational programs that inspire and unite our community.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* History */}
      <section>
        <h2 className="text-3xl font-playfair text-[#1a237e] mb-6">Our History</h2>
        <div className="prose max-w-none">
          <p>
            Founded in [Year], the Maui Classical Music Festival has been bringing
            world-class chamber music to the island of Maui for over [X] years...
          </p>
        </div>
      </section>

      {/* Board Members */}
      <section>
        <h2 className="text-3xl font-playfair text-[#1a237e] mb-6">Board Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Board member cards would go here */}
        </div>
      </section>
    </div>
  );
};