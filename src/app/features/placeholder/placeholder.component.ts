import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  template: `
    <div class="placeholder">
      <h1>{{ title }}</h1>
      <p>This section is under construction.</p>
    </div>
  `,
  styles: [`
    .placeholder {
      padding: 2rem;
    }

    h1 {
      color: #1e3a8a;
      margin: 0 0 0.5rem;
    }

    p {
      color: #64748b;
      margin: 0;
    }
  `],
})
export class PlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  get title(): string {
    return this.route.snapshot.data['title'] ?? 'Section';
  }
}
