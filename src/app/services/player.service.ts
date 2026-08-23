import { Injectable, signal } from '@angular/core';
import { Track } from '../models/track.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  readonly selectedTrack = signal<Track | null>(null);
  readonly isPlaying = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  readonly volume = signal(1);

  select(track: Track): void {
    this.selectedTrack.set(track);
    this.isPlaying.set(true);
    this.currentTime.set(0);
    this.duration.set(0);
  }

  toggle(track: Track): void {
    if (this.selectedTrack()?.id === track.id) {
      this.isPlaying.update((p) => !p);
    } else {
      this.select(track);
    }
  }
}
