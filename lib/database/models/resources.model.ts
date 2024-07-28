import mongoose from "mongoose";

const resourcesSchema = new mongoose.Schema({
    name: String,
    fileUrl: String,
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }

}, { timestamps: true})

export const Resources = mongoose.models.Resources || mongoose.model("Resources", resourcesSchema)