import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getAuth } from '../RTK/slices/AuthSlice'
import { setWidth } from '../RTK/slices/InnerWidthSlice'

const BurgerMenu = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const auth = useSelector(getAuth)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  React.useEffect(() => {
    const f = () => {
      dispatch(setWidth(window.innerWidth))
    }
    window.addEventListener('resize', f)
    return () => {
      window.removeEventListener('resize', f)
    }
  }, [])
  if (window.innerWidth > 1024) {
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
            {location.pathname !== '/React-project/Authorization' && (
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
