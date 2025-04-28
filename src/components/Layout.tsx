// src/components/Layout.tsx
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-[#faf9f6] text-[#2d3436]">
      <Header />
      <div className="flex-1 pt-32 sm:pt-24 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
        <div className="w-full bg-[#1a237e] mt-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};