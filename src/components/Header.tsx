import React from 'react'

import { getAuth } from '../RTK/slices/AuthSlice'
import BurgerMenu from './BurgerMenu'
import logo from '../img/logo192.png'
import regSvg from '../img/account.svg'
import { Link, useNavigate } from 'react-router-dom'
import '../scss/header.scss'
import { useSelector } from 'react-redux'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const auth = useSelector<any, boolean>(getAuth)
  const checkRegistration = () => {
    if(auth) navigate('User')
    else navigate('Authorization')
  }
  return (
    <header className='header'>
      <Link to={'/React-project'} className='header_logo'>
        <img src={logo} alt='Logo' />
      </Link>
      <h2 className='header_title'>React проект</h2>
      <div className='header__nav_box'>
        <BurgerMenu />
        <span onClick={() => checkRegistration()} className='header__nav_item'>
          <img src={regSvg} alt='Вход' />
        </span>
      </div>
    </header>
  )
}

export default Header
