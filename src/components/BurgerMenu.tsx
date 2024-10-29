import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { getAuth } from '../RTK/slices/AuthSlice'

const BurgerMenu: React.FC<{ width: number }> = ({ width }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const auth = useSelector<any, boolean | number>(getAuth)

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
          <NavLink to='/Catalog'>Каталог</NavLink>
          <NavLink to='/Cat'>Мой кот</NavLink>
          <NavLink to='/Account'>Мой Счет</NavLink>
          <NavLink to='/User'>Профиль</NavLink>
          <NavLink to='/About'>О нас</NavLink>
        </div>
      </nav>
    </>
  )
}

export default BurgerMenu
