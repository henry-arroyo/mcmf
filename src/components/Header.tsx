// src/components/Header.tsx
import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { CartWidget } from './CartWidget';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-[#1a237e] text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-0 sm:h-20 gap-4 sm:gap-0">
          <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="MCMF Logo" 
              className="h-12 w-auto"
            />
            <h1 className="text-xl sm:text-2xl font-playfair">Maui Classical Music Festival</h1>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="flex flex-wrap justify-center gap-2">
              {[
                ['Home', '/'],
                ['About', '/about'],
                ['Musicians', '/musicians'],
                ['Concerts', '/concerts'],
                ['In Memoriam', '/in-memoriam'],
                ['Donate', '/donate']
              ].map(([title, url]) => (
                <NavigationMenuItem key={title}>
                  <NavigationMenuLink 
                    className="px-2 sm:px-4 py-2 text-sm hover:text-[#ffd700] transition-colors"
                    href={url}
                  >
                    {title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <CartWidget />
        </div>
      </div>
    </header>
  );
};