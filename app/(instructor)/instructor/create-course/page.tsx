import CreateCourseForm from '@/components/course/CreateCourseForm'
import { getAllCategories, getAllSubCategories } from '@/lib/database/actions/category.actions'
import React from 'react'



const CreateCoursePage = async () => {
  const categories = await getAllCategories()
  const subcategories = await getAllSubCategories()
  return (
    <div>
      <CreateCourseForm categories={categories} subcategories={subcategories} />
    </div>
  )
}

export default CreateCoursePage