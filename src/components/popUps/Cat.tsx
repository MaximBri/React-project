import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { setCatWindow } from '../../RTK/slices/WindowsSlice'
import attentionSvg from '../../img/attention.svg'
import '../../scss/Cat/cat.scss'
import Cookies from 'js-cookie'

const Cat = () => {
  const dispatch = useDispatch()
  const [name, setName] = React.useState('')
  const createCat = async () => {
    const body = { name }
    console.log(body)
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
    console.log(response)
  }
  return (
    <>
      <div className='cat'>
        <h2 className='cat_title'>Создай своего кота</h2>
        <div className='cat_attention'>
          <img src={attentionSvg} alt='Attention' />
          <h3>Кота можно создать только 1 раз</h3>
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
