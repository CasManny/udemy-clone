"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICourseEdit } from "@/constants";
import RichEditor from "../custom/RichEditor";
import { Combobox } from "../custom/ComboBox";
import FileUpload from "../custom/FileUpload";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { updateCourse } from "@/lib/database/actions/course.actions";
import { Trash } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().min(1, "subcategory is required"),
  levelId: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.coerce.number().optional(),
});
const EditCourseForm = ({
  course,
  categories,
  subcategories,
  levels,
}: ICourseEdit) => {
  const router = useRouter();
  const pathname = usePathname()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course?.title,
      subtitle: course.subtitle || "",
      description: course.description || "",
      categoryId: course.categoryId,
      subCategoryId: course.subCategory,
      levelId: course.levelId || "",
      imageUrl: course.imageUrl || "",
      price: course.price || undefined,
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formdata = {
        title: values.title,
        description: values.description,
        categoryId: values.categoryId,
        subtitle: values.subtitle,
        subCategory: values.subCategoryId,
        levelId: values.levelId,
        imageUrl: values.imageUrl,
        price: values.price,
        courseId: course._id,
      };
      await updateCourse({ formdata: formdata });
      toast.success("course updated");
      router.refresh();
    } catch (error: any) {
      console.log("failed to update course");
      toast.error(error.message);
    }
  }
  return (
    <div className="flex gap-2 flex-col mb-7">
      <div className="flex flex-col sm:flex-row sm:justify-between">
      <div className="flex gap-5">
        {routes.map((route, index) => (
          <Link href={route.path} key={index}>
            <Button variant={pathname === route.path ? "default": "outline"}>{route.label}</Button>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-start">
        <Button variant={'outline'}>Publish</Button>
        <Button> <Trash className="" /> </Button>
      </div>

      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Web development for beginners"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Become a full stack developer with just one course"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichEditor
                    placeholder="What is this course about"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-10">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Combobox options={categories} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCategoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Subcategory</FormLabel>
                  <FormControl>
                    <Combobox options={subcategories} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="levelId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Combobox options={levels} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Course banner</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    endpoint="courseBanner"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="9.99"
                    step={0.01}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-3">
            <Link href={"/instructor/courses"}>
              <Button variant={"outline"} type="button">
                cancel
              </Button>
            </Link>
            <Button type="submit">save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditCourseForm;
