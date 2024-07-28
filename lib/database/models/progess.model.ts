import mongoose from "mongoose";

const progessSchema = new mongoose.Schema({
    studentId: {
        type: String,
        unique: true
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true})

export const Progress = mongoose.models.Progress || mongoose.model("Progress", progessSchema)