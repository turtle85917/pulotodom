interface WakatimeAllTimeSinceToday {
  data: {
    decimal: string;
    digital: string;
    is_up_to_date: boolean;
    percent_calculated: number;
    range: {
      end: string;
      end_date: string;
      end_text: string;
      start: string;
      start_date: string;
      start_text: string;
      timezone: string;
    };
    text: string;
    timeout: number;
    total_seconds: number;
  }
}

interface WakatimeCommits {
  data: WakatimeCommit[];
  next_page: number;
  page: number;
  prev_page: number;
  total: number;
  total_pages: number;
}

interface WakatimeCommit {
  id: string;
  name: string;
  repository: string | null;
  badge: string | null;
  color: string | null;
  clients: any[];
  has_public_url: boolean;
  human_readable_last_heartbeat_at: string;
  last_heartbeat_at: string;
  url: string;
  urlencoded_name: string;
  created_at: string;
}
