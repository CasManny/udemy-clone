import { Button } from '@/components/ui/button'
import { getAllCourse } from '@/lib/database/actions/course.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const CoursesPage = async () => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/sign-in')
    }
  const courses = await getAllCourse()
  return (
      <div className='px-6 py-4'>
          <Link href={'/instructor/create-course'}>
            <Button>Create New Course</Button>
      </Link>
      <div className="mt-10">
        {courses.map((course, index) => (
          <Link href={`/instructor/courses/${course._id}/basic`} key={index}>{ course.title}</Link>
       ))}
      </div>
    </div>
  )
}

export default CoursesPage