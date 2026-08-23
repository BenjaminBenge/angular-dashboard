import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { DashboardData, INITIAL_DATA } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { ShortCurrencyPipe, formatShortCurrency } from '../../pipes/short-currency.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe, ShortCurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  readonly data = toSignal(this.dashboardService.getData(), { initialValue: INITIAL_DATA });

  readonly overviewMetrics = computed(() => {
    const o = this.data().overview;
    const nf = new Intl.NumberFormat('en-UG');
    const pf = new Intl.NumberFormat('en-UG', { style: 'percent', minimumFractionDigits: 1 });
    return [
      { label: 'Total Assets Under Management', value: formatShortCurrency(o.totalAum), sub: 'Investments & cash', icon: '💰', tone: 'primary' },
      { label: 'Total Registered Members', value: nf.format(o.totalMembers), sub: `${nf.format(o.activeMembers)} active / ${nf.format(o.inactiveMembers)} inactive`, icon: '👥', tone: 'success' },
      { label: 'Total Registered Employers', value: nf.format(o.totalEmployers), sub: 'Companies remitting contributions', icon: '🏢', tone: 'info' },
      { label: 'Current Interest Rate', value: pf.format(o.interestRate / 100), sub: 'Declared annual rate', icon: '📈', tone: 'accent' },
      { label: 'Net Inflow / Outflow', value: formatShortCurrency(o.netInflow), sub: 'Collections minus payouts', icon: '⚖️', tone: 'warning' },
    ];
  });

  readonly collectionProgress = computed(() => {
    const c = this.data().contributions;
    return c.monthlyTarget ? (c.monthlyCollections / c.monthlyTarget) * 100 : 0;
  });

  readonly inflowPoints = computed(() => this.buildPoints(this.data().contributions.monthlySeries.map((v) => v.inflow)));
  readonly outflowPoints = computed(() => this.buildPoints(this.data().contributions.monthlySeries.map((v) => v.outflow)));

  readonly maxDefaulter = computed(() => Math.max(...this.data().contributions.defaulterPipeline.map((v) => v.amount)));

  readonly allocationTotal = computed(() => this.data().investments.allocation.reduce((sum, a) => sum + a.value, 0));
  readonly allocationGradient = computed(() => {
    const total = this.allocationTotal();
    if (!total) return 'conic-gradient(#e2e8f0 0deg 360deg)';
    let start = 0;
    const segments = this.data().investments.allocation.map((a) => {
      const end = start + (a.value / total) * 360;
      const seg = `${a.color} ${start}deg ${end}deg`;
      start = end;
      return seg;
    });
    return `conic-gradient(${segments.join(', ')})`;
  });

  readonly maxMaturity = computed(() => Math.max(...this.data().investments.maturitySchedule.map((v) => v.amount)));
  readonly maxPayout = computed(() => Math.max(...this.data().benefits.payoutsByType.map((v) => v.amount)));
  readonly maxChannel = computed(() => Math.max(...this.data().operations.channelTraffic.map((v) => v.users)));

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
