export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  timestamp: Date;
  serviceType: string;
}

export interface ConstructionCase {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  location: string;
  date: string;
  tags: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  address: string;
  serviceType: string;
  details: string;
  status: 'pending' | 'completed';
  createdAt: string;
}
