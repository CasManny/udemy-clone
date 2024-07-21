import CreateSectionForm from '@/components/sections/CreateSectionForm'
import { getCourseDetail } from '@/lib/database/actions/course.actions'
import React from 'react'


const CourseCurriculumPage = async ({ params }: { params: { courseId: string } }) => {
    const courseData = await getCourseDetail({ courseId: params.courseId })
    const course = JSON.parse(JSON.stringify(courseData))
    return (
      <CreateSectionForm course={course} />
  )
}

export default CourseCurriculumPage