import mongoose from "mongoose"
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
})

export const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema)