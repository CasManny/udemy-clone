import CreateSectionForm from '@/components/sections/CreateSectionForm'
import { getCourseDetail } from '@/lib/database/actions/course.actions'
import { getSection } from '@/lib/database/actions/section.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'


const CourseCurriculumPage = async ({ params }: { params: { courseId: string } }) => {
    const { userId } = auth()
    if (!userId) {
       return redirect("/sign-in")
    }
    const course = await getCourseDetail({ courseId: params.courseId })
    if (!course) {
        redirect('/instructor/courses')
    }
    return (
      <CreateSectionForm course={course[0]} />
  )
}

export default CourseCurriculumPage