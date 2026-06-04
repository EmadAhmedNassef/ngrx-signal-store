import { Component, effect, inject } from '@angular/core';
import { CounterStore } from '../../store/counter/counter.store';
import { CoursesStore } from '../../store/courses/courses.store';
import { CategoriesStore } from '../../store/categories/categories.store';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  private counterStore = inject(CounterStore);
  private coursesStore = inject(CoursesStore);
  private categoriesStore = inject(CategoriesStore);

  categories = this.categoriesStore.categories;
  results = this.categoriesStore.results;
  loading = this.categoriesStore.loading;
  error = this.categoriesStore.error;
  count = this.counterStore.count;
  name = this.counterStore.name;
  selectedCourse = this.coursesStore.selectedCourse;

  // ngOnInit(): void {
  //   this.categoriesStore.loadCategories();
  // }

  onIncrement(): void {
    this.counterStore.increment();
  }

  onDecrement(): void {
    this.counterStore.decrement();
  }

  onReset(): void {
    this.counterStore.reset();
  }

  onIncreaseByAmount(): void {
    this.counterStore.increaseByAmount(10);
  }

  onDecreaseByAmount(): void {
    this.counterStore.decreaseByAmount(10);
  }

  onChangeName(): void {
    this.counterStore.changeName('Omdaaa');
  }
}
