import { Component, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ShortCurrencyPipe } from '../../pipes/short-currency.pipe';

interface Metric {
  label: string;
  value: string;
  sub: string;
  icon: string;
  tone: string;
}

interface ComplianceSlice {
  status: string;
  value: number;
  color: string;
}

interface PipelineBucket {
  bucket: string;
  count: number;
  amount: number;
}

interface EmployerRow {
  name: string;
  sector: string;
  employees: number;
  amount: number;
  status: 'compliant' | 'at-risk' | 'non-compliant';
}

interface SectorSlice {
  name: string;
  value: number;
}

interface ActivityItem {
  action: string;
  detail: string;
  time: string;
  status: 'success' | 'warning' | 'danger';
}

@Component({
  selector: 'app-employers',
  standalone: true,
  imports: [DecimalPipe, ShortCurrencyPipe],
  templateUrl: './employers.component.html',
  styleUrls: ['../pages/shared.scss', './employers.component.scss'],
})
export class EmployersComponent {
  readonly metrics: Metric[] = [
    { label: 'Total Employers', value: '14,500', sub: 'Registered companies', icon: '🏢', tone: 'primary' },
    { label: 'Active', value: '12,680', sub: 'Remitting contributions', icon: '✅', tone: 'success' },
    { label: 'Pending', value: '320', sub: 'Awaiting verification', icon: '⏳', tone: 'warning' },
    { label: 'Inactive', value: '1,500', sub: 'Not remitting', icon: '❌', tone: 'accent' },
    { label: 'Total Contributions', value: 'UGX 8.95 M', sub: 'This month', icon: '💰', tone: 'info' },
  ];

  readonly compliance: ComplianceSlice[] = [
    { status: 'Compliant', value: 87.5, color: '#059669' },
    { status: 'At Risk', value: 8.2, color: '#d97706' },
    { status: 'Non-Compliant', value: 4.3, color: '#dc2626' },
  ];

  readonly pipeline: PipelineBucket[] = [
    { bucket: '30 days', count: 120, amount: 240000000 },
    { bucket: '60 days', count: 85, amount: 185000000 },
    { bucket: '90+ days', count: 42, amount: 96000000 },
  ];

  readonly directory: EmployerRow[] = [
    { name: 'Uganda Breweries Ltd', sector: 'Manufacturing', employees: 1250, amount: 1200000000, status: 'compliant' },
    { name: 'Mukwano Group', sector: 'Manufacturing', employees: 980, amount: 980000000, status: 'compliant' },
    { name: 'MTN Uganda', sector: 'Telecommunications', employees: 850, amount: 850000000, status: 'compliant' },
    { name: 'Roofings Ltd', sector: 'Manufacturing', employees: 560, amount: 560000000, status: 'at-risk' },
    { name: 'Cipla Quality Chemicals', sector: 'Pharmaceuticals', employees: 430, amount: 430000000, status: 'compliant' },
    { name: 'Tropical Suppliers', sector: 'Agriculture', employees: 320, amount: 240000000, status: 'non-compliant' },
  ];

  readonly sectorDistribution: SectorSlice[] = [
    { name: 'Manufacturing', value: 4200 },
    { name: 'Services', value: 3800 },
    { name: 'Agriculture', value: 2600 },
    { name: 'Construction', value: 1900 },
    { name: 'Other', value: 2000 },
  ];

  readonly activity: ActivityItem[] = [
    { action: 'New employer registered', detail: 'Kampala Logistics Ltd', time: '1 hour ago', status: 'success' },
    { action: 'Compliance notice sent', detail: 'Tropical Suppliers', time: '3 hours ago', status: 'warning' },
    { action: 'Payment received', detail: 'Uganda Breweries Ltd', time: '5 hours ago', status: 'success' },
    { action: 'Employer suspended', detail: 'Highway Construction', time: '1 day ago', status: 'danger' },
  ];

  readonly complianceGradient = computed(() => this.buildGradient(this.compliance.map((c) => ({ value: c.value, color: c.color }))));
  readonly sectorGradient = computed(() => this.buildGradient(this.sectorDistribution.map((s, i) => ({ value: s.value, color: ['#1e3a8a', '#059669', '#d97706', '#7c3aed', '#64748b'][i] }))));
  readonly maxPipeline = computed(() => Math.max(...this.pipeline.map((v) => v.amount)));

  private buildGradient(items: { value: number; color: string }[]): string {
    const total = items.reduce((sum, item) => sum + item.value, 0);
    if (!total) return 'conic-gradient(#e2e8f0 0deg 360deg)';
    let start = 0;
    const segments = items.map((item) => {
      const end = start + (item.value / total) * 360;
      const seg = `${item.color} ${start}deg ${end}deg`;
      start = end;
      return seg;
    });
    return `conic-gradient(${segments.join(', ')})`;
  }
}
