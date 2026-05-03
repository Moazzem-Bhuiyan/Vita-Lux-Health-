// ─── Service Types ────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  longDescription: string;
  benefits: string[];
  duration: number; // minutes
  price: number;
  image: string;
  featured: boolean;
}

export type ServiceCategory = "massage" | "facial" | "therapy" | "body" | "wellness";

export interface ServiceCategoryInfo {
  id: ServiceCategory;
  label: string;
  description: string;
  icon: string;
}

// ─── Booking Types ────────────────────────────────────────────────────────────
export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  image: string;
  available: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingFormData {
  serviceId: string;
  therapistId: string;
  date: string;
  timeSlot: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

// ─── Blog Types ───────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number; // minutes
  featured: boolean;
}

export interface Author {
  name: string;
  title: string;
  image: string;
}

export type BlogCategory =
  | "wellness"
  | "skincare"
  | "massage"
  | "nutrition"
  | "mindfulness"
  | "lifestyle";

// ─── Testimonial Types ────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  image?: string;
  date: string;
}

// ─── Location Types ───────────────────────────────────────────────────────────
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: OpeningHours;
  coordinates: { lat: number; lng: number };
}

export interface OpeningHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

// ─── Promotion Types ──────────────────────────────────────────────────────────
export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  code: string;
  image?: string;
  badge?: string;
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  locationId?: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ─── Chat ─────────────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
