import React from 'react'

import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className='container'>
      <div className="header_logo">
        Лого
      </div>
      <nav className="header__nav">
        <Link to={'/Home'} className="header__nav_item">Главная</Link>
        <Link to={'Authorization'} className="header__nav_item">Вход</Link>
      </nav>
    </header>
  )
}

export default Header