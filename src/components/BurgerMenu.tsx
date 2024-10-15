import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { getAuth } from '../RTK/slices/AuthSlice'

const BurgerMenu = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [width, setWidth] = React.useState<number>(window.innerWidth)
  const auth = useSelector<any, boolean>(getAuth)
  console.log(auth)
  React.useEffect(() => {
    const f = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', f)
    return () => {
      window.removeEventListener('resize', f)
    }
  }, [])
  if (width > 1024) {
    return (
      <nav className='header__nav'>
        {location.pathname !== '/React-project' && (
          <Link to={'/React-project'} className='header__nav_item'>
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
            {location.pathname !== '/React-project' && (
              <Link
                onClick={() => setIsOpen(false)}
                to={'/React-project'}
                className='header__nav_item'
              >
                Главная
              </Link>
            )}
            {location.pathname !== '/React-project/Authorization' && !auth &&  (
              <Link
                onClick={() => setIsOpen(false)}
                to={'Authorization'}
                className='header__nav_item'
              >
                Регистрация / Вход
              </Link>
            )}
          </div>
        </nav>
      </>
    )
  }
}

export default BurgerMenu
