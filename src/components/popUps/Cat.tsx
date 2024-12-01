import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setCatWindow } from '../../RTK/slices/WindowsSlice'
import { CatLogic } from '../hooks/catLogic'
import attentionSvg from '../../img/attention.svg'
import '../../scss/Cat/cat.scss'
import { clearMessage, pushMessage } from '../../RTK/slices/NotificationSlice'

const Cat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState<string>('')
  const createCat = async () => {
    try {
      const response = await axios.post(
        'https://catsandpies.ru/api/Cat/CreateCat',
        name,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      const catInfo = response.data.data
      CatLogic(catInfo, dispatch)
      dispatch(setCatWindow(false))
      dispatch(
        pushMessage({
          message: response.data.messageForUser,
          statusCode: response.data.statusCode,
        })
      )
      console.log(response)
      setTimeout(()=> {
        dispatch(clearMessage())
      }, 3000)
      navigate('/Cat')
    } catch (error) {
      console.log(error)
      setError('Произошла ошибка при создании кота')
    }
  }
  return (
    <>
      <div className='cat'>
        <h2 className='cat_title'>Создай своего кота</h2>
        <div className='cat_attention'>
          <img src={attentionSvg} alt='Attention' />
          <h3>Кота можно создать только 1 раз</h3>
          {error && <h3>{error}</h3>}
        </div>
        <h3 className='cat_name'>Придумай имя для кота</h3>
        <input
          className='cat_name-input'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Имя кота'
        />
        {name && (
          <button className='cat_create' onClick={() => createCat()}>
            Создать кота
          </button>
        )}
      </div>
      <div
        className='cat-bg'
        onClick={() => dispatch(setCatWindow(false))}
      ></div>
    </>
  )
}

export default Cat
