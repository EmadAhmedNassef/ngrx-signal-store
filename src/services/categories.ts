import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoriesResponse, Category } from '../store/categories/categories.state';

const CATEGORIES_API = 'http://localhost:8000/api/v1/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  getCategories(): Observable<{ categories: Category[]; results: number }> {
    return this.http.get<CategoriesResponse>(CATEGORIES_API).pipe(
      map((response) => ({
        categories: this.extractCategories(response.data),
        results: response.results,
      })),
    );
  }

  private extractCategories(data: CategoriesResponse['data']): Category[] {
    if (Array.isArray(data)) {
      return data;
    }
    if ('categories' in data && Array.isArray(data.categories)) {
      return data.categories;
    }
    const nested = Object.values(data).find((value) => Array.isArray(value));
    return (nested as Category[] | undefined) ?? [];
  }
}
