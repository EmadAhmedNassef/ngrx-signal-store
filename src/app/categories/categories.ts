import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesStore } from '../../store/categories/categories.store';

@Component({
  selector: 'app-categories',
  imports: [DatePipe],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private categoriesStore = inject(CategoriesStore);

  categories = this.categoriesStore.categories;
  results = this.categoriesStore.results;
  loading = this.categoriesStore.loading;
  error = this.categoriesStore.error;

  ngOnInit(): void {
    this.categoriesStore.loadCategories();
  }

  refresh(): void {
    this.categoriesStore.refreshCategories();
  }
}
