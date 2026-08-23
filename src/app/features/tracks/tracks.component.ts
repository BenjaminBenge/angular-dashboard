import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of, startWith } from 'rxjs';
import { TrackCardComponent } from '../../components/track-card/track-card.component';
import { Track } from '../../models/track.model';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [ReactiveFormsModule, TrackCardComponent],
  template: `
    <div class="stream-header">
      <h1>Stream</h1>
      <input
        [formControl]="searchControl"
        placeholder="Search tracks or artists"
        aria-label="Search tracks"
      />
    </div>

    @if (isLoading()) {
      <p class="status">Loading…</p>
    } @else if (error()) {
      <p class="error">{{ error() }}</p>
    } @else {
      <section class="track-grid" aria-label="Track list">
        @for (item of filteredTracks(); track item.id) {
          <app-track-card [track]="item" />
        } @empty {
          <p class="status">No tracks found.</p>
        }
      </section>
    }
  `,
  styles: [`
    .stream-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
    h1 { margin: 0; font-size: 1.75rem; color: #fff; }
    input { background: #1f1f24; border: 1px solid #2b2b30; color: #e1e1e6; padding: 0.5rem 0.75rem; border-radius: 0.5rem; width: 16rem; }
    .status { color: #a1a1aa; }
    .error { color: #f44; }
    .track-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: 1.5rem; }
  `]
})
export class TracksComponent {
  private readonly trackService = inject(TrackService);
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly tracks = signal<Track[]>([]);
  readonly filteredTracks = signal<Track[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.trackService.getTracks().pipe(
      catchError((err) => {
        this.error.set(err.message);
        return of([]);
      }),
      takeUntilDestroyed()
    ).subscribe((data) => {
      this.tracks.set(data);
      this.filteredTracks.set(data);
      this.isLoading.set(false);
    });

    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe((query) => this.filter(query));
  }

  private filter(query: string): void {
    const q = query.toLowerCase();
    this.filteredTracks.set(
      this.tracks().filter((t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q))
    );
  }
}
