export interface Podcast {
  id: string;
  rss: string;
  type: string;
  email: string;
  extra: {
    url1: string;
    url2: string;
    url3: string;
    google_url: string;
    spotify_url: string;
    youtube_url: string;
    linkedin_url: string;
    wechat_handle: string;
    patreon_handle: string;
    twitter_handle: string;
    facebook_handle: string;
    amazon_music_url: string;
    instagram_handle: string;
  };
  image: string;
  title: string;
  country: string;
  website: string;
  language: string;
  genre_ids: Array<number>;
  itunes_id: number;
  publisher: string;
  thumbnail: string;
  is_claimed: boolean;
  description: string;
  looking_for: {
    guests: boolean;
    cohosts: boolean;
    sponsors: boolean;
    cross_promotion: boolean;
  };
  listen_score: number;
  total_episodes: number;
  listennotes_url: string;
  audio_length_sec: number;
  explicit_content: boolean;
  latest_episode_id: string;
  latest_pub_date_ms: number;
  earliest_pub_date_ms: number;
  update_frequency_hours: number;
  listen_score_global_rank: string;
}
