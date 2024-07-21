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
    title: string;
    subtitle: string;
    description: string;
    categoryId: string;
    subCategoryId: string;
    levelId: string;
    imageUrl: string;
    price: number;
  };
  categories: { value: string; label: string }[];
  subcategories: { value: string; label: string; categoryId: string }[];
  levels: { value: string, label: string }[];
}
