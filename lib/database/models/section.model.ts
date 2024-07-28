import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoUrl: String,
    position: Number,
    isPublished: {
        type: Boolean,
        default: false
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    isFree: {
        type: Boolean,
        default: false
    },
    muxData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MuxData"
    },
    resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resources"
    }],
    progress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Progress"
    }]
}, { timestamps: true })

export const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema)