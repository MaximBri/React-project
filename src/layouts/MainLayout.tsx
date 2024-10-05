import React from 'react'

import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className='wrapper'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainLayout
