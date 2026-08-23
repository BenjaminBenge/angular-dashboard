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

interface TatPoint {
  month: string;
  days: number;
}

interface PayoutType {
  type: string;
  value: number;
  color: string;
}

interface ClaimRow {
  id: string;
  member: string;
  type: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected';
  submitted: string;
}

interface AgingBucket {
  bucket: string;
  count: number;
}

interface VerificationItem {
  action: string;
  user: string;
  time: string;
  status: 'success' | 'warning' | 'danger';
}

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [DatePipe, DecimalPipe, ShortCurrencyPipe],
  templateUrl: './claims.component.html',
  styleUrls: ['../pages/shared.scss', './claims.component.scss'],
})
export class ClaimsComponent {
  readonly metrics: Metric[] = [
    { label: 'Total Claims', value: '4,200', sub: 'All time', icon: '📁', tone: 'primary' },
    { label: 'Pending', value: '1,240', sub: 'Awaiting approval', icon: '⏳', tone: 'warning' },
    { label: 'Approved', value: '860', sub: 'Ready for payment', icon: '✅', tone: 'success' },
    { label: 'Paid', value: '2,100', sub: 'This month', icon: '💸', tone: 'info' },
    { label: 'Rejected', value: '260', sub: 'Returned to members', icon: '❌', tone: 'accent' },
  ];

  readonly tat: TatPoint[] = [
    { month: 'Jan', days: 6.2 },
    { month: 'Feb', days: 5.8 },
    { month: 'Mar', days: 5.1 },
    { month: 'Apr', days: 4.9 },
    { month: 'May', days: 4.6 },
    { month: 'Jun', days: 4.5 },
  ];

  readonly payoutTypes: PayoutType[] = [
    { type: 'Age / Retirement', value: 1800000000, color: '#1e3a8a' },
    { type: 'Invalidity', value: 600000000, color: '#059669' },
    { type: 'Survivors', value: 450000000, color: '#d97706' },
    { type: 'Emigration', value: 350000000, color: '#64748b' },
  ];

  readonly claimsQueue: ClaimRow[] = [
    { id: 'CLM-001', member: 'John Mukasa', type: 'Age / Retirement', amount: 25000000, status: 'Pending', submitted: '2026-08-20' },
    { id: 'CLM-002', member: 'Sarah Namono', type: 'Invalidity', amount: 18000000, status: 'Approved', submitted: '2026-08-19' },
    { id: 'CLM-003', member: 'David Okello', type: 'Survivors', amount: 12000000, status: 'Paid', submitted: '2026-08-18' },
    { id: 'CLM-004', member: 'Grace Achieng', type: 'Emigration', amount: 8500000, status: 'Pending', submitted: '2026-08-17' },
    { id: 'CLM-005', member: 'Peter Ssemwanga', type: 'Age / Retirement', amount: 32000000, status: 'Rejected', submitted: '2026-08-16' },
  ];

  readonly aging: AgingBucket[] = [
    { bucket: '0-7 days', count: 420 },
    { bucket: '8-14 days', count: 380 },
    { bucket: '15-30 days', count: 260 },
    { bucket: '31-60 days', count: 120 },
    { bucket: '60+ days', count: 60 },
  ];

  readonly verification: VerificationItem[] = [
    { action: 'Document verified', user: 'Sarah Namono', time: '2 hours ago', status: 'success' },
    { action: 'Employer confirmation requested', user: 'John Mukasa', time: '4 hours ago', status: 'warning' },
    { action: 'Payment released', user: 'David Okello', time: '6 hours ago', status: 'success' },
    { action: 'Claim rejected — missing documents', user: 'Peter Ssemwanga', time: '1 day ago', status: 'danger' },
  ];

  readonly tatPoints = computed(() => this.buildPoints(this.tat.map((v) => v.days)));
  readonly payoutTotal = computed(() => this.payoutTypes.reduce((sum, a) => sum + a.value, 0));
  readonly payoutGradient = computed(() => {
    const total = this.payoutTotal();
    if (!total) return 'conic-gradient(#e2e8f0 0deg 360deg)';
    let start = 0;
    const segments = this.payoutTypes.map((a) => {
      const end = start + (a.value / total) * 360;
      const seg = `${a.color} ${start}deg ${end}deg`;
      start = end;
      return seg;
    });
    return `conic-gradient(${segments.join(', ')})`;
  });
  readonly maxAging = computed(() => Math.max(...this.aging.map((v) => v.count)));

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
