import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-bar',
  standalone: true,
  template: `
    @if (track(); as t) {
      <div class="bar">
        <audio #audio (timeupdate)="onTimeUpdate()" (loadedmetadata)="onLoadedMetadata()" (ended)="onEnded()"></audio>

        <img [src]="t.coverUrl" [alt]="t.title" class="thumb" />

        <div class="now">
          <h4 [title]="t.title">{{ t.title }}</h4>
          <p [title]="t.artist">{{ t.artist }}</p>
        </div>

        <div class="scrubber">
          <input
            type="range"
            min="0"
            [max]="duration()"
            step="1"
            [value]="currentTime()"
            (input)="seek($any($event).target.valueAsNumber)"
          />
          <div class="times">
            <span>{{ formatTime(currentTime()) }}</span>
            <span>{{ formatTime(duration()) }}</span>
          </div>
        </div>

        <div class="controls">
          <button (click)="toggle()">{{ isPlaying() ? '⏸' : '▶' }}</button>
        </div>

        <input
          class="volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          [value]="volume()"
          (input)="setVolume($any($event).target.valueAsNumber)"
        />
      </div>
    } @else {
      <div class="bar empty">Select a track to play</div>
    }
  `,
  styles: [`
    :host { display: block; }
    .bar { height: 80px; background: #0b0b0c; border-top: 1px solid #1f1f24; display: flex; align-items: center; padding: 0 1.5rem; gap: 1rem; color: #e1e1e6; }
    .thumb { width: 48px; height: 48px; object-fit: cover; border-radius: 0.25rem; }
    .now { width: 12rem; }
    .now h4 { margin: 0; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .now p { margin: 0.2rem 0 0; font-size: 0.8rem; color: #a1a1aa; }
    .scrubber { flex: 1; display: flex; flex-direction: column; gap: 0.25rem; }
    .scrubber input { width: 100%; cursor: pointer; }
    .times { display: flex; justify-content: space-between; font-size: 0.75rem; color: #71717a; }
    .controls { display: flex; gap: 0.5rem; }
    button { background: #1f1f24; color: #fff; border: 0; border-radius: 50%; width: 2.5rem; height: 2.5rem; cursor: pointer; }
    .volume { width: 6rem; }
    .empty { color: #71717a; justify-content: center; }
  `]
})
export class PlayerBarComponent {
  private player = inject(PlayerService);
  readonly track = this.player.selectedTrack;
  readonly isPlaying = this.player.isPlaying;
  readonly currentTime = this.player.currentTime;
  readonly duration = this.player.duration;
  readonly volume = this.player.volume;

  private audio = viewChild.required<ElementRef<HTMLAudioElement>>('audio');

  constructor() {
    effect(() => {
      const t = this.track();
      const a = this.audio().nativeElement;
      if (t?.audioUrl) {
        if (a.src !== t.audioUrl) {
          a.src = t.audioUrl;
        }
        a.load();
        this.isPlaying() ? a.play().catch(() => {}) : a.pause();
      }
    });
  }

  toggle() { this.player.isPlaying.update((p) => !p); }

  onTimeUpdate() { this.player.currentTime.set(this.audio().nativeElement.currentTime); }
  onLoadedMetadata() { this.player.duration.set(this.audio().nativeElement.duration); }
  onEnded() { this.player.isPlaying.set(false); this.player.currentTime.set(0); }

  seek(seconds: number) {
    this.audio().nativeElement.currentTime = seconds;
    this.player.currentTime.set(seconds);
  }

  setVolume(value: number) {
    this.audio().nativeElement.volume = value;
    this.player.volume.set(value);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
}
