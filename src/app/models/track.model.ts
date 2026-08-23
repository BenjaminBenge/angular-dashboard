export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  plays: number;
  likes: number;
  audioUrl: string;
  coverUrl?: string;
}
