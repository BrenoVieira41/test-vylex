import { Schema, model, Document } from 'mongoose';
import { OrderEnum, Pagination } from '../Utils/PaginationInterface';

export interface Movies extends Document {
  id: number;
  name: string;
  theme_id: number[];
}

export interface MoviesPagination extends Pagination {
  name?: string;
  orderBy?: OrderEnum;
  theme_id: number[] | any;
}

export interface MoviesResponse {
  id: number,
  title: string,
  genre_ids: number[]
}

export interface MoviesGenderResponse {
  id: number,
  page: number,
  results: MoviesResponse[],
  total_pages: number,
  total_results: number
}

const MovieSchema = new Schema<Movies>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  theme_id: { type: [Number], required: true }
}, {
  collection: 'movies'
});

export const MovieModel = model<Movies>('Movies', MovieSchema);
