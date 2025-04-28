// src/components/Footer.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Footer = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <footer className="text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="col-span-1">
            <h3 className="text-xl font-playfair mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Name"
                className="bg-white text-[#2d3436]"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-white text-[#2d3436]"
                required
              />
              <Textarea
                placeholder="Message"
                className="bg-white text-[#2d3436]"
                required
              />
              <Button 
                type="submit"
                className="bg-[#2ec4b6] hover:bg-[#ffd700] text-white"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-playfair mb-4">Contact Information</h3>
            <div className="space-y-2">
              <p>Email: info@mauiclassicalmusicfestival.org</p>
              <p>Address: 123 Lahaina Way, Maui, HI 96761</p>
              <p>Phone: (808) 555-0123</p>
            </div>
          </div>

          {/* Sponsors */}
          <div className="col-span-1">
            <h3 className="text-xl font-playfair mb-4">Our Sponsors</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Add sponsor logos here */}
              <a href="#" className="block">
                <img src="/sponsor1.png" alt="Sponsor 1" className="h-12" />
              </a>
              <a href="#" className="block">
                <img src="/sponsor2.png" alt="Sponsor 2" className="h-12" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};