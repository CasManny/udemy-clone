"use server"

import { connectToDatabase } from "../connect"
import { Level } from "../models/level.model"


export const getAllLevels = async () => {
    try {
        await connectToDatabase()
        const levels = await Level.find()
        return levels.map((level) => ({
            value: level._id,
            label: level.name
        }))
    } catch (error: any) {
        console.log("Error in fetching levels")
        throw new Error(error.message)
    }
}