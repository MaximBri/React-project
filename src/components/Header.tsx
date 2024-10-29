import React from 'react'

import { getAuth } from '../RTK/slices/AuthSlice'
import BurgerMenu from './BurgerMenu'
import logo from '../img/logo192.png'
import regSvg from '../img/Person.svg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import '../scss/header.scss'
import { useSelector } from 'react-redux'

const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useSelector<any, boolean>(getAuth)
  let userName = useSelector<any, string>((state) => state.auth.data.name)
  const [width, setWidth] = React.useState<number>(window.innerWidth)
  React.useEffect(() => {
    const f = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', f)
    return () => {
      window.removeEventListener('resize', f)
    }
  }, [])
  const countSymb = width > 768 ? 9 : 1
  if (!userName) userName = 'User'
  if (userName.length >= countSymb) {
    userName = userName.substring(0, countSymb)
    if (width > 768) userName += '...'
  }
  return (
    <header className='header'>
      <div className='header_right'>
        <img onClick={() => navigate('/')} src={logo} alt='Logo' />
        <nav className='header__nav_list'>
          <NavLink to='/Catalog'>Каталог</NavLink>
          <NavLink to='/Cat'>Мой кот</NavLink>
          <NavLink to='/Account'>Мой Счет</NavLink>
          <NavLink to='/User'>Профиль</NavLink>
          <NavLink to='/About'>О нас</NavLink>
        </nav>
      </div>
      <div className='header__nav_box'>
        {width< 1024 && <BurgerMenu width={width} />}
        {auth ? (
          <div
            onClick={() => navigate('User')}
            className={
              location.pathname === '/User'
                ? 'header__nav_item header__nav_item-active'
                : 'header__nav_item'
            }
          >
            <h3 className='user_name'>{userName}</h3>
          </div>
        ) : (
          <span
            onClick={() => navigate('Authorization')}
            className='header__nav_item'
          >
            <img src={regSvg} alt='Вход' />
            <h4>Вход / Регистрация</h4>
          </span>
        )}
      </div>
    </header>
  )
}

export default Header
