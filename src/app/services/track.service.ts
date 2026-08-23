import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Track } from '../models/track.model';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private readonly http = inject(HttpClient);
  private readonly tracksUrl = 'assets/tracks.json';

  getTracks(): Observable<Track[]> {
    return this.http.get<{ tracks: Track[] }>(this.tracksUrl).pipe(
      map((data) => data.tracks)
    );
  }
}
