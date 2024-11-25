import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { getCatData } from '../RTK/slices/CatSlice'

import CatImage from '../components/Cat/CatImage'
import Cookies from 'js-cookie'

const CatPage = () => {
  const catData = useSelector(getCatData)
  const [description, setDescription] = React.useState<boolean>(false)
  const [phrase, setPhrase] = React.useState<string | null>(catData.phrase)
  const getNewPhrase = () => {
    setPhrase('Думает...')
    setTimeout(async () => {
      const token = Cookies.get('token')
      if (token) {
        try {
          const responce = await axios.get(
            'https://catsandpies.ru/api/Cat/SaySomething',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          setPhrase(responce.data.data)
          console.log(responce)
        } catch (error) {
          console.log(error)
        }
      }
    }, 1000);
  }
  return (
    <>
      <section className='cats'>
        <h1 className='cats_name'>{`Ваш кот ${catData.name}`}</h1>
        <CatImage color={catData.color} shadow={true} />
        {!description ? (
          <button onClick={() => setDescription(true)} className='cats__about'>
            Подробнее о коте
          </button>
        ) : (
          <div onClick={() => setDescription(false)} className='cats__details'>
            <h3 className='cats__datails_item'>{`Роль: ${catData.role}`}</h3>
            <h3 className='cats__datails_item'>{`Описание: ${catData.description}`}</h3>
            <button className='cats__about'>Скрыть</button>
          </div>
        )}
      </section>
      <section className='cats__phrases'>
        {phrase ? (
          <>
            <h3 className='cats_phrase'>{phrase}</h3>
            <button
              onClick={() => getNewPhrase()}
              className='cats__phrases_btn'
            >
              Скажи ещё что-нибудь
            </button>
          </>
        ) : (
          <button onClick={() => getNewPhrase()} className='cats__phrases_btn'>
            Скажи что-нибудь
          </button>
        )}
      </section>
    </>
  )
}

export default CatPage
