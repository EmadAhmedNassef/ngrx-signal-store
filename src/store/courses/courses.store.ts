import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Course, initialState } from './courses.state';

export const CoursesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addCourse(course: Omit<Course, 'id'>): void {
      patchState(store, (state) => ({
        courses: [...state.courses, { ...course, id: state.courses.length + 1 }],
      }));
    },
    deleteCourse(id: number): void {
      patchState(store, (state) => ({
        courses: state.courses.filter((course) => course.id !== id),
        selectedCourse: state.selectedCourse?.id === id ? null : state.selectedCourse,
      }));
    },
    selectCourse(course: Course): void {
      patchState(store, (state) => ({
        selectedCourse: state.selectedCourse?.id === course.id ? null : course,
      }));
    },
    getCourseById(id: number): Course | undefined {
      return store.courses().find((course) => course.id === id);
    },
  })),
);
