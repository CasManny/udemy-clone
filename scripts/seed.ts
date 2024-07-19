"use server";
import { connectToDatabase } from "@/lib/database/connect";
import { Category } from "@/lib/database/models/category.model";
import { Level } from "@/lib/database/models/level.model";
import { Subcategory } from "@/lib/database/models/subcategory.model";

export const seed = async () => {
  try {
    await connectToDatabase();
    const itCategory = await Category.create({ name: "IT & Software" });
    const businessCategory = await Category.create({ name: "Business" });
    const designCategory = await Category.create({ name: "Design" });
    const healthCategory = await Category.create({ name: "Health" });

    await Subcategory.create([
      { name: "Web Development", categoryId: itCategory._id },
      { name: "Data Science", categoryId: itCategory._id },
      { name: "Cybersecurity", categoryId: itCategory._id },
      { name: "Others", categoryId: itCategory._id },
      { name: "E-Commerce", categoryId: businessCategory._id },
      { name: "Marketing", categoryId: businessCategory._id },
      { name: "Finance", categoryId: businessCategory._id },
      { name: "Others", categoryId: businessCategory._id },
      { name: "Graphic Design", categoryId: designCategory._id },
      { name: "3D & Animation", categoryId: designCategory._id },
      { name: "Interior Design", categoryId: designCategory._id },
      { name: "Others", categoryId: designCategory._id },
      { name: "Fitness", categoryId: healthCategory._id },
      { name: "Yoga", categoryId: healthCategory._id },
      { name: "Nutrition", categoryId: healthCategory._id },
      { name: "Others", categoryId: healthCategory._id },
    ]);

    // Seed levels
    await Level.create([
      { name: "Beginner" },
      { name: "Intermediate" },
      { name: "Expert" },
      { name: "All levels" },
    ]);

    console.log("Seeding successfully");
  } catch (error) {
    console.log("Seeding failed", error);
  }
};

