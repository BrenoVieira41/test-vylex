import { Schema, model, Document } from 'mongoose';
import { OrderEnum, Pagination } from '../Utils/PaginationInterface';

export interface Themes extends Document {
  id: number;
  name: string;
}

export interface ThemesPagination extends Pagination {
  orderBy?: OrderEnum;
  themes: number[] | any;
}

export interface GenreResponse {
  genres: Themes[];
}

const themeSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
  },
  { collection: 'themes' },
);

export const ThemeModel = model<Themes>('Theme', themeSchema);
