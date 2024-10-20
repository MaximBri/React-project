import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { getAuth } from '../RTK/slices/AuthSlice'

const BurgerMenu:React.FC<{width: number}> = ({width}) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const auth = useSelector<any, boolean | number>(getAuth)
  if (width > 1024) {
    return (
      <nav className='header__nav'>
        {location.pathname !== '/' && (
          <Link to={'/'} className='header__nav_item'>
            Главная
          </Link>
        )}
      </nav>
    )
  } else {
    return (
      <>
        <div onClick={() => setIsOpen(true)} className='burger'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={isOpen ? 'burger-menu' : 'burger-menu hidden-burger'}>
          <div onClick={() => setIsOpen(false)} className='burger_close'>
            <div></div>
            <div></div>
          </div>
          <div className='burger-inner'>
            <Link
              onClick={() => setIsOpen(false)}
              to={'/'}
              className='header__nav_item'
            >
              Главная
            </Link>
            {location.pathname !== '/Authorization' && !auth && (
              <Link
                onClick={() => setIsOpen(false)}
                to={'Authorization'}
                className='header__nav_item'
              >
                Регистрация / Вход
              </Link>
            )}
            {auth && (
              <Link
              onClick={() => setIsOpen(false)}
              to={'User'}
              className='header__nav_item'
            >
              Личный кабинет
            </Link>
            )}
          </div>
        </nav>
      </>
    )
  }
}

export default BurgerMenu
