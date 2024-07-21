import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
interface ICourseSection {
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
}

const CreateSectionForm = ({ course }: ICourseSection) => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Basic Information",
      path: `/instructor/courses/${course._id}/basic`,
    },
    {
      label: "Curriculum",
      path: `/instructor/courses/${course._id}/sections`,
    },
  ];

  return (
    <div className="px-10 py-6">
      <div className="flex-gap-5">
        {routes.map((route, index) => (
          <Link href={route.path} key={index}>
            <Button variant={pathname === route.path ? "default" : "outline"}>
              {route.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CreateSectionForm;
