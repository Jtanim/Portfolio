export interface Project {
  id: string;
  title: string;
  subtitle: string;
  client?: string;
  location: string;
  country: 'Saudi Arabia' | 'UAE';
  category: 'Luxury Resort & Hotel' | 'Residential & Villas' | 'Hospitality' | 'Commercial & Mixed-Use';
  role: string;
  period?: string;
  scope: string;
  fullDescription: string;
  lodLevel: 'LOD 200' | 'LOD 300' | 'LOD 400' | 'LOD 300 & 400';
  systemsCovered: string[];
  disciplines: ('Mechanical' | 'Electrical' | 'Plumbing' | 'Fire Protection' | 'ELV')[];
  softwareUsed: string[];
  deliverables: string[];
  standards: string[];
  keyAchievements: string[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  summary: string;
  highlights: string[];
  disciplines: string[];
  software: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: 'ISO 19650 / BIM Management' | 'BIM & CAD Technical' | 'Project Management';
  skills: string[];
  badgeColor: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  field: string;
}

export interface ClashDemoItem {
  id: string;
  title: string;
  disciplines: string;
  problem: string;
  solution: string;
  severity: 'Critical Hard Clash' | 'Clearance Violation' | 'Soft Clash';
  status: 'Detected' | 'Resolved';
  coordinates: string;
  software: string;
}

export interface LodLevelDetail {
  level: string;
  name: string;
  description: string;
  mepElements: string[];
  useCase: string;
  accuracy: string;
}
