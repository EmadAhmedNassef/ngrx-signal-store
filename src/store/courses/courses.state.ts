export interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
}
export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  author: string;
}

export const initialState: CoursesState = {
  courses: [
    {
      id: 1,
      title: 'Complete JavaScript Course',
      description:
        'This beginner Angular course covers core concepts like components, data binding, and routing to build dynamic web apps...',
      image: 'js.jpg',
      price: 299,
      author: 'John Doe',
    },
    {
      id: 2,
      title: 'Complete HTML Course',
      description:
        'This beginner HTML course covers core concepts like elements, attributes, and tags to build dynamic web apps...',
      image: 'images.jfif',
      price: 129,
      author: 'Emily Johnson',
    },
  ],
  selectedCourse: null,
};
