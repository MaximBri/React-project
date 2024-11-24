import React from 'react'
import CatImage from '../components/Cat/CatImage'
import { useSelector } from 'react-redux'
import { getCatData } from '../RTK/slices/CatSlice'

const CatPage = () => {
  const catData = useSelector(getCatData)
  return (
    <section>
      <h1 className='cats_name'>{`Ваш кот ${catData.name}`}</h1>
      <CatImage color={catData.color} />
      <button>Подробнее о коте</button>
    </section>
  )
}

export default CatPage
