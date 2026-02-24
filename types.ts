
export enum Language {
  SQ = 'sq',
  EN = 'en'
}

export enum Transmission {
  AUTO = 'Auto',
  MANUAL = 'Manual'
}

export enum Fuel {
  DIESEL = 'Diesel',
  PETROL = 'Petrol',
  HYBRID = 'Hybrid'
}

export interface Car {
  id: string;
  name: string;
  engine: string;
  transmission: Transmission;
  fuel: Fuel;
  year: number;
  pricePerDay: number;
  images: string[];
  seats: number;
  features: string[];
  isAvailable: boolean;
  category: 'Premium' | 'Standard' | 'SUV';
}

export interface TranslationSet {
  [key: string]: {
    en: string;
    sq: string;
  };
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
