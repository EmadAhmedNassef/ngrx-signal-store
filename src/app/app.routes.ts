import { Routes } from '@angular/router';
import { Counter } from './counter/counter';
import { Courses } from './courses/courses';
import { CourseAdd } from './course-add/course-add';
import { CourseDetail } from './course-detail/course-detail';
import { CourseEdit } from './course-edit/course-edit';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Categories } from './categories/categories';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'counter', component: Counter },
  { path: 'categories', component: Categories },
  { path: 'courses', component: Courses },
  { path: 'courses/add', component: CourseAdd },
  { path: 'courses/:id', component: CourseDetail },
  { path: 'courses/:id/edit', component: CourseEdit },
];
