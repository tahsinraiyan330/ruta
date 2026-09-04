export interface Project {
  id: string;
  title: string;
  category: 'Industrial' | 'Power Systems' | 'Fire & Safety Grid' | 'High-End Residential';
  description: string;
  client: string;
  location: string;
  sizeSqFt: number;
  capacity?: string; // e.g. "1250 kVA Substation", "500 Zonewise Fire Alarm Grid"
  year: number;
  featured: boolean;
  standardsComplied: string[]; // e.g. ["BNBC 2020", "NFPA 101", "NTPA", "Alliance Guideline"]
  highlightMetric: string; // e.g. "Zero electrical fire incidents in 7 years of operation"
  costBdt: number;
}

export type LeadStatus = 'New Inquiry' | 'In Consultation' | 'Quote Generated' | 'Site Visit Scheduled' | 'Design Phase' | 'Review & Approval' | 'Delivered';

export interface Lead {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  location: string;
  projectType: 'Home' | 'Industrial Substation' | 'Industrial Factory Grid' | 'Commercial Complex' | 'High-End Residential' | 'Fire Safety & Detection Grid' | 'Other Service';
  sizeSqFt: number;
  estimatedCostBdt: number;
  status: LeadStatus;
  priority: 'Low' | 'Medium' | 'High';
  notes: string;
  uploadedFileLink?: string;
  createdAt: string;
  scheduleDate?: string;
  scheduledTask?: string;
}

export interface IncidentStat {
  year: number;
  incidentsCount: number;
  deathsCount: number;
  injuredCount: number;
  financialLossCroreBdt: number;
  electricalShortCircuitPct: number; // percentage caused by electrical short circuit & misalignment
  description: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  ratePerSqFt: number;
  subtitle: string;
  icon: string;
  description: string;
  deliverables: string[];
}

export type ProductCategory =
  | 'Light'
  | 'Fan'
  | 'Switch & Socket'
  | 'Security Lock'
  | 'CCTV Camera'
  | 'Smart Camera'
  | 'Fire Alarm Detection & Protective Device';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  wholesalePriceBdt: number;
  retailPriceBdt: number;
  weightKg: number;
  moq: number;
  brand: string;
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
  description: string;
  specifications: string[];
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface StoreOrderItem {
  productId: string;
  productName: string;
  category: ProductCategory;
  quantity: number;
  unitPriceBdt: number;
  weightKg: number;
}

export interface StoreOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: StoreOrderItem[];
  totalWeightKg: number;
  subtotalBdt: number;
  deliveryFeeBdt: number; // 140 BDT per kg
  totalAmountBdt: number;
  status: OrderStatus;
  orderDate: string;
  notes?: string;
}

