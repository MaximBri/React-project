import React from 'react'

import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
