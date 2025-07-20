import { User } from "@/types/user";

export interface Mathtrade {
  id: number;
  name: string;
  games_count?: number;
  items_count?: number;
  users_count?: number;
  start_date?: string;
  frezze_geek_date?: string;
  frezze_wants_date?: string;
  meeting_date?: string;
  show_results_date?: string;
  status?: string;
}

export interface LoginResponse {
  token: string;
  change_required?: boolean;
  user: User;
  mathtrade: Mathtrade | null;
  mathtrade_history?: any[];
  membership: any;
}
