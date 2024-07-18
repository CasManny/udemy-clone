import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    

})

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)