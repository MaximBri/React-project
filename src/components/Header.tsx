import React from 'react'

import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../scss/header.scss'

const Header: React.FC = () => {
  const location = useLocation()
  return (
    <header className="header">
      <Link to={'/Home'} className="header_logo">
        Лого
      </Link>
      <h2 className="header_title">Проект 1</h2>
      <nav className="header__nav">
        <Link to={'/Home'} className="header__nav_item">Главная</Link>
        {location.pathname !== '/Home/Authorization' && (<Link to={'Authorization'} className="header__nav_item">Вход</Link>)}
      </nav>
    </header>
  )
}

export default Header