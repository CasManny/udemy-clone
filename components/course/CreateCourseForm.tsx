"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "../ui/button";
import { Combobox } from "../custom/ComboBox";
import { useRouter } from "next/navigation";
import { createCourse } from "@/lib/database/actions/course.actions";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2, "Title is required and minimum of 2 characters"),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().min(1, "subCategory is required"),
});

interface ICourseProps {
  categories: { value: string, label: string}[],
  subcategories: { value: string, label: string, categoryId: string}[]
}

const CreateCourseForm = ({ categories, subcategories }: ICourseProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
    },
  });




  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  
    try {
      const course = await createCourse({ title: values.title, categoryId: values.categoryId, subCategoryId: values.subCategoryId })
      toast.success("New Course Created")
      router.push(`/instructor/courses/${course?._id}/basic`)
      console.log(values)
    } catch (error) {
      console.log("Failed to create new course")
      toast.error("Something went")
    }
  }
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Let give some basics for your course</h1>
      <p className="text-sm mt-3">
        it's okay if you can't think of a good title or correct category now.
        You can change them later
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Web Development for beginners" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
