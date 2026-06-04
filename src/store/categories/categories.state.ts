export interface Category {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v?: number;
}

export interface Pagination {
  currentPage?: number;
  numberOfPages?: number;
  limit?: number;
  total?: number;
}

export interface CategoriesResponse {
  status: string;
  results: number;
  pagination: Pagination;
  data: Category[] | { categories: Category[] };
}

export interface CategoriesState {
  categories: Category[];
  results: number;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

export const initialState: CategoriesState = {
  categories: [],
  results: 0,
  loading: false,
  error: null,
  loaded: false,
};
