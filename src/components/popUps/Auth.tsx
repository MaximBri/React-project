import React from 'react'
import { useDispatch } from 'react-redux'

import useAuthLogic from '../hooks/authLogic'
import { setAuthWindow, setRegisterWindow } from '../../RTK/slices/WindowsSlice'
import { messages } from '../../components/hooks/authLogic'
import crossSvg from '../../img/attention.svg'
import LoadGif from '../../img/loader.gif'
import '../../scss/Auth/form.scss'

const Auth: React.FC = () => {
  const dispatch = useDispatch()
  const [stateAuthErr, setStateAuthErr] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [authMess, setAuthMess] = React.useState<string>('')
  const [login, setLogin] = React.useState<string>('')
  const [pass, setPass] = React.useState<string>('')
  const { entance } = useAuthLogic({
    login,
    pass,
    setLoading,
    setAuthMess,
    setStateAuthErr,
  })
  const openRegWindow = () => {
    dispatch(setRegisterWindow(true))
    dispatch(setAuthWindow(false))
  }
  const closeWindows = () => {
    dispatch(setRegisterWindow(false))
    dispatch(setAuthWindow(false))
  }
  return (
    <>
      <div className='auth-container'>
        <h2 className='auth_title'>Вход</h2>
        {loading && (
          <div className='auth_loading'>
            <img src={LoadGif} alt='loading...' />
            <h2 className='auth_success_text'>{messages[1]}</h2>
          </div>
        )}
        {authMess && (
          <div className='auth_success'>
            <h2 className='auth_success_text'>{authMess}</h2>
          </div>
        )}
        {stateAuthErr && (
          <div className='auth_error'>
            <img src={crossSvg} alt='Ошибка' />
            <h2 className='auth_success_text'>{stateAuthErr}</h2>
          </div>
        )}
        <div className='auth__container'>
          Логин
          <input
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            type='text'
            className='auth_input'
            placeholder='Введите ваш логин'
            required
          />
          Пароль
          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type='password'
            className='auth_input'
            placeholder='Пароль'
            autoComplete='current-password'
            required
          />
          <button onClick={(e) => entance(e)} className='form_btn'>
            Войти
          </button>
          <h3 className='auth__account' onClick={() => openRegWindow()}>
            Ещё нет аккаунта?<span> Зарегистрироваться</span>
          </h3>
        </div>
      </div>
      <div onClick={() => closeWindows()} className='auth-bg'></div>
    </>
  )
}

export default Auth
