export interface Share {
  id: number;
  backdrop_url: string;
  is_banner: boolean;
  original_title: string;
  overview: string;
  poster_url: string;
  release_date: string;
  runtime?: number | null;
  share_size: string | null;
  share_type: string;
  slug: string;
  small_poster_url: string;
  tagline: string;
  title: string;
  tmdb_id: number | null;
}
