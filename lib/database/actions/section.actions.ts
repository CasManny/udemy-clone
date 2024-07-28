'use server'

import { auth } from "@clerk/nextjs/server"
import { connectToDatabase } from "../connect"
import { CourseModel } from "../models/course.model"
import { Section } from "../models/section.model"

export const createSection = async ({courseId, title}: { courseId: string, title: string}) => {
    try {
        await connectToDatabase()
        const { userId } = auth()
        if (!userId) {
            throw new Error("Unauthorized")
        }
        const course = await CourseModel.findOne({ _id: courseId, instructorId: userId })
        if (!course) {
            throw new Error("course not found")
        }
        const lastSection = await Section.findOne({ courseId: courseId }).sort({ position: 'desc' })
        const newPosition = lastSection ? lastSection.position + 1 : 0;

        const newSection = new Section({
            title: title,
            courseId: courseId,
            position: newPosition,
        })
        course.section.push(newSection._id)
        Promise.all([
            await newSection.save(),
            await course.save()

        ])

        return JSON.parse(JSON.stringify(newSection))
    } catch (error) {
       console.log("error in fetching sections", error) 
    }
}

export const getSection = async ({ courseId }: { courseId: string }) => {
    try {
        await connectToDatabase()
        const sections = await Section.find({ courseId: courseId }).sort({ position: 'asc' })
        return JSON.parse(JSON.stringify(sections))
    } catch (error) {
        console.log(error)
    }
}

export const reOrderSection = async ({courseId, list}: {courseId: string, list: { _id: string, position: number}[]}) => {
 try {
     await connectToDatabase()
     const { userId } = auth()
     if (!userId) {
         throw new Error("Unauthorized")
     }

     const course = await CourseModel.findOne({ _id: courseId, instructorId: userId })
     if (!course) {
         throw new Error("No course found")
     }

     for (let item of list) {
         await Section.updateOne({_id: item._id}, {$set: {position: item.position}})
     }

     
    
 } catch (error) {
    console.log(error)
 }
}