export type VehicleCategory = 'all' | 'furgones' | 'camiones' | 'pickups' | 'minibuses' | 'suvs';

export type IndustrySector = 
  | 'logistica_courier' 
  | 'alimentos_panaderias' 
  | 'fletes_volumen' 
  | 'camiones_gruas' 
  | 'mineria_energia' 
  | 'construccion_obras' 
  | 'transporte_personal';

export type MiningStandard = 'SERNAGEOMIN DS 132' | 'Codelco Estándar ECF' | 'BHP Escondida / Spence' | 'AMSA Los Pelambres' | 'Collahuasi' | 'SQM Salar' | 'Norma Sanitaria Alimentos (Seremi)' | 'Estándar Logística Última Milla' | 'Certificación SEC / Izaje Grúa';

export interface EquipmentDetail {
  id: string;
  name: string;
  category: 'Logística & Fletes' | 'Frío & Alimentos' | 'Grúas & Carga Pesada' | 'Seguridad Minera DS 132' | 'Comunicaciones & GPS';
  description: string;
  spec: string;
  mandatoryBy: string;
  included: boolean;
}

export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  category: 'furgones' | 'camiones' | 'pickups' | 'minibuses' | 'suvs';
  categoryLabel: string;
  bodyType: string;
  engine: string;
  transmission: string;
  traction: '4x4 con Reductora' | '4x2 Tracción Trasera' | '4x2 Tracción Delantera' | '6x2 Eje de Apoyo' | '6x4 Doble Puente' | 'AWD Permanente' | '4x4 Inteligente';
  fuel: 'Diésel Euro 6' | 'Diésel Ultra Bajo Azufre' | 'Gasolina 95 / Híbrido';
  seats: number;
  payloadKg: number;
  cargoVolumeM3?: number;
  craneCapacityTon?: number;
  refrigeratedOption?: boolean;
  industryTags: string[];
  targetSectors: IndustrySector[];
  monthlyUF: number;
  monthlyCLP: number;
  featured: boolean;
  miningCertified?: boolean;
  immediateDelivery: boolean;
  image: string;
  shortDesc: string;
  keyFeatures: string[];
  equipmentList: EquipmentDetail[];
  homologations: MiningStandard[];
  dimensions: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
    groundClearanceMm: number;
  };
}

export interface RegionFaena {
  id: string;
  name: string;
  region: string;
  baseCity: string;
  address: string;
  phone: string;
  majorMines: string[];
  industrialHubs: string[];
  slaHours: number;
  mobileUnits: number;
  coordinates: { x: number; y: number };
}

export interface QuoteItem {
  vehicleId: string;
  quantity: number;
  vehicle: Vehicle;
}

export interface FleetAddOn {
  id: string;
  name: string;
  category: 'logistica' | 'alimentos' | 'gruas_fletes' | 'mineria' | 'soporte';
  description: string;
  priceUF: number;
  icon: string;
  recommendedFor: string;
}

export interface QuoteRequest {
  companyName: string;
  companyRut: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  industrySector: IndustrySector;
  regionFaenaId: string;
  contractTermMonths: number;
  items: QuoteItem[];
  selectedAddOns: string[];
  additionalNotes?: string;
  quoteId?: string;
  createdAt?: string;
  totalMonthlyUF?: number;
  totalMonthlyCLP?: number;
}
