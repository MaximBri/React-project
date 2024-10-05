import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setWidth } from '../RTK/slices/InnerWidthSlice'
import { getWidth } from '../RTK/slices/InnerWidthSlice'

const BurgerMenu = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const width: number = useSelector(getWidth)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const burger = React.useRef(null)
  React.useEffect(() => {
    console.log(window.innerWidth)
    const f = () => {
      dispatch(setWidth(window.innerWidth))
    }
    window.addEventListener('resize', f)
    return () => {
      window.removeEventListener('resize', f)
    }
  }, [width])
  console.log(width, window.innerWidth)
  if (window.innerWidth > 1024) {
    return (
      <nav className='header__nav'>
        {location.pathname !== '/React-project' && (
          <Link to={'/React-project'} className='header__nav_item'>
            Главная
          </Link>
        )}
        {location.pathname !== '/React-project/Authorization' && (
          <Link to={'Authorization'} className='header__nav_item'>
            Регистрация / Вход
          </Link>
        )}
      </nav>
    )
  }
  else {
    return (
    <>
      <div onClick={() => setIsOpen(true)} className='burger'>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav ref={burger} className={isOpen? 'burger-menu': 'burger-menu hidden'}>
        <div onClick={() => setIsOpen(false)} className="burger_close">
          <div></div>
          <div></div>
        </div>
        <div className='burger-inner'>
          {location.pathname !== '/React-project' && (
            <Link onClick={() => setIsOpen(false)} to={'/React-project'} className='header__nav_item'>
              Главная
            </Link>
          )}
          {location.pathname !== '/React-project/Authorization' && (
            <Link onClick={() => setIsOpen(false)} to={'Authorization'} className='header__nav_item'>
              Регистрация / Вход
            </Link>
          )}
          Личный кабинет
        </div>
      </nav>
    </>
  )
}
}

export default BurgerMenu
