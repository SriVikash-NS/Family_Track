export type CategoryType = 'Commute' | 'Recreation' | 'School Run' | 'Travel' | 'Personal' | 'Running' | 'Cycling';

export type PrivacyLevel = 'private' | 'family' | 'circle';

export interface Journey {
  id: string;
  title: string;
  category: CategoryType;
  distanceKm: number;
  durationMins: number;
  date: string;
  startTime: string;
  endTime: string;
  stopCount: number;
  status: 'completed' | 'active' | 'paused';
  privacyLevel: PrivacyLevel;
  startLocation: string;
  endLocation: string;
  safetyScore?: number;
  speedAvgKmH?: number;
  memberId?: string;
  memberName?: string;
  notes?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: 'Self' | 'Spouse' | 'Daughter' | 'Son' | 'Parent' | 'Guardian';
  avatar: string;
  status: 'in_transit' | 'at_home' | 'at_work' | 'at_school' | 'offline';
  statusText: string;
  lastActive: string;
  batteryLevel: number;
  sharingMode: 'journey_only' | 'on_demand' | 'paused';
  activeJourneyTitle?: string;
  color: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtext?: string;
}

export interface GeofencePlace {
  id: string;
  name: string;
  address: string;
  category: 'home' | 'work' | 'school' | 'gym' | 'custom';
  radiusMeters: number;
  activeMembersCount: number;
}
