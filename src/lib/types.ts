// src/lib/types.ts
export interface CartItem {
  type: 'ticket' | 'donation';
  id?: number;
  price: number;
  concertTitle?: string;
  ticketType?: 'adult' | 'student';
}

export interface Concert {
  id: number;
  title: string;
  date: string;
  venue: string;
  price: number;
  description: string;
}

export interface Musician {
  id: number;
  name: string;
  instrument: string;
  bio: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}