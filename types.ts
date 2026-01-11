
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  groundingSources?: Array<{
    title: string;
    uri: string;
  }>;
  properties?: Property[];
}

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: 'New' | 'Subsale' | 'Project';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  description: string;
  source?: 'Mudah.my' | 'iProperty' | 'PropertyGuru' | 'Facebook';
}

export interface Negotiation {
  id: string;
  propertyName: string;
  status: 'Active' | 'Offer Pending' | 'Closed';
  buyerName: string;
  currentOffer: string;
  lastUpdate: string;
}

export interface CrawlBotStatus {
  id: string;
  name: string;
  target: string;
  status: 'Idle' | 'Scraping' | 'Processing' | 'Error';
  lastRun: string;
  itemsFound: number;
}
