import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Header } from '../components'
import { getAllFields, getAuth, setAllFields, setAuth, setQuestionnaire } from '../RTK/slices/AuthSlice'

const MainLayout: React.FC = () => {
  const dispatch = useDispatch()
  const token = Cookies.get('token')
  React.useEffect(() => {
    const fetchData = async () => {
      console.log(token)
      if (token) {
        dispatch(setAuth(true))
        try {
          const response = await axios.get(
            'https://catsandpies.ru/api/Questionnaire/GetMyQuestionnaire',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          console.log(response.data.data)
          dispatch(setAllFields(response.data.data))
          dispatch(setQuestionnaire(true))
        } catch (error: any) {
          console.error('Error fetching data:', error.response)
          if(error.response.data.description === 'Анкета не найдена') dispatch(setQuestionnaire(false))
        }
      }
    }
    fetchData()
  }, [token, dispatch])
  const userData = useSelector(getAllFields)
  console.log(useSelector(getAuth))
  console.log(userData)
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
