"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { createSection, reOrderSection } from "@/lib/database/actions/section.actions";
import SectionList from "./SectionList";

interface ISection {
  _id: string,
  isFree: boolean,
  isPublished: boolean,
  position: number,
  progress: string[],
  resources: string[],
  title: string;
  courseId: string;
}
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
    section: ISection[]
  };
}

const formSchema = z.object({
  title: z.string().min(2, "Title is required and be atleast 2 characters"),
});

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
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createSection({ title: values.title, courseId: course._id })
      router.push(`/instructor/courses/${course._id}/sections/${res._id}`)
      toast.success("New section created")
    } catch (error) {
      toast.error("Something went wrong")
      console.log("Failed to create a new section")
    }
  }

  const onReorder = async (updateData: { _id: string, position: number }[]) => {
    try {
      await reOrderSection({ courseId: course._id, list: updateData })
      toast.success("Sections reordered successfully")
    } catch (error) {
      console.log("Failed to reorder section")
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <div className="px-10 py-6">
        <div className="flex gap-5">
          {routes.map((route, index) => (
            <Link href={route.path} key={index}>
              <Button variant={pathname === route.path ? "default" : "outline"}>
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
        <SectionList items={course.section} onReorder={onReorder} onEdit={(_id) => {router.push(`/instructor/courses/${course._id}/sections/${_id}`)}} />
        <h1 className="text-xl font-bold mt-5">Add New section</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduction" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Link href={`/instructor/courses/${course._id}/basic`}>
                <Button type="button" variant={"outline"}>
                  cancel
                </Button>
              </Link>
              <Button type="submit">save</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateSectionForm;
