import React from 'react'

import BurgerMenu from './BurgerMenu'
import logo from '../img/logo192.png'
import { Link } from 'react-router-dom'
import '../scss/header.scss'

const Header: React.FC = () => {
  
  return (
    <header className='header'>
      <Link to={'/React-project'} className='header_logo'>
        <img src={logo} alt="Logo" />
      </Link>
      <h2 className='header_title'>React проект</h2>
      <BurgerMenu/>
    </header>
  )
}

export default Header
