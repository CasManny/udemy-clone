import mongoose from "mongoose"

const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
})

export const Level = mongoose.models.Level || mongoose.model("Level", levelSchema)