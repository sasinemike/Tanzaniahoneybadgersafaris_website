export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  DESTINATIONS = 'DESTINATIONS',
  TOURS = 'TOURS',
  AFFILIATION = 'AFFILIATION',
  TRAVEL_INFO = 'TRAVEL_INFO',
  TESTIMONIALS = 'TESTIMONIALS',
  TERMS = 'TERMS',
  CONTACT = 'CONTACT',
  BOOKING = 'BOOKING'
}

export interface TourPackage {
  id: string;
  title: string;
  days: number;
  price: number;
  image: string;
  description: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}