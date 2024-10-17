import React from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'

import { Header } from '../components'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  // нужно будет вытянуть данные о юзере
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const token = Cookie.get('token')
  //     console.log(token)
  //     if (token) {
  //       try {
  //         const response = await axios.post(
  //           'https://catsandpies.ru/api/Questionnaire',
  //           {},
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               // Authorization: `Bearer ${JSON.stringify(token)}`,
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //         console.log(response.data)
  //       } catch (error) {
  //         console.error('Error fetching data:', error)
  //       }
  //     }
  //   }
  //   fetchData()
  // }, [])
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
