import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CoursesStore } from '../../store/courses/courses.store';

@Component({
  selector: 'app-course-add',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './course-add.html',
  styleUrl: './course-add.css',
})
export class CourseAdd implements OnInit {
  coursesForm!: FormGroup;
  selectedFileName = '';
  private coursesStore = inject(CoursesStore);
  private router = inject(Router);

  ngOnInit(): void {
    this.coursesForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFileName = file.name;
      this.coursesForm.patchValue({ image: file });
    } else {
      this.selectedFileName = '';
      this.coursesForm.patchValue({ image: '' });
    }
  }

  onSubmit(): void {
    if (this.coursesForm.valid) {
      this.coursesStore.addCourse(this.coursesForm.value);
      this.router.navigate(['/courses']);
    }
  }
}
