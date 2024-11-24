import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import Register from './popUps/Register'
import Auth from './popUps/Auth'
import Cat from './popUps/Cat'
import BurgerMenu from './BurgerMenu'
import { getAuth } from '../RTK/slices/AuthSlice'
import {
  getAuthWindow,
  getCatWindow,
  getRegisterWindow,
  setAuthWindow,
  setCatWindow,
} from '../RTK/slices/WindowsSlice'
import logo from '../img/logo192.png'
import regSvg from '../img/Person.svg'
import '../scss/header.scss'
import { getExisting } from '../RTK/slices/CatSlice'
import CatImage from './Cat/CatImage'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useSelector<any, boolean>(getAuth)
  const authWindow = useSelector(getAuthWindow)
  const registerWindow = useSelector(getRegisterWindow)
  const catWindow = useSelector(getCatWindow)
  const catExisting = useSelector(getExisting)
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
    <>
      <header className='header'>
        <div className='header_right'>
          <img onClick={() => navigate('/')} src={logo} alt='Logo' />
          <nav className='header__nav_list'>
            <NavLink to='/Catalog'>Каталог</NavLink>
            {auth && (
              <>
                {catExisting && <NavLink to='/Cat'>Мой кот</NavLink>}
                <NavLink to='/Account'>Мой Счет</NavLink>
                <NavLink to='/User'>Профиль</NavLink>
              </>
            )}
            <NavLink to='/About'>О нас</NavLink>
          </nav>
        </div>
        <div className='header__nav_box'>
          {width < 1024 && <BurgerMenu width={width} />}
          {auth ? (
            <>
              {catExisting === false && (
                <button
                  onClick={() => dispatch(setCatWindow(true))}
                  className='header__nav_item'
                >
                  <CatImage color={null}/>
                </button>
              )}
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
            </>
          ) : (
            <span
              onClick={() => dispatch(setAuthWindow(true))}
              className='header__nav_item'
            >
              <img src={regSvg} alt='Вход' />
              <h4>Вход / Регистрация</h4>
            </span>
          )}
        </div>
      </header>
      {authWindow && (
        <section className='auth'>
          <Auth />
        </section>
      )}
      {registerWindow && (
        <section className='auth'>
          <Register />
        </section>
      )}
      {catWindow && (
        <section className='auth'>
          <Cat />
        </section>
      )}
    </>
  )
}

export default Header
