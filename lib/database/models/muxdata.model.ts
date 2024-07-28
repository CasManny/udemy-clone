import mongoose from 'mongoose'

const muxdataSchema = new mongoose.Schema({
    assetId: String,
    playbackId: String,
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }
})

export const MuxData = mongoose.models.MuxData || mongoose.model("MuxData", muxdataSchema)