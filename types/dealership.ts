export interface DealershipHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface DealershipCoordinates {
  lat: number;
  lng: number;
}

export interface DealershipSocial {
  facebook?: string;
  instagram?: string;
}

export interface Dealership {
  /** Internal: demo-safe fictional data for kiosk executive demos */
  demoMode?: boolean;
  name: string;
  brand: string;
  city: string;
  address: string;
  whatsapp: string;
  phone: string;
  email: string;
  hours: DealershipHours;
  coordinates: DealershipCoordinates;
  social?: DealershipSocial;
  consultants?: string[];
}
