export const headerRoutes = [
  {
    label: "Instructor",
    href: "/instructor/courses",
  },
  {
    label: "Learning",
    href: "/learning",
  },
];

export interface ICreatecourse {
  title: string;
  categoryId: string;
  subCategoryId: string;
}

export interface ICourseEdit {
  course: {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    categoryId: string;
    subCategory: string;
    levelId: string;
    imageUrl: string;
    price: number;
  };
  categories: { value: string; label: string }[];
  subcategories: { value: string; label: string; categoryId: string }[];
  levels: { value: string, label: string }[];
}


export interface IFormdata {
  formdata: {
    title: string;
    description: string;
    categoryId: string;
    subtitle: string;
    subCategory: string;
    levelId: string;
    imageUrl: string;
    price: number;
    courseId: string;

  }
}