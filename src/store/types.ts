import { User } from "@/types/user";

export interface StoreData {
  user: any;
  mathtrade: any;
  mathtrade_history: any[];
  membership: any;
  lang: string;
}

export interface StoreLocation {
  id: number;
  name: string;
  province: string;
  mandatory_attendance: boolean;
  referral: User | null;
}

export interface StoreState {
  data: StoreData;
  locations: StoreLocation[];
  updateStore?: (key: string, value: any) => void;
  clearStore?: () => void;
}
