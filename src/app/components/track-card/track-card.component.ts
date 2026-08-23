import { Component, computed, inject, input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-card',
  standalone: true,
  template: `
    <article class="track-card" (click)="player.select(track())">
      <div class="cover">
        <img [src]="track().coverUrl" [alt]="track().title" loading="lazy" />
        <button class="play" (click)="toggle($event)" [class.playing]="isPlaying()">
          {{ isPlaying() ? '⏸' : '▶' }}
        </button>
      </div>
      <div class="info">
        <h3 [title]="track().title">{{ track().title }}</h3>
        <p [title]="track().artist">{{ track().artist }}</p>
        <div class="meta">
          <span>{{ track().plays }} ▶</span>
          <span>{{ track().likes }} ♥</span>
          <span>{{ track().duration }}s</span>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .track-card { cursor: pointer; transition: transform 0.15s; color: #e1e1e6; }
    .track-card:hover { transform: translateY(-2px); }
    .cover { position: relative; aspect-ratio: 1 / 1; overflow: hidden; border-radius: 0.25rem; background: #1f1f24; }
    .cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .play {
      position: absolute; inset: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.55); color: #fff; font-size: 2rem;
      border: 0; display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.2s; cursor: pointer;
    }
    .track-card:hover .play { opacity: 1; }
    .play.playing { opacity: 1; }
    .info { padding: 0.5rem 0; }
    .info h3 { margin: 0; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff; }
    .info p { margin: 0.25rem 0 0.5rem; font-size: 0.8rem; color: #a1a1aa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .meta { display: flex; gap: 0.75rem; font-size: 0.75rem; color: #71717a; }
  `]
})
export class TrackCardComponent {
  readonly track = input.required<Track>();
  readonly player = inject(PlayerService);
  readonly isCurrent = computed(() => this.player.selectedTrack()?.id === this.track().id);
  readonly isPlaying = computed(() => this.isCurrent() && this.player.isPlaying());

  toggle(event: Event) {
    event.stopPropagation();
    this.player.toggle(this.track());
  }
}
