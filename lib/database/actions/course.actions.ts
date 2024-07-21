"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../connect";
import { ICreatecourse } from "@/constants";
import { Course } from "../models/course.model";

export const createCourse = async ({
  title,
  categoryId,
  subCategoryId,
}: ICreatecourse) => {
  try {
    await connectToDatabase();
    const { userId } = auth();
    if (!userId) {
      throw new Error("No userId found");
    }
    const newCourse = new Course({
      title,
      categoryId,
      subCategory: subCategoryId,
      instructorId: userId,
    });
    await newCourse.save();
    const data = JSON.parse(JSON.stringify(newCourse));
    return data;
  } catch (error: any) {
    console.log("error in createCourse action");
    throw new Error(error);
  }
};

export const getAllCourse = async () => {
  try {
    await connectToDatabase();
    const { userId } = auth();
    const courses = await Course.find({ instructorId: userId }).sort({
      createdAt: "desc",
    });
    return courses;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCourseDetail = async ({ courseId }: { courseId: string }) => {
  try {
    await connectToDatabase();
    const { userId } = auth();
    const course = await Course.find({ instructorId: userId, _id: courseId });
    return course;
  } catch (error: any) {
    console.log("Error in fetch course detail");
    throw new Error(error.message);
  }
};
