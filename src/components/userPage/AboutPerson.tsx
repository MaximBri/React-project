import React from 'react'
import { useDispatch } from 'react-redux'
import { setAllFields, setAuth, setQuestionnaire } from '../../RTK/slices/AuthSlice'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

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
    Cookies.set('token', '')
    navigate('/React-project')
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
