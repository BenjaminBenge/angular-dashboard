export interface Overview {
  totalAum: number;
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  totalEmployers: number;
  interestRate: number;
  netInflow: number;
}

export interface MonthlySeries {
  month: string;
  inflow: number;
  outflow: number;
}

export interface DefaulterPipeline {
  bucket: string;
  count: number;
  amount: number;
}

export interface ECollection {
  channel: string;
  percent: number;
}

export interface Defaulter {
  employer: string;
  amount: number;
  days: number;
  penalty: number;
}

export interface AssetAllocation {
  asset: string;
  value: number;
  color: string;
}

export interface AssetRoi {
  asset: string;
  yield: number;
  inflation: number;
}

export interface Maturity {
  year: string;
  amount: number;
}

export interface PayoutByType {
  type: string;
  amount: number;
}

export interface ChannelTraffic {
  channel: string;
  users: number;
}

export interface DashboardData {
  overview: Overview;
  contributions: {
    monthlyTarget: number;
    monthlyCollections: number;
    complianceRate: number;
    monthlySeries: MonthlySeries[];
    defaulterPipeline: DefaulterPipeline[];
    eCollections: ECollection[];
    defaulters: Defaulter[];
  };
  investments: {
    allocation: AssetAllocation[];
    roi: AssetRoi[];
    maturitySchedule: Maturity[];
    cashLiquidity: number;
  };
  benefits: {
    pendingClaims: number;
    avgTatDays: number;
    payoutsByType: PayoutByType[];
    totalPaidOut: number;
  };
  operations: {
    channelTraffic: ChannelTraffic[];
    selfServiceRate: number;
    unresolvedTickets: number;
  };
}

export const INITIAL_DATA: DashboardData = {
  overview: {
    totalAum: 420000000000,
    totalMembers: 1245000,
    activeMembers: 1180000,
    inactiveMembers: 65000,
    totalEmployers: 14500,
    interestRate: 11.5,
    netInflow: 5750000000,
  },
  contributions: {
    monthlyTarget: 9500000000,
    monthlyCollections: 8950000000,
    complianceRate: 87.5,
    monthlySeries: [
      { month: 'Jan', inflow: 8500000000, outflow: 2900000000 },
      { month: 'Feb', inflow: 8700000000, outflow: 3000000000 },
      { month: 'Mar', inflow: 8950000000, outflow: 3200000000 },
      { month: 'Apr', inflow: 9100000000, outflow: 3150000000 },
      { month: 'May', inflow: 9200000000, outflow: 3100000000 },
      { month: 'Jun', inflow: 8950000000, outflow: 3200000000 },
    ],
    defaulterPipeline: [
      { bucket: '30 days', count: 120, amount: 240000000 },
      { bucket: '60 days', count: 85, amount: 185000000 },
      { bucket: '90+ days', count: 42, amount: 96000000 },
    ],
    eCollections: [
      { channel: 'Mobile Money', percent: 45 },
      { channel: 'Bank Transfer', percent: 35 },
      { channel: 'Online Portal', percent: 20 },
    ],
    defaulters: [
      { employer: 'Tropical Suppliers', amount: 240000000, days: 45, penalty: 12000000 },
      { employer: 'Highway Construction', amount: 185000000, days: 32, penalty: 9250000 },
      { employer: 'Victoria Foods', amount: 96000000, days: 18, penalty: 4800000 },
      { employer: 'Riverside Hotel', amount: 72000000, days: 12, penalty: 3600000 },
      { employer: 'City Printers', amount: 48000000, days: 8, penalty: 2400000 },
    ],
  },
  investments: {
    allocation: [
      { asset: 'Fixed Income', value: 180000000000, color: '#1e3a8a' },
      { asset: 'Equities', value: 120000000000, color: '#059669' },
      { asset: 'Real Estate', value: 80000000000, color: '#d97706' },
      { asset: 'Cash & Deposits', value: 40000000000, color: '#64748b' },
    ],
    roi: [
      { asset: 'Fixed Income', yield: 12.5, inflation: 6.8 },
      { asset: 'Equities', yield: 18.2, inflation: 6.8 },
      { asset: 'Real Estate', yield: 9.7, inflation: 6.8 },
      { asset: 'Cash & Deposits', yield: 7.1, inflation: 6.8 },
    ],
    maturitySchedule: [
      { year: '2026', amount: 60000000000 },
      { year: '2027', amount: 45000000000 },
      { year: '2028', amount: 75000000000 },
      { year: '2029', amount: 30000000000 },
    ],
    cashLiquidity: 35000000000,
  },
  benefits: {
    pendingClaims: 1240,
    avgTatDays: 4.5,
    payoutsByType: [
      { type: 'Age / Retirement', amount: 1800000000 },
      { type: 'Invalidity', amount: 600000000 },
      { type: 'Survivors', amount: 450000000 },
      { type: 'Emigration', amount: 350000000 },
    ],
    totalPaidOut: 3200000000,
  },
  operations: {
    channelTraffic: [
      { channel: 'Web Portal', users: 32000 },
      { channel: 'Mobile App', users: 48000 },
      { channel: 'USSD', users: 25000 },
    ],
    selfServiceRate: 68.4,
    unresolvedTickets: 320,
  },
};
