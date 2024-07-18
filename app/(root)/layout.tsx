import Header from '@/components/Header'
import React, { ReactNode } from 'react'

const HomePageLayout = ({children}: { children: ReactNode}) => {
  return (
      <div>
          <Header />
          {children}
    </div>
  )
}

export default HomePageLayout