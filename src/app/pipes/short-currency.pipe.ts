import { Pipe, PipeTransform } from '@angular/core';

export function formatShortCurrency(value: number, currency = 'UGX'): string {
  if (value == null) return '';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) {
    return `${currency} ${trimShort(value / 1_000_000_000)} M`;
  }
  if (abs >= 1_000_000) {
    return `${currency} ${trimShort(value / 1_000_000)} M`;
  }
  return `${currency} ${value}`;
}

function trimShort(num: number): string {
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
}

@Pipe({
  name: 'shortCurrency',
  standalone: true,
})
export class ShortCurrencyPipe implements PipeTransform {
  transform(value: number, currency = 'UGX'): string {
    return formatShortCurrency(value, currency);
  }
}
