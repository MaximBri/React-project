import React from 'react'
import { useDispatch } from 'react-redux'
import {
  setAllFields,
  setAuth,
  setQuestionnaire,
} from '../../RTK/slices/AuthSlice'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { setCatData } from '../../RTK/slices/CatSlice'

const AboutPerson = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const exitFromAcc = () => {
    dispatch(setAuth(false))
    dispatch(
      setAllFields({
        name: '',
        email: '',
        birthday: '01.01.2000',
        hobby: '',
        season: '',
        flower: '',
        dish: '',
        chillTime: '',
        film: '',
        singer: '',
        color: '',
        positiveTraits: '',
        dream: '',
      })
    )
    dispatch(setQuestionnaire(false))
    dispatch(
      setCatData({
        existed: false,
        data: {
          color: '',
          role: '',
          phrase: '',
          description: '',
          name: '',
        },
      })
    )
    Cookies.set('token', '')
    Cookies.set('cat', '')
    navigate('/')
  }
  return (
    <div>
      <button onClick={() => exitFromAcc()} className='user__about_btn'>
        Выйти
      </button>
    </div>
  )
}

export default AboutPerson
