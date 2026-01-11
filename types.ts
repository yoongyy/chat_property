
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
  isRAGHit?: boolean; // Flag to show it came from your MongoDB
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
  uploaderType?: 'Owner' | 'Agent';
}

export interface Lead {
  id: string;
  name: string;
  source: string;
  type: 'Target Customer' | 'Partner Agent';
  status: 'Pending Contact' | 'Message Sent' | 'Converted';
  propertyTitle: string;
}

export interface CrawlBotStatus {
  id: string;
  name: string;
  target: string;
  status: 'Idle' | 'Scraping' | 'Processing' | 'Error';
  lastRun: string;
  itemsFound: number;
}
