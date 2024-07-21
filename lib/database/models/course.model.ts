import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    instructorId: {
      type: String,
      required: true,
    },
    title: String,
    subtitle: String,
    description: String,
    imageUrl: String,
    price: Number,
    isPublished: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
  },
  { timestamps: true }
);

export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
