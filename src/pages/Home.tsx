// src/pages/Home.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const Home = () => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-center bg-cover flex items-center justify-center">
        <img 
          src="/hero-image.jpg" 
          alt="Maui Classical Music Festival" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-playfair mb-4">Welcome to Maui Classical Music Festival</h1>
          <p className="text-xl max-w-2xl mx-auto">Experience world-class classical music in paradise</p>
        </div>
      </section>

      {/* Welcome Section */}
      <section>
        <Card>
          <CardContent className="p-8">
            <h2 className="text-3xl font-playfair text-[#1a237e] mb-4">About the Festival</h2>
            <p className="text-lg">
              The Maui Classical Music Festival brings together world-renowned musicians
              for spectacular performances in the beautiful setting of Maui. Join us for
              an unforgettable experience of chamber music in paradise.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Upcoming Events Preview */}
      <section>
        <h2 className="text-3xl font-playfair text-[#1a237e] mb-8">Upcoming Performances</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-playfair text-[#1a237e] mb-2">Beethoven's Ninth Symphony</h3>
              <p className="text-[#2ec4b6] mb-2">June 15, 2024</p>
              <p>Experience the power and beauty of Beethoven's masterpiece, featuring the Maui Symphony Orchestra and Chorus.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-playfair text-[#1a237e] mb-2">Mozart's Requiem</h3>
              <p className="text-[#2ec4b6] mb-2">June 22, 2024</p>
              <p>A moving performance of Mozart's final work, conducted by Maestro John Smith.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-playfair text-[#1a237e] mb-2">Tchaikovsky's Nutcracker Suite</h3>
              <p className="text-[#2ec4b6] mb-2">June 29, 2024</p>
              <p>A special summer performance of this beloved holiday classic.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Content */}
      <section>
        <h2 className="text-3xl font-playfair text-[#1a237e] mb-8">Why Attend?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-playfair text-[#1a237e] mb-2">World-Class Performances</h3>
              <p>Experience exceptional classical music performed by renowned musicians in the beautiful setting of Maui.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-playfair text-[#1a237e] mb-2">Cultural Enrichment</h3>
              <p>Join us in celebrating and preserving the rich tradition of classical music in our community.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* More Content */}
      <section>
        <h2 className="text-3xl font-playfair text-[#1a237e] mb-8">Our Mission</h2>
        <Card>
          <CardContent className="p-8">
            <p className="text-lg">
              To enrich the cultural life of Maui through exceptional classical music
              performances and educational programs that inspire and unite our community.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};