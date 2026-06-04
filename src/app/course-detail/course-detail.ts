import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CoursesStore } from '../../store/courses/courses.store';

@Component({
  selector: 'app-course-detail',
  imports: [RouterLink],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail {
  private coursesStore = inject(CoursesStore);
  private route = inject(ActivatedRoute);

  private courseId = toSignal(this.route.paramMap.pipe(map((params) => Number(params.get('id')))), {
    initialValue: 0,
  });

  course = computed(() => this.coursesStore.getCourseById(this.courseId()));
}
