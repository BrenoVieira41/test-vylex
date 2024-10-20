export interface PackInput {
  themes: number[];
}

export interface CreatePack {
  themes: number[];
  name: string;
  user_id: string;
}

export interface Packs {
  id: string;
  name: string;
  themes: number[];
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
