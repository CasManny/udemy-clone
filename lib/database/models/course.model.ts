
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor"
    },
    title: String,
    subtitle: String,
    description: String,
    imageUrl: String,
    price: Number,
    isPublished: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level"
    }

}, {timestamps: true})

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)