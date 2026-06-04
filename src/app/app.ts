import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Loader } from './loader/loader';
import { AuthStore } from '../store/auth/auth.store';
import { SignupStore } from '../store/signup/signup.store';
import { CategoriesStore } from '../store/categories/categories.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private authStore = inject(AuthStore);
  private signupStore = inject(SignupStore);
  private categoriesStore = inject(CategoriesStore);

  isLoading = this.authStore.loading;
  isLoadingSignup = this.signupStore.loading;
  isLoadingCategories = this.categoriesStore.loading;
}
