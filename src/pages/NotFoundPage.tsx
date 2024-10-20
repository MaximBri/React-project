import React from 'react'
import { Link } from 'react-router-dom'

import { Header } from '../components'
import '../scss/NotFound/notFound.scss'

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className='container NF-wrapper'>
        <h1 className='NF_title'>Этой страницы не существует</h1>
        <Link className='button' to='/'>
          Вернуться на главную
        </Link>
      </div>
    </>
  )
}

export default NotFoundPage
