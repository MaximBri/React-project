import React from 'react'
import { useSelector } from 'react-redux'

import { Person } from '../components'
import AboutPerson from '../components/userPage/AboutPerson'
import { getAuth, getLoading } from '../RTK/slices/AuthSlice'
import '../scss/Person/person.scss'
import { useNavigate } from 'react-router-dom'

const PersonPage: React.FC = () => {
  const navigate = useNavigate()
  const [page, setPage] = React.useState<number>(0)
  const sections: React.ReactNode[] = [<AboutPerson />, <Person />]
  const loading = useSelector(getLoading)
  const auth = useSelector(getAuth)
  React.useEffect(() => {
    if(!loading && !auth) navigate('/')
  }, [loading, auth])
  return (
    <>
      {!loading ? (
        <>
          <h1 className='person_title'>Личный кабинет</h1>
          <ul className='person__list'>
            <li
              onClick={() => setPage(0)}
              className={
                !page
                  ? 'person__list_item person__list_active'
                  : 'person__list_item'
              }
            >
              Что-то
            </li>
            <li
              onClick={() => setPage(1)}
              className={
                page === 1
                  ? 'person__list_item person__list_active'
                  : 'person__list_item'
              }
            >
              Анкета
            </li>
          </ul>
        </>
      ) : <h2>Загрузка...</h2>}
      {!loading && sections[page]}
    </>
  )
}

export default PersonPage
