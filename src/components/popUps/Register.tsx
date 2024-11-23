import React from 'react'
import { useDispatch } from 'react-redux'

import useRegisterLogic from '../hooks/registerLogic'
import { setAuthWindow, setRegisterWindow } from '../../RTK/slices/WindowsSlice'
import { messages } from '../../components/hooks/authLogic'
import crossSvg from '../../img/attention.svg'
import LoadGif from '../../img/loader.gif'

const Register = () => {
  const dispatch = useDispatch()
  const [stateAuthErr, setStateAuthErr] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [authMess, setAuthMess] = React.useState<string>('')
  const [login, setLogin] = React.useState<string>('')
  const [pass, setPass] = React.useState<string>('')
  const { register, name, setName, repeatPass, setRepeatPass } =
    useRegisterLogic({ login, pass, setLoading, setAuthMess, setStateAuthErr })
  const closeWindows = () => {
    dispatch(setRegisterWindow(false))
    dispatch(setAuthWindow(false))
  }
  const openAuthWindow = () => {
    dispatch(setRegisterWindow(false))
    dispatch(setAuthWindow(true))
  }
  return (
    <>
      <div className='auth-container'>
        <h2 className='auth_title'>Регистрация</h2>
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
          Имя
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            className='auth_input'
            placeholder='Имя'
            required
          />
          Логин
          <input
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            type='text'
            className='auth_input'
            placeholder='Логин'
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
          Повторите пароль
          <input
            onChange={(e) => setRepeatPass(e.target.value)}
            value={repeatPass}
            type='password'
            className='auth_input'
            placeholder='Повторите пароль'
            autoComplete='current-password'
            required
          />
          <button onClick={(e) => register(e)} className='form_btn'>
            Зарегистрироваться
          </button>
          <h3 className='auth__account' onClick={() => openAuthWindow()}>
            Уже есть аккаунт?<span> Войти</span>
          </h3>
        </div>
      </div>
      <div onClick={() => closeWindows()} className='auth-bg'></div>
    </>
  )
}

export default Register
