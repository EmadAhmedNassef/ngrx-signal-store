import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../store/courses/courses.state';
import { CoursesStore } from '../../store/courses/courses.store';

@Component({
  selector: 'app-courses',
  imports: [RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  private coursesStore = inject(CoursesStore);
  courses = this.coursesStore.courses;
  selectedCourse = this.coursesStore.selectedCourse;

  selectCourse(course: Course): void {
    this.coursesStore.selectCourse(course);
  }

  isSelected(courseId: number): boolean {
    return this.selectedCourse()?.id === courseId;
  }

  deleteCourse(id: number): void {
    this.coursesStore.deleteCourse(id);
  }
}
