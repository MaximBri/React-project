import React from 'react'

import { Person } from '../components'
import '../scss/Person/person.scss'

const PersonPage: React.FC = () => {
  const [page, setPage] = React.useState<number>(0)
  return (
    <>
      <h1 className='person_title'>Личный кабинет</h1>
      <ul className='person__list'>
        <li
          onClick={() => setPage(0)}
          className={ !page ? 'person__list_item person__list_active' : 'person__list_item'}
        >
          Что-то
        </li>
        <li onClick={() => setPage(1)} className={page === 1 ? 'person__list_item person__list_active' : 'person__list_item'}>
          Анкета
        </li>
      </ul>
      {page === 1 && <Person />}
    </>
  )
}

export default PersonPage
