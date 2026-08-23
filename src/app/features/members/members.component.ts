import { Component, computed } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ShortCurrencyPipe } from '../../pipes/short-currency.pipe';

interface Metric {
  label: string;
  value: string;
  sub: string;
  icon: string;
  tone: string;
}

interface GrowthPoint {
  month: string;
  members: number;
}

interface VerificationSlice {
  status: string;
  value: number;
  color: string;
}

interface MemberRow {
  id: string;
  name: string;
  employer: string;
  status: 'Active' | 'Dormant' | 'Suspended';
  balance: number;
  lastContribution: string;
}

interface IntegrityItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [DatePipe, DecimalPipe, ShortCurrencyPipe],
  templateUrl: './members.component.html',
  styleUrls: ['../pages/shared.scss', './members.component.scss'],
})
export class MembersComponent {
  readonly metrics: Metric[] = [
    { label: 'Total Members', value: '1,245,000', sub: 'Registered members', icon: '👥', tone: 'primary' },
    { label: 'Active', value: '1,180,000', sub: 'Actively contributing', icon: '✅', tone: 'success' },
    { label: 'New This Month', value: '28,400', sub: 'New registrations', icon: '🆕', tone: 'info' },
    { label: 'Dormant', value: '65,000', sub: 'Inactive accounts', icon: '💤', tone: 'warning' },
    { label: 'Suspended', value: '1,240', sub: 'Flagged accounts', icon: '🚫', tone: 'accent' },
  ];

  readonly growth: GrowthPoint[] = [
    { month: 'Jan', members: 1150000 },
    { month: 'Feb', members: 1180000 },
    { month: 'Mar', members: 1205000 },
    { month: 'Apr', members: 1220000 },
    { month: 'May', members: 1235000 },
    { month: 'Jun', members: 1245000 },
  ];

  readonly verificationStatus: VerificationSlice[] = [
    { status: 'Verified', value: 1080000, color: '#059669' },
    { status: 'Pending', value: 120000, color: '#d97706' },
    { status: 'Unverified', value: 45000, color: '#dc2626' },
  ];

  readonly memberRecords: MemberRow[] = [
    { id: 'NSSF-001', name: 'John Mukasa', employer: 'Uganda Breweries Ltd', status: 'Active', balance: 45000000, lastContribution: '2026-08-20' },
    { id: 'NSSF-002', name: 'Sarah Namono', employer: 'MTN Uganda', status: 'Active', balance: 38000000, lastContribution: '2026-08-19' },
    { id: 'NSSF-003', name: 'David Okello', employer: 'Mukwano Group', status: 'Dormant', balance: 12000000, lastContribution: '2026-03-15' },
    { id: 'NSSF-004', name: 'Grace Achieng', employer: 'Cipla Quality Chemicals', status: 'Active', balance: 28000000, lastContribution: '2026-08-18' },
    { id: 'NSSF-005', name: 'Peter Ssemwanga', employer: 'Roofings Ltd', status: 'Suspended', balance: 8500000, lastContribution: '2026-07-30' },
  ];

  readonly integrity: IntegrityItem[] = [
    { label: 'Records with NIN', value: '98.2%' },
    { label: 'Records with phone', value: '96.5%' },
    { label: 'Records with employer', value: '94.8%' },
  ];

  readonly growthPoints = computed(() => this.buildPoints(this.growth.map((v) => v.members)));
  readonly verificationTotal = computed(() => this.verificationStatus.reduce((sum, v) => sum + v.value, 0));
  readonly verificationGradient = computed(() => this.buildGradient(this.verificationStatus.map((v) => ({ value: v.value, color: v.color }))));

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
