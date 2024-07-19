"use server";

import { connectToDatabase } from "../connect";
import { Category } from "../models/category.model";
import { Subcategory } from "../models/subcategory.model";

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ name: 'asc' }).select("_id name")
    return categories.map((category) => ({
      value: category._id.toString(),
      label: category.name
    }))
  } catch (error) {
    console.log(error);
  }
};

export const getAllSubCategories = async () => {
  try {
    await connectToDatabase()
    const subcategories = await Subcategory.find().select("_id name categoryId").populate('categoryId', "_id name")
    return subcategories.map(subcategory => ({
      value: subcategory._id.toString(),
      label: subcategory.name,
      categoryId: subcategory.categoryId._id.toString()
    }))
  } catch (error) {
    console.log(error)
  }
}
