import React from 'react'

import { getAuth } from '../RTK/slices/AuthSlice'
import BurgerMenu from './BurgerMenu'
import logo from '../img/logo192.png'
import regSvg from '../img/account.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  const countSymb = width>768? 9 : 1
  if(!userName) userName = 'User'
  if (userName.length >= countSymb) {
    userName = userName.substring(0, countSymb)
    if(width>768) userName += '...'
  }
  return (
    <header className='header'>
      <Link to={'/React-project'} className='header_logo'>
        <img src={logo} alt='Logo' />
      </Link>
      <h2 className='header_title'>React проект</h2>
      <div className='header__nav_box'>
        <BurgerMenu width={width}/>
        {auth ? (
          <div onClick={() => navigate('User')} className={location.pathname === '/React-project/User' ? 'header__nav_item header__nav_item-active': 'header__nav_item'}>
            <h3 className='user_name'>{userName}</h3>
          </div>
        ) : (
          <span
            onClick={() => navigate('Authorization')}
            className='header__nav_item'
          >
            <img src={regSvg} alt='Вход' />
          </span>
        )}
      </div>
    </header>
  )
}

export default Header
