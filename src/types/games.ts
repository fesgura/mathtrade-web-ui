import { User } from "./user";

export interface GameOwner {
  fullName: string;
  username: string;
  email: string;
  bggUsername: string;
  phoneNumber: string;
  telegramUsername: string;
  location: string;
}

export interface GameCopy {
  owner: GameOwner;
  id?: number;
  language?: string | null;
  publisher?: string | null;
  box_status?: string;
  component_status?: string;
}

export interface Game {
  id: number;
  bgg_id: number;
  title: string;
  year_published: number;
  thumbnail_url: string;
  combos: GameCombo[];
  type?: string;
  value?: any;
  rank?: number;
  rank_votes?: string;
  weight?: number;
  weight_votes?: string;
  rate?: number;
}

export interface GameCombo {
  id: number;
  name: string;
  elements: GameCopy[];
  user: User;
}

export interface GamesListResponse {
  content: Game[];
  page: number;
  limit: number;
  offset: number;
  total: number;
  hasNextPage: boolean;
  nextPage: number;
  prevPage: number;
}
