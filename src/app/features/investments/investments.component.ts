import { Component, computed } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ShortCurrencyPipe } from '../../pipes/short-currency.pipe';

interface Metric {
  label: string;
  value: string;
  sub: string;
  icon: string;
  tone: string;
}

interface Allocation {
  asset: string;
  value: number;
  color: string;
}

interface Holding {
  name: string;
  type: string;
  value: number;
  return: number;
  status: string;
}

interface Sector {
  name: string;
  value: number;
}

interface RiskMetric {
  label: string;
  value: string;
}

interface Maturity {
  name: string;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [DatePipe, DecimalPipe, ShortCurrencyPipe],
  templateUrl: './investments.component.html',
  styleUrls: ['../pages/shared.scss', './investments.component.scss'],
})
export class InvestmentsComponent {
  readonly metrics: Metric[] = [
    { label: 'Total Portfolio Value', value: 'UGX 420 M', sub: 'All investments & cash', icon: '💰', tone: 'primary' },
    { label: 'Monthly Returns', value: 'UGX 4.25 M', sub: 'Current month', icon: '📈', tone: 'success' },
    { label: 'Active Investments', value: '128', sub: 'Open positions', icon: '🗂️', tone: 'info' },
    { label: 'Liquidity Ratio', value: '8.3%', sub: 'Cash / AUM', icon: '💧', tone: 'warning' },
    { label: 'Risk Score', value: 'Low', sub: 'Moderate volatility', icon: '🛡️', tone: 'accent' },
  ];

  readonly performance = [
    { month: 'Jan', value: 380000000000 },
    { month: 'Feb', value: 392000000000 },
    { month: 'Mar', value: 405000000000 },
    { month: 'Apr', value: 398000000000 },
    { month: 'May', value: 412000000000 },
    { month: 'Jun', value: 420000000000 },
  ];

  readonly allocation: Allocation[] = [
    { asset: 'Fixed Income', value: 180000000000, color: '#1e3a8a' },
    { asset: 'Equities', value: 120000000000, color: '#059669' },
    { asset: 'Real Estate', value: 80000000000, color: '#d97706' },
    { asset: 'Cash & Deposits', value: 40000000000, color: '#64748b' },
  ];

  readonly holdings: Holding[] = [
    { name: 'UGX 10Y Treasury Bond', type: 'Fixed Income', value: 60000000000, return: 12.5, status: 'Active' },
    { name: 'Stanbic Uganda Holdings', type: 'Equity', value: 42000000000, return: 18.2, status: 'Active' },
    { name: 'Kampala Office Park', type: 'Real Estate', value: 35000000000, return: 9.7, status: 'Active' },
    { name: 'MTN Uganda', type: 'Equity', value: 28000000000, return: 15.4, status: 'Active' },
    { name: 'UGX 5Y Corporate Bond', type: 'Fixed Income', value: 25000000000, return: 11.8, status: 'Active' },
  ];

  readonly sectors: Sector[] = [
    { name: 'Government Securities', value: 180000000000 },
    { name: 'Financial Services', value: 70000000000 },
    { name: 'Telecommunications', value: 50000000000 },
    { name: 'Real Estate', value: 80000000000 },
    { name: 'Manufacturing', value: 40000000000 },
  ];

  readonly riskMetrics: RiskMetric[] = [
    { label: 'Value at Risk (95%)', value: '2.4%' },
    { label: 'Portfolio Beta', value: '0.82' },
    { label: 'Sharpe Ratio', value: '1.45' },
    { label: 'Avg Duration', value: '5.2 years' },
  ];

  readonly maturities: Maturity[] = [
    { name: 'UGX 5Y Treasury Bond', date: '2026-09-15', amount: 45000000000 },
    { name: 'UGX 3Y Corporate Bond', date: '2026-11-20', amount: 30000000000 },
    { name: 'UGX 7Y Infrastructure Bond', date: '2027-03-10', amount: 60000000000 },
    { name: 'UGX 2Y Fixed Deposit', date: '2027-06-01', amount: 20000000000 },
  ];

  readonly performancePoints = computed(() => this.buildPoints(this.performance.map((v) => v.value)));
  readonly allocationTotal = computed(() => this.allocation.reduce((sum, a) => sum + a.value, 0));
  readonly allocationGradient = computed(() => {
    const total = this.allocationTotal();
    if (!total) return 'conic-gradient(#e2e8f0 0deg 360deg)';
    let start = 0;
    const segments = this.allocation.map((a) => {
      const end = start + (a.value / total) * 360;
      const seg = `${a.color} ${start}deg ${end}deg`;
      start = end;
      return seg;
    });
    return `conic-gradient(${segments.join(', ')})`;
  });
  readonly maxSector = computed(() => Math.max(...this.sectors.map((v) => v.value)));

  private buildPoints(values: number[], width = 600, height = 200): string {
    if (!values.length) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const step = values.length > 1 ? width / (values.length - 1) : 0;
    return values
      .map((value, index) => `${index * step},${height - ((value - min) / span) * height}`)
      .join(' ');
  }
}
