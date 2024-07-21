import EditCourseForm from '@/components/course/EditCourseForm'
import { getAllCategories, getAllSubCategories } from '@/lib/database/actions/category.actions'
import { getCourseDetail } from '@/lib/database/actions/course.actions'
import { getAllLevels } from '@/lib/database/actions/level.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const CourseBasics = async  ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()
  if (!userId) {
    return redirect('/sign-in')
  }
  const courseData = await getCourseDetail({ courseId: params.courseId })
  const categoriesData = await getAllCategories()
  const subcategoriesData = await getAllSubCategories()
  const levelsData = await getAllLevels()
  if (!courseData) {
    return redirect("/instructor/courses")
  }
  const course = JSON.parse(JSON.stringify(courseData[0]))
  const levels = JSON.parse(JSON.stringify(levelsData))
  const subcategories = JSON.parse(JSON.stringify(subcategoriesData))
  const categories = JSON.parse(JSON.stringify(categoriesData))

  return (
    <div className="px-10">
      <EditCourseForm course={course} categories={categories} subcategories={subcategories} levels={levels} />
    </div>
  )
}

export default CourseBasics