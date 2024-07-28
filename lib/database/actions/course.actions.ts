"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../connect";
import { ICreatecourse, IFormdata } from "@/constants";
import { CourseModel } from "../models/course.model";

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
    const newCourse = new CourseModel({
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
    const courses = await CourseModel.find({ instructorId: userId }).sort({
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
    const course = await CourseModel.find({ instructorId: userId, _id: courseId }).populate({
      path: "section",
      select: "-__v -createdAt -updatedAt"
    })
    return JSON.parse(JSON.stringify(course))
  } catch (error: any) {
    console.log("Error in fetch course detail");
    throw new Error(error.message);
  }
};

export const updateCourse = async ({formdata}: IFormdata) => {
  const { userId } = auth()
  const { title, subCategory,courseId, subtitle, description, categoryId, levelId, imageUrl, price } = formdata
  if (!userId) {
    throw new Error("Unauthorized")
  }
  try {
    await connectToDatabase()
    const course = await CourseModel.updateOne({ _id: courseId, instructorId: userId }, {
      title, subCategory, description, categoryId, levelId, imageUrl, price, subtitle
    })

    return JSON.parse(JSON.stringify(course))


  } catch (error: any) {
    console.log(error.message)
    throw new Error("Somethin went wrong")
  }
}
